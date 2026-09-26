import { AUTHORIZATION_CONTROLLER } from "@sorokchat-messenger/contracts";

export class Path {
    private readonly _target: string;
    private readonly _parent: Path | null;

    public static readonly AUTHORIZATION_LAYOUT = new Path(AUTHORIZATION_CONTROLLER.NAME);
    public static readonly REGISTER_PAGE = new Path(AUTHORIZATION_CONTROLLER.REGISTER, Path.AUTHORIZATION_LAYOUT);
    public static readonly LOGIN_PAGE = new Path(AUTHORIZATION_CONTROLLER.LOGIN, Path.AUTHORIZATION_LAYOUT);
    public static readonly MAIN_LAYOUT = new Path("");
    public static readonly CHATS_PAGE = new Path("chats", this.MAIN_LAYOUT);
    public static readonly SETTINGS_PAGE = new Path("settings", this.MAIN_LAYOUT);

    private constructor(target: string, parent: Path | null = null) {
        this._target = Path.normalize(target);
        this._parent = parent;
    }

    public get path(): string {
        return this._target;
    }

    public get fullPath(): string {
        const parentPath = this._parent?.fullPath ?? "";
        return `${parentPath}${this.segment}`;
    }

    private get segment(): string {
        if (this._target === "" || this._target === "*") {
            return "";
        }

        return `/${this._target}`;
    }

    private static normalize(target: string): string {
        if (!target) {
            return "";
        }

        return target.replace(/^\/+|\/+$/g, "");
    }
}