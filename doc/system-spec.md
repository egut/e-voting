# Systemspecifikation: Digitalt röstningssystem för Mensa Sverige

## 1. Översikt och Syfte

### 1.1 Bakgrund

Detta dokument beskriver det digitala röstningssystem som ska ersätta pappersbaserad poströstning vid Mensa Sveriges årsmöten, i enlighet med antagen motion. Systemet ska möjliggöra både förtidsröstning och live-röstning under mötet, samt stödja distansdeltagande via stream.

### 1.2 Målbild

Systemet ska utvecklas som en **Open Source-lösning** (förslagsvis under AGPLv3 eller MIT-licens) för att maximera transparens och möjliggöra återanvändning av andra svenska och nordiska föreningar. Öppen källkod är ett kärnkrav för att bygga förtroende för e-röstningssystem hos medlemmarna.

### 1.3 Kärnprinciper

- **Transparens**: Öppen källkod och verifierbar rösträkning
- **Säkerhet**: Kryptografisk separation mellan identitet och röst
- **Tillgänglighet**: Fungerar på alla enheter (mobil, surfplatta, dator)
- **Portabilitet**: Kan driftas från laptop till molnkluster
- **Användarvänlighet**: Intuitivt gränssnitt för alla användarroller

## 2. Funktionella Krav

### 2.1 Röstningsprocess (enligt antagen motion)

#### 2.1.1 Tidslinje för röstning

- **Förtidsröstning öppnar**: Samtidigt som andra kallelsen publiceras (senast 4 veckor före årsmötet enligt § 5.2.4)
- **Förtidsröstning pågår**: Fram till ordförandens klubbslag i respektive fråga
- **Live-röstning**: Under årsmötet för både fysiskt närvarande och distansdeltagare
- **Röständring**: Medlemmar kan fritt ändra sin förtidsröst obegränsat antal gånger fram till klubbslaget

#### 2.1.2 Röstlängd (enligt antagen motion)

- Röstlängden är **dynamisk** och fastställs per enskild fråga
- Baseras uteslutande på medlemmar som **aktivt avger en röst** (Ja, Nej eller Avstår)
- Enbart inloggning i systemet grundar INTE närvaro i röstlängd
- Både fysiskt närvarande och distansdeltagare röstar via samma digitala system

#### 2.1.3 Valmetoder

Systemet ska stödja följande rösträkningsmetoder (valbar per fråga):

1. **Enkel majoritet (Plurality)**: Flest röster vinner, används för enkla Ja/Nej-frågor
2. **Absolut majoritet (>50%)**: Kräver mer än hälften av rösterna
3. **Enkel överförbar röst (STV)**: Rangordning av kandidater med automatisk röstöverföring (standard för Mensa)
4. **Godkännanderöstning (Approval Voting)**: Väljaren godkänner flera kandidater
5. **Schulze-metoden (Condorcet)**: Rangordning med simulerade dueller mellan kandidater

### 2.2 Användarroller och Behörigheter

#### 2.2.1 Superadmin (IT-ansvarig)

- Konfigurerar föreningsspecifika inställningar (namn, logotyp, färgtema)
- Sätter upp integration mot medlemsregister (Föreningshuset API)
- Konfigurerar autentiseringsmetoder (Freja eID+, 2FA)
- Ansvarar för teknisk drift och säkerhetskopiering

#### 2.2.2 Mötessamordnare (Styrelserepresentant)

- Skapar årsmöten och bygger dagordning
- Laddar upp handlingar och bilagor
- Kopplar dokument till specifika agendapunkter
- Aktiverar förtidsröstning

#### 2.2.3 Valkommittén

- Lägger upp kandidater med presentationer och profilbilder
- Väljer valmetod för varje personval
- Verifierar kandidatuppgifter
- **Godkänner utländska medlemmar för röstning** (manuell verifiering mot medlemsregister)
- Testar systemet innan mötet
- Övervakar röstning under mötet

#### 2.2.4 Mötesordförande

