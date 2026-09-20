export class Path {
    private readonly _target: string;
    private readonly _parent: Path | null;

    private constructor(target: string, parent: Path | null = null) {
        this._target = target;
        this._parent = parent;
    }

    public get path(): string {
        return this._target;
    }

    public get fullPath(): string {
        if (this._parent === null) return `/${this._target}`;
        return `${this._parent.fullPath}/${this._target}`;
    }
}