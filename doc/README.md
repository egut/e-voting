# Dokumentation: Digitalt röstningssystem för Mensa Sverige

## Översikt

Detta är dokumentationen för det digitala röstningssystem som ska ersätta pappersbaserad poströstning vid Mensa Sveriges årsmöten.

## Huvuddokument

### [ÖVERSIKT.md](OVERSIKT.md)

Snabbstart och översikt över hela projektet. Börja här!

### [system-spec.md](system-spec.md)

Ursprunglig systemspecifikation (behålls för referens, men se krav-mappen för strukturerad dokumentation)

## Kravdokumentation

Alla krav finns i mappen [krav/](krav/):

1. **[Funktionella krav](krav/FUNKTIONELLA-KRAV.md)** - Vad systemet ska göra
2. **[Prestanda och tekniska krav](krav/PRESTANDA-OCH-TEKNISKA-KRAV.md)** - Hur snabbt och säkert
3. **[Säkerhet och kryptering](krav/SAKERHET-OCH-KRYPTERING.md)** - Säkerhetsmekanismer
4. **[Autentisering och medlemsregister](krav/AUTENTISERING-OCH-MEDLEMSREGISTER.md)** - Inloggning och verifiering
5. **[Infrastruktur och hosting](krav/INFRASTRUKTUR-OCH-HOSTING.md)** - Teknisk infrastruktur
6. **[Presentation och röstningsflöde](krav/PRESENTATION-OCH-ROSTNINGSFLODE.md)** - Detaljerat flöde under mötet
7. **[Personas och funktioner](krav/PERSONAS-OCH-FUNKTIONER.md)** - Alla användarroller
8. **[Kostnadsuppskattning](krav/KOSTNADSUPPSKATTNING.md)** - Kostnader och ROI
9. **[Arbetsflöde](krav/ARBETSFLODE.md)** - Steg-för-steg-guide
10. **[UI/UX-krav](krav/UI-UX-KRAV.md)** - Användargränssnitt och användarupplevelse
11. **[Playfulness och teman](krav/PLAYFULNESS-OCH-TEMAN.md)** - Tema-mallar och playfulness-nivåer
12. **[Autentisering (detaljerad)](krav/AUTENTISERING-OCH-MEDLEMSREGISTER-DETALJERAD.md)** - Detaljerad autentisering

Se [krav/README.md](krav/README.md) för detaljerad beskrivning av varje dokument.

## Referensdokument

### Stadgar och motioner (mensa/)

- **[Mensa-Sverige-Stadgar-2024.pdf](mensa/Mensa-Sverige-Stadgar-2024.pdf)** - Mensa Sveriges stadgar (svenska)
- **[Mensa-Sweden-Bylaws-2024.pdf](mensa/Mensa-Sweden-Bylaws-2024.pdf)** - Mensa Sveriges stadgar (engelska)
- **[digital-motion.md](mensa/digital-motion.md)** - Antagen motion om digitalt röstningssystem
- **[Valbilaga_2025_webb.pdf](mensa/Valbilaga_2025_webb.pdf)** - Valbilaga 2025

## Snabbstart

### För beslutsfattare

1. Läs [ÖVERSIKT.md](OVERSIKT.md)
2. Läs [krav/FUNKTIONELLA-KRAV.md](krav/FUNKTIONELLA-KRAV.md)
3. Läs [krav/KOSTNADSUPPSKATTNING.md](krav/KOSTNADSUPPSKATTNING.md)

### För utvecklare

1. Läs [ÖVERSIKT.md](OVERSIKT.md)
2. Läs [krav/PRESTANDA-OCH-TEKNISKA-KRAV.md](krav/PRESTANDA-OCH-TEKNISKA-KRAV.md)
3. Läs [krav/SAKERHET-OCH-KRYPTERING.md](krav/SAKERHET-OCH-KRYPTERING.md)
4. Läs [UI-UX-KRAV.md](UI-UX-KRAV.md)

### För användare

1. Läs [ÖVERSIKT.md](OVERSIKT.md)
2. Läs [krav/PERSONAS-OCH-FUNKTIONER.md](krav/PERSONAS-OCH-FUNKTIONER.md) (hitta din roll)
3. Läs [krav/PRESENTATION-OCH-ROSTNINGSFLODE.md](krav/PRESENTATION-OCH-ROSTNINGSFLODE.md)

### För IT-ansvariga

1. Läs [ÖVERSIKT.md](OVERSIKT.md)
2. Läs [krav/INFRASTRUKTUR-OCH-HOSTING.md](krav/INFRASTRUKTUR-OCH-HOSTING.md)
3. Läs [krav/PRESTANDA-OCH-TEKNISKA-KRAV.md](krav/PRESTANDA-OCH-TEKNISKA-KRAV.md)
4. Läs [krav/ARBETSFLODE.md](krav/ARBETSFLODE.md)

## Viktiga höjdpunkter

### Prestanda

- API-responstid för röstning: 50-150ms
- Resultatpresentation: < 500ms för 500 röster
- Klarar 500 samtidiga användare

### Säkerhet

- Kryptografisk separation (VEM vs VAD)
- End-to-End Verifiability
- Blind Signatures
- > 95% kodtäckning för kritisk kod
- ENDAST standardbibliotek för kryptering

### Kostnad

- Liten förening: 0 kr/månad
- Medelstor förening: 100-300 kr/månad
- Stor förening: 300-900 kr/månad
- Besparing: 6 400 - 46 400 kr/år vs poströstning

### Användarvänlighet

- Mobile-first design
- WCAG 2.1 AA-compliance
- 13+ tema-mallar
- Playfulness-slider (1-10)

## Status

### Komplett ✅

- Funktionella krav
- Prestanda och tekniska krav
- Säkerhetskrav
- Autentisering och medlemsregister
- Infrastruktur och hosting
- Presentation och röstningsflöde
- Personas och funktioner
- Kostnadsuppskattning
- Arbetsflöde
- UI/UX-krav
- Playfulness och teman
- Autentisering (detaljerad)

### Pågående ⏳

- GDPR-analys och DPIA
- API-specifikation
- Databasschema
- Kryptografisk implementation (detaljerad)

## Nästa steg

1. **Fas 1: Kravspecifikation** (Pågående)
   - Komplettera GDPR-analys
   - Skapa API-specifikation
   - Designa databasschema

2. **Fas 2: Prototyp och Proof of Concept**
   - Bygg minimal prototyp
   - Testa autentisering
   - Implementera krypterad valurna

3. **Fas 3: Pilottest**
   - Testa med begränsad grupp
   - Samla feedback
   - Åtgärda buggar

4. **Fas 4: Säkerhetsgranskning**
   - Penetrationstestning
   - Kodgranskning
   - Disaster recovery-test

5. **Fas 5: Produktion**
   - Skarpt test vid mindre möte
   - Utvärdera och justera
   - Rulla ut för årsmöte

## Kontakt

- **Projektägare**: Mensa Sverige
- **Kontakt**: [E-post]
- **Repository**: [GitHub-länk när tillgänglig]

## Licens

- **Kod**: AGPLv3 eller MIT (väljs vid release)
- **Dokumentation**: Creative Commons BY-SA 4.0

## Bidra

Detta är ett Open Source-projekt och vi välkomnar bidrag:

- Kodgranskning
- Utveckling
- Testning
- Dokumentation
- Översättning

Se [ÖVERSIKT.md](OVERSIKT.md) för mer information om hur du kan bidra.