- Styr projektor-vy och navigerar genom dagordningen
- Öppnar och stänger live-röstning per fråga
- Dekrypterar valurnan vid klubbslag
- Presenterar resultat på storskärm

#### 2.2.5 Mötessekreterare

- Arbetar i dynamiskt protokollverktyg
- Röstsiffror auto-genereras när röstning stängs
- Kompletterar protokoll med yrkanden och diskussion

#### 2.2.6 Medlem (Röstande)

- Loggar in säkert och verifieras mot medlemsregister
- Läser handlingar och kandidatpresentationer
- Avger och ändrar röster under förtidsröstning
- Deltar i live-röstning (fysiskt eller på distans)
- Kan verifiera att den egna rösten räknats (via kvittokod)

### 2.3 Innehållshantering

#### 2.3.1 Dokumentformat

- **Primärt format**: Markdown (.md) för responsiv visning på alla enheter
- **Sekundärt format**: PDF för formella dokument med signaturer
- **Kandidatpresentationer**: Textfält/Markdown + profilbild (JPEG/PNG/WebP)
- **Automatisk formatering**: Systemet beskär bilder och skapar enhetliga profilkort

#### 2.3.2 Agendabyggare

- **Visuellt gränssnitt**: Drag-and-drop för att ordna agendapunkter (Trello-liknande)
- **Förfyllda mallar**: Standarddagordning enligt stadgarna genereras automatiskt
- **Flexibilitet**: Möjlighet att lägga till, ta bort och omordna punkter

### 2.4 Definition av närvaro (enligt § 5.7)

Systemet måste stödja följande definitioner av närvaro:

- **Fysiskt närvarande**: Medlem i möteslokalen (registreras manuellt eller via QR-kod)
- **Digitalt närvarande**: Medlem inloggad och aktivt följer mötet
- **Röstberättigad**: Fullvärdig medlem (fysiskt eller digitalt närvarande)
- **Röstande**: Medlem som aktivt avger röst (ingår i röstlängden för den frågan)

**Systemkrav:**

- Systemet måste kunna skilja på "inloggad" och "digitalt närvarande"
- Mötesordförande måste kunna se antal fysiskt och digitalt närvarande
- Systemet måste kunna hantera rättigheter baserat på närvarostatus

### 2.5 Hantering av tekniskt haveri (enligt § 5.9)

Systemet måste stödja följande procedurer vid tekniskt haveri:

#### 2.5.1 Kortvarigt avbrott (< 30 minuter)

- Mötesordförande kan förlänga röstningstid
- Systemet loggar avbrottstid automatiskt
- Systemet föreslår förlängning baserat på avbrottstid

#### 2.5.2 Längre avbrott (> 30 minuter)

- Mötesordförande kan pausa mötet
- Systemet sparar alla lagda röster säkert
- Systemet kan återupptas exakt där det avbröts

#### 2.5.3 Systemet kan inte återställas

- Mötesordförande kan initiera reservrutin
- Systemet exporterar aktuell status för protokoll
- Dokumentation av alla beslut med tidsstämplar

**Systemkrav:**

- Automatisk detektion av systemfel
- Tydliga varningar till mötesordförande
- Möjlighet att pausa/återuppta röstning
- Robust loggning av alla händelser

## 3. Tekniska Krav

### 3.1 Infrastruktur och Hosting

#### 3.1.1 Portabilitet

Systemet ska vara extremt portabelt med inbyggd säkerhet (Security by Default):

- **Docker & Docker Compose**: Hela plattformen (Frontend, Backend, Databas, WAF) förpackas i containrar
- **Enkel start**: `docker-compose up -d` startar systemet på en vanlig laptop
- **Laptop-läge**: Databas med volymmontering eller SQLite för små installationer
- **Failover**: Vid krasch kan databasfil kopieras till annan laptop och systemet fortsätter utan dataförlust
- **Kubernetes**: Stateless design (utom databas) med färdiga Helm-charts för skalning

#### 3.1.2 Nätverksskydd och WAF (Web Application Firewall)

Systemet dimensioneras för relativt låg trafik (max 1000 requests/sekund):

