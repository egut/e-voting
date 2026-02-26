# UI/UX-krav: Digitalt röstningssystem för Mensa Sverige

## 1. Översikt

Detta dokument kompletterar systemspecifikationen med detaljerade krav för användargränssnitt och användarupplevelse för en modern digital röstningsapp som fungerar på webb, Android och iOS.

## 2. Plattformsstrategi

### 2.1 Rekommenderad approach: Progressive Web App (PWA)

**Fördelar:**

- En kodbas för alla plattformar (webb, Android, iOS)
- Ingen app store-godkännande behövs
- Automatiska uppdateringar utan användaråtgärd
- Lägre utvecklingskostnad
- Fungerar offline med service workers
- Kan installeras på hemskärm som "native app"

**Teknisk stack (förslag):**

- Frontend: React/Vue/Svelte med TypeScript
- UI-ramverk: Material-UI, Tailwind CSS eller Chakra UI
- PWA: Workbox för service workers
- State management: Redux/Zustand/Pinia
- Offline storage: IndexedDB via Dexie.js

### 2.2 Alternativ: Native apps (om PWA inte räcker)

**När native apps behövs:**

- Krav på biometrisk autentisering (fingeravtryck/Face ID)
- Behov av push-notifikationer med hög tillförlitlighet
- Krav på djup integration med OS-funktioner

**Teknisk stack (förslag):**

- React Native eller Flutter för cross-platform
- Separata native apps endast om absolut nödvändigt

### 2.3 Responsiv design - Mobile First

**Prioritering:**

- Designa först för mobil (320px - 428px)
- Skala upp till surfplatta (768px - 1024px)
- Desktop som sista steg (1280px+)

**Breakpoints:**

- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+
- Large desktop: 1440px+

## 3. Designprinciper

### 3.1 Enkelhet och tydlighet

- **Minimal kognitiv belastning**: Varje skärm har ETT primärt syfte
- **Tydlig hierarki**: Viktigast information först, stora klickbara ytor
- **Progressiv disclosure**: Visa bara vad användaren behöver just nu
- **Konsekvent navigation**: Samma mönster genom hela appen

### 3.2 Tillgänglighet (WCAG 2.1 AA)

**Obligatoriska krav:**

- Kontrast minst 4.5:1 för normal text, 3:1 för stor text
- All funktionalitet tillgänglig via tangentbord
- Skärmläsarstöd (ARIA-labels, semantic HTML)
- Fokusindikatorer synliga och tydliga
- Textstorlek skalbar upp till 200% utan förlust av funktionalitet
- Inga tidsbegränsningar utan möjlighet att förlänga
- Tydliga felmeddelanden med förslag på lösning

**Tillgänglighetsfunktioner:**

- Hög kontrast-läge
- Textförstoring
- Skärmläsaroptimering
- Tangentbordsgenvägar
- Alternativtext för alla bilder

### 3.3 Förtroende och säkerhet

- **Visuell feedback**: Tydliga bekräftelser på alla åtgärder
- **Transparens**: Visa alltid vad som händer i bakgrunden
- **Säkerhetsindikationer**: Lås-ikoner, krypteringsstatustext
- **Verifierbarhet**: Kvittokoder och verifieringslänkar synliga

## 4. Färgschema och visuell identitet

### 4.1 White-label design

**Konfigurerbart:**

- Primärfärg (föreningens huvudfärg)
- Sekundärfärg (accentfärg)
- Logotyp (SVG, PNG)
- Typsnitt (webfonts)
- Playfulness-nivå (se tema-mallar nedan)

**Fast (systemfärger):**

