import { getToolById } from '../lib/registry';

interface Props {
  toolId: string;
  children: React.ReactNode;
}

export function ToolLayout({ toolId, children }: Props) {
  const tool = getToolById(toolId);

  return (
    <section className="flex h-full min-h-0 flex-col">
      <header className="surface-low shell-border mb-4 overflow-hidden rounded-sm border">
        <div className="flex flex-wrap items-end justify-between gap-3 p-4">
          <div>
            <p className="label-technical shell-text-accent">
              {tool ? tool.category.replace(/^\w/, (c) => c.toUpperCase()) : 'Workspace'}
            </p>
            <h1 className="mt-1 text-2xl font-bold text-foreground">{tool?.name ?? toolId}</h1>
            {tool?.description && (
              <p className="shell-text-muted mt-1 text-sm">{tool.description}</p>
            )}
          </div>
          <div className="shell-border shell-panel-soft shell-text-subtle rounded-sm border px-2 py-1 font-mono text-[10px] uppercase">
            Offline-first
          </div>
        </div>
        <div className="h-1 bg-primary/70" />
      </header>
      <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
    </section>
  );
}
