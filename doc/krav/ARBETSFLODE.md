# Arbetsflöde och Användning

## 1. Fas 1: Plattformsuppsättning (Görs en gång)

### 1.1 Installation

1. **Ladda ner systemet**
   - Klona Git-repository eller ladda ner release
   - Verifiera checksumma för säkerhet

2. **Konfigurera miljö**
   - Kopiera `.env.example` till `.env`
   - Generera säkra nycklar (automatiskt vid första start)
   - Konfigurera databas-anslutning

3. **Starta systemet**
   - Kör `docker-compose up -d`
   - Verifiera att alla containrar är igång
   - Öppna webbläsare och gå till `http://localhost:3000`

### 1.2 Initial konfiguration

1. **Superadmin loggar in**
   - Första användaren blir automatiskt superadmin
   - Skapa starkt lösenord + aktivera MFA

2. **Föreningsinställningar**
   - Föreningsnamn: "Mensa Sverige"
   - Logotyp: Ladda upp SVG eller PNG
   - Färgtema: Välj från 13+ fördefinierade mallar eller anpassa
   - Språk: Svenska (primär), Engelska (sekundär)

3. **Medlemsregister-integration**
   - Välj metod: CSV, API, Directory Services, eller Hybrid
   - Om API: Konfigurera OAuth2-credentials
   - Om Directory Services: Konfigurera LDAP/SAML
   - Testa anslutning

4. **Autentiseringsmetoder**
   - Aktivera Freja eID+ (rekommenderat för svenska medlemmar)
   - Aktivera SSO (om Directory Services används)
   - Aktivera Magic Link (fallback)
   - Aktivera QR-kod (för fysiska möten)
   - Konfigurera MFA-krav (valfritt)

5. **E-postkonfiguration**
   - Välj e-posttjänst: SendGrid, Mailgun, Amazon SES, eller egen SMTP
   - Konfigurera API-nycklar eller SMTP-credentials
   - Testa e-postutskick

6. **Backup-konfiguration**
   - Konfigurera automatiska backups (dagligen kl 03:00)
   - Välj lagringsplats: Lokal disk, NAS, molnlagring
   - Testa återställning från backup

## 2. Fas 2: Förberedelser inför årsmötet (Senast 4 veckor innan)

### 2.1 Skapa årsmöte

1. **Mötessamordnare loggar in**
   - Navigera till "Skapa nytt möte"
   - Fyll i: Mötesnamn, Datum, Tid, Plats
   - Välj mötestyp: Årsmöte, Extra årsmöte, Styrelsemöte

2. **Bygg dagordning**
   - Använd standardmall (genereras automatiskt enligt stadgar)
   - Eller bygg från scratch med drag-and-drop
   - Lägg till agendapunkter:
     - Typ: Informativ eller Röstpunkt
     - Titel och beskrivning
     - Valmetod (för röstpunkter): Enkel majoritet, Absolut majoritet, STV, etc.
     - Tidsgräns för röstning: 30s, 60s, 90s, 120s

3. **Ladda upp handlingar**
   - Verksamhetsberättelse (Markdown eller PDF)
   - Revisionsberättelse (PDF)
   - Budget (Markdown eller PDF)
   - Propositioner (Markdown eller PDF)
   - Andra bilagor

4. **Koppla dokument till agendapunkter**
   - Dra och släpp dokument till respektive punkt
   - Förhandsgranska hur det kommer visas

### 2.2 Lägg upp kandidater (Valkommittén)

1. **Valkommittén loggar in**
   - Navigera till "Kandidathantering"

2. **Lägg till kandidat**
   - Namn, E-post, Telefon
   - Position: Ordförande, Kassör, Ledamot, etc.
   - Profilbild: Ladda upp och beskär
   - Presentation: Markdown-text (max 500 ord)
   - Förhandsgranska kandidatkort

3. **Välj valmetod**
   - För varje personval: Välj STV, Godkännanderöstning, eller Enkel majoritet
   - Konfigurera antal platser (t.ex. 3 ledamöter)

4. **Testa systemet**
   - Skapa testmöte
   - Testa alla funktioner
   - Verifiera att allt fungerar

### 2.3 Aktivera förtidsröstning

