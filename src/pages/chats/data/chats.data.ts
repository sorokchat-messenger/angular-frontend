import { Path, type Page } from "@/shared";

export const CHATS_PAGE: Page = {
    path: Path.CHATS_PAGE.path,
    loadComponent: () => import('../ui').then(module => module.ChatsPage),
    title: "Чати"
};