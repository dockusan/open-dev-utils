# Repository Guidelines

## Project Structure & Module Organization
`src/` contains the React + TypeScript frontend. Reusable UI lives in `src/components/`, shared helpers and tool metadata live in `src/lib/`, and each utility screen is implemented as a separate component in `src/tools/` using PascalCase filenames such as `JsonFormatter.tsx` or `QrCodeGenerator.tsx`. Static assets live in `src/assets/`, while packaged screenshots and marketing assets live in `assets/`.

`src-tauri/` contains the Rust desktop shell, Tauri config, capabilities, and application icons. Release automation lives in `.github/workflows/release.yml`. Treat `dist/` and `src-tauri/target/` as generated output.

## Build, Test, and Development Commands
Use Node LTS, Rust stable, and Tauri prerequisites for your OS.

- `npm install`: install frontend dependencies.
- `npm run dev`: run the Vite frontend only.
- `npm run tauri dev`: run the full desktop app locally.
- `npm run build`: run TypeScript checks and build the web bundle.
- `npm run tauri build`: produce desktop release artifacts.
- `cargo check --manifest-path src-tauri/Cargo.toml`: validate Rust changes quickly.

## Coding Style & Naming Conventions
Frontend code is strict TypeScript with React function components. Follow the existing style: single quotes in TS/TSX, semicolons, and 2-space indentation in frontend files. Use PascalCase for components and tool files, camelCase for variables/functions, and keep tool IDs kebab-case in `src/lib/registry.ts`.

Rust code in `src-tauri/src/` uses standard 4-space indentation and should be formatted with `cargo fmt`. Prefer small, focused components and keep shared logic in `src/lib/` rather than duplicating it across tools.

## Testing Guidelines
Vitest and Testing Library are installed, but no committed test suite exists yet. For new behavior, add colocated `*.test.ts` or `*.test.tsx` files near the code under test and prefer interaction-focused component tests. At minimum, run `npm run build` and `cargo check --manifest-path src-tauri/Cargo.toml` before opening a PR.

## Commit & Pull Request Guidelines
Recent history mixes informal commits with Conventional Commits; use the clearer pattern going forward, for example `feat: add markdown preview copy action` or `fix: handle invalid cron expressions`.

PRs should include a short summary, testing notes, linked issues when relevant, and screenshots or screen recordings for UI changes. Keep scope narrow and call out any platform-specific Tauri impact.
