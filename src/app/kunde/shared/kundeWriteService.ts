import { Injectable } from '@angular/core';
import { paths } from '../../shared/paths';
import { HttpClient } from '@angular/common/http';
import log from 'loglevel';
import { Observable } from 'rxjs';
import { KundeShared } from './kunde';

@Injectable({ providedIn: 'root' })
export class KundeWriteService {
    readonly #baseUrl = paths.base;

    /**
     * @param httpClient injizierter Service HttpClient (von Angular)
     * @return void
     */
    constructor(private readonly httpClient: HttpClient) {
        log.debug('KundeWriteService.constructor: baseUrl=', this.#baseUrl);
    }

    resolveGenderForServer(gender: string): string {
        switch (gender) {
            case 'W': {
                return 'WEIBLICH';
            }
            case 'M': {
                return 'MAENNLICH';
            }
            case 'D': {
                return 'DIVERS';
            }
            default: {
                return gender;
            }
        }
    }

    resolveFamilienStandForServer(familienStand: string): string {
        switch (familienStand) {
            case 'L': {
                return 'LEDIG';
            }
            case 'VH': {
                return 'VERHEIRATET';
            }
            case 'G': {
                return 'GESCHIEDEN';
            }
            case 'VW': {
                return 'VERWITWET';
            }
            default: {
                return familienStand;
            }
        }
    }

    update(kundeToUpdate: KundeShared, id: string): Observable<any> {
        const { geschlecht, familienstand, geburtsdatum, ...rest } =
            kundeToUpdate;
        const formattedKunde = {
            ...rest,
            geschlecht: this.resolveGenderForServer(geschlecht!),
            familienStand: this.resolveFamilienStandForServer(familienstand!),
            geburtsdatum: geburtsdatum!.toISOString(),
        };

        console.log(formattedKunde);

        return this.httpClient.put(
            `http://localhost:8080${this.#baseUrl}/${id}`,
            formattedKunde,
        );
    }

    remove(kundeId: string): Observable<any> {
        return this.httpClient.delete(
            `http://localhost:8080${this.#baseUrl}/${kundeId}`,
        );
    }
}
