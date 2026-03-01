# MCP-arbetsflöde för Digital E-Voting System

## Snabbguide: Använd MCP-servrar i ditt arbetsflöde

### 1. Kodkvalitet (Daglig användning)

**Innan du börjar koda:**

```
Analysera kodkvaliteten i filen jag ska jobba med
```

**Under kodning:**

```
Kontrollera kodkvalitet i [filnamn]
Föreslå förbättringar för denna funktion
```

**Innan commit:**

```
Analysera alla ändrade filer för kodkvalitetsproblem
Kör linting på alla modifierade filer
```

---

### 2. Säkerhet (Veckovis + Före release)

**Veckovis kontroll:**

```
Skanna projektet för nya CVE-sårbarheter
Kontrollera om våra dependencies har säkerhetsproblem
```

**Före release:**

```
Gör en fullständig säkerhetsgranskning av projektet
Skanna alla dependencies och generera säkerhetsrapport
Kontrollera om det finns kända exploits för våra sårbarheter
```

**Vid ny dependency:**

```
Kontrollera säkerheten för [paketnamn]
Finns det några kända CVE:er för [paketnamn] version [version]?
```

---

### 3. Prestanda (Vid behov + Före release)

**Under utveckling:**

```
Analysera prestanda för [komponent/sida]
Hitta flaskhalsar i [funktion/modul]
```

**Före release:**

```
Kör fullständig performance audit på hela systemet
Analysera minnesanvändning och hitta läckor
Generera performance-rapport för dokumentation
```

**Vid prestandaproblem:**

```
Profilera [specifik funktion] och hitta flaskhalsar
Analysera varför [sida] laddar långsamt
```

---

### 4. Testning (Kontinuerligt)

**Vid ny funktion:**

```
Generera tester för [ny funktion]
Skapa end-to-end test för [användarflöde]
```

**Daglig testning:**

```
Kör alla unit-tester
Kör tester för [modul/komponent]
```

**Före commit:**

```
Kör tester för ändrade filer
Verifiera att alla tester passerar
```

**Före release:**

```
Kör alla tester (unit, integration, e2e)
Kör cross-browser tester
Generera testrapport
```

---

## Exempel på konkreta kommandon

### Scenario 1: Ny funktion för röstning

```
1. "Analysera kodkvaliteten i src/voting/vote-handler.ts"
2. "Generera unit-tester för VoteHandler-klassen"
3. "Kontrollera säkerheten i röstningslogiken"
4. "Analysera prestanda för röstningsprocessen"
5. "Kör alla tester för voting-modulen"
```

### Scenario 2: Buggfix i autentisering

```
1. "Analysera auth.py för kodkvalitetsproblem"
2. "Kör pylint och mypy på auth.py"
3. "Skanna auth-modulen för säkerhetssårbarheter"
4. "Kör alla auth-relaterade tester"
5. "Verifiera att buggen är fixad med e2e-test"
```

### Scenario 3: Performance-problem

```
1. "Analysera prestanda för inloggningssidan"
2. "Hitta flaskhalsar i autentiseringsflödet"
3. "Profilera API-anrop och identifiera långsamma queries"
4. "Generera performance-rapport före och efter optimering"
```

### Scenario 4: Säkerhetsgranskning

```
1. "Skanna hela projektet för CVE-sårbarheter"
2. "Kontrollera alla dependencies för kända säkerhetsproblem"
3. "Analysera krypteringsimplementationen för säkerhetsproblem"
4. "Generera säkerhetsrapport för dokumentation"
```

---

## Automatisering med Hooks

Du kan skapa hooks för att automatiskt köra MCP-servrar vid vissa händelser:

### Pre-commit hook

```json
{
  "name": "Code Quality Check",
  "when": {
    "type": "fileEdited",
    "patterns": ["*.ts", "*.tsx", "*.py"]
  },
  "then": {
    "type": "askAgent",
    "prompt": "Analysera kodkvaliteten i de ändrade filerna och rapportera eventuella problem"
  }
}
```

### Security scan hook

```json
{
  "name": "Security Scan",
  "when": {
    "type": "fileEdited",
    "patterns": ["package.json", "requirements.txt", "go.mod"]
  },
  "then": {
    "type": "askAgent",
    "prompt": "Skanna nya dependencies för säkerhetssårbarheter"
  }
}
```

### Test runner hook

```json
{
  "name": "Run Tests",
  "when": {
    "type": "fileEdited",
    "patterns": ["*.test.ts", "*.spec.ts", "test_*.py"]
  },
  "then": {
    "type": "askAgent",
    "prompt": "Kör de modifierade testerna och rapportera resultat"
  }
}
```

---

## Best Practices

### 1. Kodkvalitet

- ✅ Kör linting innan varje commit
- ✅ Fixa alla kritiska problem innan PR
- ✅ Använd auto-fix när möjligt
- ❌ Ignorera inte varningar utan anledning

### 2. Säkerhet

- ✅ Skanna dependencies veckovis
- ✅ Åtgärda kritiska CVE:er omedelbart
- ✅ Dokumentera kända sårbarheter och varför de accepteras
- ❌ Använd aldrig dependencies med kända kritiska sårbarheter

### 3. Prestanda

- ✅ Profilera regelbundet under utveckling
- ✅ Sätt performance-budgets och följ dem
- ✅ Testa på olika enheter och nätverk
- ❌ Optimera inte i förtid (premature optimization)

### 4. Testning

- ✅ Skriv tester för ny funktionalitet
- ✅ Kör tester innan varje commit
- ✅ Håll testerna snabba och fokuserade
- ❌ Skippa inte tester för "små" ändringar

---

## Felsökning

### "Server svarar inte"

```
1. Kontrollera att servern är aktiverad i mcp.json
2. Starta om servern via MCP Server-panelen
3. Kontrollera loggar för felmeddelanden
```

### "Verktyget hittades inte"

```
1. Kontrollera att rätt dependencies är installerade
2. Verifiera att du är i rätt projektmapp
3. Kontrollera att verktyget stöder ditt språk/ramverk
```

### "Långsam respons"

```
1. Kontrollera nätverksanslutning (vissa servrar hämtar data online)
2. Minska omfattningen (analysera färre filer)
3. Öka timeout i konfigurationen
```

---

## Tips & Tricks

### Kombinera flera servrar

```
Analysera kodkvalitet, säkerhet och kör tester för src/auth/
```

### Använd i CI/CD

```bash
# Exempel GitHub Actions workflow
- name: Run MCP Quality Checks
  run: |
    kiro mcp run code-analyzer
    kiro mcp run vulnerability-scanner
    kiro mcp run code-checker-python
```

### Skapa custom workflows

```
1. Analysera kodkvalitet
2. Om problem hittas, föreslå fixes
3. Applicera fixes automatiskt
4. Kör tester för att verifiera
5. Commit om allt är grönt
```

---

## Nästa steg

1. **Bekanta dig med servrarna:** Prova varje server individuellt
2. **Integrera i workflow:** Börja använda dem i ditt dagliga arbete
3. **Skapa hooks:** Automatisera vanliga kontroller
4. **Anpassa:** Justera konfigurationen efter dina behov
5. **Dela:** Dokumentera dina workflows för teamet

## Support

Vid frågor eller problem:

- Se MCP-SERVERS.md för detaljerad dokumentation
- Kontrollera Kiro's MCP-dokumentation
- Fråga i projektet's chat/forum
