# Funktionella Krav

## 1. Röstningsprocess (enligt antagen motion)

### 1.1 Tidslinje för röstning

- **Förtidsröstning öppnar**: Samtidigt som andra kallelsen publiceras (enligt föreningens stadgar)
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
3. **Enkel överförbar röst (STV)**: Rangordning av kandidater med automatisk röstöverföring
4. **Godkännanderöstning (Approval Voting)**: Väljaren godkänner flera kandidater
5. **Schulze-metoden (Condorcet)**: Rangordning med simulerade dueller mellan kandidater

## 2. Definition av närvaro

Systemet måste stödja följande definitioner av närvaro (enligt föreningens stadgar):

- **Fysiskt närvarande**: Medlem i möteslokalen (registreras manuellt eller via QR-kod)
- **Digitalt närvarande**: Medlem inloggad och aktivt följer mötet
- **Röstberättigad**: Fullvärdig medlem (fysiskt eller digitalt närvarande)
- **Röstande**: Medlem som aktivt avger röst (ingår i röstlängden för den frågan)

**Systemkrav:**

- Systemet måste kunna skilja på "inloggad" och "digitalt närvarande"
- Mötesordförande måste kunna se antal fysiskt och digitalt närvarande
- Systemet måste kunna hantera rättigheter baserat på närvarostatus

## 3. Hantering av tekniskt haveri

Systemet måste stödja följande procedurer vid tekniskt haveri (enligt föreningens stadgar):

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

## 6. Protokollhantering

### 6.1 Automatisk protokollgenerering

- **Dynamiskt protokoll**: Protokollet genereras automatiskt baserat på dagordning och beslut
- **Kontinuerlig redigering**: Sekreteraren kan kontinuerligt lägga till kommentarer under mötets gång
- **Strukturerad data**: Varje beslut dokumenteras med: Fråga, Förslag, Resultat, Datum, Tid
- **Beslutsnumrering**: Beslut numreras löpande (t.ex. ÅM2025-001)
- **Kategorisering**: Beslut kategoriseras (stadgeändring, budget, personval, etc.)

### 6.2 Digital justering

- **Elektroniska signaturer**: Stöd för digital signering med Freja eID, BankID eller motsvarande
- **Justeringsprocess**: Mötesordförande och två justerare signerar protokollet
- **Tidsstämpel**: Automatisk tidsstämpel vid signering
- **Verifiering**: Möjlighet att verifiera signaturer

### 6.3 Export och arkivering

- **PDF/dokument-export**: Export till PDF eller annat dokumentformat med all information från mötet
- **Bilagor**: Alla handlingar och dokument inkluderas som bilagor
- **Checksumma**: SHA-256 eller starkare checksumma för verifiering av äkthet
- **Metadata**: Protokollet innehåller metadata (datum, tid, deltagare, beslut)
- **Långsiktig bevarande**: Export till PDF/A för långsiktig arkivering

### 6.4 Protokollets innehåll

Protokollet ska automatiskt innehålla:

- Mötets öppnande (tid, plats, ordförande, sekreterare, justerare)
- Närvarolista (fysiskt och digitalt närvarande)
- Dagordning
- Beslut per dagordningspunkt med röstresultat
- Sekreterarens kommentarer och anteckningar
- Bilagor (handlingar, kandidatpresentationer, revisorns rapport)
- Mötets avslutande (tid)
- Signaturer (digitala eller plats för fysiska)

### 6.5 Konfigurerbara inställningar

- **Dagordningsändringar**: Konfigurerbart om föreningen tillåter ändringar på mötet eller inte
- **Publiceringskrav**: Konfigurerbart enligt föreningens stadgar (t.ex. inom 14 dagar)
- **Arkiveringstid**: Konfigurerbart enligt föreningens stadgar och arkivlagen
- **Anmärkningsperiod**: Konfigurerbart enligt föreningens stadgar

