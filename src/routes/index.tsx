import { createFileRoute } from "@tanstack/react-router";
import { Playbook } from "@/components/playbook";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <Playbook />;
}
