# Personas och Funktioner

## 1. Översikt

Detta dokument beskriver alla personas (användarroller) som kommer använda systemet och alla funktioner som respektive persona förväntas kunna utföra på ett årsmöte.

## 2. Persona 1: Ordförande

### 2.1 Beskrivning

Ordföranden leder årsmötet och styr presentationen av dagordning och röstningar. Har ansvar för att mötet genomförs enligt stadgar och att alla beslut fattas korrekt.

### 2.2 Teknisk kompetens

- Medel till hög (varierar)
- Behöver enkelt gränssnitt men med full kontroll
- Kan behöva snabb support under mötet

### 2.3 Funktioner före mötet

1. **Förhandsgranska dagordning**
   - Se hela dagordningen som den kommer presenteras
   - Testa navigering mellan punkter
   - Kontrollera att alla dokument är uppladdade
   - Verifiera att alla röstpunkter är korrekt konfigurerade

2. **Testa projektor-vy**
   - Ansluta till projektor/storskärm
   - Testa att allt visas korrekt
   - Justera textstorlek och färger för optimal läsbarhet
   - Testa övergångar mellan punkter

3. **Granska närvarostatistik**
   - Se antal förtidsröster
   - Se antal inloggade medlemmar
   - Identifiera potentiella problem

4. **Förbereda tal och kommentarer**
   - Läsa igenom alla handlingar
   - Förbereda inledning för varje punkt
   - Notera eventuella diskussionspunkter

5. **Förhandsgranska dagordning**
   - Se hela dagordningen som den kommer presenteras
   - Testa navigering mellan punkter
   - Kontrollera att alla dokument är uppladdade

6. **Testa projektor-vy**
   - Ansluta till projektor/storskärm
   - Testa att allt visas korrekt
   - Justera text

### 2.4 Funktioner under mötet

1. **Öppna och stänga mötet**
   - Klicka "Öppna möte" för att starta
   - Välkomsttext visas på storskärm
   - Klicka "Stäng möte" när alla punkter är avklarade

2. **Navigera genom dagordning**
   - Klicka på agendapunkt för att visa den
   - Använd "Nästa punkt" och "Föregående punkt"
   - Se progress (t.ex. "Punkt 5 av 12")

3. **Presentera dokument**
   - Klicka "Visa dokument" för att visa extra material
   - Bläddra genom slides med "Nästa slide"
   - Dokument visas på storskärm och medlemmarnas enheter

4. **Öppna och stänga röstning**
   - Klicka "Öppna röstning" för att starta nedräkning
   - Se antal röster i realtid (ej resultat)
   - Klicka "Förläng tid" om behövs (+30 sekunder)
   - Klicka "Stäng röstning" manuellt (eller vänta på timer)

5. **Dekryptera och presentera resultat**
   - Systemet dekrypterar automatiskt vid stängning
   - Resultat visas på storskärm med animation
   - Beslut markeras tydligt (Bifallet/Avslagen)

6. **Hantera talarlista**
   - Se lista över medlemmar som begärt ordet
   - Ge ordet till nästa i kö
   - Stänga av mikrofon vid behov

7. **Pausa mötet vid tekniskt haveri**
   - Klicka "Pausa möte" vid problem
   - Systemet sparar alla röster säkert
   - Återuppta när problemet är löst

8. **Övervaka närvarostatistik**
   - Se antal inloggade medlemmar
   - Se antal fysiskt närvarande
   - Se antal digitalt närvarande
   - Se antal som röstat per fråga

### 2.5 Funktioner efter mötet

1. **Granska protokoll**
   - Läsa igenom autogenererat protokoll
   - Verifiera att alla beslut är korrekta
   - Godkänna för justering

2. **Exportera data**
   - Exportera röstlängd för revision
   - Exportera närvarostatistik
   - Exportera beslutslista

## 3. Persona 2: Sekreterare

### 3.1 Beskrivning

Sekreteraren dokumenterar mötet och skapar protokoll. Arbetar parallellt med ordföranden under mötet.

### 3.2 Teknisk kompetens

- Medel (behöver kunna skriva och formatera text)
- Behöver snabbt och responsivt gränssnitt

### 3.3 Funktioner före mötet

1. **Förbereda protokollmall**
   - Granska autogenererad mall
   - Lägga till standardtext (välkomst, etc.)
   - Förbereda närvarolista

2. **Testa protokollverktyg**
   - Verifiera att autosave fungerar
   - Testa export till PDF
   - Testa formatering

### 3.4 Funktioner under mötet

1. **Dokumentera diskussion**
   - Skriva yrkanden i realtid
   - Notera diskussionspunkter
   - Dokumentera särskilda uttalanden

