# Analys och Brister

## Översikt

Detta dokument innehåller tre analyser av systemet för att identifiera brister och områden som behöver kompletteras:

1. **Analys 1**: Brister för generella svenska föreningar
2. **Analys 2**: Brister ur rättssäkerhetsperspektiv
3. **Analys 3**: Brister för specifika föreningstyper och användningsfall

Varje analys identifierar konkreta brister och föreslår åtgärder för att komplettera systemet.

---

## Analys 1: Brister för generella svenska föreningar

### 1.1 Juridiska krav enligt svensk föreningsrätt

#### 1.1.1 Föreningslagen och årsmöteskrav

**Identifierade brister:**

- **Protokollhantering**: Systemet saknar tydliga krav på hur protokoll ska upprättas, justeras och arkiveras enligt föreningslagen
- **Beslutsmässighet**: Inga krav på hur systemet ska hantera beslutsmässighet (quorum) för olika typer av beslut
- **Stadgeändringar**: Inga specifika krav på hur systemet ska hantera stadgeändringar som kräver kvalificerad majoritet
- **Medlemsregister**: Inga krav på hur medlemsregistret ska hanteras enligt GDPR och föreningslagen

**Förslag till komplettering:**

1. **Protokollmodul** (KRITISKT - MÅSTE IMPLEMENTERAS):
   - Automatisk generering av protokoll baserat på dagordning och beslut
   - Sekreteraren kan kontinuerligt lägga till kommentarer under mötets gång
   - Stöd för digital justering med elektroniska signaturer (t.ex. Freja eID)
   - Export till PDF/dokument med all information från mötet
   - Tidsstämpel och checksumma för verifiering
   - Protokollet är den enda artefakt som måste bevaras efter mötet (enligt föreningens stadgar)

2. **Beslutsmässighet**:
   - Konfigurerbar quorum-nivå per frågetyp (enkel majoritet, 2/3 majoritet, etc.)
   - Automatisk kontroll av om mötet är beslutsmässigt innan röstning
   - Tydlig varning om beslutsmässighet inte uppnås
   - Möjlighet att skjuta upp beslut till nästa möte

3. **Stadgeändringar**:
   - Särskild markering för stadgeändringar i dagordningen
   - Automatisk kontroll av att kvalificerad majoritet uppnås
   - Krav på att stadgeändringar ska ha varit med i kallelsen
   - Möjlighet att kräva beslut vid två på varandra följande möten

4. **Medlemsregister**:
   - GDPR-compliant hantering av medlemsuppgifter
   - Möjlighet för medlemmar att begära ut sina uppgifter
   - Automatisk radering av medlemsinformation efter årsmötet eller kort tid därefter
   - Arkivlagen för mötesdeltagare åsidosätter vissa GDPR-krav
   - Tydlig information om hur personuppgifter hanteras

#### 1.1.2 Kallelse och handlingar

**Identifierade brister:**

- **Kallelsetider**: Systemet saknar automatisk kontroll av att kallelse skickas ut i rätt tid enligt stadgarna
- **Handlingars tillgänglighet**: Inga krav på hur länge handlingar ska vara tillgängliga före mötet
- **Ändringar efter kallelse**: Inga rutiner för hur ändringar i dagordning eller handlingar ska hanteras efter att kallelse skickats

**Förslag till komplettering:**

**OBS:** Möjligheten att ändra dagordning på årsmötet är individuellt per förening. Vissa föreningar kan inte ändra dagordning på mötet. Systemet ska göra det möjligt att göra rätt sak inför årsmötet.

1. **Kallelsehantering**:
   - Automatisk påminnelse till styrelsen om när första och andra kallelsen ska skickas (enligt föreningens stadgar)
   - Kontroll av att alla obligatoriska handlingar finns med
   - Automatisk distribution via e-post och publicering på hemsida
   - Loggning av när kallelse skickades och till vilka

2. **Handlingars tillgänglighet**:
   - Handlingar ska vara tillgängliga enligt föreningens stadgar
   - Automatisk notifikation till medlemmar när handlingar publiceras
   - Versionshantering av handlingar (om ändringar görs)
   - Tydlig markering av vilken version som är aktuell

3. **Ändringar efter kallelse**:
   - Konfigurerbart: Om föreningen tillåter ändringar på mötet eller inte
   - Systemet ska logga alla ändringar med tidsstämpel och ansvarig person
   - Tydlig information till medlemmar om ändringar

#### 1.1.3 Revision och granskning

**Identifierade brister:**

- **Revisorns tillgång**: Inga krav på hur revisor ska få tillgång till systemet för granskning
- **Granskningsrapport**: Inga rutiner för hur revisorns rapport ska hanteras i systemet
- **Ansvarsfrihet**: Inga specifika krav på hur omröstning om ansvarsfrihet ska hanteras

**Förslag till komplettering:**

**OBS:** Hantering av revision och ansvarsfrihet är individuellt per förening. Systemet ska tillhandahålla guider och möjligheter, inte tvinga specifika processer.

1. **Revisorns tillgång**:
   - Särskild revisorroll med läsrättigheter till alla loggar och data
   - Möjlighet att exportera data för extern granskning
   - Revisor ska kunna se administrativa ändringar men inte kopplingen mellan person och röst
   - Tydlig dokumentation av vad revisor har tillgång till

2. **Granskningsrapport**:
   - Möjlighet att ladda upp revisorns rapport som bilaga till protokollet
   - Automatisk koppling till dagordningspunkt om ansvarsfrihet
   - Tydlig visning av revisorns utlåtande före omröstning

3. **Ansvarsfrihet**:
   - Guide för hur omröstning om ansvarsfrihet kan hanteras
   - Möjlighet att konfigurera om styrelseledamöter kan rösta om sin egen ansvarsfrihet
   - Tydlig information om vad ansvarsfrihet innebär
   - Automatisk dokumentation i protokollet

### 1.2 Tillgänglighet och inkludering

#### 1.2.1 Funktionshinder och tillgänglighet

**Identifierade brister:**

- **WCAG-compliance**: Inga specifika krav på att systemet ska följa WCAG 2.1 nivå AA
- **Skärmläsarstöd**: Begränsade krav på hur systemet ska fungera med skärmläsare
- **Tangentbordsnavigering**: Inga detaljerade krav på tangentbordsnavigering
- **Färgblindhet**: Begränsade krav på hur systemet ska hantera färgblindhet

**Förslag till komplettering:**

1. **WCAG 2.1 nivå AA**:
   - Alla interaktiva element ska vara tillgängliga via tangentbord
   - Tillräcklig färgkontrast (minst 4.5:1 för normal text, 3:1 för stor text)
   - Alla bilder ska ha alternativtext
   - Formulär ska ha tydliga labels och felmeddelanden
   - Tidsgränser ska kunna förlängas eller stängas av

2. **Skärmläsarstöd**:
   - Semantisk HTML med korrekt användning av ARIA-attribut
   - Tydliga rubriker och landmärken för navigation
   - Beskrivande länkar (inte "klicka här")
   - Progressindikatorer som läses upp
   - Felmeddelanden som annonseras direkt

3. **Tangentbordsnavigering**:
   - Tab-ordning ska följa visuell ordning
   - Fokusindikator ska vara tydlig och synlig
   - Alla funktioner ska vara tillgängliga via tangentbord
   - Kortkommandon för vanliga åtgärder (med möjlighet att stänga av)
   - Escape-tangent för att stänga dialoger

