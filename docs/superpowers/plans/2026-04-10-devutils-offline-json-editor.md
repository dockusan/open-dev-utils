# DevUtils Offline App — JSON Editor Plan

This plan details the implementation of a full-featured offline JSON editor matching the capability metric of DevUtils Desktop App and `jsoneditoronline.org` (e.g., viewing number of objects, switching between Tree and Text mode, and searching/filtering).

> [!NOTE]
> To achieve the exact look and feel of `jsoneditoronline.org`, we will use the `vanilla-jsoneditor` npm library. This library is actually the official open-source project behind `jsoneditoronline.org` itself! It natively supports Tree views with object counts, text/code mode, schema validation, and dark mode.

### Cross-Platform & Large File Performance

**1. Cross-Platform Native Apps:**
Tauri v2 compiles an ultra-lightweight React application into native desktop windows for all platforms:
- **macOS:** Uses Apple's native WebKit (Safari engine).
- **Windows:** Uses Microsoft Edge WebView2.
- **Linux:** Uses WebKitGTK.
The app will have OS-level features (like offline filesystem access) rather than being trapped in a browser tab.

**2. Parsing 50MB JSON Files:**
Browser tabs usually struggle with massive JSON files, but because this is a desktop utility using `vanilla-jsoneditor`:
- The library is officially engineered to handle JSON documents **up to 512 MB**.
- **Text Mode** utilizes CodeMirror, rendering only the visible lines of the 50MB file, ensuring smooth scrolling.
- **Tree Mode** utilizes DOM virtualization. If you give it 50MB, it only renders the visible nodes on the screen, calculating the "number of objects" lazily behind the scenes rather than rendering billions of DOM elements. This will safely allow you to load 50MB without crashing.

## Proposed Changes

### Scaffold Execution
We will run `npm create tauri-app@latest` and follow the scaffold document (`docs/superpowers/plans/2026-04-08-devutils-scaffold.md`) to set up Tauri v2 + React 18 + Vite + Tailwind + React Router v6.

### Dependencies

#### [NEW] `package.json` modifications
- Install `vanilla-jsoneditor` library which provides the JSON capabilities.
- Install any needed icons (e.g., `lucide-react` for top bar buttons).
- Install Tailwind CSS and Vitest as required by the scaffold plan.

### Components

#### [NEW] `src/components/JSONEditorReact.tsx`
- We will create a React wrapper for `vanilla-jsoneditor`. 
- Utilizing a `useRef` and `useEffect` hook, we will instantiate `createJSONEditor({ target, props })` to render the DOM element securely inside our React app.
- Ensure the instance handles updates and destruction hooks properly to prevent memory leaks in dev-mode.

### Tools Implementation

#### [NEW] `src/tools/JsonFormatter.tsx`
- Replaces the generic `Placeholder.tsx`.
- Uses a split-pane layout or simply full-screen with the `JSONEditorReact` component. Let's aim for a full-screen view filling the main Outlet area since `vanilla-jsoneditor` has its own complex toolbar.
- The state should be lifted to handle local storage (remembering the last used JSON when the user switches away from the tool and back, or closes the app).

#### [MODIFY] `src/App.tsx`
- Update the router configuration to map the `json-formatter` route back to the newly created `JsonFormatter` component instead of `Placeholder`.

## Verification Plan

### Automated Tests
- N/A for UI components (we will rely on Vitest for any util logic).

### Manual Verification
- We will start `npm run tauri dev` (or pure Vite dev)
- Ensure clicking the **JSON Formatter** tool shows the editor online.
- Paste a massive JSON blob with arrays and objects.
- Verify we can expand/collapse, see the **object count** on arrays (`[10 items]`), and toggle between Tree mode and Code mode flawlessly.
