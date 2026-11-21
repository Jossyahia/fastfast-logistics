"use client";

import * as React from "react";
import { Monitor, Moon, Sun, Check } from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ModeToggleProps {
  className?: string;
}

const ModeToggle: React.FC<ModeToggleProps> = ({ className = "" }) => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const currentTheme = mounted ? (theme || "system") : "system";
  const Icon = !mounted || currentTheme === "system"
    ? Monitor
    : resolvedTheme === "dark" ? Moon : Sun;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={`Appearance: ${currentTheme}. Change colour theme`}
          title="Change appearance"
          className={`group inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-neutral-200 bg-white text-neutral-700 shadow-sm outline-none transition duration-200 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 active:scale-95 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:border-indigo-700 dark:hover:bg-indigo-950/70 dark:hover:text-indigo-200 dark:focus-visible:ring-offset-neutral-950 ${className}`}
        >
          <Icon className="h-[18px] w-[18px] transition-transform duration-200 group-hover:rotate-[-12deg]" aria-hidden="true" />
          <span className="sr-only">Choose light, dark or system appearance</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={10} className="z-[100] w-48 rounded-2xl border border-neutral-200 bg-white p-1.5 shadow-xl dark:border-neutral-700 dark:bg-neutral-900">
        {([
          { value: "light", label: "Light", icon: Sun },
          { value: "dark", label: "Dark", icon: Moon },
          { value: "system", label: "Use device setting", icon: Monitor },
        ] as const).map(({ value, label, icon: ItemIcon }) => (
          <DropdownMenuItem
            key={value}
            onSelect={() => setTheme(value)}
            className="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl px-3 text-sm font-medium outline-none focus:bg-indigo-50 focus:text-indigo-700 dark:focus:bg-indigo-950/70 dark:focus:text-indigo-200"
          >
            <ItemIcon className="h-4 w-4 text-neutral-500" aria-hidden="true" />
            <span className="flex-1">{label}</span>
            {currentTheme === value && <Check className="h-4 w-4 text-indigo-600 dark:text-indigo-300" aria-label="Selected" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ModeToggle;