4. **Färgblindhet**:
   - Information ska aldrig förmedlas enbart genom färg
   - Ikoner och text ska komplettera färgkodning
   - Möjlighet att välja färgtema (t.ex. högkontrast)
   - Testning med färgblindhetssimulator

#### 1.2.2 Språkstöd och flerspråkighet

**Identifierade brister:**

- **Språkval**: Systemet har stöd för svenska och engelska, men inga krav på hur språkval ska hanteras
- **Översättningar**: Inga krav på kvalitet och fullständighet i översättningar
- **Blandade språk**: Inga rutiner för hur möten med både svenska och engelska deltagare ska hanteras

**Förslag till komplettering:**

1. **Språkval**:
   - Tydlig språkväljare på inloggningssidan
   - Användarens språkval sparas för framtida sessioner
   - Möjlighet att byta språk när som helst under mötet
   - Automatisk detektion av webbläsarens språk som standard

2. **Översättningar**:
   - Alla texter ska finnas på både svenska och engelska
   - Professionell översättning av kritiska texter (inte maskinöversättning)
   - Konsekvent terminologi i hela systemet
   - Möjlighet att lägga till fler språk via i18n-ramverk

3. **Blandade språk**:
   - Möjlighet att visa dagordning och handlingar på flera språk samtidigt
   - Tydlig markering av vilket språk varje dokument är på
   - Möjlighet för medlemmar att välja föredraget språk för notifikationer

### 1.3 Dataskydd och integritet

#### 1.3.1 GDPR-compliance

**Identifierade brister:**

- **Dataskyddskonsekvensanalys (DPIA)**: Nämns i säkerhetskraven men inga detaljer om vad den ska innehålla
- **Personuppgiftsbiträdesavtal**: Inga krav på avtal med eventuella underleverantörer
- **Rätt till radering**: Inga rutiner för hur medlemmar kan begära radering av sina uppgifter
- **Dataintrång**: Inga rutiner för hur dataintrång ska hanteras och rapporteras

**Förslag till komplettering:**

**OBS:** Arkivlagen för mötesdeltagare åsidosätter vissa GDPR-krav. Systemet kommer normalt bara köras under kort tid (inför och under årsmötet). Underleverantörer finns ofta inte då systemet körs lokalt.

1. **Dataskyddskonsekvensanalys (DPIA)**:
   - Obligatorisk DPIA innan systemet tas i drift
   - Dokumentation av alla personuppgifter som behandlas
   - Riskanalys för varje typ av personuppgift
   - Åtgärder för att minimera risker
   - Uppdatering av DPIA vid större ändringar

2. **Personuppgiftsbiträdesavtal**:
   - Avtal med eventuella underleverantörer (om sådana används)
   - Krav på att underleverantörer följer GDPR
   - Rätt att granska underleverantörers säkerhetsåtgärder
   - Möjlighet att säga upp avtal vid brott mot GDPR

3. **Rätt till radering**:
   - Tydlig process för hur medlemmar kan begära radering
   - Automatisk radering av medlemsinformation efter årsmötet eller kort tid därefter
   - Undantag för uppgifter som måste sparas enligt arkivlagen (protokoll, röstlängd)
   - Bekräftelse till medlem när radering genomförts

4. **Dataintrång**:
   - Rutiner för att upptäcka dataintrång
   - Rapportering till Datainspektionen inom 72 timmar (om tillämpligt)
   - Information till berörda medlemmar om intrånget
   - Dokumentation av intrånget och åtgärder

#### 1.3.2 Informationssäkerhet

**Identifierade brister:**

- **Säkerhetskopiering**: Begränsade krav på hur säkerhetskopiering ska genomföras
- **Återställning**: Inga krav på hur snabbt systemet ska kunna återställas efter haveri
- **Säkerhetsuppdateringar**: Inga rutiner för hur säkerhetsuppdateringar ska hanteras
- **Incidenthantering**: Inga detaljerade rutiner för hur säkerhetsincidenter ska hanteras

**Förslag till komplettering:**

**OBS:** Systemet körs normalt bara under kort tid (inför och under årsmötet). Att backa upp systemet är generellt meningslöst då det finns på GitHub. Aktuell data är viktigt för att smidigt kunna flytta till ny dator om något går sönder. Efter årsmötet är protokollet med bilagor den enda artefakt som behöver behållas (styrs av stadgar/styrelsen).

1. **Säkerhetskopiering och datadump**:
   - Systemet ska kunna generera en datadump som kan användas för backup
   - En korrekt datadump ska kunna läsas in i en ny instans på någon minut
   - Datadump ska innehålla all aktuell data (medlemmar, röster, dagordning, etc.)
   - Export av protokoll med alla bilagor som PDF/dokument
   - Checksumma för att verifiera integritet

2. **Återställning**:
   - Snabb återställning från datadump (< 5 minuter)
   - Möjlighet att flytta till ny dator vid haveri
   - Dokumenterad återställningsprocess
   - Testning av återställning före mötet

3. **Säkerhetsuppdateringar**:
   - Automatisk övervakning av säkerhetsuppdateringar
   - Kritiska uppdateringar ska installeras före mötet
   - Testning av uppdateringar i testmiljö
   - Loggning av alla uppdateringar

4. **Incidenthantering**:
   - Tydlig process för att rapportera säkerhetsincidenter
   - Dokumentation av alla incidenter
   - Analys av grundorsak (root cause analysis)
   - Åtgärder för att förhindra upprepning

---

## Analys 2: Brister ur rättssäkerhetsperspektiv

### 2.1 Bevisning och verifierbarhet

#### 2.1.1 Protokoll och dokumentation

**Identifierade brister:**

- **Protokollets rättskraft**: Inga krav på hur protokollet ska få rättskraft (justering, signering)
- **Ändringar i protokoll**: Inga rutiner för hur felaktigheter i protokoll ska rättas
- **Arkivering**: Begränsade krav på hur protokoll ska arkiveras för långsiktig bevarande
- **Verifiering**: Inga krav på hur protokollets äkthet ska kunna verifieras i framtiden

**Förslag till komplettering:**

**OBS:** Protokollet från årsmötet är det bindande materialet, oberoende av hur det upprättas. Systemet ska hjälpa till att göra ett så korrekt protokoll som möjligt, där sekreteraren kontinuerligt kan lägga till kommentarer under mötets gång.

1. **Protokollets rättskraft** (KRITISKT):
   - Protokoll ska justeras av mötesordförande och två justerare
   - Digital signering med kvalificerade elektroniska signaturer (t.ex. Freja eID, BankID)
   - Protokoll ska publiceras enligt föreningens stadgar
   - Medlemmar ska ha möjlighet att anmärka på protokollet enligt stadgarna

2. **Ändringar i protokoll**:
   - Ändringar i justerat protokoll hanteras enligt föreningens stadgar (ofta kräver beslut av nästa årsmöte)
   - Systemet kan dokumentera anmärkningar och förslag till ändringar
   - Ursprunglig version ska bevaras tillsammans med ändrad version (om tillämpligt)

3. **Arkivering**:
   - Protokoll ska arkiveras enligt föreningens stadgar och arkivlagen
   - Export till PDF/A för långsiktig bevarande
   - Checksumma (SHA-256 eller starkare) för verifiering av äkthet

4. **Verifiering**:
   - Varje protokoll ska ha en unik checksumma
   - Checksumman ska publiceras på föreningens hemsida
   - Möjlighet att verifiera protokollets äkthet genom att jämföra checksummor
   - Tidsstämpel från betrodd tredje part (valfritt, men rekommenderat)

