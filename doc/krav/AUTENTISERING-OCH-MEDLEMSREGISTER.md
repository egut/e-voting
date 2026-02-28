# Autentisering och Medlemsregister

## 1. Medlemsregister-integration (Flexibla alternativ)

Systemet stödjer flera metoder för att hantera medlemsdata, anpassat efter föreningens behov:

### 1.1 Alternativ 1: Statisk filuppladdning

- **CSV-import**: Ladda upp medlemslista (Namn, Medlemsnummer, E-post, Personnummer/ID, Status)
- **Excel-import**: Stöd för .xlsx-filer (via bibliotek som SheetJS/ExcelJS)
- **Användning**: Enkel lösning för små föreningar eller engångsmöten
- **Uppdatering**: Manuell uppladdning vid ändringar
- **Validering**: Systemet kontrollerar format och dubbletter vid import

### 1.2 Alternativ 2: API-integration (Realtidssynk)

- **Föreningshuset API**: OAuth2/REST-adapter för svenska föreningar
- **Generiskt REST API**: Konfigurerbar adapter för andra medlemssystem
- **Synkronisering**: Automatisk eller schemalagd (t.ex. varje natt)
- **Verifiering**: Realtidskontroll av medlemsstatus vid inloggning

### 1.3 Alternativ 3: Directory Services (AD/SSO)

- **Microsoft Entra ID (Azure AD)**: OAuth2/SAML-integration
- **Google Workspace**: OAuth2-integration
- **Generisk LDAP**: Stöd för on-premise Active Directory
- **Användning**: Perfekt för företag eller organisationer med befintlig identitetshantering
- **Gruppbaserad åtkomst**: Medlemskap kan styras via AD-grupper

### 1.4 Alternativ 4: Hybrid-lösning

- Kombination av ovanstående (t.ex. API för svenska medlemmar + CSV för internationella)
- Flexibel konfiguration per förening

### 1.5 Gemensamma krav

- **Dataskydd**: All medlemsdata krypteras i vila och transit
- **GDPR-compliance**: Minimal datainsamling, tydligt syfte
- **Validering**: Kontroll av medlemsstatus (betald avgift, aktiv medlem)
- **Loggning**: Alla synkroniseringar och importer loggas

## 2. Autentiseringsmetoder

Systemet stödjer flera autentiseringsmetoder för maximal flexibilitet:

### 2.1 Metod 1: Freja eID+ (Rekommenderad för svenska medlemmar)

- **Krav från medlemsregister**: Svenskt personnummer (12 siffror)
- **Process**:
  1. Medlem loggar in med Freja eID+
  2. Systemet hämtar personnummer från Freja
  3. Personnummer matchas mot medlemsregister
  4. Åtkomst beviljas om medlem är aktiv
- **Kostnad**: Gratis för föreningen
- **Säkerhetsnivå**: Hög (motsvarande BankID)
- **Fördel**: Automatisk verifiering, ingen manuell hantering

### 2.2 Metod 2: SSO via Active Directory/Entra ID/Google

- **Krav från medlemsregister**: E-postadress eller användarnamn
- **Process**:
  1. Medlem loggar in via SSO-provider
  2. Systemet hämtar e-post/användarnamn från SSO
  3. Matchning mot medlemsregister
  4. Åtkomst beviljas om medlem finns och är aktiv
- **MFA**: Hanteras av SSO-provider (rekommenderat)
- **Användning**: Perfekt för organisationer med befintlig identitetshantering

### 2.3 Metod 3: Användarnamn/Lösenord (Lokal autentisering)

- **Krav från medlemsregister**: E-postadress eller medlemsnummer
- **Process**:
  1. Medlem skapar konto eller får autogenererat lösenord
  2. Inloggning med användarnamn + lösenord
  3. MFA via TOTP (Google Authenticator, Authy) eller SMS (valfritt)
- **Användning**: Fallback för medlemmar utan e-legitimation
- **Säkerhet**: Krav på starkt lösenord + MFA rekommenderas

### 2.4 Metod 4: Magic Link (Passwordless)

- **Krav från medlemsregister**: E-postadress
- **Process**:
  1. Medlem anger e-postadress
  2. Systemet skickar engångslänk med tidsbegränsad token
  3. Medlem klickar på länk och loggas in automatiskt
- **Säkerhet**: Token giltig i 15 minuter, engångsanvändning
- **Användning**: Enkel lösning för enstaka möten eller äldre medlemmar

### 2.5 Metod 5: QR-kod (On-site autentisering)

- **Krav från medlemsregister**: Medlemsnummer eller personnummer
- **Process**:
  1. Valkommittén verifierar medlem fysiskt (ID-kort)
  2. Valkommittén genererar personlig QR-kod
  3. Medlem skannar QR-kod med sin enhet
  4. Automatisk inloggning och åtkomst till röstning
- **Säkerhet**: QR-kod innehåller krypterad token, giltig i 24 timmar
- **Användning**: Perfekt för fysiska möten och manuell verifiering