## 7. Datadump och återställning (KRITISKT)

### 7.1 Datadump-funktionalitet

- **Komplett export**: Systemet kan generera en komplett datadump av all aktuell data
- **Snabb återställning**: En datadump ska kunna läsas in i en ny instans på < 5 minuter
- **Innehåll**: Datadump innehåller medlemmar, röster, dagordning, handlingar, konfiguration
- **Format**: JSON eller annat strukturerat format som är lätt att läsa och återställa
- **Checksumma**: Varje datadump har en checksumma för att verifiera integritet

### 7.2 Återställningsprocess

- **Enkel återställning**: Tydlig process för att återställa från datadump
- **Flytta till ny dator**: Möjlighet att snabbt flytta systemet till ny dator vid haveri
- **Testning**: Återställningsprocessen ska testas före mötet
- **Dokumentation**: Tydlig dokumentation av återställningsprocess

### 7.3 Backup-strategi

- **Under mötet**: Automatisk datadump var 15:e minut under mötet
- **Efter mötet**: Slutlig datadump när mötet avslutas
- **Protokoll**: Protokollet med bilagor är den enda artefakt som måste behållas långsiktigt
- **Systemkod**: Systemkoden finns på GitHub och behöver inte backas upp

## 8. Kallelsehantering

### 8.1 Automatiska påminnelser

- **Första kallelsen**: Påminnelse enligt föreningens stadgar
- **Andra kallelsen**: Påminnelse enligt föreningens stadgar
- **Kontroll**: Automatisk kontroll av att alla obligatoriska handlingar finns med
- **Distribution**: Automatisk distribution via e-post och publicering på hemsida

### 8.2 Handlingars tillgänglighet

- **Tidskrav**: Handlingar ska vara tillgängliga enligt föreningens stadgar
- **Notifikation**: Automatisk notifikation till medlemmar när handlingar publiceras
- **Versionshantering**: Om ändringar görs, tydlig markering av vilken version som är aktuell
- **Loggning**: Alla ändringar loggas med tidsstämpel och ansvarig person

### 8.3 Konfigurerbara tider

- **Första kallelsen**: Konfigurerbart antal veckor före mötet
- **Andra kallelsen**: Konfigurerbart antal veckor före mötet
- **Handlingar**: Konfigurerbart när handlingar måste vara tillgängliga
- **Förtidsröstning**: Konfigurerbart när förtidsröstning öppnar

## 9. Revisorns gränssnitt

### 9.1 Revisorroll

- **Särskild roll**: Revisor har särskild roll med läsrättigheter
- **Tillgång till loggar**: Revisor kan se alla loggar (men inte koppling mellan person och röst)
- **Export**: Revisor kan exportera data för extern granskning
- **Administrativa ändringar**: Revisor kan se alla administrativa ändringar

### 9.2 Granskningsrapport

- **Uppladdning**: Möjlighet att ladda upp revisorns rapport som bilaga till protokollet
- **Koppling**: Automatisk koppling till dagordningspunkt om ansvarsfrihet
- **Visning**: Tydlig visning av revisorns utlåtande före omröstning

### 9.3 Dokumentation

- **Guide**: Tydlig guide för revisor om hur systemet fungerar
- **Vad kan granskas**: Dokumentation av vad revisor har tillgång till
- **Vad kan inte granskas**: Tydlig information om att revisor inte kan se koppling mellan person och röst

## 10. Beslutsmässighet (Quorum)

### 10.1 Konfigurerbar quorum

- **Per frågetyp**: Konfigurerbar quorum-nivå per frågetyp
- **Enkel majoritet**: > 50% av rösterna
- **Absolut majoritet**: > 50% av röstberättigade
- **Kvalificerad majoritet**: 2/3 eller annan andel av rösterna
- **Anpassningsbar**: Kan anpassas enligt föreningens stadgar

### 10.2 Automatisk kontroll

