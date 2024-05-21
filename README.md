A következő linken elérhető, ajánlom az okostelefonon való megnyítást, mert arra lett fejlesztve a kezelő felület. Ha a google chrome böngészőben van megnyitva, akkor felkínálja, hogy telepítsük (vagy adjuk hozzá a kezdőképernyőhöz, ha nem kínálná fel, akkor a böngésző eszkőzei között - általában a három ponttal jelzett ikon, megtalálható ez a funkció) és ilyenkor olyan, mintha egy az alkalmazás boltból letöltött alkalmazást használnánk.https://szentekelete.vercel.app/
 
- A neve "Szentek élete". Annak indult, hogy legyen egy mobilos alkalmazás, ami offline módban is működik (előre letölti az összes szentekről készült rövid leírást) és az adott napon automatikusan megjeleníti a megfelelőt. Innen a név eredete.   Ezután úgy találtam, hogy a szentek mellett a napi olvasmányt is megjeleníthetné, hogy akkor egy alkalmazáson belül legyen mind ez, és ez is offline módban, internet elérés nélkül. Ki van még egészítve azzal, hogy a vaticannews oldalról a gospel of the day-hez tartozó Ferenc pápa homíliáját is tartalmazza (ehhez internet elérés szükséges).   
- A miserend keresőjét és a megjelenítését nehézkesnek találtam és úgy voltam vele, hogy akkor miért ne hoznám ezt is egy tető alá, mert a szentek életéhez hozzá tartozik az olvasmányok olvasása és a miséken való részvétel, ezért egy egyszerűbb keresési lehetőséget megvalósítottam, néhány funkcióval, amit hasznosnak találtam (előzmények, mentés, térképen való elhelyezés: három kis pontra kattintva). 
- A Szentek élete alkalmazás név megmaradt, habár nem csak a szentek életéről olvashatunk benne. A látásmód változott, hogy miért marad a név, az az, hogy mi éljük és lépjünk rá a szentek életének útjára, azáltal, hogy az egyházi segítséggel élünk, amelynek egy része itt az alkalmazásban található.

Hogy miben lehetne beszállni a fejlesztésében:
- zsolozsma integrációja (internet elérés nélkül is)
- szentírás integrációja (internet elérés nélkül is, jegyezze meg, hogy hol tartunk az olvasásban, tudjunk könnyen navigálni benne, kereshető legyen...)
- szentírás, az olvasmányoknál szokott lenni referencia, hogy honnan van az adott részlet, onnan át lehetne irányítani ide és a kontextusban elolvasni.
- misék és templomok keresése oldalon jelenleg csak város alapján lehet keresni, a többi szűrőfeltétel alapján nem, azoknak az adatai jelenleg nem továbbítódnak a teszt szerver felé - local, vagy supabase, ezt előszőr localban lehetne megtervezni és megvalósítani, utána jó lenne, ha a miserend.hu szervere tudná fogadni az ehhez szükséges kéréseket. Ez nem igyekszik le váltani a miserend.hu
-t, hanem maradna ez a felállás, hogy ha további információ szükséges, akkor a linken átírányítódna a user (esetleg maga a templom honlapjának a linkjét érdemes lehetne már eltárolni és azt még megjeleníteni).
- misék és templomok, egy gombbal ki lehessen választani az összes templomot a listából (pl a keresett városban), hogy azt a térképen helyezze el.
- szentek élete, név alapján keresni lehessen az adott szentre, (lehessen elmenteni szentet?)
- szentek élete, a szent hosszabb leírása egy alternatív fülön, esetleg olyan oldalak vagy interneten elérhető és letölthető könyvek keresése, amelyek hosszabban foglalkoznak az adott szenttel és ennek a linkjét megadni. Jelenleg az archiv.katolikus.hu/szentek oldalról lett robottal leszedve a szöveg, de a referencia linkek mutatják, hogy mi honnan jött.
- szentek élete oldalon, a nagyobb ünnepeket bevettem, néhol az időszakot is, ezt kellene egésszé tenni, mert pl a húsvéti időszak hiányzik, meg jó lenne, ha az adott ünnep kattintható lenne és megjelenítené  annak a leírását, valami minőségi írás, olyannak képzelem, hogy ha nem is sokat tudok az ünnepről és elolvasom, akkor szinte tudjak mindent. Kb. wikipédia, csak jobb tartalommal. 
- ige, napi olvasmányok az igenaptar.katolikus.hu
-ról lettek megint csak leszedve, de mivel az oldal formája nem egységes, ezért vannak benne tökéletlenül leszedett és rendszerezett tartalmak, ezt kellene olyan módon javítani, hogy az adatbázis, amiből megjeleníti az alkalmazás az adatokat, már "egészséges" legyen (hátha el lehetne kérni tőlük az övékét, vagy más forrásból. 
- ige, homília beszerzése minden napra magyarul is (offline mód).
- felhasználói felület hibái, aránytalanságainak javítása
- ahol szükséges jobb felhasználói élmény létrehozása.
- asztali böngészős, tablet nézet kifejlesztése

A miserend részéhez a local szerver a demo-server mappában található, az indítása: **node server.js** paranccsal történik parancssorból, az adott mappából, előtte ugye **npm i** hogy minden dependency feltelepítődjön.
Ugyancsak **npm i** szükséges a gyökérmappában, hogy a react (vite) dependency-je is feltelepítődjön. Utánna **npm run dev**-vel indítható
