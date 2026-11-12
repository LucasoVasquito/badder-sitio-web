import { create } from "zustand";
import { flyerDefaults, type FlyerConfig } from "@/config/flyer";

// Estado de los tweaks. Lo lee el lazo global (distorsión) y App lo aplica como variables CSS.
export const useFlyerStore = create<FlyerConfig & { set: (p: Partial<FlyerConfig>) => void }>((set) => ({
  ...flyerDefaults,
  set: (p) => set(p),
}));
