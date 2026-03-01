# Kostnadsuppskattning

## 1. Mjukvarukostnad

- **Open Source**: 0 kr (systemet är gratis att använda)
- **Licens**: AGPLv3 eller MIT (väljs vid release)

## 2. Medlemsregister

### 2.1 Statisk filuppladdning (CSV/Excel)

- **Kostnad**: 0 kr
- **Användning**: Manuell uppladdning av medlemslista
- **Lämplig för**: Små föreningar, engångsmöten

### 2.2 API-integration

- **Föreningshuset API**: 0 - 300 kr/månad (beroende på avtalsnivå)
- **Generiskt REST API**: Varierar beroende på leverantör
- **Användning**: Automatisk synkronisering
- **Lämplig för**: Medelstora till stora föreningar

### 2.3 Directory Services (AD/SSO)

- **Microsoft Entra ID**: Ingår ofta i befintlig Microsoft 365-licens (0 kr extra)
- **Google Workspace**: Ingår ofta i befintlig licens (0 kr extra)
- **Generisk LDAP**: 0 kr (använder befintlig infrastruktur)
- **Användning**: Integration med befintlig identitetshantering
- **Lämplig för**: Organisationer med befintlig IT-infrastruktur

## 3. Autentisering

### 3.1 Freja eID+ (Primär metod)

- **Kostnad**: 0 kr (gratis för föreningen)
- **Användning**: Automatisk verifiering mot personnummer i medlemsregister
- **Säkerhetsnivå**: Hög (motsvarande BankID)

### 3.2 SSO (Active Directory/Entra ID/Google)

- **Kostnad**: 0 kr (använder befintlig infrastruktur)
- **Användning**: Integration med organisationens identitetshantering
- **MFA**: Hanteras av SSO-provider

### 3.3 Användarnamn/Lösenord + MFA

- **TOTP (Google Authenticator, Authy)**: 0 kr
- **SMS-MFA**: 0.50 - 1.00 kr per SMS (valfritt)
- **Användning**: Fallback för medlemmar utan e-legitimation

### 3.4 Magic Link

- **Kostnad**: 0 kr (ingår i e-postkostnad)
- **Användning**: Passwordless-inloggning via e-post

### 3.5 QR-kod

- **Kostnad**: 0 kr
- **Användning**: On-site autentisering med manuell verifiering

### 3.6 Manuella godkännanden

- **Kostnad**: 0 kr (manuellt arbete av valkommittén)
- **Process**: Valkommittén verifierar medlemskap och godkänner för röstning

## 4. E-posttjänst

### 4.1 Transaktionell e-post (Magic Links, notifikationer)

- **SendGrid**: 0 kr för 100 e-post/dag, sedan från 15 USD/månad (~150 kr)
- **Mailgun**: 0 kr för 5000 e-post/månad, sedan från 35 USD/månad (~350 kr)
- **Amazon SES**: ~0.10 USD per 1000 e-post (~1 kr per 1000)
- **Egen SMTP**: 0 kr (om föreningen har egen e-postserver)

**Uppskattning för årsmöte:**

- 500 medlemmar × 5 e-post (kallelser, påminnelser, kvitton) = 2500 e-post
- Kostnad: 0 kr (inom gratisnivå för de flesta tjänster)

## 5. Infrastruktur

### 5.1 Hosting

- **Laptop-hosting**: 0 kr (drivs lokalt på årsmötet)
- **VPS (Hetzner, DigitalOcean, GleSYS)**: 100 - 300 kr/månad
- **Molntjänst (AWS, Azure, GCP)**: 200 - 500 kr/månad (beroende på användning)

### 5.2 WAF och DDoS-skydd

- **Cloudflare Free**: 0 kr (räcker för de flesta föreningar)
- **Cloudflare Pro**: ~250 kr/månad (avancerad WAF)

### 5.3 Domän och SSL

