export class TbGenModel {
    pkID: PkID;
    tl_descri: string;
    tl_descri2: string;
    tl_usrcrea: string;
    tl_feccrea: string;
    tl_hracrea: string;
    tl_usract: string;
    tl_fecact?: any;
    tl_hraact?: any;
  }
  
  interface PkID {
    tl_codtabla: string;
    tl_clave: string;
  }