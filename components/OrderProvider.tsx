"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { emptyOrderDraft, OrderDraft, restoreOrderDraft } from "@/lib/orderDraft";

type OrderContextValue = {
  draft: OrderDraft;
  updateOrder: (patch: Partial<OrderDraft>) => void;
  toggleSpecialItem: (id: string) => void;
};
const OrderContext = createContext<OrderContextValue | null>(null);
const storageKey = "honeyvault-order-choices";

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [draft, setDraft] = useState<OrderDraft>({ ...emptyOrderDraft });
  const [restored, setRestored] = useState(false);

  useEffect(() => {
    try {
      const saved = window.sessionStorage.getItem(storageKey);
      if (saved) setDraft(restoreOrderDraft(JSON.parse(saved)));
    } catch { /* Choices still work when storage is unavailable. */ }
    setRestored(true);
  }, []);

  useEffect(() => {
    if (!restored) return;
    try { window.sessionStorage.setItem(storageKey, JSON.stringify(draft)); }
    catch { /* Private browsing can disable storage. */ }
  }, [draft, restored]);

  const updateOrder = useCallback((patch: Partial<OrderDraft>) => {
    setDraft(current => restoreOrderDraft({ ...current, ...patch }));
  }, []);

  const toggleSpecialItem = useCallback((id: string) => {
    setDraft(current => restoreOrderDraft({
      ...current,
      intent: current.intent === "celebration" ? current.intent : "large-order",
      specialItemIds: current.specialItemIds.includes(id)
        ? current.specialItemIds.filter(item => item !== id) : [...current.specialItemIds, id],
    }));
  }, []);

  const value = useMemo(() => ({ draft, updateOrder, toggleSpecialItem }), [draft, updateOrder, toggleSpecialItem]);
  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrder must be used inside OrderProvider");
  return context;
}
