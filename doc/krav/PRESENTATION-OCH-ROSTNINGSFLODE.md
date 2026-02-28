# Presentation och Röstningsflöde

## 1. Översikt

Detta dokument beskriver det detaljerade flödet för presentation av dagordning och röstning under årsmötet, inklusive interaktion mellan ordförande, deltagare och systemet.

## 2. Projektor-vy (Ordförandens kontroll)

### 2.1 Dagordningspresentation

Ordföranden styr vad som visas på projektorn genom att klicka på knappar i sitt gränssnitt.

#### 2.1.1 Visa dagordningspunkt

När ordföranden klickar på en dagordningspunkt:

1. **Punkten presenteras på projektorn**
   - Punktnummer och titel visas stort
   - Typ av punkt indikeras tydligt:
     - 🔵 **Informativ punkt** (ingen röstning)
     - 🟢 **Röstpunkt** (kräver beslut)
   - Kort beskrivning visas (om tillgänglig)

2. **Samtidigt på deltagarnas enheter**
   - Samma punkt visas automatiskt
   - Deltagare kan se extra material direkt
   - Deltagare kan bläddra fritt i dokument

#### 2.1.2 Visa extra material

Efter att punkten presenterats kan ordföranden klicka för att visa extra dokument:

1. **Första klicket efter punktvisning**
   - Dagordningspunkten flyttas till botten av skärmen (kompakt vy)
   - Extra material visas i huvudområdet

2. **Dokumenttyper som kan visas**
   - Revisionsrapport
   - Verksamhetsrapport
   - Budget
   - Kandidatpresentationer
   - Propositioner
   - Andra bilagor

3. **Flera slides**
   - Om dokumentet har flera sidor/slides
   - Ordföranden klickar för att gå till nästa slide
   - Sidnummer visas (t.ex. "3 / 7")

4. **På deltagarnas enheter**
   - Samma dokument visas
   - Deltagare kan bläddra fritt (oberoende av ordföranden)
   - Deltagare kan zooma och scrolla
   - Deltagare kan gå tillbaka till tidigare dokument

### 2.2 Röstningsprocess

#### 2.2.1 Initiera röstning

När mötet är redo att rösta:

1. **Ordföranden klickar "Öppna röstning"**
   - Knappen är tydligt markerad (grön, stor)
   - Bekräftelsedialog visas: "Är du säker på att du vill öppna röstning för [Punktnamn]?"

2. **Nedräkningstimer startar**
   - Stor timer visas på projektorn
   - Tid kan konfigureras per punkt (standard: 60 sekunder)
   - Inställningar: 30s, 60s, 90s, 120s (väljs vid skapande av punkt)

3. **På deltagarnas enheter**
   - Röstgränssnitt visas automatiskt
   - Timer synkroniserad med projektorn
   - Tydliga knappar för att rösta
   - Möjlighet att ändra röst fram till tiden tar slut

#### 2.2.2 Under röstningen

**På projektorn:**

- Stor nedräkningstimer (t.ex. "01:23" kvar)
- Antal röster mottagna (EJ resultat): "147 av 203 medlemmar har röstat"
- Procentandel: "72% har röstat"
- Ingen information om hur folk röstat (krypterad valurna)

**På deltagarnas enheter:**

- Röstningsalternativ visas tydligt
- Medlem kan rösta och ändra sin röst
- Visuell bekräftelse när röst registrerats
- Timer synkroniserad med projektorn

#### 2.2.3 Tiden tar slut

1. **Automatisk stängning**
   - När timern når 00:00 stängs röstningen automatiskt
   - Ingen kan längre rösta eller ändra sin röst

2. **Väntetid för nätverksfördröjning**
   - Systemet väntar 2 sekunder efter stängning
   - Säkerställer att alla röster hunnit fram över internet
   - Visuell indikator: "Väntar på sista röster... 2s"

3. **Dekryptering och rösträkning**
   - Ordföranden dekrypterar valurnan (automatiskt med sin nyckel)
   - Systemet räknar röster enligt vald metod
   - Resultat beräknas

#### 2.2.4 Resultatpresentation

**På projektorn:**

- Resultat visas stort och tydligt
- Visuell representation (stapeldiagram, cirkeldiagram)
- Exakta siffror:
  - Ja: 145 (71%)
  - Nej: 42 (21%)
  - Avstår: 16 (8%)
  - Totalt: 203 röster
- Beslut markeras tydligt: "✅ BIFALLET" eller "❌ AVSLAGEN"

**På deltagarnas enheter:**

