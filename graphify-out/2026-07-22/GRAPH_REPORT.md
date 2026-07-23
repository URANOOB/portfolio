# Graph Report - Portfolio  (2026-07-22)

## Corpus Check
- 71 files · ~982,205 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 376 nodes · 503 edges · 35 communities (26 shown, 9 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.6)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9122684b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- DesktopShell.tsx
- devDependencies
- compilerOptions
- terminal.ts
- FinderApp.tsx
- scripts
- dependencies
- preferences-store.ts
- layout.tsx
- index.ts
- skills.ts
- .prettierrc.json
- generate_cvs.py
- vercel.json
- eslint.config.mjs
- next.config.ts
- postcss.config.mjs
- HelpApp.tsx
- vite.config.ts
- What You Must Do When Invoked
- graphify reference: extra exports and benchmark
- William Galeano — Urano OS
- graphify reference: query, path, explain
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- AGENTS.md
- extraction-spec.md
- experience.ts
- Q: 6:40:59 p. m. [vite] Internal server error: Cannot read properties of undefined (reading 'fetch') at Object.fetchAsset (C:/Users/will2/OneDrive/Desktop/Portfolio/worker/index.ts:41:44) at handleImageOptimization (C:/Users/will2/OneDrive/Desktop/Portfolio/node_modules/vinext/src/server/image-optimization.ts:237:33)
- Q: Quita esta caja de ayuda por favor.

## God Nodes (most connected - your core abstractions)
1. `usePreferencesStore` - 36 edges
2. `useWindowStore` - 19 edges
3. `compilerOptions` - 17 edges
4. `AppId` - 14 edges
5. `R/COON Portfolio` - 14 edges
6. `What You Must Do When Invoked` - 12 edges
7. `/graphify` - 10 edges
8. `scripts` - 9 edges
9. `graphify reference: extra exports and benchmark` - 8 edges
10. `include` - 7 edges

## Surprising Connections (you probably didn't know these)
- `ExperienceApp()` --calls--> `usePreferencesStore`  [EXTRACTED]
  components/apps/ExperienceApp.tsx → store/preferences-store.ts
- `LogisticsApp()` --calls--> `usePreferencesStore`  [EXTRACTED]
  components/apps/LogisticsApp.tsx → store/preferences-store.ts
- `SkillsApp()` --calls--> `usePreferencesStore`  [EXTRACTED]
  components/apps/SkillsApp.tsx → store/preferences-store.ts
- `RaccoonAnimation()` --calls--> `usePreferencesStore`  [EXTRACTED]
  components/apps/TerminalApp.tsx → store/preferences-store.ts
- `SceneWallpaper()` --indirect_call--> `render()`  [INFERRED]
  components/desktop/SceneWallpaper.tsx → tests/rendered-html.test.mjs

## Import Cycles
- None detected.

## Communities (35 total, 9 thin omitted)

### Community 0 - "DesktopShell.tsx"
Cohesion: 0.07
Nodes (40): metadata, AboutApp(), ResumeApp(), ResumeId, resumes, searchableApps, SearchApp(), accentOptions (+32 more)

### Community 1 - "devDependencies"
Cohesion: 0.05
Nodes (37): @cloudflare/vite-plugin, cross-env, eslint, eslint-config-next, eslint-config-prettier, devDependencies, @cloudflare/vite-plugin, cross-env (+29 more)

### Community 2 - "compilerOptions"
Cohesion: 0.06
Nodes (31): build, dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts (+23 more)

### Community 3 - "terminal.ts"
Cohesion: 0.14
Nodes (16): POST(), ContactApp(), emptyForm, Entry, RaccoonAnimation(), TerminalApp(), DesktopShortcutProps, profile (+8 more)

### Community 4 - "FinderApp.tsx"
Cohesion: 0.19
Nodes (9): generateMetadata(), ProjectPage(), getTimelineBar(), ProjectsApp(), TECHNOLOGY_ICONS, projects, getProject(), projects (+1 more)

