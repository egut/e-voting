# Kravdokumentation

Denna mapp innehåller alla kravdokument för det digitala röstningssystemet.

## Dokumentöversikt

### Funktionella krav

**[FUNKTIONELLA-KRAV.md](FUNKTIONELLA-KRAV.md)**

Beskriver vad systemet ska göra:

- Röstningsprocess och tidslinje
- Röstlängd och närvarodefinitioner
- Valmetoder (STV, Majoritet, etc.)
- Hantering av tekniskt haveri
- Innehållshantering och dokumentformat
- White-label konfiguration

### Prestanda och tekniska krav

**[PRESTANDA-OCH-TEKNISKA-KRAV.md](PRESTANDA-OCH-TEKNISKA-KRAV.md)**

Beskriver hur snabbt och säkert systemet ska vara:

- API-responstider (50-150ms för röstning)
- Säkerhetskrav för kod och bibliotek
- Minimera externa beroenden
- Testningskrav (>95% för kritisk kod)
- Dokumentationskrav med Mermaid-diagram
- Versionshantering och release-process

### Säkerhet och kryptering

**[SAKERHET-OCH-KRYPTERING.md](SAKERHET-OCH-KRYPTERING.md)**

Beskriver säkerhetsmekanismer:

- Kryptografisk separation (VEM vs VAD)
- Krypterad valurna
- End-to-End Verifiability (E2E-V)
- Skydd mot påtryckningar
- Hotmodellering (5 scenarier)
- GDPR-compliance

### Autentisering och medlemsregister

**[AUTENTISERING-OCH-MEDLEMSREGISTER.md](AUTENTISERING-OCH-MEDLEMSREGISTER.md)**

Beskriver hur medlemmar loggar in:

- Medlemsregister-integration (CSV, API, Directory Services)
- Autentiseringsmetoder (Freja eID+, SSO, Magic Link, QR-kod)
- Hantering av specialfall (internationella medlemmar, sent betalda, etc.)
- Valkommitténs gränssnitt
- Säkerhetsnivåer och badges

### Infrastruktur och hosting

**[INFRASTRUKTUR-OCH-HOSTING.md](INFRASTRUKTUR-OCH-HOSTING.md)**

Beskriver teknisk infrastruktur:

- Portabilitet (Docker, Kubernetes)
- WAF och DDoS-skydd
- Hosting-alternativ (Laptop, VPS, Molntjänst)
- Databas (SQLite, PostgreSQL, MySQL)
- Backup och disaster recovery
- Övervakning och alerting
- Skalning

### Presentation och röstningsflöde

**[PRESENTATION-OCH-ROSTNINGSFLODE.md](PRESENTATION-OCH-ROSTNINGSFLODE.md)**

Beskriver detaljerat flöde under mötet:

- Projektor-vy (ordförandens kontroll)
- Dagordningspresentation
- Röstningsprocess med nedräkningstimer
- Deltagarvy (medlemmens gränssnitt)
- Begära ordet och använda mobil som mikrofon
- Sekreterarens gränssnitt
- Transparens och statusvisning

### Personas och funktioner

**[PERSONAS-OCH-FUNKTIONER.md](PERSONAS-OCH-FUNKTIONER.md)**

Beskriver alla användarroller och deras funktioner:

1. Ordförande
2. Sekreterare
3. Revisor
4. Ekonomiskt ansvarig (Kassör)
5. Deltagare/Medlem
6. Valberedning
7. Super admin/Teknisk ansvarig
8. Mötessamordnare
9. Valkommitté

För varje persona:

- Beskrivning och teknisk kompetens
- Funktioner före mötet
- Funktioner under mötet
- Funktioner efter mötet

### Kostnadsuppskattning

**[KOSTNADSUPPSKATTNING.md](KOSTNADSUPPSKATTNING.md)**

Beskriver kostnader:

- Mjukvarukostnad (0 kr - Open Source)
- Medlemsregister (0-300 kr/månad)
- Autentisering (0 kr)
- E-posttjänst (0-350 kr/månad)
- Infrastruktur (0-900 kr/månad)
- Sammanfattning per föreningstyp
- ROI-kalkyl och besparing jämfört med poströstning

### Arbetsflöde

**[ARBETSFLODE.md](ARBETSFLODE.md)**

Beskriver steg-för-steg-process:

- Fas 1: Plattformsuppsättning (görs en gång)
- Fas 2: Förberedelser inför årsmötet (4 veckor innan)
- Fas 3: Förtidsröstning pågår
- Fas 4: Genomförande av årsmötet (live)
- Fas 5: Efterarbete
- Kontinuerlig drift

