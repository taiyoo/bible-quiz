"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AssessmentExperience } from "@/components/AssessmentExperience";
import { QuizExperience } from "@/components/QuizExperience";
import { assessments, getAssessmentById, type AssessmentId } from "@/data/assessments";

type View = "home" | "quiz" | "assessment";

export function TrueVineApp() {
  const searchParams = useSearchParams();
  const requestedAssessment = searchParams.get("assessment");
  const campaignToken = searchParams.get("campaign") || searchParams.get("campaignToken");
  const [view, setView] = useState<View>("home");
  const [activeAssessmentId, setActiveAssessmentId] = useState<AssessmentId>("prayer-life");

  useEffect(() => {
    const assessment = getAssessmentById(requestedAssessment);
    if (!assessment) return;
    setActiveAssessmentId(assessment.id);
    setView("assessment");
  }, [requestedAssessment]);

  const activeAssessment = getAssessmentById(activeAssessmentId) || assessments[0];

  return (
    <main className="shell">
      {view === "home" && (
        <section className="home-view" aria-label="TrueVine quiz and assessments">
          <header className="hero-panel">
            <div className="brand-row">
              <span className="brand-flame" aria-hidden="true" />
              <div>
                <p className="eyebrow">TrueVine Church</p>
                <h1>Quiz & Assessments</h1>
              </div>
            </div>
            <p className="hero-copy">
              Bible challenges and spiritual reflection tools for small groups, classes, and church campaigns.
            </p>
            <div className="hero-actions">
              <button className="primary-button" type="button" onClick={() => setView("quiz")}>
                Open Bible Quiz
              </button>
              <a className="secondary-button" href="#assessments">
                Browse Assessments
              </a>
            </div>
            <p className="powered-line">Powered by HoloCare backend</p>
          </header>

          <section className="feature-grid" aria-label="Quiz and assessment options">
            <article className="feature-card quiz-card-feature">
              <div>
                <p className="eyebrow">Team Game</p>
                <h2>Ten Lamps Bible Quiz</h2>
                <p>Two teams race through Bible questions with a timer, score board, and shared difficulty rounds.</p>
              </div>
              <button className="primary-button" type="button" onClick={() => setView("quiz")}>
                Start Quiz
              </button>
            </article>

            <div id="assessments" className="assessment-grid">
              {assessments.map((assessment) => (
                <article key={assessment.id} className={`feature-card accent-${assessment.accent}`}>
                  <p className="eyebrow">Assessment</p>
                  <h2>{assessment.title}</h2>
                  <p className="feature-subtitle">{assessment.subtitle}</p>
                  <p>{assessment.description}</p>
                  <div className="card-footer">
                    <span>{assessment.questions.length} questions</span>
                    <button
                      className="secondary-button compact"
                      type="button"
                      onClick={() => {
                        setActiveAssessmentId(assessment.id);
                        setView("assessment");
                      }}
                    >
                      Open
                    </button>
                  </div>
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
  );
}