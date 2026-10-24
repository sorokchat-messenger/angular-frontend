import { inject, Injector, Service } from "@angular/core";
import { type ComponentType, Overlay, type OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal } from '@angular/cdk/portal';
import { filter, take } from "rxjs";
import { MODAL_DATA, ModalRef } from "./modal-ref";

export interface ModalConfig<D = unknown> {
    data?: D;
    hasBackdrop?: boolean;
    backdropClass?: string
}

@Service()
export class ModalService {
    private readonly overlay = inject(Overlay);
    private readonly injector = inject(Injector);

    public open<C, R = void, D = unknown>(component: ComponentType<C>, config: ModalConfig<D> = {}): ModalRef<R, D> {
        const overlayRef = this.overlay.create({
            hasBackdrop: config.hasBackdrop ?? true,
            backdropClass: config.backdropClass ?? "overlay",
            positionStrategy: this.overlay
                .position()
                .global()
                .centerHorizontally()
                .centerVertically(),
            scrollStrategy: this.overlay.scrollStrategies.block()
        });
        const modalRef = new ModalRef<R, D>(overlayRef, config.data as D);
        const customInjector = Injector.create({
            parent: this.injector,
            providers: [
                { provide: ModalRef, useValue: modalRef },
                { provide: MODAL_DATA, useValue: config.data }
            ]
        });
        const portal = new ComponentPortal(component, null, customInjector);
        overlayRef.attach(portal);
        overlayRef
            .backdropClick()
            .pipe(take(1))
            .subscribe(() => modalRef.close());

        overlayRef
            .keydownEvents()
            .pipe(
                filter(event => event.key === "Escape")
            )
            .subscribe(() => modalRef.close());
        return modalRef;
    }
}