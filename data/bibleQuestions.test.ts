import { describe, expect, it } from "vitest";
import { bibleQuestions, type Difficulty } from "./bibleQuestions";

describe("bibleQuestions", () => {
  it("preserves the pre-assessment quiz question bank", () => {
    const counts = bibleQuestions.reduce<Record<Difficulty, number>>(
      (currentCounts, question) => ({
        ...currentCounts,
        [question.difficulty]: currentCounts[question.difficulty] + 1,
      }),
      { easy: 0, medium: 0, hard: 0 }
    );

    expect(bibleQuestions).toHaveLength(96);
    expect(counts).toEqual({ easy: 33, medium: 32, hard: 31 });
    expect(bibleQuestions.at(0)?.question).toBe("What did God create on the first day?");
    expect(bibleQuestions.at(-1)?.question).toBe("What lesson did Jesus teach with the story of the ten virgins?");
  });
});