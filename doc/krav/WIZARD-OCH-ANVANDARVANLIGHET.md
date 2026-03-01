# Wizard och Användarvänlighet

## 1. Översikt

Eftersom de flesta användare endast använder systemet en gång om året är det kritiskt att systemet är extremt enkelt att använda samtidigt som all säkerhet är inbyggd. Användaren ska inte behöva tänka på säkerhet - det ska "bara fungera".

## 2. Uppsättningswizard för årsmöte

### 2.1 Målgrupp

Mötessamordnare (ofta sekreterare eller vice ordförande) som ska sätta upp ett nytt årsmöte.

### 2.2 Wizard-flöde

#### Steg 1: Grundinformation

**Frågor:**

- Mötesnamn: "Årsmöte 2026"
- Datum: Datumväljare
- Tid: Tidsväljare
- Plats: Textfält (t.ex. "Wisby Strand, Visby")
- Mötestyp: Dropdown (Årsmöte, Extra årsmöte, Styrelsemöte)

**Hjälptext:**
"Detta är grundinformationen som kommer visas i kallelsen och på startsidan."

**Förhandsvisning:**
Visar hur kallelsen kommer se ut med ifylld information.

#### Steg 2: Dagordning

**Alternativ A: Använd standardmall**

- "Använd standarddagordning enligt stadgarna"
- Förhandsvisning av standardmallen
- Knapp: "Använd denna mall"

**Alternativ B: Importera från föregående år**

- "Kopiera dagordning från Årsmöte 2025"
- Dropdown med tidigare möten
- Knapp: "Importera"

**Alternativ C: Bygg från scratch**

- "Skapa egen dagordning"
- Drag-and-drop-gränssnitt (Trello-liknande)

**Hjälptext:**
"De flesta föreningar använder standardmallen. Du kan alltid anpassa den senare."

**Rekommendation:**
"✅ Rekommenderat: Använd standardmall (sparar 30 minuter)"

#### Steg 3: Anpassa dagordning

**För varje punkt:**

- Titel: Textfält
- Typ: Dropdown (Informativ, Röstpunkt, Personval)
- Beskrivning: Textfält (valfritt)
- Valmetod (om röstpunkt): Dropdown (Enkel majoritet, Absolut majoritet, STV, etc.)
- Tidsgräns för röstning: Dropdown (30s, 60s, 90s, 120s)

**Drag-and-drop:**

- Dra punkter för att ändra ordning
- Lägg till ny punkt: Knapp "+"
- Ta bort punkt: Knapp "×"

**Förhandsvisning:**
Visar hur dagordningen kommer se ut på projektorn och i appen.

#### Steg 4: Ladda upp handlingar

**För varje agendapunkt:**

- "Lägg till dokument"
- Dra-och-släpp-område för filer
- Stödda format: PDF, Markdown, Word (konverteras till PDF)
- Förhandsvisning av uppladdade dokument

**Hjälptext:**
"Ladda upp verksamhetsberättelse, budget, revisionsberättelse, etc."

**Automatisk koppling:**

- Systemet föreslår vilken punkt dokumentet hör till baserat på filnamn
- "Verksamhetsberättelse.pdf" → Punkt 7: Godkännande av styrelsens årliga rapport

#### Steg 5: Kandidater (om personval)

**För varje personval:**

- "Lägg till kandidat"
- Namn: Textfält
- E-post: Textfält
- Position: Dropdown (Ordförande, Kassör, Ledamot, etc.)
- Profilbild: Bilduppladdning med crop-funktion
- Presentation: Markdown-editor eller textfält

**Hjälptext:**
"Kandidater kan också läggas till senare av valberedningen."

**Förhandsvisning:**
Visar hur kandidatkortet kommer se ut.

#### Steg 6: Förtidsröstning

**Frågor:**

- Öppna förtidsröstning: Datumväljare (enligt föreningens stadgar)
- Stäng förtidsröstning: Dropdown (Vid mötets öppnande, Vid klubbslag per fråga)
- Skicka påminnelse: Checkbox (enligt föreningens stadgar)

