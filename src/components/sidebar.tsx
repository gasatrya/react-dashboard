import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { Cpu, PanelLeftClose } from "lucide-react";

export default function Sidebar({ active }: { active: boolean }) {
  const sidebarOpen = useAppStore((state) => state.sidebarOpen);
  const setSidebarOpen = useAppStore((state) => state.setSidebarOpen);

  return (
    <aside
      className={cn(
        "w-72 text-sm 2xl:text-base transition-transform duration-300 fixed py-5 px-6 bg-secondary/50 h-dvh overflow-y-auto border-r",
        active ? "-translate-x-full " : ""
      )}
    >
      <div className="flex flex-col gap-8 h-full">
        <header>
          <h1 className="text-primary font-bold text-2xl">LOGO</h1>
        </header>

        <div className="flex flex-col gap-4">
          <h2 className="uppercase text-xs font-medium tracking-wider text-muted-foreground">
            Navigation
          </h2>
          <ul>
            <li>
              <Link
                to="/"
                className="flex items-center gap-3 font-medium hover:text-primary text-[15px]"
              >
                <Cpu size={18} strokeWidth={1.5} />
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        <footer className="mt-auto">
          <Button
            type="button"
            variant="link"
            className="p-0 flex items-center gap-1 font-semibold text-sm hover:no-underline text-foreground hover:text-primary"
            onClick={() => {
              setSidebarOpen(!sidebarOpen);
            }}
          >
            <PanelLeftClose size={18} strokeWidth={1.5} />
            Collapse Menu
          </Button>
        </footer>
      </div>
    </aside>
  );
}
