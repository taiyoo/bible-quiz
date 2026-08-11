"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AssessmentExperience } from "@/components/AssessmentExperience";
import { QuizExperience } from "@/components/QuizExperience";
import { getAssessmentById, getAssessments, type AssessmentId, type Locale } from "@/data/assessments";

type View = "home" | "quiz" | "assessment";

const uiCopy = {
  en: {
    church: "TrueVine Church",
    title: "Quiz & Assessments",
    hero: "Bible challenges and spiritual reflection tools for small groups, classes, and church campaigns.",
    openQuiz: "Open Bible Quiz",
    browse: "Browse Assessments",
    about: "About",
    gameType: "Team Game",
    quizTitle: "Ten Lamps Bible Quiz",
    quizDescription: "Two teams race through Bible questions with a timer, score board, and shared difficulty rounds.",
    startQuiz: "Start Quiz",
    assessment: "Assessment",
    questions: "questions",
    open: "Open",
    benefits: ["100% Free", "No account required", "Instant results", "Group campaign ready"],
    whyTitle: "Why Take These Assessments?",
    why: [
      { title: "Spiritual Growth", body: "Notice strengths and invitations for your next discipleship step." },
      { title: "Group Reflection", body: "Use campaign links for classes, small groups, and ministry cohorts." },
      { title: "Practical Action", body: "Each result includes Scripture, interpretation, and weekly next steps." },
    ],
  },
  id: {
    church: "TrueVine Church",
    title: "Kuis & Assessment",
    hero: "Tantangan Alkitab dan alat refleksi rohani untuk kelompok kecil, kelas, dan kampanye gereja.",
    openQuiz: "Buka Kuis Alkitab",
    browse: "Lihat Assessment",
    about: "Tentang",
    gameType: "Permainan Tim",
    quizTitle: "Kuis Alkitab Ten Lamps",
    quizDescription: "Dua tim menjawab pertanyaan Alkitab dengan timer, papan skor, dan ronde tingkat kesulitan yang seimbang.",
    startQuiz: "Mulai Kuis",
    assessment: "Assessment",
    questions: "pertanyaan",
    open: "Buka",
    benefits: ["100% Gratis", "Tanpa akun", "Hasil instan", "Siap kampanye grup"],
    whyTitle: "Mengapa Mengikuti Assessment Ini?",
    why: [
      { title: "Pertumbuhan Rohani", body: "Kenali kekuatan dan undangan Tuhan untuk langkah pemuridan berikutnya." },
      { title: "Refleksi Kelompok", body: "Gunakan link kampanye untuk kelas, kelompok kecil, dan komunitas pelayanan." },
      { title: "Aksi Praktis", body: "Setiap hasil berisi ayat, interpretasi, dan langkah mingguan yang konkret." },
    ],
  },
} satisfies Record<Locale, {
  church: string;
  title: string;
  hero: string;
  openQuiz: string;
  browse: string;
  about: string;
  gameType: string;
  quizTitle: string;
  quizDescription: string;
  startQuiz: string;
  assessment: string;
  questions: string;
  open: string;
  benefits: string[];
  whyTitle: string;
  why: Array<{ title: string; body: string }>;
}>;

function normalizeLocale(value: string | null): Locale | null {
  return value === "id" || value === "bahasa" ? "id" : value === "en" ? "en" : null;
}

