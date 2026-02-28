# Funktionella Krav

## 1. Röstningsprocess (enligt antagen motion)

### 1.1 Tidslinje för röstning

- **Förtidsröstning öppnar**: Samtidigt som andra kallelsen publiceras (senast 4 veckor före årsmötet enligt § 5.2.4)
- **Förtidsröstning pågår**: Fram till ordförandens klubbslag i respektive fråga
- **Live-röstning**: Under årsmötet för både fysiskt närvarande och distansdeltagare
- **Röständring**: Medlemmar kan fritt ändra sin förtidsröst obegränsat antal gånger fram till klubbslaget

### 1.2 Röstlängd (enligt antagen motion)

- Röstlängden är **dynamisk** och fastställs per enskild fråga
- Baseras uteslutande på medlemmar som **aktivt avger en röst** (Ja, Nej eller Avstår)
- Enbart inloggning i systemet grundar INTE närvaro i röstlängd
- Både fysiskt närvarande och distansdeltagare röstar via samma digitala system

### 1.3 Valmetoder

Systemet ska stödja följande rösträkningsmetoder (valbar per fråga):

1. **Enkel majoritet (Plurality)**: Flest röster vinner, används för enkla Ja/Nej-frågor
2. **Absolut majoritet (>50%)**: Kräver mer än hälften av rösterna
3. **Enkel överförbar röst (STV)**: Rangordning av kandidater med automatisk röstöverföring (standard för Mensa)
4. **Godkännanderöstning (Approval Voting)**: Väljaren godkänner flera kandidater
5. **Schulze-metoden (Condorcet)**: Rangordning med simulerade dueller mellan kandidater

## 2. Definition av närvaro (enligt § 5.7)

Systemet måste stödja följande definitioner av närvaro:

- **Fysiskt närvarande**: Medlem i möteslokalen (registreras manuellt eller via QR-kod)
- **Digitalt närvarande**: Medlem inloggad och aktivt följer mötet
- **Röstberättigad**: Fullvärdig medlem (fysiskt eller digitalt närvarande)
- **Röstande**: Medlem som aktivt avger röst (ingår i röstlängden för den frågan)

**Systemkrav:**

- Systemet måste kunna skilja på "inloggad" och "digitalt närvarande"
- Mötesordförande måste kunna se antal fysiskt och digitalt närvarande
- Systemet måste kunna hantera rättigheter baserat på närvarostatus

## 3. Hantering av tekniskt haveri (enligt § 5.9)

### 3.1 Kortvarigt avbrott (< 30 minuter)

- Mötesordförande kan förlänga röstningstid
- Systemet loggar avbrottstid automatiskt
- Systemet föreslår förlängning baserat på avbrottstid

### 3.2 Längre avbrott (> 30 minuter)

- Mötesordförande kan pausa mötet
- Systemet sparar alla lagda röster säkert
- Systemet kan återupptas exakt där det avbröts

### 3.3 Systemet kan inte återställas

- Mötesordförande kan initiera reservrutin
- Systemet exporterar aktuell status för protokoll
- Dokumentation av alla beslut med tidsstämplar

**Systemkrav:**

- Automatisk detektion av systemfel
- Tydliga varningar till mötesordförande
- Möjlighet att pausa/återuppta röstning
- Robust loggning av alla händelser

## 4. Innehållshantering

### 4.1 Dokumentformat

- **Primärt format**: Markdown (.md) för responsiv visning på alla enheter
- **Sekundärt format**: PDF för formella dokument med signaturer
- **Kandidatpresentationer**: Textfält/Markdown + profilbild (JPEG/PNG/WebP)
- **Automatisk formatering**: Systemet beskär bilder och skapar enhetliga profilkort

### 4.2 Agendabyggare

- **Visuellt gränssnitt**: Drag-and-drop för att ordna agendapunkter (Trello-liknande)
- **Förfyllda mallar**: Standarddagordning enligt stadgarna genereras automatiskt
- **Flexibilitet**: Möjlighet att lägga till, ta bort och omordna punkter

## 5. White-label och Konfiguration

### 5.1 Föreningsanpassning

Systemet ska kunna användas av valfri förening utan kodändringar:

- **Föreningsnamn och logotyp**: Visas på inloggningsskärm, sidhuvud och protokoll
- **Färgtema**: Anpassningsbara primära och sekundära färger
- **Språkstöd**: Inbyggt stöd för svenska och engelska (i18n-ramverk för fler språk)
- **Anpassningsbar text**: Informationstext på startskärm med länkar till föreningens support

### 5.2 Beständig konfiguration

- **Konfigurationsfil**: `config.yaml` eller `settings.json` med all föreningsspecifik data
- **Fördel**: Fil kan sparas och återanvändas nästa år utan att göra om inställningar
- **Versionskontroll**: Konfigurationsfil kan versionshanteras i Git