- Samma resultat visas
- Deltagare kan se sin egen röst (för verifiering)
- Kvittokod visas för senare verifiering

**I protokollet:**

- Resultat förs automatiskt till protokollet
- Sekreteraren kan lägga till ytterligare noteringar:
  - Yrkanden
  - Diskussionspunkter
  - Särskilda uttalanden

### 2.3 Ordförandens kontroller

#### 2.3.1 Knappar och funktioner

- **Nästa punkt**: Går till nästa dagordningspunkt
- **Föregående punkt**: Går tillbaka till föregående punkt
- **Visa dokument**: Visar extra material för aktuell punkt
- **Nästa slide**: Går till nästa slide i dokument
- **Öppna röstning**: Startar röstning för aktuell punkt
- **Förläng tid**: Lägger till extra tid (30s) under pågående röstning
- **Stäng röstning**: Stänger röstning manuellt (innan tiden tar slut)
- **Pausa möte**: Pausar mötet (vid tekniskt haveri eller rast)

#### 2.3.2 Statusöversikt

Ordföranden ser alltid:

- Aktuell dagordningspunkt
- Antal inloggade medlemmar
- Antal fysiskt närvarande (om registrerat)
- Antal digitalt närvarande
- Röstningsstatus (öppen/stängd)
- Antal röster mottagna (under röstning)

## 3. Deltagarvy (Medlemmens gränssnitt)

### 3.1 Följa mötet

#### 3.1.1 Automatisk synkronisering

- Deltagaren ser samma dagordningspunkt som visas på projektorn
- Uppdateras automatiskt när ordföranden byter punkt
- Ingen fördröjning (WebSocket-baserad realtidsuppdatering)

#### 3.1.2 Fri navigering

Deltagaren kan:

- Bläddra fritt i extra dokument (oberoende av ordföranden)
- Gå tillbaka till tidigare punkter
- Läsa framåt i dagordningen
- Zooma och scrolla i dokument
- Ladda ner dokument för offline-läsning

#### 3.1.3 Visuell indikator

- Tydlig markering av aktuell punkt (grön ram)
- Indikator om deltagaren är "off-sync" (läser annan punkt än ordföranden visar)
- Knapp för att "Gå tillbaka till aktuell punkt"

### 3.2 Rösta

#### 3.2.1 Röstgränssnitt

När röstning öppnas:

1. **Automatisk visning**
   - Röstgränssnitt visas automatiskt över innehållet
   - Kan inte stängas (måste rösta eller vänta tills tiden tar slut)
   - Tydlig timer visar tid kvar

2. **Röstningsalternativ**
   - Stora, tydliga knappar
   - Färgkodade:
     - 🟢 Ja (grön)
     - 🔴 Nej (röd)
     - 🟡 Avstår (gul)
   - Ikoner för färgblinda
   - Tydlig text

3. **Avge röst**
   - Deltagaren klickar på ett alternativ
   - Visuell bekräftelse: Knappen markeras, kort animation
   - Meddelande: "Din röst har registrerats"
   - Kvittokod visas (för senare verifiering)

#### 3.2.2 Ändra röst

- Deltagaren kan klicka på annat alternativ
- Tidigare röst ersätts automatiskt
- Ny bekräftelse och kvittokod visas
- Obegränsat antal ändringar fram till stängning

#### 3.2.3 Efter stängning

- Röstgränssnitt stängs automatiskt
- Resultat visas när det är klart
- Deltagaren kan verifiera sin egen röst
- Kvittokod sparas för senare verifiering

### 3.3 Begära ordet

#### 3.3.1 Begära ordet

1. **Knapp "Begär ordet"**
   - Alltid synlig i gränssnittet
   - Klicka för att begära ordet

2. **Bekräftelse**
   - Visuell feedback: "Du har begärt ordet"
   - Deltagaren läggs till i kö
   - Position i kö visas: "Du är nummer 3 i kön"

3. **På ordförandens skärm**
   - Lista över medlemmar som begärt ordet
   - Namn och ordning visas
   - Ordföranden kan ge ordet till nästa i kön

#### 3.3.2 Använda mobilen som mikrofon

**Alternativ 1: Mobil som mikrofon (för distansdeltagare)**

- Deltagaren aktiverar mikrofon i appen
- Ljud streamas till mötet
- Ordföranden kan stänga av mikrofon

**Alternativ 2: Fysisk mikrofon på plats**

- Deltagaren använder mikrofon i lokalen
- Systemet visar vem som har ordet på projektorn