export function TrueVineApp() {
  const searchParams = useSearchParams();
  const requestedAssessment = searchParams.get("assessment");
  const requestedLocale = normalizeLocale(searchParams.get("locale") || searchParams.get("lang"));
  const campaignToken = searchParams.get("campaign") || searchParams.get("campaignToken");
  const [locale, setLocale] = useState<Locale>(requestedLocale || "en");
  const [view, setView] = useState<View>("home");
  const [activeAssessmentId, setActiveAssessmentId] = useState<AssessmentId>("prayer-life");

  useEffect(() => {
    if (requestedLocale) {
      setLocale(requestedLocale);
      return;
    }
    if (typeof navigator !== "undefined" && navigator.language.toLowerCase().startsWith("id")) {
      setLocale("id");
    }
  }, [requestedLocale]);

  useEffect(() => {
    const assessment = getAssessmentById(requestedAssessment, locale);
    if (!assessment) return;
    setActiveAssessmentId(assessment.id);
    setView("assessment");
  }, [requestedAssessment, locale]);

  const assessmentList = getAssessments(locale);
  const activeAssessment = getAssessmentById(activeAssessmentId, locale) || assessmentList[0];
  const t = uiCopy[locale];

  useEffect(() => {
    document.documentElement.lang = locale === "id" ? "id" : "en";
  }, [locale]);

  return (
    <>
    <a className="skip-link" href="#main-content">Skip to main content</a>
    <main id="main-content" className="shell" tabIndex={-1}>
      {view === "home" && (
        <section className="home-view" aria-label="TrueVine quiz and assessments">
          <header className="hero-panel">
            <div className="locale-toggle" role="group" aria-label="Language selector">
              <button className={locale === "en" ? "active" : ""} type="button" aria-pressed={locale === "en"} aria-label="Switch language to English" onClick={() => setLocale("en")}>EN</button>
              <button className={locale === "id" ? "active" : ""} type="button" aria-pressed={locale === "id"} aria-label="Switch language to Bahasa Indonesia" onClick={() => setLocale("id")}>ID</button>
            </div>
            <div className="brand-row hero-brand">
              <div>
                <p className="eyebrow">{t.church}</p>
                <h1>{t.title}</h1>
              </div>
            </div>
            <p className="hero-copy">{t.hero}</p>
            <div className="benefit-row" aria-label="Assessment benefits">
              {t.benefits.map((benefit) => <span key={benefit}>{benefit}</span>)}
            </div>
            <div className="hero-actions">
              <button className="primary-button" type="button" onClick={() => setView("quiz")}>
                {t.openQuiz}
              </button>
              <a className="secondary-button" href="#assessments">
                {t.browse}
              </a>
              <a className="secondary-button" href={`/about?locale=${locale}`}>
                {t.about}
              </a>
            </div>
          </header>

          <section className="feature-grid" aria-label="Quiz and assessment options">
            <article className="feature-card quiz-card-feature">
              <div>
                <p className="eyebrow">{t.gameType}</p>
                <h2>{t.quizTitle}</h2>
                <p>{t.quizDescription}</p>
              </div>
              <button className="primary-button" type="button" onClick={() => setView("quiz")}>
                {t.startQuiz}
              </button>
            </article>

            <div id="assessments" className="assessment-grid" aria-label="Available assessments">
              {assessmentList.map((assessment) => (
                <article key={assessment.id} className={`feature-card accent-${assessment.accent}`}>
                  <p className="eyebrow">{t.assessment}</p>
                  <h2>{assessment.title}</h2>
                  <p className="feature-subtitle">{assessment.subtitle}</p>
                  <p>{assessment.description}</p>
                  <div className="meta-row">
                    <span>{assessment.time}</span>
                    <span>{assessment.source}</span>
                  </div>
                  <div className="card-footer">
                    <span>{assessment.questions.length} {t.questions}</span>
                    <button
                      className="secondary-button compact"
                      type="button"
                      aria-label={`${t.open} ${assessment.title}`}
                      onClick={() => {
                        setActiveAssessmentId(assessment.id);
                        setView("assessment");
                      }}
                    >
                      {t.open}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="why-panel">
            <h2>{t.whyTitle}</h2>
            <div className="why-grid">
              {t.why.map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </section>
        </section>
      )}

      {view === "quiz" && <QuizExperience onBack={() => setView("home")} />}

      {view === "assessment" && (
        <AssessmentExperience
          assessment={activeAssessment}
          campaignToken={campaignToken}
          onBack={() => setView("home")}
        />
      )}
    </main>
    </>
  );
}