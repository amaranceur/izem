import { create } from 'zustand';

interface IzemState {
  activeFlavorId: number | null;
  setActiveFlavorId: (id: number | null) => void;
  isMenuOpen: boolean;
  setMenuOpen: (isOpen: boolean) => void;
}

export const useIzemStore = create<IzemState>((set) => ({
  activeFlavorId: null,
  setActiveFlavorId: (id) => set({ activeFlavorId: id }),
  isMenuOpen: false,
  setMenuOpen: (isOpen) => set({ isMenuOpen: isOpen }),
}));
