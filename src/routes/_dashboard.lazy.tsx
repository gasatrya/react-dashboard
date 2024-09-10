import Sidebar from "@/components/sidebar";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Outlet, createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_dashboard")({
  component: DashboardLayout,
});

function DashboardLayout() {
  const sidebarOpen = useAppStore((state) => state.sidebarOpen);

  return (
    <div className="text-sm 2xl:text-base md:text-base antialiased relative">
      <div className="bg-body-pattern bg-body-pattern-size bg-repeat h-full w-full absolute top-0 left-0 z-0"></div>
      <div className="flex min-h-screen overflow-hidden w-full bg-background">
        <Sidebar active={sidebarOpen} />

        <div
          className={cn(
            "p-10 transition-all duration-300 w-full z-10",
            sidebarOpen ? "ml-0" : "ml-72"
          )}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
