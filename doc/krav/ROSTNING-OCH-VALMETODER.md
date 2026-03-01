# Röstning och Valmetoder

## 1. STV-röstning (Single Transferable Vote)

### 1.1 Översikt

STV (Single Transferable Vote) eller "Enkel överförbar röst" är en valmetod där väljare rangordnar kandidater enligt preferens. Om ingen kandidat får majoritet överförs röster från kandidaten med minst röster till väljarnas andrahandsval.

### 1.2 Algoritm

#### 1.2.1 Steg-för-steg-process

1. **Räkna förstahandsröster**: Räkna hur många förstahandsröster varje kandidat fått
2. **Kontrollera majoritet**: Om en kandidat har > 50% av rösterna, vinner den kandidaten
3. **Eliminera sista kandidat**: Om ingen har majoritet, eliminera kandidaten med minst röster
4. **Överför röster**: Överför röster från eliminerad kandidat till väljarnas andrahandsval
5. **Upprepa**: Upprepa steg 2-4 tills en kandidat har majoritet

#### 1.2.2 Exempel

**Scenario**: 3 kandidater (A, B, C), 100 röster

**Omgång 1 - Förstahandsröster:**

- Kandidat A: 45 röster
- Kandidat B: 30 röster
- Kandidat C: 25 röster

Ingen har majoritet (> 50). Kandidat C elimineras.

**Omgång 2 - Efter överföring:**

- Kandidat A: 45 + 10 (från C) = 55 röster
- Kandidat B: 30 + 15 (från C) = 45 röster

Kandidat A har majoritet och vinner.

### 1.3 Implementation

#### 1.3.1 Datastruktur

```javascript
{
  "question_id": "q_001",
  "candidates": ["A", "B", "C"],
  "votes": [
    {"voter_id": "v1", "ranking": ["A", "B", "C"]},
    {"voter_id": "v2", "ranking": ["B", "A", "C"]},
    // ...
  ]
}
```

#### 1.3.2 Algoritm-implementation

```javascript
function calculateSTV(votes, candidates) {
  let remainingCandidates = [...candidates];
  let rounds = [];

  while (true) {
    // Räkna röster för varje kandidat
    let counts = countVotes(votes, remainingCandidates);
    rounds.push({ ...counts });

    // Kontrollera om någon har majoritet
    let totalVotes = Object.values(counts).reduce((a, b) => a + b, 0);
    let majority = totalVotes / 2;

    for (let candidate of remainingCandidates) {
      if (counts[candidate] > majority) {
        return {
          winner: candidate,
          rounds: rounds,
          finalCount: counts,
        };
      }
    }

    // Eliminera kandidat med minst röster
    let minCandidate = findMinCandidate(counts);
    remainingCandidates = remainingCandidates.filter((c) => c !== minCandidate);

    // Om bara en kandidat kvar
    if (remainingCandidates.length === 1) {
      return {
        winner: remainingCandidates[0],
        rounds: rounds,
        finalCount: counts,
      };
    }
  }
}
```

### 1.4 Oavgjort val

#### 1.4.1 Definition

Ett val är oavgjort om två eller flera kandidater har exakt lika antal röster i alla kategorier (förstahandsval, andrahandsval, etc.).

#### 1.4.2 Hantering

1. **Systemet upptäcker oavgjort val**: Automatisk detektion
2. **Information till valkommitté**: Tydlig information om att valet är oavgjort
3. **Kandidaternas råd**: Valkommittén tar råd från kandidaterna
4. **Beslut**: Valkommittén beslutar om lottning eller nytt val
5. **Lottning**: Om lottning, transparent process med dokumenterad slumpgenerator
6. **Dokumentation**: Allt dokumenteras i protokollet

#### 1.4.3 Lottning

**Transparent slumpgenerator:**

```javascript
// Använd kryptografiskt säker slumpgenerator
const crypto = require("crypto");

function drawLot(candidates) {
  // Generera slumptal för varje kandidat
  let draws = candidates.map((c) => ({
    candidate: c,
    random: crypto.randomBytes(32).toString("hex"),
  }));

  // Sortera baserat på slumptal
  draws.sort((a, b) => a.random.localeCompare(b.random));

  // Första kandidaten vinner
  return {
    winner: draws[0].candidate,
    draws: draws,
    timestamp: new Date().toISOString(),
  };
}
```

