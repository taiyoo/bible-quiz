"use client";

import { useEffect, useMemo, useState } from "react";
import type { AssessmentDefinition } from "@/data/assessments";

type CampaignInfo = {
  campaignId: string;
  assessmentType: string;
  title: string;
  status: "active" | "closed";
  scoreboardVisibility: "organizer_only" | "participants_after_submit";
  minRespondents?: number;
  participantSubmitted: boolean;
};

type SubmitState = "idle" | "joining" | "ready" | "submitting" | "submitted" | "error";

type Props = {
  assessment: AssessmentDefinition;
  campaignToken: string | null;
  onBack: () => void;
};

type LocalResult = {
  id: string;
  assessmentId: string;
  title: string;
  strongestLabel: string;
  total: number;
  savedAt: string;
};

const campaignCopy = {
  en: {
    joining: "Joining group campaign...",
    ready: "Joined campaign",
    submitted: "Your anonymous result has been submitted to the group campaign.",
    alreadySubmitted: "You have already submitted to this campaign. Retaking will replace your previous response.",
    submitting: "Submitting your result to the group campaign...",
    error: "The result is saved on this page, but the campaign submission could not be completed.",
    wrongLink: "This campaign link could not be opened for this assessment.",
    viewGroup: "Group result visibility is enabled after submission.",
  },
  id: {
    joining: "Bergabung ke kampanye grup...",
    ready: "Berhasil bergabung ke kampanye",
    submitted: "Hasil anonim Anda sudah dikirim ke kampanye grup.",
    alreadySubmitted: "Anda sudah mengirim hasil untuk kampanye ini. Mengulang akan mengganti respons sebelumnya.",
    submitting: "Mengirim hasil ke kampanye grup...",
    error: "Hasil tersimpan di halaman ini, tetapi pengiriman kampanye belum berhasil.",
    wrongLink: "Link kampanye ini tidak dapat dibuka untuk assessment ini.",
    viewGroup: "Visibilitas hasil grup aktif setelah pengiriman.",
  },
} as const;

function computeScores(assessment: AssessmentDefinition, answers: Record<number, number>) {
  const scores = Object.fromEntries(Object.keys(assessment.dimensions).map((key) => [key, 0])) as Record<string, number>;
  assessment.questions.forEach((question) => {
    scores[question.dimension] = (scores[question.dimension] || 0) + (answers[question.id] ?? 3);
  });
  if (assessment.id === "overcomer") {
    scores.total = Object.keys(assessment.dimensions).reduce((sum, key) => sum + (scores[key] || 0), 0);
  }
  return scores;
}

function topDimension(assessment: AssessmentDefinition, scores: Record<string, number>) {
  return Object.keys(assessment.dimensions).sort((a, b) => (scores[b] || 0) - (scores[a] || 0))[0];
}

function totalScore(scores: Record<string, number>) {
  if (typeof scores.total === "number") return scores.total;
  return Object.entries(scores)
    .filter(([key]) => key !== "total")
    .reduce((sum, [, value]) => sum + value, 0);
}

