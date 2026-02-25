# Kravspecifikation och Systemarkitektur: Open Source E-röstning

## 1. Målbild och Open Source-filosofi
Systemet ska utvecklas som en **Open Source-lösning** (förslagsvis under 
AGPLv3 eller MIT-licens). Syftet är att skapa en robust, transparent och 
gratis plattform som inte bara Mensa Sverige, utan alla svenska och nordiska 
föreningar kan använda för säkra digitala årsmöten. 

Genom att öppenkällkoda systemet maximeras transparensen, vilket är ett 
kärnkrav för att bygga förtroende för e-röstningssystem hos medlemmarna.

## 2. Infrastruktur och Enkel Hosting
Systemet ska vara designat för att vara extremt portabelt och lättdrivet, 
med inbyggd säkerhet (Security by Default). Beroende på föreningens mognad 
ska det kunna driftas på allt från en lokal laptop till ett molnkluster.

* **Docker & Docker Compose:** Hela plattformen (Frontend, Backend, Databas, 
  WAF) förpackas i containrar. Med ett enkelt `docker-compose up -d` ska 
  systemet kunna snurras igång på en vanlig laptop.
* **Portabilitet (Laptop-läge):** Databasen ska använda en volymmontering 
  (eller konfigureras med SQLite för de allra minsta installationerna). Om 
  laptopen kraschar under ett årsmöte ska funktionären enkelt kunna kopiera 
  databasfilen/volymen till en annan laptop, köra `docker-compose up` och 
  fortsätta mötet utan dataförlust.
* **Kubernetes (K8s):** För föreningar som vill skala upp ska systemet vara 
  stateless (undantaget databasen) och komma med färdiga Helm-charts för 
  enkel driftsättning i Kubernetes.



## 3. Nätverksskydd och WAF (Web Application Firewall)
Systemet dimensioneras för relativt låg trafik (sällan över 1000 requests 
per sekund).
* **Lokal WAF:** I Docker-stacken inkluderas en lättviktig reverse proxy 
  (t.ex. Caddy, Traefik eller Nginx med ModSecurity/Coraza) som agerar lokal 
  WAF. Denna hanterar Rate Limiting (för att stoppa brute-force) och 
  filtrerar bort uppenbara SQL-injections och XSS-försök.
* **Extern WAF / Cloudflare:** Systemet ska enkelt kunna pekas om till att 
  ligga bakom Cloudflare. Den lokala proxyn konfigureras då att endast 
  acceptera trafik från Cloudflares IP-spann (Authenticated Origin Pulls) för 
  att förhindra att angripare går runt Cloudflare vid en DDoS-attack.

## 4. Medlemsregister och Autentisering
* **Föreningshuset API:** Föreningshuset erbjuder API:er för integration. 
  Röstningssystemet byggs med en anpassningsbar OAuth2/REST-adapter. När en 
  användare loggar in, gör systemet ett realtidsanrop mot Föreningshusets API 
  för att verifiera att personen existerar och har statusen 
  "Member in good standing" (betald avgift).
* **Inloggningsmetoder:** Systemet stödjer inloggning via användarnamn/lösenord 
  (med tvingande TOTP/Google Authenticator 2FA) alternativt via externt BankID.

## 5. Rättssäkerhet och Anonymitet (Kärnkrav)
* **Kryptografisk separation:** Databasen isolerar VEM som röstat från VAD de 
  röstat på. 
* **Obegränsade röständringar:** För att motverka påtryckningar i hemmet 
  ("coercion") kan en medlem ändra sin förtidsröst obegränsat i appen fram 
  till ordförandens klubbslag. Endast sista rösten räknas.
* **Krypterad valurna:** Resultaten avkoplar i realtid och krypteras. Urnan 
  låses upp av mötesordföranden (via en asymmetrisk nyckel) först när 
  röstningen stängs, så inga trender kan utläsas i förtid.

---

## 6. Uppskattad Prisbild för Externa Tjänster

