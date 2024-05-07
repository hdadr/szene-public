export interface Mass {
  /** Mise azonosító */
  mid: number;
  /** A templom azonosítója (mint az url-ben) */
  tid: number;
  /** A mise periódusa/ismétlődése, NULL ha mindig van */
  periodus?: string;
  /** Az időszak megnevezése szöveggel kiírva */
  idoszak?: string;
  /** Az „időszak” súlya. Ha két időszak (részben) átfedi egymást, akkor a nehezebb súlyú időszak miséi érvényesek csak. */
  suly?: number;
  /** Az „időszak” első napjának dátuma (H)HNN formátumban. */
  datumtol?: number;
  /** Az „időszak” utolsó napjának dátuma (H)HNN formátumban. */
  datumig?: number;
  /** 1-7 (hétfő - vasárnap) vagy 0 (bármilyen nap) */
  nap?: number;
  /** Pl.: 08:30:00 */
  ido?: string;
  /** A nyelv rövidítése és periódusa, több érték esetén vesszőkkel elválasztva. */
  nyelv?: string;
  /** Minden nem nyelvi tulajdonság és periódusa, több érték esetén vesszőkkel elválasztva. */
  milyen?: string;
  /** Szöveges megjegyzés a misével kapcsolatban. */
  megjegyzes?: string;
}

/**A szentmise tulajdonságának rövidítése esetleg egy periódus megjelölésével. Több érték esetén vesszővel elválasztva. Például: ifi,ige3 = mindig ifjúsági/egyetemista mise, de a hónap harmadik hetében csak igeliturgia.

    ####Lehetséges tulajdonságok:
    
    g = gitáros
    cs = csendes
    csal = családos/gyerek
    d = diák
    ifi = egyetemista/ifjúsági
    ige = igeliturgia
    szent = szentségimádás
    utr = utrenye
    vecs = vecsernye
    gor = görögkatolikus (római rítusú templomban)
    rom = római katolikus (görögkatolikus rítusú templomban)
    regi = régi rítusú
    Ha nincs megadva ezzel ellenkező tulajdonság, akkor a római katolikus misézőhely eseménye „római katolikus szentmise”, míg egy görögkatolikus hely alapérelmezett eseménye „görögkatolikus isteni liturgia”. 
*/

/**####Lehetséges nyelvek:

    hu vagy üres = magyar (előfordulhat még, de nem támogatott: „h”)
    en = angol
    de = német
    it = olasz
    fr = francia
    va = latin
    gr = görög
    sk = szlovák
    hr = horvát
    pl = lengyel
    si = szlovén
    További nyelvek esetén az internetes 2 betűs végződés az irányadó!
 */
