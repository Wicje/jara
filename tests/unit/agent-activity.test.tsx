import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AgentActivity, { resolveOrderActivity } from "@/components/agent-activity";

function entry(status: string, directions: string[] = ["out"]) {
  return {
    order: { status },
    events: directions.map((direction) => ({ direction })),
  };
}

describe("resolveOrderActivity", () => {
  it("maps fresh placed orders to working", () => {
    expect(resolveOrderActivity([entry("placed")])).toEqual({ state: "working", flagged: false });
  });

  it("maps vendor replies to progress", () => {
    expect(resolveOrderActivity([entry("placed", ["out", "in"])])).toEqual({
      state: "progress",
      flagged: false,
    });
  });

  it("maps fully confirmed orders to completed", () => {
    expect(
      resolveOrderActivity([entry("confirmed", ["out", "in"]), entry("confirmed", ["out"])]),
    ).toEqual({ state: "completed", flagged: false });
  });

  it("surfaces the flagged marker without changing the state", () => {
    expect(resolveOrderActivity([entry("flagged")])).toEqual({ state: "working", flagged: true });
    expect(resolveOrderActivity([entry("confirmed"), entry("flagged", ["out", "in"])])).toEqual({
      state: "progress",
      flagged: true,
    });
  });
});

describe("AgentActivity", () => {
  it("renders controlled state copy", () => {
    render(<AgentActivity state="completed" showStateSelector={false} />);
    expect(screen.getByText("Confirmed")).toBeInTheDocument();
    expect(screen.getByText("Your pieces are being prepared")).toBeInTheDocument();
  });

  it("honours copy overrides", () => {
    render(
      <AgentActivity
        state="working"
        showStateSelector={false}
        copy={{ working: { title: "Needs a quick check" } }}
      />,
    );
    expect(screen.getByText("Needs a quick check")).toBeInTheDocument();
  });

  it("shows the states strip by default with pressed state", () => {
    render(<AgentActivity defaultState="progress" />);
    expect(screen.getByRole("button", { name: "Progress" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });
});
