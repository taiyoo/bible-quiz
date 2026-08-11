"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { bibleQuestions, type BibleQuestion, type Difficulty } from "@/data/bibleQuestions";

type TeamKey = "left" | "right";
type WinnerKey = TeamKey | "tie";
type SoundName = "start" | "correct" | "wrong" | "win" | "tie";
type SoundStyle = "retro" | "soft";
type Tone = [frequency: number, delay: number, duration: number, type: OscillatorType, endFrequency?: number];

type ConfettiParticle = {
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  velocityX: number;
  velocityY: number;
  wave: number;
};

type TeamState = {
  name: string;
  score: number;
  answered: number;
  currentQuestion: BibleQuestion | null;
  currentQuestionIndex: number | null;
  usedQuestionIndexes: number[];
  choices: string[];
  feedback: string;
  locked: boolean;
  selectedChoice: string | null;
};

type Props = {
  onBack: () => void;
};

const difficultySequence: Difficulty[] = ["easy", "easy", "medium", "easy", "medium", "hard"];
const teamShortcuts: Record<TeamKey, string[]> = {
  left: ["A", "B", "C", "D"],
  right: ["1", "2", "3", "4"],
};
const soundSettingsKey = "ten-lamps-sound-settings";
const wellCells = 48;
const confettiColors = ["#f6c84f", "#f58b3d", "#ee596b", "#20a7a0", "#4785e8", "#63b35d", "#fff8e8"];

const soundPatterns: Record<SoundStyle, Record<SoundName, Tone[]>> = {
  soft: {
    start: [[392, 0, 0.09, "triangle"], [523.25, 0.1, 0.12, "triangle"]],
    correct: [[523.25, 0, 0.08, "sine"], [659.25, 0.08, 0.08, "sine"], [783.99, 0.16, 0.13, "sine"]],
    wrong: [[246.94, 0, 0.12, "triangle"], [196, 0.1, 0.16, "triangle"]],
    win: [[392, 0, 0.11, "triangle"], [523.25, 0.1, 0.11, "triangle"], [659.25, 0.2, 0.11, "triangle"], [783.99, 0.3, 0.22, "triangle"]],
    tie: [[440, 0, 0.12, "sine"], [440, 0.16, 0.12, "sine"], [587.33, 0.32, 0.18, "sine"]],
  },
  retro: {
    start: [[523.25, 0, 0.055, "square", 659.25], [783.99, 0.06, 0.08, "square", 1046.5]],
    correct: [[987.77, 0, 0.045, "square", 1318.51], [1318.51, 0.05, 0.045, "square", 1567.98], [1760, 0.1, 0.09, "square", 2093]],
    wrong: [[220, 0, 0.08, "square", 185], [164.81, 0.08, 0.14, "square", 123.47]],
    win: [[523.25, 0, 0.07, "square", 659.25], [659.25, 0.07, 0.07, "square", 783.99], [783.99, 0.14, 0.07, "square", 1046.5], [1046.5, 0.21, 0.08, "square", 1318.51], [1567.98, 0.31, 0.18, "square", 2093]],
    tie: [[659.25, 0, 0.07, "square", 783.99], [659.25, 0.12, 0.07, "square", 783.99], [987.77, 0.24, 0.15, "square", 1174.66]],
  },
};

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

function questionFor(team: TeamState, otherTeam: TeamState) {
  const difficulty = difficultySequence[team.answered % difficultySequence.length];
  const blockedQuestionIndex = otherTeam.currentQuestion?.difficulty === difficulty ? otherTeam.currentQuestionIndex : null;
  let usedQuestionIndexes = team.usedQuestionIndexes;
  let pool = bibleQuestions
    .map((question, questionIndex) => ({ question, questionIndex }))
    .filter(
      ({ question, questionIndex }) =>
        question.difficulty === difficulty &&
        !usedQuestionIndexes.includes(questionIndex) &&
        questionIndex !== blockedQuestionIndex
    );

  if (pool.length === 0) {
    usedQuestionIndexes = [];
    pool = bibleQuestions
      .map((question, questionIndex) => ({ question, questionIndex }))
      .filter(({ question, questionIndex }) => question.difficulty === difficulty && questionIndex !== blockedQuestionIndex);
  }

  const selected = pool[Math.floor(Math.random() * pool.length)] || bibleQuestions
    .map((question, questionIndex) => ({ question, questionIndex }))
    .find(({ question }) => question.difficulty === difficulty) || { question: bibleQuestions[0], questionIndex: 0 };

  return {
    ...selected,
    usedQuestionIndexes: [...usedQuestionIndexes, selected.questionIndex],
  };
}