- **Lokal WAF**: Lättviktig reverse proxy (Caddy, Traefik eller Nginx med ModSecurity/Coraza) inkluderas i Docker-stacken
- **Rate Limiting**: Stoppar brute-force-attacker
- **Filtrering**: Blockerar SQL-injections och XSS-försök
- **Cloudflare-integration**: Systemet kan pekas om till Cloudflare för DDoS-skydd
- **Authenticated Origin Pulls**: Lokal proxy accepterar endast trafik från Cloudflares IP-spann

### 3.2 Autentisering och Medlemsverifiering

#### 3.2.1 Medlemsregister-integration

- **Föreningshuset API**: OAuth2/REST-adapter för realtidsverifiering
- **Verifiering vid inloggning**:
  - För medlemmar med svenskt personnummer: Automatisk matchning via Freja eID+
  - För utländska medlemmar: Manuell verifiering av valkommittén
- **Kontroll**: Medlem har status "Member in good standing" (betald avgift)
- **Flexibel adapter**: Kan anpassas för andra medlemssystem

#### 3.2.2 Inloggningsmetoder

- **Freja eID+**: För medlemmar med svenskt personnummer (primär metod)
  - Automatisk verifiering mot medlemsregister via personnummer
  - Ingen kostnad för föreningen
  - Hög säkerhetsnivå motsvarande BankID
- **Manuellt godkännande**: För utländska medlemmar utan svenskt personnummer
  - Valkommittén verifierar medlemskap manuellt mot medlemsregistret
  - Medlem godkänns för röstning i systemet
  - Inloggning via Freja eID eller användarnamn/lösenord + 2FA

#### 3.2.3 Gränssnitt för valkommittén (Medlemsgodkännande)

- **Lista över väntande godkännanden**: Utländska medlemmar som begärt åtkomst
- **Medlemsinformation**: Namn, medlemsnummer, land
- **Verifiering**: Valkommittén kontrollerar mot medlemsregister
- **Godkännande/Avslag**: Enkel knapp för att godkänna eller avslå
- **Loggning**: Alla godkännanden loggas med tidsstämpel och ansvarig person

### 3.3 Säkerhet och Rättssäkerhet

#### 3.3.1 Kryptografisk separation (Kärnkrav)

- **Databasdesign**: VEM som röstat och VAD de röstat på lagras i separata tabeller
- **Blind Signatures**: Ingen koppling mellan identitet och röstinnehåll
- **Permanent radering**: Efter mötet raderas all koppling mellan person och röst

#### 3.3.2 Krypterad valurna

- **Realtidskryptering**: Resultat krypteras löpande under röstningen
- **Asymmetrisk nyckel**: Mötesordföranden dekrypterar urnan först vid klubbslag
- **Förhindrar manipulation**: Inga trender kan utläsas i förtid, även av administratörer

#### 3.3.3 End-to-End Verifiability (E2E-V)

- **Personlig kvittokod**: Varje medlem får en unik kod vid röstning
- **Verifierbarhet**: Medlem kan kontrollera att den egna rösten räknats korrekt
- **Anonymitet bevaras**: Verifiering avslöjar inte vad medlemmen röstade på för andra

#### 3.3.4 Skydd mot påtryckningar (Coercion Protection)

- **Obegränsade ändringar**: Medlem kan ändra förtidsröst obegränsat antal gånger
- **Sista rösten räknas**: Endast den senast lagda rösten registreras
- **Internationell standard**: Samma metod som används i Estlands nationella e-val

### 3.4 White-label och Konfiguration

#### 3.4.1 Föreningsanpassning

Systemet ska kunna användas av valfri förening utan kodändringar:

- **Föreningsnamn och logotyp**: Visas på inloggningsskärm, sidhuvud och protokoll
- **Färgtema**: Anpassningsbara primära och sekundära färger
- **Språkstöd**: Inbyggt stöd för svenska och engelska (i18n-ramverk för fler språk)
- **Anpassningsbar text**: Informationstext på startskärm med länkar till föreningens support

#### 3.4.2 Beständig konfiguration