#### 2.1.2 Revisionsspår och loggning

**Identifierade brister:**

- **Loggningens omfattning**: Begränsade krav på vad som ska loggas
- **Loggars integritet**: Inga krav på hur loggar ska skyddas mot manipulation
- **Loggars tillgänglighet**: Inga krav på hur länge loggar ska bevaras
- **Granskning av loggar**: Inga rutiner för regelbunden granskning av loggar

**Förslag till komplettering:**

**OBS:** De flesta föreningar är väldigt små. Systemet kommer köras under kort tid (inför och under årsmötet). Loggning ska vara tillräcklig för rättssäkerhet men inte överdriven.

1. **Loggningens omfattning**:
   - Alla autentiseringar (lyckade och misslyckade)
   - Alla administrativa ändringar (vem, vad, när)
   - Alla röstningar (antal röster per fråga, men inte vem som röstat på vad)
   - Alla systemfel och varningar
   - Alla åtkomster till känsliga data (t.ex. medlemsregister)
   - Alla ändringar i konfiguration

2. **Loggars integritet**:
   - Loggar ska skrivas till append-only-struktur (kan inte ändras eller raderas)
   - Kryptografisk kedja (varje loggpost innehåller hash av föregående post)
   - Export av loggar till extern lagring (t.ex. som del av protokollet)
   - Möjlighet att verifiera loggars integritet genom att kontrollera kedjan

3. **Loggars tillgänglighet**:
   - Loggar ska bevaras enligt föreningens stadgar (ofta tillsammans med protokollet)
   - Loggar ska vara sökbara och filterbara
   - Export av loggar i standardformat (JSON, CSV)
   - Anonymisering av personuppgifter i loggar efter mötet (enligt GDPR, med undantag för arkivlagen)

4. **Granskning av loggar**:
   - Automatisk övervakning av ovanliga händelser (t.ex. många misslyckade inloggningar)
   - Revisor ska ha tillgång till alla loggar
   - Dokumentation av granskningsresultat i revisionsberättelsen

#### 2.1.3 Matematisk verifierbarhet (E2E-V)

**Identifierade brister:**

- **Verifieringsprocess**: Begränsade detaljer om hur medlemmar ska kunna verifiera sina röster
- **Oberoende verifiering**: Inga krav på att oberoende part ska kunna verifiera rösträkningen
- **Dokumentation**: Inga krav på dokumentation av verifieringsprocessen
- **Utbildning**: Inga krav på att medlemmar ska utbildas i hur verifiering fungerar

**Förslag till komplettering:**

1. **Verifieringsprocess**:
   - Varje medlem får en unik kvittokod efter röstning
   - Systemet publicerar lista över alla kvittokoder och deras röster (anonymiserat)
   - Medlem kan verifiera att deras kvittokod finns med korrekt röst
   - Verifiering ska vara möjlig både under och efter mötet
   - Tydlig instruktion om hur verifiering genomförs

2. **Oberoende verifiering**:
   - Oberoende part (t.ex. revisor eller extern expert) ska kunna verifiera rösträkningen
   - Systemet ska exportera all data som behövs för verifiering
   - Verifieringsalgoritm ska vara öppen och dokumenterad
   - Möjlighet att köra verifiering i oberoende programvara

3. **Dokumentation**:
   - Detaljerad dokumentation av kryptografiska metoder
   - Matematiskt bevis för att systemet är korrekt
   - Dokumentation av alla antaganden och begränsningar
   - Peer review av dokumentationen av oberoende experter

4. **Utbildning**:
   - Enkel guide för medlemmar om hur verifiering fungerar
   - Video-tutorial om verifieringsprocessen
   - FAQ om vanliga frågor kring verifiering
   - Möjlighet att testa verifiering i testmiljö

### 2.2 Rättssäkerhet vid tvister

#### 2.2.1 Omröstning om valfusk

**Identifierade brister:**

- **Definition av valfusk**: Inga tydliga definitioner av vad som räknas som valfusk
- **Rapportering**: Inga rutiner för hur misstänkt valfusk ska rapporteras
- **Utredning**: Inga rutiner för hur utredning av valfusk ska genomföras
- **Sanktioner**: Inga krav på vilka sanktioner som kan tillämpas vid valfusk

**Förslag till komplettering:**

**OBS:** Detta ska ingå i dokumentation till föreningarna, inte som tvingande systemkrav.

1. **Definition av valfusk** (DOKUMENTATION):
   - Röstning med annans identitet
   - Manipulation av röster i databasen
   - Påverkan av andra medlemmars röster genom hot eller mutor
   - Teknisk manipulation av systemet
   - Spridning av falsk information om röstningsprocessen

2. **Rapportering** (DOKUMENTATION):
   - Tydlig process för att rapportera misstänkt valfusk
   - Rapportering till ombudsman och valkommitté
   - Anonymitetsskydd för den som rapporterar
   - Bekräftelse på att rapporten mottagits

3. **Utredning** (DOKUMENTATION):
   - Ombudsman och valkommitté utreder misstänkt valfusk
   - Tillgång till alla loggar och data som behövs för utredning
   - Möjlighet att anlita extern expert vid behov
   - Dokumentation av utredningsprocess och resultat
   - Berörda parter ska få möjlighet att yttra sig

4. **Sanktioner** (DOKUMENTATION):
   - Varning vid mindre allvarliga fall
   - Avstängning från röstning vid allvarligare fall
   - Uteslutning ur föreningen vid mycket allvarliga fall
   - Polisanmälan vid brottsliga handlingar
   - Ogiltigförklaring av röstning om valfusk påverkat resultatet

#### 2.2.2 Omprövning av beslut

**Identifierade brister:**

- **Omprövningsprocess**: Inga rutiner för hur beslut kan omprövas
- **Tidsgränser**: Inga krav på inom vilken tid omprövning kan begäras
- **Beslutsfattare**: Inga krav på vem som beslutar om omprövning
- **Dokumentation**: Inga krav på dokumentation av omprövningsprocess

**Förslag till komplettering:**

**OBS:** Detta ska ingå i dokumentation till föreningarna, inte som tvingande systemkrav.

1. **Omprövningsprocess** (DOKUMENTATION):
   - Medlem kan begära omprövning av beslut enligt föreningens stadgar
   - Begäran ska vara skriftlig och motiverad
   - Ombudsman bedömer om begäran är befogad
   - Om befogad: Nästa årsmöte beslutar om omprövning
   - Om omprövning beviljas: Nytt beslut fattas av årsmötet

2. **Tidsgränser** (DOKUMENTATION):
   - Tidsgränser styrs av föreningens stadgar
   - Systemet kan dokumentera begäran om omprövning
   - Systemet kan hjälpa till att spåra status på omprövning

3. **Beslutsfattare** (DOKUMENTATION):
   - Beslutsfattare styrs av föreningens stadgar
   - Vanligtvis: Ombudsman bedömer, årsmötet beslutar

4. **Dokumentation** (DOKUMENTATION):
   - Alla begäranden om omprövning ska dokumenteras
   - Ombudsmannens bedömning ska dokumenteras
   - Årsmötets beslut ska dokumenteras i protokollet
   - Alla dokument ska arkiveras tillsammans med årsmötesprotokollet

#### 2.2.3 Rättslig prövning

**Identifierade brister:**