### UI/UX-krav

**[UI-UX-KRAV.md](UI-UX-KRAV.md)**

Beskriver användargränssnitt och användarupplevelse:

- Plattformsstrategi (PWA vs Native apps)
- Responsiv design och mobile-first
- Designprinciper (enkelhet, tillgänglighet, förtroende)
- Färgschema och white-label design
- 13+ tema-mallar (från strikt till extremt lekfull)
- Typografi och komponenter
- Animationer och mikrointeraktioner
- Offline-funktionalitet
- Push-notifikationer
- Rollspecifika gränssnitt

### Playfulness och teman

**[PLAYFULNESS-OCH-TEMAN.md](PLAYFULNESS-OCH-TEMAN.md)**

Beskriver tema-mallar och playfulness-nivåer:

- Playfulness-skala (1-10)
- 13+ fördefinierade tema-mallar
- Playfulness-effekter per funktion
- Easter eggs (nivå 9-10)
- Ljud-bibliotek
- Anpassning för föreningar
- Teknisk implementation

### Autentisering och medlemsregister (Detaljerad)

**[AUTENTISERING-OCH-MEDLEMSREGISTER-DETALJERAD.md](AUTENTISERING-OCH-MEDLEMSREGISTER-DETALJERAD.md)**

Detaljerad beskrivning av autentiseringsmetoder:

- Inloggningsskärmar för alla metoder
- E-postmallar för Magic Link
- QR-kod-scanner
- Problem att logga in? (FAQ)
- Säkerhetsnivå-badges och dashboard
- Valkommitténs gränssnitt (detaljerat)

## Läsguide

### För beslutsfattare

1. Börja med [FUNKTIONELLA-KRAV.md](FUNKTIONELLA-KRAV.md)
2. Läs [KOSTNADSUPPSKATTNING.md](KOSTNADSUPPSKATTNING.md)
3. Granska [SAKERHET-OCH-KRYPTERING.md](SAKERHET-OCH-KRYPTERING.md)

### För utvecklare

1. Börja med [PRESTANDA-OCH-TEKNISKA-KRAV.md](PRESTANDA-OCH-TEKNISKA-KRAV.md)
2. Läs [SAKERHET-OCH-KRYPTERING.md](SAKERHET-OCH-KRYPTERING.md)
3. Granska [INFRASTRUKTUR-OCH-HOSTING.md](INFRASTRUKTUR-OCH-HOSTING.md)

### För användare

1. Börja med [PERSONAS-OCH-FUNKTIONER.md](PERSONAS-OCH-FUNKTIONER.md) (hitta din roll)
2. Läs [PRESENTATION-OCH-ROSTNINGSFLODE.md](PRESENTATION-OCH-ROSTNINGSFLODE.md)
3. Granska [ARBETSFLODE.md](ARBETSFLODE.md)

### För IT-ansvariga

1. Börja med [INFRASTRUKTUR-OCH-HOSTING.md](INFRASTRUKTUR-OCH-HOSTING.md)
2. Läs [PRESTANDA-OCH-TEKNISKA-KRAV.md](PRESTANDA-OCH-TEKNISKA-KRAV.md)
3. Granska [AUTENTISERING-OCH-MEDLEMSREGISTER.md](AUTENTISERING-OCH-MEDLEMSREGISTER.md)
4. Läs [ARBETSFLODE.md](ARBETSFLODE.md)

## Status

- ✅ Funktionella krav: Komplett
- ✅ Prestanda och tekniska krav: Komplett
- ✅ Säkerhet och kryptering: Komplett
- ✅ Autentisering och medlemsregister: Komplett
- ✅ Infrastruktur och hosting: Komplett
- ✅ Presentation och röstningsflöde: Komplett
- ✅ Personas och funktioner: Komplett
- ✅ Kostnadsuppskattning: Komplett
- ✅ Arbetsflöde: Komplett
- ✅ UI/UX-krav: Komplett
- ✅ Playfulness och teman: Komplett
- ✅ Autentisering (detaljerad): Komplett

## Nästa steg

- ⏳ GDPR-analys och DPIA (behöver kompletteras)
- ⏳ API-specifikation (behöver skapas)
- ⏳ Databasschema (behöver skapas)
- ⏳ Kryptografisk implementation (behöver detaljeras)

## Bidra

Om du hittar brister eller har förslag på förbättringar, vänligen:

1. Skapa en issue i GitHub
2. Eller skicka pull request med förbättringar
3. Eller kontakta projektledningen

## Licens

Dokumentation: Creative Commons BY-SA 4.0
