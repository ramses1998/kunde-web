import type { AdresseShared } from './adresse';

export type GeschlechtType = 'D' | 'M' | 'W';

export type Familienstand = 'G' | 'L' | 'VH' | 'VW';

export type Interessen = 'L' | 'R' | 'S';

export interface Kunde {
    id?: string | undefined;
    version?: number | undefined;
    nachname: string;
    email: string;
    kategorie: number;
    hasNewsletter: boolean;
    geburtsdatum: Date;
    homepage: string;
    geschlecht: GeschlechtType;
    familienstand: Familienstand;
    interessen: Interessen[];
    adresse: AdresseShared;
}

export interface KundeShared {
    nachname: string;
    email: string;
    kategorie: number;
    hasNewsletter: boolean;
    geburtsdatum: Date;
    homepage: string;
    geschlecht: GeschlechtType;
    familienstand: Familienstand;
    adresse: AdresseShared;
}
