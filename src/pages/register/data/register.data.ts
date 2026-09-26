import { Path, REGISTER_ICON, type Page } from "@/shared";

export const REGISTER_PAGE: Page = {
    loadComponent: () => import("../ui").then(module => module.RegisterPage),
    path: Path.REGISTER_PAGE.path,
    title: "Реєстрація",
    icon: REGISTER_ICON
}