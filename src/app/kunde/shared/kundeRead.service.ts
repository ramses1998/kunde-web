/*
 * Copyright (C) 2015 - present Juergen Zimmermann, Hochschule Karlsruhe
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
import { Injectable } from '@angular/core';
import log from 'loglevel';
import { paths } from '../../shared/paths';
// eslint-disable-next-line sort-imports
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Kunde } from './kunde';

// Methoden der Klasse HttpClient
//  * get(url, options) – HTTP GET request
//  * post(url, body, options) – HTTP POST request
//  * put(url, body, options) – HTTP PUT request
//  * patch(url, body, options) – HTTP PATCH request
//  * delete(url, options) – HTTP DELETE request

// Eine Service-Klasse ist eine "normale" Klasse gemaess ES 2015, die mittels
// DI in eine Komponente injiziert werden kann, falls sie innerhalb von
// provider: [...] bei einem Modulbereitgestellt wird.
// Eine Komponente realisiert gemaess MVC-Pattern den Controller und die View.
// Die Anwendungslogik wird vom Controller an Service-Klassen delegiert.
// Service:
// - wiederverwendbarer Code: in ggf. verschiedenen Controller
// - Zugriff auf Daten, z.B. durch Aufruf von RESTful Web Services
// - View (HTML-Template) <- Controller <- Service
// https://angular.io/guide/singleton-services

/**
 * Die Service-Klasse zu Kunden wird zum "Root Application Injector"
 * hinzugefuegt und ist in allen Klassen der Webanwendung verfuegbar.
 */
@Injectable({ providedIn: 'root' })
export class KundeReadService {
    readonly #baseUrl = paths.base;

    /**
     * @return void
     */
    constructor(private readonly http: HttpClient) {
        log.debug('KundeReadService.constructor: baseUrl=', this.#baseUrl);
    }

    /**
     * Kunden anhand von Suchkriterien suchen
     * @param nachname Die Suchkriterien
     * @returns Gefundene Buecher oder Statuscode des fehlerhaften GET-Requests
     */
    find(
        nachname: string | undefined = undefined, // eslint-disable-line unicorn/no-useless-undefined
    ): Observable<Kunde[]> {
        log.debug('KundeReadService.find: suchkriterien=', nachname);
        log.debug('KundeReadService.find: url=', this.#baseUrl);
        if (nachname === undefined || nachname.length === 0) {
            return this.http.get<Kunde[]>(
                `http://localhost:8080${this.#baseUrl}`,
            );
        }
        return this.http.get<Kunde[]>(
            `http://localhost:8080${this.#baseUrl}?nachname=${nachname}`,
        );
    }

    findById(id: string): Observable<Kunde> {
        return this.http.get<Kunde>(
            `http://localhost:8080${this.#baseUrl}/${id}`,
        );
    }
}
