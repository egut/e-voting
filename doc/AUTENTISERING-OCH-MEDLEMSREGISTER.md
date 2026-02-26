# Autentisering och Medlemsregister - Flexibla lösningar

## Översikt

Detta dokument beskriver de flexibla lösningarna för medlemsregisterhantering och autentisering i det digitala röstningssystemet. Systemet är designat för att vara användbart för alla typer av föreningar, från små lokala grupper till stora nationella organisationer.

## 1. Medlemsregister - Fyra alternativ

### 1.1 Alternativ 1: Statisk filuppladdning

**Användning:** Små föreningar, engångsmöten, eller föreningar utan digitalt medlemssystem

**Fördelar:**

- Enklast att komma igång
- Ingen tekniskion behövs
- Fungerar med Excel eller CSV
- Ingen löpande kostnad

**Nackdelar:**

- Manuell uppdatering vid ändringar
- Ingen realtidssynkronisering
- Risk för föråldrad data

**Process:**

1. Exportera medlemslista från befintligt system (Excel, Google Sheets, etc.)
2. Ladda upp fil i systemet
3. Mappa kolumner till systemfält (Namn, Medlemsnummer, E-post, etc.)
4. Systemet validerar data och importerar medlemmar
5. Vid ändringar: Ladda upp ny fil

**Obligatoriska fält:**

- Namn
- Medlemsnummer
- E-postadress

**Valfria fält:**

- Personnummer (för Freja eID+-integration)
- Telefonnummer
- Status (Aktiv, Inaktiv, Vilande)
- Medlemstyp (Fullvärdig, Hedersmedlem, Observatör)

### 1.2 Alternativ 2: API-integration (Realtidssynk)

**Användning:** Föreningar med digitalt medlemssystem som har API

**Fördelar:**

- Automatisk synkronisering
- Alltid aktuell data
- Realtidsverifiering av medlemsstatus
- Ingen manuell hantering

**Nackdelar:**

- Kräver teknisk integration
- Beroende av extern tjänst
- Kan ha löpande kostnad

**Stödda system:**

#### 1.2.1 Föreningshuset (Svenska föreningar)

- OAuth2/REST API
- Automatisk synkronisering
- Verifiering av betalda avgifter
- Kostnad: 0-300 kr/månad (beroende på avtalsnivå)

#### 1.2.2 Generiskt REST API

- Konfigurerbar adapter för valfritt medlemssystem
- Stöd för API-nyckel, OAuth2, Basic Auth
- JSON-mappning för att mappa API-svar till systemfält
- Flexibel synkroniseringsfrekvens

**Konfiguration:**

- API-URL (endpoint)
- Autentiseringsmetod och credentials
- JSON-mappning för datafält
- Synkroniseringsfrekvens (varje timme, dagligen, manuellt)

### 1.3 Alternativ 3: Directory Services (AD/SSO)

**Användning:** Organisationer med befintlig identitetshantering (företag, myndigheter, stora organisationer)

**Fördelar:**

- Använder befintlig infrastruktur
- Centraliserad användarhantering
- Automatisk synkronisering
- Inbyggd MFA från AD/SSO-provider

**Nackdelar:**

- Kräver IT-kompetens för uppsättning
- Kan vara overkill för små föreningar

**Stödda system:**

#### 1.3.1 Microsoft Entra ID (Azure AD)

- OAuth2/SAML-integration
- Gruppbaserad åtkomst
- Automatisk MFA
- Perfekt för företag med Microsoft 365

#### 1.3.2 Google Workspace

- OAuth2-integration
- Gruppbaserad åtkomst
- Automatisk MFA
- Perfekt för organisationer med Google Workspace

#### 1.3.3 Generisk LDAP

- Stöd för on-premise Active Directory
- Flexibel attributmappning
- Filterbaserad medlemshantering

### 1.4 Alternativ 4: Hybrid-lösning

**Användning:** Föreningar med blandade behov

**Exempel:**

- API för svenska medlemmar + CSV för internationella
- AD för anställda + CSV för externa medlemmar
- API som primär + manuella tillägg för specialfall

**Fördelar:**

- Maximal flexibilitet
- Kan kombinera fördelar från flera metoder
- Hanterar komplexa organisationsstrukturer

**Process:**

1. Systemet försöker först primär källa (t.ex. API)
2. Om medlem inte hittas: Försök sekundär källa (t.ex. CSV)
3. Om fortfarande inte hittas: Tillåt manuellt tillägg av valkommittén

## 2. Autentiseringsmetoder - Fem alternativ

### 2.1 Metod 1: Freja eID+ (Rekommenderad för svenska medlemmar)

**Användning:** Svenska medlemmar med svenskt personnummer

**Fördelar:**

