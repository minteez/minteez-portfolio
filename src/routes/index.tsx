import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/components/portfolio/portfolio";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return <Portfolio />;
}