function createInitialTeam(name: string): TeamState {
  return {
    name,
    score: 0,
    answered: 0,
    currentQuestion: null,
    currentQuestionIndex: null,
    usedQuestionIndexes: [],
    choices: [],
    feedback: "",
    locked: false,
    selectedChoice: null,
  };
}

function createConfettiParticle(winner: WinnerKey): ConfettiParticle {
  const fromLeft = winner === "left";
  const fromRight = winner === "right";
  const startX = fromLeft ? window.innerWidth * 0.24 : fromRight ? window.innerWidth * 0.76 : window.innerWidth * 0.5;
  const spread = winner === "tie" ? window.innerWidth * 0.38 : window.innerWidth * 0.18;
  return {
    x: startX + (Math.random() - 0.5) * spread,
    y: -20 - Math.random() * 160,
    size: 7 + Math.random() * 10,
    color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
    rotation: Math.random() * Math.PI,
    rotationSpeed: -0.18 + Math.random() * 0.36,
    velocityX: -2.4 + Math.random() * 4.8,
    velocityY: 2.5 + Math.random() * 4,
    wave: Math.random() * Math.PI * 2,
  };
}

function getAudioContextClass() {
  return window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
}

function loadSoundSettings() {
  try {
    const settings = JSON.parse(window.localStorage.getItem(soundSettingsKey) || "null") as { enabled?: boolean; volume?: number; style?: SoundStyle } | null;
    if (!settings) return { enabled: true, volume: 55, style: "retro" as SoundStyle };
    return {
      enabled: settings.enabled !== false,
      volume: Math.max(0, Math.min(100, Number(settings.volume) || 55)),
      style: settings.style === "soft" ? "soft" as SoundStyle : "retro" as SoundStyle,
    };
  } catch {
    return { enabled: true, volume: 55, style: "retro" as SoundStyle };
  }
}

