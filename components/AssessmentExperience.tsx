"use client";

import { useEffect, useMemo, useState } from "react";
import { assessmentScale, type AssessmentDefinition } from "@/data/assessments";

type CampaignInfo = {
  campaignId: string;
  assessmentType: string;
  title: string;
  status: "active" | "closed";
  scoreboardVisibility: "organizer_only" | "participants_after_submit";
  participantSubmitted: boolean;
};

type SubmitState = "idle" | "joining" | "ready" | "submitting" | "submitted" | "error";

type Props = {
  assessment: AssessmentDefinition;
  campaignToken: string | null;
  onBack: () => void;
};

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

export function AssessmentExperience({ assessment, campaignToken, onBack }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [complete, setComplete] = useState(false);
  const [campaignInfo, setCampaignInfo] = useState<CampaignInfo | null>(null);
  const [submitState, setSubmitState] = useState<SubmitState>(campaignToken ? "joining" : "idle");
  const question = assessment.questions[currentIndex];
  const progress = Math.round(((currentIndex + 1) / assessment.questions.length) * 100);
  const scores = useMemo(() => computeScores(assessment, answers), [assessment, answers]);
  const strongestKey = topDimension(assessment, scores);

  useEffect(() => {
    setCurrentIndex(0);
    setAnswers({});
    setComplete(false);
    setCampaignInfo(null);
    setSubmitState(campaignToken ? "joining" : "idle");
  }, [assessment.id, campaignToken]);

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
          locale: "en",
        }),
      });
      const json = await response.json();
      if (!response.ok || !json.success) throw new Error(json.error || "Unable to submit result");
      setSubmitState("submitted");
    } catch {
      setSubmitState("error");
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
    void submitCampaignResult(finalScores, nextAnswers);
  }

  if (complete) {
    return (
      <section className={`assessment-panel accent-${assessment.accent}`} aria-label={`${assessment.title} results`}>
        <button className="back-button" type="button" onClick={onBack}>Back to hub</button>
        <div className="result-hero">
          <p className="eyebrow">Assessment Complete</p>
          <h1>{assessment.title}</h1>
          <p>Your strongest area is {assessment.dimensions[strongestKey]}.</p>
        </div>

        {campaignToken && (
          <div className={`campaign-banner state-${submitState}`}>
            {submitState === "submitted" && "Your anonymous result has been submitted to the group campaign."}
            {submitState === "submitting" && "Submitting your result to the group campaign..."}
            {submitState === "error" && "The result is saved on this page, but the campaign submission could not be completed."}
            {submitState === "ready" && "Campaign link detected. Your result will submit automatically."}
          </div>
        )}

        <div className="score-list">
          {Object.entries(assessment.dimensions).map(([key, label]) => {
            const value = scores[key] || 0;
            const max = assessment.maxPerDimension[key] || 1;
            return (
              <div key={key} className="score-row">
                <div className="score-labels">
                  <strong>{label}</strong>
                  <span>{value}/{max}</span>
                </div>
                <div className="score-bar"><span style={{ width: `${Math.min(100, Math.round((value / max) * 100))}%` }} /></div>
              </div>
            );
          })}
        </div>

        <div className="result-actions">
          <button className="primary-button" type="button" onClick={() => { setCurrentIndex(0); setAnswers({}); setComplete(false); }}>
            Retake Assessment
          </button>
          <button className="secondary-button" type="button" onClick={onBack}>Choose Another</button>
        </div>
      </section>
    );
  }

  return (
    <section className={`assessment-panel accent-${assessment.accent}`} aria-label={assessment.title}>
      <button className="back-button" type="button" onClick={onBack}>Back to hub</button>
      {campaignToken && (
        <div className={`campaign-banner state-${submitState}`}>
          {submitState === "joining" && "Joining group campaign..."}
          {submitState === "ready" && `Joined campaign: ${campaignInfo?.title || "Group campaign"}`}
          {submitState === "submitted" && "You have already submitted to this campaign. Retaking will replace your previous response."}
          {submitState === "error" && "This campaign link could not be opened for this assessment."}
        </div>
      )}
      <header className="assessment-header">
        <p className="eyebrow">TrueVine Assessment</p>
        <h1>{assessment.title}</h1>
        <p>{assessment.description}</p>
        <div className="progress-track" aria-label={`Question progress ${progress}%`}><span style={{ width: `${progress}%` }} /></div>
        <p className="question-count">Question {currentIndex + 1} of {assessment.questions.length}</p>
      </header>

      <article className="question-card">
        <p className="verse-label">Biblical anchor</p>
        <p className="verse-text">{question.verse}</p>
        <h2>{question.text}</h2>
        <div className="answer-grid">
          {assessmentScale.map((option) => (
            <button key={option.value} type="button" onClick={() => answerQuestion(option.value)}>
              <span>{option.value}</span>
              {option.label}
            </button>
          ))}
        </div>
        <div className="question-nav">
          <button className="secondary-button compact" type="button" disabled={currentIndex === 0} onClick={() => setCurrentIndex((index) => Math.max(0, index - 1))}>
            Previous
          </button>
          <button className="secondary-button compact" type="button" onClick={() => answerQuestion(3)}>Skip</button>
        </div>
      </article>
    </section>
  );
}