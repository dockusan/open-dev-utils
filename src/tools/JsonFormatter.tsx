import { useState, useCallback } from 'react';
import JSONEditorReact from '../components/JSONEditorReact';
import { ToolLayout } from '../components/ToolLayout';

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

  const handleChange = useCallback((newContent: any, _previousContent: any, _patchResult: any) => {
    setContent(newContent);
  }, []);

  return (
    <ToolLayout toolId={toolId}>
      {/* Set the wrapper height to full so the editor can flex and scroll properly */}
      <div className="h-full w-full">
        <JSONEditorReact 
          content={content} 
          onChange={handleChange}
          className="h-full w-full"
        />
      </div>
    </ToolLayout>
  );
}
