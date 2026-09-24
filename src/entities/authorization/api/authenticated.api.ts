import { computed } from "@angular/core";
import { injectProfile } from "./profile.api";

export function injectIsAuthenticated() {
    const profile = injectProfile();
    return computed<boolean | undefined>(() => {
        switch (profile.status()) {
            case 'pending': return undefined;
            case 'error': return false;
            case 'success': return true;
            default: return false;
        }
    });
}