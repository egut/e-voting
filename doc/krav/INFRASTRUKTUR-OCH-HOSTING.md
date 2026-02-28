# Infrastruktur och Hosting

## 1. Portabilitet

Systemet ska vara extremt portabelt med inbyggd säkerhet (Security by Default):

- **Docker & Docker Compose**: Hela plattformen (Frontend, Backend, Databas, WAF) förpackas i containrar
- **Enkel start**: `docker-compose up -d` startar systemet på en vanlig laptop
- **Laptop-läge**: Databas med volymmontering eller SQLite för små installationer
- **Failover**: Vid krasch kan databasfil kopieras till annan laptop och systemet fortsätter utan dataförlust
- **Kubernetes**: Stateless design (utom databas) med färdiga Helm-charts för skalning

## 2. Nätverksskydd och WAF (Web Application Firewall)

Systemet dimensioneras för relativt låg trafik (max 1000 requests/sekund):

- **Lokal WAF**: Lättviktig reverse proxy (Caddy, Traefik eller Nginx med ModSecurity/Coraza) inkluderas i Docker-stacken
- **Rate Limiting**: Stoppar brute-force-attacker
- **Filtrering**: Blockerar SQL-injections och XSS-försök
- **Cloudflare-integration**: Systemet kan pekas om till Cloudflare för DDoS-skydd
- **Authenticated Origin Pulls**: Lokal proxy accepterar endast trafik från Cloudflares IP-spann

## 3. Hosting-alternativ

### 3.1 Laptop-hosting (Gratis)

**Användning**: Små möten, testmiljö

**Fördelar**:

- Ingen kostnad
- Full kontroll
- Ingen internetberoende (kan köras lokalt)

**Nackdelar**:

- Begränsad skalbarhet
- Ingen redundans
- Kräver teknisk kompetens

**Krav**:

- Laptop med minst 8GB RAM
- Docker installerat
- Stabil nätverksanslutning (om distansdeltagare)

### 3.2 VPS (Virtual Private Server)

**Användning**: Små till medelstora föreningar

**Leverantörer**:

- Hetzner: 100-300 kr/månad
- DigitalOcean: 150-400 kr/månad
- GleSYS (svensk): 200-500 kr/månad

**Fördelar**:

- Låg kostnad
- God prestanda
- Enkel uppsättning

**Nackdelar**:

- Begränsad skalbarhet
- Manuell backup

**Rekommenderad specifikation**:

- 2-4 vCPU
- 4-8 GB RAM
- 50-100 GB SSD
- 100 Mbit/s nätverk

### 3.3 Molntjänst (AWS, Azure, GCP)

**Användning**: Stora föreningar, hög tillgänglighet

**Fördelar**:

- Automatisk skalning
- Hög tillgänglighet
- Managed services

**Nackdelar**:

- Högre kostnad
- Mer komplex uppsättning

**Uppskattad kostnad**: 200-500 kr/månad (beroende på användning)

### 3.4 Kubernetes-kluster

**Användning**: Mycket stora föreningar, flera samtidiga möten

**Fördelar**:

- Automatisk skalning
- Självläkande
- Multi-tenant support

**Nackdelar**:

- Komplex uppsättning
- Kräver Kubernetes-kunskap

**Leverantörer**:

- Google Kubernetes Engine (GKE)
- Azure Kubernetes Service (AKS)
- Amazon Elastic Kubernetes Service (EKS)
- Managed Kubernetes från Hetzner, DigitalOcean

## 4. Databas

### 4.1 Alternativ 1: SQLite (Små installationer)

**Användning**: Laptop-hosting, < 100 medlemmar

**Fördelar**:

- Ingen separat server
- Enkel backup (en fil)
- Noll konfiguration

**Nackdelar**:

- Begränsad samtidighet
- Ingen replikering

### 4.2 Alternativ 2: PostgreSQL (Rekommenderat)

**Användning**: VPS, molntjänst, > 100 medlemmar

**Fördelar**:

- Robust och beprövad
- God prestanda
- Stöd för replikering

**Nackdelar**:

- Kräver separat server/container

**Konfiguration**:

- Master-slave replikering för läsoperationer
- Automatisk backup varje natt
- Point-in-time recovery

### 4.3 Alternativ 3: MySQL/MariaDB

**Användning**: Om föreningen redan har MySQL

**Fördelar**:

- Välkänd och beprövad
- God prestanda

**Nackdelar**:

- Mindre avancerade funktioner än PostgreSQL

## 5. Backup och Disaster Recovery

### 5.1 Backup-strategi

**Automatiska backups**:

- Databas: Varje natt kl 03:00
- Konfigurationsfiler: Vid varje ändring
- Loggar: Varje vecka

**Retention policy**:

- Dagliga backups: 7 dagar
- Veckovisa backups: 4 veckor
- Månatliga backups: 12 månader

**Lagringsplatser**:

