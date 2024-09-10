import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_dashboard/")({
  component: DashboardIndex,
});

function DashboardIndex() {
  return <div>Dashboard</div>;
}
