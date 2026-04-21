import { getToolById } from '../lib/registry';

interface Props {
  toolId: string;
  children: React.ReactNode;
}

export function ToolLayout({ toolId, children }: Props) {
  const tool = getToolById(toolId);

  return (
    <section className="flex h-full min-h-0 flex-col">
      <header className="shell-border mb-4 flex flex-wrap items-end justify-between gap-3 border-b pb-4">
        <div>
          <p className="label-technical shell-text-subtle">
            {tool ? tool.category.replace(/^\w/, (c) => c.toUpperCase()) : 'Workspace'}
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground">{tool?.name ?? toolId}</h1>
          {tool?.description && (
            <p className="shell-text-muted mt-1 text-sm">{tool.description}</p>
          )}
        </div>
        <div className="shell-border shell-panel-soft shell-text-subtle rounded-sm border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em]">
          Offline-first
        </div>
      </header>
      <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
    </section>
  );
}