- Framgång: Grön (#10B981)
- Varning: Gul/Orange (#F59E0B)
- Fel: Röd (#EF4444)
- Info: Blå (#3B82F6)
- Neutral: Grå-skala

### 4.1.1 Tema-mallar (10+ fördefinierade)

Systemet kommer med fördefinierade tema-mallar som föreningar kan välja och anpassa. Varje tema har olika nivå av "playfulness" - från strikt professionell till rolig och lekfull.

**Kategori 1: Professionella (Strikta)**

**1. Corporate Blue (Mest strikt)**

- Primärfärg: #1E40AF (Mörk blå)
- Sekundärfärg: #64748B (Grå-blå)
- Typsnitt: Inter (sans-serif)
- Rundade hörn: 4px (minimalt)
- Animationer: Subtila (fade only)
- Playfulness: 1/10
- Användning: Företag, myndigheter, formella organisationer

**2. Professional Gray**

- Primärfärg: #374151 (Mörk grå)
- Sekundärfärg: #6366F1 (Indigo accent)
- Typsnitt: Roboto
- Rundade hörn: 6px
- Animationer: Minimala
- Playfulness: 2/10
- Användning: Professionella föreningar, akademiska organisationer

**3. Classic Green**

- Primärfärg: #059669 (Grön)
- Sekundärfärg: #0891B2 (Cyan)
- Typsnitt: Open Sans
- Rundade hörn: 8px
- Animationer: Subtila
- Playfulness: 3/10
- Användning: Miljöorganisationer, traditionella föreningar

**Kategori 2: Balanserade (Professionella men vänliga)**

**4. Mensa Classic (Standard för Mensa Sverige)**

- Primärfärg: #DC2626 (Mensa-röd)
- Sekundärfärg: #1F2937 (Mörk grå)
- Typsnitt: Inter
- Rundade hörn: 8px
- Animationer: Medel (fade + scale)
- Ikoner: Hjärna, lampa, pussel
- Playfulness: 4/10
- Användning: Mensa-föreningar

**5. Modern Purple**

- Primärfärg: #7C3AED (Lila)
- Sekundärfärg: #EC4899 (Rosa)
- Typsnitt: Poppins
- Rundade hörn: 12px
- Animationer: Medel
- Playfulness: 5/10
- Användning: Kreativa föreningar, tech-communities

**6. Friendly Orange**

- Primärfärg: #F59E0B (Orange)
- Sekundärfärg: #EF4444 (Röd)
- Typsnitt: Nunito
- Rundade hörn: 12px
- Animationer: Medel (bounce on buttons)
- Playfulness: 6/10
- Användning: Sociala föreningar, ungdomsorganisationer

**Kategori 3: Lekfulla (Playful)**

**7. Vibrant Gradient**

- Primärfärg: Gradient (#EC4899 → #8B5CF6)
- Sekundärfärg: #F59E0B (Orange)
- Typsnitt: Quicksand (rundad)
- Rundade hörn: 16px
- Animationer: Många (bounce, wiggle, confetti)
- Ikoner: Animerade
- Playfulness: 7/10
- Användning: Kreativa föreningar, event-organisationer

**8. Playful Teal**

- Primärfärg: #14B8A6 (Teal)
- Sekundärfärg: #F472B6 (Rosa)
- Typsnitt: Comfortaa (rundad)
- Rundade hörn: 20px
- Animationer: Många (spring, wobble)
- Mikrointeraktioner: Emojis, konfetti vid röstning
- Playfulness: 8/10
- Användning: Ungdomsföreningar, hobbygrupper

**Kategori 4: Extremt lekfulla (För speciella tillfällen)**

**9. Party Mode 🎉**

- Primärfärg: Rainbow gradient (animerad)
- Sekundärfärg: #FBBF24 (Guld)
- Typsnitt: Fredoka One (bold, rundad)
- Rundade hörn: 24px
- Animationer: Extrema (confetti, fireworks, bounce)
- Ljud: Applåder vid röstning, fanfar vid resultat
- Mikrointeraktioner: Emojis överallt, animerade ikoner
- Easter eggs: Hemliga animationer vid vissa klick
- Playfulness: 9/10
- Användning: Jubileumsmöten, festliga tillfällen

**10. Retro Arcade 🕹️**

- Primärfärg: #FF00FF (Magenta)
- Sekundärfärg: #00FFFF (Cyan)
- Typsnitt: Press Start 2P (pixel-font)
- Rundade hörn: 0px (pixelated)
- Animationer: 8-bit style (pixelated transitions)
- Ljud: Retro game sounds (blips, bloops)
- Visuellt: Pixel art-ikoner, scanlines-effekt
- Playfulness: 10/10
- Användning: Gaming-communities, nostalgiska events

**Kategori 5: Specialteman**

**11. Dark Academia**

- Primärfärg: #92400E (Brun)
- Sekundärfärg: #78350F (Mörkare brun)
- Typsnitt: Crimson Text (serif)
- Rundade hörn: 4px
- Bakgrund: Pergament-textur
- Ikoner: Vintage-stil (fjäderpenna, böcker)
- Playfulness: 3/10
- Användning: Akademiska föreningar, bokklubbar

**12. Minimalist Zen**

- Primärfärg: #000000 (Svart)
- Sekundärfärg: #FFFFFF (Vit)
- Typsnitt: Helvetica Neue
- Rundade hörn: 0px
- Animationer: Inga (instant transitions)
- Mycket whitespace
- Playfulness: 1/10
- Användning: Designfokuserade organisationer

**13. Nature Green**

- Primärfärg: #16A34A (Grön)
- Sekundärfärg: #84CC16 (Lime)
- Typsnitt: Lato
- Rundade hörn: 16px (organiska former)
- Bakgrund: Subtil blad-textur
- Ikoner: Natur-inspirerade (löv, träd)
- Animationer: Mjuka (organic easing)
- Playfulness: 5/10
- Användning: Miljöorganisationer, trädgårdsföreningar

### 4.1.2 Anpassning av tema-mallar

**Superadmin kan:**

- Välja en av 13+ fördefinierade mallar
- Anpassa färger (behåll layout och animationer)
- Justera playfulness-nivå (slider 1-10)
- Ladda upp egen logotyp
- Välja typsnitt från bibliotek
- Förhandsgranska i realtid

**Playfulness-slider:**

När superadmin justerar playfulness-nivå (1-10) påverkas:

- **1-3 (Strikt)**: Minimala animationer, inga ljud, subtila färger
- **4-6 (Balanserad)**: Medel animationer, inga ljud, vänliga färger
- **7-8 (Lekfull)**: Många animationer, valfria ljud, livliga färger
- **9-10 (Extrem)**: Extrema animationer, ljud, konfetti, easter eggs

**Exempel på playfulness-effekter:**

**Nivå 1-3:**

- Knappar: Fade on hover (200ms)
- Röstning: Enkel checkmark
- Resultat: Statiska staplar

**Nivå 4-6:**

- Knappar: Scale + fade (300ms)
- Röstning: Animerad checkmark + toast
- Resultat: Animerade staplar (count up)

**Nivå 7-8:**

- Knappar: Bounce + ripple + haptisk feedback
- Röstning: Konfetti + ljud + animerad checkmark
- Resultat: Animerade staplar + fireworks

**Nivå 9-10:**

- Knappar: Extreme bounce + rainbow ripple + ljud + haptisk feedback
- Röstning: Explosion av konfetti + fanfar + animerad checkmark + emoji-rain
- Resultat: Animerade staplar + fireworks + applåder + ballonger

### 4.1.3 Säsongsanpassade teman (Bonus)

**Automatiska säsongsteman (valfritt):**

- **Jul**: Snöflingor, röd/grön färg, jingles
- **Påsk**: Pastellfärger, ägg-ikoner
- **Sommar**: Ljusa färger, sol-ikoner
- **Halloween**: Orange/svart, spöken (om mötet är i oktober)

Kan aktiveras/inaktiveras i inställningar.

### 4.2 Dark mode

**Obligatoriskt stöd:**

- Automatisk detektion av OS-preferens
- Manuell växling i inställningar
- Sparad preferens per användare
- Mjuk övergång mellan lägen (fade animation)

**Dark mode-färger:**

- Bakgrund: #1F2937 (mörk grå)
- Kort/Paneler: #374151 (ljusare grå)
- Text: #F9FAFB (nästan vit)
- Primär/Sekundär: Justerade för kontrast

## 5. Typografi

### 5.1 Typsnitt

**Rekommendation:**

- Sans-serif för skärm: Inter, Roboto eller system-font stack
- System-font stack: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
- Monospace för koder: "Fira Code", "Courier New", monospace

### 5.2 Textstorlekar

- H1 (Sidtitel): 32px / 2rem (mobil: 24px / 1.5rem)
- H2 (Sektion): 24px / 1.5rem (mobil: 20px / 1.25rem)
- H3 (Underrubrik): 20px / 1.25rem (mobil: 18px / 1.125rem)
- Body (Brödtext): 16px / 1rem
- Small (Hjälptext): 14px / 0.875rem
- Tiny (Metadata): 12px / 0.75rem

### 5.3 Radavstånd

- Rubriker: 1.2
- Brödtext: 1.5
- Hjälptext: 1.4

## 6. Komponenter och interaktionsmönster

### 6.1 Knappar

**Primär knapp (Huvudåtgärd):**

- Fylld med primärfärg
- Vit text
- Rundade hörn (8px)
- Minsta höjd: 44px (touch-target)
- Hover: Mörkare nyans
- Active: Ännu mörkare + scale(0.98)
- Disabled: 50% opacity + ingen hover

**Sekundär knapp:**

- Outline med primärfärg
- Primärfärg text
- Samma storlek som primär

**Tertiär knapp (Mindre viktig):**

- Ingen border
- Primärfärg text
- Understruken vid hover

**Destruktiv knapp (Radera, Avbryt):**

- Röd färg
- Kräver bekräftelse för kritiska åtgärder

### 6.2 Formulär och input

**Textfält:**

- Tydlig label ovanför fält
- Placeholder-text som exempel
- Border: 1px solid grå, fokus: 2px solid primärfärg
- Felmeddelande: Röd text under fält + röd border
- Framgång: Grön checkmark-ikon
- Minsta höjd: 44px

**Dropdown/Select:**

- Native select på mobil (bättre UX)
- Custom dropdown på desktop
- Sökbar för långa listor (>10 alternativ)

**Checkboxes och Radio buttons:**

- Minsta klickyta: 44x44px
- Tydlig visuell feedback vid val
- Label klickbar (inte bara boxen)

**Röstningsknappar (Ja/Nej/Avstår):**

- Extra stora (minst 60px höjd på mobil)
- Tydliga ikoner + text
- Animerad feedback vid klick
- Visuell indikation på vald röst

### 6.3 Kort och paneler

**Kandidatkort:**

- Profilbild: Cirkulär, 80px diameter (mobil: 60px)
- Namn: H3, bold
- Titel/Position: Small text, grå
- Presentation: Expanderbar (läs mer/mindre)
- Röstknapp: Primär, längst ner

**Agendapunkt-kort:**

- Titel: H3
- Status-badge: Färgkodad (Kommande, Pågående, Avslutad)
- Tidsstämpel: Small text
- Handling-länk: Ikon + text
- Röstknapp: Synlig endast när aktiv

**Dokumentkort:**

- Filikon (PDF, MD)
- Filnamn: Trunkerad med ellipsis
- Filstorlek: Small text
- Nedladdningsknapp: Ikon

### 6.4 Navigation

**Huvudnavigation (Medlem):**

- Bottom navigation på mobil (4-5 ikoner)
- Sidebar på desktop
- Ikoner: Hem, Dagordning, Kandidater, Min profil, Inställningar
- Aktiv sida: Primärfärg + bold

**Mötesordförande-navigation:**

- Top bar med mötesnamn
- Projektor-vy knapp (högst upp till höger)
- Dagordning-stepper (visar progress)
- Snabbknappar: Öppna/Stäng röstning, Dekryptera

**Valkommitté-navigation:**

- Tab-navigation: Kandidater, Godkännanden, Inställningar
- Badge med antal väntande godkännanden

### 6.5 Modaler och dialoger

**Bekräftelsedialog:**

- Centrerad på skärm
- Tydlig rubrik (H3)
- Förklarande text
- Två knappar: Primär (Bekräfta) + Sekundär (Avbryt)
- Stäng med ESC eller klick utanför

**Fullskärmsmodal (mobil):**

- Slide up-animation
- Stäng-knapp (X) uppe till höger
- Används för långa formulär eller kandidatpresentationer

### 6.6 Laddningsindikatorer

**Spinner:**

- Centrerad på sida vid initial laddning
- Inline vid knapp-klick (spinner i knappen)
- Färg: Primärfärg

**Progress bar:**

- Används vid filuppladdning
- Visar procent (0-100%)
- Animerad

**Skeleton screens:**

- Visa layout medan innehåll laddas
- Pulsande grå boxar
- Bättre UX än spinner för listor

## 7. Animationer och mikrointeraktioner

### 7.1 Principer

- **Subtila**: Animationer ska inte distrahera
- **Snabba**: 150-300ms för de flesta övergångar
- **Meningsfulla**: Varje animation har ett syfte

### 7.2 Specifika animationer

**Knapp-klick:**

- Scale down (0.98) vid press
- Ripple-effekt från klickpunkt
- Färgövergång vid hover (200ms)

**Röstning lagd:**

- Checkmark-animation (scale + fade in)
- Grön färg-flash på knapp
- Haptisk feedback på mobil (vibration)
- Toast-meddelande: "Din röst är sparad"

**Sidövergångar:**

- Fade in (300ms) för nya sidor
- Slide från höger för "djupare" navigation
- Slide från vänster för "tillbaka"

**Expandera/Kollapsa:**

- Smooth height-transition (300ms)
- Rotera pil-ikon (180°)

**Drag-and-drop (Agendabyggare):**

- Lyft kort (scale 1.05 + shadow)
- Placeholder där kort kan släppas
- Smooth transition till ny position

### 7.3 Reducerad rörelse (Accessibility)

- Respektera `prefers-reduced-motion`
- Ersätt animationer med instant övergångar
- Behåll färgförändringar men ta bort rörelser

## 8. Offline-funktionalitet

### 8.1 Service Worker

**Cachning:**

- App shell (HTML, CSS, JS) cachas vid första besök
- Statiska assets (bilder, ikoner) cachas
- API-svar cachas med stale-while-revalidate

**Offline-läge:**

- Visa tydlig indikator när offline
- Tillåt läsning av cachad data
- Kö för åtgärder som kräver nätverk
- Synka automatiskt när online igen

### 8.2 Offline-funktioner per roll

**Medlem:**

- Läsa dagordning och handlingar (cachade)
- Läsa kandidatpresentationer
- Röstning köas och skickas när online

**Mötesordförande:**

- Visa dagordning och navigera
- Öppna/stänga röstning (köas om offline)
- Varning om kritiska funktioner kräver nätverk

**Valkommitté:**

- Läsa kandidatinformation
- Godkännanden köas och synkas

### 8.3 Synkroniseringsindikator

- Ikon i top bar: Grön (synkad), Gul (synkar), Röd (offline)
- Toast vid återanslutning: "Synkroniserar data..."
- Konflikthantering: Senaste rösten vinner

## 9. Push-notifikationer

### 9.1 Notifikationstyper

**Kritiska (Kräver åtgärd):**

- "Röstning öppnad: [Agendapunkt]" (med deep link)
- "Röstning stängs om 5 minuter"
- "Tekniskt haveri - mötet pausat"

**Informativa:**

- "Förtidsröstning öppnad för Årsmöte 202X"
- "Nya handlingar uppladdade"
- "Kandidat har uppdaterat presentation"

**Påminnelser:**

- "Årsmötet börjar om 1 timme"
- "Du har inte röstat i [Agendapunkt]"

### 9.2 Notifikationsinställningar

**Användarkontroll:**

- Aktivera/inaktivera per kategori
- Välj kanal: Push, E-post, Båda
- Tyst läge (Do Not Disturb)
- Förhandsvisning i inställningar

### 9.3 Implementation

**PWA:**

- Web Push API med service worker
- Kräver HTTPS
- Användaren måste godkänna

**Native apps:**

- Firebase Cloud Messaging (FCM)
- Apple Push Notification Service (APNS)

## 10. Rollspecifika gränssnitt

### 10.1 Medlem (Röstande)

#### 10.1.1 Startsida

**Layout:**

- Hero-sektion: Föreningens logotyp + välkomsttext
- Kommande möte-kort (om aktivt)
- Snabbåtkomst: "Läs handlingar", "Rösta nu", "Mina röster"
- Notifikationer/Uppdateringar

**Mobil-optimering:**

- Vertikal scroll
- Stora touch-targets
- Swipe för att navigera mellan sektioner

#### 10.1.2 Inloggningsskärmar

**Huvudinloggning:**

**Layout:**

- Föreningens logotyp (centrerad)
- Välkomsttext: "Logga in för att delta i [Mötesnamn]"
- Primär inloggningsmetod (stor knapp)
- Alternativa metoder (mindre knappar under)
- Hjälplänk: "Problem att logga in?"

**Metod 1: Freja eID+ (Primär för svenska medlemmar)**

**Layout:**

- Stor knapp: "Logga in med Freja eID+" (med Freja-logotyp)
- Informationstext: "Säker inloggning med personnummerverifiering"
- Ikon: Lås (säkerhet)

**Process:**

1. Användare klickar på knapp
2. Omdirigeras till Freja eID+ (öppnas i samma fönster eller popup)
3. Användare autentiserar med Freja-appen
4. Återkommer till systemet
5. Personnummer matchas mot medlemsregister
6. Framgång: Omdirigeras till startsida
7. Misslyckande: Felmeddelande med instruktioner

**Felmeddelanden:**

- "Personnummer hittades inte i medlemsregistret. Kontakta valkommittén om du är medlem."
- "Din medlemsavgift är inte betald. Kontakta [e-post] för hjälp."
- "Freja eID+-autentisering misslyckades. Försök igen eller välj alternativ inloggningsmetod."

**Metod 2: SSO (Active Directory/Entra ID/Google)**

**Layout:**

- Knapp: "Logga in med [Organisationsnamn]" (med organisationens logotyp)
- Informationstext: "Använd ditt vanliga jobbkonto"

**Process:**

1. Användare klickar på knapp
2. Omdirigeras till SSO-provider
3. Användare loggar in (MFA hanteras av provider)
4. Återkommer till systemet
5. E-post/användarnamn matchas mot medlemsregister
6. Framgång: Omdirigeras till startsida

**Metod 3: Användarnamn/Lösenord**

**Layout:**

- Textfält: "E-postadress eller medlemsnummer"
- Lösenordsfält: "Lösenord" (med visa/dölj-ikon)
- Checkbox: "Kom ihåg mig" (valfritt)
- Knapp: "Logga in"
- Länk: "Glömt lösenord?"

**MFA (om aktiverat):**

- Efter lyckad inloggning: Modal för MFA-kod
- Textfält: "Ange 6-siffrig kod från din autentiseringsapp"
- Alternativ: "Skicka kod via SMS" (om konfigurerat)
- Knapp: "Verifiera"

**Metod 4: Magic Link**

**Layout:**

- Textfält: "E-postadress"
- Knapp: "Skicka inloggningslänk"
- Informationstext: "Vi skickar en säker länk till din e-post"

**Process:**

1. Användare anger e-post
2. Systemet skickar Magic Link
3. Bekräftelse: "E-post skickad! Kontrollera din inkorg."
4. Användare klickar på länk i e-post
5. Automatisk inloggning
6. Omdirigeras till startsida

**E-postmall (Magic Link):**

```
Ämne: Logga in på [Mötesnamn] - Mensa Sverige

Hej [Namn],

Klicka på länken nedan för att logga in på det digitala röstningssystemet:

[STOR KNAPP: Logga in nu]

Länken är giltig i 15 minuter och kan endast användas en gång.

Om du inte begärde denna länk, ignorera detta meddelande.

Med vänliga hälsningar,
[Föreningsnamn]
```

**Metod 5: QR-kod (On-site)**

**Layout:**

- Knapp: "Skanna QR-kod"
- Informationstext: "Få QR-kod från valkommittén i dörren"

**Process:**

1. Användare klickar på knapp
2. Kamera öppnas (med tillstånd)
3. Användare skannar QR-kod
4. Automatisk inloggning
5. Omdirigeras till startsida

**QR-kod-scanner:**

- Fullskärmsvy med kameravy
- Målram för att centrera QR-kod
- Instruktion: "Rikta kameran mot QR-koden"
- Knapp: "Avbryt" (stäng scanner)
- Feedback: Vibrering + ljud vid lyckad scanning

**Alternativ för manuell inmatning:**

- Länk: "Ange kod manuellt"
- Textfält: "Ange 12-siffrig kod"
- Knapp: "Verifiera"

**Problem att logga in?**

**Layout:**

- Modal eller separat sida
- Accordion med vanliga problem:

**Fråga 1: "Jag har inget svenskt personnummer"**

- Svar: "Kontakta valkommittén på plats eller via [e-post]. De kan verifiera ditt medlemskap manuellt och ge dig åtkomst."

**Fråga 2: "Jag har glömt mitt lösenord"**

- Svar: "Klicka på 'Glömt lösenord?' på inloggningssidan eller använd 'Magic Link'-alternativet."

**Fråga 3: "Freja eID+ fungerar inte"**

- Svar: "Prova alternativ inloggningsmetod eller kontakta valkommittén för att få en QR-kod."

**Fråga 4: "Jag får felmeddelande att jag inte är medlem"**

- Svar: "Kontrollera att din medlemsavgift är betald. Kontakta [e-post] för hjälp."

**Fråga 5: "Jag är på plats men kan inte logga in"**

- Svar: "Gå till valkommittén i dörren. De kan verifiera dig manuellt och ge dig en QR-kod för omedelbar åtkomst."

**Kontaktinfo:**

- E-post: support@mensa.se
- Telefon: [Nummer] (endast under mötet)
- Valkommittén: Vid entrén

#### 10.1.3 Dagordning

**Layout:**

- Lista med agendapunkter
- Varje punkt: Titel, Status-badge, Tidsstämpel
- Expandera för att se detaljer
- Knapp: "Läs handling" eller "Rösta nu"

**Interaktion:**

- Tap för att expandera
- Swipe för att markera som läst
- Filter: Visa endast orörda/röstade

#### 10.1.3 Röstningsskärm

**Layout (Ja/Nej-fråga):**

- Frågetitel (H2)
- Beskrivning/Kontext
- Tre stora knappar: JA (grön), NEJ (röd), AVSTÅR (grå)
- Tidigare röst visas (om förtidsröst lagd)
- Kvittokod visas efter röstning

**Layout (Personval med STV):**

- Kandidatlista med profilbilder
- Drag-and-drop för att rangordna (desktop)
- Numrerade knappar för att välja ordning (mobil)
- "Läs mer" expanderar kandidatpresentation
- Förhandsvisning av rangordning
- Bekräfta-knapp

**Feedback:**

- Animerad checkmark vid sparad röst
- Toast: "Din röst är sparad och krypterad"
- Kvittokod: "Spara denna kod för verifiering: ABC123XYZ"

**Playfulness-effekter (beroende på tema):**

**Nivå 1-3 (Strikt):**

- Enkel checkmark (fade in)
- Toast med text
- Ingen ljud eller extra animation

**Nivå 4-6 (Balanserad):**

- Animerad checkmark (scale + fade)
- Toast med ikon
- Haptisk feedback (vibration på mobil)
- Subtil färg-flash på knapp

**Nivå 7-8 (Lekfull):**

- Animerad checkmark med bounce
- Konfetti från knappen (5-10 partiklar)
- Toast med animerad ikon
- Ljud: Kort "pling" eller "pop"
- Haptisk feedback
- Knapp-animation: Bounce + scale

**Nivå 9-10 (Extrem):**

- Animerad checkmark med extreme bounce
- Explosion av konfetti (50+ partiklar, olika färger)
- Emoji-rain (👍, ✅, 🎉)
- Toast med animerad ikon + glitter
- Ljud: Fanfar eller applåder
- Haptisk feedback (dubbel vibration)
- Knapp-animation: Rainbow ripple + bounce
- Fullskärms-effekt: "DIN RÖST ÄR RÄKNAD! 🎉"
- Ballonger som flyger upp från botten av skärmen

**Easter eggs (Nivå 9-10):**

- Om medlem röstar exakt kl 13:37: Extra konfetti + "LEET!" meddelande
- Om medlem är den 100:e att rösta: "Du är den 100:e röstaren! 🎊"
- Om medlem ändrar sin röst 5+ gånger: "Beslutsam, eller hur? 😄"
- Konami-kod (↑↑↓↓←→←→BA): Aktiverar hemlig rainbow-mode

#### 10.1.4 Mina röster

**Layout:**

- Lista över alla frågor
- Status: Ej röstat, Förtidsröst lagd, Live-röstat
- Möjlighet att ändra förtidsröst
- Kvittokoder för verifiering

### 10.2 Mötesordförande

#### 10.2.1 Kontrollpanel

**Layout:**

- Top bar: Mötesnamn, Tid, Antal närvarande
- Huvudvy: Aktuell agendapunkt (stor)
- Sidopanel: Dagordning med progress
- Snabbknappar: Öppna/Stäng röstning, Dekryptera, Nästa punkt

**Projektor-vy:**

- Fullskärmsläge för storskärm
- Stor text och ikoner
- Visar aktuell fråga + röstknappar
- Live-räknare (antal röster, ej resultat)
- Resultat visas först efter dekryptering

#### 10.2.2 Röstningskontroll

**Öppna röstning:**

- Modal: "Öppna röstning för [Agendapunkt]?"
- Bekräfta-knapp
- Countdown-timer startar

**Stäng röstning:**

- Modal: "Stäng röstning och dekryptera?"
- Varning: "Detta kan inte ångras"
- Bekräfta med klubbslag-knapp (animerad)

**Resultatvisning:**

- Animerad räkning (siffror tickar upp)
- Stapeldiagram eller cirkeldiagram
- Procentandelar + absoluta tal
- Exportknapp: "Lägg till i protokoll"

**Playfulness-effekter vid resultatvisning:**

**Nivå 1-3 (Strikt):**

- Statiska staplar
- Siffror visas direkt
- Ingen animation

**Nivå 4-6 (Balanserad):**

- Staplar växer från 0 till slutvärde (1 sekund)
- Siffror räknas upp (count-up animation)
- Subtil färg-highlight på vinnande alternativ

**Nivå 7-8 (Lekfull):**

- Staplar växer med bounce-effekt
- Siffror räknas upp med ljud (tick-tick-tick)
- Vinnande alternativ: Glitter-effekt + större font
- Konfetti från vinnande stapel
- Ljud: Kort fanfar när räkning är klar

**Nivå 9-10 (Extrem):**

- Staplar växer med extreme bounce + wobble
- Siffror räknas upp med ljud och färgväxling
- Vinnande alternativ: Explosion av konfetti + fireworks
- Ljud: Lång fanfar + applåder
- Fullskärms-effekt: "VI HAR EN VINNARE! 🏆"
- Ballonger och streamers
- Konfetti-kanon från alla hörn
- Om röstningen är enhällig (100%): Extra celebration + "ENHÄLLIGT! 🎊"
- Om röstningen är jämn (49-51%): "TIGHT RACE! 😮" med dramatisk musik

**Projektor-vy (Storskärm):**

- Ännu större animationer för publik
- Ljud via möteslokalens högtalare
- Slow-motion reveal av resultat (dramatisk effekt)
- Leaderboard-stil för personval (kandidater "tävlar" uppåt)

#### 10.2.3 Närvarohantering

**Layout:**

- Två sektioner: Fysiskt närvarande, Digitalt närvarande
- Sökfält för att hitta medlem
- Manuell registrering (lägg till/ta bort)
- QR-kod för självregistrering (fysiskt närvarande)

### 10.3 Valkommitté

#### 10.3.1 Kandidathantering

**Layout:**

- Lista över kandidater
- Varje kort: Profilbild, Namn, Position, Status
- Knappar: Redigera, Radera, Förhandsgranska

**Lägg till kandidat:**

- Formulär: Namn, E-post, Position, Presentation
- Bilduppladdning med crop-funktion
- Förhandsvisning av kandidatkort
- Spara-knapp

#### 10.3.2 Medlemshantering och godkännanden

**Tab-navigation:**

- Väntande godkännanden (med badge för antal)
- Manuella tillägg
- Röstlängd
- Logg/Revision

**Väntande godkännanden:**

**Layout:**

- Tabell med kolumner: Namn, Medlemsnr, E-post, Land, Begäran-datum, Åtgärder
- Filter: Visa alla / Endast internationella / Endast tekniska problem
- Sökfält för att hitta specifik medlem

**Medlemskort (expanderbart):**

- Namn och medlemsnummer
- E-postadress och land
- Begäran-datum och tid
- Anledning (om angiven): "Internationell medlem", "Sent betald", "Ny medlem", "Tekniskt problem"
- Medlemsstatus från register (om tillgänglig)

**Åtgärdsknappar:**

- **Godkänn** (grön): Öppnar modal för att välja autentiseringsmetod
- **Avslå** (röd): Öppnar modal för att ange anledning
- **Visa detaljer** (blå): Expanderar kort med fullständig information

**Godkännande-modal:**

**Steg 1: Verifiera medlem**

- Visa medlemsinformation från register (om tillgänglig)
- Checkbox: "Jag har verifierat medlemskap manuellt"
- Textfält: Kommentar (valfritt)

**Steg 2: Välj autentiseringsmetod**

- Radio buttons:
  - **Magic Link** (rekommenderad): Skickas automatiskt till medlemmens e-post
  - **QR-kod**: Genereras för scanning på plats
  - **Tillfälligt lösenord**: Visas för manuell överföring
  - **Användarnamn/lösenord**: Medlem skapar eget konto

**Steg 3: Bekräfta**

- Sammanfattning av vald metod
- Knapp: "Godkänn och skicka åtkomst"
- Feedback: "Medlem godkänd! Magic Link skickad till [e-post]"

**Manuella tillägg:**

**Layout:**

- Formulär för att lägga till medlem som inte finns i systemet
- Används för: Sent betalda, nya medlemmar, tekniska problem

**Formulärfält:**

- Namn (obligatoriskt)
- Medlemsnummer (obligatoriskt)
- E-postadress (obligatoriskt)
- Personnummer (valfritt, för svenska medlemmar)
- Telefonnummer (valfritt)
- Anledning (dropdown):
  - Sent betald medlem
  - Ny medlem (anmält precis innan mötet)
  - Tekniskt problem (glömt lösenord, tappat telefon)
  - Internationell medlem
  - Gästobservatör (ej röstberättigad)
  - Annat (fritext)
- Kommentar (fritext)

**Rättigheter:**

- Checkbox: "Röstberättigad" (default: checked, unchecked för observatörer)
- Checkbox: "Kan läsa handlingar"
- Checkbox: "Kan delta i diskussion"

**Autentiseringsmetod:**

- Radio buttons (samma som godkännande-modal)
- Förhandsvisning av vald metod

**Knappar:**

- **Lägg till och skicka åtkomst** (primär)
- **Avbryt** (sekundär)

**Feedback efter tillägg:**

- Toast: "Medlem tillagd! QR-kod genererad."
- Modal med QR-kod (om vald): Visa QR-kod för utskrift eller scanning
- Modal med lösenord (om valt): Visa tillfälligt lösenord för överföring

**Röstlängd:**

**Layout:**

- Tabell med alla röstberättigade medlemmar
- Kolumner: Namn, Medlemsnr, Autentiseringsmetod, Säkerhetsnivå, Verifieringstyp, Status, Tidsstämpel
- Filter: Visa alla / Automatiskt verifierade / Manuellt verifierade / Inloggade / Ej inloggade / Per säkerhetsnivå
- Sökfält
- Exportknapp: "Exportera som PDF" (för protokoll)

**Säkerhetsnivå-badges:**

Varje medlem får en visuell säkerhetsbadge:

- 🔒🔒🔒 **Mycket hög** (grön): Freja eID+ + API-integration
- 🔒🔒 **Hög** (ljusgrön): SSO med MFA + Directory Services, eller Freja eID+ + CSV
- 🔒 **Medel** (gul): Magic Link + API, eller Användarnamn/Lösenord + MFA + CSV
- ⚠️ **Låg** (orange): QR-kod + Manuellt tillagd, eller Magic Link + CSV
- ⚠️ **Manuell** (röd): Användarnamn/Lösenord utan MFA

**Tooltip vid hover:**

- Visar detaljer: "Freja eID+ (Hög säkerhet) + API-integration (Låg manipulationsrisk) = Mycket hög säkerhet"
- Förklaring: "Personnummerverifierad e-legitimation med realtidssynk mot medlemsregister"

**Säkerhetsöversikt (Dashboard):**

Ovanför röstlängden visas en sammanfattning:

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

**Varningar:**

Om > 10% har låg säkerhetsnivå:

- Gul varningsruta: "Observera: 15% av medlemmarna har låg säkerhetsnivå. Överväg att kräva högre autentisering för framtida möten."

Om > 25% har låg säkerhetsnivå:

- Röd varningsruta: "VARNING: 30% av medlemmarna har låg säkerhetsnivå. Detta kan påverka mötets legitimitet. Kontakta styrelsen."

**Verifieringstyp-badges:**

- **Automatisk** (grön): Verifierad via Freja eID+, SSO eller API
- **Manuell** (gul): Verifierad av valkommittén
- **Observatör** (grå): Ej röstberättigad

**Status-indikatorer:**

- **Inloggad** (grön prick): Medlem är för närvarande inloggad
- **Röstat** (checkmark): Medlem har avgivit minst en röst
- **Ej inloggad** (grå prick): Medlem har inte loggat in än

**Detaljerad vy (expanderbar rad):**

- Autentiseringsmetod: Freja eID+, Magic Link, QR-kod, etc.
- Verifierad av: [Namn] (om manuell)
- Tidsstämpel: När medlem godkändes/lades till
- Anledning: Varför manuell verifiering (om relevant)
- Kommentar: Fritext från valkommittén
- Inloggningshistorik: Senaste inloggningar med tidsstämplar

**Logg/Revision:**

**Layout:**

- Kronologisk lista över alla åtgärder
- Filter: Visa alla / Godkännanden / Tillägg / Ändringar / Avslag
- Datumfilter: Från - Till

**Loggposter:**

- Tidsstämpel
- Åtgärd: "Godkände medlem", "Lade till medlem", "Avslog begäran", "Genererade QR-kod"
- Utförd av: Valkommitténs användarnamn
- Medlem: Namn och medlemsnummer
- Detaljer: Autentiseringsmetod, anledning, kommentar
- IP-adress (för säkerhet)

**Exportfunktion:**

- Knapp: "Exportera logg som PDF"
- Används för revision och protokoll
- Innehåller alla åtgärder med tidsstämplar och ansvariga

#### 10.3.3 Generera åtkomstkoder (Snabbåtkomst)

**Layout:**

- Snabbformulär för att generera åtkomstkoder på plats
- Används när medlem står i dörren och behöver omedelbar åtkomst

**Formulär:**

- Medlemsnummer eller Namn (autocomplete från register)
- Välj metod: Magic Link, QR-kod, Tillfälligt lösenord
- Knapp: "Generera nu"

**Resultat:**

- **Magic Link**: "E-post skickad till [adress]"
- **QR-kod**: Fullskärms-QR-kod för scanning (medlem skannar med sin telefon)
- **Tillfälligt lösenord**: Stort, tydligt lösenord som kan läsas upp eller visas

**Användningsfall:**

- Medlem har glömt lösenord
- Medlem har tappat telefon
- Medlem har tekniska problem med Freja eID+
- Snabb åtkomst för sent anlända medlemmar

### 10.4 Mötessekreterare

#### 10.4.1 Protokollverktyg

**Layout:**

- Split-view: Dagordning (vänster), Protokoll (höger)
- Protokoll auto-genereras med röstsiffror
- Texteditor för att lägga till yrkanden och diskussion
- Versionshistorik

**Funktioner:**

- Markdown-editor med preview
- Auto-save var 30:e sekund
- Exportera som PDF med föreningens layout
- Signering (digital eller manuell)

### 10.5 Superadmin (IT-ansvarig)

#### 10.5.1 Konfigurationspanel

**Layout:**

- Tab-navigation: Allmänt, Medlemsregister, Autentisering, Utseende, Säkerhet
- Formulär med live-preview
- Spara-knapp (sticky bottom)
- Testknapp för att verifiera inställningar

**Allmänt:**

- Föreningsnamn, Beskrivning, Kontaktinfo
- Språkinställningar (Svenska, Engelska)
- Tidszon
- E-postadress för support

**Medlemsregister:**

**Tab-navigation:**

- Statisk fil
- API-integration
- Directory Services (AD/SSO)
- Hybrid

**Statisk fil:**

**Layout:**

- Filuppladdning (drag-and-drop eller bläddra)
- Accepterade format: CSV, XLSX
- Förhandsvisning av data (första 10 raderna)
- Kolumnmappning: Mappa kolumner till systemfält

**Kolumnmappning:**

- Dropdown för varje systemfält:
  - Namn (obligatoriskt)
  - Medlemsnummer (obligatoriskt)
  - E-postadress (obligatoriskt)
  - Personnummer (valfritt)
  - Telefonnummer (valfritt)
  - Status (valfritt: Aktiv, Inaktiv, Vilande)
  - Medlemstyp (valfritt: Fullvärdig, Hedersmedlem, Observatör)

**Validering:**

- Automatisk kontroll av:
  - Dubbletter (medlemsnummer, e-post)
  - Ogiltiga e-postadresser
  - Ogiltiga personnummer (om angivet)
- Visa fel och varningar
- Knapp: "Importera [X] medlemmar"

**Uppdatering:**

- Knapp: "Ladda upp ny fil" (ersätter befintlig data)
- Varning: "Detta kommer ersätta alla befintliga medlemmar. Är du säker?"
- Alternativ: "Lägg till nya medlemmar utan att ta bort befintliga"

**API-integration:**

**Layout:**

- Dropdown: Välj API-typ
  - Föreningshuset
  - Generiskt REST API
  - Custom (egen adapter)

**Föreningshuset:**

- Textfält: API-nyckel
- Textfält: Organisations-ID
- Knapp: "Testa anslutning"
- Checkbox: "Automatisk synkronisering"
- Dropdown: Synkroniseringsfrekvens (Varje timme, Varje dag, Manuellt)

**Generiskt REST API:**

- Textfält: API-URL (endpoint)
- Dropdown: Autentiseringsmetod (API-nyckel, OAuth2, Basic Auth)
- Textfält: API-nyckel / Client ID / Användarnamn
- Textfält: Client Secret / Lösenord (om relevant)
- JSON-mappning: Mappa API-svar till systemfält
- Knapp: "Testa anslutning"

**JSON-mappning (exempel):**

```json
{
  "name": "$.members[*].fullName",
  "memberNumber": "$.members[*].id",
  "email": "$.members[*].email",
  "personalNumber": "$.members[*].ssn",
  "status": "$.members[*].membershipStatus"
}
```

**Directory Services (AD/SSO):**

**Layout:**

- Dropdown: Välj typ
  - Microsoft Entra ID (Azure AD)
  - Google Workspace
  - Generisk LDAP
  - SAML 2.0

**Microsoft Entra ID:**

- Textfält: Tenant ID
- Textfält: Client ID
- Textfält: Client Secret
- Textfält: Grupp-ID (för att filtrera medlemmar)
- Knapp: "Testa anslutning"
- Knapp: "Synkronisera nu"

**Google Workspace:**

- Textfält: Domain (t.ex. mensa.se)
- Textfält: Client ID
- Textfält: Client Secret
- Textfält: Grupp-e-post (för att filtrera medlemmar)
- Knapp: "Auktorisera med Google"

**Generisk LDAP:**

- Textfält: LDAP-server (t.ex. ldap://dc.example.com)
- Textfält: Base DN (t.ex. ou=members,dc=mensa,dc=se)
- Textfält: Bind DN (admin-användare)
- Lösenordsfält: Bind-lösenord
- Textfält: Filter (t.ex. (objectClass=person))
- Attributmappning: Mappa LDAP-attribut till systemfält
- Knapp: "Testa anslutning"

**Hybrid:**

**Layout:**

- Checkbox: "Använd API för svenska medlemmar"
- Checkbox: "Använd CSV för internationella medlemmar"
- Checkbox: "Tillåt manuella tillägg av valkommittén"
- Informationstext: "Systemet kommer först försöka API, sedan CSV, sedan manuella tillägg"

**Autentisering:**

**Layout:**

- Checkboxes för att aktivera metoder:
  - Freja eID+ (rekommenderad)
  - SSO (Active Directory/Entra ID/Google)
  - Användarnamn/Lösenord
  - Magic Link
  - QR-kod
- Primär metod (radio button): Vilken metod visas först på inloggningssidan

**Freja eID+:**

- Textfält: Client ID (från Freja)
- Textfält: Client Secret
- Dropdown: Miljö (Test, Produktion)
- Checkbox: "Kräv personnummerverifiering"
- Knapp: "Testa integration"

**SSO:**

- Samma konfiguration som under Medlemsregister > Directory Services
- Checkbox: "Kräv MFA från SSO-provider"
- Checkbox: "Tillåt automatisk kontoskapande" (om användare finns i AD men inte i medlemsregister)

**Användarnamn/Lösenord:**

- Checkbox: "Kräv MFA (TOTP)"
- Checkbox: "Tillåt SMS-MFA" (kräver SMS-gateway)
- Textfält: SMS-gateway API-nyckel (om SMS-MFA aktiverat)
- Dropdown: Lösenordsstyrka (Svag, Medel, Stark, Mycket stark)
- Textfält: Minsta lösenordslängd (default: 12)
- Checkbox: "Kräv specialtecken"
- Checkbox: "Kräv siffror"
- Checkbox: "Kräv stora och små bokstäver"

**Magic Link:**

- Textfält: Länkens giltighetstid (minuter, default: 15)
- Checkbox: "Tillåt endast en användning per länk"
- Dropdown: E-postmall (välj från fördefinierade mallar)

**QR-kod:**

- Textfält: Kodens giltighetstid (timmar, default: 24)
- Checkbox: "Kräv manuellt godkännande av valkommittén"
- Checkbox: "Logga alla QR-kod-genereringar"

**Utseende:**

- Färgväljare för primär/sekundär färg
- Logotypuppladdning (SVG, PNG)
- Typsnitt-väljare (system-font eller custom)
- Live-preview av startsida

**Säkerhet:**

- Session timeout (minuter, default: 30)
- Checkbox: "Kräv återautentisering för känsliga åtgärder"
- IP-whitelist (valfritt, för admin-åtkomst)
- Checkbox: "Aktivera rate limiting"
- Textfält: Max inloggningsförsök (default: 5)
- Textfält: Lockout-tid (minuter, default: 15)
- Säkerhetskopieringsschema (Dagligen, Varje timme, Manuellt)

#### 10.5.2 Testverktyg

**Layout:**

- Sektion för att testa alla integrationer
- Används för att verifiera konfiguration innan mötet

**Testa medlemsregister:**

- Knapp: "Hämta testmedlem"
- Textfält: Medlemsnummer eller e-post
- Resultat: Visa medlemsdata från register
- Status: Framgång (grön) eller Fel (röd) med felmeddelande

**Testa autentisering:**

- Dropdown: Välj metod att testa
- Knapp: "Starta test"
- Resultat: Steg-för-steg-logg av autentiseringsprocessen
- Status: Framgång eller Fel med detaljer

**Testa e-post:**

- Textfält: Mottagare
- Knapp: "Skicka test-e-post"
- Resultat: Bekräftelse eller felmeddelande

**Testa notifikationer:**

- Knapp: "Skicka test-notifikation"
- Resultat: Bekräftelse eller felmeddelande

## 11. Felhantering och användarfeedback

### 11.1 Felmeddelanden

**Principer:**

- Tydligt språk (inga tekniska felkoder)
- Förklara VAD som gick fel
- Föreslå HUR användaren kan lösa det
- Visa kontaktinfo om problemet kvarstår

**Exempel:**

**Dåligt:**

- "Error 500: Internal Server Error"

**Bra:**

- "Något gick fel när din röst skulle sparas. Kontrollera din internetanslutning och försök igen. Om problemet kvarstår, kontakta support@mensa.se"

### 11.2 Toast-meddelanden

**Typer:**

- Framgång (grön): "Din röst är sparad"
- Varning (gul): "Röstning stängs om 5 minuter"
- Fel (röd): "Kunde inte spara röst, försök igen"
- Info (blå): "Nya handlingar uppladdade"

**Placering:**

- Top center på desktop
- Bottom center på mobil (ovanför navigation)
- Auto-dismiss efter 5 sekunder
- Stäng-knapp (X) för manuell stängning

### 11.3 Tomma tillstånd (Empty states)

**När ingen data finns:**

- Illustration eller ikon
- Förklarande text: "Inga kommande möten"
- Call-to-action: "Skapa nytt möte" (om användaren har behörighet)

**Exempel:**

- Inga kandidater: "Inga kandidater har lagts till än. Klicka på 'Lägg till kandidat' för att komma igång."
- Inga handlingar: "Inga handlingar uppladdade. Handlingar kommer att publiceras senast 4 veckor före mötet."

### 11.4 Laddningstillstånd

**Första laddning:**

- Fullskärms-spinner med föreningens logotyp
- Text: "Laddar..."

**Innehållsladdning:**

- Skeleton screens för listor
- Inline spinner för knappar
- Progress bar för filuppladdning

### 11.5 Bekräftelser

**Kritiska åtgärder kräver bekräftelse:**

- Radera kandidat
- Stäng röstning (dekryptera)
- Radera möte
- Avslå medlemsgodkännande

**Bekräftelsedialog:**

- Tydlig rubrik: "Är du säker?"
- Förklaring av konsekvenser
- Två knappar: Destruktiv (röd) + Avbryt (grå)

## 12. Performance och optimering

### 12.1 Laddningstid

**Mål:**

- First Contentful Paint (FCP): < 1.5s
- Time to Interactive (TTI): < 3.5s
- Largest Contentful Paint (LCP): < 2.5s

**Optimeringar:**

- Code splitting (lazy loading av routes)
- Image optimization (WebP, lazy loading)
- Minifiering av CSS/JS
- CDN för statiska assets
- Gzip/Brotli compression

### 12.2 Bildhantering

**Kandidatbilder:**

- Automatisk crop till 1:1 (kvadrat)
- Resize till 400x400px (original)
- Generera thumbnails: 80x80px, 200x200px
- Format: WebP med JPEG fallback
- Lazy loading

**Logotyper:**

- SVG föredras (skalbart)
- PNG med transparent bakgrund
- Flera storlekar: 32x32, 64x64, 128x128, 256x256

### 12.3 Databas-queries

**Optimering:**

- Paginering för långa listor (20-50 items per sida)
- Infinite scroll eller "Ladda fler"-knapp
- Cachning av ofta läst data
- Indexering av sökbara fält

## 13. Säkerhet i UI

### 13.1 Visuella säkerhetsindikatorer

**HTTPS-indikator:**

- Lås-ikon i adressfältet (browser default)
- Text: "Säker anslutning" i footer

**Krypteringsstatus:**

- Ikon vid röstning: "Din röst krypteras"
- Text efter röstning: "Din röst är krypterad och anonym"

**Session timeout:**

- Varning 5 minuter innan timeout
- Modal: "Din session håller på att löpa ut. Vill du fortsätta?"
- Auto-logout efter timeout med omdirigering till login

### 13.2 Skydd mot clickjacking

**Implementation:**

- X-Frame-Options: DENY
- Content-Security-Policy: frame-ancestors 'none'

### 13.3 Input-validering

**Frontend-validering:**

- Realtidsvalidering (medan användaren skriver)
- Tydliga felmeddelanden under fält
- Disable submit-knapp tills formulär är giltigt
- Sanitering av input (XSS-skydd)

**Backend-validering:**

- Aldrig lita på frontend-validering
- Dubbel validering på server
- Rate limiting för API-endpoints

## 14. Testning och kvalitetssäkring

### 14.1 Användartestning

**Testgrupper:**

- Äldre medlemmar (65+) - Tillgänglighet och enkelhet
- Yngre medlemmar (18-30) - Moderna förväntningar
- Internationella medlemmar - Språk och kulturella skillnader
- Personer med funktionsnedsättningar - Skärmläsare, tangentbord

**Testscenarier:**

- Första gången användaren loggar in
- Avge förtidsröst
- Ändra förtidsröst
- Delta i live-röstning
- Verifiera röst med kvittokod

### 14.2 Automatiserad testning

**Enhetstester:**

- Alla komponenter
- Alla utility-funktioner
- Minst 80% code coverage

**Integrationstester:**

- API-anrop
- Autentiseringsflöden
- Röstningsprocess end-to-end

**E2E-tester (Playwright/Cypress):**

- Kritiska användarflöden
- Alla roller
- Cross-browser (Chrome, Firefox, Safari)

### 14.3 Accessibility-testning

**Verktyg:**

- axe DevTools
- WAVE
- Lighthouse Accessibility Audit
- Manuell testning med skärmläsare (NVDA, JAWS, VoiceOver)

**Krav:**

- Inga kritiska eller allvarliga fel
- WCAG 2.1 AA-compliance

### 14.4 Performance-testning

**Verktyg:**

- Lighthouse
- WebPageTest
- Chrome DevTools Performance

**Belastningstestning:**

- Simulera 1000 samtidiga användare
- Testa under peak (när röstning öppnas)
- Verifiera response times < 2s

## 15. Dokumentation för användare

### 15.1 Onboarding

**Första inloggning:**

- Välkomstskärm med kort intro
- Interaktiv guide (tooltips)
- "Hoppa över" eller "Visa inte igen"-alternativ

**Tooltips:**

- Små info-ikoner (?) vid komplexa funktioner
- Hover/tap för att visa förklaring
- Länk till fullständig dokumentation

### 15.2 Hjälpsektion

**Innehåll:**

- FAQ (Vanliga frågor)
- Steg-för-steg-guider med skärmdumpar
- Videotutorials (valfritt)
- Kontaktinfo för support

**Sökfunktion:**

- Sökbar hjälpdatabas
- Förslag baserat på användarens roll

### 15.3 Kontextuell hjälp

**Inline-hjälp:**

- Hjälptext under komplexa formulärfält
- Exempel på korrekt input
- Länkar till relevant dokumentation

## 16. Internationalisering (i18n)

### 16.1 Språkstöd

**Primära språk:**

- Svenska (standard)
- Engelska

**Framtida språk:**

- Finska, Norska, Danska (nordiska Mensa-föreningar)

### 16.2 Implementation

**Teknisk lösning:**

- i18n-ramverk (react-i18next, vue-i18n)
- Översättningsfiler (JSON eller YAML)
- Språkväljare i inställningar
- Sparad preferens per användare

**Översättningsbara element:**

- All UI-text
- Felmeddelanden
- E-postmallar
- Push-notifikationer
- Hjälpdokumentation

**Kulturella anpassningar:**

- Datumformat (YYYY-MM-DD i Sverige)
- Tidsformat (24-timmars i Sverige)
- Valutaformat (om relevant)

## 17. Analytics och användarinsikter

### 17.1 Spårning (med GDPR-hänsyn)

**Vad som spåras:**

- Sidvisningar (anonymiserat)
- Klickhändelser på knappar
- Tid på sida
- Felfrekvens
- Laddningstider

**Vad som INTE spåras:**

- Röstinnehåll (aldrig)
- Personuppgifter utan samtycke
- IP-adresser (anonymiseras)

### 17.2 Verktyg

**Rekommendation:**

- Plausible Analytics (privacy-friendly)
- Matomo (self-hosted)
- INTE Google Analytics (GDPR-problem)

### 17.3 Användning av data

**Syfte:**

- Identifiera UX-problem
- Optimera laddningstider
- Förbättra användarflöden
- Upptäcka buggar

## 18. Framtida förbättringar

### 18.1 Fas 1 (MVP)

**Måste ha:**

- Grundläggande röstningsfunktionalitet
- Autentisering med Freja eID+
- Responsiv design (mobil + desktop)
- Tillgänglighet (WCAG 2.1 AA)
- Offline-läsning av handlingar

### 18.2 Fas 2 (Förbättringar)

**Bra att ha:**

- Push-notifikationer
- Dark mode
- Avancerade animationer
- Offline-röstning med kö
- Live-streaming integration

### 18.3 Fas 3 (Avancerat)

**Framtida funktioner:**

- AI-assistent för att sammanfatta handlingar
- Realtids-översättning av diskussioner
- Biometrisk autentisering
- AR-funktioner för hybrid-möten
- Blockchain-baserad verifiering

## 19. Designsystem och komponentbibliotek

### 19.1 Skapa designsystem

**Verktyg:**

- Figma för design och prototyper
- Storybook för komponentdokumentation
- Design tokens för färger, spacing, typografi

**Innehåll:**

- Alla UI-komponenter
- Interaktionsmönster
- Användningsexempel
- Do's and Don'ts

### 19.2 Komponentbibliotek

**Struktur:**

- Atomära komponenter (knappar, input, ikoner)
- Molekyler (formulär, kort)
- Organismer (navigation, header, footer)
- Mallar (sidlayouter)
- Sidor (kompletta vyer)

### 19.3 Versionering

**Semantic versioning:**

- Major: Breaking changes
- Minor: Nya funktioner (bakåtkompatibla)
- Patch: Buggfixar

**Changelog:**

- Dokumentera alla ändringar
- Migreringsguider för breaking changes

## 20. Sammanfattning och rekommendationer

### 20.1 Kritiska UI/UX-krav

1. **Mobile-first design**: Majoriteten kommer rösta via mobil
2. **Tillgänglighet**: WCAG 2.1 AA är obligatoriskt
3. **Offline-funktionalitet**: Läsning av handlingar måste fungera offline
4. **Tydlig feedback**: Användaren måste alltid veta vad som händer
5. **Säkerhetsvisualisering**: Visa att systemet är säkert och krypterat

### 20.2 Teknisk stack (rekommendation)

**Frontend:**

- React eller Vue med TypeScript
- Tailwind CSS för styling
- PWA med Workbox
- Framer Motion för animationer

**UI-ramverk:**

- Headless UI eller Radix UI (tillgängliga komponenter)
- Custom styling med Tailwind

**State management:**

- Zustand eller Redux Toolkit

**Testing:**

- Vitest för enhetstester
- Playwright för E2E-tester
- axe för accessibility-tester

### 20.3 Nästa steg

1. **Skapa wireframes** för alla huvudvyer
2. **Designa i Figma** med fullständigt designsystem
3. **Bygg prototyp** för användartestning
4. **Genomför användartester** med målgruppen
5. **Iterera baserat på feedback**
6. **Implementera MVP** med fokus på kärnfunktionalitet
7. **Testa grundligt** (funktionellt, tillgänglighet, performance)
8. **Lansera pilot** med begränsad användargrupp
9. **Samla feedback och förbättra**
10. **Full lansering** för årsmöte

### 20.4 Framgångsfaktorer

- **Enkelhet**: Systemet måste vara intuitivt för alla åldrar
- **Tillförlitlighet**: Inga buggar eller nedtid under mötet
- **Transparens**: Användaren måste förstå vad som händer
- **Säkerhet**: Visuellt och tekniskt förtroende
- **Support**: Tydlig hjälp och snabb support vid problem

---

**Dokumentversion**: 1.0
**Datum**: 2026-02-25
**Författare**: Systemspecifikation för Mensa Sverige
**Status**: Utkast för granskning