- **Före röstning**: Automatisk kontroll av om mötet är beslutsmässigt
- **Varning**: Tydlig varning om beslutsmässighet inte uppnås
- **Skjuta upp**: Möjlighet att skjuta upp beslut till nästa möte
- **Dokumentation**: Beslutsmässighet dokumenteras i protokollet

## 11. Språkstöd och internationalisering

### 11.1 Flerspråkighet

- **Svenska och engelska**: Komplett stöd för svenska och engelska
- **Språkväljare**: Tydlig språkväljare på inloggningssidan
- **Användarval**: Användarens språkval sparas för framtida sessioner
- **Byta språk**: Möjlighet att byta språk när som helst under mötet

### 11.2 Översättningar

- **Alla texter**: Alla texter ska finnas på både svenska och engelska
- **Professionell översättning**: Kritiska texter ska ha professionell översättning
- **Konsekvent terminologi**: Konsekvent terminologi i hela systemet
- **i18n-ramverk**: Möjlighet att lägga till fler språk via i18n-ramverk

### 11.3 Tidszoner

- **Svensk tid och lokal tid**: Systemet visar tid i både svensk tid och användarens lokala tid
- **Tydlig information**: Tydlig information om när mötet börjar i olika tidszoner
- **Påminnelser**: Påminnelser skickas i användarens lokala tid
- **Automatisk detektion**: Automatisk detektion av tidszon baserat på webbläsare

## 12. Tillgänglighet (WCAG 2.1 nivå AA)

### 12.1 Tangentbordsnavigering

- **Alla funktioner**: Alla funktioner ska vara tillgängliga via tangentbord
- **Tab-ordning**: Tab-ordning ska följa visuell ordning
- **Fokusindikator**: Fokusindikator ska vara tydlig och synlig
- **Kortkommandon**: Kortkommandon för vanliga åtgärder (med möjlighet att stänga av)
- **Escape**: Escape-tangent för att stänga dialoger

### 12.2 Skärmläsarstöd

- **Semantisk HTML**: Semantisk HTML med korrekt användning av ARIA-attribut
- **Tydliga rubriker**: Tydliga rubriker och landmärken för navigation
- **Beskrivande länkar**: Beskrivande länkar (inte "klicka här")
- **Progressindikatorer**: Progressindikatorer som läses upp
- **Felmeddelanden**: Felmeddelanden som annonseras direkt

### 12.3 Färgkontrast och färgblindhet

- **Tillräcklig kontrast**: Minst 4.5:1 för normal text, 3:1 för stor text
- **Inte bara färg**: Information förmedlas aldrig enbart genom färg
- **Ikoner och text**: Ikoner och text kompletterar färgkodning
- **Färgtema**: Möjlighet att välja färgtema (t.ex. högkontrast)

### 12.4 Alternativtext

- **Alla bilder**: Alla bilder ska ha alternativtext
- **Beskrivande**: Alternativtext ska vara beskrivande
- **Dekorativa bilder**: Dekorativa bilder ska ha tom alt-text

## 13. Systemets livscykel

### 13.1 Kortvarig drift

- **Startas inför mötet**: Systemet startas upp inför årsmötet
- **Stängs ner efter mötet**: Systemet stängs ner efter årsmötet
- **Nästa år**: Systemet startas upp igen inför nästa årsmöte
- **Ingen kontinuerlig drift**: Systemet körs normalt inte kontinuerligt

### 13.2 Konsekvenser för design

- **Enkel installation**: Systemet ska vara enkelt att installera och starta
- **Snabb uppsättning**: Uppsättning ska ta < 30 minuter med wizard
- **Datadump viktigare än backup**: Datadump för att flytta till ny dator viktigare än kontinuerlig backup
- **Protokoll är artefakten**: Protokollet med bilagor är den enda långsiktiga artefakten

## 14. Dokumentkonvertering och uppladdning

### 14.1 Stödda format

Systemet ska stödja uppladdning av dokument i följande format:

