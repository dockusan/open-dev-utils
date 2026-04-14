use tauri::menu::{Menu, MenuItem, Submenu, PredefinedMenuItem};
use tauri_plugin_updater::UpdaterExt;
use tauri_plugin_dialog::{DialogExt, MessageDialogKind};

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_dialog::init())
        .setup(|app| {
            let handle = app.handle();
            
            let check_for_updates_i = MenuItem::with_id(handle, "check-for-updates", "Check for Updates", true, None::<&str>)?;
            
            let menu = Menu::with_items(handle, &[
                &Submenu::with_items(handle, "OpenDevUtils", true, &[
                    &check_for_updates_i,
                    &PredefinedMenuItem::separator(handle)?,
                    &PredefinedMenuItem::hide(handle, None)?,
                    &PredefinedMenuItem::hide_others(handle, None)?,
                    &PredefinedMenuItem::show_all(handle, None)?,
                    &PredefinedMenuItem::separator(handle)?,
                    &PredefinedMenuItem::quit(handle, None)?,
                ])?,
                &Submenu::with_items(handle, "Edit", true, &[
                    &PredefinedMenuItem::undo(handle, None)?,
                    &PredefinedMenuItem::redo(handle, None)?,
                    &PredefinedMenuItem::separator(handle)?,
                    &PredefinedMenuItem::cut(handle, None)?,
                    &PredefinedMenuItem::copy(handle, None)?,
                    &PredefinedMenuItem::paste(handle, None)?,
                    &PredefinedMenuItem::select_all(handle, None)?,
                ])?,
                &Submenu::with_items(handle, "View", true, &[
                    &PredefinedMenuItem::fullscreen(handle, None)?,
                ])?,
                &Submenu::with_items(handle, "Window", true, &[
                    &PredefinedMenuItem::minimize(handle, None)?,
                    &PredefinedMenuItem::maximize(handle, None)?,
                    &PredefinedMenuItem::close_window(handle, None)?,
                ])?,
            ])?;
            
            app.set_menu(menu)?;
            
            app.on_menu_event(move |handle, event| {
                if event.id == check_for_updates_i.id() {
                    let handle = handle.clone();
                    tauri::async_runtime::spawn(async move {
                        let _ = check_update(handle).await;
                    });
                }
            });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

async fn check_update(handle: tauri::AppHandle) -> Result<(), String> {
    let updater = handle.updater().map_err(|e| e.to_string())?;
    match updater.check().await {
        Ok(update) => {
            if let Some(update) = update {
                if let Err(e) = update.download_and_install(|_len, _chunk| {}, || {}).await {
                    handle.dialog()
                        .message(format!("Error updating: {}", e))
                        .kind(MessageDialogKind::Error)
                        .title("Update Error")
                        .show(|_| {});
                } else {
                    handle.restart();
                }
            } else {
                handle.dialog()
                    .message("No updates available.")
                    .kind(MessageDialogKind::Info)
                    .title("No Updates")
                    .show(|_| {});
            }
        }
        Err(e) => {
            handle.dialog()
                .message(format!("Failed to check for updates: {}", e))
                .kind(MessageDialogKind::Error)
                .title("Update Check Failed")
                .show(|_| {});
        }
    }
    Ok(())
}