- **Konfigurationsfil**: `config.yaml` eller `settings.json` med all föreningsspecifik data
- **Fördel**: Fil kan sparas och återanvändas nästa år utan att göra om inställningar
- **Versionskontroll**: Konfigurationsfil kan versionshanteras i Git

## 4. Säkerhetsanalys och Hotmodellering

### 4.1 Scenario 1: Inifrån-attack (Rogue Admin)

#### 4.1.1 Hotbeskrivning

Personer med administrativ makt (styrelse, IT-ansvariga) försöker manipulera valet för egen vinning, t.ex. för att få igenom ansvarsfrihet eller dölja ekonomiska oegentligheter.

#### 4.1.2 Risker

- **Databasmanipulation**: Ändring av lagda röster i databasen
- **Tjuvkikning**: Administratörer ser röstningstrender i förväg och anpassar debatt eller ställer in mötet

#### 4.1.3 Skyddsmekanismer

- **Zero-Knowledge kryptering**: Valurnan krypteras med nyckel som aktiveras först vid klubbslag
- **Transparens och revisionsspår**: Alla administrativa ändringar loggas oföränderligt
- **Extern revision**: Revisor kan i efterhand se exakt vem som gjort vad och när

### 4.2 Scenario 2: Koordinerad minoritet (Digital Flash Mob)

#### 4.2.1 Hotbeskrivning

En liten grupp medlemmar försöker kuppa in en specifik kandidat genom koordinerad röstning.

#### 4.2.2 Risker

- **Röstfiske**: Medlemmar övertalas att lämna ifrån sig inloggningsuppgifter
- **Sista-minuten-attack**: Gruppen massröstar i slutet innan övriga hinner reagera

#### 4.2.3 Skyddsmekanismer

- **Stark autentisering**: Freja eID+ med personnummerverifiering gör det omöjligt att dela inloggning
- **Manuellt godkännande**: Utländska medlemmar verifieras av valkommittén
- **Utspädningseffekt**: Digitalt system höjer valdeltagandet drastiskt, vilket gör kupper svårare

### 4.3 Scenario 3: Tredjepartsrisk (Komprometterad leverantör)

#### 4.3.1 Hotbeskrivning

Om systemet driftas av extern leverantör: dataintrång eller oärlig anställd manipulerar utfallet.

#### 4.3.2 Risker

- **Läckage**: Leverantören läcker information om vem som röstat på vad
- **Manipulation**: Utländska aktörer eller hackare ändrar valresultat via leverantören

#### 4.3.3 Skyddsmekanismer

- **Open Source**: Koden kan granskas av oberoende säkerhetsexperter
- **Självhosting**: Föreningen kan drifta systemet själv (laptop eller egen VPS)
- **E2E-V**: Matematisk verifierbarhet gör manipulation upptäckbar
- **Dataseparation**: Blind Signatures förhindrar koppling mellan identitet och röst

### 4.4 Scenario 4: Tekniskt haveri eller DDoS-attack

#### 4.4.1 Hotbeskrivning

Systemet går ner på grund av hög belastning eller illvillig överbelastningsattack.

#### 4.4.2 Risker

- **Medlemmar kan inte rösta**: Omröstning måste avbrytas
- **Beslut ogiltigförklaras**: Årsmötet kan inte genomföras

#### 4.4.3 Skyddsmekanismer

- **Robust infrastruktur**: Skalbar hosting med DDoS-skydd (Cloudflare)
- **Fallback i stadgar**: Mötesordförande har mandat att pausa mötet vid tekniskt haveri
- **Förlängd röstningstid**: Möjlighet att förlänga röstning om systemet varit nere
- **Reservrutin**: I sista hand kan fysiskt närvarande rösta manuellt

### 4.5 Scenario 5: Otillbörlig påverkan (Coercion)

#### 4.5.1 Hotbeskrivning

En medlem blir utsatt för påtryckningar av partner, släkting eller vän som tvingar personen att rösta på ett specifikt sätt.

#### 4.5.2 Risker

- **Brott mot valhemlighet**: Den fria viljan kränks

