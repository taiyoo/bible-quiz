import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AssessmentExperience } from "./AssessmentExperience";
import { getAssessmentById } from "@/data/assessments";

async function completeAssessmentWithTopAnswer(questionCount: number) {
  const user = userEvent.setup();
  for (let index = 0; index < questionCount; index += 1) {
    await user.click(screen.getByRole("button", { name: /^5/ }));
  }
}

describe("AssessmentExperience", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders the Bahasa false-identity result as a high-risk interpretation", async () => {
    const assessment = getAssessmentById("identities-men", "id");
    expect(assessment).toBeDefined();

    render(<AssessmentExperience assessment={assessment!} campaignToken={null} onBack={vi.fn()} />);
    await completeAssessmentWithTopAnswer(assessment!.questions.length);

    expect(screen.getByRole("heading", { name: "Pemeriksaan Identitas Palsu (Pria)" })).toBeInTheDocument();
    expect(screen.getByText(/Risiko identitas palsu tertinggi:/)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Kebenaran untuk Direnungkan" })).toBeInTheDocument();
    expect(screen.getByText("100/100")).toBeInTheDocument();
    expect(screen.getAllByText(/Kebohongan yang diperiksa:/).length).toBeGreaterThan(0);
  });

  it("keeps growth assessments using low-score Scripture review", async () => {
    const assessment = getAssessmentById("prayer-life", "en");
    expect(assessment).toBeDefined();

    render(<AssessmentExperience assessment={assessment!} campaignToken={null} onBack={vi.fn()} />);
    await completeAssessmentWithTopAnswer(assessment!.questions.length);

    expect(screen.getByText(/Your strongest dimension:/)).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Verses to Revisit" })).not.toBeInTheDocument();
    expect(screen.getByText("100/100")).toBeInTheDocument();
  });
});
