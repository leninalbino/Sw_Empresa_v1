export class TablaNumeracion {
    pkID: PkID;
    nl_nume: number;
    nl_usrcrea: string;
    nl_feccrea?: string;
    nl_hracrea?: string;
    nl_usract?: string;
    nl_fecact?: string;
    nl_hraact?: string;
}

class PkID {
  nl_subdia: string;
  nl_anio: string;
  nl_mes: string;
}