- Gratis för föreningen
- Hög säkerhetsnivå (motsvarande BankID)
- Automatisk personnummerverifiering
- Ingen manuell hantering
- Bred användarbas i Sverige

**Krav från medlemsregister:**

- Svenskt personnummer (12 siffror)

**Process:**

1. Medlem klickar "Logga in med Freja eID+"
2. Omdirigeras till Freja eID+
3. Autentiserar med Freja-appen
4. Personnummer hämtas från Freja
5. Matchas mot medlemsregister
6. Åtkomst beviljas om medlem är aktiv

**Felhantering:**

- Personnummer finns inte i register → Kontakta valkommittén
- Medlemsavgift ej betald → Kontakta ekonomiansvarig
- Freja-autentisering misslyckades → Försök igen eller välj alternativ metod

### 2.2 Metod 2: SSO via Active Directory/Entra ID/Google

**Användning:** Organisationer med befintlig identitetshantering

**Fördelar:**

- Använder befintliga konton
- MFA hanteras av SSO-provider
- Ingen lösenordshantering i systemet
- Centraliserad åtkomstkontroll

**Krav från medlemsregister:**

- E-postadress eller användarnamn

**Process:**

1. Medlem klickar "Logga in med [Organisation]"
2. Omdirigeras till SSO-provider
3. Loggar in (MFA hanteras av provider)
4. E-post/användarnamn matchas mot medlemsregister
5. Åtkomst beviljas om medlem finns och är aktiv

**Stödda providers:**

- Microsoft Entra ID (Azure AD)
- Google Workspace
- Generisk SAML 2.0
- Generisk OAuth2

### 2.3 Metod 3: Användarnamn/Lösenord (Lokal autentisering)

**Användning:** Fallback för medlemmar utan e-legitimation eller SSO

**Fördelar:**

- Fungerar för alla medlemmar
- Ingen extern beroende
- Kan kombineras med MFA

**Nackdelar:**

- Kräver lösenordshantering
- Risk för svaga lösenord
- Medlemmar kan glömma lösenord

**Krav från medlemsregister:**

- E-postadress eller medlemsnummer

**Process:**

1. Medlem skapar konto eller får autogenererat lösenord
2. Loggar in med användarnamn + lösenord
3. MFA via TOTP (Google Authenticator, Authy) eller SMS (valfritt)
4. Åtkomst beviljas

**Säkerhetskrav:**

- Minsta lösenordslängd: 12 tecken (konfigurerbart)
- Krav på stora/små bokstäver, siffror, specialtecken
- MFA rekommenderas starkt
- Rate limiting mot brute-force

### 2.4 Metod 4: Magic Link (Passwordless)

**Användning:** Enkel lösning för enstaka möten eller äldre medlemmar

**Fördelar:**

- Inget lösenord att komma ihåg
- Mycket enkelt för användaren
- Säkert (tidsbegränsad token)

**Nackdelar:**

- Kräver tillgång till e-post
- Kan hamna i spam
- Tidsbegränsad (15 minuter)

**Krav från medlemsregister:**

- E-postadress

**Process:**

1. Medlem anger e-postadress
2. Systemet skickar engångslänk med tidsbegränsad token
3. Medlem klickar på länk
4. Automatisk inloggning
5. Omdirigeras till startsida

**Säkerhet:**

- Token giltig i 15 minuter (konfigurerbart)
- Engångsanvändning
- Krypterad token
- Loggning av alla genereringar

### 2.5 Metod 5: QR-kod (On-site autentisering)

**Användning:** Fysiska möten med manuell verifiering i dörren

**Fördelar:**

- Perfekt för fysiska möten
- Snabb åtkomst
- Manuell verifiering av identitet
- Fungerar för alla medlemmar

**Nackdelar:**

- Kräver fysisk närvaro av valkommittén
- Kräver kamera på medlemmens enhet

**Krav från medlemsregister:**

- Medlemsnummer eller personnummer

**Process:**

1. Medlem identifierar sig fysiskt hos valkommittén (ID-kort)
2. Valkommittén verifierar medlemskap
3. Valkommittén genererar personlig QR-kod
4. Medlem skannar QR-kod med sin enhet
5. Automatisk inloggning

**Säkerhet:**

- QR-kod innehåller krypterad token
- Giltig i 24 timmar (konfigurerbart)
- Engångsanvändning eller begränsad användning
- Loggning av alla genereringar

**Alternativ:**

- Manuell inmatning av kod (om kamera inte fungerar)
- Utskrift av QR-kod för medlemmar utan smartphone

## 3. Hantering av specialfall

### 3.1 Internationella medlemmar utan svenskt personnummer

**Problem:** Kan inte använda Freja eID+

**Lösning:**

