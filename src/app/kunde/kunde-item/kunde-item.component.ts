import { Component, OnInit } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { WaitingComponent } from '../../shared/waiting.component';
import { FormsModule } from '@angular/forms';
import {
    ActivatedRoute,
    RouterLinkActive,
    RouterLinkWithHref,
} from '@angular/router';
import { Kunde } from '../shared/kunde';
import { KundeReadService } from '../shared/kundeRead.service';
import log from 'loglevel';

@Component({
    selector: 'hs-kunde-item',
    templateUrl: './kunde-item.component.html',
    styleUrls: ['./kunde-item.component.scss'],
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
export class KundeItemComponent implements OnInit {
    protected waiting = false;

    protected errorMessage: string | undefined = undefined;

    protected kunde: Kunde | undefined;

    protected routeId: string | null | undefined;

    protected fieldListData: [string, any][] = [];

    constructor(
        private readonly readService: KundeReadService,
        private readonly activeRoute: ActivatedRoute,
    ) {
        log.debug('KundeItemComponent.constructor()');
    }

    kundeLaden(id: string) {
        // eslint-disable-next-line rxjs/no-ignored-error
        this.readService.findById(id).subscribe(kunde => {
            this.kunde = kunde;
            this.fieldListData = Object.entries(this.kunde)
                .filter(e => e[0] !== 'id')
                .map(e => {
                    if (e[0] === 'adresse') {
                        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                        return [e[0], `${e[1].plz} ${e[1].ort}`];
                    }
                    return e;
                });
        });
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
}