- **Bevisning i domstol**: Inga krav på hur systemets data kan användas som bevis i domstol
- **Expertutlåtande**: Inga rutiner för hur expertutlåtande kan inhämtas vid tvist
- **Kostnader**: Inga krav på vem som bär kostnader för rättslig prövning
- **Juridiskt stöd**: Inga krav på att föreningen ska ha tillgång till juridiskt stöd

**Förslag till komplettering:**

**OBS:** Protokollet från årsmötet är det bindande materialet, oberoende av hur det upprättas. Systemet ska hjälpa till att göra ett så korrekt protokoll som möjligt.

1. **Bevisning i domstol**:
   - Protokoll med digitala signaturer ska vara juridiskt bindande
   - Loggar ska kunna exporteras i format som accepteras av domstol
   - Checksummor och tidsstämplar ska kunna verifieras av oberoende expert
   - Dokumentation av systemets säkerhet ska finnas tillgänglig
   - Protokollet är det primära beviset, systemets loggar är stödjande

2. **Expertutlåtande**:
   - Föreningen kan ha tillgång till oberoende IT-säkerhetsexpert
   - Expert ska kunna granska systemet och avge utlåtande
   - Expertutlåtande ska kunna användas som bevis i domstol
   - Kostnad för expertutlåtande bör budgeteras

3. **Kostnader**:
   - Kostnader styrs av föreningens stadgar och svensk föreningsrätt
   - Föreningen bär normalt kostnader för försvar av systemets säkerhet
   - Medlem som väcker talan bär egna kostnader
   - Om medlem vinner: Föreningen kan behöva ersätta medlemmens kostnader

4. **Juridiskt stöd**:
   - Föreningen bör ha tillgång till jurist med erfarenhet av föreningsrätt
   - Jurist ska konsulteras vid utformning av stadgeändringar
   - Jurist ska kunna ge råd vid tvister
   - Kostnad för juridiskt stöd bör budgeteras

### 2.3 Transparens och insyn

**OBS:** Beslutsdokumentation och publicering är årsmötets uppgift tillsammans med protokollet. Tillgång till information styrs av föreningens stadgar och anger hur lång tid innan årsmötet materialet måste finnas tillgängligt.

#### 2.3.1 Öppenhet i beslutsprocessen

**Identifierade brister:**

- **Beslutsdokumentation**: Begränsade krav på hur beslut ska dokumenteras
- **Motivering av beslut**: Inga krav på att beslut ska motiveras
- **Tillgång till underlag**: Inga krav på att beslutsunderlag ska vara tillgängligt
- **Publicering**: Inga krav på hur och när beslut ska publiceras

**Förslag till komplettering:**

**OBS:** Detta är årsmötets och styrelsens ansvar, systemet ska underlätta processen.

1. **Beslutsdokumentation**:
   - Systemet ska automatiskt dokumentera: Fråga, Förslag, Resultat, Datum, Tid
   - Beslut ska numreras löpande (t.ex. ÅM2025-001)
   - Beslut ska kategoriseras (stadgeändring, budget, personval, etc.)
   - Beslut ska kopplas till relevant dagordningspunkt

2. **Motivering av beslut**:
   - Sekreteraren kan lägga till motivering i protokollet
   - Avvikande mening ska kunna antecknas i protokollet
   - Motivering ska vara kortfattad men tydlig

3. **Tillgång till underlag**:
   - Allt beslutsunderlag ska vara tillgängligt för medlemmar enligt stadgarna
   - Underlag ska publiceras enligt stadgarnas tidskrav
   - Underlag ska arkiveras tillsammans med protokollet

4. **Publicering**:
   - Protokoll ska publiceras enligt föreningens stadgar
   - Beslut ska publiceras på föreningens hemsida
   - Medlemmar ska notifieras när protokoll publicerats

#### 2.3.2 Medlemmars insyn

**Identifierade brister:**

- **Rätt till information**: Inga tydliga krav på vilken information medlemmar har rätt till
- **Begäran om information**: Inga rutiner för hur medlemmar kan begära information
- **Svarstid**: Inga krav på hur snabbt föreningen ska svara på informationsbegäran
- **Avgifter**: Inga krav på om föreningen kan ta ut avgifter för information

**Förslag till komplettering:**

**OBS:** Detta styrs av föreningens stadgar. Systemet ska underlätta tillgång till information.

1. **Rätt till information**:
   - Styrs av föreningens stadgar
   - Vanligtvis rätt till: Protokoll, Beslut, Budget, Verksamhetsberättelse, Revisionsberättelse
   - Medlemmar har rätt till sina egna personuppgifter (GDPR)
   - Medlemmar har rätt till information om hur systemet fungerar

2. **Begäran om information**:
   - Tydlig process för att begära information (enligt stadgarna)
   - Systemet kan underlätta export av information
   - Bekräftelse på att begäran mottagits

3. **Svarstid**:
   - Styrs av föreningens stadgar och GDPR
   - GDPR kräver svar inom 30 dagar för personuppgifter
   - Systemet kan underlätta snabb tillgång till information

4. **Avgifter**:
   - Styrs av föreningens stadgar
   - Enkel information: Vanligtvis kostnadsfritt
   - Omfattande information: Rimlig avgift för administration kan tas ut

---

## Analys 3: Brister för specifika föreningstyper och användningsfall

### 3.1 Stadgespecifika krav

#### 3.1.1 STV-röstning (Single Transferable Vote)

**Identifierade brister:**

- **Implementationsdetaljer**: Begränsade detaljer om hur STV-algoritmen ska implementeras
- **Oavgjort val**: Inga detaljer om hur systemet ska hantera oavgjort val
- **Observatörsrätt**: Inga krav på hur kandidaters observatörsrätt vid rösträkning ska hanteras digitalt
- **Publicering av resultat**: Inga detaljer om hur resultat ska publiceras

**Förslag till komplettering:**

1. **Implementationsdetaljer**:
   - Algoritm ska följa exakt beskrivning i föreningens stadgar
   - Steg-för-steg-visning av hur röster överförs mellan kandidater
   - Tydlig dokumentation av algoritmen med exempel
   - Möjlighet att exportera detaljerad rösträkning för granskning
   - Automatisk kontroll av att algoritmen följer stadgarna

2. **Oavgjort val**:
   - Systemet ska automatiskt upptäcka oavgjort val (exakt lika antal röster i alla kategorier)
   - Tydlig information till valkommitté om att valet är oavgjort
   - Möjlighet att registrera kandidaternas råd (lottning eller nytt val)
   - Dokumentation av beslut i protokollet
   - Om lottning: Transparent process med dokumenterad slumpgenerator

3. **Observatörsrätt**:
   - Kandidater ska kunna utse observatör som får särskild åtkomst
   - Observatör ska kunna se rösträkning i realtid (men inte vem som röstat på vad)
   - Observatör ska kunna exportera rösträkningsdata för egen verifiering
   - Observatör ska kunna ställa frågor till valkommitté under rösträkning
   - Alla observatörers åtkomst ska loggas

4. **Publicering av resultat**:
   - Resultat ska publiceras enligt föreningens stadgar
   - Resultat ska innehålla: Antal röster per kandidat i varje omgång
   - Automatisk distribution via e-post och publicering på hemsida
   - Bekräftelse på att alla mottagare fått resultatet

#### 3.1.2 Valkommitténs roll

**Identifierade brister:**

- **Ansvar vid digital röstning**: Inga tydliga krav på valkommitténs ansvar vid digital röstning
- **Oberoende rösträkning**: Inga detaljer om hur "oberoende grupp" ska utses vid digital röstning
- **Förtidsröstning**: Inga detaljer om hur valkommittén ska hantera förtidsröster digitalt
- **Testning**: Inga krav på att valkommittén ska testa systemet före mötet