- **Markdown (.md)**: Primärt format, visas direkt
- **PDF (.pdf)**: Konverteras till Markdown för visning
- **Word (.docx, .doc)**: Konverteras till Markdown för visning
- **Bilder (.jpg, .png, .webp)**: Visas direkt

### 14.2 Konverteringsprocess

#### 14.2.1 Verktyg för konvertering

- **PDF till Markdown**: `pdftotext` + efterbehandling eller `pandoc`
- **Word till Markdown**: `pandoc` eller `docx2txt` + efterbehandling
- **Automatisk installation**: Systemet kontrollerar och installerar nödvändiga verktyg

#### 14.2.2 Konverteringsflöde

1. Användare laddar upp dokument (PDF eller Word)
2. Systemet sparar originaldokumentet
3. Systemet konverterar till Markdown
4. Markdown-version används för visning på mobil och datorskärm
5. Originaldokument länkas för nedladdning

#### 14.2.3 Kvalitetskontroll

- **Förhandsvisning**: Användare ser konverterad Markdown innan godkännande
- **Manuell redigering**: Möjlighet att redigera Markdown efter konvertering
- **Fallback**: Om konvertering misslyckas, visa PDF direkt

### 14.3 Fördelar med Markdown-visning

- **Responsiv**: Anpassar sig automatiskt till skärmstorlek
- **Tillgänglig**: Fungerar bra med skärmläsare
- **Snabb**: Laddas snabbare än PDF
- **Sökbar**: Text kan sökas och kopieras
- **Offline**: Fungerar offline

### 14.4 Länkning till originaldokument

- **Tydlig länk**: "Ladda ner originaldokument (PDF/Word)"
- **Metadata**: Filnamn, storlek, uppladdningsdatum
- **Checksumma**: SHA-256 för att verifiera integritet
- **Arkivering**: Originaldokument inkluderas i protokollet

## 15. API-specifikation

### 15.1 Syfte

API:et mellan server och klienter ska vara noggrant specificerat så att det är enkelt att bygga egna klienter mot samma API.

### 15.2 API-design

- **RESTful API**: Följer REST-principer
- **JSON**: Alla data utbyts i JSON-format
- **Versionshantering**: API-version i URL (t.ex. `/api/v1/`)
- **Autentisering**: JWT-tokens eller session-cookies
- **Rate limiting**: Skydd mot överbelastning

### 15.3 OpenAPI/Swagger-specifikation

- **Komplett specifikation**: Alla endpoints dokumenterade i OpenAPI 3.0
- **Interaktiv dokumentation**: Swagger UI för att testa API:et
- **Kodgenerering**: Möjlighet att generera klientbibliotek
- **Exempel**: Exempel på requests och responses

### 15.4 Viktiga endpoints

#### 15.4.1 Autentisering

- `POST /api/v1/auth/login` - Logga in
- `POST /api/v1/auth/logout` - Logga ut
- `GET /api/v1/auth/me` - Hämta aktuell användare
- `POST /api/v1/auth/refresh` - Förnya token

#### 15.4.2 Möte

- `GET /api/v1/meeting` - Hämta mötesinfo
- `GET /api/v1/meeting/agenda` - Hämta dagordning
- `GET /api/v1/meeting/status` - Hämta mötesstatus
- `GET /api/v1/meeting/participants` - Hämta deltagare

#### 15.4.3 Röstning

- `POST /api/v1/vote` - Avge röst
- `PUT /api/v1/vote/{id}` - Ändra röst
- `GET /api/v1/vote/status/{question_id}` - Hämta röstningsstatus
- `GET /api/v1/vote/result/{question_id}` - Hämta resultat

#### 15.4.4 Dokument

- `GET /api/v1/documents` - Lista alla dokument
- `GET /api/v1/documents/{id}` - Hämta specifikt dokument
- `GET /api/v1/documents/{id}/markdown` - Hämta Markdown-version
- `GET /api/v1/documents/{id}/original` - Hämta originaldokument

