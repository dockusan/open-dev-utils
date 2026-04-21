import { useState, useCallback } from 'react';
import JSONEditorReact from '../components/JSONEditorReact';

export function JsonFormatter({ toolId }: { toolId: string }) {
  const [content, setContent] = useState({
    text: undefined,
    json: {
      greeting: 'Hello World',
      color: '#ff00ff',
      isAwesome: true,
      arrayOfThings: [1, 2, 3]
    }
  });

  const handleChange = useCallback((newContent: any) => {
    setContent(newContent);
  }, []);

  return (
    <div id={toolId} className="surface-lowest shell-border h-full w-full overflow-hidden rounded-sm border">
      <JSONEditorReact
        content={content}
        onChange={handleChange}
        className="h-full w-full"
      />
    </div>
  );
}
