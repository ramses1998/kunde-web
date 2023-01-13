import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { KundeReadService } from '../shared/kundeRead.service';
import { NgForOf, NgIf } from '@angular/common';
import { WaitingComponent } from '../../shared/waiting.component';
import log from 'loglevel';
import { InteressenType, Kunde } from '../shared/kunde';
import { FormsModule } from '@angular/forms';
import { KundeWriteService } from '../shared/kundeWriteService';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';

@Component({
    selector: 'hs-kunden-liste',
    templateUrl: './kunden-liste.component.html',
    styleUrls: ['./kunden-liste.component.css'],
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
export class KundenListeComponent implements OnInit, OnChanges {
    protected waiting = false;

    protected kunden: Kunde[] = [];

    protected errorMsg: string | undefined;

    protected gefilterteKunden: Kunde[] = [];

    searchInputContent = '';

    constructor(
        private readonly readService: KundeReadService,
        private readonly writeService: KundeWriteService,
    ) {
        log.debug('KundenlisteComponent.constructor()');
    }

    kundenLaden(nachname: string | undefined) {
        log.debug('Suche mit Nachname: ', nachname);
        this.kunden = [];
        this.errorMsg = undefined;

        this.waiting = true;

        // eslint-disable-next-line rxjs/no-ignored-error
        this.readService.find('').subscribe(kunden => {
            this.waiting = false;
            this.kunden = kunden.map<Kunde>((kunde: any) => ({
                ...kunde,
                geburtsdatum: this.convertDateStringToJavaScriptDate(
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    kunde.geburtsdatum,
                ),
            }));
            this.gefilterteKunden = this.kunden;
        });
    }

    change(event: any) {
        event.preventDefault();
        this.searchInputContent = event.target.value as string;
        this.nachKundenSuchen(this.searchInputContent);
    }

    nachKundenSuchen(suchText: string) {
        this.gefilterteKunden = this.kunden.filter<Kunde>(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            (kunde: Kunde) =>
                kunde.nachname.toLowerCase().includes(suchText.toLowerCase()) ||
                kunde.email.toLowerCase().includes(suchText.toLowerCase()) ||
                kunde.kategorie
                    .toString()
                    .toLowerCase()
                    .includes(suchText.toLowerCase()) ||
                kunde.homepage.toLowerCase().includes(suchText.toLowerCase()) ||
                kunde.geschlecht
                    .toLowerCase()
                    .includes(suchText.toLowerCase()) ||
                kunde.familienstand
                    ?.toLowerCase()
                    .includes(suchText.toLowerCase()) ||
                kunde.interessen?.some((g: InteressenType) =>
                    g.toLowerCase().includes(suchText.toLowerCase()),
                ),
        );
    }

    kundeLoechen(kundeId: string) {
        // eslint-disable-next-line rxjs/no-ignored-error
        this.writeService.remove(kundeId).subscribe(() => {
            this.kunden = this.kunden.filter(k => k.id !== kundeId);
            this.gefilterteKunden = this.kunden;
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log(changes['prop']?.currentValue);
    }

    convertDateStringToJavaScriptDate(isoDate: string): Date {
        return new Date(isoDate);
    }

    ngOnInit() {
        this.kundenLaden('');
    }
}
