import { createHashRouter, RouterProvider, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Placeholder } from './tools/Placeholder';
import { JsonFormatter } from './tools/JsonFormatter';
import { TOOLS } from './lib/registry';

// Hash router works reliably under the tauri:// scheme
const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/json-formatter" replace /> },
      ...TOOLS.map((tool) => {
        let component;
        if (tool.id === 'json-formatter') {
          component = <JsonFormatter toolId={tool.id} />;
        } else {
          component = <Placeholder toolId={tool.id} />;
        }
        return {
          path: tool.id,
          element: component,
        };
      }),
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
