"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { bibleQuestions, type BibleQuestion, type Difficulty } from "@/data/bibleQuestions";

type TeamKey = "left" | "right";

type TeamState = {
  name: string;
  score: number;
  answered: number;
  currentQuestion: BibleQuestion | null;
  choices: string[];
  feedback: string;
};

type Props = {
  onBack: () => void;
};

const difficultySequence: Difficulty[] = ["easy", "easy", "medium", "easy", "medium", "hard"];

function shuffle<T>(items: T[]) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function questionFor(team: TeamState, otherQuestion: BibleQuestion | null) {
  const difficulty = difficultySequence[team.answered % difficultySequence.length];
  const pool = bibleQuestions.filter(
    (question) => question.difficulty === difficulty && question.question !== otherQuestion?.question
  );
  return pool[Math.floor(Math.random() * pool.length)] || bibleQuestions[0];
}

const initialTeams: Record<TeamKey, TeamState> = {
  left: { name: "Team Light", score: 0, answered: 0, currentQuestion: null, choices: [], feedback: "" },
  right: { name: "Team Wisdom", score: 0, answered: 0, currentQuestion: null, choices: [], feedback: "" },
};

const teamLabels: Record<TeamKey, string> = {
  left: "Left team",
  right: "Right team",
};

export function QuizExperience({ onBack }: Props) {
  const [minutes, setMinutes] = useState(5);
  const [timeLeft, setTimeLeft] = useState(300);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const [teams, setTeams] = useState<Record<TeamKey, TeamState>>(initialTeams);

  const winner = useMemo(() => {
    if (!finished) return null;
    if (teams.left.score > teams.right.score) return teams.left.name;
    if (teams.right.score > teams.left.score) return teams.right.name;
    return "Tie";
  }, [finished, teams]);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      setTimeLeft((value) => {
        if (value <= 1) {
          setRunning(false);
          setFinished(true);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [running]);

  function setTeamName(team: TeamKey, name: string) {
    setTeams((current) => ({ ...current, [team]: { ...current[team], name } }));
  }

  function drawQuestion(teamKey: TeamKey, currentTeams: Record<TeamKey, TeamState>) {
    const otherKey = teamKey === "left" ? "right" : "left";
    const question = questionFor(currentTeams[teamKey], currentTeams[otherKey].currentQuestion);
    return {
      ...currentTeams[teamKey],
      answered: currentTeams[teamKey].answered + 1,
      currentQuestion: question,
      choices: shuffle(question.choices),
      feedback: "",
    };
  }

  function startOrPause() {
    if (finished) resetQuiz();
    if (!running && !teams.left.currentQuestion) {
      setTeams((current) => {
        const left = drawQuestion("left", current);
        const right = drawQuestion("right", { ...current, left });
        return { left, right };
      });
    }
    setRunning((value) => !value);
  }

  function resetQuiz() {
    setRunning(false);
    setFinished(false);
    setTimeLeft(minutes * 60);
    setTeams({
      left: { ...initialTeams.left, name: teams.left.name || initialTeams.left.name },
      right: { ...initialTeams.right, name: teams.right.name || initialTeams.right.name },
    });
  }

  function answer(teamKey: TeamKey, choice: string) {
    if (!running || finished) return;
    const team = teams[teamKey];
    if (!team.currentQuestion) return;
    const correct = choice === team.currentQuestion.answer;

    setTeams((current) => {
      const updatedTeam = {
        ...current[teamKey],
        score: current[teamKey].score + (correct ? 1 : 0),
        feedback: correct ? "Correct. Your lamp shines brighter." : `Good try. The answer was ${current[teamKey].currentQuestion?.answer}.`,
      };
      return { ...current, [teamKey]: updatedTeam };
    });

    window.setTimeout(() => {
      setTeams((current) => ({ ...current, [teamKey]: drawQuestion(teamKey, current) }));
    }, correct ? 700 : 1100);
  }

  function renderTeam(teamKey: TeamKey) {
    const team = teams[teamKey];
    const headingId = `${teamKey}-team-heading`;
    const questionId = `${teamKey}-team-question`;
    const feedbackId = `${teamKey}-team-feedback`;
    return (
      <article className={`team-panel ${teamKey === "left" ? "team-left" : "team-right"}`} aria-labelledby={headingId}>
        <header className="team-header">
          <label className="sr-only" htmlFor={`${teamKey}-team-name`}>{teamLabels[teamKey]} name</label>
          <input id={`${teamKey}-team-name`} value={team.name} onChange={(event) => setTeamName(teamKey, event.target.value)} />
          <span aria-label={`${team.name} score: ${team.score} correct`}>{team.score} correct</span>
        </header>
        <div className="lamp-meter" role="meter" aria-label={`${team.name} score meter`} aria-valuemin={0} aria-valuemax={12} aria-valuenow={Math.min(team.score, 12)} aria-valuetext={`${team.score} correct answers`}>
          {Array.from({ length: 12 }, (_, index) => (
            <span key={index} className={index < Math.min(team.score, 12) ? "lit" : ""} />
          ))}
        </div>
        <div className="question-box">
          <div className="question-meta">
            <span>{team.currentQuestion ? `${team.currentQuestion.story} - ${team.currentQuestion.difficulty}` : "Ready"}</span>
            <span>Question {team.answered}</span>
          </div>
          <h2 id={headingId}>{team.name}</h2>
          <p id={questionId} className="team-question-text">{team.currentQuestion?.question || "Press Start to begin."}</p>
          <div className="choices-grid" role="group" aria-labelledby={questionId} aria-describedby={feedbackId}>
            {team.choices.map((choice) => (
              <button key={choice} type="button" onClick={() => answer(teamKey, choice)} disabled={!running || finished} aria-label={`${team.name}: answer ${choice}`}>
                {choice}
              </button>
            ))}
          </div>
          <p id={feedbackId} className="feedback" role="status" aria-live="polite">{team.feedback}</p>
        </div>
      </article>
    );
  }

  return (
    <section className="quiz-view" aria-label="Two team Bible quiz">
      <button className="back-button" type="button" onClick={onBack}>Back to hub</button>
      <header className="quiz-topbar">
        <div className="brand-row compact-brand">
          <Image className="brand-logo compact-logo" src="/truevine-logo.jpg" alt="" aria-hidden="true" width={128} height={128} />
          <div>
            <p className="eyebrow">Ten Lamps Team Challenge</p>
            <h1>TrueVine Bible Quiz</h1>
          </div>
        </div>
        <div className="timer-card" role="timer" aria-live="polite" aria-label={`Time remaining ${formatTime(timeLeft)}`}>
          <span>Time</span>
          <strong>{formatTime(timeLeft)}</strong>
        </div>
        <div className="quiz-controls">
          <label htmlFor="quiz-minutes">
            Minutes
            <input
              id="quiz-minutes"
              type="number"
              min={1}
              max={30}
              value={minutes}
              onChange={(event) => {
                const nextMinutes = Math.max(1, Math.min(30, Number(event.target.value) || 5));
                setMinutes(nextMinutes);
                if (!running) setTimeLeft(nextMinutes * 60);
              }}
            />
          </label>
          <button className="primary-button" type="button" aria-pressed={running} onClick={startOrPause}>{running ? "Pause" : "Start"}</button>
          <button className="secondary-button compact" type="button" onClick={resetQuiz} aria-label="Reset quiz scores and timer">Reset</button>
        </div>
      </header>

      <section className="story-strip" aria-label="Quiz instructions">
        <div className="lamp-row" aria-hidden="true">
          {Array.from({ length: 10 }, (_, index) => <span key={index} className={index < 5 ? "lit" : ""} />)}
        </div>
        <p>{finished ? "Time is up. Well done, teams." : "Answer quickly and carefully. Both teams receive matching difficulty rounds."}</p>
      </section>

      {finished && (
        <section className="winner-panel" role="status" aria-live="polite">
          <p className="eyebrow">Final Result</p>
          <h2>{winner === "Tie" ? "It is a tie" : `${winner} wins`}</h2>
          <p>{teams.left.name}: {teams.left.score} correct. {teams.right.name}: {teams.right.score} correct.</p>
        </section>
      )}

      <section className="team-grid" aria-label="Team quiz boards">
        {renderTeam("left")}
        {renderTeam("right")}
      </section>
    </section>
  );
}