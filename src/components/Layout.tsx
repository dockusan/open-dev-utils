import { useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  Home,
  Moon,
  SearchCheck,
  Settings2,
  Sun,
  TerminalSquare,
} from 'lucide-react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  CATEGORY_LABELS,
  CATEGORY_SHORT_LABELS,
  PINNED_TOOL_IDS,
  TOOLS,
  getPinnedTools,
  type ToolCategory,
} from '../lib/registry';
import { useTheme } from './ThemeProvider';
import { CommandPalette } from './CommandPalette';
import { cn } from '../lib/utils';
import { renderToolIcon } from '../lib/tool-icons';

const CATEGORIES: ToolCategory[] = ['format', 'converters', 'inspect', 'generators', 'encoders'];

export function Layout() {
  const [query, setQuery] = useState('');
  const [paletteOpen, setPaletteOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      }
      if (event.key === 'Escape') {
        setPaletteOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const filteredTools = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return TOOLS;
    return TOOLS.filter(
      (tool) =>
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.keywords.some((keyword) => keyword.includes(q))
    );
  }, [query]);

  const activeTool = useMemo(
    () => TOOLS.find((tool) => pathname === `/${tool.id}`),
    [pathname]
  );

  const pinnedTools = useMemo(() => getPinnedTools(), []);

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <header className="surface-low shell-border flex h-12 shrink-0 items-center justify-between border-b px-4">
        <div className="flex items-center gap-6">
          <button className="flex items-center gap-2 text-sm font-bold tracking-tight text-foreground" onClick={() => navigate('/')}>
            <TerminalSquare className="h-4 w-4 shell-text-brand" />
            DevUtils
          </button>
          <nav className="hidden items-center gap-3 md:flex">
            {CATEGORIES.map((category) => {
              const isActive = activeTool?.category === category;
              return (
                <button
                  key={category}
                  onClick={() => navigate(`/${TOOLS.find((tool) => tool.category === category)?.id}`)}
                  className={cn(
                    "border-b-2 px-2 py-1 text-xs font-medium uppercase tracking-[0.14em] transition-colors",
                    isActive
                      ? "shell-text-brand border-[hsl(var(--shell-brand))]"
                      : "border-transparent shell-text-muted hover:text-foreground"
                  )}
                >
                  {CATEGORY_SHORT_LABELS[category]}
                </button>
              );
            })}
          </nav>
        </div>
        <div className="hidden max-w-md flex-1 px-6 lg:block">
          <button
            onClick={() => setPaletteOpen(true)}
            className="surface-lowest shell-border shell-text-muted flex w-full items-center gap-3 rounded-sm border px-3 py-1.5 text-left text-sm"
          >
            <SearchCheck className="shell-text-subtle h-4 w-4" />
            <span className="flex-1">Search tools, commands...</span>
            <span className="shell-text-subtle font-mono text-[10px] uppercase tracking-[0.18em]">Cmd K</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/settings')}
            className="shell-text-muted shell-hover rounded-sm p-1.5 transition-colors hover:text-foreground"
            aria-label="Settings"
          >
            <Settings2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="shell-text-muted shell-hover rounded-sm p-1.5 transition-colors hover:text-foreground"
            aria-label="Toggle theme"
          >
            {resolvedTheme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setPaletteOpen(true)}
            className="shell-border shell-text-brand shell-hover rounded-sm border px-2 py-1 text-[11px] font-mono uppercase tracking-[0.16em] transition-colors"
          >
            Cmd K
          </button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <aside className="surface-lowest shell-border hidden w-64 shrink-0 flex-col border-r p-2 md:flex">
          <div className="mb-4 px-3 py-3">
            <div className="label-technical shell-text-subtle">Workspace</div>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-lg font-black tracking-tight text-foreground">DevUtils Pro</span>
              <span className="shell-badge shell-text-accent rounded-sm px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-[0.15em]">
                Local
              </span>
            </div>
          </div>

          <div className="px-2 pb-3">
            <button
              onClick={() => navigate('/')}
              className="gradient-cta flex w-full items-center justify-center gap-2 rounded-sm px-3 py-2 text-sm font-medium text-white"
            >
              <Home className="h-4 w-4" />
              Workspace
            </button>
          </div>

          <div className="px-2 pb-3">
            <div className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Filter tools..."
                className="surface-lowest shell-border shell-placeholder h-9 w-full rounded-sm border px-9 pr-3 text-sm text-foreground outline-none"
              />
              <SearchCheck className="shell-text-subtle pointer-events-none absolute left-3 top-2.5 h-4 w-4" />
            </div>
          </div>

          <nav className="workspace-scroll flex-1 overflow-y-auto px-2">
            <SidebarLink to="/" label="Home" icon={<Home className="h-4 w-4" />} />
            <SidebarLink to="/settings" label="Settings" icon={<Settings2 className="h-4 w-4" />} />

            <div className="mt-4">
              <div className="shell-text-subtle px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em]">
                Pinned
              </div>
              {pinnedTools.map((tool) => (
                <SidebarLink key={tool.id} to={`/${tool.id}`} label={tool.name} icon={renderToolIcon(tool)} />
              ))}
            </div>

            {CATEGORIES.map((category) => {
              const categoryTools = filteredTools.filter((tool) => tool.category === category && !PINNED_TOOL_IDS.includes(tool.id));
              if (categoryTools.length === 0) return null;

              return (
                <div key={category} className="mt-4">
                  <div className="shell-text-subtle px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em]">
                    {CATEGORY_LABELS[category]}
                  </div>
                  {categoryTools.map((tool) => (
                    <SidebarLink key={tool.id} to={`/${tool.id}`} label={tool.name} icon={renderToolIcon(tool)} />
                  ))}
                </div>
              );
            })}
          </nav>

          <div className="shell-border mt-4 border-t pt-3">
            <a className="shell-text-muted shell-hover flex items-center gap-3 rounded-sm px-3 py-2 text-sm transition-colors hover:text-foreground" href="mailto:anhduc09t1@gmail.com?subject=OpenDevUtils Feedback">
              <Settings2 className="h-4 w-4" />
              Send Feedback
            </a>
          </div>
        </aside>

        <main className="surface-canvas min-h-0 flex-1 overflow-hidden">
          <div className="workspace-scroll h-full overflow-y-auto p-4 md:p-6">
            <Outlet />
          </div>
        </main>
      </div>

      <footer className="surface-lowest shell-border shell-text-subtle hidden h-6 shrink-0 items-center justify-between border-t px-3 font-mono text-[10px] uppercase tracking-[0.16em] md:flex">
        <span>OpenDevUtils • Precision Engine</span>
        <span>{activeTool ? activeTool.name : 'Workspace Hub'}</span>
      </footer>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} onSetTheme={setTheme} />
    </div>
  );
}

function SidebarLink({
  to,
  label,
  icon,
}: {
  to: string;
  label: string;
  icon: ReactNode;
}) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-sm px-3 py-2 text-sm transition-colors",
          isActive
            ? "surface-bright text-foreground"
            : "shell-text-muted shell-hover hover:text-foreground"
        )
      }
    >
      <span className="shell-text-accent">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
}
