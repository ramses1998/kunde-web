import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { WaitingComponent } from '../../shared/waiting.component';
import { FormsModule } from '@angular/forms';
import {
    ActivatedRoute,
    RouterLinkActive,
    RouterLinkWithHref,
} from '@angular/router';
import { Familienstand, GeschlechtType, Kunde, KundeShared} from '../shared/kunde';
import { KundeReadService } from '../shared/kundeRead.service';
import { KundeWriteService } from '../shared/kundeWriteService';
import log from 'loglevel';

@Component({
    selector: 'hs-kunden-liste',
    templateUrl: './update-kunde.component.html',
    styleUrls: ['./update-kunde.component.scss'],
    imports: [
        NgIf,
        WaitingComponent,
        NgForOf,
        FormsModule,
        RouterLinkActive,
        RouterLinkWithHref,
    ],
    standalone: true,
})
export class UpdateKundeComponent implements OnInit, OnChanges {
    protected waiting = false;

    protected errorMessage: string | undefined = undefined;

    protected routeId: string | null | undefined;

    constructor(
        private readonly readService: KundeReadService,
        private readonly writeService: KundeWriteService,
        private readonly activeRoute: ActivatedRoute,
    ) {
        log.debug('UpdateKundeComponent.constructor()');
    }

    protected kunde: Kunde | undefined;

    kundeForUpdate: KundeShared = {
        nachname: undefined,
        email: undefined,
        kategorie: undefined,
        hasNewsletter: undefined,
        geburtsdatum: undefined,
        homepage: undefined,
        geschlecht: undefined,
        familienstand: undefined,
        adresse: {
            plz: undefined,
            ort: undefined,
        },
    };

    kundeLaden(id: string) {
        // eslint-disable-next-line rxjs/no-ignored-error
        this.readService.findById(id).subscribe(kunde => {
            this.kunde = kunde;
            const {
                nachname,
                email,
                kategorie,
                hasNewsletter,
                geburtsdatum,
                homepage,
                geschlecht,
                familienstand,
                adresse,
            } = this.kunde;

            this.kundeForUpdate = {
                nachname,
                email,
                kategorie,
                hasNewsletter,
                geburtsdatum,
                homepage,
                geschlecht,
                familienstand,
                adresse,
            };
        });
    }

    change(event: any) {
        event.preventDefault();
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        this.kundeForUpdate[event.target.name] = event.target.value;
    }

    save(kundeToUpdate: KundeShared) {
        const { id } = this.kunde!;
        this.writeService.update(kundeToUpdate, id!).subscribe();
    }

    handleSubmit(event: any) {
        event.preventDefault();
        console.log(
            'nachname',
            document.querySelector<HTMLInputElement>('#kategorie')?.value,
        );

        // @ts-ignore
        this.kundeForUpdate = {
            nachname:
                document.querySelector<HTMLInputElement>('#nachname')?.value,
            email: document.querySelector<HTMLInputElement>('#email')?.value,
            kategorie: Number(
                document
                    .querySelector<HTMLInputElement>('#kategorie')
                    ?.value.toString(),
            ),
            hasNewsletter:
                document.querySelector<HTMLInputElement>('#hasNewsletter')
                    ?.checked,
            geburtsdatum: new Date(),
            homepage:
                document.querySelector<HTMLInputElement>('#homepage')?.value,
            geschlecht: document.querySelector<HTMLInputElement>('#geschlecht')
                ?.value as GeschlechtType,
            familienstand: document.querySelector<HTMLInputElement>(
                '#familienstand',
            )?.value as Familienstand,
            adresse: {
                ort: document.querySelector<HTMLInputElement>('#ort')?.value,
                plz: document.querySelector<HTMLInputElement>('#plz')?.value,
            },
        };

        this.save(this.kundeForUpdate);
    }

    ngOnInit(): void {
        this.routeId = this.activeRoute.snapshot.paramMap.get('kundeId');
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (this.routeId !== null && this.routeId !== undefined) {
            this.kundeLaden(this.routeId);
            return;
        }
        this.errorMessage = 'Kunde konnte nicht geladen werden.';
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log(changes['prop']?.currentValue);
    }
}
