import { Path, type Page } from "@/shared";

export const REGISTER_PAGE: Page = {
    loadComponent: () => import("../ui").then(module => module.RegisterPage),
    path: Path.REGISTER_PAGE.path,
    title: "Реєстрація",
}