#### 15.4.5 Protokoll

- `GET /api/v1/protocol` - Hämta protokoll
- `POST /api/v1/protocol/comment` - Lägg till kommentar (sekreterare)
- `GET /api/v1/protocol/export` - Exportera protokoll som PDF

### 15.5 WebSocket för realtidsuppdateringar

- **WebSocket-anslutning**: `/ws/meeting`
- **Events**: `agenda_updated`, `vote_opened`, `vote_closed`, `result_available`
- **Heartbeat**: Ping/pong för att hålla anslutningen vid liv

### 15.6 Klientbibliotek

- **JavaScript/TypeScript**: Officiellt klientbibliotek
- **Python**: Officiellt klientbibliotek
- **Andra språk**: Kan genereras från OpenAPI-spec

## 16. Dashboard och statistik

### 16.1 Syfte

Dashboard visar realtidsstatistik på deltagare, röstning och systemhälsa. Samma data som loggas.

### 16.2 Tillgängligt för

- **Mötesordförande**: Full tillgång
- **Sekreterare**: Full tillgång
- **Valkommitté**: Full tillgång
- **Teknisk ansvarig**: Full tillgång + systemhälsa
- **Revisor**: Tillgång efter mötet

### 16.3 Statistik som visas

#### 16.3.1 Deltagare

- **Totalt antal medlemmar**: Röstberättigade medlemmar
- **Inloggade**: Antal inloggade medlemmar
- **Fysiskt närvarande**: Registrerade på plats
- **Digitalt närvarande**: Aktivt följer mötet
- **Eftersläntrare**: Nya deltagare under mötet
- **Tidslinje**: Graf över deltagare över tid

#### 16.3.2 Röstning

- **Aktuell fråga**: Vilken fråga som röstning pågår på
- **Antal röster**: Antal avgivna röster i realtid
- **Röstdeltagande**: Procent av närvarande som röstat
- **Tid kvar**: Nedräkningstimer
- **Historik**: Tidigare röstningar med resultat

#### 16.3.3 Systemhälsa (endast teknisk ansvarig)

- **CPU-användning**: Procent
- **Minnesanvändning**: Procent
- **Databasanslutningar**: Antal aktiva
- **API-responstider**: Genomsnitt och max
- **Felfrekvens**: Antal fel per minut
- **WebSocket-anslutningar**: Antal aktiva

#### 16.3.4 Autentisering

- **Autentiseringsmetoder**: Fördelning (Freja eID, SSO, etc.)
- **Säkerhetsnivå**: Fördelning av säkerhetsnivåer
- **Misslyckade inloggningar**: Antal och från vilka IP-adresser
- **Manuella godkännanden**: Antal väntande och godkända

### 16.4 Visualisering

- **Realtidsgrafer**: Uppdateras varje sekund
- **Färgkodning**: Grönt (bra), gult (varning), rött (problem)
- **Alerting**: Automatiska varningar vid problem
- **Export**: Möjlighet att exportera statistik som CSV/JSON

### 16.5 Teknisk implementation

- **WebSocket**: Realtidsuppdateringar via WebSocket
- **Caching**: Statistik cachas för att minska belastning
- **Aggregering**: Data aggregeras för att minska datamängd
- **Historik**: Statistik sparas för analys efter mötet

## 17. Transparens och säkerhetsdokumentation

### 17.1 Syfte

Alla säkerhetsdokument och analyser ska vara tillgängliga för deltagare på en egen sida för de som är nyfikna.

### 17.2 Tillgängliga dokument

#### 17.2.1 GDPR och dataskydd

- **Dataskyddskonsekvensanalys (DPIA)**: Komplett DPIA
- **Personuppgiftspolicy**: Hur personuppgifter hanteras
- **Rätt till radering**: Information om hur man begär radering
- **Dataintrång**: Rutiner för hantering av dataintrång

