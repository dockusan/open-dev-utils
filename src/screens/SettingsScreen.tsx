import type { ReactNode } from 'react';
import { Laptop, Moon, Sun } from 'lucide-react';
import { useTheme } from '../components/ThemeProvider';
import { cn } from '../lib/utils';

export function SettingsScreen() {
  const { theme, setTheme } = useTheme();

  return (
    <section className="mx-auto max-w-5xl space-y-8">
      <header>
        <div className="label-technical shell-text-subtle">Preferences</div>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">Workspace settings</h1>
        <p className="shell-text-muted mt-2 max-w-2xl text-sm">
          Configure the desktop shell, global appearance, and command workflow for the redesigned workspace.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="surface-low shell-border rounded-sm border p-5">
          <div className="label-technical shell-text-accent">Appearance</div>
          <h2 className="mt-2 text-sm font-semibold text-foreground">Theme</h2>
          <p className="shell-text-muted mt-1 text-sm">Switch between dark, light, or system mode.</p>
          <div className="surface-highest shell-border mt-4 flex rounded-sm border p-1">
            <ThemeButton active={theme === 'light'} onClick={() => setTheme('light')} icon={<Sun className="h-4 w-4" />} label="Light" />
            <ThemeButton active={theme === 'dark'} onClick={() => setTheme('dark')} icon={<Moon className="h-4 w-4" />} label="Dark" />
            <ThemeButton active={theme === 'system'} onClick={() => setTheme('system')} icon={<Laptop className="h-4 w-4" />} label="System" />
          </div>
        </section>

        <section className="surface-low shell-border rounded-sm border p-5">
          <div className="label-technical shell-text-accent">Keyboard</div>
          <h2 className="mt-2 text-sm font-semibold text-foreground">Command palette</h2>
          <p className="shell-text-muted mt-1 text-sm">Open the global palette from anywhere in the shell.</p>
          <div className="shell-border shell-panel-soft mt-4 flex items-center justify-between rounded-sm border px-4 py-3">
            <span className="shell-text-muted text-sm">Primary shortcut</span>
            <span className="shell-border shell-text-accent rounded-sm border px-2 py-1 font-mono text-xs uppercase tracking-[0.18em]">
              Cmd / Ctrl + K
            </span>
          </div>
        </section>

        <section className="surface-low shell-border rounded-sm border p-5 lg:col-span-2">
          <div className="label-technical shell-text-accent">Design system</div>
          <div className="mt-3 grid gap-4 md:grid-cols-3">
            <InfoCard title="Precision Engine" description="Dense tonal surfaces, restrained corners, and editor-first spacing." />
            <InfoCard title="Typography split" description="Inter for shell chrome, JetBrains Mono for code, payloads, and outputs." />
            <InfoCard title="No-line structure" description="Panels rely on layered surfaces and ghost borders instead of hard dividers." />
          </div>
        </section>
      </div>
    </section>
  );
}

function ThemeButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-1 items-center justify-center gap-2 rounded-sm px-3 py-2 text-sm transition-colors",
        active ? "shell-panel-soft text-foreground ring-1 ring-border" : "shell-text-muted shell-hover hover:text-foreground"
      )}
    >
      {icon}
      {label}
    </button>
  );
}

function InfoCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="surface-lowest shell-border rounded-sm border p-4">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <p className="shell-text-muted mt-2 text-sm">{description}</p>
    </div>
  );
}
