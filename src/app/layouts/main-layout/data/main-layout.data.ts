import { CHATS_PAGE, SETTINGS_PAGE } from "@/pages";
import { Path, type Layout } from "@/shared";

export const MAIN_LAYOUT: Layout = {
    title: "Sorokchat",
    path: Path.MAIN_LAYOUT.path,
    children: [CHATS_PAGE, SETTINGS_PAGE],
    loadComponent: () => import('../ui').then(module => module.MainLayout),
    protection: { type: "private" }
}