Eftersom systemet i sig är Open Source och gratis, består kostnaderna av 
infrastruktur och tredjepartstjänster. Här är en uppskattning anpassad för en 
förening av Mensa Sveriges storlek.

### A. BankID (Autentisering)
BankID är inte gratis och kräver avtal via en integratör (broker), exempelvis 
Criipto, Signicat eller GrandID.
* **Startavgift:** Oftast 0 kr, men vissa tar ut ca 2 000 - 5 000 kr.
* **Månadsavgift:** ca 500 kr – 1 500 kr per månad.
* **Transaktionskostnad:** ca 0,20 kr – 0,50 kr per lyckad inloggning.
* **Alternativ (Gratis):** Freja eID har ibland gratisnivåer för vissa tjänster. 
  Det absolut billigaste alternativet är att använda Föreningshusets befintliga 
  inloggning kombinerat med standard 2FA (t.ex. Google/Microsoft Authenticator), 
  vilket är helt gratis.

### B. Medlemsregister (Föreningshuset API)
* Beroende på föreningens nuvarande avtal med Föreningshuset kan API-åtkomst 
  ingå, eller så krävs en tilläggsmodul.
* **Uppskattad kostnad:** 0 kr till ca 300 kr/månad beroende på avtalsnivå.

### C. Infrastruktur & WAF (Cloudflare)
* **Hosting:** En stabil VPS (Virtual Private Server) hos tex Hetzner, 
  DigitalOcean eller GleSYS (om svensk datahall krävs). Kostnad ca **100 – 300 
  kr/månad**.
* **Cloudflare:** Gratisnivån (Free Tier) räcker extremt långt och inkluderar 
  DDoS-skydd och SSL. Cloudflare Pro kostar ca **250 kr ($20) i månaden** och 
  ger tillgång till en mer avancerad WAF.
* **Laptop-hosting (0 kr):** Systemet drivs lokalt på årsmötet, uppkopplat 
  mot internet via lokal nätverksuppkoppling. Kostar inget extra, men moln-VPS 
  rekommenderas för högre tillgänglighet inför förtidsröstningen.

### D. Domän och SSL
* **Domännamn:** ca 150 kr/år.
* **SSL-certifikat:** 0 kr (löses automatiskt via Let's Encrypt inbyggt i 
  Docker-stacken eller via Cloudflare).

**Sammanfattning Kostnad (Löpnade):**
Med BankID via extern leverantör och en dedikerad VPS hamnar driftkostnaden 
på **ca 1 000 - 2 000 kr i månaden**.
Väljer föreningen att använda gratis 2FA istället för BankID, och driftar det 
på en billigare molnserver bakom Cloudflares gratisnivå, kan driften ligga 
på **under 200 kr i månaden**.

## 7. Systemkonfiguration och "White-label" (För alla typer av föreningar)

För att plattformen ska kunna användas av valfri förening, fackförbund eller 
studentkår är systemet byggt som en "white-label"-lösning. Detta innebär att 
varje installation enkelt kan skräddarsys via ett admin-gränssnitt utan att 
koden behöver ändras.

### 7.1 Generell Föreningsuppsättning (Tenant Configuration)
Superadministratören för systemet (ofta IT-ansvarig i föreningen) kan ställa 
in följande globala parametrar:
* **Föreningsnamn och Logotyp:** Visas på inloggningsskärmen, i sidhuvudet i 
  appen, samt på det exporterade protokollet.
* **Färgtema (Theming):** Möjlighet att anpassa primära och sekundära färger 
  (exempelvis Mensas blå/gula toner eller en annan förenings grafiska profil).
* **Språkstöd (i18n):** Inbyggt stöd för flera språk (som standard Svenska och 
  Engelska) där användaren själv kan byta språk i gränssnittet.
* **Inloggningstext:** Anpassningsbar informationstext på startskärmen med 
  länkar till föreningens egen support.

