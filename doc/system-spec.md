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

#### 3.2.1 Medlemsregister-integration (Flexibla alternativ)

Systemet stödjer flera metoder för att hantera medlemsdata, anpassat efter föreningens behov:

**Alternativ 1: Statisk filuppladdning**

- **CSV-import**: Ladda upp medlemslista (Namn, Medlemsnummer, E-post, Personnummer/ID, Status)
- **Excel-import**: Stöd för .xlsx-filer (via bibliotek som SheetJS/ExcelJS)
- **Användning**: Enkel lösning för små föreningar eller engångsmöten
- **Uppdatering**: Manuell uppladdning vid ändringar
- **Validering**: Systemet kontrollerar format och dubbletter vid import

**Alternativ 2: API-integration (Realtidssynk)**

- **Föreningshuset API**: OAuth2/REST-adapter för svenska föreningar
- **Generiskt REST API**: Konfigurerbar adapter för andra medlemssystem
- **Synkronisering**: Automatisk eller schemalagd (t.ex. varje natt)
- **Verifiering**: Realtidskontroll av medlemsstatus vid inloggning

**Alternativ 3: Directory Services (AD/SSO)**

- **Microsoft Entra ID (Azure AD)**: OAuth2/SAML-integration
- **Google Workspace**: OAuth2-integration
- **Generisk LDAP**: Stöd för on-premise Active Directory
- **Användning**: Perfekt för företag eller organisationer med befintlig identitetshantering
- **Gruppbaserad åtkomst**: Medlemskap kan styras via AD-grupper

**Alternativ 4: Hybrid-lösning**

- Kombination av ovanstående (t.ex. API för svenska medlemmar + CSV för internationella)
- Flexibel konfiguration per förening

**Gemensamma krav:**

- **Dataskydd**: All medlemsdata krypteras i vila och transit
- **GDPR-compliance**: Minimal datainsamling, tydligt syfte
- **Validering**: Kontroll av medlemsstatus (betald avgift, aktiv medlem)
- **Loggning**: Alla synkroniseringar och importer loggas

#### 3.2.2 Autentiseringsmetoder

Systemet stödjer flera autentiseringsmetoder för maximal flexibilitet:

**Metod 1: Freja eID+ (Rekommenderad för svenska medlemmar)**

- **Krav från medlemsregister**: Svenskt personnummer (12 siffror)
- **Process**:
  1. Medlem loggar in med Freja eID+
  2. Systemet hämtar personnummer från Freja
  3. Personnummer matchas mot medlemsregister
  4. Åtkomst beviljas om medlem är aktiv
- **Kostnad**: Gratis för föreningen
- **Säkerhetsnivå**: Hög (motsvarande BankID)
- **Fördel**: Automatisk verifiering, ingen manuell hantering

**Metod 2: SSO via Active Directory/Entra ID/Google**

- **Krav från medlemsregister**: E-postadress eller användarnamn
- **Process**:
  1. Medlem loggar in via SSO-provider
  2. Systemet hämtar e-post/användarnamn från SSO
  3. Matchning mot medlemsregister
  4. Åtkomst beviljas om medlem finns och är aktiv
- **MFA**: Hanteras av SSO-provider (rekommenderat)
- **Användning**: Perfekt för organisationer med befintlig identitetshantering

**Metod 3: Användarnamn/Lösenord (Lokal autentisering)**

- **Krav från medlemsregister**: E-postadress eller medlemsnummer
- **Process**:
  1. Medlem skapar konto eller får autogenererat lösenord
  2. Inloggning med användarnamn + lösenord
  3. MFA via TOTP (Google Authenticator, Authy) eller SMS (valfritt)
- **Användning**: Fallback för medlemmar utan e-legitimation
- **Säkerhet**: Krav på starkt lösenord + MFA rekommenderas

**Metod 4: Magic Link (Passwordless)**

- **Krav från medlemsregister**: E-postadress
- **Process**:
  1. Medlem anger e-postadress
  2. Systemet skickar engångslänk med tidsbegränsad token
  3. Medlem klickar på länk och loggas in automatiskt
- **Säkerhet**: Token giltig i 15 minuter, engångsanvändning
- **Användning**: Enkel lösning för enstaka möten eller äldre medlemmar

