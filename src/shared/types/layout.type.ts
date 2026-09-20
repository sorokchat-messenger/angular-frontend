import { type Page } from "./page.type";

export type Layout = Page & {
    children: (Layout | Page)[];
}