#### 17.2.2 Säkerhetsanalyser

- **Hotmodellering**: Alla identifierade hot och åtgärder
- **Säkerhetsgranskning**: Resultat från oberoende säkerhetsgranskning
- **Penetrationstester**: Resultat från penetrationstester (anonymiserat)
- **Sårbarhetshantering**: Hur sårbarheter rapporteras och hanteras

#### 17.2.3 Teknisk dokumentation

- **Systemarkitektur**: Översikt över systemets komponenter
- **Kryptering**: Vilka krypteringsmetoder som används
- **Revisionsspår**: Vad som loggas och varför
- **End-to-End Verifiability**: Hur matematisk verifierbarhet fungerar

#### 17.2.4 Juridisk dokumentation

- **Stadgeändringar**: Föreslagna stadgeändringar för digitalt röstningssystem
- **Valfusk**: Definition och hantering
- **Omprövning**: Process för omprövning av beslut
- **Rättslig prövning**: Hur systemet kan användas som bevis

### 17.3 Presentation

- **Egen sida**: Dedikerad sida i systemet (t.ex. `/transparency`)
- **Kategoriserad**: Dokument kategoriserade för enkel navigering
- **Sökbar**: Möjlighet att söka i dokumenten
- **Nedladdningsbar**: Alla dokument kan laddas ner som PDF
- **Versionshantering**: Historik av ändringar i dokumenten

### 17.4 Uppdatering

- **Regelbunden uppdatering**: Dokument uppdateras vid ändringar
- **Notifikation**: Medlemmar notifieras om viktiga uppdateringar
- **Changelog**: Tydlig changelog för varje dokument
- **Arkivering**: Gamla versioner arkiveras

## 18. LLM-assisterad konfiguration

### 18.1 Syfte

Många har tillgång till LLM (Gemini, ChatGPT, etc.). Generera prompts så att de kan ta stadgarna och generera en korrekt konfiguration.

### 18.2 Konfigurationsprompt

Systemet ska tillhandahålla en prompt-mall som användare kan använda med sin LLM:

```markdown
# Prompt för att generera konfiguration för digitalt röstningssystem

Jag behöver hjälp att konfigurera ett digitalt röstningssystem för min förening.

## Föreningens stadgar

[Klistra in föreningens stadgar här]

## Föreningsinformation

- Föreningsnamn: [Namn]
- Antal medlemmar: [Antal]
- Typ av förening: [Ideell förening / Ekonomisk förening / Annat]

## Frågor

Baserat på stadgarna, generera en konfigurationsfil (YAML eller JSON) som innehåller:

1. Kallelsetider (första och andra kallelsen)
2. Tidskrav för handlingar
3. Quorum-nivåer för olika typer av beslut
4. Valmetoder (enkel majoritet, absolut majoritet, STV, etc.)
5. Protokollkrav (publiceringskrav, arkiveringstid)
6. Möjlighet att ändra dagordning på mötet (ja/nej)
7. Revision och ansvarsfrihet (hur det hanteras)
8. Andra relevanta inställningar

Generera även en lista med eventuella stadgeändringar som behövs för att använda digitalt röstningssystem.
```

### 18.3 Interaktiv konfigurationsguide

Om användaren inte har tillgång till LLM, ska systemet ha en interaktiv guide:

1. **Ladda upp stadgar**: Användare laddar upp stadgar (PDF eller Word)
2. **Extrahera information**: Systemet försöker extrahera relevant information
3. **Ställ frågor**: Systemet ställer följdfrågor för att förtydliga
4. **Generera konfiguration**: Systemet genererar konfigurationsfil
5. **Granska och justera**: Användare granskar och justerar konfigurationen

### 18.4 Validering

- **Automatisk validering**: Systemet validerar konfigurationen
- **Varningar**: Varningar om potentiella problem
- **Rekommendationer**: Rekommendationer baserat på best practices
- **Testning**: Möjlighet att testa konfigurationen i testmiljö

