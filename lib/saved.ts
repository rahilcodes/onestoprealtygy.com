"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Saved-listing state. Persisted per browser in localStorage so hearts stay
 * consistent between the card grid and the property page. Phase 2 can swap
 * this for an account-backed store.
 */
const KEY = "osri:saved-listings";
const listeners = new Set<() => void>();
let cache: string | null = null;

function read(): string {
  if (cache !== null) return cache;
  try {
    cache = window.localStorage.getItem(KEY) ?? "[]";
  } catch {
    cache = "[]";
  }
  return cache;
}

function write(next: string[]) {
  cache = JSON.stringify(next);
  try {
    window.localStorage.setItem(KEY, cache);
  } catch {
    /* private mode: keep in-memory only */
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = null;
      cb();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

export function useSavedListing(id: string): [boolean, () => void] {
  const raw = useSyncExternalStore(subscribe, read, () => "[]");
  const list: string[] = JSON.parse(raw);
  const saved = list.includes(id);
  const toggle = useCallback(() => {
    const current: string[] = JSON.parse(read());
    write(current.includes(id) ? current.filter((m) => m !== id) : [...current, id]);
  }, [id]);
  return [saved, toggle];
}
