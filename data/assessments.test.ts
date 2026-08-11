import { describe, expect, it } from "vitest";
import { getAssessmentById, getAssessments, type Locale } from "./assessments";

const expectedAssessmentIds = [
  "prayer-life",
  "overcomer",
  "purpose",
  "commitment",
  "love-languages",
  "identities-women",
  "identities-men",
];

const locales: Locale[] = ["en", "id"];

const expectedQuestionCounts = {
  "prayer-life": 20,
  overcomer: 20,
  purpose: 20,
  commitment: 30,
  "love-languages": 30,
  "identities-women": 25,
  "identities-men": 20,
} as const;

describe("assessment registry", () => {
  it("publishes every production assessment in both supported locales", () => {
    for (const locale of locales) {
      expect(getAssessments(locale).map((assessment) => assessment.id)).toEqual(expectedAssessmentIds);
    }
  });

  it("keeps each assessment scoring contract internally consistent", () => {
    for (const locale of locales) {
      for (const assessment of getAssessments(locale)) {
        const dimensionKeys = Object.keys(assessment.dimensions);
        const questionIds = new Set(assessment.questions.map((question) => question.id));

        expect(assessment.locale).toBe(locale);
        expect(assessment.questions).toHaveLength(expectedQuestionCounts[assessment.id]);
        expect(questionIds.size).toBe(assessment.questions.length);
        expect(assessment.questions.length).toBeGreaterThan(0);
        expect(assessment.reflectionQuestions.length).toBeGreaterThan(0);
        expect(assessment.scale.map((option) => option.value)).toEqual([5, 4, 3, 2, 1]);

        for (const key of dimensionKeys) {
          const questionsForDimension = assessment.questions.filter((question) => question.dimension === key);

          expect(assessment.maxPerDimension[key]).toBe(questionsForDimension.length * 5);
          expect(assessment.maxPerDimension[key]).toBeGreaterThan(0);
          expect(assessment.dimensions[key].label).toBeTruthy();
          expect(assessment.dimensions[key].summary).toBeTruthy();
          expect(assessment.dimensions[key].detail).toBeTruthy();
          expect(assessment.dimensions[key].next).toBeTruthy();
        }

        for (const question of assessment.questions) {
          expect(dimensionKeys).toContain(question.dimension);
          expect(question.text).toBeTruthy();
          expect(question.verse).toBeTruthy();
        }
      }
    }
  });

  it("localizes the new Love Languages assessment", () => {
    const english = getAssessmentById("love-languages", "en");
    const bahasa = getAssessmentById("love-languages", "id");

    expect(english?.title).toBe("5 Love Languages");
    expect(bahasa?.title).toBe("5 Bahasa Cinta");
    expect(english?.questions).toHaveLength(30);
    expect(bahasa?.questions).toHaveLength(30);
    expect(bahasa?.dimensions.W.label).toBe("Kata-kata Penegasan");
  });

  it("configures false identity checks as high-score risk assessments", () => {
    const women = getAssessmentById("identities-women", "id");
    const men = getAssessmentById("identities-men", "id");

    expect(women?.questions).toHaveLength(25);
    expect(men?.questions).toHaveLength(20);
    expect(women?.revisitMode).toBe("high");
    expect(men?.revisitMode).toBe("high");
    expect(women?.scale[0].label).toBe("Sangat sering");
    expect(men?.resultLabels.strongest).toBe("Risiko identitas palsu tertinggi");
  });
});
