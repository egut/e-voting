# MCP-servrar för Digital E-Voting System

Detta projekt använder flera MCP (Model Context Protocol) servrar för att automatisera kodkvalitet, säkerhet, prestanda och testning.

## Installerade servrar

### 1. Code Analyzer (Multi-språk)

**Kommando:** `uvx mcp-code-analyzer`

**Funktioner:**

- ESLint för JavaScript/TypeScript
- HTMLHint för HTML
- Stylelint för CSS
- Pyright för Python

**Användning:**

```
Analysera kod i src/components/Button.tsx
Hitta kodkvalitetsproblem i hela projektet
```

**Auto-godkända verktyg:** `analyze_code`, `get_diagnostics`

---

### 2. Vulnerability Scanner

**Kommando:** `uvx vulnerability-intelligence-mcp-server`

**Funktioner:**

- Kontrollera CVE-sårbarheter
- Beräkna CVSS-scores
- Kontrollera exploit-tillgänglighet
- Granska Python-paket för säkerhetsproblem

**Användning:**

```
Skanna projektet för säkerhetssårbarheter
Kontrollera om CVE-2024-1234 påverkar oss
Granska alla dependencies för kända CVE:er
```

**Auto-godkända verktyg:** `check_cve`, `scan_dependencies`

---

### 3. Code Checker Python

**Kommando:** `uvx mcp-server-code-checker-python`

**Funktioner:**

- Pylint för kodkvalitet
- Pytest för testning
- Mypy för typkontroll

**Användning:**

```
Kör pylint på backend/auth.py
Kör alla tester med pytest
Kontrollera typer med mypy i hela projektet
```

**Auto-godkända verktyg:** `run_pylint`, `run_pytest`, `run_mypy`

---

### 4. Playwright Testing

**Kommando:** `npx -y @playwright/mcp-server`

**Funktioner:**

- Generera end-to-end tester
- Kör browser-tester
- Cross-browser testing
- AI-driven testgenerering

**Användning:**

```
Generera test för inloggningsflödet
Kör alla Playwright-tester
Testa röstningsflödet i Chrome, Firefox och Safari
```

**Auto-godkända verktyg:** `generate_test`, `run_test`

---

### 5. Chrome DevTools

**Kommando:** `npx -y @modelcontextprotocol/server-chrome-devtools`

**Funktioner:**

- Performance profiling
- Memory leak detection
- Network analysis
- Lighthouse audits

**Användning:**

```
Analysera prestanda för röstningssidan
Hitta minnesläckor i applikationen
Kör Lighthouse audit på hela systemet
```

**Auto-godkända verktyg:** `get_performance_metrics`, `analyze_performance`

---

## Installation

Alla servrar installeras automatiskt när de används första gången. Du behöver ha följande installerat:

### För Python-servrar (uvx):

```bash
# Installera uv (Python package manager)
curl -LsSf https://astral.sh/uv/install.sh | sh
```

### För Node.js-servrar (npx):

```bash
# Installera Node.js (om inte redan installerat)
# På Ubuntu/Debian:
sudo apt install nodejs npm

# På macOS:
brew install node
```

## Användning i Kiro

Servrarna är nu tillgängliga i Kiro. Du kan använda dem genom att:

1. **Direkt i chatten:**

   ```
   Analysera kodkvaliteten i src/
   Skanna projektet för CVE-sårbarheter
   Kör alla tester
   ```

2. **Via MCP Server-panelen:**
   - Öppna MCP Server-vyn i Kiro
   - Se status på alla servrar
   - Aktivera/inaktivera servrar
   - Se loggar

3. **Automatiskt i arbetsflödet:**
   - Servrarna körs automatiskt när relevant
   - Auto-godkända verktyg körs utan att fråga
   - Andra verktyg kräver godkännande

## Konfiguration

Konfigurationen finns i `.kiro/settings/mcp.json`. Du kan:

- **Inaktivera en server:** Sätt `"disabled": true`
- **Ändra auto-godkännanden:** Lägg till/ta bort verktyg i `autoApprove`
- **Ändra loggnivå:** Ändra `FASTMCP_LOG_LEVEL` (ERROR, WARN, INFO, DEBUG)

## Felsökning

### Server startar inte

```bash
# Kontrollera att uv är installerat
uv --version

# Kontrollera att Node.js är installerat
node --version
npm --version
```

### Server är långsam

- Öka loggnivån till DEBUG för att se vad som händer
- Kontrollera nätverksanslutning (vissa servrar hämtar data online)

### Verktyg fungerar inte

- Kontrollera att projektet har rätt struktur
- Se till att dependencies är installerade
- Kolla loggar i MCP Server-panelen

## Rekommenderade arbetsflöden

### Före commit:

```
1. Analysera kodkvalitet i ändrade filer
2. Skanna för säkerhetssårbarheter
3. Kör relevanta tester
```

### Före release:

```
1. Kör fullständig kodanalys
2. Skanna alla dependencies för CVE:er
3. Kör alla tester (unit, integration, e2e)
4. Kör performance audit
```

### Vid buggfixing:

```
1. Använd Chrome DevTools för att identifiera problem
2. Analysera kodkvalitet i berörda filer
3. Kör tester för att verifiera fix
```

## Ytterligare resurser

- [MCP Documentation](https://modelcontextprotocol.io/)
- [Kiro MCP Guide](https://docs.kiro.ai/mcp)
- [Playwright Documentation](https://playwright.dev/)
- [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/)

## Support

Om du har problem med MCP-servrarna:

1. Kontrollera loggarna i MCP Server-panelen
2. Se denna dokumentation
3. Kontakta projektet maintainers
