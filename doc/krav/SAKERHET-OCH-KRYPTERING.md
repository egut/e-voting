# Säkerhet och Kryptering

## 1. Kryptografisk separation (Kärnkrav)

- **Databasdesign**: VEM som röstat och VAD de röstat på lagras i separata tabeller
- **Blind Signatures**: Ingen koppling mellan identitet och röstinnehåll
- **Permanent radering**: Efter mötet raderas all koppling mellan person och röst

## 2. Krypterad valurna

- **Realtidskryptering**: Resultat krypteras löpande under röstningen
- **Asymmetrisk nyckel**: Mötesordföranden dekrypterar urnan först vid klubbslag
- **Förhindrar manipulation**: Inga trender kan utläsas i förtid, även av administratörer

## 3. End-to-End Verifiability (E2E-V)

- **Personlig kvittokod**: Varje medlem får en unik kod vid röstning
- **Verifierbarhet**: Medlem kan kontrollera att den egna rösten räknats korrekt
- **Anonymitet bevaras**: Verifiering avslöjar inte vad medlemmen röstade på för andra

## 4. Skydd mot påtryckningar (Coercion Protection)

- **Obegränsade ändringar**: Medlem kan ändra förtidsröst obegränsat antal gånger
- **Sista rösten räknas**: Endast den senast lagda rösten registreras
- **Internationell standard**: Samma metod som används i Estlands nationella e-val

## 5. Säkerhetsanalys och Hotmodellering

### 5.1 Scenario 1: Inifrån-attack (Rogue Admin)

#### 5.1.1 Hotbeskrivning

Personer med administrativ makt (styrelse, IT-ansvariga) försöker manipulera valet för egen vinning, t.ex. för att få igenom ansvarsfrihet eller dölja ekonomiska oegentligheter.

#### 5.1.2 Risker

- **Databasmanipulation**: Ändring av lagda röster i databasen
- **Tjuvkikning**: Administratörer ser röstningstrender i förväg och anpassar debatt eller ställer in mötet

#### 5.1.3 Skyddsmekanismer

- **Zero-Knowledge kryptering**: Valurnan krypteras med nyckel som aktiveras först vid klubbslag
- **Transparens och revisionsspår**: Alla administrativa ändringar loggas oföränderligt
- **Extern revision**: Revisor kan i efterhand se exakt vem som gjort vad och när

### 5.2 Scenario 2: Koordinerad minoritet (Digital Flash Mob)

#### 5.2.1 Hotbeskrivning

En liten grupp medlemmar försöker kuppa in en specifik kandidat genom koordinerad röstning.

#### 5.2.2 Risker

- **Röstfiske**: Medlemmar övertalas att lämna ifrån sig inloggningsuppgifter
- **Sista-minuten-attack**: Gruppen massröstar i slutet innan övriga hinner reagera

#### 5.2.3 Skyddsmekanismer

- **Stark autentisering**: Freja eID+ med personnummerverifiering gör det omöjligt att dela inloggning
- **Manuellt godkännande**: Utländska medlemmar verifieras av valkommittén
- **Utspädningseffekt**: Digitalt system höjer valdeltagandet drastiskt, vilket gör kupper svårare

### 5.3 Scenario 3: Tredjepartsrisk (Komprometterad leverantör)

#### 5.3.1 Hotbeskrivning

Om systemet driftas av extern leverantör: dataintrång eller oärlig anställd manipulerar utfallet.

#### 5.3.2 Risker

- **Läckage**: Leverantören läcker information om vem som röstat på vad
- **Manipulation**: Utländska aktörer eller hackare ändrar valresultat via leverantören

#### 5.3.3 Skyddsmekanismer

- **Open Source**: Koden kan granskas av oberoende säkerhetsexperter
- **Självhosting**: Föreningen kan drifta systemet själv (laptop eller egen VPS)
- **E2E-V**: Matematisk verifierbarhet gör manipulation upptäckbar
- **Dataseparation**: Blind Signatures förhindrar koppling mellan identitet och röst

### 5.4 Scenario 4: Tekniskt haveri eller DDoS-attack

#### 5.4.1 Hotbeskrivning

Systemet går ner på grund av hög belastning eller illvillig överbelastningsattack.

#### 5.4.2 Risker

- **Medlemmar kan inte rösta**: Omröstning måste avbrytas
- **Beslut ogiltigförklaras**: Årsmötet kan inte genomföras

#### 5.4.3 Skyddsmekanismer

- **Robust infrastruktur**: Skalbar hosting med DDoS-skydd (Cloudflare)
- **Fallback i stadgar**: Mötesordförande har mandat att pausa mötet vid tekniskt haveri
- **Förlängd röstningstid**: Möjlighet att förlänga röstning om systemet varit nere
- **Reservrutin**: I sista hand kan fysiskt närvarande rösta manuellt

### 5.5 Scenario 5: Otillbörlig påverkan (Coercion)

#### 5.5.1 Hotbeskrivning

En medlem blir utsatt för påtryckningar av partner, släkting eller vän som tvingar personen att rösta på ett specifikt sätt.

#### 5.5.2 Risker

- **Brott mot valhemlighet**: Den fria viljan kränks

#### 5.5.3 Skyddsmekanismer

- **Obegränsade ändringar**: Medlem kan rösta som "påtryckaren" kräver, sedan logga in senare och ändra
- **Sista rösten räknas**: Endast den senast lagda rösten registreras
- **Internationell standard**: Samma metod som Estlands nationella e-val

## 6. Rättssäkerhet och revision

### 6.1 Spårbarhet

- Alla autentiseringar loggas (metod, tidpunkt, IP-adress)
- Manuella godkännanden loggas med ansvarig person
- Röstlängd visar tydligt vilka som verifierats automatiskt vs manuellt

### 6.2 Röstlängd-export

- Innehåller: Namn, Medlemsnummer, Autentiseringsmetod, Verifieringstyp (Automatisk/Manuell), Tidsstämpel, Ansvarig (om manuell)
- Kan exporteras som PDF för protokoll
- Anonymiseras efter mötet (enligt GDPR och stadgar)

### 6.3 Revisionsspår

- Separata loggar för autentisering och röstning (ingen koppling)
- Revisor kan se att rätt personer fått åtkomst utan att se vad de röstat
- Matematisk verifierbarhet (E2E-V) för att upptäcka manipulation

## 7. GDPR-compliance

### 7.1 Personuppgiftshantering

- **Minimal datainsamling**: Endast nödvändiga uppgifter samlas in
- **Tydligt syfte**: Varje datapunkt har ett dokumenterat syfte
- **Lagringstid**: Data raderas efter mötet (enligt retention policy)
- **Användarrättigheter**: Medlemmar kan begära ut sina uppgifter

### 7.2 Dataskyddskonsekvensanalys (DPIA)

- **Obligatoriskt**: DPIA måste genomföras innan systemet tas i drift
- **Dokumentation**: Alla risker och åtgärder dokumenteras
- **Uppdatering**: DPIA uppdateras vid större ändringar

### 7.3 Personuppgiftsansvarig

- **Föreningen**: Föreningen är personuppgiftsansvarig
- **Kontaktperson**: Tydlig kontaktperson för dataskyddsfrågor
- **Dokumentation**: Behandlingsregister enligt GDPR
