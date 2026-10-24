import { type OverlayRef } from "@angular/cdk/overlay";
import { InjectionToken } from "@angular/core";
import { Observable, Subject } from "rxjs";

export const MODAL_DATA = new InjectionToken<unknown>("MODAL_DATA");

export class ModalRef<R = void, D = unknown> {
    private readonly afterClosed$ = new Subject<R | undefined>();

    public constructor(
        private readonly overlayRef: OverlayRef,
        public readonly data: D
    ) { }

    public close(result?: R): void {
        this.overlayRef.dispose();
        this.afterClosed$.next(result);
        this.afterClosed$.complete();
    }

    public get afterClosed(): Observable<R | undefined> {
        return this.afterClosed$.asObservable();
    }
}