**Alternativ 3: Mobil som mikrofon på plats (om eko kan hanteras)**

- Deltagaren aktiverar mikrofon i appen
- Ekokompensering aktiveras automatiskt
- Om eko uppstår: Varning visas, rekommendation att använda fysisk mikrofon

#### 3.3.3 Ångra begäran

- Knapp "Ångra begäran om ordet"
- Deltagaren tas bort från kön
- Bekräftelse: "Din begäran har tagits bort"

**Användningsfall:**

- Någon annan sa redan det deltagaren ville säga
- Deltagaren ändrade sig
- Deltagaren behöver inte längre säga något

### 3.4 Statusöversikt för deltagare

Deltagaren ser alltid:

- Aktuell dagordningspunkt
- Antal inloggade medlemmar
- Antal fysiskt närvarande
- Antal digitalt närvarande
- Röstningsstatus (öppen/stängd)
- Egen röststatus (har röstat/inte röstat)
- Position i kö (om begärt ordet)

## 4. Sekreterarens gränssnitt

### 4.1 Dynamiskt protokoll

#### 4.1.1 Automatisk generering

- Protokoll genereras automatiskt under mötet
- Dagordningspunkter läggs till automatiskt
- Röstresultat förs in automatiskt när röstning stängs

#### 4.1.2 Manuell komplettering

Sekreteraren kan lägga till:

- Yrkanden
- Diskussionspunkter
- Särskilda uttalanden
- Närvarolista
- Justeringspersoner

#### 4.1.3 Realtidsredigering

- Sekreteraren kan redigera protokollet under mötet
- Ändringar sparas automatiskt
- Versionshistorik sparas

### 4.2 Export och publicering

- Exportera som PDF med föreningens logotyp
- Exportera som Markdown för vidare redigering
- Publicera direkt på föreningens webbplats (om integration finns)

## 5. Transparens och Statusvisning

### 5.1 Medlemsstatistik (alltid synlig)

Systemet visar alltid (för alla roller):

- **Totalt antal medlemmar**: Antal röstberättigade medlemmar
- **Inloggade medlemmar**: Antal medlemmar som loggat in i systemet
- **Fysiskt närvarande**: Antal medlemmar i lokalen (registrerade manuellt eller via QR-kod)
- **Digitalt närvarande**: Antal medlemmar som aktivt följer mötet online
- **Eftersläntrare**: Uppdateras i realtid när nya medlemmar loggar in

**Visuell representation:**

```
👥 Medlemmar: 203 röstberättigade
🟢 Inloggade: 187 (92%)
🏢 Fysiskt: 145 (71%)
💻 Digitalt: 42 (21%)
```

### 5.2 Röstningsstatistik (under röstning)

Under pågående röstning visas:

- **Antal röster mottagna**: "147 av 203 har röstat"
- **Procentandel**: "72% har röstat"
- **EJ resultat**: Ingen information om hur folk röstat (krypterad valurna)

### 5.3 Mötesregler

#### 5.3.1 Visning av regler

- Länk till mötesregler alltid synlig
- Kan visas i modal/overlay
- Innehåller:
  - Stadgar relevanta för mötet
  - Röstningsregler
  - Tidsgränser
  - Procedurer vid tekniskt haveri

#### 5.3.2 Tidsgränser

- Tidsgränser för talartid kan konfigureras
- Timer visas för talare
- Varning när tid håller på att ta slut

## 6. Teknisk Implementation

### 6.1 Realtidsuppdatering

- **WebSocket-baserad kommunikation**: Alla uppdateringar i realtid
- **Fallback till polling**: Om WebSocket inte fungerar
- **Automatisk återanslutning**: Vid nätverksavbrott

### 6.2 Synkronisering

- **Ordförande som master**: Ordförandens vy är sanningskälla
- **Deltagare synkroniseras**: Automatisk uppdatering när ordföranden byter punkt
- **Konflikthantering**: Om deltagare är offline, synkroniseras vid återanslutning

### 6.3 Offline-funktionalitet

- **Läsa dokument offline**: Deltagare kan ladda ner dokument för offline-läsning
- **Rösta offline**: Röster köas och skickas när anslutning återställs
- **Synkronisering**: Automatisk synkronisering när anslutning återställs

### 6.4 Prestanda

- **Låg latens**: < 100ms från ordförandens klick till uppdatering på deltagarnas enheter
- **Skalbarhet**: Systemet ska klara 500 samtidiga deltagare
- **Bandbredd**: Minimal bandbreddsanvändning (< 10 KB/s per deltagare)
