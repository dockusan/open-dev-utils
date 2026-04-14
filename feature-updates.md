# Feature Updates: OpenDevUtils

## Goal
Rename the app, update fonts, add automated update notifications, feedback via email, and research/implement offline JSON fixing without AI.

## Tasks
- [ ] **Rename App**: Update `package.json` and `src-tauri/tauri.conf.json` with name `OpenDevUtils` and identifier `com.cflstudio.opendevutils` → Verify: App builds and shows new name.
- [ ] **Font Upgrade**: Uninstall `@fontsource-variable/geist`, install `@fontsource/inter`, and update `index.css` to use Inter by default → Verify: Font changes to Inter in browser/app.
- [ ] **Update Notification**: Configure Tauri Updater plugin in `src-tauri/tauri.conf.json` and implement a basic automated check on app launch → Verify: No errors on launch, infrastructure ready for updates.
- [ ] **Feedback System**: Add a feedback button/link in the UI (likely sidebar) that opens `mailto:anhduc09t1@gmail.com` with pre-filled subject → Verify: Clicking button opens default mail app.
- [ ] **JSON Repair (Offline)**: Research and integrate `jsonrepair` or similar utility for offline JSON fixing without AI → Verify: Fixing a broken JSON string works without an internet connection.

## Done When
- [ ] App is named `OpenDevUtils`.
- [ ] Default font is `Inter`.
- [ ] Feedback opens email composer.
- [ ] Updater is configured.
- [ ] JSON repair feature is added to the toolset.

## Notes
- Tauri Updater requires a public key and a hosted update server (or GitHub Releases). I will set up the configuration side.
- For JSON fixing, `jsonrepair` is a lightweight, reliable library that doesn't need AI.