**Förslag till komplettering:**

1. **Ansvar vid digital röstning**:
   - Valkommittén ansvarar för att utse oberoende grupp för rösträkning
   - Valkommittén ansvarar för att systemet testas före mötet
   - Valkommittén ansvarar för att kandidaters observatörer får åtkomst
   - Valkommittén ansvarar för att resultat publiceras korrekt
   - Valkommittén ansvarar för att hantera eventuella invändningar

2. **Oberoende rösträkning**:
   - Oberoende grupp kan vara valkommittén själva (enligt föreningens stadgar)
   - Oberoende grupp ska ha särskild åtkomst till systemet
   - Oberoende grupp ska kunna verifiera rösträkning oberoende av systemet
   - Oberoende grupp ska dokumentera sin granskning
   - Oberoende grupp ska intyga resultatet

3. **Förtidsröstning**:
   - Valkommittén ska övervaka förtidsröstning löpande
   - Valkommittén ska INTE kunna se resultat av förtidsröstning före klubbslag
   - Valkommittén ska kunna se antal förtidsröster (men inte innehåll)
   - Valkommittén ska kunna makulera förtidsröst vid manuell röstning
   - Valkommittén ska dokumentera alla makuleringar

4. **Testning**:
   - Valkommittén ska testa systemet minst 2 veckor före mötet
   - Testning ska omfatta: Autentisering, Röstning, Rösträkning, Protokollgenerering
   - Testning ska dokumenteras
   - Eventuella problem ska rapporteras till styrelsen
   - Systemet får inte användas om kritiska problem upptäcks

#### 3.1.3 Ombudsmannens roll

**Identifierade brister:**

- **Tillgång till systemet**: Inga krav på vilken åtkomst ombudsman ska ha till systemet
- **Granskning av loggar**: Inga detaljer om hur ombudsman ska kunna granska loggar
- **Hantering av klagomål**: Inga rutiner för hur ombudsman ska hantera klagomål relaterade till systemet
- **Rapportering**: Inga krav på att ombudsman ska rapportera om systemet i sin årsrapport

**Förslag till komplettering:**

1. **Tillgång till systemet**:
   - Ombudsman ska ha särskild roll med läsrättigheter
   - Ombudsman ska kunna se alla loggar (men inte koppling mellan person och röst)
   - Ombudsman ska kunna se administrativa ändringar
   - Ombudsman ska kunna exportera data för granskning
   - Ombudsmannens åtkomst ska loggas

2. **Granskning av loggar**:
   - Ombudsman ska regelbundet granska loggar (minst en gång per kvartal)
   - Ombudsman ska särskilt granska loggar efter årsmöte
   - Ombudsman ska kunna begära förklaring av ovanliga händelser
   - Ombudsman ska dokumentera sin granskning
   - Ombudsman ska rapportera eventuella problem till styrelsen

3. **Hantering av klagomål**:
   - Tydlig process för att rapportera klagomål till ombudsman
   - Ombudsman ska utreda alla klagomål relaterade till systemet
   - Ombudsman ska ha tillgång till all data som behövs för utredning
   - Ombudsman ska dokumentera alla klagomål och utredningar
   - Ombudsman ska rapportera till årsmötet om klagomål

4. **Rapportering**:
   - Ombudsman ska i sin årsrapport rapportera om systemets användning
   - Ombudsman ska rapportera antal klagomål och hur de hanterats
   - Ombudsman ska rapportera eventuella problem med systemet
   - Ombudsman ska ge rekommendationer för förbättringar
   - Ombudsman ska bedöma om systemet följer stadgarna

#### 3.1.4 Tekniskt haveri

**Identifierade brister:**

- **Definition av haveri**: Inga tydliga definitioner av vad som räknas som tekniskt haveri
- **Beslutsbefogenheter**: Begränsade detaljer om mötesordförandens befogenheter
- **Dokumentation**: Inga krav på hur beslut vid haveri ska dokumenteras
- **Kommunikation**: Inga krav på hur medlemmar ska informeras vid haveri

**Förslag till komplettering:**

1. **Definition av haveri**:
   - Kortvarigt haveri: Systemet är nere < 5 minuter (ingen åtgärd krävs)
   - Mindre haveri: Systemet är nere 5-30 minuter (förlängd röstningstid)
   - Större haveri: Systemet är nere > 30 minuter (kräver mötets godkännande)
   - Kritiskt haveri: Systemet kan inte återställas (manuell röstning)
   - Partiellt haveri: Vissa funktioner fungerar inte (bedöms från fall till fall)

2. **Beslutsbefogenheter**:
   - Mötesordförande kan förlänga röstningstid vid mindre haveri
   - Mötesordförande kan pausa mötet vid större haveri
   - Mötesordförande kan besluta om manuell röstning vid kritiskt haveri
   - Beslut vid större haveri kräver godkännande av mötet (enkel majoritet)
   - Alla beslut ska dokumenteras i protokollet

3. **Dokumentation**:
   - Systemet ska automatiskt logga alla tekniska problem
   - Mötesordförandens beslut ska dokumenteras i protokollet
   - Tidpunkt för haveri och återställning ska dokumenteras
   - Påverkan på röstning ska dokumenteras (t.ex. förlängd tid)
   - Åtgärder för att förhindra upprepning ska dokumenteras

4. **Kommunikation**:
   - Medlemmar ska informeras omedelbart vid haveri
   - Tydlig information om vad som hänt och vad som görs
   - Uppdateringar var 5:e minut vid längre haveri
   - Information om förlängd röstningstid eller andra åtgärder
   - Bekräftelse när systemet är återställt

### 3.2 Paragrafryttare och formalia

#### 3.2.1 Exakt stadgetolkning

**Identifierade brister:**

- **Stadgekonflikt**: Inga rutiner för hur systemet ska hantera konflikter mellan stadgar och systemets funktionalitet
- **Tolkningsfrågor**: Inga rutiner för hur tolkningsfrågor ska hanteras
- **Stadgeändringar**: Inga rutiner för hur systemet ska uppdateras vid stadgeändringar
- **Dokumentation**: Inga krav på att systemet ska dokumentera hur det följer stadgarna

**Förslag till komplettering:**

1. **Stadgekonflikt**:
   - Systemet ska alltid följa stadgarna (inte tvärtom)
   - Om konflikt upptäcks: Systemet ska inte användas förrän konflikten lösts
   - Ombudsman ska bedöma om systemet följer stadgarna
   - Vid osäkerhet: Juridisk rådgivning ska inhämtas
   - Alla konflikter ska dokumenteras och rapporteras till årsmötet

2. **Tolkningsfrågor**:
   - Tydlig process för att ställa tolkningsfrågor
   - Ombudsman ger preliminär tolkning
   - Styrelsen kan begära juridisk rådgivning
   - Årsmötet fattar slutligt beslut om tolkning
   - Alla tolkningar ska dokumenteras och publiceras

3. **Stadgeändringar**:
   - Systemet ska granskas efter varje stadgeändring
   - Nödvändiga ändringar i systemet ska identifieras
   - Ändringar ska genomföras och testas före nästa möte
   - Dokumentation ska uppdateras
   - Ombudsman ska verifiera att systemet följer nya stadgarna

4. **Dokumentation**:
   - Tydlig dokumentation av hur systemet implementerar varje relevant stadgeparagraf
   - Korsreferenser mellan systemfunktioner och stadgar
   - Dokumentation ska uppdateras vid ändringar
   - Dokumentation ska vara tillgänglig för alla medlemmar
   - Ombudsman ska granska dokumentationen årligen