**Metod 5: QR-kod (On-site autentisering)**

- **Krav från medlemsregister**: Medlemsnummer eller personnummer
- **Process**:
  1. Valkommittén verifierar medlem fysiskt (ID-kort)
  2. Valkommittén genererar personlig QR-kod
  3. Medlem skannar QR-kod med sin enhet
  4. Automatisk inloggning och åtkomst till röstning
- **Säkerhet**: QR-kod innehåller krypterad token, giltig i 24 timmar
- **Användning**: Perfekt för fysiska möten och manuell verifiering

#### 3.2.3 Hantering av specialfall och manuella godkännanden

**Scenario 1: Internationella medlemmar utan svenskt personnummer**

- Valkommittén verifierar medlemskap manuellt mot medlemsregister
- Godkännande via admin-gränssnitt
- Medlem får Magic Link eller QR-kod för inloggning
- Markeras i röstlängd som "Manuellt verifierad"

**Scenario 2: Sent betalda medlemmar**

- Medlem syns inte i medlemsregister vid inloggningsförsök
- Medlem kontaktar valkommittén på plats
- Valkommittén verifierar betalning manuellt
- Medlem läggs till manuellt i systemet
- Markeras i röstlängd som "Manuellt tillagd - Betalning verifierad [Datum]"

**Scenario 3: Nya medlemmar (anmält sig precis innan mötet)**

- Samma process som sent betalda medlemmar
- Valkommittén verifierar medlemsansökan och betalning
- Markeras i röstlängd som "Manuellt tillagd - Ny medlem [Datum]"

**Scenario 4: Tekniska problem (glömt lösenord, tappat telefon, etc.)**

- Medlem identifierar sig fysiskt hos valkommittén
- Valkommittén genererar ny Magic Link eller QR-kod
- Markeras i röstlängd som "Återautentiserad manuellt [Datum]"

**Scenario 5: Gästobservatörer (ej röstberättigade)**

- Kan ges läsbehörighet utan rösträtt
- Markeras tydligt som "Observatör - Ej röstberättigad"
- Kan inte avge röster men kan följa mötet

#### 3.2.4 Gränssnitt för valkommittén (Medlemshantering)

**Väntande godkännanden:**

- Lista över medlemmar som begärt åtkomst men inte kunnat verifieras automatiskt
- Visar: Namn, Medlemsnummer (om angivet), E-post, Land, Begäran-datum
- Knappar: Godkänn, Avslå, Visa detaljer

**Manuell tillägg:**

- Formulär för att lägga till medlem manuellt
- Fält: Namn, Medlemsnummer, E-post, Personnummer (valfritt), Kommentar
- Välj autentiseringsmetod: Magic Link, QR-kod, Tillfälligt lösenord
- Markering: "Manuellt tillagd" med anledning (dropdown: Sent betald, Ny medlem, Tekniskt problem, Internationell medlem)

**Generera åtkomstkoder:**

- Knapp: "Generera Magic Link" (skickas via e-post)
- Knapp: "Generera QR-kod" (visas på skärm för utskrift eller scanning)
- Knapp: "Generera tillfälligt lösenord" (visas för manuell överföring)

**Röstlängd och revision:**

- Alla manuella tillägg loggas med:
  - Vem som godkände (valkommitténs användarnamn)
  - Tidsstämpel
  - Anledning
  - Autentiseringsmetod
- Exporterbar för revision och protokoll
- Tydlig markering i röstlängd: "Manuellt verifierad av [Namn] [Datum] - [Anledning]"

#### 3.2.5 Rättssäkerhet och revision

**Spårbarhet:**

- Alla autentiseringar loggas (metod, tidpunkt, IP-adress)
- Manuella godkännanden loggas med ansvarig person
- Röstlängd visar tydligt vilka som verifierats automatiskt vs manuellt

**Röstlängd-export:**

- Innehåller: Namn, Medlemsnummer, Autentiseringsmetod, Verifieringstyp (Automatisk/Manuell), Tidsstämpel, Ansvarig (om manuell)
- Kan exporteras som PDF för protokoll
- Anonymiseras efter mötet (enligt GDPR och stadgar)

**Revisionsspår:**

