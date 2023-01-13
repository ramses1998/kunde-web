export interface Adresse {
    id: string;
    plz: string;
    ort: string;
}

export interface AdresseShared {
    plz: string | undefined;
    ort: string | undefined;
}
