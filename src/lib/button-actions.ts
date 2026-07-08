// Global button action handler. Wire any button with `data-action="..."` (and
// optional `data-target`, `data-payload`) to a centralized dispatcher.
//
// Usage:
//   const { dispatch, loading } = useButtonActions();
//   <button data-action="navigate" data-target="/properties" onClick={dispatch} disabled={loading("navigate:/properties")}>
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "@tanstack/react-router";

export type ActionKind = "navigate" | "openModal" | "submitForm" | "shareLink" | "call" | "whatsapp" | "copy";

export interface ActionContext {
  kind: ActionKind;
  target?: string;
  payload?: string;
  el: HTMLElement;
}

export interface ActionHandlers {
  handleNavigation?: (ctx: ActionContext) => void | Promise<void>;
  openModal?: (ctx: ActionContext) => void | Promise<void>;
  submitForm?: (ctx: ActionContext) => void | Promise<void>;
  shareLink?: (ctx: ActionContext) => void | Promise<void>;
}

export function useButtonActions(handlers: ActionHandlers = {}) {
  const router = useRouter();
  const [busy, setBusy] = useState<Record<string, boolean>>({});
  const inflight = useRef<Set<string>>(new Set());

  const loading = useCallback((key: string) => !!busy[key], [busy]);

  const dispatch = useCallback(
    async (e: React.MouseEvent<HTMLElement> | React.SyntheticEvent<HTMLElement>) => {
      const el = (e.currentTarget as HTMLElement) ?? (e.target as HTMLElement);
      const kind = (el.dataset.action || el.id) as ActionKind | undefined;
      if (!kind) return;
      const target = el.dataset.target;
      const payload = el.dataset.payload;
      const key = `${kind}:${target ?? ""}`;

      // Prevent multiple submissions
      if (inflight.current.has(key)) return;
      inflight.current.add(key);
      setBusy((s) => ({ ...s, [key]: true }));

      const ctx: ActionContext = { kind, target, payload, el };
      try {
        switch (kind) {
          case "navigate": {
            if (handlers.handleNavigation) await handlers.handleNavigation(ctx);
            else if (target) await router.navigate({ to: target });
            break;
          }
          case "openModal": {
            if (handlers.openModal) await handlers.openModal(ctx);
            else window.dispatchEvent(new CustomEvent("app:openModal", { detail: { target, payload } }));
            break;
          }
          case "submitForm": {
            if (handlers.submitForm) await handlers.submitForm(ctx);
            else {
              const form = target ? (document.querySelector(target) as HTMLFormElement | null) : el.closest("form");
              form?.requestSubmit();
            }
            break;
          }
          case "shareLink": {
            if (handlers.shareLink) await handlers.shareLink(ctx);
            else {
              const url = target || window.location.href;
              if (navigator.share) await navigator.share({ url });
              else {
                await navigator.clipboard.writeText(url);
                toast.success("লিংক কপি হয়েছে");
              }
            }
            break;
          }
          case "call": {
            if (target) window.location.href = `tel:${target.replace(/[^\d+]/g, "")}`;
            break;
          }
          case "whatsapp": {
            if (target) {
              const num = target.replace(/[^\d]/g, "");
              const msg = payload ? `?text=${encodeURIComponent(payload)}` : "";
              window.open(`https://wa.me/${num}${msg}`, "_blank", "noopener,noreferrer");
            }
            break;
          }
          case "copy": {
            if (target) {
              await navigator.clipboard.writeText(target);
              toast.success("কপি হয়েছে");
            }
            break;
          }
          default: {
            console.warn("[button-actions] unknown action:", kind);
          }
        }
      } catch (err) {
        console.error("[button-actions] error:", err);
        toast.error("অপারেশন ব্যর্থ হয়েছে");
      } finally {
        inflight.current.delete(key);
        setBusy((s) => {
          const n = { ...s };
          delete n[key];
          return n;
        });
      }
    },
    [handlers, router]
  );

  return { dispatch, loading };
}
