# Motion: Ersättande av poströstning med ett säkert digitalt röstningssystem

## Bakgrund och Syfte
Idag tillämpas en kombination av fysisk röstning och pappersbaserad 
poströstning vid Mensa Sveriges årsmöten. I dagsläget rör det sig endast om 
cirka 20–30 poströster per årsmöte. Även om antalet är litet, innebär 
hanteringen av dessa fysiska pappersröster ett omfattande och tungroddigt 
administrativt arbete för valkommittén. 

Vår målbild är att helt och hållet avskaffa pappersbaserad poströstning och 
istället övergå till ett renodlat digitalt röstningssystem. En digital 
lösning täcker i sin helhet det behov som poströstningen idag fyller, det 
vill säga möjligheten att rösta i förväg för de som inte kan delta. Funktionen 
och den demokratiska möjligheten finns därmed kvar, men det administrativa 
pappersarbetet försvinner helt.

Deltagare ska dessutom kunna sitta på distans, lyssna på diskussionen via 
stream och ändra eller lägga sin röst digitalt under själva mötet. Alla 
andra nordiska Mensa-föreningar har redan framgångsrikt infört digital 
omröstning. 

## Tidpunkt för röstning
Enligt stadgarna (§ 5.2.4) ska årsmötets dagordning och handlingar (den andra 
kallelsen) finnas medlemmarna tillhanda senast fyra (4) veckor före årsmötet. 
Vårt förslag är att det digitala röstningssystemet, och därmed möjligheten 
att förtidsrösta, öppnar exakt vid denna tidpunkt. Medlemmarna får då access 
till röstningsappen exakt samtidigt som de får tillgång till beslutsunderlagen.

## Problematiken kring röstlängd och "närvaro"
Vid en övergång till digital röstning måste begreppet "röstlängd" omdefinieras.
Det räcker inte med att en medlem enbart loggar in i appen för att räknas in 
i röstlängden, eftersom många loggar in enbart för att läsa handlingar. För 
att undvika en artificiellt hög andel blanka/nedlagda röster samt 
dubbelräkning av fysiskt närvarande medlemmar föreslår vi att *alla* (både 
fysiskt närvarande och distansdeltagare) lägger sin röst via det digitala 
systemet. Röstlängden fastställs dynamiskt per fråga, baserat på det totala 
antalet medlemmar som aktivt avger en röst (Ja, Nej, eller Avstår/Blankt).

## Yrkande
Med anledning av ovanstående yrkar vi:

1. **Att** Mensa Sverige helt avskaffar den pappersbaserade poströstningen 
   till förmån för ett digitalt röstningssystem.
2. **Att** medlemmar ges tillgång till röstningsappen och kan börja 
   förtidsrösta samtidigt som årsmötets dagordning och handlingar görs 
   tillgängliga (senast 4 veckor innan årsmötet enligt § 5.2.4).
3. **Att** en digital förtidsröst fritt ska kunna ändras fram till 
   ordförandens klubbslag i respektive fråga på årsmötet.
4. **Att** röstlängden baseras uteslutande på de medlemmar som aktivt avger 
   en röst i det digitala systemet i respektive fråga.
5. **Att** stadgarna uppdateras i enlighet med "Bilaga 1" nedan för att 
   möjliggöra denna förändring.


---

# Bilaga 1: Förslag till stadgeändringar (Kapitel 5)

Nedan följer de specifika ändringar i stadgarna som krävs för att möjliggöra 
beslutet. All text rörande pappersbaserad poströstning stryks.

### Ändring av § 5.5.1 (Röstlängd)
**Nuvarande text (innebörd):** Röstlängden fastställs utifrån de fullvärdiga 
medlemmar som är fysiskt närvarande vid mötet samt antalet inkomna poströster.

**Föreslagen ny text:**
*Röstlängden utgörs av de fullvärdiga medlemmar som aktivt avger en röst 
(Ja, Nej eller Avstår) via föreningens digitala röstningssystem. Röstlängden 
är dynamisk och fastställs per enskild fråga och omröstning under mötets 
gång. Enbart inloggning i röstningssystemet grundar inte närvaro i röstlängd.*

### Strykning av Poströstning och införande av Förtidsröstning
**Nuvarande text (innebörd):** Berör att poströster ska skickas in i 
pappersformat och vara valkommittén tillhanda senast en specifik tid innan 
årsmötet. Om en medlem närvarar fysiskt måste poströsten makuleras manuellt.

**Föreslagen ändring:**
*Samtliga paragrafer som reglerar pappersbaserad poströstning stryks i sin 
helhet och ersätts av ett ramverk för digital förtidsröstning.*

**Föreslagen ny text för förtidsröstning:**
*Förtidsröstning sker exklusivt via ett säkert digitalt röstningssystem. 
Systemet för omröstning ska öppnas och göras tillgängligt för medlemmarna 
samtidigt som den andra kallelsen och dagordningen skickas ut i enlighet med 
§ 5.2.4 (senast fyra veckor innan årsmötet). En lagd digital förtidsröst kan 
fritt ändras av medlemmen fram till dess att mötesordföranden förklarar 
omröstningen för stängd under pågående årsmöte.*

### Ändring av § 5.6 (Rösträkning och valmetod)
**Nuvarande text (innebörd):** Berör hur fysiska röster och poströster 
sammanräknas manuellt, inklusive vid personval enligt STV-metoden.

**Föreslagen ny text:**
*All rösträkning, inklusive uträkning av mandat enligt "Enkel överförbar röst" 
(STV), utförs och fastställs primärt via det digitala röstningssystemet. 
Valkommittén ansvarar för att innan mötet verifiera systemets funktion och 
rättssäkerhet. Ingen data som kopplar en specifik medlems identitet till en 
specifik röst får lagras permanent.*

