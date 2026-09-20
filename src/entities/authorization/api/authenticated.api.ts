import { computed } from "@angular/core";
import { injectProfile } from "./profile.api";

export function injectAuthenticated() {
    const profile = injectProfile();
    return computed<boolean>(() => {
        return profile.status() === 'success';
    });
}