1. Medlem begär åtkomst via systemet
2. Valkommittén verifierar medlemskap manuellt mot medlemsregister
3. Valkommittén godkänner medlem i admin-gränssnitt
4. Väljer autentiseringsmetod: Magic Link, QR-kod, eller Användarnamn/Lösenord
5. Medlem får åtkomst
6. Markeras i röstlängd som "Manuellt verifierad"

### 3.2 Sent betalda medlemmar

**Problem:** Syns inte i medlemsregister vid inloggningsförsök

**Lösning:**

1. Medlem kontaktar valkommittén på plats
2. Valkommittén verifierar betalning manuellt
3. Valkommittén lägger till medlem manuellt i systemet
4. Genererar QR-kod eller Magic Link
5. Medlem får omedelbar åtkomst
6. Markeras i röstlängd som "Manuellt tillagd - Betalning verifierad [Datum]"

### 3.3 Nya medlemmar (anmält precis innan mötet)

**Problem:** Finns inte i medlemsregister än

**Lösning:**

- Samma process som sent betalda medlemmar
- Valkommittén verifierar medlemsansökan och betalning
- Markeras i röstlängd som "Manuellt tillagd - Ny medlem [Datum]"

### 3.4 Tekniska problem (glömt lösenord, tappat telefon, etc.)

**Problem:** Medlem kan inte logga in med sin vanliga metod

**Lösning:**

1. Medlem identifierar sig fysiskt hos valkommittén
2. Valkommittén verifierar identitet (ID-kort)
3. Valkommittén genererar ny Magic Link eller QR-kod
4. Medlem får omedelbar åtkomst
5. Markeras i röstlängd som "Återautentiserad manuellt [Datum]"

### 3.5 Gästobservatörer (ej röstberättigade)

**Problem:** Ska kunna följa mötet men inte rösta

**Lösning:**

1. Valkommittén lägger till observatör manuellt
2. Markerar som "Observatör - Ej röstberättigad"
3. Genererar åtkomst (valfri metod)
4. Observatör kan läsa handlingar och följa mötet
5. Kan INTE avge röster (systemet blockerar)

## 4. Rättssäkerhet och revision

### 4.1 Spårbarhet

**Alla autentiseringar loggas:**

- Metod (Freja eID+, Magic Link, QR-kod, etc.)
- Tidpunkt
- IP-adress
- Framgång eller misslyckande

**Manuella godkännanden loggas:**

- Vem som godkände (valkommitténs användarnamn)
- Tidsstämpel
- Anledning
- Autentiseringsmetod
- Kommentar

### 4.2 Röstlängd

**Innehåller:**

- Namn
- Medlemsnummer
- Autentiseringsmetod
- Verifieringstyp (Automatisk/Manuell)
- Säkerhetsnivå (se nedan)
- Tidsstämpel
- Ansvarig (om manuell)
- Status (Inloggad, Röstat, Ej inloggad)

**Säkerhetsnivå-indikatorer:**

Systemet visar tydligt säkerhetsnivå för varje autentiseringsmetod och medlemsregister:

**Autentisering - Säkerhetsnivå:**

- 🔒🔒🔒 **Hög**: Freja eID+ (personnummerverifierad e-legitimation)
- 🔒🔒🔒 **Hög**: SSO med MFA (organisationens identitetshantering)
- 🔒🔒 **Medel**: Användarnamn/Lösenord + MFA (TOTP)
- 🔒 **Låg**: Magic Link (endast e-postverifiering)
- 🔒 **Låg**: QR-kod (manuell verifiering, ingen digital identitet)
- ⚠️ **Manuell**: Användarnamn/Lösenord utan MFA (ej rekommenderad)

**Medlemsregister - Manipulationsrisk:**

- ✅ **Låg risk**: API-integration med realtidssynk (svårt att manipulera)
- ✅ **Låg risk**: Directory Services (AD/SSO) (centraliserad kontroll)
- ⚠️ **Medel risk**: CSV-uppladdning (kan redigeras före uppladdning)
- ⚠️ **Medel risk**: Manuella tillägg (beroende av valkommitténs noggrannhet)

**Kombinerad säkerhetsnivå:**

Systemet beräknar och visar kombinerad säkerhetsnivå för varje medlem:

- 🔒🔒🔒 **Mycket hög**: Freja eID+ + API-integration
- 🔒🔒 **Hög**: SSO med MFA + Directory Services
- 🔒🔒 **Hög**: Freja eID+ + CSV
- 🔒 **Medel**: Magic Link + API-integration
- 🔒 **Medel**: Användarnamn/Lösenord + MFA + CSV
- ⚠️ **Låg**: QR-kod + Manuellt tillagd
- ⚠️ **Låg**: Magic Link + CSV

