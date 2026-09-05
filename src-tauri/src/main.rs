/* Sovereign desktop persistence (ADR-008).
 * Native SQLite mirror at ~/.ahkh/study.db holding one JSON snapshot row.
 * The frontend sync bridge reads and writes through two stable commands,
 * keeping every study artifact immune to browser cache clearing. */

#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use rusqlite::{params, Connection};
use std::sync::Mutex;
use std::time::{SystemTime, UNIX_EPOCH};

struct DbState(Mutex<Connection>);

fn db_path() -> Result<std::path::PathBuf, String> {
    let home = dirs::home_dir().ok_or_else(|| "home-directory-unavailable".to_string())?;
    Ok(home.join(".ahkh").join("study.db"))
}

fn now_iso() -> String {
    let secs = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map(|d| d.as_secs())
        .unwrap_or(0);
    format!("epoch:{secs}")
}

fn open_database() -> Result<Connection, String> {
    let path = db_path()?;
    if let Some(parent) = path.parent() {
        std::fs::create_dir_all(parent).map_err(|e| e.to_string())?;
    }
    let conn = Connection::open(&path).map_err(|e| e.to_string())?;
    conn.execute(
        "CREATE TABLE IF NOT EXISTS snapshots (
            id INTEGER PRIMARY KEY CHECK (id = 1),
            payload TEXT NOT NULL,
            updated_at TEXT NOT NULL
        )",
        [],
    )
    .map_err(|e| e.to_string())?;
    Ok(conn)
}

#[tauri::command]
fn ahkh_load_snapshot(state: tauri::State<DbState>) -> Result<String, String> {
    let conn = state.0.lock().map_err(|e| e.to_string())?;
    let mut stmt = conn
        .prepare("SELECT payload FROM snapshots WHERE id = 1")
        .map_err(|e| e.to_string())?;
    let mut rows = stmt.query([]).map_err(|e| e.to_string())?;
    match rows.next().map_err(|e| e.to_string())? {
        Some(row) => row.get::<_, String>(0).map_err(|e| e.to_string()),
        None => Ok(String::new()),
    }
}

#[tauri::command]
fn ahkh_store_snapshot(state: tauri::State<DbState>, snapshot: String) -> Result<(), String> {
    let conn = state.0.lock().map_err(|e| e.to_string())?;
    let stamped = now_iso();
    conn.execute(
        "INSERT INTO snapshots (id, payload, updated_at) VALUES (1, ?1, ?2)
         ON CONFLICT(id) DO UPDATE SET payload = excluded.payload, updated_at = excluded.updated_at",
        params![snapshot, stamped],
    )
    .map_err(|e| e.to_string())?;
    Ok(())
}

fn main() {
    let conn = open_database().expect("ahkh study database must open");
    tauri::Builder::default()
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .manage(DbState(Mutex::new(conn)))
        .invoke_handler(tauri::generate_handler![
            ahkh_load_snapshot,
            ahkh_store_snapshot
        ])
        .run(tauri::generate_context!())
        .expect("ahkh study hub must run");
}