## 3. Hantering av specialfall och manuella godkännanden

### 3.1 Scenario 1: Internationella medlemmar utan svenskt personnummer

- Valkommittén verifierar medlemskap manuellt mot medlemsregister
- Godkännande via admin-gränssnitt
- Medlem får Magic Link eller QR-kod för inloggning
- Markeras i röstlängd som "Manuellt verifierad"

### 3.2 Scenario 2: Sent betalda medlemmar

- Medlem syns inte i medlemsregister vid inloggningsförsök
- Medlem kontaktar valkommittén på plats
- Valkommittén verifierar betalning manuellt
- Medlem läggs till manuellt i systemet
- Markeras i röstlängd som "Manuellt tillagd - Betalning verifierad [Datum]"

### 3.3 Scenario 3: Nya medlemmar (anmält sig precis innan mötet)

- Samma process som sent betalda medlemmar
- Valkommittén verifierar medlemsansökan och betalning
- Markeras i röstlängd som "Manuellt tillagd - Ny medlem [Datum]"

### 3.4 Scenario 4: Tekniska problem (glömt lösenord, tappat telefon, etc.)

- Medlem identifierar sig fysiskt hos valkommittén
- Valkommittén genererar ny Magic Link eller QR-kod
- Markeras i röstlängd som "Återautentiserad manuellt [Datum]"

### 3.5 Scenario 5: Gästobservatörer (ej röstberättigade)

- Kan ges läsbehörighet utan rösträtt
- Markeras tydligt som "Observatör - Ej röstberättigad"
- Kan inte avge röster men kan följa mötet

## 4. Gränssnitt för valkommittén (Medlemshantering)

### 4.1 Väntande godkännanden

- Lista över medlemmar som begärt åtkomst men inte kunnat verifieras automatiskt
- Visar: Namn, Medlemsnummer (om angivet), E-post, Land, Begäran-datum
- Knappar: Godkänn, Avslå, Visa detaljer

### 4.2 Manuell tillägg

- Formulär för att lägga till medlem manuellt
- Fält: Namn, Medlemsnummer, E-post, Personnummer (valfritt), Kommentar
- Välj autentiseringsmetod: Magic Link, QR-kod, Tillfälligt lösenord
- Markering: "Manuellt tillagd" med anledning (dropdown: Sent betald, Ny medlem, Tekniskt problem, Internationell medlem)

### 4.3 Generera åtkomstkoder

- Knapp: "Generera Magic Link" (skickas via e-post)
- Knapp: "Generera QR-kod" (visas på skärm för utskrift eller scanning)
- Knapp: "Generera tillfälligt lösenord" (visas för manuell överföring)

### 4.4 Röstlängd och revision

- Alla manuella tillägg loggas med:
  - Vem som godkände (valkommitténs användarnamn)
  - Tidsstämpel
  - Anledning
  - Autentiseringsmetod
- Exporterbar för revision och protokoll
- Tydlig markering i röstlängd: "Manuellt verifierad av [Namn] [Datum] - [Anledning]"

## 5. Säkerhetsnivåer

### 5.1 Säkerhetsnivå-badges

Varje medlem får en visuell säkerhetsbadge baserat på autentiseringsmetod och medlemsregister-integration:

- 🔒🔒🔒 **Mycket hög** (grön): Freja eID+ + API-integration
- 🔒🔒 **Hög** (ljusgrön): SSO med MFA + Directory Services, eller Freja eID+ + CSV
- 🔒 **Medel** (gul): Magic Link + API, eller Användarnamn/Lösenord + MFA + CSV
- ⚠️ **Låg** (orange): QR-kod + Manuellt tillagd, eller Magic Link + CSV
- ⚠️ **Manuell** (röd): Användarnamn/Lösenord utan MFA

### 5.2 Säkerhetsöversikt

Valkommittén ser en dashboard med säkerhetsöversikt:

```
┌─────────────────────────────────────────────────────┐
│ Säkerhetsöversikt för Årsmöte 2026                  │
├─────────────────────────────────────────────────────┤
│ 🔒🔒🔒 Mycket hög: 234 medlemmar (78%) ████████████  │
│ 🔒🔒 Hög:          45 medlemmar (15%)  ███           │
│ 🔒 Medel:          18 medlemmar (6%)   █             │
│ ⚠️ Låg:            3 medlemmar (1%)    ▌             │
├─────────────────────────────────────────────────────┤
│ ✅ Totalt: 300 röstberättigade medlemmar            │
│ ⚠️ Varning: 3 medlemmar med låg säkerhetsnivå      │
└─────────────────────────────────────────────────────┘
```

### 5.3 Varningar

Om > 10% har låg säkerhetsnivå:

- Gul varningsruta: "Observera: 15% av medlemmarna har låg säkerhetsnivå. Överväg att kräva högre autentisering för kritiska beslut."