- **Domännamn**: ~150 kr/år
- **SSL-certifikat**: 0 kr (Let's Encrypt via Docker eller Cloudflare)

## 6. Sammanfattning kostnader per föreningstyp

### 6.1 Liten förening (< 100 medlemmar)

**Konfiguration:**

- Medlemsregister: CSV-uppladdning
- Autentisering: Magic Link + QR-kod
- Hosting: Laptop (lokalt)
- E-post: Gratisnivå

**Löpande kostnad**: 0 kr/månad
**Årskostnad**: 0 kr

### 6.2 Medelstor förening (100-500 medlemmar)

**Konfiguration:**

- Medlemsregister: Föreningshuset API eller CSV
- Autentisering: Freja eID+ + Magic Link
- Hosting: Billig VPS
- E-post: Gratisnivå

**Löpande kostnad**: 100 - 300 kr/månad
**Årskostnad**: 1 200 - 3 600 kr

**Besparing jämfört med poströstning:**

- Poströstning: ~10 000 - 20 000 kr/år (porto, kuvert, utskrift)
- Digital röstning: 1 200 - 3 600 kr/år
- **Nettobesparing: 6 400 - 18 800 kr/år**

### 6.3 Stor förening (> 500 medlemmar)

**Konfiguration:**

- Medlemsregister: API-integration
- Autentisering: Freja eID+ + SSO + Magic Link
- Hosting: VPS eller molntjänst
- E-post: Betald nivå (om > 5000 e-post/månad)
- WAF: Cloudflare Pro

**Löpande kostnad**: 300 - 900 kr/månad
**Årskostnad**: 3 600 - 10 800 kr

**Besparing jämfört med poströstning:**

- Poströstning: ~30 000 - 50 000 kr/år (för stor förening)
- Digital röstning: 3 600 - 10 800 kr/år
- **Nettobesparing: 19 200 - 46 400 kr/år**

### 6.4 Organisation med befintlig IT

**Konfiguration:**

- Medlemsregister: Entra ID/Google/LDAP
- Autentisering: SSO + Magic Link
- Hosting: Befintlig infrastruktur eller VPS
- E-post: Befintlig e-posttjänst

**Löpande kostnad**: 0 - 300 kr/månad (endast hosting om extern VPS)
**Årskostnad**: 0 - 3 600 kr

**Fördel:** Använder befintlig infrastruktur, minimal extra kostnad

## 7. Engångskostnader (valfritt)

### 7.1 Utveckling och anpassning

- **Open Source**: 0 kr (använd som den är)
- **Anpassning**: Varierar beroende på behov
- **Konsulthjälp för uppsättning**: 5 000 - 20 000 kr (engångskostnad)

### 7.2 Säkerhetsgranskning

- **Penetrationstestning**: 10 000 - 50 000 kr (rekommenderas före första användning)
- **Kodgranskning**: 5 000 - 20 000 kr
- **Certifiering**: Varierar beroende på krav

## 8. Total kostnad för första året (exempel)

### 8.1 Medelstor förening (500 medlemmar)

- Hosting (VPS): 2 400 kr/år
- Medlemsregister API: 1 200 kr/år
- Domän: 150 kr/år
- E-post: 0 kr (gratisnivå)
- Säkerhetsgranskning (engångskostnad): 15 000 kr
- **Total första året: ~19 000 kr**
- **Därefter: ~3 750 kr/år**

**Jämfört med poströstning:**

- Poströstning: ~15 000 kr/år (löpande)
- Digital röstning: ~19 000 kr första året, sedan ~3 750 kr/år
- **Break-even: Efter första året**
- **Besparing år 2-5: ~56 000 kr**

## 9. ROI-kalkyl (Return on Investment)

### 9.1 Exempel: Förening med 500 medlemmar

**Nuvarande kostnad (poströstning):**

- Porto (500 brev × 2 utskick): 10 000 kr
- Kuvert och utskrift: 3 000 kr
- Manuell hantering (10 timmar × 200 kr/h): 2 000 kr
- **Total årskostnad: 15 000 kr**

**Digital röstning:**

- År 1: 19 000 kr (inkl. säkerhetsgranskning)
- År 2-5: 3 750 kr/år

**Besparing:**

- År 1: -4 000 kr (investering)
- År 2: +11 250 kr
- År 3: +11 250 kr
- År 4: +11 250 kr
- År 5: +11 250 kr
- **Total besparing över 5 år: 41 000 kr**

**ROI**: 216% över 5 år

### 9.2 Ytterligare fördelar (ej kvantifierade)

- **Högre valdeltagande**: Fler medlemmar röstar (uppskattat +30-50%)
- **Snabbare process**: Resultat direkt istället för veckor av manuell räkning
- **Mindre fel**: Automatisk rösträkning eliminerar mänskliga fel
- **Bättre dokumentation**: Automatiskt protokoll och revisionsspår
- **Miljövinst**: Ingen pappersanvändning
- **Tillgänglighet**: Distansdeltagande möjliggör för medlemmar som inte kan närvara fysiskt

## 10. Finansieringsalternativ

### 10.1 Föreningens budget

- Engångsinvestering från föreningens kassa
- Löpande kostnad i årlig budget

### 10.2 Projektbidrag

- Ansök om bidrag från internationella organisationer (om tillämpligt)
- Ansök om innovationsbidrag från svenska myndigheter
- Crowdfunding från medlemmar

### 10.3 Delad kostnad

- Flera föreningar delar på utvecklingskostnad
- Regionalt samarbete (t.ex. nordiskt samarbete)
- Internationellt samarbete via paraplyorganisationer

### 10.4 Sponsring

- Teknologiföretag som vill stödja open source
- Företag som vill visa upp sin CSR (Corporate Social Responsibility)
- Akademiska institutioner som forskningsprojekt