2. **Hantera närvarolista**
   - Lägga till fysiskt närvarande
   - Markera frånvarande
   - Notera ankomsttid för eftersläntrare

3. **Komplettera autogenererade delar**
   - Röstresultat läggs till automatiskt
   - Lägga till kontext och förklaringar
   - Notera eventuella avvikelser

4. **Verifiera beslut**
   - Kontrollera att alla beslut är dokumenterade
   - Verifiera röstresultat mot storskärm
   - Markera beslut som justerade

### 3.5 Funktioner efter mötet

1. **Slutföra protokoll**
   - Läsa igenom och korrekturläsa
   - Lägga till sammanfattning
   - Formatera för publicering

2. **Exportera protokoll**
   - Exportera som PDF med föreningens logotyp
   - Exportera som Markdown för vidare redigering
   - Skicka till justeringspersoner

3. **Arkivera**
   - Spara slutgiltigt protokoll
   - Arkivera bilagor
   - Säkerställa att allt är säkerhetskopierat

## 4. Persona 3: Revisor

### 4.1 Beskrivning

Revisorn granskar föreningens verksamhet och ekonomi. Behöver kunna verifiera att röstningen gått rätt till utan att bryta anonymitet.

### 3.2 Teknisk kompetens

- Låg till medel
- Behöver tydligt gränssnitt för granskning

### 4.3 Funktioner före mötet

1. **Granska systemkonfiguration**
   - Verifiera att säkerhetsmekanismer är aktiverade
   - Kontrollera att kryptering fungerar
   - Granska medlemsregister-integration

2. **Testa verifierbarhet**
   - Testa att kvittokoder fungerar
   - Verifiera att E2E-V är aktiverat
   - Kontrollera revisionsspår

### 4.4 Funktioner under mötet

1. **Övervaka röstning**
   - Se närvarostatistik
   - Övervaka att inga tekniska problem uppstår
   - Verifiera att alla röster räknas

2. **Granska autentisering**
   - Se vilka autentiseringsmetoder som används
   - Kontrollera säkerhetsnivåer
   - Verifiera manuella godkännanden

### 4.5 Funktioner efter mötet

1. **Granska revisionsspår**
   - Se alla autentiseringar (utan att se vad folk röstat)
   - Granska manuella tillägg och godkännanden
   - Verifiera att inga obehöriga fått åtkomst

2. **Verifiera röstresultat**
   - Kontrollera att rösträkningen är korrekt
   - Verifiera att inga röster manipulerats
   - Använda E2E-V för matematisk verifiering

3. **Skriva revisionsberättelse**
   - Dokumentera granskning av röstningssystemet
   - Notera eventuella avvikelser
   - Rekommendera förbättringar

## 5. Persona 4: Ekonomiskt ansvarig (Kassör)

### 5.1 Beskrivning

Kassören ansvarar för föreningens ekonomi och presenterar budget och bokslut på årsmötet.

### 5.2 Teknisk kompetens

- Låg till medel
- Behöver kunna ladda upp dokument

### 5.3 Funktioner före mötet

1. **Ladda upp ekonomiska dokument**
   - Bokslut (PDF)
   - Budget (PDF eller Markdown)
   - Ekonomisk berättelse

2. **Förbereda presentation**
   - Skapa slides för presentation
   - Förbereda svar på vanliga frågor

### 5.4 Funktioner under mötet

1. **Presentera ekonomi**
   - Följa med när ordföranden visar ekonomiska dokument
   - Svara på frågor från medlemmar
   - Begära ordet vid behov

2. **Rösta**
   - Delta i röstning som vanlig medlem
   - Rösta om ansvarsfrihet (om inte själv berörd)

### 5.5 Funktioner efter mötet

1. **Arkivera beslut**
   - Spara beslut om budget
   - Spara beslut om ansvarsfrihet
   - Uppdatera ekonomisystem

## 6. Persona 5: Deltagare/Medlem

### 6.1 Beskrivning

Vanlig medlem som deltar i mötet, läser handlingar och röstar. Kan vara fysiskt närvarande eller delta på distans.

### 6.2 Teknisk kompetens

- Varierar (låg till hög)
- Behöver mycket enkelt och intuitivt gränssnitt

### 6.3 Funktioner före mötet

1. **Logga in**
   - Välja autentiseringsmetod (Freja eID+, Magic Link, etc.)
   - Autentisera och verifiera medlemskap
   - Komma till startsida

2. **Läsa handlingar**
   - Navigera genom dagordning
   - Läsa verksamhetsberättelse
   - Läsa revisionsberättelse
   - Läsa budget och propositioner
   - Läsa kandidatpresentationer

