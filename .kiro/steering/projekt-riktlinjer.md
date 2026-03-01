---
inclusion: auto
---

# Digital E-Voting System - Projektriktlinjer

## KRITISKT: Följ Kraven Strikt

Detta är ett digitalt röstningssystem för svenska föreningar. **Alla krav i `doc/krav/` är OBLIGATORISKA och MÅSTE följas noggrant.** Systemet hanterar demokratiska processer och rättsäkerhet är avgörande.

### Viktigaste Kravdokument

- `doc/krav/FUNKTIONELLA-KRAV.md` - Kärnfunktionalitet
- `doc/krav/SAKERHET-OCH-KRYPTERING.md` - Säkerhetskrav (KRITISKT)
- `doc/krav/PRESTANDA-OCH-TEKNISKA-KRAV.md` - Prestandakrav (<150ms API-responstid)
- `doc/krav/AUTENTISERING-OCH-MEDLEMSREGISTER.md` - Autentisering och medlemskap
- `doc/krav/ROSTNING-OCH-VALMETODER.md` - Röstningslogik och valmetoder

**Läs alltid relevanta kravdokument innan du börjar arbeta på en funktion.**

## Tillgängliga MCP-Verktyg

Projektet har konfigurerat följande MCP-servrar för att säkerställa kvalitet och säkerhet:

### 1. Code Index (`code-index`)

- **Användning**: Kodindexering och analys av stor kodbas
- **Verktyg**: `set_project_path`, `search_code_advanced`, `find_files`, `get_file_summary`, `get_symbol_body`
- **När**: Vid navigering i okänd kod eller sökning efter funktioner

### 2. ESLint (`eslint`)

- **Användning**: Kodkvalitet och linting för JavaScript/TypeScript
- **Verktyg**: `lint_files`, `fix_file`, `get_rule_docs`
- **När**: Efter varje kodändring, innan commit

### 3. Security Audit (`security-audit`)

- **Användning**: Sårbarhetsskanning för npm-beroenden
- **Verktyg**: `audit_nodejs_dependencies`
- **När**: Vid tillägg av nya beroenden, regelbundet under utveckling
- **KRITISKT**: Minimera externa beroenden enligt säkerhetskraven

### 4. Playwright Testing (`playwright-testing`)

- **Användning**: E2E-testning för att uppnå >95% kodtäckning
- **Verktyg**: `browser_navigate`, `browser_snapshot`, `browser_click`, `browser_fill`, `browser_take_screenshot`
- **När**: Vid implementering av användarflöden, särskilt röstningsprocessen

### 5. Chrome DevTools (`chrome-devtools`)

- **Användning**: Prestandatestning och mätning av API-responstider
- **Verktyg**: `navigate_page`, `performance_start_trace`, `performance_stop_trace`, `take_screenshot`
- **När**: Vid optimering, för att verifiera <150ms responstidskrav

## GitHub Integration

Projektet använder GitHub för versionshantering:

- **GitHub CLI (`gh`)**: Använd för att skapa issues, PRs, och hantera projekt
- **Git**: Standard git-kommandon för commits, branches, etc.
- **Exempel**:
  ```bash
  gh issue create --title "Implementera röstningslogik" --body "..."
  gh pr create --title "Feature: Lägg till kryptering" --body "..."
  ```

## Obligatoriska Arbetsflöde

### 1. Planering

- Läs relevanta kravdokument i `doc/krav/`
- Identifiera säkerhetskrav och prestandakrav
- Skapa GitHub issue för spårbarhet

### 2. Implementering

- **Minimera beroenden**: Kör `security-audit` innan du lägger till npm-paket
- **Använd standardbibliotek**: Föredra Node.js crypto över externa bibliotek
- **Kodkvalitet**: Kör `eslint` kontinuerligt
- **Dokumentera**: Skriv JSDoc-kommentarer för alla publika funktioner

### 3. Testning (OBLIGATORISKT)

- **Enhetstester**: >95% kodtäckning för kritisk kod
- **E2E-tester**: Använd `playwright-testing` för alla användarflöden
- **Prestandatester**: Använd `chrome-devtools` för att mäta responstider
- **Säkerhetstester**: Verifiera kryptering, autentisering, och auktorisering

### 4. Dokumentation (OBLIGATORISKT)

- **Kod**: JSDoc-kommentarer med exempel
- **API**: OpenAPI/Swagger-specifikation
- **Användarguide**: Uppdatera dokumentation för nya funktioner
- **Testrapporter**: Dokumentera testresultat och täckning
- **Säkerhet**: Dokumentera säkerhetsöverväganden och beslut

### 5. Granskning

- Skapa PR med detaljerad beskrivning
- Inkludera testresultat och prestandamätningar
- Referera till kravdokument som uppfylls
- Vänta på godkännande innan merge

## Rättsäkerhet och Spårbarhet

För att säkerställa rättsäkerhet i röstningsprocessen:

1. **Logga alla kritiska händelser**: Röstningar, autentiseringar, administratörsåtgärder
2. **Versionshantera allt**: Kod, konfiguration, dokumentation
3. **Testa grundligt**: Automatiserade tester för alla kritiska flöden
4. **Dokumentera beslut**: Arkitektur- och säkerhetsbeslut i `doc/`
5. **Spårbarhet**: Koppla commits till issues och krav

## Säkerhetsriktlinjer

- **Kryptering**: Använd endast beprövade algoritmer (AES-256, RSA-2048+)
- **Hemligheter**: Aldrig i kod - använd miljövariabler eller secrets management
- **Validering**: Validera ALL användarinput
- **Autentisering**: Flerfaktorsautentisering för administratörer
- **Auktorisering**: Kontrollera behörigheter vid varje operation
- **Audit logs**: Logga alla säkerhetskritiska händelser

## Prestandakrav

- **API-responstid**: <150ms för röstningsoperationer (med kryptering)
- **Databas**: ACID-kompatibel (PostgreSQL rekommenderas)
- **Skalbarhet**: Hantera minst 1000 samtidiga användare
- **Mät kontinuerligt**: Använd `chrome-devtools` för prestandamätning

## Exempel: Lägga till Ny Funktion

```bash
# 1. Läs krav
cat doc/krav/FUNKTIONELLA-KRAV.md

# 2. Skapa issue
gh issue create --title "Implementera anonymiserad röstning"

# 3. Skapa branch
git checkout -b feature/anonymous-voting

# 4. Implementera med testning
# - Skriv tester först (TDD)
# - Implementera funktionalitet
# - Kör eslint kontinuerligt
# - Verifiera säkerhet med security-audit

# 5. E2E-tester med Playwright
# - Testa hela röstningsflödet
# - Verifiera anonymitet

# 6. Prestandatest
# - Mät responstider med chrome-devtools
# - Verifiera <150ms krav

# 7. Dokumentera
# - Uppdatera API-dokumentation
# - Skriv användarguide
# - Dokumentera säkerhetsbeslut

# 8. Skapa PR
gh pr create --title "Feature: Anonymiserad röstning" \
  --body "Uppfyller krav: ROSTNING-OCH-VALMETODER.md sektion 3.2"

# 9. Merge efter godkännande
gh pr merge
```

## Sammanfattning

- ✅ Följ ALLA krav i `doc/krav/` strikt
- ✅ Använd MCP-verktyg för kvalitet och säkerhet
- ✅ Testa grundligt (>95% täckning)
- ✅ Dokumentera allt för rättsäkerhet
- ✅ Mät prestanda kontinuerligt
- ✅ Minimera externa beroenden
- ✅ Använd GitHub för spårbarhet