### 18.5 Mallar för vanliga föreningstyper

- **Ideell förening (standard)**: Standardmall enligt svensk föreningsrätt
- **Ekonomisk förening**: Mall för ekonomiska föreningar
- **Bostadsrättsförening**: Mall för bostadsrättsföreningar
- **Studentförening**: Mall för studentföreningar
- **Anpassad**: Tom mall för helt anpassad konfiguration

## 19. Rådgivande motioner och "Övrigt"

### 19.1 Syfte

Medlemmar ska kunna lämna rådgivande motioner inför mötet, samt lägga till punkter under "Övrigt".

### 19.2 Inlämning av rådgivande motion

#### 19.2.1 Process

1. **Medlem skriver motion**: I Markdown-editor i systemet eller på mobil/dator
2. **Förhandsvisning**: Medlem ser hur motionen kommer se ut
3. **Skicka in**: Medlem skickar in motionen innan deadline
4. **Ordförande granskar**: Ordförande granskar motionen
5. **Godkännande/Avslag**: Ordförande godkänner eller avslår motionen
6. **Läggs till dagordning**: Godkända motioner läggs till dagordningen

#### 19.2.2 Deadline

- **Konfigurerbar**: Deadline för inlämning konfigurerbar (t.ex. 2 veckor före mötet)
- **Påminnelse**: Automatisk påminnelse till medlemmar
- **Sen inlämning**: Möjlighet att tillåta sen inlämning (kräver ordförandens godkännande)

#### 19.2.3 Markdown-editor

- **Enkel editor**: Enkel Markdown-editor med förhandsvisning
- **Formatering**: Stöd för rubriker, listor, länkar, bilder
- **Mallar**: Mallar för vanliga typer av motioner
- **Hjälp**: Hjälptext om hur man skriver en motion

### 19.3 Ordförandens granskning

#### 19.3.1 Granskningskriterier

Ordförande granskar att motionen:

- **Lämnats in korrekt**: Enligt stadgarna (t.ex. inom deadline)
- **Relevant innehåll**: Innehållet är relevant för föreningen
- **Inte olämpligt**: Innehållet är inte olämpligt eller kränkande
- **Formalia**: Motionen följer formella krav (om sådana finns)

#### 19.3.2 Godkännande

- **Godkänn**: Motion läggs till dagordningen under "Rådgivande motioner" eller "Övrigt"
- **Avslå**: Motion avslås med motivering
- **Begär förtydligande**: Ordförande kan begära förtydligande från motionären

#### 19.3.3 Dokumentation

- **Alla motioner dokumenteras**: Både godkända och avslagna
- **Motivering vid avslag**: Tydlig motivering varför motion avslogs
- **Transparent**: Alla medlemmar kan se vilka motioner som lämnats in och status

### 19.4 "Övrigt" under mötet

#### 19.4.1 Lägga till punkt under mötet

- **Medlem begär ordet**: Medlem begär ordet under "Övrigt"
- **Ordförande ger ordet**: Ordförande ger ordet till medlem
- **Medlem presenterar**: Medlem presenterar sin fråga/motion
- **Mötet beslutar**: Mötet beslutar om frågan ska behandlas

#### 19.4.2 Dokumentation

- **Sekreterare antecknar**: Sekreterare antecknar frågan i protokollet
- **Beslut dokumenteras**: Mötets beslut dokumenteras
- **Eventuell röstning**: Om röstning krävs, genomförs den

### 19.5 Rådgivande beslut

- **Inte bindande**: Rådgivande beslut är inte bindande för styrelsen
- **Tydlig markering**: Tydlig markering att beslutet är rådgivande
- **Uppföljning**: Styrelsen ska rapportera om hur rådgivande beslut följts upp
- **Dokumentation**: Rådgivande beslut dokumenteras i protokollet