export function AssessmentExperience({ assessment, campaignToken, onBack }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [complete, setComplete] = useState(false);
  const [campaignInfo, setCampaignInfo] = useState<CampaignInfo | null>(null);
  const [submitState, setSubmitState] = useState<SubmitState>(campaignToken ? "joining" : "idle");
  const [localHistory, setLocalHistory] = useState<LocalResult[]>([]);
  const question = assessment.questions[currentIndex];
  const progress = Math.round(((currentIndex + 1) / assessment.questions.length) * 100);
  const scores = useMemo(() => computeScores(assessment, answers), [assessment, answers]);
  const strongestKey = topDimension(assessment, scores);
  const strongestInsight = assessment.dimensions[strongestKey];
  const labels = assessment.resultLabels;
  const localizedCampaignCopy = campaignCopy[assessment.locale];
  const scaleGuide = assessment.scale.map((option) => `${option.value} = ${option.label}`).join(", ");
  const draftKey = `truevine_assessment_draft_${assessment.id}_${assessment.locale}`;
  const historyKey = `truevine_assessment_history_${assessment.locale}`;

  useEffect(() => {
    let restored = false;
    if (typeof window !== "undefined") {
      try {
        const rawDraft = window.localStorage.getItem(draftKey);
        if (rawDraft) {
          const parsed = JSON.parse(rawDraft) as { currentIndex?: number; answers?: Record<number, number>; complete?: boolean };
          setCurrentIndex(Math.min(Math.max(parsed.currentIndex ?? 0, 0), assessment.questions.length - 1));
          setAnswers(parsed.answers || {});
          setComplete(Boolean(parsed.complete));
          restored = true;
        }

        const rawHistory = window.localStorage.getItem(historyKey);
        setLocalHistory(rawHistory ? (JSON.parse(rawHistory) as LocalResult[]) : []);
      } catch {
        setLocalHistory([]);
      }
    }

    if (!restored) {
      setCurrentIndex(0);
      setAnswers({});
      setComplete(false);
    }
    setCampaignInfo(null);
    setSubmitState(campaignToken ? "joining" : "idle");
  }, [assessment.id, assessment.locale, assessment.questions.length, campaignToken, draftKey, historyKey]);

  useEffect(() => {
    if (typeof window === "undefined" || complete) return;
    window.localStorage.setItem(draftKey, JSON.stringify({ currentIndex, answers, complete }));
  }, [answers, complete, currentIndex, draftKey]);

  useEffect(() => {
    if (!campaignToken) return;
    let isActive = true;
    setSubmitState("joining");

    void fetch("/api/assessment-campaigns/join", {
      method: "POST",
      headers: { "content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ shareToken: campaignToken }),
    })
      .then(async (response) => {
        const json = await response.json();
        if (!response.ok || !json.success) throw new Error(json.error || "Unable to join campaign");
        return json.data as CampaignInfo;
      })
      .then((joined) => {
        if (!isActive) return;
        if (joined.assessmentType !== assessment.id) {
          setSubmitState("error");
          return;
        }
        setCampaignInfo(joined);
        setSubmitState(joined.participantSubmitted ? "submitted" : "ready");
      })
      .catch(() => {
        if (isActive) setSubmitState("error");
      });

    return () => {
      isActive = false;
    };
  }, [assessment.id, campaignToken]);

  async function submitCampaignResult(finalScores: Record<string, number>, finalAnswers: Record<number, number>) {
    if (!campaignToken || !campaignInfo || campaignInfo.status !== "active") return;
    setSubmitState("submitting");

    try {
      const response = await fetch(`/api/assessment-campaigns/${campaignInfo.campaignId}/submission`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          shareToken: campaignToken,
          assessmentType: assessment.id,
          answers: Object.fromEntries(Object.entries(finalAnswers).map(([key, value]) => [String(key), value])),
          scores: finalScores,
          locale: assessment.locale,
        }),
      });
      const json = await response.json();
      if (!response.ok || !json.success) throw new Error(json.error || "Unable to submit result");
      setSubmitState("submitted");
    } catch {
      setSubmitState("error");
    }
  }

  function saveLocalResult(finalScores: Record<string, number>) {
    if (typeof window === "undefined") return;
    const strongest = topDimension(assessment, finalScores);
    const total = totalScore(finalScores);
    const next: LocalResult = {
      id: `${assessment.id}-${Date.now()}`,
      assessmentId: assessment.id,
      title: assessment.title,
      strongestLabel: assessment.dimensions[strongest]?.label || strongest,
      total,
      savedAt: new Date().toISOString(),
    };
    const updated = [next, ...localHistory.filter((item) => item.assessmentId !== assessment.id)].slice(0, 4);
    setLocalHistory(updated);
    window.localStorage.setItem(historyKey, JSON.stringify(updated));
    window.localStorage.removeItem(draftKey);
  }

  function resetAssessment() {
    setCurrentIndex(0);
    setAnswers({});
    setComplete(false);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(draftKey);
    }
  }

  function answerQuestion(value: number) {
    const nextAnswers = { ...answers, [question.id]: value };
    setAnswers(nextAnswers);
    if (currentIndex < assessment.questions.length - 1) {
      setCurrentIndex((index) => index + 1);
      return;
    }

    const finalScores = computeScores(assessment, nextAnswers);
    setComplete(true);
    saveLocalResult(finalScores);
    void submitCampaignResult(finalScores, nextAnswers);
  }

  if (complete) {
    const total = totalScore(scores);
    const maxTotal = Object.entries(assessment.maxPerDimension)
      .filter(([key]) => key !== "total")
      .reduce((sum, [, value]) => sum + value, 0);
    const revisitQuestions = assessment.questions
      .map((item) => ({ ...item, answer: answers[item.id] ?? 3 }))
      .filter((item) => assessment.revisitMode === "high" ? item.answer >= 3 : item.answer <= 3)
      .sort((a, b) => assessment.revisitMode === "high" ? b.answer - a.answer : a.answer - b.answer)
      .slice(0, 6);

    return (
      <section className={`assessment-panel accent-${assessment.accent}`} aria-label={`${assessment.title} results`}>
        <button className="back-button" type="button" onClick={onBack}>{labels.back}</button>
        <div className="result-hero">
          <p className="eyebrow">{labels.complete}</p>
          <h1>{assessment.title}</h1>
          <p>{labels.strongest}: {strongestInsight.label}.</p>
          <div className="score-summary">
            <strong>{total}/{maxTotal}</strong>
            <span>{assessment.source}</span>
          </div>
        </div>

        {campaignToken && (
          <div className={`campaign-banner state-${submitState}`}>
            {submitState === "submitted" && localizedCampaignCopy.submitted}
            {submitState === "submitting" && localizedCampaignCopy.submitting}
            {submitState === "error" && localizedCampaignCopy.error}
            {submitState === "ready" && localizedCampaignCopy.ready}
            {submitState === "submitted" && campaignInfo?.scoreboardVisibility === "participants_after_submit" && (
              <span className="campaign-note"> {localizedCampaignCopy.viewGroup}</span>
            )}
          </div>
        )}

        <div className="insight-card">
          <p className="eyebrow">{labels.whatThisMeans}</p>
          <h2>{strongestInsight.label}</h2>
          <p>{strongestInsight.summary}</p>
          <p>{strongestInsight.detail}</p>
          <div className="next-step-box">
            <strong>{labels.nextStep}</strong>
            <p>{strongestInsight.next}</p>
          </div>
        </div>

        <div className="score-list">
          <h2>{labels.dimensions}</h2>
          {Object.entries(assessment.dimensions).map(([key, label]) => {
            const value = scores[key] || 0;
            const max = assessment.maxPerDimension[key] || 1;
            return (
              <div key={key} className="score-row">
                <div className="score-labels">
                  <strong>{label.label}</strong>
                  <span>{value}/{max}</span>
                </div>
                <div className="score-bar"><span style={{ width: `${Math.min(100, Math.round((value / max) * 100))}%` }} /></div>
                <p>{label.summary}</p>
              </div>
            );
          })}
        </div>

        {revisitQuestions.length > 0 && (
          <div className="verse-panel">
            <h2>{labels.versesToRevisit}</h2>
            <p>{labels.versesToRevisitDesc}</p>
            <div className="verse-list">
              {revisitQuestions.map((item) => (
                <article key={item.id}>
                  <strong>{item.text}</strong>
                  <p>{item.verse}</p>
                </article>
              ))}
            </div>
          </div>
        )}

        <div className="reflection-panel">
          <h2>{labels.reflectionTitle}</h2>
          <div className="reflection-grid">
            {assessment.reflectionQuestions.map((reflection) => <p key={reflection}>{reflection}</p>)}
          </div>
        </div>

        {localHistory.length > 0 && (
          <div className="history-panel">
            <h2>{labels.localHistory}</h2>
            <div className="history-list">
              {localHistory.map((item) => (
                <article key={item.id}>
                  <strong>{item.title}</strong>
                  <span>{item.strongestLabel} - {item.total}</span>
                </article>
              ))}
            </div>
            <p>{labels.saved}</p>
          </div>
        )}

        <div className="result-actions">
          <button className="primary-button" type="button" onClick={resetAssessment}>
            {labels.retake}
          </button>
          <button className="secondary-button" type="button" onClick={onBack}>{labels.chooseAnother}</button>
        </div>
      </section>
    );
  }

  return (
    <section className={`assessment-panel accent-${assessment.accent}`} aria-label={assessment.title}>
      <button className="back-button" type="button" onClick={onBack}>{labels.back}</button>
      {campaignToken && (
        <div className={`campaign-banner state-${submitState}`}>
          {submitState === "joining" && localizedCampaignCopy.joining}
          {submitState === "ready" && `${localizedCampaignCopy.ready}: ${campaignInfo?.title || "Group campaign"}`}
          {submitState === "submitted" && localizedCampaignCopy.alreadySubmitted}
          {submitState === "error" && localizedCampaignCopy.wrongLink}
        </div>
      )}
      <header className="assessment-header">
        <p className="eyebrow">TrueVine Assessment</p>
        <h1>{assessment.title}</h1>
        <p>{assessment.description}</p>
        <div className="meta-row assessment-meta">
          <span>{assessment.time}</span>
          <span>{assessment.source}</span>
          <span>{scaleGuide}</span>
        </div>
        <div className="progress-track" aria-label={`Question progress ${progress}%`}><span style={{ width: `${progress}%` }} /></div>
        <p className="question-count">{labels.question} {currentIndex + 1} {labels.of} {assessment.questions.length}</p>
      </header>

      <article className="question-card">
        <p className="verse-label">{labels.biblicalAnchor}</p>
        <p className="verse-text">{question.verse}</p>
        <h2>{question.text}</h2>
        <div className="answer-grid">
          {assessment.scale.map((option) => (
            <button key={option.value} type="button" onClick={() => answerQuestion(option.value)}>
              <span>{option.value}</span>
              {option.label}
            </button>
          ))}
        </div>
        <div className="question-nav">
          <button className="secondary-button compact" type="button" disabled={currentIndex === 0} onClick={() => setCurrentIndex((index) => Math.max(0, index - 1))}>
            {labels.previous}
          </button>
          <button className="secondary-button compact" type="button" onClick={() => answerQuestion(3)}>{labels.skip}</button>
        </div>
      </article>
    </section>
  );
}