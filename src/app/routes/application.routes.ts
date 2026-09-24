import { Route, type Routes } from '@angular/router';
import { LAYOUTS } from '../layouts';
import { Page, Layout } from '@/shared';
import { universalGuard } from '../guards';

function mapToRoutes(routes: (Layout | Page)[]): Routes {
    return routes.map(route => {
        const result: Route = {
            title: route.title,
            loadComponent: route.loadComponent,
            path: route.path,
        }
        if ("children" in route) {
            result.children = mapToRoutes(route.children)
        }
        if (route.protection !== undefined) {
            const guard = universalGuard(route.protection);
            result.canActivate = [guard];
            result.canActivateChild = [guard];
        }
        return result;
    });
}

export const APPLICATION_ROUTES: Routes = mapToRoutes(LAYOUTS);