### 7.2 Flexibla Valmetoder (Rösträkningsalgoritmer)
Eftersom olika föreningar har olika stadgar, har systemet inbyggt stöd för 
samtliga vedertagna rösträkningsmetoder. Valkommittén/Ordföranden väljer 
metod per enskild fråga/val:

1. **Enkel majoritet (First Past The Post / Plurality):**
   Det vanligaste systemet. Kandidaten eller förslaget med flest röster vinner, 
   oavsett om det är över 50%. Används ofta för enkla Ja/Nej-frågor.
2. **Absolut majoritet (>50%):**
   Kräver att ett förslag eller en person får mer än hälften av de angivna 
   rösterna. Stödjer inställningar för automatisk eliminering (den med färst 
   röster stryks och en ny omröstningsrunda startas om ingen når 50%).
3. **Enkel överförbar röst (STV - Single Transferable Vote):**
   Väljaren rangordnar kandidaterna (1, 2, 3). Systemet flyttar automatiskt 
   överflödiga röster, eller röster från utslagna kandidater, till nästa val 
   på listan. Standard för Mensa.
4. **Godkännanderöstning (Approval Voting):**
   Väljaren får kryssa för *alla* kandidater de anser vara acceptabla för 
   posten. Den eller de kandidater som får flest kryss totalt vinner. 
   (Mycket användarvänligt och minskar taktikröstning).
5. **Schulze-metoden (Condorcet-metoden):**
   Väljarna rangordnar kandidaterna. Systemet simulerar sedan dueller mellan 
   alla kandidater (1 mot 1). Den kandidat som slår alla andra kandidater i 
   direkta dueller vinner. (Mycket populärt inom tekniska föreningar och 
   open source-communityn).

---

## 8. Roller, Behörigheter och Funktionella Krav

### 8.1 Superadmin (IT / Föreningsadministratör)
* Ansvarar för den tekniska driften och "white-label"-konfigurationen (enligt 
  sektion 7.1).
* Sätter upp API-nycklar mot medlemsregister (t.ex. Föreningshuset) och 
  konfigurerar eventuell BankID-integration.

### 8.2 Medlem (Röstande)
* Loggar in säkert och verifieras mot medlemsregistret.
* Får ett röstningsgränssnitt som anpassar sig efter vald valmetod (t.ex. 
  "drag-and-drop" för STV/Schulze, eller vanliga kryssrutor för Enkel majoritet).
* Kan ändra sin röst obegränsat antal gånger tills frågan stängs.

### 8.3 Mötessamordnare (Styrelsens representant)
* Skapar årsmöten och bygger dagordningen.
* Laddar upp PDF-bilagor och kopplar dem till specifika agendapunkter.

### 8.4 Valkommittén
* Lägger upp kandidater och presentationer.
* **Kopplar rätt valmetod till rätt val:** (T.ex. väljer STV för styrelseval 
  och Enkel majoritet för val av revisorer).

### 8.5 Mötesordförande
* Styr "Projektor-vyn" och navigerar genom dagordningen.
* Öppnar och stänger live-röstning. Vid komplicerade val (som STV eller 
  Schulze) dekrypterar systemet och presenterar uträkningen visuellt och 
  lättförståeligt på storskärmen.

### 8.6 Mötessekreterare
* Arbetar i det dynamiska protokollverktyget där röstsiffror auto-genereras 
  så snart ordföranden stänger en röstning.

---

## 9. Arbetsflöde: Skapa och genomföra ett Årsmöte

### Fas 1: Plattformsuppsättning (Görs en gång)
1. Systemet driftas (t.ex. via Docker) och Superadmin loggar in.
2. Föreningens namn, logotyp, färger och språk konfigureras.
3. Kopplingen till medlemsregistret (API) aktiveras.