const initialTeams: Record<TeamKey, TeamState> = {
  left: createInitialTeam("Team Light"),
  right: createInitialTeam("Team Wisdom"),
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
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [soundVolume, setSoundVolume] = useState(55);
  const [soundStyle, setSoundStyle] = useState<SoundStyle>("retro");
  const audioContextRef = useRef<AudioContext | null>(null);
  const confettiCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const confettiAnimationRef = useRef<number | null>(null);
  const confettiParticlesRef = useRef<ConfettiParticle[]>([]);
  const celebratedRef = useRef(false);
  const runningRef = useRef(false);
  const finishedRef = useRef(false);

  const winner = useMemo(() => {
    if (!finished) return null;
    if (teams.left.score > teams.right.score) return teams.left.name;
    if (teams.right.score > teams.left.score) return teams.right.name;
    return "Tie";
  }, [finished, teams]);

  useEffect(() => {
    const settings = loadSoundSettings();
    setSoundEnabled(settings.enabled);
    setSoundVolume(settings.volume);
    setSoundStyle(settings.style);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(soundSettingsKey, JSON.stringify({ enabled: soundEnabled, volume: soundVolume, style: soundStyle }));
  }, [soundEnabled, soundStyle, soundVolume]);

  useEffect(() => {
    runningRef.current = running;
    finishedRef.current = finished;
  }, [finished, running]);

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

  useEffect(() => {
    if (!finished) {
      celebratedRef.current = false;
      return;
    }
    if (celebratedRef.current) return;
    celebratedRef.current = true;

    const winnerKey: WinnerKey = teams.left.score === teams.right.score ? "tie" : teams.left.score > teams.right.score ? "left" : "right";
    playSound(winnerKey === "tie" ? "tie" : "win");
    launchConfetti(winnerKey);
  }, [finished, teams.left.score, teams.right.score]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const activeTag = document.activeElement?.tagName;
      if (event.repeat || activeTag === "INPUT" || activeTag === "TEXTAREA" || activeTag === "SELECT") return;

      const leftIndex = teamShortcuts.left.indexOf(event.key.toUpperCase());
      if (leftIndex >= 0) {
        event.preventDefault();
        const choice = teams.left.choices[leftIndex];
        if (choice) answer("left", choice);
        return;
      }

      const rightIndex = teamShortcuts.right.indexOf(event.key);
      if (rightIndex >= 0) {
        event.preventDefault();
        const choice = teams.right.choices[rightIndex];
        if (choice) answer("right", choice);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  useEffect(() => () => stopConfetti(), []);

  function ensureAudioContext() {
    const AudioContextClass = getAudioContextClass();
    if (!AudioContextClass) return null;
    if (!audioContextRef.current) audioContextRef.current = new AudioContextClass();
    if (audioContextRef.current.state === "suspended") void audioContextRef.current.resume();
    return audioContextRef.current;
  }

  function playTone(frequency: number, startTime: number, duration: number, type: OscillatorType, volume: number, endFrequency = frequency) {
    const context = ensureAudioContext();
    if (!context || volume <= 0) return;

    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, startTime);
    oscillator.frequency.exponentialRampToValueAtTime(endFrequency, startTime + duration);
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, volume * 0.18), startTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(startTime);
    oscillator.stop(startTime + duration + 0.03);
  }

  function playNoise(startTime: number, duration: number, volume: number) {
    const context = ensureAudioContext();
    if (!context || volume <= 0) return;

    const bufferSize = Math.floor(context.sampleRate * duration);
    const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
    const data = buffer.getChannelData(0);
    for (let index = 0; index < bufferSize; index += 1) {
      data[index] = (Math.random() * 2 - 1) * (1 - index / bufferSize);
    }

    const source = context.createBufferSource();
    const gain = context.createGain();
    const filter = context.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.setValueAtTime(700, startTime);
    gain.gain.setValueAtTime(volume * 0.12, startTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
    source.buffer = buffer;
    source.connect(filter);
    filter.connect(gain);
    gain.connect(context.destination);
    source.start(startTime);
    source.stop(startTime + duration);
  }

  function playSound(name: SoundName) {
    const volume = soundEnabled ? Math.max(0, Math.min(1, soundVolume / 100)) : 0;
    const context = ensureAudioContext();
    if (!context || volume <= 0) return;

    const now = context.currentTime;
    soundPatterns[soundStyle][name].forEach(([frequency, delay, duration, type, endFrequency]) => {
      playTone(frequency, now + delay, duration, type, volume, endFrequency);
    });

    if (soundStyle === "retro" && name === "wrong") {
      playNoise(now + 0.03, 0.08, volume);
    }
  }

  function resizeConfettiCanvas() {
    const canvas = confettiCanvasRef.current;
    if (!canvas) return null;
    const pixelRatio = window.devicePixelRatio || 1;
    canvas.width = Math.floor(window.innerWidth * pixelRatio);
    canvas.height = Math.floor(window.innerHeight * pixelRatio);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    const context = canvas.getContext("2d");
    context?.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    return context;
  }

  function launchConfetti(winnerKey: WinnerKey) {
    stopConfetti();
    const context = resizeConfettiCanvas();
    if (!context) return;
    const startedAt = performance.now();
    confettiParticlesRef.current = Array.from({ length: winnerKey === "tie" ? 170 : 210 }, () => createConfettiParticle(winnerKey));

    function drawFrame(timestamp: number) {
      const canvasContext = resizeConfettiCanvas();
      if (!canvasContext) return;
      const elapsed = timestamp - startedAt;
      canvasContext.clearRect(0, 0, window.innerWidth, window.innerHeight);

      confettiParticlesRef.current.forEach((particle) => {
        particle.wave += 0.08;
        particle.x += particle.velocityX + Math.sin(particle.wave) * 0.9;
        particle.y += particle.velocityY;
        particle.velocityY += 0.035;
        particle.rotation += particle.rotationSpeed;

        canvasContext.save();
        canvasContext.translate(particle.x, particle.y);
        canvasContext.rotate(particle.rotation);
        canvasContext.fillStyle = particle.color;
        canvasContext.fillRect(-particle.size / 2, -particle.size / 3, particle.size, particle.size * 0.66);
        canvasContext.restore();

        if (particle.y > window.innerHeight + 40) {
          Object.assign(particle, createConfettiParticle(winnerKey), { y: -20 });
        }
      });

      if (elapsed < 5000) {
        confettiAnimationRef.current = window.requestAnimationFrame(drawFrame);
      } else {
        stopConfetti();
      }
    }

    confettiAnimationRef.current = window.requestAnimationFrame(drawFrame);
  }

  function stopConfetti() {
    if (confettiAnimationRef.current) {
      window.cancelAnimationFrame(confettiAnimationRef.current);
      confettiAnimationRef.current = null;
    }
    confettiParticlesRef.current = [];
    const context = confettiCanvasRef.current?.getContext("2d");
    context?.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }

  function setTeamName(team: TeamKey, name: string) {
    setTeams((current) => ({ ...current, [team]: { ...current[team], name } }));
  }

  function drawQuestion(teamKey: TeamKey, currentTeams: Record<TeamKey, TeamState>) {
    const otherKey = teamKey === "left" ? "right" : "left";
    const selection = questionFor(currentTeams[teamKey], currentTeams[otherKey]);
    return {
      ...currentTeams[teamKey],
      answered: currentTeams[teamKey].answered + 1,
      currentQuestion: selection.question,
      currentQuestionIndex: selection.questionIndex,
      usedQuestionIndexes: selection.usedQuestionIndexes,
      choices: shuffle(selection.question.choices),
      feedback: "",
      locked: false,
      selectedChoice: null,
    };
  }

  function startOrPause() {
    if (running) {
      setRunning(false);
      return;
    }

    if (finished || timeLeft <= 0) {
      const resetTeams = {
        left: createInitialTeam(teams.left.name || initialTeams.left.name),
        right: createInitialTeam(teams.right.name || initialTeams.right.name),
      };
      const left = drawQuestion("left", resetTeams);
      const right = drawQuestion("right", { ...resetTeams, left });
      stopConfetti();
      setTeams({ left, right });
      setTimeLeft(minutes * 60);
      setFinished(false);
      setRunning(true);
      playSound("start");
      return;
    }

    if (!running && !teams.left.currentQuestion) {
      setTeams((current) => {
        const left = drawQuestion("left", current);
        const right = drawQuestion("right", { ...current, left });
        return { left, right };
      });
    }
    setRunning(true);
    playSound("start");
  }

  function resetQuiz() {
    stopConfetti();
    setRunning(false);
    setFinished(false);
    setTimeLeft(minutes * 60);
    setTeams({
      left: createInitialTeam(teams.left.name || initialTeams.left.name),
      right: createInitialTeam(teams.right.name || initialTeams.right.name),
    });
  }

  function answer(teamKey: TeamKey, choice: string) {
    if (!running || finished) return;
    const team = teams[teamKey];
    if (!team.currentQuestion || team.locked) return;
    const correct = choice === team.currentQuestion.answer;
    playSound(correct ? "correct" : "wrong");

    setTeams((current) => {
      const currentTeam = current[teamKey];
      if (!currentTeam.currentQuestion || currentTeam.locked) return current;
      const updatedTeam = {
        ...currentTeam,
        score: currentTeam.score + (correct ? 1 : 0),
        feedback: correct ? "Correct! Your lamp shines brighter." : `Good try. The answer was ${currentTeam.currentQuestion.answer}.`,
        locked: true,
        selectedChoice: choice,
      };
      return { ...current, [teamKey]: updatedTeam };
    });

    window.setTimeout(() => {
      if (!runningRef.current || finishedRef.current) return;
      setTeams((current) => ({ ...current, [teamKey]: drawQuestion(teamKey, current) }));
    }, correct ? 850 : 1250);
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
        <div className="lamp-meter" role="meter" aria-label={`${team.name} score meter`} aria-valuemin={0} aria-valuemax={wellCells} aria-valuenow={Math.min(team.score, wellCells)} aria-valuetext={`${team.score} correct answers`}>
          {Array.from({ length: wellCells }, (_, index) => (
            <span key={index} className={wellCells - index <= Math.min(team.score, wellCells) ? "lit" : ""} />
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
            {team.choices.map((choice, index) => {
              const isCorrectAnswer = team.locked && choice === team.currentQuestion?.answer;
              const isWrongSelection = team.locked && choice === team.selectedChoice && choice !== team.currentQuestion?.answer;
              const shortcut = teamShortcuts[teamKey][index];
              return (
              <button
                key={choice}
                className={isCorrectAnswer ? "correct" : isWrongSelection ? "wrong" : ""}
                type="button"
                onClick={() => answer(teamKey, choice)}
                disabled={!running || finished || team.locked}
                aria-keyshortcuts={shortcut}
                aria-label={`${team.name}: answer ${choice}`}
              >
                <span className="choice-key" aria-hidden="true">{shortcut}</span>
                <span>{choice}</span>
              </button>
              );
            })}
          </div>
          <p id={feedbackId} className="feedback" role="status" aria-live="polite">{team.feedback}</p>
        </div>
      </article>
    );
  }

  return (
    <section className="quiz-view" aria-label="Two team Bible quiz">
      <canvas ref={confettiCanvasRef} className="confetti-canvas" aria-hidden="true" />
      <button className="back-button" type="button" onClick={onBack}>Back to hub</button>
      <header className="quiz-topbar">
        <div className="brand-row compact-brand">
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
          <label className="sound-toggle" htmlFor="sound-enabled">
            <input
              id="sound-enabled"
              type="checkbox"
              checked={soundEnabled}
              onChange={(event) => setSoundEnabled(event.target.checked)}
            />
            <span>Sound</span>
          </label>
          <label className="volume-control" htmlFor="sound-volume">
            <span>Volume</span>
            <input
              id="sound-volume"
              type="range"
              min={0}
              max={100}
              value={soundVolume}
              onChange={(event) => setSoundVolume(Number(event.target.value))}
              disabled={!soundEnabled}
            />
          </label>
          <label className="sound-style" htmlFor="sound-style">
            <span>Style</span>
            <select
              id="sound-style"
              value={soundStyle}
              onChange={(event) => setSoundStyle(event.target.value === "soft" ? "soft" : "retro")}
              disabled={!soundEnabled}
            >
              <option value="retro">Retro</option>
              <option value="soft">Soft</option>
            </select>
          </label>
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