**Hjälptext:**
"Enligt stadgarna ska förtidsröstning öppnas samtidigt som andra kallelsen."

**Automatisk beräkning:**
Om mötet är 31 maj 2026, föreslår systemet:

- Öppna förtidsröstning: 3 maj 2026
- Skicka påminnelse: 24 maj 2026

#### Steg 7: Röstning under mötet

**Frågor:**

- Röstningsmetod: Dropdown (Digital, Manuell, Bestäm senare)
- Om digital: Tillåt distansdeltagande? Checkbox

**Hjälptext:**
"Digital röstning: Alla röstar via appen (både fysiskt och digitalt närvarande)
Manuell röstning: Endast fysiskt närvarande kan rösta (handuppräckning eller röstsedel)"

**Rekommendation:**
"✅ Rekommenderat: Digital röstning (enklare och snabbare)"

#### Steg 8: Granska och aktivera

**Sammanfattning:**

- Mötesnamn: Årsmöte 2026
- Datum: 31 maj 2026, kl 10:30
- Plats: Wisby Strand, Visby
- Dagordning: 23 punkter
- Handlingar: 8 dokument uppladdade
- Kandidater: 12 kandidater
- Förtidsröstning öppnar: 3 maj 2026
- Röstningsmetod: Digital

**Checklista:**

- ✅ Grundinformation ifylld
- ✅ Dagordning skapad
- ✅ Handlingar uppladdade
- ✅ Kandidater tillagda
- ✅ Förtidsröstning konfigurerad
- ⚠️ Varning: Ingen testning genomförd

**Knappar:**

- "Spara som utkast" (kan fortsätta senare)
- "Testa mötet" (öppnar testläge)
- "Aktivera mötet" (gör mötet tillgängligt för medlemmar)

**Hjälptext:**
"Vi rekommenderar att du testar mötet innan du aktiverar det. Du kan alltid göra ändringar senare."

### 2.3 Testläge

**Funktioner:**

- Simulera hela mötet från start till slut
- Testa alla röstningar
- Testa projektor-vy
- Testa deltagarvy
- Generera testdata (fiktiva medlemmar och röster)

**Feedback:**

- "✅ Alla funktioner fungerar korrekt"
- "⚠️ Varning: Dokument X är större än 10MB (kan ta lång tid att ladda)"
- "❌ Fel: Kandidat Y saknar profilbild"

**Knapp:**

- "Aktivera mötet" (när alla tester är godkända)

## 3. Wizard för andra funktioner

### 3.1 Wizard för att lägga till kandidat

**Steg 1: Grundinformation**

- Namn, E-post, Position

**Steg 2: Profilbild**

- Ladda upp bild
- Crop-funktion (cirkulär eller kvadratisk)
- Förhandsvisning

**Steg 3: Presentation**

- Markdown-editor eller textfält
- Förhandsvisning
- Maxlängd: 500 ord

**Steg 4: Granska och spara**

- Förhandsvisning av kandidatkort
- Knapp: "Spara kandidat"

### 3.2 Wizard för att sätta upp autentisering

**Steg 1: Välj medlemsregister**

- Alternativ: CSV, API, Directory Services, Hybrid
- Hjälptext för varje alternativ
- Rekommendation baserat på föreningsstorlek

**Steg 2: Konfigurera medlemsregister**

- Om CSV: Ladda upp fil, mappa kolumner
- Om API: Ange API-nycklar, testa anslutning
- Om Directory Services: Konfigurera LDAP/SAML

**Steg 3: Välj autentiseringsmetoder**

- Checkboxes: Freja eID+, SSO, Magic Link, QR-kod, Användarnamn/Lösenord
- Hjälptext för varje metod
- Säkerhetsnivå visas för varje metod

**Steg 4: Testa autentisering**

- Testa varje vald metod
- Feedback: "✅ Freja eID+ fungerar korrekt"

**Steg 5: Aktivera**

- Sammanfattning av konfiguration
- Knapp: "Aktivera autentisering"

### 3.3 Wizard för att sätta upp backup

**Steg 1: Välj backup-metod**

