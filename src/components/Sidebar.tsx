import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import {
  CATEGORY_LABELS,
  searchTools,
  getToolsByCategory,
  type ToolCategory,
} from '../lib/registry';

const CATEGORIES: ToolCategory[] = ['format', 'converters', 'inspect', 'generators', 'encoders'];

export function Sidebar() {
  const [query, setQuery] = useState('');
  const isSearching = query.trim().length > 0;
  const results = searchTools(query);
  const { theme, setTheme } = useTheme();

  return (
    <aside className="w-60 flex-shrink-0 bg-gray-50 dark:bg-[#0e1117] flex flex-col border-r border-gray-200 dark:border-[#1e2329] transition-colors">
      <div className="px-3 py-4 border-b border-gray-200 dark:border-[#1e2329] flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <h1 className="text-md font-bold text-gray-900 dark:text-gray-100">DevUtils</h1>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-1.5 rounded-md text-gray-500 hover:bg-gray-200 dark:hover:bg-[#161b22] dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search tools..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search tools"
            className="w-full pl-8 pr-3 py-1.5 text-sm bg-white dark:bg-[#161b22] border border-gray-300 dark:border-[#30363d] rounded-md text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm dark:shadow-none"
          />
          <svg className="absolute left-2.5 top-2 h-4 w-4 text-gray-400 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto py-3 custom-scrollbar">
        {isSearching ? (
          results.length === 0 ? (
            <p className="px-4 py-6 text-sm text-gray-500 text-center">No tools found</p>
          ) : (
            <div className="px-2">
              {results.map((tool) => (
                <SidebarLink key={tool.id} id={tool.id} name={tool.name} />
              ))}
            </div>
          )
        ) : (
          CATEGORIES.map((category) => {
            const catTools = getToolsByCategory(category);
            if (catTools.length === 0) return null; // hide empty categories
            return (
              <div key={category} className="mb-4">
                <p className="px-4 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-wider">
                  {CATEGORY_LABELS[category]}
                </p>
                <div className="px-2 mt-1">
                  {catTools.map((tool) => (
                    <SidebarLink key={tool.id} id={tool.id} name={tool.name} />
                  ))}
                </div>
              </div>
            );
          })
        )}
      </nav>
    </aside>
  );
}

function SidebarLink({ id, name }: { id: string; name: string }) {
  return (
    <NavLink
      to={`/${id}`}
      className={({ isActive }) =>
        `block px-3 py-1.5 text-sm rounded-md mb-0.5 transition-colors ${
          isActive
            ? 'bg-blue-100 text-blue-700 dark:bg-blue-600/10 dark:text-blue-400 font-medium'
            : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-[#161b22] dark:hover:text-gray-100'
        }`
      }
    >
      {name}
    </NavLink>
  );
}
