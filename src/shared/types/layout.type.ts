import { type Page } from "./page.type";
import { type Protection } from "./protection.type";

export type Layout = Omit<Page, "protection" | "icon"> & {
    children: (Layout | Page)[];
    protection: Protection;
}