### 1.5 Observatörsrätt

#### 1.5.1 Kandidaters rätt

Varje kandidat eller grupp av kandidater har rätt att utse en observatör som får särskild åtkomst.

#### 1.5.2 Observatörens åtkomst

- **Se rösträkning i realtid**: Observatör kan se hur röster räknas (men inte vem som röstat på vad)
- **Exportera rösträkningsdata**: Observatör kan exportera data för egen verifiering
- **Ställa frågor**: Observatör kan ställa frågor till valkommitté under rösträkning
- **Loggning**: Alla observatörers åtkomst loggas

#### 1.5.3 Teknisk implementation

- **Särskild observatörroll**: Observatör får särskild roll i systemet
- **Begränsad åtkomst**: Observatör kan inte se koppling mellan person och röst
- **Realtidsvy**: Observatör ser samma vy som valkommittén
- **Export**: Observatör kan exportera anonymiserad rösträkningsdata

### 1.6 Publicering av resultat

#### 1.6.1 Vad som publiceras

- **Antal röster per kandidat**: I varje omgång av STV
- **Överföringar**: Hur röster överfördes mellan kandidater
- **Slutresultat**: Vinnande kandidat och slutliga röstetal
- **Metadata**: Datum, tid, antal röstande

#### 1.6.2 Till vem

Resultat ska publiceras till:

- **Styrelsen**: Omedelbart efter rösträkning
- **Redaktören**: För publicering i medlemstidning
- **Alla kandidater**: Inom 2 veckor efter mötet
- **Alla medlemmar**: Via hemsida och protokoll

#### 1.6.3 Format

- **Protokoll**: Resultat inkluderas i protokollet
- **E-post**: Automatisk distribution via e-post
- **Hemsida**: Publicering på föreningens heram\*\*: Visa röstetal per kandidat i varje omgång
- **Flödesdiagram**: Visa hur röster överförs mellan kandidater
- **Animering**: Animera överföringen av röster
- **Färgkodning**: Olika färger för olika kandidater

#### 1.7.3 Förklaring

- **Textförklaring**: Förklara vad som händer i varje steg
- **Hjälptext**: Hjälptext om hur STV fungerar
- **Exempel**: Exempel på STV-röstning
- **FAQ**: Vanliga frågor om STV

## 2. Andra valmetoder

### 2.1 Enkel majoritet (Plurality)

- **Beskrivning**: Flest röster vinner
- **Användning**: Enkla Ja/Nej-frågor
- **Implementation**: Räkna röster, kandidat med flest vinner
- **Visualisering**: Stapeldiagram med röstetal

### 2.2 Absolut majoritet (>50%)

- **Beskrivning**: Kräver mer än hälften av rösterna
- **Användning**: Viktiga beslut som kräver bred uppslutning
- **Implementation**: Räkna röster, kontrollera om > 50%
- **Om ingen majoritet**: Nytt val eller omröstning

### 2.3 Kvalificerad majoritet (2/3 eller annat)

- **Beskrivning**: Kräver 2/3 eller annan andel av rösterna
- **Användning**: Stadgeändringar, viktiga beslut
- **Implementation**: Räkna röster, kontrollera om tröskelvärde uppnås
- **Konfigurerbar**: Tröskelvärde konfigurerbart per fråga

### 2.4 Godkännanderöstning (Approval Voting)

- **Beskrivning**: Väljaren godkänner flera kandidater
- **Användning**: Val med många kandidater
- **Implementation**: Väljare väljer alla kandidater de godkänner, kandidat med flest godkännanden vinner
- **Visualisering**: Stapeldiagram med antal godkännanden

### 2.5 Schulze-metoden (Condorcet)

- **Beskrivning**: Rangordning med simulerade dueller mellan kandidater
- **Användning**: Komplexa val med många kandidater
- **Implementation**: Komplex algoritm, kräver noggrann implementation
- **Visualisering**: Matris med dueller mellan kandidater

## 3. Valkommitténs roll

### 3.1 Ansvar