# Bilaga 2: Hotmodellering och Riskanalys (Threat Modeling)

Införandet av ett digitalt röstningssystem skiftar föreningens sårbarheter 
från fysiska risker (exempelvis lågt valdeltagande och poströster som 
försvinner) till tekniska risker. För att garantera en rättssäker process 
måste systemet upphandlas och designas för att motstå följande hotscenarier:

### Scenario 1: Inifrån-attack ("Rogue Admin" / Korrupt ledning)
**Beskrivning:** Personer med administrativ makt (t.ex. i styrelsen eller 
IT-ansvariga) försöker manipulera valet för egen vinning, exempelvis för att 
få igenom ansvarsfrihet eller dölja ekonomiska oegentligheter.
**Risker:**
- Databasmanipulation: Ändring av lagda röster i systemets databas.
- "Tjuvkikning": Administratörer ser röstningstrender i förväg och anpassar 
  årsmötets debatt eller ställer in mötet på falska tekniska grunder.
**Skyddsmekanismer (Krav på systemet):**
- **Zero-Knowledge / Kryptografisk låsning:** Den digitala valurnan ska vara 
  krypterad med en nyckel som delas ut/aktiveras först när mötesordföranden 
  stänger omröstningen. Ingen ska kunna se preliminära resultat.
- **Transparens och Revisionsspår:** Alla administrativa ändringar (som att 
  byta ut ett uppladdat dokument) måste loggas oföränderligt så att en extern 
  revisor i efterhand kan se exakt vem som gjort vad och när.

### Scenario 2: Koordinerad minoritet ("Digital Flash Mob" / Röstfiske)
**Beskrivning:** En liten grupp medlemmar försöker kuppa in en specifik 
kandidat i styrelsen, vilket historiskt varit möjligt vid fysiska årsmöten 
med lågt deltagande.
**Risker:**
- Digitalt röstfiske: Medlemmar övertalas att lämna ifrån sig sina 
  inloggningsuppgifter ("ge mig ditt lösenord så röstar jag åt dig").
- Sista-minuten-attack: Gruppen massröstar i slutet av debatten innan övriga 
  medlemmar hinner reagera.
**Skyddsmekanismer (Krav på systemet):**
- **Stark Autentisering:** Inloggning bör ske via BankID (för svenska 
  medlemmar) eller motsvarande tidsbegränsad tvåfaktorsautentisering (2FA). 
  Detta gör det i praktiken omöjligt/orimligt att dela inloggningsuppgifter.
- **Utspädningseffekten:** Ett digitalt system höjer valdeltagandet drastiskt. 
  En kupp som tidigare krävde 50 personer kräver plötsligt hundratals, vilket 
  gör den omöjlig att hålla hemlig.

### Scenario 3: Tredjepartsrisk (Kompomprometterad leverantör)
**Beskrivning:** Företaget (SaaS-bolaget) som levererar röstningsplattformen 
drabbas av ett dataintrång, eller en oärlig anställd hos leverantören 
manipulerar utfallet.
**Risker:**
- Leverantören läcker information om vem som röstat på vad (brott mot 
  anonymiteten).
- Utländska statsaktörer eller hackare ändrar valresultatet via leverantören.
**Skyddsmekanismer (Krav på systemet):**
- **End-to-End Verifiability (E2E-V):** Systemet bör erbjuda matematisk 
  verifierbarhet. Detta innebär att en medlem, med hjälp av en personlig 
  kvittokod, själv kan verifiera att just deras röst har räknats korrekt i 
  slutsammanställningen, utan att avslöja för någon annan vad de röstade på.
- **Dataseparation:** Systemet får inte spara kopplingen mellan "Vem som 
  röstat" och "Vad de röstade på" i samma databastabell (Blind Signatures).

### Scenario 4: Tekniskt haveri eller Överbelastningsattack (DDoS)
**Beskrivning:** Röstningssystemet går ner, antingen på grund av hög 
belastning när hundratals medlemmar loggar in samtidigt, eller på grund av 
en illvillig överbelastningsattack riktad för att sabotera årsmötet.
**Risker:**
- Medlemmar kan inte avge sina röster.
- Omröstningen måste avbrytas och årsmötets beslut ogiltigförklaras.
**Skyddsmekanismer (Processkrav):**
- **Robust infrastruktur:** Leverantören måste kunna garantera 
  skalbarhet och ha DDoS-skydd (t.ex. Cloudflare).
- **Fall-back i stadgar/ordningsregler:** Mötesordföranden måste ha tydligt 
  mandat att pausa mötet vid tekniskt haveri, förlänga röstningstiden, 
  eller i sista hand återgå till en manuell reservrutin för de närvarande.

### Scenario 5: Otillbörlig påverkan ("Påtryckning i hemmet")
**Beskrivning:** En medlem blir utsatt för påtryckningar av en partner, 
släkting eller vän som står bredvid skärmen och tvingar personen att rösta 
på ett specifikt sätt (Coercion/Family voting).
**Risker:**
- Brott mot valhemligheten och den fria viljan.
**Skyddsmekanismer (Processkrav):**
- **Obegränsade ändringar under röstningsperioden:** Den internationella 
  standarden för att motverka detta (används bl.a. i Estlands nationella 
  e-val) är att tillåta väljaren att ändra sin förtidsröst obegränsat 
  antal gånger fram till klubbslaget. Medlemmen kan då rösta som 
  "påtryckaren" kräver i stunden, och sedan logga in senare i enrum och 
  ändra tillbaka till sin sanna åsikt. Den sista lagda rösten är den enda 
  som registreras och räknas.
