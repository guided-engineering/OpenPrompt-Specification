| source URL | fetched OK? | access date | version/commit if available |
| --- | --- | --- | --- |
| **S1** https://agentskills.io/specification | Yes (raw Markdown twin `/specification.md`, HTTP 200) | 2026-11-13 | Spec carries no version number. Site source = `docs/specification.mdx` in `agentskills/agentskills` @ `83021e2be457a9b6679148719c1f6074f0ad975e` (repo HEAD, 2026-11-04T19:47:24Z). Last change to the spec file itself: 2026-08-04 (`217be54873`). |
| **S2** https://agentskills.io/skill-creation/best-practices | Yes (`.md` twin) | 2026-11-13 | same repo commit as S1 |
| **S3** https://agentskills.io/skill-creation/evaluating-skills | Yes (`.md` twin) | 2026-11-13 | same |
| **S4** https://agentskills.io/skill-creation/optimizing-descriptions | Yes (`.md` twin) | 2026-11-13 | same |
| **S5** https://agentskills.io/skill-creation/using-scripts (one level deep, linked from S1/S2) | Yes (`.md` twin) | 2026-11-13 | same |
| **S6** https://agentskills.io/client-implementation/adding-skills-support (one level deep) | Yes (`.md` twin) | 2026-11-13 | same |
| **S7** https://agentskills.io/skill-creation/quickstart | Yes (`.md` twin) | 2026-11-13 | same |
| **S8** https://agentskills.io/home and **S9** https://agentskills.io/llms.txt (page index) | Yes | 2026-11-13 | same |
| **W1** https://skills.sh/docs | Yes (HTML, text extracted; a first attempt through the summarizing fetch tool returned only a summary, so the raw page was re-read) | 2026-11-13 | live site, no version |
| **W2** https://skills.sh/docs/cli | Yes | 2026-11-13 | live site |
| **W3** https://skills.sh/docs/faq | Yes | 2026-11-13 | live site |
| **W4** https://skills.sh/docs/customize | Yes | 2026-11-13 | live site |
| **W5** https://skills.sh/docs/packs | Yes | 2026-11-13 | live site |
| **W6** https://skills.sh/docs/api | Yes | 2026-11-13 | API path prefix `/api/v1/` |
| **W7** https://skills.sh/about | Yes | 2026-11-13 | live site |
| **W8** https://skills.sh/audits and **W9** https://skills.sh/official | Yes (first rows only) | 2026-11-13 | live site |
| **W10** https://skills.sh/schemas/skills.sh.schema.json | Yes | 2026-11-13 | JSON Schema draft 2020-12 |
| **W11** https://skills.sh/vercel-labs/skills/find-skills (sample skill page) and https://skills.sh/ (leaderboard header) | Yes | 2026-11-13 | live site |
| **C1** https://github.com/vercel-labs/skills (README) | Yes (raw file at pinned SHA) | 2026-11-13 | `b716f9dc2ba36b6aa8f0080615e5a3a6caeac63b` |
| **C2** https://github.com/vercel-labs/skills/blob/main/docs/creating-skills.md | Yes (raw at pinned SHA) | 2026-11-13 | `b716f9dc…` |
| **C3** https://github.com/vercel-labs/skills/blob/main/docs/commands.md | Yes (raw at pinned SHA) | 2026-11-13 | `b716f9dc…` |
| **C4** https://github.com/vercel-labs/skills/blob/main/docs/agents.md | Yes | 2026-11-13 | `b716f9dc…` |
| **C5** https://github.com/vercel-labs/skills/blob/main/docs/troubleshooting.md | Yes | 2026-11-13 | `b716f9dc…` |
| **C6** https://github.com/vercel-labs/skills/blob/main/docs/api.md | Partially (searched for ref-pinning statements only) | 2026-11-13 | `b716f9dc…` |
| **C7** https://github.com/vercel-labs/skills/blob/main/AGENTS.md | Yes | 2026-11-13 | `b716f9dc…` |
| **SRC** https://github.com/vercel-labs/skills/tree/b716f9dc2ba36b6aa8f0080615e5a3a6caeac63b/src | Read in full: `source-parser.ts`, `git.ts`, `skills.ts`, `telemetry.ts`, `cli.ts`, `skill-lock.ts`, `skill-hash.ts`, `sanitize.ts`, `frontmatter.ts`, `constants.ts`, `ci.ts`, `skills-sh-config.ts`, `detect-agent.ts`, `github-host.ts`. Read in part: `add.ts`, `installer.ts`, `agents.ts`, `local-lock.ts`, `blob.ts`, `find.ts`, `providers/wellknown.ts` | 2026-11-13 | `b716f9dc…` |
| **N1** https://registry.npmjs.org/skills/latest (plus https://registry.npmjs.org/skills for dist-tags and publish times) | Yes | 2026-11-13 | `skills@1.8.1`, published 2026-11-11T00:01:32Z, `gitHead` `e781cb4d07433dfe1d19e924ed45cc61738c55ec` |
| **G1** https://api.github.com/repos/vercel-labs/skills/commits/main | Yes | 2026-11-13 | HEAD `b716f9dc2ba36b6aa8f0080615e5a3a6caeac63b`, committed 2026-11-12T23:25:22Z |
| **G2** https://api.github.com/repos/vercel-labs/skills/compare/e781cb4d07433dfe1d19e924ed45cc61738c55ec...b716f9dc2ba36b6aa8f0080615e5a3a6caeac63b | Yes | 2026-11-13 | HEAD is 2 commits ahead of the 1.8.1 commit, 0 behind |
| **R1** https://github.com/agentskills/agentskills/tree/main/skills-ref (README, `pyproject.toml`, `validator.py`, `parser.py`, `models.py`, `cli.py`) | Yes (raw at pinned SHA) | 2026-11-13 | `skills-ref` 0.1.0 @ `83021e2be457a9b6679148719c1f6074f0ad975e`; repo has no tags or releases |
| **R2** https://pypi.org/pypi/skills-ref/json | Yes | 2026-11-13 | PyPI `skills-ref` 0.1.1 (uploaded 2026-01-10); also 0.1.0 |
| **R3** https://github.com/agentskills/agentskills/blob/main/GOVERNANCE.md | Partially (sections 1-5) | 2026-11-13 | `83021e2b…`, "Adopted November 4, 2026" |
| PyPI file inspector page for the `skills-ref` 0.1.1 wheel (to confirm its console-script name) | **No** - blocked by a JavaScript client challenge; not bypassed | 2026-11-13 | - |
| **V1** https://code.claude.com/docs/en/skills (`.md` twin; one level deep, linked from C4) | Partially (locations table, frontmatter reference, "outside Claude Code" rules, listing-budget section) | 2026-11-13 | live docs |
| **V2** https://developers.openai.com/codex/skills (linked from C4) -> HTTP 308 redirect to https://learn.chatgpt.com/docs/build-skills | Only via the summarizing fetch tool (no raw text seen) - treat details as lower confidence | 2026-11-13 | live docs |

# Agent Skills reference notes: open spec, authoring, evals, `skills` CLI, skills.sh

All eight requested sources loaded. The only fetch that failed is the PyPI inspector page (not a requested source). Everything below is paraphrased; nothing was taken from memory unless tagged `[UNVERIFIED]`.

## How to read these notes

