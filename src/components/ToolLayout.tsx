import { TOOLS } from '../lib/registry';

interface Props {
  toolId: string;
  children: React.ReactNode;
}

export function ToolLayout({ toolId, children }: Props) {
  const tool = TOOLS.find((t) => t.id === toolId);
  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-950 transition-colors">
      <header className="flex-shrink-0 px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 transition-colors">
        <h1 className="text-base font-semibold text-gray-900 dark:text-gray-100">{tool?.name}</h1>
        {tool?.description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{tool.description}</p>
        )}
      </header>
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
