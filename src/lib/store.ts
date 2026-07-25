import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Application, Notification, Visit } from "./mock-data";
import { NOTIFICATIONS } from "./mock-data";

export type Role = "guest" | "tenant" | "owner" | "agent" | "admin";

interface AppState {
  role: Role;
  setRole: (r: Role) => void;

  favorites: string[];
  toggleFavorite: (id: string) => void;

  savedSearches: { id: string; label: string; query: string }[];
  saveSearch: (label: string, query: string) => void;
  removeSearch: (id: string) => void;

  visits: Visit[];
  addVisit: (v: Visit) => void;
  updateVisit: (id: string, patch: Partial<Visit>) => void;
  removeVisit: (id: string) => void;

  applications: Application[];
  addApplication: (a: Application) => void;

  /** কম ভাড়ার ইউনিটে ভিজিটের আগে অগ্রিম পরিশোধ */
  paidAdvances: string[];
  payAdvance: (propertyId: string) => void;

  notifications: Notification[];
  markRead: (id: string) => void;
  markAllRead: () => void;

  profile: { name: string; email: string; phone: string; avatar?: string; language: "bn" | "en" };
  updateProfile: (patch: Partial<AppState["profile"]>) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      role: "guest",
      setRole: (role) => set({ role }),

      favorites: [],
      toggleFavorite: (id) =>
        set((s) => ({
          favorites: s.favorites.includes(id)
            ? s.favorites.filter((x) => x !== id)
            : [...s.favorites, id],
        })),

      savedSearches: [],
      saveSearch: (label, query) =>
        set((s) => ({
          savedSearches: [
            ...s.savedSearches,
            { id: `srch-${Date.now()}`, label, query },
          ],
        })),
      removeSearch: (id) =>
        set((s) => ({ savedSearches: s.savedSearches.filter((x) => x.id !== id) })),

      visits: [],
      addVisit: (v) => set((s) => ({ visits: [v, ...s.visits] })),
      updateVisit: (id, patch) =>
        set((s) => ({ visits: s.visits.map((v) => (v.id === id ? { ...v, ...patch } : v)) })),
      removeVisit: (id) => set((s) => ({ visits: s.visits.filter((v) => v.id !== id) })),

      applications: [],
      addApplication: (a) => set((s) => ({ applications: [a, ...s.applications] })),

      paidAdvances: [],
      payAdvance: (propertyId) =>
        set((s) => ({
          paidAdvances: s.paidAdvances.includes(propertyId)
            ? s.paidAdvances
            : [...s.paidAdvances, propertyId],
        })),

      notifications: NOTIFICATIONS,
      markRead: (id) =>
        set((s) => ({
          notifications: s.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
        })),
      markAllRead: () =>
        set((s) => ({ notifications: s.notifications.map((n) => ({ ...n, read: true })) })),

      profile: {
        name: "আপনার নাম",
        email: "you@barilagbe.com.bd",
        phone: "০১৭০০০০০০০০",
        language: "bn",
      },
      updateProfile: (patch) => set((s) => ({ profile: { ...s.profile, ...patch } })),
    }),
    { name: "barilagbe-store" }
  )
);
