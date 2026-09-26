import {
    LucideEye,
    LucideEyeClosed,
    LucideMessageCircle,
    LucideSearch,
    LucideSettings,
    LucideSquarePen,
    LucideUserPlus,
    LucideUserRound,
} from "@lucide/angular";
import { type IconType } from "../types";

export const ICON_SIZE: number = 25;
export const PLACEHOLDER_ICON_SIZE: number = ICON_SIZE * 3;
export const TEXT_ICON_SIZE: number = Math.floor(ICON_SIZE * 0.75);
export const SHOW_PASSWORD_ICON: IconType = LucideEye;
export const HIDE_PASSWORD_ICON: IconType = LucideEyeClosed;
export const CHATS_ICON: IconType = LucideMessageCircle;
export const LOGIN_ICON: IconType = LucideUserRound;
export const REGISTER_ICON: IconType = LucideUserPlus;
export const SETTINGS_ICON: IconType = LucideSettings;
export const NEW_CHAT_ICON: IconType = LucideSquarePen;
export const SEARCH_ICON: IconType = LucideSearch;