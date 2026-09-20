import { type Routes } from '@angular/router';
import { LAYOUTS } from '../layouts';

export const APPLICATION_ROUTES: Routes = LAYOUTS.map(layout => ({
    loadComponent: layout.loadComponent,
    path: layout.path,
    children: layout.children,
    title: layout.title
}));
