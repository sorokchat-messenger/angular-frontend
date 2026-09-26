import { Path, SETTINGS_ICON, type Page } from "@/shared";

export const SETTINGS_PAGE: Page = {
    icon: SETTINGS_ICON,
    loadComponent: () => import("../ui").then(module => module.SettingsPage),
    path: Path.SETTINGS_PAGE.path,
    title: "Налаштування"
}