- Separata loggar för autentisering och röstning (ingen koppling)
- Revisor kan se att rätt personer fått åtkomst utan att se vad de röstat
- Matematisk verifierbarhet (E2E-V) för att upptäcka manipulation

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

### 6.2 Medlemsregister

#### 6.2.1 Statisk filuppladdning (CSV/Excel)

- **Kostnad**: 0 kr
- **Användning**: Manuell uppladdning av medlemslista
- **Lämplig för**: Små föreningar, engångsmöten

#### 6.2.2 API-integration

- **Föreningshuset API**: 0 - 300 kr/månad (beroende på avtalsnivå)
- **Generiskt REST API**: Varierar beroende på leverantör
- **Användning**: Automatisk synkronisering
- **Lämplig för**: Medelstora till stora föreningar

#### 6.2.3 Directory Services (AD/SSO)

- **Microsoft Entra ID**: Ingår ofta i befintlig Microsoft 365-licens (0 kr extra)
- **Google Workspace**: Ingår ofta i befintlig licens (0 kr extra)
- **Generisk LDAP**: 0 kr (använder befintlig infrastruktur)
- **Användning**: Integration med befintlig identitetshantering
- **Lämplig för**: Organisationer med befintlig IT-infrastruktur

### 6.3 Autentisering

#### 6.3.1 Freja eID+ (Primär metod)

- **Kostnad**: 0 kr (gratis för föreningen)
- **Användning**: Automatisk verifiering mot personnummer i medlemsregister
- **Säkerhetsnivå**: Hög (motsvarande BankID)

#### 6.3.2 SSO (Active Directory/Entra ID/Google)

- **Kostnad**: 0 kr (använder befintlig infrastruktur)
- **Användning**: Integration med organisationens identitetshantering
- **MFA**: Hanteras av SSO-provider

#### 6.3.3 Användarnamn/Lösenord + MFA

- **TOTP (Google Authenticator, Authy)**: 0 kr
- **SMS-MFA**: 0.50 - 1.00 kr per SMS (valfritt)
- **Användning**: Fallback för medlemmar utan e-legitimation

#### 6.3.4 Magic Link

- **Kostnad**: 0 kr (ingår i e-postkostnad)
- **Användning**: Passwordless-inloggning via e-post

#### 6.3.5 QR-kod

- **Kostnad**: 0 kr
- **Användning**: On-site autentisering med manuell verifiering

#### 6.3.6 Manuella godkännanden

- **Kostnad**: 0 kr (manuellt arbete av valkommittén)
- **Process**: Valkommittén verifierar medlemskap och godkänner för röstning

### 6.4 E-posttjänst

#### 6.4.1 Transaktionell e-post (Magic Links, notifikationer)

- **SendGrid**: 0 kr för 100 e-post/dag, sedan från 15 USD/månad (~150 kr)
- **Mailgun**: 0 kr för 5000 e-post/månad, sedan från 35 USD/månad (~350 kr)
- **Amazon SES**: ~0.10 USD per 1000 e-post (~1 kr per 1000)
- **Egen SMTP**: 0 kr (om föreningen har egen e-postserver)

**Uppskattning för årsmöte:**

- 500 medlemmar × 5 e-post (kallelser, påminnelser, kvitton) = 2500 e-post
- Kostnad: 0 kr (inom gratisnivå för de flesta tjänster)

### 6.5 Infrastruktur

#### 6.5.1 Hosting

- **Laptop-hosting**: 0 kr (drivs lokalt på årsmötet)
- **VPS (Hetzner, DigitalOcean, GleSYS)**: 100 - 300 kr/månad
- **Molntjänst (AWS, Azure, GCP)**: 200 - 500 kr/månad (beroende på användning)

#### 6.5.2 WAF och DDoS-skydd

- **Cloudflare Free**: 0 kr (räcker för de flesta föreningar)
- **Cloudflare Pro**: ~250 kr/månad (avancerad WAF)

#### 6.5.3 Domän och SSL

