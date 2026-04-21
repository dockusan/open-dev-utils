import { getToolById } from '../lib/registry';

export function Placeholder({ toolId }: { toolId: string }) {
  const tool = getToolById(toolId);

  return (
    <div className="flex h-full flex-col items-center justify-center rounded-sm border border-dashed border-white/15 bg-black/10 px-6 text-center">
      <h2 className="text-xl font-semibold text-white">{tool?.name ?? toolId}</h2>
      <p className="mt-2 text-sm text-[rgb(193,198,215)]">{tool?.description}</p>
      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[rgb(193,198,215)]/55">
        Implementation coming soon
      </p>
    </div>
  );
}
