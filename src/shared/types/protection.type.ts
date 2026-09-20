import { type Role } from "@sorokchat-messenger/contracts";

export type Protection = { type: "anonymous" }
    | { type: "public" }
    | { type: "private" }
    | { type: "protected", neededRoles: Role[] };