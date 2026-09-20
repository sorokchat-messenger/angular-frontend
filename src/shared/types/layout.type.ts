import { type Page } from "./page.type";
import { type Protection } from "./protection.type";

export type Layout = Omit<Page, "protection"> & {
    children: (Layout | Page)[];
    protection: Protection;
}