#### 4.5.3 Skyddsmekanismer

- **Obegränsade ändringar**: Medlem kan rösta som "påtryckaren" kräver, sedan logga in senare och ändra
- **Sista rösten räknas**: Endast den senast lagda rösten registreras
- **Internationell standard**: Samma metod som Estlands nationella e-val

## 5. Arbetsflöde och Användning

### 5.1 Fas 1: Plattformsuppsättning (Görs en gång)

1. Systemet driftas (via Docker eller molntjänst)
2. Superadmin loggar in och konfigurerar föreningsspecifika inställningar
3. Föreningens namn, logotyp, färger och språk ställs in
4. Integration mot medlemsregister (Föreningshuset API) aktiveras
5. Autentiseringsmetod konfigureras (BankID eller 2FA)

### 5.2 Fas 2: Förberedelser inför årsmötet (Senast 4 veckor innan)

1. Mötessamordnaren skapar "Årsmöte 202X" i systemet
2. Dagordning byggs med drag-and-drop (eller standardmall används)
3. Handlingar och bilagor laddas upp (Markdown eller PDF)
4. Dokument kopplas till specifika agendapunkter
5. Valkommittén lägger in nominerade kandidater med presentationer
6. Valmetod väljs för varje personval (STV, Majoritet, etc.)
7. Propositioner (t.ex. ansvarsfrihet) sätts upp med lämplig valmetod

### 5.3 Fas 3: Förtidsröstning öppnar (Samtidigt som andra kallelsen)

1. Systemet aktiveras för medlemmar
2. Medlemmar loggar in och möts av föreningens profil
3. Medlemmar läser handlingar och kandidatpresentationer
4. Medlemmar avger förtidsröster
5. Medlemmar kan ändra sina röster obegränsat antal gånger

### 5.4 Fas 4: Genomförande av årsmötet (Live)

1. Ordföranden öppnar mötet och styr via projektor-vy
2. Dagordningen visas på storskärm
3. För varje beslutspunkt: ordföranden öppnar live-röstning
4. Medlemmar röstar i sina enheter (mobil/dator)
5. Både fysiskt närvarande och distansdeltagare röstar digitalt
6. När diskussion är klar: ordföranden stänger röstningen med klubbslag
7. Systemet dekrypterar valurnan och räknar röster
8. Resultat visas direkt på storskärm och i protokollverktyget

### 5.5 Fas 5: Efterarbete

1. Sekreteraren kompletterar det autogenererade protokollet med yrkanden och diskussion
2. Protokoll exporteras som PDF med föreningens logotyp
3. Mötet arkiveras i systemet
4. Koppling mellan person och röst raderas permanent

## 6. Kostnadsuppskattning

### 6.1 Mjukvarukostnad

- **Open Source**: 0 kr (systemet är gratis att använda)

### 6.2 Autentisering

#### 6.2.1 Freja eID+ (Primär metod)

- **Kostnad**: 0 kr (gratis för föreningen)
- **Användning**: Automatisk verifiering mot personnummer i medlemsregister
- **Säkerhetsnivå**: Hög (motsvarande BankID)

#### 6.2.2 Manuellt godkännande (Utländska medlemmar)

- **Kostnad**: 0 kr (manuellt arbete av valkommittén)
- **Process**: Valkommittén verifierar medlemskap och godkänner för röstning
- **Inloggning**: Freja eID eller användarnamn/lösenord + 2FA

### 6.3 Medlemsregister

- **Föreningshuset API**: 0 - 300 kr/månad (beroende på avtalsnivå)

### 6.4 Infrastruktur

#### 6.4.1 Hosting

- **Laptop-hosting**: 0 kr (drivs lokalt på årsmötet)
- **VPS (Hetzner, DigitalOcean, GleSYS)**: 100 - 300 kr/månad

#### 6.4.2 WAF och DDoS-skydd

- **Cloudflare Free**: 0 kr (räcker för de flesta föreningar)
- **Cloudflare Pro**: ~250 kr/månad (avancerad WAF)