Valkommittén är ansvarig för:

- **Utse oberoende grupp**: För rösträkning (kan vara valkommittén själva)
- **Testa systemet**: Före mötet
- **Hantera kandidater**: Lägga upp kandidater och deras presentationer
- **Övervaka röstning**: Under mötet
- **Räkna röster**: Eller övervaka automatisk rösträkning
- **Intyga resultat**: Intyga att rösträkning är korrekt
- **Publicera resultat**: Enligt stadgarna

### 3.2 Gränssnitt för valkommitté

#### 3.2.1 Före mötet

- **Lägg upp kandidater**: Namn, e-post, position, profilbild, presentation
- **Välj valmetod**: STV, enkel majoritet, etc.
- **Konfigurera röstning**: Tidsgräns, quorum, etc.
- **Testa systemet**: Genomför testval
- **Granska kandidater**: Godkänn eller avslå kandidater

#### 3.2.2 Under mötet

- **Övervaka röstning**: Se antal röster i realtid
- **Hantera observatörer**: Ge observatörer åtkomst
- **Hantera tekniska problem**: Vid behov
- **Räkna röster**: Eller övervaka automatisk rösträkning

#### 3.2.3 Efter mötet

- **Intyga resultat**: Signera resultat digitalt
- **Publicera resultat**: Till styrelsen, kandidater, medlemmar
- **Dokumentera**: Eventuella problem eller avvikelser
- **Arkivera**: Rösträkningsdata

### 3.3 Oberoende rösträkning

#### 3.3.1 Utse oberoende grupp

- **Valkommittén själva**: Vanligast
- **Externa personer**: Vid behov av extra oberoende
- **Krav**: Gruppen ska vara opartisk och kompetent

#### 3.3.2 Oberoende gruppens åtkomst

- **Särskild åtkomst**: Till systemet för rösträkning
- **Verifiera rösträkning**: Oberoende av systemet (manuell kontroll)
- **Dokumentera granskning**: Skriftlig dokumentation
- **Intyga resultat**: Signera resultat

### 3.4 Förtidsröstning

#### 3.4.1 Övervakning

- **Antal förtidsröster**: Valkommittén kan se antal (men inte innehåll)
- **Ingen förhandsvisning**: Valkommittén kan INTE se resultat före klubbslag
- **Säkerhet**: Förtidsröster krypterade tills klubbslag

#### 3.4.2 Makulering

Vid manuell röstning under mötet:

- **Registrera fysiskt närvarande**: Valkommittén registrerar vem som är på plats
- **Makulera förtidsröst**: Systemet makulerar automatiskt förtidsröst för fysiskt närvarande
- **Dokumentera**: Alla makuleringar dokumenteras

### 3.5 Testning

#### 3.5.1 Obligatorisk testning

Valkommittén ska testa systemet minst 2 veckor före mötet:

- **Autentisering**: Testa alla autentiseringsmetoder
- **Röstning**: Testa alla valmetoder
- **Rösträkning**: Testa rösträkning och resultatpresentation
- **Protokollgenerering**: Testa protokollgenerering

#### 3.5.2 Dokumentation

- **Testprotokoll**: Dokumentera alla tester
- **Problem**: Dokumentera eventuella problem
- **Rapportera**: Rapportera till styrelsen
- **Godkännande**: Systemet får inte användas om kritiska problem upptäcks

## 4. Ombudsmannens roll

### 4.1 Ansvar

Ombudsman är ansvarig för:

- **Granska verksamheten**: Kontrollera att föreningen följer stadgarna
- **Hantera klagomål**: Ta emot och utreda klagomål från medlemmar
- **Granska systemet**: Kontrollera att röstningssystemet följer stadgarna
- **Rapportera**: Rapportera till årsmötet

### 4.2 Tillgång till systemet

#### 4.2.1 Ombudsmannaroll

- **Särskild roll**: Ombudsman har särskild roll med läsrättigheter
- **Tillgång till loggar**: Kan se alla loggar (men inte koppling mellan person och röst)
- **Administrativa ändringar**: Kan se alla administrativa ändringar
- **Export**: Kan exportera data för granskning

#### 4.2.2 Begränsningar