3. **Avge förtidsröst**
   - Rösta på alla punkter
   - Rangordna kandidater (STV)
   - Få kvittokod för verifiering

4. **Ändra förtidsröst**
   - Logga in igen
   - Navigera till "Mina röster"
   - Ändra röst (obegränsat antal gånger)

### 6.4 Funktioner under mötet

1. **Följa mötet**
   - Se samma dagordningspunkt som visas på storskärm
   - Automatisk synkronisering med ordförandens vy
   - Bläddra fritt i dokument (oberoende av ordföranden)

2. **Delta i röstning**
   - Röstgränssnitt visas automatiskt när röstning öppnas
   - Klicka Ja, Nej, eller Avstår
   - Ändra röst fram till stängning
   - Få bekräftelse och kvittokod

3. **Begära ordet**
   - Klicka "Begära ordet"
   - Se position i kö
   - Ångra begäran om någon annan redan sagt samma sak

4. **Använda mobil som mikrofon**
   - Aktivera mikrofon när ordet ges
   - Tala via mobilen (för distansdeltagare)
   - Stänga av mikrofon när klar

5. **Se resultat**
   - Resultat visas automatiskt när röstning stängs
   - Verifiera egen röst med kvittokod
   - Se beslut (Bifallet/Avslagen)

### 6.5 Funktioner efter mötet

1. **Verifiera röster**
   - Använda kvittokod för att verifiera att rösten räknats
   - Kontrollera att inga röster manipulerats

2. **Läsa protokoll**
   - Läsa publicerat protokoll
   - Verifiera att beslut är korrekta

## 7. Persona 6: Valberedning

### 7.1 Beskrivning

Valberedningen nominerar kandidater och presenterar förslag på styrelse och andra förtroendeuppdrag.

### 7.2 Teknisk kompetens

- Medel
- Behöver kunna hantera kandidater och presentationer

### 7.3 Funktioner före mötet

1. **Lägga upp kandidater**
   - Skapa kandidatprofiler
   - Ladda upp profilbilder
   - Skriva presentationer
   - Välja position (Ordförande, Kassör, etc.)

2. **Hantera nomineringar**
   - Ta emot nomineringar från medlemmar
   - Kontakta nominerade
   - Verifiera att kandidater accepterar nominering

3. **Välja valmetod**
   - Välja STV, Godkännanderöstning, eller Enkel majoritet
   - Konfigurera antal platser
   - Testa valmetod

4. **Förbereda presentation**
   - Skapa slides för presentation av kandidater
   - Förbereda motiveringar

### 7.4 Funktioner under mötet

1. **Presentera kandidater**
   - Följa med när ordföranden visar kandidater
   - Svara på frågor om kandidater
   - Motivera valberedningens förslag

2. **Övervaka personval**
   - Se antal röster i realtid
   - Verifiera att röstningen går rätt till

3. **Presentera resultat**
   - Granska resultat innan presentation
   - Förklara valmetod om frågor uppstår

### 7.5 Funktioner efter mötet

1. **Kontakta valda**
   - Informera valda kandidater
   - Informera ej valda kandidater
   - Tacka alla kandidater för deltagande

2. **Arkivera**
   - Spara kandidatpresentationer
   - Spara valresultat
   - Dokumentera process för nästa år

## 8. Persona 7: Super admin/Teknisk ansvarig

### 8.1 Beskrivning

IT-ansvarig som sätter upp och underhåller systemet. Har full teknisk kontroll men ingen tillgång till röstdata.

### 8.2 Teknisk kompetens

- Hög
- Behöver kunna hantera servrar, databaser och säkerhet

### 8.3 Funktioner före första användning

1. **Installera systemet**
   - Ladda ner och installera Docker
   - Klona Git-repository
   - Konfigurera miljövariabler
   - Starta systemet

2. **Konfigurera förening**
   - Föreningsnamn och logotyp
   - Färgtema och språk
   - Medlemsregister-integration
   - Autentiseringsmetoder

3. **Sätta upp backup**
   - Konfigurera automatiska backups
   - Testa återställning
   - Sätta upp off-site backup

4. **Konfigurera övervakning**
   - Sätta upp Prometheus + Grafana
   - Konfigurera alerts
   - Testa notifikationer

### 8.4 Funktioner före varje möte

1. **Verifiera systemhälsa**
   - Kontrollera att alla tjänster är igång
   - Verifiera backup-status
   - Testa nätverksanslutning

2. **Uppdatera system**
   - Installera säkerhetsuppdateringar
   - Testa nya versioner i staging
   - Deployer till produktion

