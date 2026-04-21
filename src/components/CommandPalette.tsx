import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Home, Moon, Search, Settings2, SunMedium } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { searchTools } from '../lib/registry';
import { renderToolIcon } from '../lib/tool-icons';
import { cn } from '../lib/utils';

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  onSetTheme: (theme: 'dark' | 'light' | 'system') => void;
}

type PaletteItem =
  | { id: string; label: string; hint?: string; action: () => void; icon: ReactNode; group: string };

export function CommandPalette({ open, onClose, onSetTheme }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  const toolItems = useMemo(
    () =>
      searchTools(query).map((tool): PaletteItem => ({
        id: tool.id,
        label: tool.name,
        hint: tool.category,
        icon: renderToolIcon(tool),
        group: 'Tools',
        action: () => {
          navigate(`/${tool.id}`);
          onClose();
        },
      })),
    [navigate, onClose, query]
  );

  const items = useMemo<PaletteItem[]>(
    () => [
      {
        id: 'home',
        label: 'Workspace',
        hint: 'Landing view',
        icon: <Home className="h-4 w-4" />,
        group: 'Navigation',
        action: () => {
          navigate('/');
          onClose();
        },
      },
      {
        id: 'settings',
        label: 'Settings',
        hint: 'Preferences',
        icon: <Settings2 className="h-4 w-4" />,
        group: 'Navigation',
        action: () => {
          navigate('/settings');
          onClose();
        },
      },
      {
        id: 'theme-dark',
        label: 'Theme: Dark',
        hint: 'Appearance',
        icon: <Moon className="h-4 w-4" />,
        group: 'Commands',
        action: () => {
          onSetTheme('dark');
          onClose();
        },
      },
      {
        id: 'theme-light',
        label: 'Theme: Light',
        hint: 'Appearance',
        icon: <SunMedium className="h-4 w-4" />,
        group: 'Commands',
        action: () => {
          onSetTheme('light');
          onClose();
        },
      },
      ...toolItems,
    ],
    [navigate, onClose, onSetTheme, toolItems]
  );

  const grouped = useMemo(() => {
    return items.reduce<Record<string, PaletteItem[]>>((acc, item) => {
      acc[item.group] ??= [];
      acc[item.group].push(item);
      return acc;
    }, {});
  }, [items]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-24 backdrop-blur-sm" style={{ backgroundColor: 'rgb(var(--shell-overlay))' }} onClick={onClose}>
      <div className="glass-panel workspace-shadow shell-border w-full max-w-2xl overflow-hidden rounded-sm border" onClick={(e) => e.stopPropagation()}>
        <div className="surface-low shell-border flex items-center gap-3 border-b px-4 py-3">
          <Search className="shell-text-subtle h-5 w-5" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools, commands, or settings..."
            className="shell-placeholder w-full bg-transparent text-base text-foreground outline-none"
          />
          <span className="shell-border shell-text-subtle rounded-sm border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em]">
            Esc
          </span>
        </div>
        <div className="max-h-[32rem] overflow-y-auto py-2">
          {Object.entries(grouped).map(([group, groupItems]) => (
            <div key={group} className="mb-2 px-2">
              <div className="shell-text-subtle px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em]">
                {group}
              </div>
              {groupItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={item.action}
                  className={cn(
                    "flex w-full items-center justify-between rounded-sm px-3 py-2 text-left transition-colors",
                    index === 0 ? "surface-high text-foreground" : "shell-text-muted transition-colors hover:bg-muted"
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-primary">{item.icon}</span>
                    <span className="text-sm font-medium">{item.label}</span>
                  </span>
                  {item.hint && (
                    <span className="shell-text-subtle font-mono text-[10px] uppercase tracking-[0.18em]">
                      {item.hint}
                    </span>
                  )}
                </button>
              ))}
            </div>
          ))}
          {items.length === 0 && (
            <div className="shell-text-muted px-4 py-8 text-center text-sm">No results found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
