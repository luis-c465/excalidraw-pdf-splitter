import { atom } from "jotai";

export const fileAtom = atom<File | null>(null);
export const imgAtom = atom<Blob | null>(null);
