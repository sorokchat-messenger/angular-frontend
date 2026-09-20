import { LOGIN_PAGE, REGISTER_PAGE } from "@/pages";
import { Path, type Layout } from "@/shared";

export const AUTHORIZATION_LAYOUT: Layout = {
    children: [REGISTER_PAGE, LOGIN_PAGE],
    loadComponent: () => import('../ui').then(module => module.AuthorizationLayout),
    path: Path.AUTHORIZATION_LAYOUT.path,
    title: "Авторизація",
    protection: { type: "anonymous" }
};