- Lokal disk, Extern disk/NAS, Molnlagring, Alla

**Steg 2: Konfigurera backup**

- Frekvens: Dagligen, Veckovis, Månatligen
- Tid: Tidsväljare (standard: 03:00)
- Retention: Antal dagar att behålla backups

**Steg 3: Testa backup**

- Skapa testbackup
- Testa återställning
- Feedback: "✅ Backup fungerar korrekt"

**Steg 4: Aktivera**

- Sammanfattning
- Knapp: "Aktivera automatiska backups"

## 4. Inbyggd säkerhet (osynlig för användaren)

### 4.1 Automatiska säkerhetskontroller

**Vid uppsättning av möte:**

- Kontrollera att alla dokument är virus-fria
- Kontrollera att alla bilder är säkra
- Kontrollera att alla länkar är säkra

**Vid aktivering av möte:**

- Kontrollera att kryptering är aktiverad
- Kontrollera att backup är konfigurerad
- Kontrollera att autentisering fungerar

**Under mötet:**

- Automatisk övervakning av systemhälsa
- Automatisk detektion av DDoS-attacker
- Automatisk backup vid kritiska händelser

### 4.2 Automatiska varningar

**Till mötessamordnare:**

- "⚠️ Förtidsröstning öppnar om 1 vecka - kontrollera att allt är klart"
- "⚠️ Mötet börjar om 24 timmar - testa systemet en sista gång"
- "❌ Kritiskt: Backup misslyckades - åtgärda omedelbart"

**Till teknisk ansvarig:**

- "⚠️ Hög CPU-användning - överväg att skala upp"
- "⚠️ Databas-anslutning långsam - kontrollera nätverk"
- "❌ Kritiskt: Säkerhetsuppdatering tillgänglig - installera inom 24 timmar"

### 4.3 Automatiska åtgärder

**Vid tekniskt haveri:**

- Automatisk failover till backup-server
- Automatisk förlängning av röstningstid
- Automatisk notifikation till alla användare

**Vid säkerhetsincident:**

- Automatisk blockering av misstänkt IP-adress
- Automatisk notifikation till teknisk ansvarig
- Automatisk loggning av incident

## 5. Kontextuell hjälp

### 5.1 Hjälptexter

**Varje fält har:**

- Kort hjälptext under fältet
- Ikon "?" för mer information
- Länk till detaljerad dokumentation

**Exempel:**

```
Valmetod: [Dropdown: Enkel majoritet ▼]
ℹ️ Enkel majoritet: Flest röster vinner. Används för enkla Ja/Nej-frågor.
? Läs mer om valmetoder
```

### 5.2 Interaktiva guider

**För nya användare:**

- "Välkommen! Vill du ha en guidad tur?" (Ja/Nej)
- Steg-för-steg-guide med highlights och förklaringar
- Kan hoppas över när som helst

**För återkommande användare:**

- "Vill du importera från förra året?" (Ja/Nej)
- Snabbgenvägar till vanliga uppgifter

### 5.3 Video-tutorials

**Inbäddade videos:**

- "Hur sätter jag upp ett årsmöte?" (5 min)
- "Hur lägger jag till kandidater?" (2 min)
- "Hur testar jag systemet?" (3 min)

**Tillgängliga i:**

- Wizard (vid varje steg)
- Hjälp-menyn
- Dokumentationen

## 6. Felhantering och återhämtning

### 6.1 Automatisk sparning

**Alla formulär:**

- Sparas automatiskt var 30:e sekund
- Indikator: "Sparad kl 14:32"
- Kan återställas vid krasch

### 6.2 Ångra/Gör om

**Alla ändringar:**

- Ångra-knapp (Ctrl+Z)
- Gör om-knapp (Ctrl+Y)
- Historik: Visa alla ändringar

### 6.3 Felmeddelanden

**Tydliga och hjälpsamma:**

- ❌ "Fel: Filstorlek för stor (15MB). Max 10MB tillåtet."
- ✅ "Lösning: Komprimera filen eller dela upp den i flera delar."
- 🔗 "Hjälp: Hur komprimerar jag en PDF?"

