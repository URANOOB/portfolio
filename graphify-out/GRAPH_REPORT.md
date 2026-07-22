# Graph Report - Portfolio  (2026-07-22)

## Corpus Check
- 60 files · ~671,030 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 315 nodes · 389 edges · 34 communities (24 shown, 10 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c7d6e9cf`
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
- projects.ts
- include
- layout.tsx
- index.ts
- skills.ts
- .prettierrc.json
- generate_cvs.py
- vercel.json
- eslint.config.mjs
- next.config.ts
- postcss.config.mjs
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
- skills.ts

## God Nodes (most connected - your core abstractions)
1. `useWindowStore` - 17 edges
2. `compilerOptions` - 17 edges
3. `AppId` - 14 edges
4. `What You Must Do When Invoked` - 12 edges
5. `/graphify` - 10 edges
6. `scripts` - 9 edges
7. `graphify reference: extra exports and benchmark` - 8 edges
8. `William Galeano — Urano OS` - 8 edges
9. `include` - 7 edges
10. `validateContactPayload()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `TerminalResult` --references--> `AppId`  [EXTRACTED]
  lib/terminal.ts → types/portfolio.ts
- `POST()` --calls--> `validateContactPayload()`  [EXTRACTED]
  app/api/contact/route.ts → lib/validation.ts
- `ContactApp()` --calls--> `validateContactPayload()`  [EXTRACTED]
  components/apps/ContactApp.tsx → lib/validation.ts
- `FinderApp()` --calls--> `useWindowStore`  [EXTRACTED]
  components/apps/FinderApp.tsx → store/window-store.ts
- `TerminalApp()` --calls--> `useWindowStore`  [EXTRACTED]
  components/apps/TerminalApp.tsx → store/window-store.ts

## Import Cycles
- None detected.

## Communities (34 total, 10 thin omitted)

### Community 0 - "DesktopShell.tsx"
Cohesion: 0.14
Nodes (18): FinderApp(), folders, notes, DesktopShortcut(), DockItem(), AppContent(), PointerOrigin, WindowFrame() (+10 more)

### Community 1 - "devDependencies"
Cohesion: 0.05
Nodes (37): @cloudflare/vite-plugin, cross-env, eslint, eslint-config-next, eslint-config-prettier, devDependencies, @cloudflare/vite-plugin, cross-env (+29 more)

### Community 2 - "compilerOptions"
Cohesion: 0.10
Nodes (20): dom, dom.iterable, esnext, compilerOptions, allowImportingTsExtensions, allowJs, esModuleInterop, incremental (+12 more)

### Community 3 - "terminal.ts"
Cohesion: 0.19
Nodes (10): POST(), ContactApp(), emptyForm, Entry, TerminalApp(), appAliases, runPortfolioCommand(), TerminalResult (+2 more)

### Community 4 - "FinderApp.tsx"
Cohesion: 0.23
Nodes (4): Variant, experience, profile, Experience

### Community 5 - "scripts"
Cohesion: 0.12
Nodes (15): engines, node, name, private, scripts, build, build:vercel, dev (+7 more)

### Community 6 - "dependencies"
Cohesion: 0.13
Nodes (15): framer-motion, lucide-react, next, dependencies, framer-motion, lucide-react, next, react (+7 more)

### Community 7 - "projects.ts"
Cohesion: 0.24
Nodes (5): generateMetadata(), ProjectPage(), getProject(), projects, Project

### Community 8 - "include"
Cohesion: 0.17
Nodes (11): build, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+3 more)

### Community 9 - "layout.tsx"
Cohesion: 0.38
Nodes (6): geistMono, geistSans, generateMetadata(), getRequestOrigin(), RootLayout(), viewport

### Community 10 - "index.ts"
Cohesion: 0.29
Nodes (3): Env, ExecutionContext, worker

### Community 11 - "skills.ts"
Cohesion: 0.11
Nodes (18): metadata, BootScreen(), applicationIds, DesktopShell(), folders, galleryItems, initialTasks, menuApps (+10 more)

### Community 12 - ".prettierrc.json"
Cohesion: 0.40
Nodes (4): printWidth, semi, singleQuote, trailingComma

### Community 13 - "generate_cvs.py"
Cohesion: 0.70
Nodes (4): build_cv(), draw_background(), experience_item(), header()

### Community 22 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 23 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 24 - "William Galeano — Urano OS"
Cohesion: 0.22
Nodes (8): Arquitectura, Despliegue en Vercel, Formulario de contacto, Instalación, Personalización rápida, Qué incluye, Validación, William Galeano — Urano OS

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

## Knowledge Gaps
- **151 isolated node(s):** `semi`, `singleQuote`, `trailingComma`, `printWidth`, `geistSans` (+146 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `devDependencies` to `scripts`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `scripts`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Why does `useWindowStore` connect `DesktopShell.tsx` to `skills.ts`, `terminal.ts`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **What connects `semi`, `singleQuote`, `trailingComma` to the rest of the system?**
  _151 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `DesktopShell.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13763440860215054 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.05405405405405406 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._