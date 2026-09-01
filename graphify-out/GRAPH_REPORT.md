# Graph Report - Coconut-Samui-Rugby-Academy  (2026-08-31)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 130 nodes · 183 edges · 18 communities (11 shown, 6 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3621bab5`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7
- Community 8
- Community 9
- Community 10
- Community 11
- Community 12
- Community 13
- Community 14
- Community 15
- Community 16

## God Nodes (most connected - your core abstractions)
1. `waLink()` - 8 edges
2. `SITE` - 7 edges
3. `main()` - 6 edges
4. `courseSchema()` - 4 edges
5. `programs` - 4 edges
6. `scripts` - 4 edges
7. `FaqItem` - 3 edges
8. `faqSchema()` - 3 edges
9. `include` - 3 edges
10. `FORM_ENDPOINT` - 3 edges

## Surprising Connections (you probably didn't know these)
- `Program` --references--> `FaqItem`  [EXTRACTED]
  src/data/programs.ts → src/lib/schema.ts
- `schema` --calls--> `courseSchema()`  [EXTRACTED]
  src/pages/programs/index.astro → src/lib/schema.ts

## Import Cycles
- None detected.

## Communities (18 total, 6 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.13
Nodes (15): astro, @astrojs/sitemap, @fontsource/noto-sans-thai, @fontsource-variable/fraunces, @fontsource-variable/schibsted-grotesk, dependencies, astro, @astrojs/sitemap (+7 more)

### Community 1 - "Community 1"
Cohesion: 0.14
Nodes (10): academyPath, agentFiles, agentNames, agentsDir, __dirname, failures, memoirePath, REQUIRED_SECTIONS (+2 more)

### Community 2 - "Community 2"
Cohesion: 0.27
Nodes (7): Program, programs, courseSchema(), eventSchema(), FaqItem, faqSchema(), schema

### Community 3 - "Community 3"
Cohesion: 0.27
Nodes (10): API_URL, createPost(), fs, headers, listIntegrations(), main(), path, platformSettings() (+2 more)

### Community 4 - "Community 4"
Cohesion: 0.20
Nodes (3): allSchema, canonical, orgSchema

### Community 5 - "Community 5"
Cohesion: 0.22
Nodes (8): name, private, scripts, build, dev, preview, type, version

### Community 6 - "Community 6"
Cohesion: 0.25
Nodes (7): **/*, astro/tsconfigs/strict, .astro/types.d.ts, dist, exclude, extends, include

### Community 7 - "Community 7"
Cohesion: 0.54
Nodes (4): year, FORM_ENDPOINT, SITE, waLink()

### Community 8 - "Community 8"
Cohesion: 0.29
Nodes (5): fs, logoBytes, path, posters, repoRoot

### Community 9 - "Community 9"
Cohesion: 0.29
Nodes (5): fs, logoBytes, path, repoRoot, sessions

### Community 12 - "Community 12"
Cohesion: 0.50
Nodes (3): schema, string, tiles

## Knowledge Gaps
- **58 isolated node(s):** `astro`, `@astrojs/sitemap`, `@fontsource/noto-sans-thai`, `@fontsource-variable/fraunces`, `@fontsource-variable/schibsted-grotesk` (+53 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 71 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Community 0` to `Community 5`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **Why does `waLink()` connect `Community 7` to `Community 2`, `Community 10`?**
  _High betweenness centrality (0.003) - this node is a cross-community bridge._
- **What connects `astro`, `@astrojs/sitemap`, `@fontsource/noto-sans-thai` to the rest of the system?**
  _58 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._