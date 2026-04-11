import { useEffect, useRef, useState } from 'react';
import { createJSONEditor, JSONEditorPropsOptional } from 'vanilla-jsoneditor';
import 'vanilla-jsoneditor/themes/jse-theme-dark.css';

export default function JSONEditorReact(props: JSONEditorPropsOptional & { className?: string }) {
  const refContainer = useRef<HTMLDivElement>(null);
  const refEditor = useRef<any>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme class on root
    const root = window.document.documentElement;
    setIsDark(root.classList.contains('dark'));
    
    // Set up a mutation observer to watch for theme changes on root HTML
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDark(root.classList.contains('dark'));
        }
      });
    });

    observer.observe(root, { attributes: true });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (refContainer.current && !refEditor.current) {
      refEditor.current = createJSONEditor({
        target: refContainer.current,
        props: props
      });
    }

    return () => {
      if (refEditor.current) {
        refEditor.current.destroy();
        refEditor.current = null;
      }
    };
  }, []); // Only run once

  useEffect(() => {
    if (refEditor.current) {
      refEditor.current.updateProps(props);
    }
  }, [props]);

  return <div className={`${isDark ? 'jse-theme-dark' : ''} ${props.className || ''}`} ref={refContainer}></div>;
}