- **Ingen koppling person-röst**: Ombudsman kan INTE se vem som röstat på vad
- **Endast läsrättigheter**: Ombudsman kan inte ändra data
- **Loggning**: Ombudsmannens åtkomst loggas

### 4.3 Granskning av loggar

#### 4.3.1 Regelbunden granskning

- **Efter årsmöte**: Ombudsman granskar loggar efter varje årsmöte
- **Vid klagomål**: Ombudsman granskar loggar vid klagomål
- **Dokumentation**: Ombudsman dokumenterar sin granskning

#### 4.3.2 Vad granskas

- **Autentiseringar**: Kontrollera att autentisering fungerat korrekt
- **Administrativa ändringar**: Kontrollera att ändringar är korrekta
- **Röstningar**: Kontrollera att röstningar genomförts korrekt
- **Systemfel**: Kontrollera att systemfel hanterats korrekt

### 4.4 Hantering av klagomål

#### 4.4.1 Process

1. **Medlem lämnar klagomål**: Till ombudsman
2. **Ombudsman utreder**: Granskar loggar och data
3. **Ombudsman dokumenterar**: Utredning och resultat
4. **Ombudsman rapporterar**: Till styrelsen och/eller årsmötet

#### 4.4.2 Tillgång till data

- **All data som behövs**: Ombudsman har tillgång till all data som behövs för utredning
- **Anonymitet bevaras**: Ombudsman kan inte se koppling mellan person och röst
- **Dokumentation**: Alla klagomål och utredningar dokumenteras

### 4.5 Rapportering

#### 4.5.1 Årsrapport

Ombudsman ska i sin årsrapport rapportera om:

- **Systemets användning**: Hur systemet använts under året
- **Antal klagomål**: Antal klagomål och hur de hanterats
- **Problem**: Eventuella problem med systemet
- **Rekommendationer**: Rekommendationer för förbättringar
- **Stadgeefterlevnad**: Bedömning om systemet följer stadgarna

#### 4.5.2 Presentation

- **Vid årsmöte**: Ombudsman presenterar sin rapport vid årsmötet
- **Tillgänglig för medlemmar**: Rapporten ska vara tillgänglig för alla medlemmar
- **Frågor**: Medlemmar kan ställa frågor till ombudsman

## 5. Formella krav på mötet

### 5.1 Mötets öppnande

#### 5.1.1 Process

1. **Ordförande klickar "Öppna möte"**: I systemet
2. **Systemet registrerar tidpunkt**: Exakt tidpunkt för öppnande
3. **Välkomstmeddelande**: Visas för alla deltagare
4. **Aktivera röstning**: Om digital röstning, aktiveras möjlighet att rösta
5. **Dokumentation**: Mötets öppnande dokumenteras i protokollet

#### 5.1.2 Information som visas

- **Välkommen**: Välkomstmeddelande
- **Dagordning**: Länk till dagordning
- **Mötesregler**: Länk till mötesregler
- **Support**: Hur man får hjälp vid tekniska problem

### 5.2 Dagordningens godkännande

#### 5.2.1 Process

1. **Dagordning visas**: För alla deltagare
2. **Ordförande begär godkännande**: "Godkänner mötet dagordningen?"
3. **Omröstning**: Om konfigurerat, genomförs omröstning
4. **Om godkänd**: Mötet fortsätter enligt dagordning
5. **Om inte godkänd**: Möjlighet att föreslå ändringar (om tillåtet enligt stadgarna)
6. **Dokumentation**: Godkänd dagordning dokumenteras i protokollet

#### 5.2.2 Ändringar i dagordning

- **Konfigurerbart**: Om föreningen tillåter ändringar på mötet
- **Om tillåtet**: Medlem kan föreslå ändring, mötet röstar
- **Om inte tillåtet**: Dagordning kan inte ändras (enligt föreningens stadgar)
- **Dokumentation**: Alla ändringar dokumenteras

### 5.3 Röstlängdens fastställande

#### 5.3.1 Process

1. **Systemet visar statistik**:
   - Antal röstberättigade medlemmar
   - Antal inloggade medlemmar
   - Antal fysiskt närvarande (registrerade)
   - Antal digitalt närvarande
