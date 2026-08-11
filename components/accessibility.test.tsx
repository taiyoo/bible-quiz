import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";
import { AssessmentExperience } from "./AssessmentExperience";
import { QuizExperience } from "./QuizExperience";
import { getAssessmentById } from "@/data/assessments";

async function expectNoAxeViolations(container: HTMLElement) {
  const result = await axe.run(container, {
    rules: {
      "color-contrast": { enabled: false },
    },
  });
  expect(result.violations).toEqual([]);
}

describe("accessibility smoke checks", () => {
  it("exposes assessment progress, scale, and answer controls with accessible semantics", async () => {
    const assessment = getAssessmentById("love-languages", "en");
    expect(assessment).toBeDefined();

    const { container } = render(<AssessmentExperience assessment={assessment!} campaignToken={null} onBack={vi.fn()} />);

    expect(screen.getByRole("progressbar", { name: "Assessment progress" })).toHaveAttribute("aria-valuenow", "1");
    expect(screen.getByRole("group", { name: assessment!.questions[0].text })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "5: Very true" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Back to hub" })).toBeInTheDocument();

    await expectNoAxeViolations(container);
  });

  it("exposes quiz timer, team meters, and form controls to assistive technology", async () => {
    const { container } = render(<QuizExperience onBack={vi.fn()} />);

    expect(screen.getByRole("timer", { name: "Time remaining 05:00" })).toBeInTheDocument();
    expect(screen.getByRole("spinbutton", { name: "Minutes" })).toHaveValue(5);
    expect(screen.getByRole("meter", { name: "Team Light score meter" })).toHaveAttribute("aria-valuenow", "0");
    expect(screen.getByRole("meter", { name: "Team Wisdom score meter" })).toHaveAttribute("aria-valuenow", "0");
    expect(screen.getByRole("button", { name: "Reset quiz scores and timer" })).toBeInTheDocument();

    await expectNoAxeViolations(container);
  });
});