- **Domännamn**: ~150 kr/år
- **SSL-certifikat**: 0 kr (Let's Encrypt via Docker eller Cloudflare)

### 6.6 Sammanfattning kostnader per föreningstyp

#### 6.6.1 Liten förening (< 100 medlemmar)

**Konfiguration:**

- Medlemsregister: CSV-uppladdning
- Autentisering: Magic Link + QR-kod
- Hosting: Laptop (lokalt)
- E-post: Gratisnivå

**Löpande kostnad**: 0 kr/månad
**Årskostnad**: 0 kr

#### 6.6.2 Medelstor förening (100-500 medlemmar)

**Konfiguration:**

- Medlemsregister: Föreningshuset API eller CSV
- Autentisering: Freja eID+ + Magic Link
- Hosting: Billig VPS
- E-post: Gratisnivå

**Löpande kostnad**: 100 - 300 kr/månad
**Årskostnad**: 1 200 - 3 600 kr

**Besparing jämfört med poströstning:**

- Poströstning: ~10 000 - 20 000 kr/år (porto, kuvert, utskrift)
- Digital röstning: 1 200 - 3 600 kr/år
- **Nettobesparing: 6 400 - 18 800 kr/år**

#### 6.6.3 Stor förening (> 500 medlemmar)

**Konfiguration:**

- Medlemsregister: API-integration
- Autentisering: Freja eID+ + SSO + Magic Link
- Hosting: VPS eller molntjänst
- E-post: Betald nivå (om > 5000 e-post/månad)
- WAF: Cloudflare Pro

**Löpande kostnad**: 300 - 900 kr/månad
**Årskostnad**: 3 600 - 10 800 kr

**Besparing jämfört med poströstning:**

- Poströstning: ~30 000 - 50 000 kr/år (för stor förening)
- Digital röstning: 3 600 - 10 800 kr/år
- **Nettobesparing: 19 200 - 46 400 kr/år**

#### 6.6.4 Organisation med befintlig IT

**Konfiguration:**

- Medlemsregister: Entra ID/Google/LDAP
- Autentisering: SSO + Magic Link
- Hosting: Befintlig infrastruktur eller VPS
- E-post: Befintlig e-posttjänst

**Löpande kostnad**: 0 - 300 kr/månad (endast hosting om extern VPS)
**Årskostnad**: 0 - 3 600 kr

**Fördel:** Använder befintlig infrastruktur, minimal extra kostnad

### 6.7 Engångskostnader (valfritt)

#### 6.7.1 Utveckling och anpassning

- **Open Source**: 0 kr (använd som den är)
- **Anpassning**: Varierar beroende på behov
- **Konsulthjälp för uppsättning**: 5 000 - 20 000 kr (engångskostnad)

#### 6.7.2 Säkerhetsgranskning

- **Penetrationstestning**: 10 000 - 50 000 kr (rekommenderas före första användning)
- **Kodgranskning**: 5 000 - 20 000 kr
- **Certifiering**: Varierar beroende på krav

### 6.8 Total kostnad för första året (exempel)

**Medelstor förening (Mensa Sverige):**

- Hosting (VPS): 2 400 kr/år
- Föreningshuset API: 1 200 kr/år
- Domän: 150 kr/år
- E-post: 0 kr (gratisnivå)
- Säkerhetsgranskning (engångskostnad): 15 000 kr
- **Total första året: ~19 000 kr**
- **Därefter: ~3 750 kr/år**

**Jämfört med poströstning:**

- Poströstning: ~15 000 kr/år (löpande)
- Digital röstning: ~19 000 kr första året, sedan ~3 750 kr/år
- **Break-even: Efter första året**
- **Besparing år 2-5: ~56 000 kr**

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

**OBS**: Detaljerade UI/UX-krav finns i separat dokument: `doc/UI-UX-KRAV.md`

Detta dokument täcker:

- Plattformsstrategi (PWA vs Native apps)
- Responsiv design och mobile-first approach
- Moderna UI-komponenter för alla roller
- Tillgänglighet (WCAG 2.1 AA)
- Offline-funktionalitet och synkronisering
- Push-notifikationer
- Dark mode
- Animationer och mikrointeraktioner
- Felhantering och användarfeedback
- Performance-optimering
- Internationalisering (i18n)

**Sammanfattning av kritiska krav:**

- Mobile-first design (majoriteten röstar via mobil)
- WCAG 2.1 AA-compliance (obligatoriskt)
- Offline-läsning av handlingar
- Tydlig visuell feedback på alla åtgärder
- Säkerhetsvisualisering (krypteringsstatus)

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
