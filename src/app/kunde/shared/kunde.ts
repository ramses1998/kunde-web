import type { AdresseShared } from './adresse';

export type GeschlechtType = 'D' | 'M' | 'W';

export type Familienstand = 'G' | 'L' | 'VH' | 'VW';

export type InteressenType = 'L' | 'R' | 'S';

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
    interessen: InteressenType[];
    adresse: AdresseShared;
}

export interface KundeShared {
    nachname: string | undefined;
    email: string | undefined;
    kategorie: number | undefined;
    hasNewsletter: boolean | undefined;
    geburtsdatum: Date | undefined;
    homepage: string | undefined;
    geschlecht: GeschlechtType | undefined;
    familienstand: Familienstand | undefined;
    adresse: AdresseShared | undefined;
}