### Community 5 - "scripts"
Cohesion: 0.06
Nodes (30): framer-motion, lucide-react, next, dependencies, framer-motion, lucide-react, next, react (+22 more)

### Community 6 - "dependencies"
Cohesion: 0.11
Nodes (17): LogisticsApp(), SkillsApp(), AppContent(), experience, logisticsExperience, softwareExperience, experience, logisticsExperience (+9 more)

### Community 7 - "preferences-store.ts"
Cohesion: 0.60
Nodes (3): ExperienceApp(), currentSoftwareFocus, softwareCareerTimeline

### Community 9 - "layout.tsx"
Cohesion: 0.38
Nodes (6): geistMono, geistSans, generateMetadata(), getRequestOrigin(), RootLayout(), viewport

### Community 10 - "index.ts"
Cohesion: 0.29
Nodes (3): Env, ExecutionContext, worker

### Community 11 - "skills.ts"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: Listo. Borrate el explorador y haz que en el escritorio los iconos se puedan mover libremente. Adicionalmente, en el deck pon los nombres por debajo y haz los iconos del deck mas grandes, Source Nodes

### Community 12 - ".prettierrc.json"
Cohesion: 0.40
Nodes (4): printWidth, semi, singleQuote, trailingComma

### Community 13 - "generate_cvs.py"
Cohesion: 0.70
Nodes (4): build_cv(), draw_background(), experience_item(), header()

### Community 19 - "HelpApp.tsx"
Cohesion: 0.33
Nodes (4): Technology, TechnologyGroup, technologyGroups, terminalCommands

### Community 22 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 23 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 24 - "William Galeano — Urano OS"
Cohesion: 0.12
Nodes (16): Activos y atribución, Añadir o eliminar una aplicación, Cambiar CVs y recursos públicos, Características, Comandos, Desplegar en Vercel, Estructura del proyecto, Formulario de contacto con Resend (+8 more)

### Community 25 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 26 - "graphify reference: add a URL and watch a folder"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 27 - "graphify reference: commit hook and native CLAUDE.md integration"
Cohesion: 0.50
Nodes (3): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration

### Community 28 - "graphify reference: incremental update and cluster-only"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

### Community 34 - "experience.ts"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: En el apartado de help puedes poner todas las tecnologias usadas en este proyecto con sus respectivos iconos? Tambien una breve explicacion de para que se usa cada una de ellas., Source Nodes

### Community 36 - "Q: 6:40:59 p. m. [vite] Internal server error: Cannot read properties of undefined (reading 'fetch') at Object.fetchAsset (C:/Users/will2/OneDrive/Desktop/Portfolio/worker/index.ts:41:44) at handleImageOptimization (C:/Users/will2/OneDrive/Desktop/Portfolio/node_modules/vinext/src/server/image-optimization.ts:237:33)"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: 6:40:59 p. m. [vite] Internal server error: Cannot read properties of undefined (reading 'fetch') at Object.fetchAsset (C:/Users/will2/OneDrive/Desktop/Portfolio/worker/index.ts:41:44) at handleImageOptimization (C:/Users/will2/OneDrive/Desktop/Portfolio/node_modules/vinext/src/server/image-optimization.ts:237:33), Source Nodes

### Community 37 - "Q: Quita esta caja de ayuda por favor."
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: Quita esta caja de ayuda por favor., Source Nodes

## Knowledge Gaps
- **184 isolated node(s):** `semi`, `singleQuote`, `trailingComma`, `printWidth`, `geistSans` (+179 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `usePreferencesStore` connect `DesktopShell.tsx` to `terminal.ts`, `FinderApp.tsx`, `dependencies`, `preferences-store.ts`?**
  _High betweenness centrality (0.043) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `scripts`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **What connects `semi`, `singleQuote`, `trailingComma` to the rest of the system?**
  _184 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `DesktopShell.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06939890710382514 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.05405405405405406 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.0625 - nodes in this community are weakly interconnected._
- **Should `terminal.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13768115942028986 - nodes in this community are weakly interconnected._