3. **Förbereda support**
   - Vara tillgänglig under mötet
   - Förbereda felsökningsguide
   - Ha backup-plan redo

### 8.5 Funktioner under mötet

1. **Övervaka system**
   - Följa dashboards i realtid
   - Reagera på alerts
   - Lösa tekniska problem

2. **Ge support**
   - Hjälpa medlemmar med inloggning
   - Lösa tekniska problem
   - Kommunicera med ordförande vid problem

3. **Hantera tekniskt haveri**
   - Pausa mötet vid behov
   - Återställa system från backup
   - Dokumentera problem och lösningar

### 8.6 Funktioner efter mötet

1. **Verifiera backup**
   - Kontrollera att mötet är säkerhetskopierat
   - Testa återställning
   - Arkivera på flera platser

2. **Analysera prestanda**
   - Granska loggar
   - Analysera responstider
   - Identifiera flaskhalsar

3. **Dokumentera**
   - Dokumentera tekniska problem
   - Uppdatera felsökningsguide
   - Föreslå förbättringar

## 9. Persona 8: Mötessamordnare (Styrelserepresentant)

### 9.1 Beskrivning

Styrelserepresentant som skapar möten och bygger dagordning. Ofta sekreterare eller vice ordförande.

### 9.2 Teknisk kompetens

- Medel
- Behöver kunna hantera dokument och dagordning

### 9.3 Funktioner före mötet

1. **Skapa möte**
   - Fylla i mötesinfo (namn, datum, tid, plats)
   - Välja mötestyp (Årsmöte, Extra årsmöte, etc.)

2. **Bygg dagordning**
   - Använda standardmall eller skapa från scratch
   - Lägga till agendapunkter med drag-and-drop
   - Konfigurera röstpunkter (valmetod, tidsgräns)

3. **Ladda upp handlingar**
   - Ladda upp PDF eller Markdown-filer
   - Koppla dokument till agendapunkter
   - Förhandsgranska hur det kommer visas

4. **Aktivera förtidsröstning**
   - Klicka "Aktivera förtidsröstning"
   - Skicka kallelse till alla medlemmar
   - Övervaka förtidsröstning

### 9.4 Funktioner under mötet

1. **Övervaka mötet**
   - Följa med i ordförandens vy
   - Se närvarostatistik
   - Vara beredd att hjälpa till vid problem

2. **Stödja ordförande**
   - Hjälpa med tekniska frågor
   - Hantera dokument vid behov

### 9.5 Funktioner efter mötet

1. **Arkivera möte**
   - Markera möte som avslutat
   - Verifiera att allt är sparat
   - Exportera data för arkivering

## 10. Persona 9: Valkommitté

### 10.1 Beskrivning

Valkommittén verifierar medlemmar och hanterar manuella godkännanden. Arbetar ofta vid entrén på fysiska möten.

### 10.2 Teknisk kompetens

- Låg till medel
- Behöver enkelt gränssnitt för godkännanden

### 10.3 Funktioner före mötet

1. **Förbereda medlemslista**
   - Granska medlemsregister
   - Identifiera potentiella problem
   - Förbereda QR-koder för kända problem

2. **Testa QR-kod-generering**
   - Generera test-QR-kod
   - Testa scanning med mobil
   - Verifiera att inloggning fungerar

### 10.4 Funktioner under mötet

1. **Registrera fysiskt närvarande**
   - Verifiera ID-kort
   - Generera QR-kod för medlem
   - Medlem skannar och loggar in

2. **Hantera väntande godkännanden**
   - Se lista över medlemmar som begärt åtkomst
   - Verifiera medlemskap manuellt
   - Godkänna eller avslå

3. **Manuellt lägga till medlemmar**
   - Fylla i formulär för ny medlem
   - Välja autentiseringsmetod
   - Generera åtkomstkod (Magic Link, QR-kod, lösenord)

4. **Hantera tekniska problem**
   - Hjälpa medlemmar som glömt lösenord
   - Generera nya QR-koder
   - Återautentisera medlemmar

5. **Övervaka säkerhetsnivåer**
   - Se säkerhetsöversikt
   - Reagera på varningar om låg säkerhet
   - Dokumentera manuella godkännanden

### 10.5 Funktioner efter mötet

1. **Exportera röstlängd**
   - Exportera för revision
   - Verifiera att alla godkännanden är dokumenterade
   - Arkivera för protokoll

2. **Dokumentera specialfall**
   - Dokumentera alla manuella godkännanden
   - Notera anledningar
   - Föreslå förbättringar för nästa möte
