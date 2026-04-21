import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { getFeaturedTools, getToolsByCategory, CATEGORY_LABELS, type ToolCategory } from '../lib/registry';
import { renderToolIcon } from '../lib/tool-icons';

const CATEGORIES: ToolCategory[] = ['format', 'converters', 'inspect', 'generators', 'encoders'];

export function WorkspaceHome() {
  const navigate = useNavigate();
  const featured = getFeaturedTools();

  return (
    <section className="space-y-8">
      <div className="surface-high shell-border flex flex-wrap items-center justify-between gap-4 rounded-sm border p-5">
        <div>
          <div className="label-technical shell-text-accent">Workspace</div>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-foreground">Developer utility hub</h1>
          <p className="shell-text-muted mt-2 max-w-2xl text-sm">
            A dense, keyboard-friendly desktop workspace for formatting, inspecting, converting, and generating data without leaving the app.
          </p>
        </div>
        <button
          onClick={() => navigate('/json-formatter')}
          className="gradient-cta inline-flex items-center gap-2 rounded-sm px-4 py-2 text-sm font-medium text-white"
        >
          Open formatter
          <ArrowRight className="h-4 w-4" />
        </button>
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
              className="surface-low shell-border group rounded-sm border p-4 text-left transition-colors hover:bg-muted"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="surface-highest shell-text-accent rounded-sm p-2">{renderToolIcon(tool)}</div>
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
              <span className="shell-text-subtle font-mono text-[10px] uppercase tracking-[0.18em]">
                {getToolsByCategory(category).length} tools
              </span>
            </div>
            <div className="space-y-2">
              {getToolsByCategory(category).slice(0, 6).map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => navigate(`/${tool.id}`)}
                  className="shell-text-muted shell-hover flex w-full items-center justify-between rounded-sm px-2 py-2 text-left text-sm transition-colors hover:text-foreground"
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
