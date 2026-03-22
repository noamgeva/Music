/**
 * trackStore.ts
 * ─────────────
 * Two persistence layers:
 *   • localStorage  → track metadata (JSON, fast, tiny)
 *   • IndexedDB     → raw audio blobs (binary-safe, survives refresh)
 *
 * Both the Studio and the Catalog read/write through this module
 * so they stay in sync without a backend.
 */

import { TRACKS, Track } from "./catalog";

/* ── localStorage ── */
const META_KEY = "studio_tracks";

export function loadTracks(): Track[] {
  if (typeof window === "undefined") return TRACKS;
  try {
    const raw = localStorage.getItem(META_KEY);
    if (raw) {
      const parsed: Track[] = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch { /* */ }
  return TRACKS;
}

export function saveTracks(tracks: Track[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(META_KEY, JSON.stringify(tracks));
}

/* ── IndexedDB ── */
const DB_NAME    = "noamgeva_audio";
const DB_VERSION = 1;
const STORE      = "blobs";

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror   = () => reject(req.error);
  });
}

export async function saveAudioBlob(trackId: string, blob: Blob): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put(blob, trackId);
    tx.oncomplete = () => resolve();
    tx.onerror    = () => reject(tx.error);
  });
}

export async function getAudioBlob(trackId: string): Promise<Blob | null> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx  = db.transaction(STORE, "readonly");
    const req = tx.objectStore(STORE).get(trackId);
    req.onsuccess = () => resolve((req.result as Blob) ?? null);
    req.onerror   = () => reject(req.error);
  });
}

export async function deleteAudioBlob(trackId: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).delete(trackId);
    tx.oncomplete = () => resolve();
    tx.onerror    = () => reject(tx.error);
  });
}

/** Returns a temporary object URL for playback (caller must revoke it). */
export async function getAudioURL(trackId: string): Promise<string | null> {
  const blob = await getAudioBlob(trackId);
  return blob ? URL.createObjectURL(blob) : null;
}