#### 3.2.2 Formella krav på mötet

**Identifierade brister:**

- **Mötets öppnande**: Inga krav på hur mötets öppnande ska hanteras i systemet
- **Dagordningens godkännande**: Inga detaljer om hur dagordningen ska godkännas
- **Röstlängdens fastställande**: Begränsade detaljer om hur röstlängden ska fastställas
- **Mötets avslutande**: Inga krav på hur mötets avslutande ska hanteras

**Förslag till komplettering:**

1. **Mötets öppnande**:
   - Mötesordförande öppnar mötet genom att klicka på "Öppna möte"
   - Systemet registrerar tidpunkt för öppnande
   - Systemet visar välkomstmeddelande till alla deltagare
   - Systemet aktiverar möjlighet att rösta (om digital röstning)
   - Mötets öppnande dokumenteras i protokollet

2. **Dagordningens godkännande**:
   - Dagordning visas för alla deltagare
   - Mötesordförande begär godkännande av dagordning
   - Omröstning om godkännande (enkel majoritet)
   - Om godkänd: Mötet fortsätter enligt dagordning
   - Om inte godkänd: Möjlighet att föreslå ändringar
   - Godkänd dagordning dokumenteras i protokollet

3. **Röstlängdens fastställande**:
   - Systemet visar antal fysiskt närvarande (registrerade)
   - Systemet visar antal digitalt närvarande (inloggade)
   - Mötesordförande begär godkännande av röstlängd
   - Omröstning om godkännande (enkel majoritet)
   - Röstlängd kan uppdateras under mötet (eftersläntrare)
   - Slutlig röstlängd per fråga fastställs dynamiskt

4. **Mötets avslutande**:
   - Mötesordförande avslutar mötet genom att klicka på "Avsluta möte"
   - Systemet registrerar tidpunkt för avslutande
   - Systemet stänger möjlighet att rösta
   - Systemet genererar preliminärt protokoll
   - Mötets avslutande dokumenteras i protokollet

#### 3.2.3 Rösträkningsdetaljer

**Identifierade brister:**

- **Rösträkningens transparens**: Begränsade krav på hur transparent rösträkningen ska vara
- **Tidpunkt för rösträkning**: Inga detaljer om när rösträkning ska påbörjas
- **Presentation av resultat**: Begränsade detaljer om hur resultat ska presenteras
- **Omräkning**: Inga rutiner för hur omräkning ska hanteras vid invändningar

**Förslag till komplettering:**

1. **Rösträkningens transparens**:
   - Rösträkning ska vara synlig för alla deltagare i realtid
   - Steg-för-steg-visning av hur röster räknas (särskilt vid STV)
   - Tydlig förklaring av varje steg i rösträkningen
   - Möjlighet att pausa och förklara vid behov
   - Kandidaters observatörer ska kunna följa rösträkningen

2. **Tidpunkt för rösträkning**:
   - Rösträkning påbörjas omedelbart efter klubbslag
   - Systemet väntar 2 sekunder för att säkerställa att alla röster kommit fram
   - Tydlig indikator om att rösträkning pågår
   - Uppskattad tid för rösträkning visas
   - Resultat presenteras så snart rösträkning är klar

3. **Presentation av resultat**:
   - Resultat visas på projektor för fysiskt närvarande
   - Resultat visas i app för digitalt närvarande
   - Tydlig visualisering av resultat (diagram, tabeller)
   - Detaljerad rösträkning tillgänglig för granskning
   - Resultat dokumenteras automatiskt i protokollet

4. **Omräkning**:
   - Möjlighet att begära omräkning vid invändningar
   - Omräkning ska göras av oberoende grupp
   - Omräkning ska vara transparent och dokumenterad
   - Om omräkning ger annat resultat: Nytt resultat gäller
   - Omräkning och resultat dokumenteras i protokollet

### 3.3 Föreningsspecifika funktioner

#### 3.3.1 Stiftelser och externa organisationer

**Identifierade brister:**

- **Bidragsbeslut**: Inga specifika krav på hur beslut om bidrag till externa organisationer ska hanteras
- **Fleråriga beslut**: Inga krav på hur fleråriga beslut ska hanteras i systemet
- **Uppföljning**: Inga rutiner för hur uppföljning av bidrag ska dokumenteras

**Förslag till komplettering:**

1. **Bidragsbeslut**:
   - Tydlig presentation av förslag om bidrag
   - Information om tidigare bidrag och användning
   - Möjlighet att rösta på olika nivåer av bidrag
   - Dokumentation av beslut i protokollet
   - Automatisk notifikation till mottagande organisation

2. **Fleråriga beslut**:
   - Systemet ska kunna hantera beslut som gäller flera år
   - Tydlig markering av att beslutet är flerårig
   - Påminnelse till styrelsen om fleråriga åtaganden
   - Uppföljning av fleråriga beslut vid varje årsmöte
   - Dokumentation av hur fleråriga beslut följs upp

3. **Uppföljning**:
   - Rapport om hur tidigare bidrag använts
   - Möjlighet att ställa frågor om användning
   - Dokumentation av uppföljning i protokollet
   - Möjlighet att justera framtida bidrag baserat på uppföljning

#### 3.3.2 Internationella medlemmar

**Identifierade brister:**

- **Autentisering**: Begränsade detaljer om hur internationella medlemmar ska autentiseras
- **Språkstöd**: Inga krav på språkstöd för internationella medlemmar
- **Tidszoner**: Inga krav på hur tidszoner ska hanteras
- **Teknisk support**: Inga krav på support för internationella medlemmar

**Förslag till komplettering:**

1. **Autentisering**:
   - Internationella medlemmar utan svenskt personnummer autentiseras manuellt
   - Valkommittén verifierar identitet via video eller fysiskt möte
   - Tillfälligt lösenord skickas via säker kanal
   - Alla manuella verifieringar loggas med ansvarig person
   - Tydlig dokumentation av verifieringsprocess

2. **Språkstöd**:
   - Systemet ska finnas på både svenska och engelska
   - Möjlighet att välja språk vid inloggning
   - Alla viktiga dokument ska finnas på båda språken
   - Tydlig markering av vilket språk varje dokument är på
   - Support ska finnas på båda språken

3. **Tidszoner**:
   - Systemet ska visa tid i både svensk tid och användarens lokala tid
   - Tydlig information om när mötet börjar i olika tidszoner
   - Påminnelser ska skickas i användarens lokala tid
   - Möjlighet att välja tidszon i inställningar
   - Automatisk detektion av tidszon baserat på IP-adress

4. **Teknisk support**:
   - Support ska finnas på både svenska och engelska
   - Tydlig information om hur man får support
   - Support ska vara tillgänglig under mötet
   - Dokumentation ska finnas på båda språken
   - FAQ för vanliga problem

#### 3.3.3 Rådgivande motioner

**Identifierade brister:**

- **Definition**: Inga tydliga definitioner av vad som räknas som rådgivande motion
- **Hantering**: Inga detaljer om hur rådgivande motioner ska hanteras i systemet
- **Uppföljning**: Inga rutiner för hur uppföljning av rådgivande beslut ska dokumenteras
- **Rapportering**: Inga krav på hur styrelsen ska rapportera om rådgivande beslut

**Förslag till komplettering:**