1. **Mötessamordnare aktiverar förtidsröstning**
   - Klicka "Aktivera förtidsröstning"
   - Bekräfta: "Förtidsröstning öppnas samtidigt som andra kallelsen skickas"

2. **Systemet skickar kallelse**
   - E-post till alla medlemmar
   - Innehåller: Mötesinfo, Länk till handlingar, Länk till förtidsröstning
   - Påminnelse skickas 1 vecka innan mötet

## 3. Fas 3: Förtidsröstning pågår (4 veckor innan mötet)

### 3.1 Medlemmar loggar in

1. **Medlem får e-post med kallelse**
   - Klickar på länk i e-post
   - Omdirigeras till inloggningssida

2. **Medlem loggar in**
   - Väljer autentiseringsmetod: Freja eID+, SSO, Magic Link, etc.
   - Autentiseras och verifieras mot medlemsregister
   - Omdirigeras till startsida

3. **Medlem läser handlingar**
   - Navigerar genom dagordning
   - Läser verksamhetsberättelse, budget, etc.
   - Läser kandidatpresentationer

4. **Medlem avger förtidsröst**
   - Klickar på "Rösta" för varje punkt
   - Väljer Ja, Nej, eller Avstår
   - För personval: Rangordnar kandidater (STV) eller godkänner flera (Approval)
   - Bekräftelse: "Din röst är sparad och krypterad"
   - Kvittokod visas: "ABC123XYZ"

5. **Medlem kan ändra sin röst**
   - Loggar in igen
   - Navigerar till "Mina röster"
   - Klickar "Ändra röst"
   - Lägger ny röst (ersätter automatiskt den gamla)

### 3.2 Valkommittén hanterar specialfall

1. **Internationell medlem begär åtkomst**
   - Medlem fyller i formulär: Namn, Medlemsnummer, E-post, Land
   - Valkommittén får notifikation

2. **Valkommittén verifierar medlem**
   - Kontrollerar medlemskap i medlemsregister
   - Godkänner medlem
   - Väljer autentiseringsmetod: Magic Link eller QR-kod
   - Systemet skickar åtkomst till medlem

3. **Sent betald medlem kontaktar valkommittén**
   - Valkommittén verifierar betalning manuellt
   - Lägger till medlem i systemet
   - Genererar Magic Link eller QR-kod
   - Medlem kan nu logga in och rösta

## 4. Fas 4: Genomförande av årsmötet (Live)

### 4.1 Förberedelser (1 timme innan)

1. **Teknisk ansvarig förbereder utrustning**
   - Ansluter laptop till projektor/storskärm
   - Testar projektor-vy
   - Verifierar nätverksanslutning
   - Startar övervakningsdashboard

2. **Valkommittén öppnar registrering**
   - Sätter upp QR-kod-station vid entrén
   - Verifierar fysiskt närvarande medlemmar
   - Genererar QR-koder för de som behöver

3. **Ordförande loggar in**
   - Öppnar ordförandegränssnitt
   - Aktiverar projektor-vy på storskärm
   - Verifierar att allt fungerar

4. **Sekreterare loggar in**
   - Öppnar protokollverktyg
   - Förbereder närvarolista

### 4.2 Mötet börjar

1. **Ordförande öppnar mötet**
   - Klickar "Öppna möte"
   - Välkomsttext visas på storskärm
   - Närvarostatistik visas: "187 inloggade, 145 fysiskt, 42 digitalt"

2. **Ordförande går igenom dagordning**
   - Klickar på första agendapunkten
   - Punkten visas på storskärm och på alla medlemmars enheter
   - Ordförande läser upp punkten

3. **För informativa punkter**
   - Ordförande klickar "Visa dokument"
   - Dokument visas på storskärm
   - Medlemmar kan läsa på sina enheter
   - Ordförande klickar "Nästa slide" för att bläddra

4. **För röstpunkter**
   - Ordförande öppnar för diskussion
   - Medlemmar kan begära ordet via appen
   - Ordförande ger ordet till medlemmar i kö

### 4.3 Röstning

1. **Ordförande öppnar röstning**
   - Klickar "Öppna röstning"
   - Bekräftar: "Öppna röstning för [Agendapunkt]?"
   - Nedräkningstimer startar (t.ex. 60 sekunder)

