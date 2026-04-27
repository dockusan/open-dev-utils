import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Boxes, GitBranch, Sparkles, Zap } from 'lucide-react';
import { getFeaturedTools, getToolsByCategory, CATEGORY_LABELS, TOOLS, type ToolCategory } from '../lib/registry';
import { renderToolIcon } from '../lib/tool-icons';

const CATEGORIES: ToolCategory[] = ['format', 'converters', 'inspect', 'generators', 'encoders'];

export function WorkspaceHome() {
  const navigate = useNavigate();
  const featured = getFeaturedTools();

  return (
    <section className="space-y-8">
      <div className="surface-low shell-border overflow-hidden rounded-sm border">
        <div className="flex flex-wrap items-stretch justify-between gap-5 p-5 lg:p-6">
          <div className="min-w-0 flex-1">
            <div className="label-technical shell-text-accent inline-flex items-center gap-2">
              <GitBranch className="h-3.5 w-3.5" />
              Branch-green workspace
            </div>
            <h1 className="mt-2 text-3xl font-black text-foreground">Developer utility hub</h1>
            <p className="shell-text-muted mt-2 max-w-2xl text-sm leading-6">
              A dense, keyboard-friendly desktop workspace for formatting, inspecting, converting, and generating data without leaving the app.
            </p>
          </div>
          <div className="grid min-w-full gap-3 sm:min-w-[24rem] sm:grid-cols-3">
            <Metric icon={<Boxes className="h-4 w-4" />} value={`${TOOLS.length}`} label="Tools" />
            <Metric icon={<Zap className="h-4 w-4" />} value="Local" label="Runtime" />
            <Metric icon={<GitBranch className="h-4 w-4" />} value="Green" label="Brand" />
          </div>
        </div>
        <div className="shell-border flex flex-wrap items-center justify-between gap-3 border-t bg-primary/10 px-5 py-3 lg:px-6">
          <div className="shell-text-muted text-sm">Start with the formatter or jump to any utility from the sidebar.</div>
          <button
            onClick={() => navigate('/json-formatter')}
            className="gradient-cta inline-flex min-h-10 items-center gap-2 rounded-sm px-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Open formatter
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div>
        <div className="mb-4 flex items-center gap-2">
          <Sparkles className="shell-text-accent h-4 w-4" />
          <h2 className="label-technical shell-text-muted">Featured tools</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {featured.map((tool) => (
            <button
              key={tool.id}
              onClick={() => navigate(`/${tool.id}`)}
              className="surface-low shell-border group rounded-sm border p-4 text-left transition-colors hover:border-primary/35 hover:bg-primary/10"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="surface-bright shell-text-accent rounded-sm p-2 ring-1 ring-primary/20">{renderToolIcon(tool)}</div>
                <ArrowRight className="shell-text-subtle h-4 w-4 transition-colors group-hover:text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">{tool.name}</h3>
              <p className="shell-text-muted mt-1 text-sm">{tool.description}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        {CATEGORIES.map((category) => (
          <div key={category} className="surface-lowest shell-border rounded-sm border p-5">
            <div className="shell-border mb-4 flex items-center justify-between border-b pb-3">
              <h3 className="label-technical text-foreground">{CATEGORY_LABELS[category]}</h3>
              <span className="shell-text-subtle font-mono text-[10px] uppercase">
                {getToolsByCategory(category).length} tools
              </span>
            </div>
            <div className="space-y-2">
              {getToolsByCategory(category).slice(0, 6).map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => navigate(`/${tool.id}`)}
                  className="shell-text-muted shell-hover flex min-h-10 w-full items-center justify-between rounded-sm px-2 text-left text-sm transition-colors hover:text-foreground"
                >
                  <span>{tool.name}</span>
                  <ArrowRight className="shell-text-subtle h-4 w-4" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Metric({ icon, value, label }: { icon: ReactNode; value: string; label: string }) {
  return (
    <div className="surface-lowest shell-border rounded-sm border p-3">
      <div className="shell-text-accent flex items-center gap-2">
        {icon}
        <span className="text-lg font-black text-foreground">{value}</span>
      </div>
      <div className="shell-text-subtle mt-1 text-xs">{label}</div>
    </div>
  );
}