#### 6.4.3 Domän och SSL

- **Domännamn**: ~150 kr/år
- **SSL-certifikat**: 0 kr (Let's Encrypt via Docker eller Cloudflare)

### 6.5 Sammanfattning kostnader

#### 6.5.1 Med Freja eID+ och dedikerad VPS

- **Löpande kostnad**: 100 - 600 kr/månad
- **Årskostnad**: 1 200 - 7 200 kr

#### 6.5.2 Med Freja eID+ och billig hosting

- **Löpande kostnad**: Under 200 kr/månad
- **Årskostnad**: Under 2 400 kr

#### 6.5.3 Minimalkonfiguration (laptop-hosting)

- **Löpande kostnad**: 0 - 300 kr/månad (endast medlemsregister-API om behövs)
- **Årskostnad**: 0 - 3 600 kr

## 7. Identifierade Brister och Förbättringsområden

### 7.1 Saknade specifikationer

#### 7.1.1 Databasdesign

- **Brist**: Ingen detaljerad beskrivning av databasschema
- **Behov**: Specificera tabeller, relationer och indexering
- **Prioritet**: Hög (kritiskt för implementation)

#### 7.1.2 API-specifikation

- **Brist**: Ingen beskrivning av REST API-endpoints
- **Behov**: Dokumentera alla endpoints med request/response-format
- **Prioritet**: Hög (kritiskt för frontend-backend-integration)

#### 7.1.3 Kryptografisk implementation

- **Brist**: Ingen detaljerad beskrivning av krypteringsalgoritmer
- **Behov**: Specificera vilka algoritmer (AES-256, RSA-4096, etc.) och nyckelhantering
- **Prioritet**: Hög (kritiskt för säkerhet)

#### 7.1.4 Backup och disaster recovery

- **Brist**: Ingen plan för säkerhetskopiering och återställning
- **Behov**: Specificera backup-strategi, frekvens och testrutiner
- **Prioritet**: Medel (viktigt för driftsäkerhet)

### 7.2 Oklarheter som behöver förtydligas

#### 7.2.1 Internationella medlemmar

- **Fråga**: Hur hanteras medlemmar utan svenskt personnummer?
- **Lösning**: Manuellt godkännande av valkommittén
  - Valkommittén verifierar medlemskap mot medlemsregistret
  - Medlem godkänns för röstning i systemet
  - Inloggning via Freja eID (om tillgängligt) eller användarnamn/lösenord + 2FA

#### 7.2.2 Tekniskt haveri under pågående röstning

- **Fråga**: Exakt procedur om systemet går ner mitt under en röstning?
- **Förslag**: Detaljerad fallback-procedur i stadgar och systemdokumentation

#### 7.2.3 Revision och granskning

- **Fråga**: Hur får revisorer tillgång till loggar utan att bryta anonymitet?
- **Förslag**: Specificera revisionsgränssnitt med begränsade behörigheter

#### 7.2.4 Testning och certifiering

- **Fråga**: Hur ska systemet testas innan första skarpa användning?
- **Förslag**: Krav på penetrationstestning och säkerhetsgranskning

### 7.3 Användarupplevelse (UX)

#### 7.3.1 Tillgänglighet (WCAG)

- **Brist**: Ingen specifikation av tillgänglighetskrav
- **Behov**: Krav på WCAG 2.1 AA-nivå för skärmläsare, tangentbordsnavigering, etc.
- **Prioritet**: Medel (viktigt för inkludering)

#### 7.3.2 Mobiloptimering

- **Brist**: Begränsad beskrivning av mobilt gränssnitt
- **Behov**: Specificera touch-gränssnitt, responsiv design och offline-funktionalitet
- **Prioritet**: Hög (majoriteten röstar troligen via mobil)

#### 7.3.3 Felhantering och användarfeedback

- **Brist**: Ingen beskrivning av felmeddelanden och användarstöd
- **Behov**: Specificera hur fel kommuniceras och hur användare får hjälp
- **Prioritet**: Medel (viktigt för användarupplevelse)

### 7.4 Juridiska och organisatoriska aspekter

#### 7.4.1 GDPR-compliance

- **Brist**: Begränsad beskrivning av personuppgiftshantering
- **Behov**: Fullständig GDPR-analys och dataskyddskonsekvensanalys (DPIA)
- **Prioritet**: Hög (juridiskt krav)

#### 7.4.2 Stadgeändringar

- **Status**: Förslag finns i motionen (Bilaga 1)
- **Behov**: Säkerställ att alla nödvändiga stadgeändringar är inkluderade
- **Prioritet**: Hög (måste vara klart innan implementation)

#### 7.4.3 Ansvarsfördelning

- **Brist**: Oklart vem som är juridiskt ansvarig vid tekniskt fel
- **Behov**: Tydlig ansvarsfördelning mellan styrelse, IT-ansvarig och eventuell leverantör
- **Prioritet**: Medel (viktigt för riskhantering)

## 8. Rekommendationer för nästa steg

### 8.1 Fas 1: Kravspecifikation (Detaljerad)

1. Komplettera detta dokument med saknade tekniska specifikationer
2. Genomför GDPR-analys och DPIA
3. Specificera API-endpoints och databasschema
4. Dokumentera kryptografiska algoritmer och nyckelhantering

### 8.2 Fas 2: Prototyp och Proof of Concept

1. Bygg minimal prototyp med kärnfunktionalitet
2. Testa autentisering mot Föreningshuset API
3. Implementera och testa krypterad valurna
4. Genomför intern säkerhetsgranskning

### 8.3 Fas 3: Pilottest

1. Genomför pilottest med begränsad användargrupp
2. Testa alla användarroller och arbetsflöden
3. Samla feedback på användarupplevelse
4. Identifiera och åtgärda buggar

### 8.4 Fas 4: Säkerhetsgranskning

1. Anlita extern säkerhetsexpert för penetrationstestning
2. Genomför kodgranskning (code review)
3. Testa disaster recovery-procedurer
4. Dokumentera alla säkerhetsåtgärder

### 8.5 Fas 5: Produktion

1. Genomför skarpt test vid mindre möte (lokalförening?)
2. Utvärdera och justera baserat på erfarenheter
3. Rulla ut för årsmöte
4. Kontinuerlig övervakning och förbättring

## 9. Framtida Utvecklingsmöjligheter

### 9.1 Utökad funktionalitet

- **Flervalsfrågor**: Stöd för frågor med fler än två alternativ
- **Delegerad röstning**: Möjlighet att delegera sin röst till annan medlem
- **Live-streaming integration**: Inbyggd video-streaming i systemet
- **Chattfunktion**: Möjlighet för distansdeltagare att ställa frågor

### 9.2 Integration med andra system

- **Ekonomisystem**: Automatisk verifiering av betalda medlemsavgifter
- **E-postsystem**: Automatiska påminnelser om förtidsröstning
- **Kalender**: Integration med föreningens kalender för mötesbokningar

### 9.3 Internationalisering

- **Fler språk**: Stöd för finska, norska, danska, etc.
- **Olika medlemssystem**: Adapter för andra medlemsregister än Föreningshuset
- **Olika e-legitimationer**: Stöd för fler länders digitala ID-system

## 10. Sammanfattning

Detta dokument beskriver ett komplett digitalt röstningssystem för Mensa Sverige som uppfyller kraven i den antagna motionen. Systemet är designat för att vara:

- **Säkert**: Kryptografisk separation, E2E-verifierbarhet och skydd mot manipulation
- **Transparent**: Open Source-kod som kan granskas av vem som helst
- **Användarvänligt**: Intuitivt gränssnitt för alla roller, fungerar på alla enheter
- **Flexibelt**: Stödjer olika valmetoder och kan anpassas för olika föreningar
- **Kostnadseffektivt**: Kan driftas för under 200 kr/månad eller helt gratis på laptop

Dokumentet identifierar också viktiga områden som behöver kompletteras innan implementation kan påbörjas, särskilt gällande tekniska specifikationer, GDPR-analys och säkerhetsgranskning.
