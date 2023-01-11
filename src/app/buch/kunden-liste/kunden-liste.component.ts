import { Component, OnInit } from '@angular/core';
import { KundeReadService } from '../shared/kundeRead.service';
import { NgIf } from '@angular/common';
import { WaitingComponent } from '../../shared/waiting.component';
import log from 'loglevel';

@Component({
    selector: 'hs-kunden-liste',
    templateUrl: './kunden-liste.component.html',
    styleUrls: ['./kunden-liste.component.css'],
    imports: [NgIf, WaitingComponent],
    standalone: true,
})
export class KundenListeComponent implements OnInit {
    protected waiting = false;

    protected kunden: any = [];

    protected errorMsg: string | undefined;

    constructor(private readonly service: KundeReadService) {
        log.debug('KundenlisteComponent.constructor()');
    }

    suchen(nachname: string | undefined) {
        log.debug('Suche mit Nachname: ', nachname);
        this.kunden = [];
        this.errorMsg = undefined;

        this.waiting = true;

        // eslint-disable-next-line rxjs/no-ignored-error
        this.service.find('').subscribe(data => {
            console.log(data);
        });
    }

    ngOnInit() {
        this.suchen('');
    }
}
