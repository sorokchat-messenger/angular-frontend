import { Path, type Page } from "@/shared";

export const LOGIN_PAGE: Page = {
    loadComponent: () => import('../ui').then(module => module.LoginPage),
    path: Path.LOGIN_PAGE.path,
    title: "Вхід"
}