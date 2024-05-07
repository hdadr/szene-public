import { Mass } from "./Mass";

export interface Church {
  /** A templom azonosítója (mint az url-ben) */
  tid: number;
  /** A templom teljes és hivatalos neve */
  nev?: string;
  /** Alternatív, közhasználatú név */
  ismertnev?: string;
  /** 1/0/NULL 1, ha görögkatolikus misézőhely */
  gorog?: number | null;
  /** Az ország neve kiírva (bár az eredeti adatbázis kódolva tárolja) */
  orszag?: string;
  /** A megye egyszerű neve kiírva */
  megye?: string;
  /** A város neve kiírva. Külföld esetén zároljelben másik nyelven, pl. Kolozsvár (Cluja-Napoca) */
  varos?: string;
  /** A templom (és nem a plébánia) hivatalos posta címe (ország és város nélkül) */
  cim?: string;
  /** A koordináták alapján visszafejtet lehetséges posta cím (leginkább akkor használjuk, ha a „cim” üres) */
  geocim?: string | null;
  /** A templom megközelíthetősége szövegesen leírva (gyakran üres) */
  megkozelites?: string;
  /** A koordináta hosszúsági foka pl. 24.9018 */
  lng?: number;
  /** A koordináta szélességi foka pl. 46.5643 */
  lat?: number;
  /** A templomban a nyári idő kezdete az aktuális évben (!), ÉÉÉÉ-HH-NN */
  kep?: string;
  misek: Mass[];
}