- **Tags.** `[SPEC-REQUIRED]` = normative "must" in the open spec (S1) or enforced by the reference validator. `[SPEC-OPTIONAL]` = optional field or structure defined by the spec. `[SPEC-RECOMMENDED]` = "should"-level guidance, including the non-normative guide pages on agentskills.io (marked "guide"). `[CLI-BEHAVIOR]` = what the Vercel `skills` CLI documents or does. `[VENDOR-EXTENSION]` = specific to one product (Claude Code, Codex, skills.sh, the CLI's own metadata key). `[UNVERIFIED]` = not confirmed from a fetched page (inference, memory, or summarized second-hand).
- **Citations.** Keys in brackets (`[S1]`, `[C3]`, ...) resolve to the URLs in the table above and in the link definitions at the end of the file. `[SRC:file.ts]` means the file at `https://github.com/vercel-labs/skills/blob/b716f9dc2ba36b6aa8f0080615e5a3a6caeac63b/src/<file.ts>`.
- **"source-only"** = read from CLI source code, not from its documentation. It is exact for commit `b716f9dc…` but undocumented and may change without notice.
- **"HEAD-only"** = present on `main` at `b716f9dc…` but committed after the commit that npm `skills@1.8.1` was published from (see section 0).

## 0. Version snapshot

- npm `skills`: `latest` = **1.8.1**, published 2026-11-11T00:01:32Z; `gitHead` `e781cb4d07433dfe1d19e924ed45cc61738c55ec` (commit message "v1.8.1"); `engines.node` `>=22.20.0`; binaries `skills` and `add-skill`; MIT; other dist-tag `snapshot` = 1.5.23-snapshot.2. Recent cadence: 1.7.5 (11-02), 1.7.6 (11-03), 1.8.0 (11-10), 1.8.1 (11-11). [N1]
- `vercel-labs/skills` `main` HEAD: **`b716f9dc2ba36b6aa8f0080615e5a3a6caeac63b`** (2026-11-12T23:25:22Z, "feat(add): install a skill under a new name with --rename (#2722)"). `package.json` at HEAD still says 1.8.1. [G1]
- HEAD is exactly 2 commits ahead of the 1.8.1 commit: `e7252682bd` "feat(lock): pin lock entries to the installed commit (#2735)" and `b716f9dc2b` (`--rename`). The README on `main` already describes both, and `docs/commands.md` documents `--rename`. Whether a given flag is in the npm tarball was inferred from `gitHead`, not by unpacking the tarball. [G2]
- `agentskills/agentskills` HEAD: `83021e2be457a9b6679148719c1f6074f0ad975e` (2026-11-04T19:47:24Z). The spec has no version number and the repo has no tags or releases. Governance adopted 2026-11-04 says the project will become a series of LF Projects, LLC, and that future spec releases will be tagged with a changelog; a numbered proposal track does not exist yet. [R3]
- Reference validator `skills-ref`: 0.1.0 in the repo; 0.1.1 on PyPI (details in A.5).

---

## A. SKILL.md format

### A.1 File and frontmatter container

- `[SPEC-REQUIRED]` A skill is a directory containing at minimum a file `SKILL.md`. [S1]
- `[SPEC-REQUIRED]` `SKILL.md` must contain YAML frontmatter followed by Markdown content. [S1]
- `[SPEC-REQUIRED]` (validator) The file must begin with `---`, the frontmatter must be closed by a second `---`, and it must parse to a YAML mapping. The validator parses with `strictyaml`. [R1]
- `[SPEC-RECOMMENDED]` Name the file exactly `SKILL.md`. Clients are told to look for a file with exactly that name; the validator also accepts lowercase `skill.md` as a fallback, which should not be relied on. [S6] [R1]
- `[UNVERIFIED]` (inference from validator and CLI source, not run) A UTF-8 byte-order mark before the first `---` makes `skills-ref` reject the file, while the `skills` CLI tolerates a BOM. Claude Code only reads frontmatter when `---` is the file's first line. Save without BOM. [R1] [SRC:frontmatter.ts] [V1]
- `[UNVERIFIED]` (memory) `strictyaml` accepts only a restricted YAML subset (for example no flow-style `{}`/`[]` collections, no anchors or tags). Keep frontmatter to plain block-style `key: value` lines.

### A.2 Required fields

| Field | Constraints | Tag | Source |
| --- | --- | --- | --- |
| `name` | 1-64 characters. Lowercase letters, digits and hyphens only. Must not start or end with a hyphen. Must not contain `--`. Must equal the parent directory name. | `[SPEC-REQUIRED]` | [S1] |
| `description` | 1-1024 characters, non-empty. | `[SPEC-REQUIRED]` | [S1] |
| `description` content | Should say both what the skill does and when to use it, and include specific keywords that help agents match tasks. | `[SPEC-RECOMMENDED]` | [S1] |

Validator specifics for `name` [R1]: value is whitespace-stripped and NFKC-normalized; length check is `> 64`; must equal its own lowercase form; no leading/trailing hyphen; no `--`; every character must be alphanumeric or `-`; the directory's basename (NFKC) must equal the name. Because the check is Unicode-aware, non-ASCII letters pass the validator even though the spec text names `a-z` and `0-9`. For portability use ASCII only: `^[a-z0-9]+(-[a-z0-9]+)*$`, at most 64 characters.

Validator specifics for `description` [R1]: must be a non-empty string after stripping; length is counted in Python characters (code points), limit 1024.

### A.3 Optional fields defined by the open spec

| Field | Constraints | Stability | Tag | Source |
| --- | --- | --- | --- | --- |
| `license` | License name or a reference to a bundled license file. Recommended to keep it short. Not validated by `skills-ref`. | stable | `[SPEC-OPTIONAL]` | [S1] [R1] |
| `compatibility` | 1-500 characters if present. Environment requirements: intended product, system packages, runtime versions, network access. Only include when there are real requirements; the spec notes most skills do not need it. Validator: must be a string, at most 500. | stable | `[SPEC-OPTIONAL]` | [S1] [R1] |
| `metadata` | Map from string keys to string values, for properties the spec does not define. Recommended: reasonably unique key names. Quote values that YAML would type otherwise (spec example uses `version: "1.0"`). The validator coerces keys and values to strings and checks nothing else. | stable | `[SPEC-OPTIONAL]` | [S1] [R1] |
| `allowed-tools` | Space-separated string of pre-approved tools, e.g. `Bash(git:*) Bash(jq:*) Read`. | **Experimental**; support varies by agent | `[SPEC-OPTIONAL]` | [S1] |

- `[SPEC-REQUIRED]` (validator-enforced) No other top-level frontmatter keys. `skills-ref validate` fails on any key outside `name`, `description`, `license`, `allowed-tools`, `metadata`, `compatibility`. The spec prose lists these six fields but has no explicit "no other keys" sentence. [R1] [S1]
- `[VENDOR-EXTENSION]` Claude Code docs confirm the same six-key allowlist is hard-enforced for claude.ai skill uploads, the Skills API and `package_skill.py` (unknown key = hard error), while Claude Code itself silently ignores unknown keys. [V1]
- `[SPEC-OPTIONAL]` There is no top-level `version`, `author` or `tags` field in the spec; the spec's own example puts `author` and `version` under `metadata`. [S1]

### A.4 Body

- `[SPEC-OPTIONAL]` No format restrictions on the Markdown body. [S1]
- `[SPEC-RECOMMENDED]` Suggested content: step-by-step instructions, input/output examples, common edge cases. [S1]
- `[SPEC-RECOMMENDED]` The whole body is loaded when the skill activates, so split long content into referenced files (limits in section B). [S1]

### A.5 Reference validator: `skills-ref`

- Named by the spec's "Validation" section, with the command `skills-ref validate ./my-skill`; it checks frontmatter validity and naming conventions. `[SPEC-RECOMMENDED]` [S1]
- Repo: https://github.com/agentskills/agentskills/tree/main/skills-ref (Python, Apache-2.0, `requires-python >=3.11`, depends on `click>=8.0` and `strictyaml>=1.7.3`). Version in `pyproject.toml`: **0.1.0**. [R1]
- The README says the library is for demonstration and not meant for production use. [R1]
- Install as documented in the repo README (from a checkout of the `skills-ref` directory): create a venv then `pip install -e .`, or `uv sync` and activate `.venv`. Windows activation commands (`.venv\Scripts\Activate.ps1` or `activate.bat`) are documented. After that the `skills-ref` executable is on PATH inside the venv. [R1]
- Commands [R1]: `skills-ref validate <skill-dir or SKILL.md path>` (exit 0 valid, exit 1 with errors on stderr); `skills-ref read-properties <path>` (JSON); `skills-ref to-prompt <path>...` (an `<available_skills>` XML block). Python API: `validate`, `read_properties`, `to_prompt` from `skills_ref`.
- What `validate` covers: existence of the directory and `SKILL.md`, frontmatter parse, allowed keys, `name` rules including directory match, `description` length, `compatibility` type and length. It does **not** check body length, token count, file references, directory conventions, `license`, or `allowed-tools` syntax. [R1]
- `[UNVERIFIED]` PyPI has a package `skills-ref` 0.1.1 (uploaded 2026-01-10) whose project links point at `github.com/anthropics/agentskills` and whose description documents `pip install skills-ref` with a command named `agentskills validate ...`. That differs from the repo (`skills-ref` script, version 0.1.0, no PyPI instructions). I could not confirm which console script the 0.1.1 wheel installs, nor that it matches current repo source. Safest reproducible route: install from the Git repo at a pinned commit. [R2] [R1]
- `[UNVERIFIED]` (inference, not run) The validator reads the file with the platform default text encoding; on Windows a non-ASCII `SKILL.md` may be misread unless Python runs in UTF-8 mode. [R1]

### A.6 Vendor extensions (not portable; all fail `skills-ref validate` if used as top-level keys)

- `[VENDOR-EXTENSION]` Claude Code extra frontmatter keys: `when_to_use`, `argument-hint`, `arguments`, `disable-model-invocation`, `user-invocable`, `disallowed-tools`, `model`, `effort`, `context` (value `fork`), `agent`, `background`, `hooks`, `paths`, `shell`. [V1]
- `[VENDOR-EXTENSION]` Claude Code treats every field as optional (`name` defaults to the directory name; `description` only "recommended"), and accepts `allowed-tools` as a space- or comma-separated string or a YAML list. The spec requires `name` and `description` and defines `allowed-tools` as a space-separated string. [V1] [S1]
- `[VENDOR-EXTENSION]` Claude Code reserved skill-folder names: `synced` and `anthropic-skills` (also the prefix `anthropic-skills:`). Names containing `<`, `>`, control or zero-width characters are refused. [V1]
- `[VENDOR-EXTENSION]` Codex: optional per-skill file `agents/openai.yaml` (UI metadata under `interface`, `policy.allow_implicit_invocation`, tool `dependencies`). `[UNVERIFIED]` for exact field names - seen only through a summarizer. [V2]
- `[VENDOR-EXTENSION]` `skills` CLI: `metadata.internal` set to `true` (or the strings `"true"` / `"1"`, for spec-compliant string-valued metadata) hides a skill from normal discovery; it becomes visible and installable with `INSTALL_INTERNAL_SKILLS=1` (or `true`). [C2] [C5] [SRC:skills.ts]
- `[CLI-BEHAVIOR]` CLI compatibility matrix (as claimed in its docs): `allowed-tools` works in most listed agents but not Kiro CLI or Zencoder; `context: fork` only in Claude Code; hooks only in Claude Code, Cline and Kiro CLI. [C4]

---

## B. Directory structure, file references, progressive disclosure, size limits

- `[SPEC-OPTIONAL]` Conventional subdirectories: `scripts/` (executable code), `references/` (documentation read on demand), `assets/` (templates, images, data files). Any other files or directories are allowed; the conventions are recommendations, not an exhaustive list. [S1]
- `[SPEC-RECOMMENDED]` `scripts/`: self-contained or with clearly documented dependencies; helpful error messages; graceful edge-case handling. Supported languages depend on the agent (Python, Bash, JavaScript are common). [S1]
- `[SPEC-RECOMMENDED]` `references/`: e.g. `REFERENCE.md`, `FORMS.md`, domain files such as `finance.md`. Keep each file focused and small because agents load them on demand. [S1]
- `[SPEC-RECOMMENDED]` Progressive disclosure tiers: (1) metadata, about 100 tokens, `name` + `description` loaded at startup for every skill; (2) instructions, the full `SKILL.md` body loaded on activation, **under 5000 tokens recommended**; (3) resources loaded only when needed. [S1] (The client guide gives 50-100 tokens per skill for tier 1. [S6])
- `[SPEC-RECOMMENDED]` Keep the main `SKILL.md` **under 500 lines**; move detailed reference material to separate files. The best-practices page restates this as under 500 lines and 5,000 tokens. [S1] [S2]
- `[SPEC-RECOMMENDED]` File references use **relative paths from the skill root** (e.g. `references/REFERENCE.md`, `scripts/extract.py`). [S1]
- `[SPEC-RECOMMENDED]` Keep file references **one level deep from `SKILL.md`**; avoid nested reference chains. [S1]
- `[SPEC-RECOMMENDED]` (guide) Script commands shown in code blocks are relative to the skill directory root, including when the command appears inside a `references/*.md` file. No absolute paths. [S5]
- `[SPEC-RECOMMENDED]` (guide) Tell the agent *when* to load each reference file (a condition, e.g. "read X if the API returns a non-200"), not a generic pointer to `references/`. [S2]
- `[SPEC-RECOMMENDED]` (guide) Long or rarely needed output templates go in `assets/` and are referenced from `SKILL.md`; short ones can be inline. [S2]
- `[SPEC-OPTIONAL]` The spec does not say where skill directories live. `<project>/.agents/skills/` and `~/.agents/skills/` are described as a widely adopted cross-client convention; some clients also scan `.claude/skills/`. [S6]
- None of the size, depth or directory rules in this section are checked by `skills-ref`. [R1]

---

## C. Authoring guidance concrete enough to check

### C.1 Description (frontmatter)

- `[SPEC-RECOMMENDED]` State what it does and when to use it; include task keywords. Counter-example in the spec: a three-word description. [S1]
- `[SPEC-RECOMMENDED]` (guide) Imperative phrasing addressed to the agent ("Use this skill when ..."), not "This skill does ...". [S4]
- `[SPEC-RECOMMENDED]` (guide) Describe user intent, not internal mechanics. [S4]
- `[SPEC-RECOMMENDED]` (guide) Be "pushy": list contexts explicitly, including cases where the user does not name the domain. [S4]
- `[SPEC-RECOMMENDED]` (guide) A few sentences to a short paragraph; hard limit 1024 characters. [S4] [S1]

### C.2 Content: what to include and omit

- `[SPEC-RECOMMENDED]` (guide) Ground the skill in real expertise: extract it from a real task done with an agent (steps that worked, corrections made, input/output formats, context supplied) or synthesize from project-specific artifacts (runbooks, API specs and schemas, review comments, VCS history, real failure cases). Avoid LLM-only generic drafts. [S2]
- `[SPEC-RECOMMENDED]` (guide) Include only what the agent would get wrong without it: project conventions, domain procedures, non-obvious edge cases, specific tools or APIs. Omit general knowledge. Test question per paragraph: would the agent get this wrong without it? [S2]
- `[SPEC-RECOMMENDED]` (guide) If the agent already handles the whole task well without the skill, the skill may add no value (verify with a baseline eval). [S2] [S3]
- `[SPEC-RECOMMENDED]` (guide) Scope a skill as one coherent unit of work; too narrow forces several skills to load, too broad is hard to trigger precisely. [S2]
- `[SPEC-RECOMMENDED]` (guide) Moderate detail: concise stepwise guidance plus one working example beats exhaustive coverage. [S2]
- `[SPEC-RECOMMENDED]` (guide) Match prescriptiveness to fragility: give freedom (and explain why) where variation is fine; give exact commands and "do not modify" where the operation is fragile. [S2]
- `[SPEC-RECOMMENDED]` (guide) Pick one default tool or approach and mention alternatives briefly as an escape hatch; do not present a menu of equals. [S2]
- `[SPEC-RECOMMENDED]` (guide) Write reusable procedures (how to approach the class of problem), not the answer to one instance. [S2]
- `[SPEC-RECOMMENDED]` (guide) Refine by running the skill on real tasks and reading execution traces, not only final outputs. [S2]

### C.3 Instruction patterns

- `[SPEC-RECOMMENDED]` (guide) **Gotchas section**: a list of concrete, environment-specific facts that contradict reasonable assumptions. Keep it in `SKILL.md` (not a reference file) so it is read before the situation arises; add an entry each time you correct the agent. [S2]
- `[SPEC-RECOMMENDED]` (guide) **Output templates** instead of prose descriptions of a format. [S2]
- `[SPEC-RECOMMENDED]` (guide) **Checklists** (`- [ ]` steps) for multi-step workflows with dependencies or gates. [S2]
- `[SPEC-RECOMMENDED]` (guide) **Validation loop**: do the work, run a validator (script, reference checklist or self-check), fix, repeat until it passes. [S2]
- `[SPEC-RECOMMENDED]` (guide) **Plan-validate-execute** for batch or destructive work: write an intermediate structured plan, validate it against a source of truth with a script whose errors name the problem and the valid options, then execute. [S2]
- `[SPEC-RECOMMENDED]` (guide) **Bundle a script** when traces show the agent re-implementing the same logic on every run. [S2] [S3]

### C.4 Scripts

- `[SPEC-RECOMMENDED]` (guide; the page itself calls this a hard requirement of agent execution environments, but it is not in the spec proper) **No interactive prompts.** Agents run non-interactive shells; a script waiting on a TTY hangs. Take all input from flags, environment variables or stdin, and fail with a usage message when input is missing. [S5]
- `[SPEC-RECOMMENDED]` (guide) Provide `--help` with a short description, flags and examples; keep it concise since it lands in context. [S5]
- `[SPEC-RECOMMENDED]` (guide) Error messages say what went wrong, what was expected and what to try (list valid values). [S5] [S1]
- `[SPEC-RECOMMENDED]` (guide) Structured output (JSON, CSV, TSV) on stdout; progress and diagnostics on stderr. [S5]
- `[SPEC-RECOMMENDED]` (guide) Also: idempotency (agents retry), reject ambiguous input, `--dry-run` for destructive operations, distinct documented exit codes, safe defaults with explicit `--confirm`/`--force`, predictable output size (harnesses may truncate around 10-30K characters; default to a summary and offer `--offset` or an `--output` file). [S5]
- `[SPEC-RECOMMENDED]` (guide) Self-contained scripts with inline dependency declarations: Python PEP 723 block run with `uv run` (or `pipx run`), Deno `npm:`/`jsr:` specifiers, Bun version-pinned imports, Ruby `bundler/inline`. Pin versions. [S5]
- `[SPEC-RECOMMENDED]` (guide) One-off tools can be invoked without a `scripts/` directory via `uvx`, `pipx run`, `npx`, `bunx`, `deno run`, `go run`; pin versions; state prerequisites in `SKILL.md` and use `compatibility` for runtime-level requirements; move complex commands into a tested script. [S5]
- `[SPEC-RECOMMENDED]` (guide) List the bundled scripts in `SKILL.md` (path plus one-line purpose) so the agent knows they exist, then reference them by relative path in the workflow. [S5]

---

## D. Evaluating output quality

All items are `[SPEC-RECOMMENDED]` (guide) from [S3] unless marked.

### D.1 Test cases and `evals/evals.json`

- A test case = a realistic user prompt, a human-readable expected output, and optional input files.
- Stored at `evals/evals.json` **inside the skill directory**. Shape:
  - top level: `skill_name` (string), `evals` (array)
  - each eval: `id` (integer in the example), `prompt`, `expected_output`, `files` (array of paths such as `evals/files/sales_2025.csv`), and later `assertions` (array of strings).
- Start with **2-3 test cases**; vary phrasing, detail and formality; include at least one edge or boundary case; use realistic context (file paths, column names).
- Do not write pass/fail checks before the first run; add assertions after seeing outputs.

### D.2 With-skill vs baseline

- Run every test case twice: **with the skill** and **without it** (or against the previous version).
- When improving an existing skill: snapshot the old version (`cp -r <skill-path> <workspace>/skill-snapshot/`), point the baseline at the snapshot and save under `old_skill/` instead of `without_skill/`.
- Each run starts from a **clean context**: a fresh subagent where available, otherwise a separate session.
- Each run is given: skill path (or none), the test prompt, input files, and an output directory.

### D.3 Workspace layout per iteration

A workspace directory sits **beside** the skill directory, one `iteration-N/` per pass:

```
<skill>/                      SKILL.md, evals/evals.json
<skill>-workspace/
  iteration-1/
    eval-<descriptive-name>/
      with_skill/     outputs/  timing.json  grading.json
      without_skill/  outputs/  timing.json  grading.json   (or old_skill/)
    benchmark.json
    feedback.json               (human review notes)
  skill-snapshot/               (only when comparing against a previous version)
```

Only `evals/evals.json` is hand-authored; the other JSON files are produced during the process. The page does not define how the numeric `id` maps to the `eval-<name>` directory name.

### D.4 Timing and tokens

- Record per run in `timing.json`: `total_tokens`, `duration_ms`.
- In Claude Code, the subagent task-completion notification carries `total_tokens` and `duration_ms`; save them immediately because they are not stored anywhere else.

### D.5 Assertions and grading

- Good assertions are programmatically verifiable, specific and observable, or countable. Weak ones are vague, or brittle exact-phrase matches.
- Not everything needs an assertion; style and "feel" belong to human review.
- Grading records PASS or FAIL per assertion **with evidence** that quotes or references the output. `grading.json`: `assertion_results` (array of `text`, `passed`, `evidence`) and `summary` (`passed`, `failed`, `total`, `pass_rate`).
- Use an LLM grader for judgment calls and a verification script for mechanical checks (valid JSON, row counts, file exists).
- Require concrete evidence for a PASS (a heading with no substance is a FAIL). Review the assertions themselves: too easy, too hard, or unverifiable ones get fixed.
- **Blind comparison** for two versions: give both outputs to an LLM judge without saying which is which and let it score holistic qualities on its own rubric. It complements assertion grading.

### D.6 Aggregation, runs, analysis

- `benchmark.json` per iteration: `run_summary.with_skill` and `run_summary.without_skill`, each with `pass_rate`, `time_seconds`, `tokens` as `{mean, stddev}`; plus `run_summary.delta` with `pass_rate`, `time_seconds`, `tokens`.
- **Number of runs:** no fixed number for output evals. Standard deviation only means something with several runs per eval; with 2-3 cases and single runs, look at raw pass counts and the delta.
- Analysis: drop assertions that always pass in both configurations; investigate ones that always fail in both; study those that pass only with the skill; tighten instructions where results vary between runs; read transcripts for time or token outliers.
- Human review: record specific, actionable feedback per eval in `feedback.json` (map of eval directory name to text; empty string = fine).
- Iterate: give failed assertions, human feedback, transcripts and the current `SKILL.md` to an LLM and ask for changes, with the guidelines: generalize rather than patch for test cases; keep the skill lean; explain the why instead of rigid ALWAYS/NEVER rules; bundle repeated helper code into `scripts/`. Rerun everything into `iteration-<N+1>/`. Stop when satisfied, feedback is consistently empty, or improvement stalls.
- The `skill-creator` skill in `anthropics/skills` is named as automation for this workflow. `[UNVERIFIED]` Its own file schemas were not fetched.

### D.7 Interaction with the `skills` CLI

- `[UNVERIFIED]` (inference from installer exclusion list) An `evals/` folder inside the skill directory is installed along with the skill; only `metadata.json`, `.git`, `__pycache__` and `__pypackages__` are skipped. [SRC:skill-hash.ts]
- `[UNVERIFIED]` (inference from discovery code) A committed `<skill>-workspace/skill-snapshot/SKILL.md` under `skills/` would be discovered as a second skill with the same name. Keep eval workspaces out of the published tree. [SRC:skills.ts]

---

## E. Description and trigger optimization

All items are `[SPEC-RECOMMENDED]` (guide) from [S4] unless marked.

- **Mechanism:** at startup agents load only `name` and `description`; the description alone decides triggering. Agents tend to consult skills only for tasks that need knowledge beyond their basics, so simple one-step requests may not trigger a matching skill.
- **Query file:** a JSON array of `{ "query": string, "should_trigger": boolean }` (example file name `eval_queries.json`).
- **Counts:** about **20 queries: 8-10 should-trigger, 8-10 should-not-trigger**.
- **Should-trigger** queries vary by phrasing (formal, casual, typos), explicitness (names the domain or not), detail and complexity. The most useful ones are where the skill helps but the link is not obvious.
- **Should-not-trigger** queries should be **near-misses** that share keywords or concepts but need something else; obviously unrelated negatives test nothing.
- **Realism:** file paths, personal context, specific values, casual language.
- **Detection:** run the query with the skill installed and check whether the agent loaded the skill's `SKILL.md`, using the client's logs or tool-call history. A query passes when `should_trigger` matches what happened.
- **Example harness** (bash + `jq`): `claude -p "$query" --output-format json`, then look for a `tool_use` named `Skill` whose `input.skill` equals the skill name. `[UNVERIFIED]` The exact JSON path in the example was not checked against a current Claude Code release.
- **Runs:** each query **3 times** as a starting point; trigger rate = fraction of runs that invoked the skill; pass threshold **0.5** (above for positives, below for negatives). 20 queries x 3 runs = 60 invocations; script it; stop a run early once the outcome is clear if the client allows.
- **Split:** **about 60% train / 40% validation**, proportional mix of positives and negatives in both, shuffled once and kept fixed. Suggested files: `train_queries.json`, `validation_queries.json`.
- **Loop:** evaluate on both sets; use only train failures to revise; broaden if positives fail, add specificity or boundaries if negatives trigger; do not paste keywords from failed queries (overfitting) - address the general category; try a structurally different description when stuck; keep under 1024 characters; repeat. **About five iterations** is usually enough. Select the iteration with the best **validation** pass rate, which may not be the last.
- **Final check:** confirm under 1024 characters, then 5-10 fresh queries that were never part of optimization.
- **Length limits:** hard 1024 characters (spec). `[VENDOR-EXTENSION]` Claude Code caps `description` + `when_to_use` at 1,536 characters in its skill listing and drops descriptions of least-used skills when the listing exceeds its budget (1% of the context window by default), so the key use case should come first. [V1] `[VENDOR-EXTENSION]` `[UNVERIFIED]` Codex: initial skill list limited to about 2% of the context window (8,000 characters if unknown), shortening descriptions first. [V2]

---

## F. The `skills` CLI (`npx skills`, npm `skills@1.8.1`, source at `b716f9dc…`)

### F.1 Basics

- `[CLI-BEHAVIOR]` Requires Node.js 22.20 or later. Run as `npx skills <command>`. [C1] [N1]
- `[CLI-BEHAVIOR]` The CLI does **not** enforce the open spec. A `SKILL.md` is accepted when frontmatter parses as YAML and `name` and `description` are non-empty strings; otherwise the skill is skipped with a warning. Names with spaces or capitals install fine (docs even show `--skill "Convex Best Practices"`). [SRC:skills.ts] [C3] [C5]
- `[CLI-BEHAVIOR]` (source-only) The installed folder name is derived from the frontmatter `name`, not from the source folder: lowercased, every run of characters outside `a-z 0-9 . _` becomes `-`, leading and trailing dots and hyphens removed, max 255 characters. [SRC:sanitize.ts] [SRC:installer.ts]

### F.2 Commands

| Command (aliases) | Purpose | Important flags | Source |
| --- | --- | --- | --- |
| `add <source>` (`a`; `install`/`i` when a source is given) | Install skills from a repo, URL or local directory | see F.3 | [C3] [SRC:cli.ts] |
| `use <source>@<skill>` | Use one skill without installing: writes it to a temp dir and prints a prompt to stdout, or launches one agent with `--agent` | `-s, --skill <skill>`, `-a, --agent <agent>`, `--full-depth` | [C1] [C3] [SRC:cli.ts] |
| `list` (`ls`) | List installed skills; project skills are compared with `skills-lock.json` and marked `modified`, `untracked`, or listed as missing | `-g, --global`, `-a, --agent <agents>`, `--json` (per-skill `status`: `tracked`, `modified`, `untracked`, `missing`) | [C3] |
| `find [query]` (`search`, `f`, `s`) | Search skills.sh. With a query: prints matches (`owner/repo@skill`, install count, skills.sh link) and exits, no prompt. Without a query: interactive picker on a TTY; in a non-TTY or inside an agent it only prints a usage tip | `--owner <github-owner>` | [C3] [SRC:find.ts] |
| `check` | Report available updates and project skills whose files differ from the lock hash; **exit code 1** if anything is outdated or locally changed | none documented | [C3] |
| `update [skills...]` (`upgrade`) | Update all or named skills | `-g, --global`, `-p, --project`, `-y, --yes` (auto scope: project if in a project, else global) | [C3] |
| `remove [skills...]` (`rm`, `r`) | Remove installed skills, a named skill, or everything from an exact lock source (`remove owner/repo`) | `-g, --global`, `-a, --agent` (`'*'` for all), `-s, --skill` (`'*'` for all), `-y, --yes`, `--all` (= `--skill '*' --agent '*' -y`; only removes lock-tracked skills, hand-written folders are skipped) | [C3] |
| `init [name]` | Scaffold `./<name>/SKILL.md`, or `./SKILL.md` with no name (name defaults to the current folder name). Template has `name`, a placeholder `description`, and "When to use" / "Instructions" sections. No spec validation. | none | [C3] [SRC:cli.ts] |
| `experimental_install` (`install`/`i` with no source) | Restore project skills recorded in `skills-lock.json` into `.agents/skills/` and link them to agents; never prompts | `-a, --agent`, `--dry-run`, `--frozen-lockfile` (default in CI), `--no-frozen-lockfile`, `--force` | [C3] |
| `experimental_sync` (`sync`) | Link skills shipped inside installed npm dependencies (root `SKILL.md`, `skills/<name>/`, `dist/skills/<name>/`) and install entries from a `package.json` `skills` array | `-a`, `-y`, `--dry-run`, `--copy`, `--no-cleanup`, `--no-remote`, `--include`, `--exclude`, `-r, --recursive`, `--frozen-lockfile`, `--no-frozen-lockfile` | [C3] |
| `--help`/`-h`, `--version`/`-v` | Help, version | | [SRC:cli.ts] |

- `[CLI-BEHAVIOR]` Commands prefixed `experimental_` may change or disappear in any release. [C1]

### F.3 `skills add` options

| Option | Meaning | Source |
| --- | --- | --- |
| `-g, --global` | Install to the user directory instead of the project | [C3] |
| `-a, --agent <agents...>` | Target agents by id (e.g. `claude-code`, `codex`); `'*'` = all agents; repeat the flag or pass several values | [C3] [SRC:cli.ts] |
| `-s, --skill <skills...>` | Install named skills; `'*'` = all; names with spaces must be quoted; matching is case-insensitive on the frontmatter name, then on a slug form | [C3] [SRC:skills.ts] |
| `-l, --list` | **List the skills in the source without installing** | [C3] |
| `--copy` | Copy files into each agent directory instead of symlinking | [C3] |
| `-y, --yes` | Skip all confirmation prompts | [C3] |
| `--all` | All skills to all agents, no prompts (= `--skill '*' --agent '*' -y`) | [C3] [SRC:cli.ts] |
| `--full-depth` | Search all subdirectories even when a root `SKILL.md` exists; forces a git clone | [C2] [SRC:cli.ts] |
| `--json` | Machine-readable result; requires `-y` or `--all`; cannot be combined with `--list` (help text only, not in `docs/commands.md`) | [SRC:cli.ts] [SRC:add.ts] |
| `--metadata <json>` | Attach a JSON value to the install telemetry event (help text only) | [SRC:cli.ts] |
| `--subagent <names>` | Eve subagent targets (help text only) | [SRC:cli.ts] |
| `--rename <name>` | **HEAD-only.** Install the one selected skill under another name (lowercase letters, digits, `.`, `_`, `-`); rewrites the installed `SKILL.md` `name`, the folder and the lock key | [C3] [G2] |

### F.4 Source formats and ref pinning

| Form | Example | Tag / source |
| --- | --- | --- |
| GitHub shorthand | `owner/repo` | `[CLI-BEHAVIOR]` [C3] |
| Shorthand + skill | `owner/repo@skill-name` (same as `--skill`) | `[CLI-BEHAVIOR]` [C1] [C3] |
| Shorthand + subpath | `owner/repo/path/to/skill` | `[CLI-BEHAVIOR]` source-only [SRC:source-parser.ts] |
| Full GitHub URL | `https://github.com/owner/repo` | `[CLI-BEHAVIOR]` [C3] |
| GitHub tree URL with subpath | `https://github.com/owner/repo/tree/<ref>/skills/<name>` | `[CLI-BEHAVIOR]` [C3] |
| GitLab | `https://gitlab.com/org/repo`, `.../-/tree/<ref>/<path>` (subgroups supported) | `[CLI-BEHAVIOR]` [C3] [SRC:source-parser.ts] |
| Azure Repos | `https://dev.azure.com/org/project/_git/repo?path=/skills/x&version=GBmain` | `[CLI-BEHAVIOR]` [C3] |
| Any git URL | `git@github.com:owner/repo.git`, `ssh://git@host/owner/repo.git`, `https://host/owner/repo.git` | `[CLI-BEHAVIOR]` [C3] |
| Local path | `./my-local-skills`, `../x`, absolute paths, Windows drive paths | `[CLI-BEHAVIOR]` [C3] [SRC:source-parser.ts] |
| Direct download | URL of a single `SKILL.md` or a `.zip` / `.tar` / `.tar.gz` / `.tgz` archive (limits 10 MiB download, 25 MiB extracted, 1000 files; overridable by env) | `[CLI-BEHAVIOR]` [C3] |
| Well-known index | any other `https://` URL: tries `/.well-known/agent-skills/index.json`, then `/.well-known/skills/index.json`, then direct download | `[CLI-BEHAVIOR]` [C3] [SRC:providers/wellknown.ts] |
| skills.sh pack | `https://skills.sh/p/<pack-id>` | `[VENDOR-EXTENSION]` [W2] [W5] |
| Prefix forms | `github:owner/repo`, `gitlab:owner/repo` | `[CLI-BEHAVIOR]` source-only [SRC:source-parser.ts] |

**Pinning a git ref - exact rules** (`[CLI-BEHAVIOR]`):

- **Tag or commit via `@`:** `owner/repo@v1.2.3` is documented as pinning a release tag or full commit; combine with `--skill` to pick a skill. [C3]
  - source-only detail: the part after `@` is treated as a pin only if it looks like a version (optional `v`, at least two dot-separated numbers, optional prerelease/build suffix: `v1.2.3`, `1.2.3`, `v1.2`, `v1.2.3-beta.1+build.5`) or is a **full 40-hex commit SHA**. Anything else, including `@v2` or a branch name, is read as a skill name. [SRC:source-parser.ts]
- **Branch, tag or commit via `#`:** `owner/repo#<ref>`, `owner/repo#<ref>@<skill>`, `https://github.com/owner/repo.git#feature/x`, `git@host:owner/repo.git#<ref>`. `docs/api.md` states `#ref` takes a branch, tag or full commit SHA; `docs/commands.md` does not mention the `#` form. The parser comment says branch pins use `#ref`. [C6] [SRC:source-parser.ts]
- **Branch or tag via tree URL:** `https://github.com/owner/repo/tree/<ref>[/sub/path]` (GitLab: `/-/tree/<ref>/...`). The ref is a single path segment, so refs containing `/` cannot be expressed this way; use `#`. [C3] [SRC:source-parser.ts]
- **Azure Repos:** `version=GB<branch>` or `GT<tag>`; the commit form `GC...` is ignored. [SRC:source-parser.ts]
- **How a commit pin is fetched (source-only):** the CLI first runs a shallow `git clone --depth 1 --branch <ref>`; if that fails because the ref is not a branch or tag and the ref is a full 40-character SHA, it fetches that single commit and checks it out. Abbreviated SHAs are not supported. The server must allow fetch-by-SHA (the code comments name GitHub and GitLab.com). [SRC:git.ts]
- An explicit ref always uses a git clone. [SRC:blob.ts]
- The lock records `ref`. **HEAD-only:** it also records the resolved `commit`, and restore fetches that commit instead of the tip of `ref`. [C1] [G2]

Other fetch behavior (source-only, `[CLI-BEHAVIOR]`) [SRC:git.ts] [SRC:add.ts] [SRC:blob.ts]:

- Clones are shallow, initialize submodules, time out after 5 minutes (`SKILLS_CLONE_TIMEOUT_MS`), and **do not download Git LFS content** (LFS files arrive as pointer files).
- Private repos: normal git credentials, then `gh repo clone` if GitHub CLI is authenticated, then SSH; `GITHUB_TOKEN` / `GH_TOKEN` optional for API access. `GH_HOST` selects a GitHub Enterprise host for shorthand sources. [C3] [SRC:github-host.ts]
- A snapshot fast path that downloads from `skills.sh/api/download/...` instead of cloning is tried only for an allow-list of owners (`vercel`, `vercel-labs`, `heygen-com`, `remotion-dev`) and one self-hosted repo; every other GitHub repo is cloned.

### F.5 Selecting skills and agents, scope, non-interactive use

- `[CLI-BEHAVIOR]` Interactive default: choose skills, choose agents (detected agents preselected), choose scope (Project or Global), choose method (Symlink or Copy) when that choice is meaningful. [C1] [C3] [SRC:add.ts]
- `[CLI-BEHAVIOR]` **Scope:** project by default (`./<agent>/skills/`, meant to be committed); `-g` installs under the home directory. With `-y` and no `-g`, scope is project. [C3] [SRC:add.ts]
- `[CLI-BEHAVIOR]` **Non-interactive:** `-y` skips prompts. Documented CI example: `npx skills add <source> --skill <name> -g -a claude-code -y`. [C3]
- `[CLI-BEHAVIOR]` (source-only) With `-y` and no `--skill`, all discovered skills are installed. With `-y` and no `--agent`: the host agent plus all "universal" agents when run inside a detected AI agent; else Eve alone if detected; else every supported agent if none is detected; else the detected agents plus universal ones. [SRC:add.ts]
- `[CLI-BEHAVIOR]` (source-only) When the CLI detects it is running inside an AI coding agent it switches to `-y` behavior automatically and suppresses the banner. [SRC:add.ts] [SRC:cli.ts] [SRC:detect-agent.ts]
- `[CLI-BEHAVIOR]` `--all` = every skill to every supported agent with no prompts (creates many agent directories). [C3]
- `[CLI-BEHAVIOR]` Restore (`experimental_install`) never prompts; `--frozen-lockfile` is the default when `CI`, `GITHUB_ACTIONS` or similar is set. [C3]

### F.6 Install mechanics: canonical directory, symlink vs copy

- `[CLI-BEHAVIOR]` **Symlink mode** ("Recommended" in the prompt): one canonical copy plus a link from each agent directory; **Copy mode**: independent copies per agent, for when symlinks are not supported. [C3]
- `[CLI-BEHAVIOR]` (source-only) The canonical directory is `<project>/.agents/skills/<name>` for project scope and `~/.agents/skills/<name>` for global scope. Agents whose project path *is* `.agents/skills` ("universal" agents, e.g. Codex, Cursor, Gemini CLI, GitHub Copilot, OpenCode, Cline, Amp) read the canonical copy directly with no link. [SRC:installer.ts] [SRC:agents.ts] [SRC:constants.ts]
- `[CLI-BEHAVIOR]` (source-only) **Default mode is not always symlink.** When all target agents share one skills directory, the CLI uses copy mode and does not prompt; symlink mode (and the prompt) applies only when targets span more than one directory. Consequences:
  - `-a claude-code` alone: files are copied straight into `.claude/skills/<name>`; no `.agents/skills` copy is made.
  - `-a claude-code -a codex` with `-y`: canonical copy in `.agents/skills/<name>` (which Codex reads) plus a link at `.claude/skills/<name>`. Without `-y` the user is asked to pick Symlink or Copy.
  - `--copy` forces copies everywhere and is recorded in the lock as `installMode: "copy"`. [SRC:add.ts] [SRC:installer.ts]
- `[CLI-BEHAVIOR]` (source-only) Project installs skip creating a link for a non-universal agent whose config folder does not already exist in the project unless that agent was explicitly selected; Claude Code is exempt (its `.claude/skills` is created by default). [SRC:installer.ts] [SRC:agents.ts]
- `[CLI-BEHAVIOR]` (source-only) Files never installed: any file named `metadata.json`, and directories `.git`, `__pycache__`, `__pypackages__`. Symlinks inside a skill are dereferenced; links that are broken or point outside the skill folder are dropped with a warning. A skill must therefore be self-contained in its own folder. [C1] [SRC:skill-hash.ts] [SRC:installer.ts]
- `[CLI-BEHAVIOR]` Installing a second skill with the same name overwrites the first (the reason `--rename` was added). [C3]

### F.7 Repository layouts searched during discovery

`[CLI-BEHAVIOR]` Exact documented list of locations within a source repository [C2]:

- Root directory (if it contains `SKILL.md`)
- `skills/`, `skills/.curated/`, `skills/.experimental/`, `skills/.system/`
- `.aider-desk/skills/`, `.agents/skills/`, `data/skills/`, `.autohand/skills/`, `.augment/skills/`, `.bob/skills/`, `.claude/skills/`, `.codeartsdoer/skills/`, `.codebuddy/skills/`, `.codemaker/skills/`, `.codestudio/skills/`, `.commandcode/skills/`, `.continue/skills/`, `.cortex/skills/`, `.crush/skills/`, `.devin/skills/`, `agent/skills/`, `.forge/skills/`, `.goose/skills/`, `.grok/skills/`, `.hermes/skills/`, `.inferencesh/skills/`, `.jazz/skills/`, `.junie/skills/`, `.iflow/skills/`, `.kimchi/skills/`, `.kiro/skills/`, `.kode/skills/`, `.lingma/skills/`, `.mcpjam/skills/`, `.minimax/skills/`, `.vibe/skills/`, `.moxby/skills/`, `.mux/skills/`, `.openhands/skills/`, `.ona/skills/`, `.posit/assistant/skills/`, `.qoder/skills/`, `.qwen/skills/`, `.reasonix/skills/`, `.rovodev/skills/`, `.roo/skills/`, `.tabnine/agent/skills/`, `.terramind/skills/`, `.tinycloud/skills/`, `.trae/skills/`, `.windsurf/skills/`, `.zcode/skills/`, `.zencoder/skills/`, `.neovate/skills/`, `.pochi/skills/`, `.adal/skills/`

Rules [C2] unless marked:

- Each container directory is walked **up to three levels deep**: `skills/<name>/SKILL.md`, `skills/<category>/<name>/SKILL.md`, `skills/<category>/<category>/<name>/SKILL.md`. A `SKILL.md` found at a shallower level hides anything nested below it.
- `--full-depth` also finds `SKILL.md` files outside these containers (e.g. under `examples/` or `tests/`).
- If nothing is found in standard locations, a recursive search runs.
- **Plugin manifests:** skills declared in `.claude-plugin/marketplace.json` or `.claude-plugin/plugin.json` are also discovered, at their declared paths.
- **Custom paths:** a root `skills.sh.json` with `"paths": ["./tools/skills"]` adds container directories (entries must start with `./` and stay inside the repo; the repo root itself is ignored). Same three-level walk.
- When two skills share a name, only the first one found is kept.
- (source-only) A **root `SKILL.md` ends discovery** unless `--full-depth` is passed - other skills in the repo are not offered. [SRC:skills.ts]
- (source-only) Direct child folders of the repo root that contain `SKILL.md` (`<repo>/<name>/SKILL.md`) are also found (root is walked one level). [SRC:skills.ts]
- (source-only) Additional legacy containers searched but absent from the documented list: `.cline/skills`, `.codex/skills`, `.factory/skills`, `.github/skills`, `.kilo/skills`, `.kilocode/skills`, `.opencode/skills`, `.pi/skills`. [SRC:agents.ts]
- (source-only) Directories named `node_modules`, `.git`, `dist`, `build`, `__pycache__` are never descended into; the recursive fallback goes at most five levels below the search root. [SRC:skills.ts]
- (source-only) If the source repo has its own `skills-lock.json`, a skill that sits in an agent directory (such as `.claude/skills/x` or `.agents/skills/x`) and is named in that lock is treated as something the repo merely installed and is **not offered**. Publish authored skills under `skills/`. [SRC:skills.ts]

### F.8 Per-agent installation paths

`[CLI-BEHAVIOR]` From the supported-agents table [C4] (README says 4 named agents "and 75 more" [C1]):

| Agent | `--agent` id | Project path | Global path |
| --- | --- | --- | --- |
| Claude Code | `claude-code` | `.claude/skills/` | `~/.claude/skills/` |
| Codex | `codex` | `.agents/skills/` | `~/.agents/skills/` |
| Cursor | `cursor` | `.agents/skills/` | `~/.cursor/skills/` |
| GitHub Copilot | `github-copilot` | `.agents/skills/` | `~/.copilot/skills/` |
| Gemini CLI | `gemini-cli` | `.agents/skills/` | `~/.gemini/skills/` |
| OpenCode | `opencode` | `.agents/skills/` | `~/.config/opencode/skills/` |
| Amp, Replit, Universal | `amp`, `replit`, `universal` | `.agents/skills/` | `~/.config/agents/skills/` |
| Windsurf | `windsurf` | `.windsurf/skills/` | `~/.codeium/windsurf/skills/` |

- (source-only) Claude Code's global path honors `CLAUDE_CONFIG_DIR`; Codex is detected via `CODEX_HOME` (default `~/.codex`) or `/etc/codex`, but its skills path is `.agents/skills` either way. [SRC:agents.ts]
- (source-only) For universal agents that read `~/.agents/skills` globally, a global install writes only the canonical copy and nothing into the agent's own global folder. Which agents are flagged that way was not enumerated. [SRC:installer.ts]
- `[VENDOR-EXTENSION]` Cross-check, Claude Code docs: personal `~/.claude/skills/<name>/SKILL.md`, project `.claude/skills/<name>/SKILL.md`; a skill folder may be a symlink; `.agents/skills` is not listed as a Claude Code location. [V1]
- `[VENDOR-EXTENSION]` `[UNVERIFIED]` Cross-check, Codex docs (summarized): `.agents/skills` from the working directory up to the repo root, `$HOME/.agents/skills`, `/etc/codex/skills`; follows symlinked skill folders. [V2]

### F.9 Lock files

- `[CLI-BEHAVIOR]` **Project:** `skills-lock.json` at the project root, schema **version 2**, intended to be committed. Each entry has a `computedHash`: SHA-256 over the installed files (excluding `metadata.json`, `.git`, `__pycache__`, `__pypackages__`), files sorted by the UTF-8 bytes of their `/`-separated relative paths, each fed as path, NUL, byte length, NUL, content, **with CRLF normalized to LF in text files**. Used by `list`, `check` and `install --frozen-lockfile`. Test vectors are in the README. A version 1 lock is upgraded on read. [C1] [SRC:local-lock.ts] [SRC:skill-hash.ts]
- `[CLI-BEHAVIOR]` Project entry fields include `source`, `sourceType`, optional `sourceUrl`, `ref`, `skillPath`, `computedHash`, `installMode`. **HEAD-only:** `commit`, `skillName`. [SRC:local-lock.ts] [G2]
- `[CLI-BEHAVIOR]` **Global:** `~/.agents/.skill-lock.json` (or `$XDG_STATE_HOME/skills/.skill-lock.json`), schema **version 3**, keyed by skill name with `source`, `sourceUrl`, `ref`, `skillPath`, `skillFolderHash` (GitHub tree SHA), timestamps; also remembers the last selected agents. Older versions are discarded on read. [C7] [SRC:skill-lock.ts]
- `[CLI-BEHAVIOR]` Direct downloads are locked as `sourceType: "download"`; URLs with a query string or user info are not recorded. [C3]

### F.10 Telemetry

- `[CLI-BEHAVIOR]` On by default and described as anonymous. Disable with **`DISABLE_TELEMETRY=1` or `DO_NOT_TRACK=1`**; this also disables the security-audit lookups. [C1] [C5] (The code treats any non-empty value as "disabled". [SRC:telemetry.ts])
- `[CLI-BEHAVIOR]` Repository and skill identifiers for GitHub sources are sent **only when GitHub positively confirms the repo is public**; private or undeterminable repos send nothing. Other remote source types may include identifiers. Local paths and direct downloads send no install event. [C5] [SRC:add.ts]
- `[CLI-BEHAVIOR]` (source-only) Events go as GET requests to `https://www.skills.sh/tele/t`: `install` (source, skill names, agents, global flag, map of skill to its `SKILL.md` path in the repo, optional `--metadata`), `remove`, `update`, `find` (includes the search query), `experimental_sync`; plus CLI version, a `ci=1` marker when a CI variable is set, and the detected host agent name. [SRC:telemetry.ts] [SRC:ci.ts]
- `[CLI-BEHAVIOR]` (source-only) During `add`, for confirmed-public GitHub repos, the CLI queries `https://www.skills.sh/tele/audit` (3 s timeout, never blocks) and may print a table with columns Gen, Socket, Snyk. [SRC:telemetry.ts] [SRC:add.ts]
- `[VENDOR-EXTENSION]` skills.sh's CLI page says the data is skill name, skill files and a timestamp, no personal or device information, and names only `DISABLE_TELEMETRY=1`. [W2]

### F.11 Environment variables

`[CLI-BEHAVIOR]` Documented [C5] [C3]: `INSTALL_INTERNAL_SKILLS`, `DISABLE_TELEMETRY`, `DO_NOT_TRACK`, `GITHUB_TOKEN`, `GH_TOKEN`, `SKILLS_DOWNLOAD_MAX_BYTES`, `SKILLS_EXTRACT_MAX_BYTES`, `SKILLS_EXTRACT_MAX_FILES`. Source-only: `SKILLS_CLONE_TIMEOUT_MS`, `SKILLS_CLONE_CONCURRENCY`, `GH_HOST`, `XDG_STATE_HOME`, `CLAUDE_CONFIG_DIR`, `CODEX_HOME`, `SKILLS_API_URL`, `SKILLS_DOWNLOAD_URL`. [SRC:git.ts] [C7] [SRC:agents.ts] [SRC:find.ts] [SRC:blob.ts]

### F.12 Windows caveats

- `[CLI-BEHAVIOR]` Documentation says only that Copy mode is for when symlinks are not supported. [C3]
- `[CLI-BEHAVIOR]` (source-only) On Windows links are created as **directory junctions** with absolute targets; if creation fails the CLI falls back to copying the files and prints a warning that mentions enabling Developer Mode. [SRC:installer.ts] [SRC:add.ts]
- `[CLI-BEHAVIOR]` (source-only) Clones set `core.longpaths=true` to get past the 260-character path limit. [SRC:git.ts]
- `[CLI-BEHAVIOR]` The lock hash normalizes CRLF to LF, so `core.autocrlf` checkouts still match. [C1]
- `[CLI-BEHAVIOR]` `skills.sh.json` `paths` entries containing backslashes are rejected. [SRC:skills-sh-config.ts] [W10]
- `[UNVERIFIED]` (memory) Git does not store Windows junctions as symlinks, so committing a junction-linked `.claude/skills/<name>` from Windows may add a second full copy of the files rather than a link.
- `[SPEC-RECOMMENDED]` (guide) The trigger-eval example script is bash + `jq`; the quickstart shows both bash and PowerShell command variants inside one skill. [S4] [S7]

---

## G. skills.sh

### G.1 What it is

- `[VENDOR-EXTENSION]` A directory and leaderboard for agent skills operated by Vercel; it says it indexes public skills that ship through the `skills` CLI and ranks them by anonymous install telemetry. Views: All Time, Trending (24h), Hot. [W7] [W1] [W11]
- `[VENDOR-EXTENSION]` A skill page shows the install command, a summary, the `SKILL.md`, install count, repository, GitHub stars, "First Seen" date, and partner security-audit results. [W11] [W7]

### G.2 How a repo or skill gets listed

- `[VENDOR-EXTENSION]` Listing is **automatic via install telemetry**: skills appear when users run `npx skills add <owner/repo>`; the FAQ describes no submission form or approval step. Ranking is by install count. [W3] [W1]
- `[VENDOR-EXTENSION]` Counts are deduplicated ("total deduplicated install count"); deduplication runs hourly. [W6] [W7]
- `[CLI-BEHAVIOR]` Combined with F.10: an install is reported only if telemetry is enabled and (for GitHub) the repo is confirmed public. Installs from local paths, private repos, or with telemetry disabled cannot create or advance a listing. [C5] [SRC:add.ts]
- `[VENDOR-EXTENSION]` A repository page (`https://skills.sh/<owner>/<repo>`) lists every skill the site has seen from that GitHub repo. Skill page URL pattern: `https://skills.sh/<owner>/<repo>/<skill-slug>`. [W4] [W6]
- `[VENDOR-EXTENSION]` Badge: `https://skills.sh/b/<owner>/<repo>` linking to `https://skills.sh/<owner>/<repo>`. [W1]
- `[VENDOR-EXTENSION]` `skills.sh.json` at the repo root on the default branch groups skills on the repo page (`groupings` with `title`, optional `description`, `skills`; `notGrouped` `top` or `bottom`). Open to any listed public GitHub repo with no approval or allowlist. It is picked up only after an install with telemetry enabled, and pages are cached. The schema requires at least one of `groupings` or `paths`. [W4] [W10]
- `[UNVERIFIED]` Not stated on any fetched page: how long after a first install a page appears, any minimum install threshold, whether installs flagged `ci=1` count, and how removal or de-listing can be requested.

### G.3 Review, certification, benchmarks, audits

- `[VENDOR-EXTENSION]` Security: "routine" audits by partner providers assess skills for malicious content; results are public on each skill page. The site states it cannot guarantee the quality or security of any listed skill and tells users to review skills before installing. Security issues are reported via security.vercel.com. [W1] [W7]
- `[VENDOR-EXTENSION]` Skills that fail **every** partner audit are excluded from the directory. [W7]
- `[VENDOR-EXTENSION]` Audit partners: the `/audits` page and the CLI table show Gen Agent Trust Hub, Socket and Snyk; the API docs additionally name Runlayer and ZeroLeaks. Verdicts are `pass` / `warn` / `fail` with a risk level. Audits are generated automatically after a skill is first installed, with a delay of a few minutes; the audit endpoint returns 404 until then. [W8] [W6]
- `[VENDOR-EXTENSION]` "Official" (`/official`, API `/api/v1/skills/curated`) is a curated set of first-party skills from the organizations that build the technology concerned. `[UNVERIFIED]` Criteria and how to be added are not stated on the fetched pages. [W9] [W6]
- `[VENDOR-EXTENSION]` The API flags detected forks or copies with `isDuplicate: true`. [W6]
- `[UNVERIFIED]` No fetched skills.sh page mentions any human review, quality certification, verification badge, or benchmark of skill effectiveness. Absence on the pages read is not proof that none exists elsewhere.
- **Wording that the sources support:** "installable with `npx skills add <owner>/<repo>`" (true for any public repo with a valid layout); "appears on skills.sh once installs with telemetry enabled have been recorded"; "automated third-party security audit results are shown on skills.sh". **Not supported:** "approved", "certified", "verified", "reviewed by Vercel/skills.sh", "official" (unless actually on the curated list), or any quality or benchmark claim. A passing audit is an automated scan result, not an endorsement.

### G.4 Other skills.sh features

- `[VENDOR-EXTENSION]` Packs: unlisted (not access-controlled) collections installed with `npx skills add https://skills.sh/p/<pack-id>`; creating one requires signing in with Vercel; included skills need `name` and `description`; binary files and files over 2 MB are omitted. [W5] [W3]
- `[VENDOR-EXTENSION]` REST API under `https://skills.sh/api/v1/` (leaderboard, search, curated, skill detail with files and hash, audits) requires a Vercel OIDC token; 600 requests per minute per team and project. The skill detail response exposes the full file contents of listed skills. [W6]

---

## H. Places where the sources disagree

| Topic | Source A | Source B | Take-away |
| --- | --- | --- | --- |
| `skills-ref` install and command | Repo README: install from checkout, command `skills-ref`, version 0.1.0 [R1] | PyPI 0.1.1 description: `pip install skills-ref`, command `agentskills` [R2] | Unresolved; pin the Git source or test the PyPI wheel before documenting a command |
| Characters allowed in `name` | Spec: lowercase `a-z`, `0-9`, hyphen [S1] | Validator: any Unicode alphanumeric, lowercase [R1] | Use ASCII |
| Is `name` required | Spec: yes, must match the folder [S1] | Claude Code: optional, defaults to folder [V1]; `skills` CLI: required but unvalidated [SRC:skills.ts] | Always set it and match the folder |
| Unknown frontmatter keys | Validator and claude.ai/API upload: hard error [R1] [V1] | Claude Code and `skills` CLI: ignored [V1] [SRC:skills.ts] | Stick to the six spec keys; put extras under `metadata` |
| `allowed-tools` syntax | Spec: space-separated string, experimental [S1] | Claude Code: also comma-separated or YAML list [V1] | Use the space-separated string |
| `skills.sh.json` effect | skills.sh customize page: display only, does not change CLI installs [W4] | CLI docs and the schema: `paths` adds CLI discovery directories [C2] [W10] | `groupings` is display-only; `paths` affects the CLI |
| Telemetry opt-out | skills.sh: `DISABLE_TELEMETRY=1` only [W2] | CLI README: also `DO_NOT_TRACK=1` [C1] | Either works |
| Telemetry default | CLI docs: collected by default [C1] [C5] | skills.sh About: says "when users opt in" [W7] | Code is on by default [SRC:telemetry.ts] |
| Discovery directory list | Documented list [C2] | Code adds eight legacy directories and the root's direct children [SRC:agents.ts] [SRC:skills.ts] | Use `skills/<name>/` to be safe |
| Flags on `main` vs npm | `--rename`, lock `commit` in README and commands.md [C1] [C3] | Committed after the 1.8.1 release commit [G2] | Do not rely on them with `skills@1.8.1` |
| Tier-1 token estimate | about 100 tokens [S1] | 50-100 tokens per skill [S6] | Same order of magnitude |

## I. Things I could not verify

- Console-script name and contents of the PyPI `skills-ref` 0.1.1 wheel.
- Whether the npm 1.8.1 tarball excludes the two HEAD-only features (inferred from `gitHead` only).
- skills.sh processing delays, thresholds, treatment of CI installs, criteria for "Official", de-listing.
- Codex documentation details (seen only via a summarizer after a redirect to another host).
- `strictyaml` restrictions, Windows junction/git behavior, and Windows text-encoding behavior of `skills-ref` (memory or inference; each is tagged inline).
- The `skill-creator` skill's own eval file schemas, `docs/api.md` beyond ref pinning, and the unread parts of `add.ts`, `installer.ts`, `update.ts`, `sync.ts`, `remove.ts`, `list.ts`.

[S1]: https://agentskills.io/specification
[S2]: https://agentskills.io/skill-creation/best-practices
[S3]: https://agentskills.io/skill-creation/evaluating-skills
[S4]: https://agentskills.io/skill-creation/optimizing-descriptions
[S5]: https://agentskills.io/skill-creation/using-scripts
[S6]: https://agentskills.io/client-implementation/adding-skills-support
[S7]: https://agentskills.io/skill-creation/quickstart
[S8]: https://agentskills.io/home
[S9]: https://agentskills.io/llms.txt
[W1]: https://skills.sh/docs
[W2]: https://skills.sh/docs/cli
[W3]: https://skills.sh/docs/faq
[W4]: https://skills.sh/docs/customize
[W5]: https://skills.sh/docs/packs
[W6]: https://skills.sh/docs/api
[W7]: https://skills.sh/about
[W8]: https://skills.sh/audits
[W9]: https://skills.sh/official
[W10]: https://skills.sh/schemas/skills.sh.schema.json
[W11]: https://skills.sh/vercel-labs/skills/find-skills
[C1]: https://github.com/vercel-labs/skills/blob/b716f9dc2ba36b6aa8f0080615e5a3a6caeac63b/README.md
[C2]: https://github.com/vercel-labs/skills/blob/b716f9dc2ba36b6aa8f0080615e5a3a6caeac63b/docs/creating-skills.md
[C3]: https://github.com/vercel-labs/skills/blob/b716f9dc2ba36b6aa8f0080615e5a3a6caeac63b/docs/commands.md
[C4]: https://github.com/vercel-labs/skills/blob/b716f9dc2ba36b6aa8f0080615e5a3a6caeac63b/docs/agents.md
[C5]: https://github.com/vercel-labs/skills/blob/b716f9dc2ba36b6aa8f0080615e5a3a6caeac63b/docs/troubleshooting.md
[C6]: https://github.com/vercel-labs/skills/blob/b716f9dc2ba36b6aa8f0080615e5a3a6caeac63b/docs/api.md
[C7]: https://github.com/vercel-labs/skills/blob/b716f9dc2ba36b6aa8f0080615e5a3a6caeac63b/AGENTS.md
[SRC:add.ts]: https://github.com/vercel-labs/skills/blob/b716f9dc2ba36b6aa8f0080615e5a3a6caeac63b/src/add.ts
[SRC:agents.ts]: https://github.com/vercel-labs/skills/blob/b716f9dc2ba36b6aa8f0080615e5a3a6caeac63b/src/agents.ts
[SRC:blob.ts]: https://github.com/vercel-labs/skills/blob/b716f9dc2ba36b6aa8f0080615e5a3a6caeac63b/src/blob.ts
[SRC:ci.ts]: https://github.com/vercel-labs/skills/blob/b716f9dc2ba36b6aa8f0080615e5a3a6caeac63b/src/ci.ts
[SRC:cli.ts]: https://github.com/vercel-labs/skills/blob/b716f9dc2ba36b6aa8f0080615e5a3a6caeac63b/src/cli.ts
[SRC:constants.ts]: https://github.com/vercel-labs/skills/blob/b716f9dc2ba36b6aa8f0080615e5a3a6caeac63b/src/constants.ts
[SRC:detect-agent.ts]: https://github.com/vercel-labs/skills/blob/b716f9dc2ba36b6aa8f0080615e5a3a6caeac63b/src/detect-agent.ts
[SRC:find.ts]: https://github.com/vercel-labs/skills/blob/b716f9dc2ba36b6aa8f0080615e5a3a6caeac63b/src/find.ts
[SRC:frontmatter.ts]: https://github.com/vercel-labs/skills/blob/b716f9dc2ba36b6aa8f0080615e5a3a6caeac63b/src/frontmatter.ts
[SRC:git.ts]: https://github.com/vercel-labs/skills/blob/b716f9dc2ba36b6aa8f0080615e5a3a6caeac63b/src/git.ts
[SRC:github-host.ts]: https://github.com/vercel-labs/skills/blob/b716f9dc2ba36b6aa8f0080615e5a3a6caeac63b/src/github-host.ts
[SRC:installer.ts]: https://github.com/vercel-labs/skills/blob/b716f9dc2ba36b6aa8f0080615e5a3a6caeac63b/src/installer.ts
[SRC:local-lock.ts]: https://github.com/vercel-labs/skills/blob/b716f9dc2ba36b6aa8f0080615e5a3a6caeac63b/src/local-lock.ts
[SRC:providers/wellknown.ts]: https://github.com/vercel-labs/skills/blob/b716f9dc2ba36b6aa8f0080615e5a3a6caeac63b/src/providers/wellknown.ts
[SRC:sanitize.ts]: https://github.com/vercel-labs/skills/blob/b716f9dc2ba36b6aa8f0080615e5a3a6caeac63b/src/sanitize.ts
[SRC:skill-hash.ts]: https://github.com/vercel-labs/skills/blob/b716f9dc2ba36b6aa8f0080615e5a3a6caeac63b/src/skill-hash.ts
[SRC:skill-lock.ts]: https://github.com/vercel-labs/skills/blob/b716f9dc2ba36b6aa8f0080615e5a3a6caeac63b/src/skill-lock.ts
[SRC:skills-sh-config.ts]: https://github.com/vercel-labs/skills/blob/b716f9dc2ba36b6aa8f0080615e5a3a6caeac63b/src/skills-sh-config.ts
[SRC:skills.ts]: https://github.com/vercel-labs/skills/blob/b716f9dc2ba36b6aa8f0080615e5a3a6caeac63b/src/skills.ts
[SRC:source-parser.ts]: https://github.com/vercel-labs/skills/blob/b716f9dc2ba36b6aa8f0080615e5a3a6caeac63b/src/source-parser.ts
[SRC:telemetry.ts]: https://github.com/vercel-labs/skills/blob/b716f9dc2ba36b6aa8f0080615e5a3a6caeac63b/src/telemetry.ts
[N1]: https://registry.npmjs.org/skills/latest
[G1]: https://api.github.com/repos/vercel-labs/skills/commits/main
[G2]: https://api.github.com/repos/vercel-labs/skills/compare/e781cb4d07433dfe1d19e924ed45cc61738c55ec...b716f9dc2ba36b6aa8f0080615e5a3a6caeac63b
[R1]: https://github.com/agentskills/agentskills/tree/83021e2be457a9b6679148719c1f6074f0ad975e/skills-ref
[R2]: https://pypi.org/pypi/skills-ref/json
[R3]: https://github.com/agentskills/agentskills/blob/83021e2be457a9b6679148719c1f6074f0ad975e/GOVERNANCE.md
[V1]: https://code.claude.com/docs/en/skills
[V2]: https://learn.chatgpt.com/docs/build-skills