**Visualisering i röstlängd:**

Varje medlem får en säkerhetsbadge:

- Färgkodad: Grön (Mycket hög/Hög), Gul (Medel), Röd (Låg)
- Ikon: Antal lås (🔒🔒🔒, 🔒🔒, 🔒) eller varning (⚠️)
- Tooltip vid hover: "Freja eID+ + API-integration = Mycket hög säkerhet"

**Statistik för mötet:**

Mötesordförande och valkommitté kan se:

- Antal medlemmar per säkerhetsnivå
- Procentandel med hög säkerhet
- Varning om många låg-säkerhetsinloggningar

**Exempel:**

```
Säkerhetsöversikt för Årsmöte 2026:
🔒🔒🔒 Mycket hög: 234 medlemmar (78%)
🔒🔒 Hög: 45 medlemmar (15%)
🔒 Medel: 18 medlemmar (6%)
⚠️ Låg: 3 medlemmar (1%)
```

**Markering av manuella tillägg:**

- "Manuellt verifierad av [Namn] [Datum] - [Anledning]"
- Säkerhetsnivå: ⚠️ Låg (Manuell verifiering)
- Tydligt synligt i röstlängd
- Exporterbart för protokoll och revision

**Anonymisering:**

- Efter mötet raderas koppling mellan person och röst
- Röstlängd behålls för revision
- Revisionsspår för autentisering behålls
- Ingen koppling mellan autentisering och röstinnehåll

### 4.3 Revisionsspår

**Separata loggar:**

- Autentiseringslogg (vem loggade in, när, hur)
- Röstningslogg (antal röster, resultat, tidsstämplar)
- Ingen koppling mellan loggarna

**Revisor kan:**

- Se att rätt personer fått åtkomst
- Verifiera att alla röster räknats korrekt
- Kontrollera att inga obehöriga röstat
- INTE se vad specifika personer röstat (anonymitet bevaras)

**Matematisk verifierbarhet (E2E-V):**

- Varje medlem får kvittokod
- Kan verifiera att den egna rösten räknats
- Upptäcker manipulation
- Bevarar anonymitet

## 5. Rekommendationer per föreningstyp

### 5.1 Liten förening (< 100 medlemmar)

**Medlemsregister:** Statisk filuppladdning (CSV/Excel)
**Autentisering:** Magic Link + QR-kod (on-site)
**Kostnad:** 0 kr
**Komplexitet:** Låg

### 5.2 Medelstor förening (100-500 medlemmar)

**Medlemsregister:** API-integration (Föreningshuset) eller CSV
**Autentisering:** Freja eID+ (primär) + Magic Link (fallback)
**Kostnad:** 0-300 kr/månad
**Komplexitet:** Medel

### 5.3 Stor förening (> 500 medlemmar)

**Medlemsregister:** API-integration (Föreningshuset eller generiskt API)
**Autentisering:** Freja eID+ (primär) + SSO (om tillgängligt) + Magic Link (fallback)
**Kostnad:** 300-600 kr/månad
**Komplexitet:** Medel-Hög

### 5.4 Företag/Organisation med befintlig IT

**Medlemsregister:** Directory Services (Entra ID/Google/LDAP)
**Autentisering:** SSO (primär) + Magic Link (fallback)
**Kostnad:** 0 kr (använder befintlig infrastruktur)
**Komplexitet:** Hög (kräver IT-kompetens)

### 5.5 Internationell förening

**Medlemsregister:** Hybrid (API för lokala + CSV för internationella)
**Autentisering:** Freja eID+ (svenska) + Magic Link (internationella) + Manuella godkännanden
**Kostnad:** 0-300 kr/månad
**Komplexitet:** Medel

## 6. Sammanfattning

Systemet erbjuder maximal flexibilitet för att passa alla typer av föreningar:

**Medlemsregister:**

- Statisk fil (enklast)
- API-integration (automatiskt)
- Directory Services (för organisationer)
- Hybrid (kombinera flera)

**Autentisering:**

- Freja eID+ (rekommenderad för svenska)
- SSO (för organisationer)
- Användarnamn/Lösenord (fallback)
- Magic Link (enklast)
- QR-kod (on-site)

**Specialfall:**

- Manuella godkännanden av valkommittén
- QR-kod för snabb åtkomst på plats
- Magic Link för tekniska problem
- Tydlig markering i röstlängd

**Rättssäkerhet:**

- Fullständig loggning
- Spårbarhet utan att bryta anonymitet
- Matematisk verifierbarhet
- Revisionsspår för alla åtgärder

Systemet är designat för att vara både säkert och användarvänligt, med fokus på att alla medlemmar ska kunna delta oavsett teknisk kompetens eller tillgång till specifika verktyg.
