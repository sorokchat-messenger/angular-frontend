import { Path, type Layout } from "@/shared";

export const AUTHORIZATION_LAYOUT: Layout = {
    children: [],
    loadComponent: () => import('../ui').then(module => module.AuthorizationLayout),
    path: Path.AUTHORIZATION_LAYOUT.path,
    title: "Авторизація",
    protection: { type: "anonymous" }
};