1. **Definition**:
   - Rådgivande motion: Motion som inte är bindande för styrelsen
   - Tydlig markering av att motionen är rådgivande
   - Information om vad rådgivande innebär
   - Skillnad mellan bindande och rådgivande beslut ska förklaras

2. **Hantering**:
   - Rådgivande motioner ska hanteras separat från bindande beslut
   - Tydlig markering i dagordningen
   - Omröstning ska visa att det är rådgivande
   - Resultat ska dokumenteras som "Årsmötets rekommendation"
   - Styrelsen ska ta ställning till rekommendationen

3. **Uppföljning**:
   - Styrelsen ska rapportera om hur rådgivande beslut följts upp
   - Rapport ska ingå i verksamhetsberättelsen
   - Tydlig information om varför rekommendation följts eller inte följts
   - Möjlighet för medlemmar att ställa frågor om uppföljning

4. **Rapportering**:
   - Punkt 18 i dagordningen: "Rapport om beslut från årsmötet 2024"
   - Styrelsen ska rapportera om alla rådgivande beslut från föregående år
   - Tydlig information om vilka åtgärder som vidtagits
   - Dokumentation i verksamhetsberättelsen

### 3.4 Testning och kvalitetssäkring

#### 3.4.1 Obligatorisk testning före första användning

**Identifierade brister:**

- **Testomfattning**: Begränsade detaljer om vad som ska testas
- **Testdokumentation**: Inga krav på hur testning ska dokumenteras
- **Acceptanskriterier**: Inga tydliga kriterier för när systemet är godkänt
- **Ansvar**: Inga tydliga krav på vem som ansvarar för testning

**Förslag till komplettering:**

1. **Testomfattning**:
   - **Funktionstestning**: Alla användarroller, alla röstningsscenarier, alla valmetoder
   - **Säkerhetstestning**: Penetrationstestning, kodgranskning, krypteringsverifiering
   - **Prestanda**: Belastningstestning med simulerade användare
   - **Tillgänglighet**: WCAG 2.1 nivå AA-testning med skärmläsare
   - **Kompatibilitet**: Testning på olika enheter, webbläsare och operativsystem
   - **Återställning**: Testning av backup och återställning
   - **Haveri**: Simulering av tekniskt haveri och verifiering av fallback-rutiner

2. **Testdokumentation**:
   - Testplan ska upprättas före testning
   - Alla tester ska dokumenteras med: Vad som testades, Resultat, Datum, Ansvarig
   - Eventuella problem ska dokumenteras med: Beskrivning, Allvarlighetsgrad, Åtgärd
   - Testrapport ska sammanfatta alla tester och resultat
   - Testrapport ska presenteras för årsmötet

3. **Acceptanskriterier**:
   - Alla kritiska funktioner ska fungera korrekt
   - Inga kritiska säkerhetsproblem får finnas
   - Prestanda ska uppfylla krav (API-responstid < 150ms)
   - Tillgänglighet ska uppfylla WCAG 2.1 nivå AA
   - Backup och återställning ska fungera korrekt
   - Dokumentation ska vara komplett och korrekt

4. **Ansvar**:
   - Styrelsen ansvarar för att testning genomförs
   - Valkommittén ansvarar för funktionstestning
   - Oberoende säkerhetsexpert ansvarar för säkerhetstestning
   - IT-ansvarig ansvarar för teknisk testning
   - Testresultat ska rapporteras till årsmötet

#### 3.4.2 Pilottest

**Identifierade brister:**

- **Omfattning**: Inga detaljer om vad pilottest ska omfatta
- **Deltagare**: Inga krav på vilka som ska delta i pilottest
- **Utvärdering**: Inga krav på hur pilottest ska utvärderas
- **Tidpunkt**: Inga krav på när pilottest ska genomföras

**Förslag till komplettering:**

1. **Omfattning**:
   - Pilottest ska simulera ett komplett årsmöte
   - Alla roller ska testas: Ordförande, Sekreterare, Valkommitté, Deltagare
   - Alla typer av röstningar ska testas: Enkel majoritet, STV, etc.
   - Tekniskt haveri ska simuleras
   - Feedback ska samlas in från alla deltagare

2. **Deltagare**:
   - Minst 20 testdeltagare (för att simulera realistisk belastning)
   - Representation från olika roller och teknisk kompetens
   - Minst en person med funktionshinder (för tillgänglighetstestning)
   - Minst en person med begränsad teknisk erfarenhet
   - Oberoende observatör som dokumenterar testningen

3. **Utvärdering**:
   - Enkät till alla deltagare efter pilottest
   - Dokumentation av alla problem som upptäcktes
   - Analys av feedback och identifiering av förbättringsområden
   - Åtgärdsplan för att åtgärda problem
   - Beslut om systemet är redo för skarpt bruk

4. **Tidpunkt**:
   - Pilottest ska genomföras minst 3 månader före första skarpa användning
   - Tid för åtgärder och omtestning ska finnas
   - Nytt pilottest om stora ändringar görs
   - Årlig pilottest rekommenderas även efter första användning

#### 3.4.3 Utvärdering efter första användning

**Identifierade brister:**

- **Utvärderingsprocess**: Begränsade detaljer om hur utvärdering ska genomföras
- **Kriterier för återgång**: Inga tydliga kriterier för när systemet ska överges
- **Kontinuerlig förbättring**: Inga rutiner för kontinuerlig förbättring efter första användning
- **Rapportering**: Begränsade krav på hur utvärdering ska rapporteras

**Förslag till komplettering:**

1. **Utvärderingsprocess**:
   - Enkät till alla deltagare efter mötet
   - Intervjuer med nyckelpersoner (ordförande, valkommitté, etc.)
   - Analys av loggar och tekniska problem
   - Jämförelse med tidigare manuella möten
   - Kostnads-nyttoanalys

2. **Kriterier för återgång**:
   - Systemet ska överges om:
     - Kritiska säkerhetsproblem upptäcks som inte kan åtgärdas
     - Rättssäkerheten inte kan garanteras
     - Majoriteten av medlemmarna är missnöjda
     - Kostnaden är orimligt hög jämfört med nytta
     - Tekniska problem gör systemet opålitligt
   - Beslut om återgång fattas av nästa årsmöte

3. **Kontinuerlig förbättring**:
   - Feedback ska samlas in efter varje möte
   - Förbättringsförslag ska prioriteras och implementeras
   - Regelbunden säkerhetsgranskning (minst vart tredje år)
   - Uppdatering av dokumentation baserat på erfarenheter
   - Delning av erfarenheter med andra föreningar

4. **Rapportering**:
   - Utvärderingsrapport ska presenteras vid nästa årsmöte
   - Rapport ska innehålla: Sammanfattning, Problem, Förbättringar, Rekommendationer
   - Rapport ska publiceras för alla medlemmar
   - Möjlighet för medlemmar att kommentera rapporten
   - Årsmötet beslutar om systemet ska fortsätta användas

### 3.5 Övergångsbestämmelser

#### 3.5.1 Första användning

**Identifierade brister:**

- **Godkännande**: Begränsade detaljer om vad som krävs för godkännande
- **Reservrutin**: Inga detaljer om hur reservrutin ska fungera
- **Kommunikation**: Inga krav på hur medlemmar ska informeras om övergången
- **Utbildning**: Inga krav på utbildning av funktionärer och medlemmar

**Förslag till komplettering:**

