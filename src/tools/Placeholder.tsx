import { TOOLS } from '../lib/registry';
import { ToolLayout } from '../components/ToolLayout';

export function Placeholder({ toolId }: { toolId: string }) {
  const tool = TOOLS.find(t => t.id === toolId);
  return (
    <ToolLayout toolId={toolId}>
      <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-500 dark:text-gray-400">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-300">{tool?.name ?? toolId}</h2>
        <p className="text-sm">{tool?.description}</p>
        <p className="text-xs text-gray-400 dark:text-gray-600 mt-2">Implementation coming soon.</p>
      </div>
    </ToolLayout>
  );
}
