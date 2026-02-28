# Systemspecifikation: Digitalt röstningssystem för Mensa Sverige

## 1. Översikt och Syfte

### 1.1 Bakgrund

Detta dokument beskriver det digitala röstningssystem som ska ersätta pappersbaserad poströstning vid Mensa Sveriges årsmöten, i enlighet med antagen motion. Systemet ska möjliggöra både förtidsröstning och live-röstning under mötet, samt stödja distansdeltagande via stream.

### 1.2 Målbild

Systemet ska utvecklas som en **Open Source-lösning** (förslagsvis under AGPLv3 eller MIT-licens) för att maximera transparens och möjliggöra återanvändning av andra svenska och nordiska föreningar. Öppen källkod är ett kärnkrav för att bygga förtroende för e-röstningssystem hos medlemmarna.

### 1.3 Kärnprinciper

- **Transparens**: Öppen källkod och verifierbar rösträkning
- **Säkerhet**: Kryptografisk separation mellan identitet och röst
- **Tillgänglighet**: Fungerar på alla enheter (mobil, surfplatta, dator)
- **Portabilitet**: Kan driftas från laptop till molnkluster
- **Användarvänlighet**: Intuitivt gränssnitt för alla användarroller
- **Prestanda**: Snabba API-svar (50-150ms för röstning)
- **Rättssäkerhet**: Noggrann testning och granskning av kritisk kod

## 2. Dokumentstruktur

Denna specifikation är uppdelad i flera dokument för att göra det lättare att hitta information:

### 2.1 Kravdokument

- **[Funktionella krav](krav/FUNKTIONELLA-KRAV.md)**: Röstningsprocess, valmetoder, innehållshantering
- **[Prestanda och tekniska krav](krav/PRESTANDA-OCH-TEKNISKA-KRAV.md)**: API-responstider, säkerhetskrav för kod och bibliotek, testning, dokumentation
- **[Säkerhet och kryptering](krav/SAKERHET-OCH-KRYPTERING.md)**: Kryptografisk separation, hotmodellering, GDPR
- **[Autentisering och medlemsregister](krav/AUTENTISERING-OCH-MEDLEMSREGISTER.md)**: Medlemsregister-integration, autentiseringsmetoder, specialfall
- **[Infrastruktur och hosting](krav/INFRASTRUKTUR-OCH-HOSTING.md)**: Portabilitet, WAF, hosting-alternativ, backup
- **[Presentation och röstningsflöde](krav/PRESENTATION-OCH-ROSTNINGSFLODE.md)**: Detaljerat flöde för ordförande, deltagare, sekreterare
- **[Personas och funktioner](krav/PERSONAS-OCH-FUNKTIONER.md)**: Alla användarroller och deras funktioner på årsmötet
- **[Kostnadsuppskattning](krav/KOSTNADSUPPSKATTNING.md)**: Kostnader per föreningstyp, ROI-kalkyl
- **[Arbetsflöde](krav/ARBETSFLODE.md)**: Steg-för-steg från uppsättning till efterarbete
- **[UI/UX-krav](krav/UI-UX-KRAV.md)**: Användargränssnitt och användarupplevelse
- **[Playfulness och teman](krav/PLAYFULNESS-OCH-TEMAN.md)**: Tema-mallar och playfulness-nivåer
- **[Autentisering (detaljerad)](krav/AUTENTISERING-OCH-MEDLEMSREGISTER-DETALJERAD.md)**: Detaljerad autentisering med inloggningsskärmar

### 2.2 Referensdokument

- **Stadgar och motioner**: Se mappen [mensa/](mensa/) för stadgar och antagen motion

## 3. Snabbstart

### 3.1 För beslutsfattare

Läs:

1. Denna översikt
2. [Funktionella krav](krav/FUNKTIONELLA-KRAV.md)
3. [Kostnadsuppskattning](krav/KOSTNADSUPPSKATTNING.md)
4. [Säkerhet och kryptering](krav/SAKERHET-OCH-KRYPTERING.md)

### 3.2 För utvecklare

Läs:

1. [Prestanda och tekniska krav](krav/PRESTANDA-OCH-TEKNISKA-KRAV.md)
2. [Säkerhet och kryptering](krav/SAKERHET-OCH-KRYPTERING.md)
3. [Infrastruktur och hosting](krav/INFRASTRUKTUR-OCH-HOSTING.md)
4. [UI/UX-krav](krav/UI-UX-KRAV.md)

### 3.3 För användare

Läs:

1. [Personas och funktioner](krav/PERSONAS-OCH-FUNKTIONER.md) (hitta din roll)
2. [Presentation och röstningsflöde](krav/PRESENTATION-OCH-ROSTNINGSFLODE.md)
3. [Arbetsflöde](krav/ARBETSFLODE.md)

### 3.4 För IT-ansvariga

Läs:

1. [Infrastruktur och hosting](krav/INFRASTRUKTUR-OCH-HOSTING.md)
2. [Prestanda och tekniska krav](krav/PRESTANDA-OCH-TEKNISKA-KRAV.md)
3. [Autentisering och medlemsregister](krav/AUTENTISERING-OCH-MEDLEMSREGISTER.md)
4. [Arbetsflöde](krav/ARBETSFLODE.md)

## 4. Viktiga höjdpunkter

### 4.1 Prestanda

- **API-responstid för röstning**: Max 50ms (utan kryptering), 150ms (med kryptering)
- **Resultatpresentation**: Max 500ms för 500 röster
- **Belastning**: Systemet klarar 500 samtidiga användare

### 4.2 Säkerhet

- **Kryptografisk separation**: VEM och VAD lagras separat
- **End-to-End Verifiability**: Medlemmar kan verifiera sina röster
- **Blind Signatures**: Ingen koppling mellan identitet och röst
- **Minimala beroenden**: Kopiera funktioner istället för att importera hela bibliotek
- **ENDAST standardbibliotek för kryptering**: Aldrig egenutvecklade algoritmer

### 4.3 Testning

- **Kritisk kod**: >95% kodtäckning, noggrann granskning, defensiv säkerhet
- **Vanlig kod**: >70% kodtäckning, grundläggande testning
- **Mermaid-diagram**: Alla kritiska funktioner har flödes- och arkitekturdiagram

### 4.4 Användarvänlighet

- **Mobile-first**: Designad först för mobil, sedan desktop
- **WCAG 2.1 AA**: Obligatorisk tillgänglighet
- **13+ tema-mallar**: Från strikt professionell till extremt lekfull
- **Playfulness-slider**: Justera animationer och effekter (1-10)

### 4.5 Kostnad

- **Liten förening**: 0 kr/månad (laptop-hosting)
- **Medelstor förening**: 100-300 kr/månad (VPS)
- **Stor förening**: 300-900 kr/månad (molntjänst)
- **Besparing**: 6 400 - 46 400 kr/år jämfört med poströstning

## 5. Nästa steg

### 5.1 Fas 1: Kravspecifikation (Pågående)

- ✅ Funktionella krav dokumenterade
- ✅ Prestanda och tekniska krav dokumenterade
- ✅ Säkerhetskrav dokumenterade
- ✅ UI/UX-krav dokumenterade
- ⏳ GDPR-analys och DPIA (behöver kompletteras)
- ⏳ API-specifikation (behöver skapas)
- ⏳ Databasschema (behöver skapas)

### 5.2 Fas 2: Prototyp och Proof of Concept

- Bygg minimal prototyp med kärnfunktionalitet
- Testa autentisering mot Föreningshuset API
- Implementera och testa krypterad valurna
- Genomför intern säkerhetsgranskning

### 5.3 Fas 3: Pilottest

- Genomför pilottest med begränsad användargrupp
- Testa alla användarroller och arbetsflöden
- Samla feedback på användarupplevelse
- Identifiera och åtgärda buggar

### 5.4 Fas 4: Säkerhetsgranskning

- Anlita extern säkerhetsexpert för penetrationstestning
- Genomför kodgranskning (code review)
- Testa disaster recovery-procedurer
- Dokumentera alla säkerhetsåtgärder

### 5.5 Fas 5: Produktion

- Genomför skarpt test vid mindre möte (lokalförening?)
- Utvärdera och justera baserat på erfarenheter
- Rulla ut för årsmöte
- Kontinuerlig övervakning och förbättring

## 6. Kontakt och bidrag

### 6.1 Projektledning

- **Projektägare**: Mensa Sverige
- **Kontakt**: [E-post]
- **Repository**: [GitHub-länk när tillgänglig]

### 6.2 Bidra till projektet

Detta är ett Open Source-projekt och vi välkomnar bidrag:

- **Kodgranskning**: Granska säkerhet och kvalitet
- **Utveckling**: Implementera funktioner
- **Testning**: Testa systemet och rapportera buggar
- **Dokumentation**: Förbättra dokumentation
- **Översättning**: Översätt till fler språk

### 6.3 Licens

- **Kod**: AGPLv3 eller MIT (väljs vid release)
- **Dokumentation**: Creative Commons BY-SA 4.0

## 7. Sammanfattning

Detta digitala röstningssystem är designat för att vara:

- **Säkert**: Kryptografisk separation, E2E-verifierbarhet, noggrann testning
- **Transparent**: Open Source-kod som kan granskas av vem som helst
- **Användarvänligt**: Intuitivt gränssnitt för alla roller, fungerar på alla enheter
- **Flexibelt**: Stödjer olika valmetoder och kan anpassas för olika föreningar
- **Kostnadseffektivt**: Kan driftas för under 300 kr/månad eller helt gratis på laptop
- **Snabbt**: API-svar på 50-150ms, resultat på < 500ms
- **Vältestat**: >95% kodtäckning för kritisk kod, defensiv säkerhet

Systemet uppfyller alla krav i den antagna motionen och går längre genom att erbjuda en komplett lösning som kan användas av andra föreningar.