1. **Godkännande**:
   - Säkerhetsgranskning av oberoende expert ska vara genomförd
   - Pilottest ska vara genomfört med godkänt resultat
   - Valkommittén ska ha testat systemet och godkänt det
   - Ombudsman ska ha granskat systemet och bekräftat att det följer stadgarna
   - Styrelsen ska ha fattat beslut om att systemet får användas
   - Testresultat ska rapporteras till årsmötet

2. **Reservrutin**:
   - Manuell röstning ska alltid vara möjlig som reserv
   - Röstsedlar i pappersformat ska finnas tillgängliga
   - Valkommittén ska vara förberedd på manuell rösträkning
   - Tydliga rutiner för övergång från digital till manuell röstning
   - Dokumentation av reservrutin ska finnas tillgänglig

3. **Kommunikation**:
   - Information om digitalt röstningssystem ska skickas ut enligt föreningens stadgar
   - Tydlig information om hur systemet fungerar
   - Information om vad som krävs för att delta (enhet, webbläsare, etc.)
   - Möjlighet att ställa frågor och få support
   - Påminnelse enligt föreningens stadgar

4. **Utbildning**:
   - Funktionärer ska utbildas i systemet enligt föreningens tidplan
   - Video-tutorials ska finnas tillgängliga för alla medlemmar
   - Testmiljö där medlemmar kan prova systemet
   - Support ska finnas tillgänglig före och under mötet
   - FAQ med vanliga frågor och svar

#### 3.5.2 Hybridlösning under övergång

**Identifierade brister:**

- **Definition**: Inga detaljer om vad hybridlösning innebär
- **Hantering**: Inga rutiner för hur hybrid röstning ska hanteras
- **Rättssäkerhet**: Inga krav på hur rättssäkerhet garanteras vid hybrid
- **Tidplan**: Inga krav på hur länge hybridlösning ska användas

**Förslag till komplettering:**

1. **Definition**:
   - Hybridlösning: Både digital och manuell röstning används samtidigt
   - Förtidsröstning: Alltid digital (enligt motionen)
   - Röstning under mötet: Kan vara digital, manuell eller hybrid
   - Hybrid innebär: Fysiskt närvarande kan välja digital eller manuell röstning
   - Distansdeltagare: Alltid digital röstning

2. **Hantering**:
   - Tydlig information om vilka alternativ som finns
   - Fysiskt närvarande som väljer manuell röstning registreras av valkommittén
   - Manuella röster räknas och läggs in i systemet av valkommittén
   - Digital och manuell rösträkning kombineras för slutresultat
   - Tydlig dokumentation av hur röster räknats

3. **Rättssäkerhet**:
   - Samma säkerhetsnivå för digital och manuell röstning
   - Manuella röster ska hanteras enligt samma principer som tidigare
   - Valkommittén ansvarar för att manuella röster räknas korrekt
   - Observatörer ska kunna övervaka både digital och manuell rösträkning
   - Dokumentation av både digital och manuell röstning

4. **Tidplan**:
   - Hybridlösning kan användas första året som övergång
   - Utvärdering efter första året om hybrid ska fortsätta
   - Mål: Övergång till helt digital röstning inom 2 år
   - Manuell röstning ska alltid finnas som reserv vid tekniskt haveri
   - Beslut om övergång fattas av årsmötet

---

## Sammanfattning och prioritering

### Kritiska brister (måste åtgärdas före första användning)

1. **Protokollhantering**: Automatisk generering, sekreteraren kan kontinuerligt lägga till kommentarer, digital justering (Freja eID), export till PDF/dokument
2. **STV-implementation**: Exakt enligt stadgarna med observatörsrätt
3. **Tekniskt haveri**: Tydliga rutiner och beslutsbefogenheter
4. **Säkerhetsgranskning**: Oberoende expert, penetrationstestning, kodgranskning
5. **Pilottest**: Komplett simulering av årsmöte med utvärdering
6. **Revisionsspår**: Append-only-loggar med kryptografisk kedja
7. **E2E-V**: Matematisk verifierbarhet med kvittokoder
8. **Datadump och återställning**: Snabb återställning (< 5 minuter), flytta till ny dator vid haveri

### Viktiga brister (bör åtgärdas före första användning)

1. **WCAG 2.1 nivå AA**: Tillgänglighet för alla användare
2. **Ombudsmannens tillgång**: Särskild roll med läsrättigheter
3. **Valkommitténs testning**: Obligatorisk testning 2 veckor före mötet
4. **Kallelsehantering**: Automatisk kontroll av tider och innehåll (enligt föreningens stadgar)
5. **Beslutsmässighet**: Konfigurerbar quorum-nivå per frågetyp
6. **Språkstöd**: Komplett stöd för svenska och engelska
7. **Tidszoner**: Hantering för internationella medlemmar
8. **Utbildning**: Video-tutorials och testmiljö för medlemmar

### Önskvärda förbättringar (kan åtgärdas efter första användning)

1. **Kontinuerlig förbättring**: Feedback och förbättringsprocess
2. **Kostnads-nyttoanalys**: Jämförelse med manuella möten
3. **Delning av erfarenheter**: Med andra föreningar
4. **Automatisering**: Fler automatiska kontroller och påminnelser
5. **Rapportering**: Förbättrad rapportering till olika intressenter
6. **Integration**: Integration med andra system (medlemsregister, etc.)

### Rekommendationer

1. **Börja med kritiska brister**: Fokusera på rättssäkerhet och säkerhet
2. **Använd hybridlösning första året**: Minska risk och bygga förtroende
3. **Investera i testning**: Grundlig testning sparar tid och pengar i längden
4. **Dokumentera allt**: Bra dokumentation är avgörande för rättssäkerhet
5. **Lyssna på feedback**: Kontinuerlig förbättring baserat på användarfeedback
6. **Var transparent**: Öppenhet bygger förtroende hos medlemmarna
7. **Planera för långsiktighet**: Systemet ska kunna användas i många år
8. **Anpassa till föreningen**: Systemet ska vara flexibelt och kunna anpassas till olika föreningars behov
9. **Håll det enkelt**: Systemet ska vara enkelt att använda, särskilt för små föreningar

### Dokumentation till föreningar (inte systemkrav)

Följande ska ingå i dokumentation till föreningar, inte som tvingande systemkrav:

1. **Valfusk**: Definition, rapportering, utredning, sanktioner
2. **Omprövning av beslut**: Process, tidsgränser, beslutsfattare
3. **Rättslig prövning**: Bevisning, expertutlåtande, kostnader
4. **Transparens**: Beslutsdokumentation, publicering (styrs av stadgarna)
5. **Medlemmars insyn**: Rätt till information, svarstider (styrs av stadgarna)

### Viktiga förtydliganden

1. **Systemets livscykel**: Systemet körs normalt bara under kort tid (inför och under årsmötet), startas upp inför årsmötet och stängs ner till nästa årsmöte
2. **Backup**: Att backa upp systemet är meningslöst då det finns på GitHub. Aktuell data är viktigt för att kunna flytta till ny dator vid haveri
3. **Arkivering**: Efter årsmötet är protokollet med bilagor den enda artefakt som behöver behållas (styrs av stadgar/styrelsen)
4. **Protokollet är bindande**: Protokollet från årsmötet är det bindande materialet, oberoende av hur det upprättas
5. **Individuella skillnader**: Många krav är individuella per förening (dagordningsändringar, revision, ansvarsfrihet, etc.)
6. **Små föreningar**: De flesta föreningar är väldigt små, systemet ska inte vara överkomplicerat
7. **GDPR och arkivlagen**: Arkivlagen för mötesdeltagare åsidosätter vissa GDPR-krav