2. **Ordförande begär godkännande**: "Godkänner mötet röstlängden?"
3. **Omröstning**: Om konfigurerat, genomförs omröstning
4. **Dokumentation**: Röstlängd dokumenteras i protokollet

#### 5.3.2 Dynamisk röstlängd

- **Uppdateras under mötet**: Eftersläntrare läggs till
- **Per fråga**: Röstlängd fastställs dynamiskt per fråga
- **Baserat på röstande**: Endast de som aktivt röstar ingår i röstlängden för den frågan

### 5.4 Mötets avslutande

#### 5.4.1 Process

1. **Ordförande klickar "Avsluta möte"**: I systemet
2. **Systemet registrerar tidpunkt**: Exakt tidpunkt för avslutande
3. **Stäng röstning**: Möjlighet att rösta stängs
4. **Generera preliminärt protokoll**: Systemet genererar protokoll
5. **Dokumentation**: Mötets avslutande dokumenteras i protokollet

#### 5.4.2 Efter avslutande

- **Protokolljustering**: Sekreterare slutför protokoll
- **Signering**: Ordförande och justerare signerar
- **Publicering**: Protokoll publiceras enligt stadgarna
- **Arkivering**: Protokoll arkiveras

## 6. Rösträkningsdetaljer

### 6.1 Transparens

#### 6.1.1 Synlig rösträkning

- **Realtid**: Rösträkning visas i realtid för alla deltagare
- **Steg-för-steg**: Varje steg i rösträkningen visas (särskilt vid STV)
- **Förklaring**: Tydlig förklaring av varje steg
- **Pausa**: Möjlighet att pausa och förklara vid behov

#### 6.1.2 Observatörer

- **Kandidaters observatörer**: Kan följa rösträkningen
- **Samma vy**: Observatörer ser samma vy som valkommittén
- **Frågor**: Observatörer kan ställa frågor

### 6.2 Tidpunkt för rösträkning

#### 6.2.1 När rösträkning påbörjas

- **Efter klubbslag**: Omedelbart efter ordförandens klubbslag
- **Väntetid**: Systemet väntar 2 sekunder för att säkerställa att alla röster kommit fram
- **Indikator**: Tydlig indikator om att rösträkning pågår
- **Uppskattad tid**: Uppskattad tid för rösträkning visas

#### 6.2.2 Dekryptering

- **Dekryptera valurnan**: Mötesordförandens privata nyckel används
- **Progressindikator**: Visa progress för dekryptering
- **Tid**: Beräknad tid baserat på antal röster

### 6.3 Presentation av resultat

#### 6.3.1 Visning

- **Projektor**: Resultat visas på projektor för fysiskt närvarande
- **App**: Resultat visas i app för digitalt närvarande
- **Visualisering**: Diagram, tabeller, grafer
- **Detaljerad rösträkning**: Tillgänglig för granskning

#### 6.3.2 Dokumentation

- **Automatisk**: Resultat dokumenteras automatiskt i protokollet
- **Metadata**: Datum, tid, antal röstande, valmetod
- **Detaljerad data**: Alla omgångar (vid STV), överföringar, etc.

### 6.4 Omräkning

#### 6.4.1 När omräkning begärs

- **Invändning**: Om någon invänder mot resultatet
- **Misstanke om fel**: Om misstanke om fel i rösträkningen
- **Tekniskt problem**: Om tekniskt problem upptäcks

#### 6.4.2 Process

1. **Begäran om omräkning**: Medlem eller kandidat begär omräkning
2. **Mötet beslutar**: Mötet beslutar om omräkning ska genomföras
3. **Oberoende grupp**: Omräkning görs av oberoende grupp
4. **Transparent**: Omräkning är transparent och dokumenterad
5. **Nytt resultat**: Om omräkning ger annat resultat, gäller det nya resultatet
6. **Dokumentation**: Omräkning och resultat dokumenteras i protokollet

#### 6.4.3 Teknisk implementation

- **Spara rådata**: All rådata sparas för möjlighet till omräkning
- **Oberoende verifiering**: Möjlighet att verifiera rösträkning oberoende av systemet
- **Export**: Export av data för manuell omräkning
