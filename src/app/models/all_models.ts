export interface Record {
    chrom: string;
    pos: number;
    id: string;
    ref: string;
    alt: string;
    qual: number;
    filter: string;
    info: string;
    format: string;
}

export interface User {
    name: string;
    lastname: string;
    phone: string;
    email: string;
    secret: string;
}