### Fas 2: Förberedelser inför Årsmötet (Senast 4 veckor innan)
1. Mötessamordnaren skapar "Årsmöte 202X" och lägger in dagordningen.
2. Handlingar och bilagor (verksamhetsberättelse m.m.) laddas upp.
3. Valkommittén lägger in nominerade kandidater och ställer in korrekt 
   *Valmetod* (STV, Majoritet, Approval etc.) för respektive personval.
4. Propositioner (t.ex. ansvarsfrihet) sätts upp med "Enkel majoritet".

### Fas 3: Förtidsröstning öppnar (Samtidigt som andra kallelsen)
1. Medlemmar loggar in, möts av föreningens egen logga/profil, och kan läsa 
   alla underlag på samma ställe som de röstar.

### Fas 4: Genomförande av Årsmötet (Live)
1. Ordföranden styr mötet via Projektor-vyn.
2. När det är dags för beslut trycker ordföranden "Öppna live-röstning".
3. Medlemmar röstar i telefonen utifrån det gränssnitt som valmetoden kräver.
4. När röstningen stängs slutför systemet uträkningen oavsett algoritm och 
   visar resultatet direkt.

### Fas 5: Efterarbete
1. Sekreteraren kompletterar det autogenererade protokollet med yrkanden.
2. Mötet arkiveras och kopplingen mellan person och röst raderas för alltid.

## 10. Innehållshantering och Mobil Vänlighet (UX/UI)

För att maximera användarvänligheten, särskilt på mobila enheter, ska systemet i första hand använda responsiva format snarare än statiska dokument.

### 10.1 "Markdown-first" och Tillgänglighet
* **Responsiv text:** Istället för att tvinga användare att läsa svårnavigerade PDF:er i mobilen, ska systemet primärt stödja uppladdning och redigering av text i Markdown (`.md`). Appen renderar sedan detta som snygg, responsiv text som anpassar sig efter skärmstorleken (Dark mode/Light mode-kompatibelt).
* **Kandidatpresentationer:** Valkommittén matar in kandidaternas presentationer i rena textfält/Markdown och laddar upp profilbilder i standardformat (JPEG/PNG/WebP). Systemet beskär bilderna enhetligt och bygger automatiskt snygga "profilkort" i appen.
* **PDF som fallback:** Stöd för att ladda upp PDF-filer ska finnas kvar som ett komplement (t.ex. för formella revisionsberättelser med inskannade signaturer), men det ska inte vara huvudmetoden för att förmedla information.

### 10.2 Agendabyggare och Mallar (Trello-style)
Eftersom årsmöten följer en strikt struktur enligt stadgarna ska systemet minimera det manuella arbetet för mötessamordnaren.
* **Drag-and-drop-gränssnitt:** Dagordningen byggs i ett visuellt gränssnitt, liknande Trello, där man enkelt kan skapa kort (agendapunkter) och dra dem till rätt ordning.
* **Förfyllda standardmallar:** Systemet ska komma med färdiga mallar. Genom att klicka på "Nytt Årsmöte (Standard)" genereras automatiskt en lista med alla obligatoriska punkter (Mötets öppnande, Val av ordförande, Ansvarsfrihet, etc.) direkt från stadgarna. Administratören behöver därefter bara fylla i årets specifika detaljer.

## 11. Beständig Systemkonfiguration (Super-admin)

För att göra plattformen extremt enkel att drifta och återanvända år efter år (eller flytta mellan olika servrar/laptops), frikopplas föreningsspecifik data från databasen.

* **Konfigurationsfil (`config.yaml` eller `settings.json`):** All generell och icke-känslig föreningsdata (Föreningens namn, logotyp-sökväg, färgkoder, standardvalmetod) sparas i en statisk konfigurationsfil.
* **Fördel:** När systemet startas (t.ex. via Docker Compose) läser det in denna fil. Detta innebär att IT-ansvarig kan spara konfigurationsfilen lokalt. Nästa år räcker det att dra igång servern med samma fil, så är hela systemet omedelbart varumärkesanpassat och redo att användas, utan att super-admin behöver göra om inställningarna.

