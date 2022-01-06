
export class Medico {
    pkID: PkID;
    tl_descri: string;
    tl_descri2: string;
    tl_usrcrea: string;
    tl_feccrea: string;
    tl_hracrea: string;
    tl_usract: string;
    tl_fecact?: string;
    tl_hraact?: string;
}

interface PkID {
    tl_codtabla: number;
    tl_clave: number;
}