import { type Type } from "@angular/core";
import { type Protection } from "./protection.type";
import { type IconType } from "./icon-type";

export type Page = {
    title: string;
    path: string;
    loadComponent: () => Promise<Type<unknown>>;
    protection?: Protection;
    icon: IconType;
}