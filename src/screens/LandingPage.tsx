import { ArrowRight, MoonStar, ShieldCheck, Sparkles, SunMedium, TerminalSquare, Wand2 } from 'lucide-react';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFeaturedTools, TOOLS } from '../lib/registry';
import { renderToolIcon } from '../lib/tool-icons';
import { useTheme } from '../components/ThemeProvider';

const HIGHLIGHTS = [
  {
    title: 'Offline-first workflows',
    description: 'Format, inspect, and convert payloads locally inside a desktop shell built for repeated utility work.',
    icon: <ShieldCheck className="h-4 w-4" />,
  },
  {
    title: 'Keyboard-driven shell',
    description: 'Jump through tools with the command palette, pinned shortcuts, and a layout designed around dense editing sessions.',
    icon: <TerminalSquare className="h-4 w-4" />,
  },
  {
    title: '50+ focused utilities',
    description: 'Move between JSON, JWT, hashes, regex, QR, timestamps, and more without context switching to a browser tab.',
    icon: <Wand2 className="h-4 w-4" />,
  },
];

const workspacePreview = new URL('../../assets/screenshots/workspace-dark.png', import.meta.url).href;

export function LandingPage() {
  const navigate = useNavigate();
  const featured = getFeaturedTools().slice(0, 6);
  const { resolvedTheme, setTheme } = useTheme();

  const toolCount = TOOLS.length;
  const categoryCount = useMemo(() => new Set(TOOLS.map((tool) => tool.category)).size, []);

  return (
    <div className="min-h-screen">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <button className="flex items-center gap-3 text-left" onClick={() => navigate('/landing')}>
          <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-primary/30 bg-primary/15 text-primary">
            <TerminalSquare className="h-5 w-5" />
          </div>
          <div>
            <div className="label-technical shell-text-subtle">Desktop utility suite</div>
            <div className="text-base font-black text-foreground">OpenDevUtils</div>
          </div>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="surface-low shell-border shell-hover flex items-center gap-2 rounded-sm border px-3 py-2 text-sm text-foreground transition-colors"
          >
            {resolvedTheme === 'dark' ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
            {resolvedTheme === 'dark' ? 'Light mode' : 'Dark mode'}
          </button>
          <button
            onClick={() => navigate('/')}
            className="gradient-cta inline-flex min-h-10 items-center gap-2 rounded-sm px-4 text-sm font-semibold text-primary-foreground"
          >
            Open workspace
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 pb-12 pt-4 lg:px-10">
        <section className="relative min-h-[560px] overflow-hidden rounded-sm border border-white/10 bg-slate-950 sm:min-h-[620px] lg:min-h-[calc(100dvh-12rem)]">
          <img
            src={workspacePreview}
            alt="OpenDevUtils workspace showing a developer utility dashboard"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-72"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.96)_0%,rgba(2,6,23,0.82)_36%,rgba(2,6,23,0.42)_72%,rgba(2,6,23,0.18)_100%)]" />
          <div className="relative flex min-h-[560px] max-w-3xl flex-col justify-center px-6 py-12 sm:min-h-[620px] lg:min-h-[calc(100dvh-12rem)] lg:px-10">
            <div className="label-technical text-emerald-300">Branch-green desktop workflows</div>
            <h1 className="mt-4 max-w-2xl text-5xl font-black text-white sm:text-6xl">
              OpenDevUtils workbench.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-200">
              Format, inspect, convert, and generate data in a local desktop shell with a sharper slate interface and green active states.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/')}
                className="gradient-cta inline-flex min-h-11 items-center gap-2 rounded-sm px-5 text-sm font-semibold text-primary-foreground"
              >
                Launch workspace
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => navigate('/json-formatter')}
                className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-white/20 bg-white/10 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/15"
              >
                Try JSON Formatter
              </button>
            </div>

            <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
              <MetricCard value={`${toolCount}+`} label="Utilities" />
              <MetricCard value={`${categoryCount}`} label="Workflows" />
              <MetricCard value="Local" label="Desktop shell" />
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {HIGHLIGHTS.map((item) => (
            <div key={item.title} className="surface-low shell-border rounded-sm border p-5">
              <div className="shell-text-accent flex items-center gap-2">
                {item.icon}
                <span className="text-sm font-semibold text-foreground">{item.title}</span>
              </div>
              <p className="shell-text-muted mt-2 text-sm leading-6">{item.description}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="surface-lowest shell-border rounded-sm border p-6">
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="shell-text-accent h-4 w-4" />
              <h2 className="label-technical shell-text-muted">Featured tools</h2>
            </div>
            <div className="grid gap-3">
              {featured.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => navigate(`/${tool.id}`)}
                  className="surface-low shell-border shell-hover flex items-center justify-between rounded-sm border p-4 text-left transition-colors hover:border-primary/35"
                >
                  <div className="flex items-center gap-3">
                    <div className="surface-bright shell-text-accent rounded-sm p-2 ring-1 ring-primary/20">{renderToolIcon(tool)}</div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">{tool.name}</div>
                      <div className="shell-text-muted mt-1 text-sm">{tool.description}</div>
                    </div>
                  </div>
                  <ArrowRight className="shell-text-subtle h-4 w-4" />
                </button>
              ))}
            </div>
          </div>

          <div className="surface-low shell-border rounded-sm border p-6">
            <div className="label-technical shell-text-accent">What the app includes</div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <FeatureTile title="Formatters" description="JSON, HTML, CSS, JS, SQL, XML, ERB, LESS, SCSS, and line cleanup tools." />
              <FeatureTile title="Converters" description="YAML, CSV, JSX, PHP, URLs, numbers, cURL, SVG, and binary text utilities." />
              <FeatureTile title="Inspectors" description="JWT parsing, regex testing, cron schedules, timestamps, markdown preview, and diffing." />
              <FeatureTile title="Generators" description="UUIDs, hashes, QR codes, random strings, and placeholder content for rapid prototyping." />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function MetricCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-sm border border-white/15 bg-white/10 p-4">
      <div className="text-2xl font-black text-white">{value}</div>
      <div className="mt-1 text-sm text-slate-200">{label}</div>
    </div>
  );
}

function FeatureTile({ title, description }: { title: string; description: string }) {
  return (
    <div className="surface-lowest shell-border rounded-sm border p-4">
      <div className="text-sm font-semibold text-foreground">{title}</div>
      <p className="shell-text-muted mt-2 text-sm leading-6">{description}</p>
    </div>
  );
}