**Aldrig tekniska felmeddelanden:**

- ❌ Dåligt: "Error 500: Internal Server Error"
- ✅ Bra: "Något gick fel. Vi har loggat felet och kommer åtgärda det. Försök igen om några minuter."

## 7. Onboarding för nya användare

### 7.1 Första inloggningen

**Välkomstskärm:**

- "Välkommen till [Föreningsnamn]s digitala röstningssystem!"
- Kort introduktion (3-4 meningar)
- Knapp: "Kom igång"

**Profilinställningar:**

- Namn, E-post (förifyllt från medlemsregister)
- Profilbild (valfritt)
- Notifikationsinställningar

**Guidad tur:**

- "Vill du ha en snabb genomgång?" (Ja/Nej)
- 5 steg som visar huvudfunktionerna
- Kan hoppas över

### 7.2 Rollspecifik onboarding

**För mötessamordnare:**

- "Du är mötessamordnare. Här är vad du kan göra:"
- Lista med huvuduppgifter
- Knapp: "Skapa ditt första möte"

**För valkommitté:**

- "Du är i valkommittén. Här är vad du kan göra:"
- Lista med huvuduppgifter
- Knapp: "Lägg till din första kandidat"

**För ordförande:**

- "Du är mötesordförande. Här är vad du kan göra:"
- Lista med huvuduppgifter
- Knapp: "Testa projektor-vy"

## 8. Progressindikatorer

### 8.1 I wizards

**Visuell progress:**

```
[1. Grundinfo] → [2. Dagordning] → [3. Handlingar] → [4. Kandidater] → [5. Granska]
     ✅              ✅                 ⏳                 ⭕                ⭕
```

**Procentandel:**
"60% klart - 2 steg kvar"

### 8.2 Vid uppladdning

**Filuppladdning:**

```
Laddar upp Verksamhetsberättelse.pdf...
████████████░░░░░░░░ 65% (3.2 MB av 4.9 MB)
Beräknad tid kvar: 8 sekunder
```

### 8.3 Vid bearbetning

**Långsamma operationer:**

```
Genererar protokoll...
⏳ Detta kan ta upp till 30 sekunder
[Animerad spinner]
```

## 9. Mobiloptimering

### 9.1 Touch-optimering

**Alla knappar:**

- Minst 44x44px (Apple's rekommendation)
- Tillräckligt avstånd mellan knappar
- Tydlig visuell feedback vid tryck

### 9.2 Swipe-gester

**Naturliga gester:**

- Swipe höger: Gå tillbaka
- Swipe vänster: Gå framåt
- Swipe ner: Uppdatera
- Pinch: Zooma (i dokument)

### 9.3 Offline-first

**Fungerar offline:**

- Läsa handlingar
- Läsa kandidatpresentationer
- Förbereda röster (skickas när online)

**Tydlig indikator:**

- "📡 Offline - Dina röster kommer skickas när du är online igen"

## 10. Tillgänglighet i wizards

### 10.1 Tangentbordsnavigering

**Alla wizards:**

- Tab: Nästa fält
- Shift+Tab: Föregående fält
- Enter: Nästa steg
- Esc: Avbryt

### 10.2 Skärmläsarstöd

**Alla steg:**

- Tydliga ARIA-labels
- Beskrivande rubriker
- Progressindikatorer som läses upp

### 10.3 Visuella hjälpmedel

**För alla användare:**

- Stora, tydliga knappar
- Hög kontrast
- Tydliga ikoner
- Färgkodning + text (inte bara färg)

## 11. Sammanfattning

Systemet ska vara så enkelt att använda att även någon som aldrig använt det tidigare kan sätta upp ett komplett årsmöte på under 30 minuter. All säkerhet är inbyggd och osynlig för användaren - det ska "bara fungera".

**Nyckelprinciper:**

- Wizards för alla komplexa uppgifter
- Kontextuell hjälp överallt
- Automatisk sparning och återhämtning
- Tydliga felmeddelanden med lösningar
- Inbyggd säkerhet (osynlig för användaren)
- Mobiloptimerad
- Tillgänglig för alla
