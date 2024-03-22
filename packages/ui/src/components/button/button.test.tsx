import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Button } from "./button";

describe("Button", () => {
  it("renders correctly", () => {
    const { container } = render(<Button>Click me</Button>);

    expect(container.firstChild).toHaveClass("rounded-md");
    expect(container.firstChild).toHaveClass("text-primary-foreground");
    expect(container.firstChild).toHaveClass("bg-primary");
  });

  it("should have no accessibility violations", async () => {
    const { container } = render(<Button>Click me</Button>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("renders correctly with icon", () => {
    const { container } = render(<Button icon="Check">Click me</Button>);

    expect(container.firstChild).toHaveClass("rounded-md");
    expect(screen.getByTestId("button-icon-left")).toBeInTheDocument();
  });

  it("renders correctly with icon position", () => {
    render(
      <Button icon="Check" iconPosition="right">
        Click me
      </Button>,
    );

    expect(screen.getByTestId("button-icon-right")).toBeInTheDocument();
  });

  it("renders correctly as child", () => {
    render(
      <Button asChild>
        <a
          href="https://github.com/salty-max/jelly"
          target="_blank"
          rel="noreferrer"
        >
          Click me
        </a>
      </Button>,
    );

    const anchorElement = screen.getByRole("link", { name: /click me/i });
    expect(anchorElement).toBeInTheDocument();
    expect(anchorElement).toHaveAttribute(
      "href",
      "https://github.com/salty-max/jelly",
    );
    expect(anchorElement).toHaveAttribute("target", "_blank");
    expect(anchorElement).toHaveAttribute("rel", "noreferrer");
  });

  it("renders correctly with specific size", () => {
    const { container } = render(<Button size="sm">Click me</Button>);

    expect(container.firstChild).toHaveClass("h-9");
  });

  it("renders correctly with specific variant", () => {
    const { container } = render(
      <Button variant="destructive">Click me</Button>,
    );

    expect(container.firstChild).toHaveClass("bg-destructive");
  });
});