- Lokal disk (primär)
- Extern disk/NAS (sekundär)
- Molnlagring (tertiär, krypterad)

### 5.2 Disaster Recovery

**Recovery Time Objective (RTO)**: Max 1 timme
**Recovery Point Objective (RPO)**: Max 24 timmar (senaste backup)

**Procedur vid krasch**:

1. Identifiera problem
2. Beslut: Reparera eller återställa från backup
3. Om återställning: Starta ny instans
4. Återställ databas från senaste backup
5. Verifiera funktionalitet
6. Återuppta möte

**Testning**:

- Disaster recovery-test minst 1 gång per år
- Dokumentera resultat och förbättringsområden

## 6. Övervakning och Alerting

### 6.1 Övervakning

**Systemhälsa**:

- CPU-användning
- Minnesanvändning
- Diskutrymme
- Nätverkstrafik

**Applikationshälsa**:

- API-responstider
- Felfrekvens
- Antal samtidiga användare
- Databasanslutningar

**Verktyg**:

- Prometheus + Grafana (open source)
- Uptime Robot (gratis för basic monitoring)
- Cloudflare Analytics (om Cloudflare används)

### 6.2 Alerting

**Kritiska alerts** (omedelbar åtgärd):

- Systemet är nere
- Databas är nere
- Diskutrymme < 10%
- API-responstid > 5 sekunder

**Varningar** (åtgärd inom 1 timme):

- CPU > 80% i 5 minuter
- Minne > 90%
- Felfrekvens > 5%

**Notifikationskanaler**:

- E-post till IT-ansvarig
- SMS vid kritiska alerts (valfritt)
- Slack/Discord-integration (valfritt)

## 7. Säkerhet

### 7.1 Nätverkssäkerhet

**Firewall**:

- Endast port 80 (HTTP) och 443 (HTTPS) öppna
- SSH (port 22) endast från specifika IP-adresser
- Databas-port (5432/3306) endast från localhost

**SSL/TLS**:

- Obligatoriskt HTTPS
- Let's Encrypt för gratis certifikat
- Automatisk förnyelse via Certbot eller Caddy

**DDoS-skydd**:

- Cloudflare (gratis plan räcker för de flesta)
- Rate limiting i WAF
- IP-blocklista för kända attackerare

### 7.2 Applikationssäkerhet

**Säkerhetsuppdateringar**:

- Automatiska säkerhetsuppdateringar för OS
- Manuell uppdatering av Docker-images (testade)
- Prenumeration på säkerhetsbulletiner

**Penetrationstestning**:

- Minst 1 gång innan första skarpa användning
- Därefter årligen eller vid större ändringar

**Säkerhetsgranskning**:

- Kodgranskning av extern part
- OWASP Top 10-kontroll
- Dependency scanning (npm audit, etc.)

## 8. Skalning

### 8.1 Vertikal skalning (Scale up)

**När**: Prestanda börjar bli ett problem

**Åtgärd**: Uppgradera server

- Mer CPU
- Mer RAM
- Snabbare disk (SSD → NVMe)

**Kostnad**: 100-500 kr/månad extra

### 8.2 Horisontell skalning (Scale out)

**När**: Vertikal skalning inte räcker

**Åtgärd**: Lägg till fler servrar

- Load balancer framför flera backend-servrar
- Read replicas för databas
- CDN för statiska filer

**Kostnad**: 500-2000 kr/månad extra

**Krav**: Stateless backend-design (redan implementerat)

## 9. Kostnadsuppskattning

### 9.1 Liten förening (< 100 medlemmar)

**Hosting**: Laptop (gratis) eller billig VPS (100 kr/månad)
**Databas**: SQLite (gratis) eller PostgreSQL på samma server
**Backup**: Lokal disk + extern disk (engångskostnad 500 kr)
**Övervakning**: Gratis verktyg
**SSL**: Let's Encrypt (gratis)
**DDoS-skydd**: Cloudflare Free (gratis)

**Total månadskostnad**: 0-100 kr

### 9.2 Medelstor förening (100-500 medlemmar)

**Hosting**: VPS (200 kr/månad)
**Databas**: PostgreSQL på samma server
**Backup**: Lokal + molnlagring (50 kr/månad)
**Övervakning**: Gratis verktyg
**SSL**: Let's Encrypt (gratis)
**DDoS-skydd**: Cloudflare Free (gratis)

**Total månadskostnad**: 250 kr

### 9.3 Stor förening (> 500 medlemmar)

**Hosting**: Molntjänst eller större VPS (400 kr/månad)
**Databas**: Managed PostgreSQL (200 kr/månad)
**Backup**: Automatisk backup i molnet (100 kr/månad)
**Övervakning**: Betald tjänst (100 kr/månad)
**SSL**: Let's Encrypt (gratis)
**DDoS-skydd**: Cloudflare Pro (250 kr/månad)

**Total månadskostnad**: 1050 kr