2. **På storskärm visas**
   - Stor timer: "00:59... 00:58... 00:57..."
   - Antal röster mottagna: "147 av 203 har röstat (72%)"
   - Ingen information om hur folk röstat

3. **Medlemmar röstar**
   - Röstgränssnitt visas automatiskt på alla enheter
   - Medlem klickar Ja, Nej, eller Avstår
   - Bekräftelse: "Din röst är registrerad"
   - Medlem kan ändra sin röst fram till tiden tar slut

4. **Tiden tar slut**
   - Timer når 00:00
   - Röstning stängs automatiskt
   - Systemet väntar 2 sekunder (för nätverksfördröjning)
   - Meddelande: "Väntar på sista röster... 2s"

5. **Dekryptering och rösträkning**
   - Ordförande dekrypterar valurnan (automatiskt med sin nyckel)
   - Systemet räknar röster enligt vald metod
   - Resultat beräknas

6. **Resultat presenteras**
   - Resultat visas på storskärm med animation
   - Stapeldiagram eller cirkeldiagram
   - Exakta siffror: Ja: 145 (71%), Nej: 42 (21%), Avstår: 16 (8%)
   - Beslut: "✅ BIFALLET" eller "❌ AVSLAGEN"
   - Resultat förs automatiskt till protokollet

### 4.4 Sekreterare kompletterar protokoll

1. **Automatisk generering**
   - Agendapunkt läggs till automatiskt
   - Röstresultat förs in automatiskt
   - Tidsstämplar läggs till

2. **Manuell komplettering**
   - Sekreterare lägger till yrkanden
   - Diskussionspunkter
   - Särskilda uttalanden
   - Närvarolista

### 4.5 Mötet avslutas

1. **Ordförande stänger mötet**
   - Klickar "Stäng möte"
   - Bekräftar: "Mötet är avslutat"

2. **Sekreterare exporterar protokoll**
   - Klickar "Exportera som PDF"
   - Protokoll genereras med föreningens logotyp
   - Skickas till styrelsen för justering

## 5. Fas 5: Efterarbete

### 5.1 Protokoll och arkivering

1. **Justering av protokoll**
   - Justeringspersoner granskar protokoll
   - Eventuella ändringar görs
   - Protokoll signeras digitalt eller fysiskt

2. **Publicering**
   - Protokoll publiceras på föreningens webbplats
   - E-post skickas till alla medlemmar

3. **Arkivering**
   - Mötet arkiveras i systemet
   - Koppling mellan person och röst raderas permanent
   - Endast aggregerad data sparas (för statistik)

### 5.2 Backup och revision

1. **Backup**
   - Automatisk backup av mötet
   - Sparas på flera platser (lokal, extern, moln)

2. **Revisionsspår**
   - Röstlängd exporteras för revision
   - Loggar sparas för granskning
   - Revisor kan verifiera att allt gått rätt till

### 5.3 Utvärdering

1. **Samla feedback**
   - Skicka enkät till medlemmar
   - Frågor: Hur var användarupplevelsen? Tekniska problem? Förbättringsförslag?

2. **Analysera resultat**
   - Valdeltagande jämfört med tidigare år
   - Tekniska problem och lösningar
   - Förbättringsområden

3. **Dokumentera lärdomar**
   - Uppdatera dokumentation
   - Förbättra systemet inför nästa möte

## 6. Kontinuerlig drift

### 6.1 Underhåll

- **Säkerhetsuppdateringar**: Installeras automatiskt eller manuellt
- **Backup-verifiering**: Testa återställning varje kvartal
- **Övervakning**: Kontrollera dashboards regelbundet

### 6.2 Support

- **Medlemssupport**: E-post eller telefon under mötet
- **Teknisk support**: IT-ansvarig tillgänglig under mötet
- **Dokumentation**: Uppdatera FAQ baserat på vanliga frågor

### 6.3 Förbättringar

- **Feature requests**: Samla önskemål från medlemmar
- **Bugfixar**: Åtgärda rapporterade problem
- **Uppdateringar**: Installera nya versioner av systemet
