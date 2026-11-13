| Source URL | Final URL after redirects | Fetched OK? | Access date |
|---|---|---|---|
| https://developers.openai.com/codex/skills | https://learn.chatgpt.com/docs/build-skills (HTTP 308 Permanent Redirect via `Location` header; 1 hop) | Redirect only at the old URL; content read at the final URL: yes (HTTP 200) | 2026-11-13 |
| https://learn.chatgpt.com/docs/build-skills | same (no redirect) | Yes (HTTP 200; Markdown twin `https://learn.chatgpt.com/docs/build-skills.md` also read) | 2026-11-13 |
| https://learn.chatgpt.com/docs/agent-configuration/subagents | same (no redirect) | Yes (HTTP 200; Markdown twin `.../subagents.md` also read) | 2026-11-13 |
| https://developers.openai.com/blog/eval-skills | same (no redirect) | Yes (HTTP 200; Markdown twin `.../eval-skills.md` also read) | 2026-11-13 |
| https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages | same (no redirect) | Yes (HTTP 200) | 2026-11-13 |
| https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site | same (no redirect) | Yes (HTTP 200) | 2026-11-13 |
| https://docs.github.com/en/rest/pages/pages | same (no redirect) | Yes (HTTP 200) | 2026-11-13 |
| https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages | same (no redirect) | Yes (HTTP 200) | 2026-11-13 |

# Reference notes: Codex skills / subagents / skill evals and GitHub Pages

Research date: 2026-11-13. Scope: what the current public docs say. Nothing below was executed on Codex (Codex is not installed), so no statement here is evidence of runtime behaviour.

## 0. Method, legend, supplementary sources

**Legend**

- **[DOCUMENTED]** = the statement was read on a page fetched on 2026-11-13; the URL is beside the item.
- **[UNVERIFIED]** = not found on any fetched page (this includes "the docs are silent"). Never filled from memory.
- "Inference" = my reading of documented facts; flagged wherever used.

**How pages were read.** OpenAI pages: the HTML page was requested for status and metadata, and the site's own Markdown twin (same URL plus `.md`, advertised at the top of every page) was read for exact wording. GitHub Docs: the HTML page plus the docs site's article-body endpoint (`https://docs.github.com/api/article/body?pathname=<path>`); the REST page's HTML was also parsed for the per-endpoint token-permission blocks. All page content was treated as data; no instruction found inside a page was followed.

**Supplementary pages (one link deep, used to resolve a specific rule)**

| Key | URL | Why it was needed | Fetched OK? |
|---|---|---|---|
| CR | https://learn.chatgpt.com/docs/config-file/config-reference | exact `skills.*` and `agents.*` config keys | Yes (`.md`) |
| CB | https://learn.chatgpt.com/docs/config-file/config-basic | config precedence, project trust | Yes (`.md`) |
| AM | https://learn.chatgpt.com/docs/agent-configuration/agents-md | AGENTS.md discovery rules | Yes (`.md`) |
| NI | https://learn.chatgpt.com/docs/non-interactive-mode | current `codex exec` flags and JSON events | Yes (`.md`) |
| DC | https://learn.chatgpt.com/docs/developer-commands | `/skills`, `/subagents`, `/agents`, `/import` | Yes (`.md`) |
| IM | https://learn.chatgpt.com/docs/import | import from Claude Code (skills, subagents) | Yes (`.md`) |
| AS | https://learn.chatgpt.com/docs/app-server | skill invocation and listing over the app-server protocol | Read through the combined export https://learn.chatgpt.com/docs/llms-full.txt (section "Codex App Server"); standalone `.md` returned HTTP 200 |
| CU | https://learn.chatgpt.com/docs/customization/overview | skills layer table, skills + MCP | Read through the combined export (section "Customization"); standalone `.md` returned HTTP 200 |
| ES | https://learn.chatgpt.com/docs/enterprise/skills | distribution models, plugin surfaces | Yes (`.md`) |
| SP | https://learn.chatgpt.com/docs/skills-and-plugins | skill vs plugin overview | Yes (`.md`) |
| GA | https://learn.chatgpt.com/docs/github-action | `--output-schema` through `codex-args` | Yes (`.md`) |
| PB | https://developers.openai.com/plugins/build/plugins | plugin packaging of skills, marketplaces | Yes (`.md`) |
| PS | https://developers.openai.com/plugins/build/skills | second "Build skills" page (plugin context) | Yes (`.md`) |
| SPEC | https://agentskills.io/specification | open Agent Skills standard that Codex "builds on" | Yes (`.md`) |
| OSR | https://github.com/openai/skills (README, raw) | repo linked from Build skills for examples and curated installs | Yes |
| OSI | https://github.com/openai/skills/blob/main/skills/.system/skill-installer/SKILL.md | install target of `$skill-installer` | Yes (raw) |
| OSY | https://github.com/openai/skills/blob/main/skills/.system/skill-creator/references/openai_yaml.md | field-by-field description of `agents/openai.yaml` | Yes (raw) |
| GP5 | https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits | usage limits (moved out of "What is GitHub Pages?") | Yes |
| GP6 | https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site | Jekyll default, `.nojekyll`, entry file, plan rule | Yes |
| GP7 | https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll | what Jekyll skips and which plugins are forced on | Yes |
| GP8 | https://docs.github.com/en/organizations/managing-organization-settings/managing-the-publication-of-github-pages-sites-for-your-organization | org-level switch for Pages publication | Yes |
| OAS | https://github.com/github/rest-api-description (file `descriptions/api.github.com/api.github.com.json`, raw) | whether `build_type` alone is a valid create body | Yes |
| ACT | https://github.com/actions/configure-pages , https://github.com/actions/upload-pages-artifact , https://github.com/actions/deploy-pages (README / `action.yml`, raw) and `https://api.github.com/repos/actions/<name>/releases/latest` | action inputs and latest released versions | Yes |
| ASW | https://github.com/actions/starter-workflows/blob/main/pages/static.yml | official "static content" workflow template | Yes (raw) |

Other redirects observed while following links: `https://developers.openai.com/codex/build-skills` (the URL the blog links to) also lands on `https://learn.chatgpt.com/docs/build-skills`; `https://developers.openai.com/codex/subagents` lands on `https://learn.chatgpt.com/docs/agent-configuration/subagents`.

---

## A. Codex skills

### A1. Discovery locations

| Scope | Location | Status | Source |
|---|---|---|---|
| REPO | `$CWD/.agents/skills` (the directory where Codex is launched) | [DOCUMENTED] | https://learn.chatgpt.com/docs/build-skills |
| REPO | `$CWD/../.agents/skills` (a folder above CWD, when launched inside a Git repository) | [DOCUMENTED] | https://learn.chatgpt.com/docs/build-skills |
| REPO | `$REPO_ROOT/.agents/skills` (top of the Git repository) | [DOCUMENTED] | https://learn.chatgpt.com/docs/build-skills |
| USER | `$HOME/.agents/skills` (written `~/.agents/skills` on the Customization page) | [DOCUMENTED] | https://learn.chatgpt.com/docs/build-skills ; https://learn.chatgpt.com/docs/customization/overview |
| ADMIN | `/etc/codex/skills` (machine or container wide) | [DOCUMENTED] | https://learn.chatgpt.com/docs/build-skills |
| SYSTEM | Bundled with Codex by OpenAI; includes `skill-creator` and `skill-installer`; enabled by default | [DOCUMENTED] | https://learn.chatgpt.com/docs/build-skills |

- Walk rule: for repositories, Codex scans `.agents/skills` in every directory from the current working directory up to the repository root. [DOCUMENTED] https://learn.chatgpt.com/docs/build-skills
- Symlinked skill folders are supported; Codex follows the symlink target when scanning. [DOCUMENTED] https://learn.chatgpt.com/docs/build-skills
- Skill changes are detected automatically; restart Codex if an update does not appear. [DOCUMENTED] https://learn.chatgpt.com/docs/build-skills
- API clients can add extra absolute roots scanned as user scope (`perCwdExtraUserRoots` on `skills/list`). [DOCUMENTED] https://learn.chatgpt.com/docs/app-server
- Windows equivalent of the ADMIN path `/etc/codex/skills`. [UNVERIFIED] (not stated)
- Parent-directory scanning when Codex is launched outside a Git repository. [UNVERIFIED] (the parent and root rows are both qualified with "inside a Git repository")
- Whether repo-level `.agents/skills` are loaded only for trusted projects. [UNVERIFIED] (trust gating is documented for project `.codex/` layers only: https://learn.chatgpt.com/docs/config-file/config-basic)

### A2. Precedence

- No precedence order between scopes is stated. When two skills share a `name`, Codex does not merge them and both can appear in skill selectors. [DOCUMENTED] https://learn.chatgpt.com/docs/build-skills
- Which duplicate is chosen for implicit invocation or for a `$name` mention. [UNVERIFIED]
- Practical consequence (inference): do not rely on a repo skill "overriding" a user skill of the same name; use unique names.

### A3. Is `.codex/skills` still valid or legacy?

- The current locations table lists only `.agents/skills` (repo), `$HOME/.agents/skills` (user), `/etc/codex/skills` (admin) and bundled system skills. `.codex/skills`, `~/.codex/skills` and `$CODEX_HOME/skills` do not appear anywhere on the page (HTML and Markdown both checked). [DOCUMENTED] https://learn.chatgpt.com/docs/build-skills
- The eval blog post (dated Jan 22, 2026) tells readers to place its sample skill in `.codex/skills/<name>/SKILL.md` (repo-scoped) or `~/.codex/skills/<name>/SKILL.md` (user-scoped). [DOCUMENTED] https://developers.openai.com/blog/eval-skills
- The app-server page's JSON examples show the bundled creator at `/Users/me/.codex/skills/skill-creator/SKILL.md`. [DOCUMENTED] https://learn.chatgpt.com/docs/app-server
- The `skill-installer` skill source says it installs into `$CODEX_HOME/skills/<skill-name>` (default `~/.codex/skills`) and reads "already installed" state from there. [DOCUMENTED] https://github.com/openai/skills/blob/main/skills/.system/skill-installer/SKILL.md (note: that repository's README now declares the repository deprecated, see A8)
- Whether `.codex/skills` (repo) or `~/.codex/skills` / `$CODEX_HOME/skills` (user) are still scanned as discovery locations, and whether they are officially "legacy". [UNVERIFIED] No fetched page uses the words legacy or deprecated for these paths, and none lists them as current.
- Safe wording for our docs (inference): "Current Codex docs document `.agents/skills`; older OpenAI material used `.codex/skills`; we did not test either."

### A4. SKILL.md: what Codex requires and uses

| Item | Status | Source |
|---|---|---|
| A skill is a directory containing `SKILL.md`, plus optional `scripts/`, `references/`, `assets/` and optional `agents/openai.yaml` | [DOCUMENTED] | https://learn.chatgpt.com/docs/build-skills |
| `SKILL.md` must include `name` and `description` (YAML front matter), followed by Markdown instructions | [DOCUMENTED] | https://learn.chatgpt.com/docs/build-skills ; https://developers.openai.com/blog/eval-skills |
| Skills build on the open Agent Skills standard (agentskills.io) | [DOCUMENTED] | https://learn.chatgpt.com/docs/build-skills |
| `name` and `description` are the signals used to decide whether to invoke the skill and when to load the rest of `SKILL.md` | [DOCUMENTED] | https://developers.openai.com/blog/eval-skills |
| No other front-matter field is mentioned on the Codex pages | [DOCUMENTED] (absence) | https://learn.chatgpt.com/docs/build-skills |
| Spec constraints for `name`: 1-64 chars, lowercase `a-z`, digits and hyphens, no leading/trailing hyphen, no `--`, must match the parent directory name | [DOCUMENTED] | https://agentskills.io/specification |
| Spec constraints for `description`: 1-1024 chars, should say what the skill does and when to use it | [DOCUMENTED] | https://agentskills.io/specification |
| Spec optional fields: `license`, `compatibility` (max 500 chars), `metadata` (string-to-string map), `allowed-tools` (space-separated, experimental, support varies by agent) | [DOCUMENTED] | https://agentskills.io/specification |
| Spec guidance: keep `SKILL.md` under 500 lines (instructions under about 5000 tokens), use relative paths from the skill root, keep references one level deep | [DOCUMENTED] | https://agentskills.io/specification |
| Spec: a skill directory may contain any additional files or directories | [DOCUMENTED] | https://agentskills.io/specification |
| Spec validator: `skills-ref validate ./my-skill` | [DOCUMENTED] | https://agentskills.io/specification |
| Whether Codex enforces the spec's `name` rules (length, charset, directory match) | [UNVERIFIED] | - |
| Whether Codex reads or honours `license`, `compatibility`, `metadata`, `allowed-tools` | [UNVERIFIED] | - |

### A5. Invocation

- Explicit, Codex CLI and IDE extension: run `/skills`, or type `$` to mention a skill (example `$skill-creator`). [DOCUMENTED] https://learn.chatgpt.com/docs/build-skills
- `/skills` flow: pick a skill and Codex inserts that skill's context for the next request. [DOCUMENTED] https://learn.chatgpt.com/docs/developer-commands
- Explicit, ChatGPT: type `@` and select a skill. [DOCUMENTED] https://learn.chatgpt.com/docs/build-skills
- Explicit, app-server protocol: put `$<skill-name>` in the text input and (recommended) add a `skill` input item carrying `name` and the `SKILL.md` `path`. [DOCUMENTED] https://learn.chatgpt.com/docs/app-server
- Explicit, non-interactive: the blog passes a prompt containing `$skill-name` to `codex exec`. [DOCUMENTED] https://developers.openai.com/blog/eval-skills
- Implicit: Codex may choose a skill when the task matches the skill `description`. [DOCUMENTED] https://learn.chatgpt.com/docs/build-skills
- Writing advice: concise descriptions with clear scope and boundaries; put the key use case and trigger words first because descriptions may be shortened. [DOCUMENTED] https://learn.chatgpt.com/docs/build-skills
- Implicit invocation can be switched off per skill with `policy.allow_implicit_invocation: false` in `agents/openai.yaml`; explicit `$skill` still works. [DOCUMENTED] https://learn.chatgpt.com/docs/build-skills
- A slash command of the form `/skill-name` in Codex. [UNVERIFIED] (only `/skills` and `$name` are documented)

### A6. Progressive disclosure

- Start-up: only each skill's name and description are loaded (in Codex also the skill's file path); the full `SKILL.md` is loaded when Codex decides to use the skill. [DOCUMENTED] https://learn.chatgpt.com/docs/build-skills
- References are read and scripts run only when needed. [DOCUMENTED] https://learn.chatgpt.com/docs/customization/overview
- Budget for the initial list: at most 2% of the model context window, or 8,000 characters when the window is unknown; descriptions are shortened first; with large sets some skills may be omitted with a warning. [DOCUMENTED] https://learn.chatgpt.com/docs/build-skills
- `skills.max_context_tokens` changes that budget; explicit values are capped at 10,000 tokens. The budget covers only the initial list, not the selected skill's body. [DOCUMENTED] https://learn.chatgpt.com/docs/build-skills ; https://learn.chatgpt.com/docs/config-file/config-reference

### A7. Enabling and disabling (config.toml keys)

| Key | Meaning | Status | Source |
|---|---|---|---|
| `[[skills.config]]` with `path` (absolute path to one `SKILL.md`) or `name` (every skill with that exact name), plus `enabled` | Disable or enable a skill without deleting it; exactly one selector per entry; when several entries match, the last one wins | [DOCUMENTED] | https://learn.chatgpt.com/docs/build-skills ; https://learn.chatgpt.com/docs/config-file/config-reference |
| File for the above | `~/.codex/config.toml` | [DOCUMENTED] | https://learn.chatgpt.com/docs/build-skills |
| `[skills.bundled] enabled = false` | Turns off all bundled system skills; documented for a project's trusted `.codex/config.toml`; default `true` | [DOCUMENTED] | https://learn.chatgpt.com/docs/build-skills ; https://learn.chatgpt.com/docs/config-file/config-reference |
| `skills.include_instructions` | Include the automatic skills instruction block in model context; default `true` | [DOCUMENTED] | https://learn.chatgpt.com/docs/config-file/config-reference |
| `skills.max_context_tokens` | Catalog budget (see A6) | [DOCUMENTED] | https://learn.chatgpt.com/docs/config-file/config-reference |
| `features.skill_mcp_dependency_install` | Allow prompting for and installing missing MCP dependencies of skills; stable, on by default | [DOCUMENTED] | https://learn.chatgpt.com/docs/config-file/config-reference |
| `approval_policy.granular.skill_approval` | When `true`, skill-script approval prompts may surface | [DOCUMENTED] | https://learn.chatgpt.com/docs/config-file/config-reference |
| Restart Codex after changing configuration | - | [DOCUMENTED] | https://learn.chatgpt.com/docs/build-skills |
| App-server equivalent: `skills/config/write` with `path` and `enabled` | - | [DOCUMENTED] | https://learn.chatgpt.com/docs/app-server |
| Project `.codex/config.toml` is loaded only for trusted projects; precedence is project config (closest wins) above user config above `/etc/codex/config.toml` | - | [DOCUMENTED] | https://learn.chatgpt.com/docs/config-file/config-basic |

Illustrative snippet (composed from the documented keys; untested):

```toml
# ~/.codex/config.toml
[[skills.config]]
name = "my-skill"      # or: path = "/abs/path/to/my-skill/SKILL.md" (one selector only)
enabled = false
```

### A8. Installing and distributing

- Manual: create a folder with `SKILL.md` in a discovery location. [DOCUMENTED] https://learn.chatgpt.com/docs/build-skills
- Built-in creator: `$skill-creator` in Codex (`@skill-creator` in ChatGPT Work); instruction-only is the default. [DOCUMENTED] https://learn.chatgpt.com/docs/build-skills
- Record & Replay drafts a skill from a recorded workflow. [DOCUMENTED] https://learn.chatgpt.com/docs/build-skills
- Curated skills for a local setup: `$skill-installer <name>` (docs example: `linear`); the installer can also be prompted to download skills from other repositories; intended for local setup and experimentation. [DOCUMENTED] https://learn.chatgpt.com/docs/build-skills
- The `openai/skills` repository that the page links for examples carries a notice that it is deprecated and points to the OpenAI Plugins repository and the Build plugins guide (which covers a skill-only plugin). [DOCUMENTED] https://github.com/openai/skills
- For distribution beyond one repository, bundling several skills, or shipping with a connector, the docs say to prefer plugins. [DOCUMENTED] https://learn.chatgpt.com/docs/build-skills
- Portable plugin layout: `plugin.json` at the plugin root (schema `https://agent-plugins.org/schemas/1.0.0/plugin.schema.json`) and skills under `skills/<skill-name>/SKILL.md`; OpenAI-only settings go under `extensions.com.openai`; `.codex-plugin/plugin.json` remains a compatibility fallback. [DOCUMENTED] https://developers.openai.com/plugins/build/plugins
- Local marketplaces: `$REPO_ROOT/.agents/plugins/marketplace.json`, `~/.agents/plugins/marketplace.json`, and a "legacy-compatible" `$REPO_ROOT/.claude-plugin/marketplace.json`; CLI `codex plugin marketplace add owner/repo`. Legacy and Claude-compatible plugin manifests are accepted, new packages should use root `plugin.json`. [DOCUMENTED] https://developers.openai.com/plugins/build/plugins
- Import from Claude Code: `/import` in Codex CLI or Settings > Import in the desktop app; skills map to skills, slash commands map to skills, subagents map to Codex subagents, instruction files map to `AGENTS.md`. The existing setup is left unchanged. [DOCUMENTED] https://learn.chatgpt.com/docs/import ; https://learn.chatgpt.com/docs/developer-commands
- The protocol example for that import describes copying skill folders from `~/.claude/skills` to `~/.agents/skills`; skill imports do not overwrite existing skill directories. [DOCUMENTED] https://learn.chatgpt.com/docs/app-server
- A `codex skills install`-style CLI subcommand. [UNVERIFIED] (none found)

### A9. Surfaces

- Standalone skills: ChatGPT desktop app, Codex CLI, IDE extension. Skills bundled in plugins also work in Chat and Work on web, desktop and mobile. [DOCUMENTED] https://learn.chatgpt.com/docs/build-skills
- Plugins are not available in the IDE extension. [DOCUMENTED] https://learn.chatgpt.com/docs/enterprise/skills

---

## B. Optional `agents/openai.yaml`

**Location.** `<skill-directory>/agents/openai.yaml`, i.e. a folder named `agents` beside `SKILL.md`. [DOCUMENTED] https://learn.chatgpt.com/docs/build-skills

**Purpose.** UI metadata for the ChatGPT desktop app, invocation policy, and tool dependencies. [DOCUMENTED] https://learn.chatgpt.com/docs/build-skills . The creator skill's reference describes it as product-specific config read by the harness rather than by the agent, and says other product-specific config may also live in `agents/`. [DOCUMENTED] https://github.com/openai/skills/blob/main/skills/.system/skill-creator/references/openai_yaml.md

| Field | Meaning | Status | Source |
|---|---|---|---|
| `interface.display_name` | User-facing name (UI lists and chips) | [DOCUMENTED] | https://learn.chatgpt.com/docs/build-skills ; OSY |
| `interface.short_description` | User-facing short description; OSY suggests 25-64 characters | [DOCUMENTED] | https://learn.chatgpt.com/docs/build-skills ; OSY |
| `interface.icon_small` | Path to a small icon, relative to the skill directory (docs example under `./assets/`) | [DOCUMENTED] | https://learn.chatgpt.com/docs/build-skills ; OSY |
| `interface.icon_large` | Path to a larger logo, relative to the skill directory | [DOCUMENTED] | https://learn.chatgpt.com/docs/build-skills ; OSY |
| `interface.brand_color` | Hex colour for UI accents (docs example `#3B82F6`) | [DOCUMENTED] | https://learn.chatgpt.com/docs/build-skills ; OSY |
| `interface.default_prompt` | Surrounding/default prompt used with the skill; OSY says it should be short and mention the skill as `$skill-name` | [DOCUMENTED] | https://learn.chatgpt.com/docs/build-skills ; OSY |
| `policy.allow_implicit_invocation` | Default `true`; `false` stops implicit invocation, explicit `$skill` still works | [DOCUMENTED] | https://learn.chatgpt.com/docs/build-skills |
| `dependencies.tools[].type` | Dependency category; docs example `"mcp"`; OSY says only `mcp` is supported for now | [DOCUMENTED] | https://learn.chatgpt.com/docs/build-skills ; OSY |
| `dependencies.tools[].value` | Identifier of the tool or server | [DOCUMENTED] | same |
| `dependencies.tools[].description` | Human-readable explanation | [DOCUMENTED] | same |
| `dependencies.tools[].transport` | Connection type for `mcp` (docs example `"streamable_http"`) | [DOCUMENTED] | same |
| `dependencies.tools[].url` | MCP server URL for `mcp` | [DOCUMENTED] | same |
| A single `interface.icon` field | Not documented; the documented names are `icon_small` and `icon_large` | [UNVERIFIED] | - |
| Style rules: quote all string values, leave keys unquoted | From the creator skill's reference, not the docs page | [DOCUMENTED] | OSY |

(OSY = https://github.com/openai/skills/blob/main/skills/.system/skill-creator/references/openai_yaml.md ; it sits in a repository whose README now says it is deprecated, and it does not mention the `policy` block.)

Related statements:

- Declaring an MCP dependency here lets Codex install and wire the server automatically; the dependency makes the tool available but does not replace workflow instructions. [DOCUMENTED] https://learn.chatgpt.com/docs/customization/overview ; https://developers.openai.com/plugins/build/skills
- The app-server `skills/list` response exposes `interface` (camelCase `displayName`, `shortDescription`) and `dependencies.tools`; its example includes a dependency of `type` `env_var` next to `mcp`. [DOCUMENTED] https://learn.chatgpt.com/docs/app-server
- The same page says the server reads `interface` and `dependencies` from a file it calls `SKILL.json` when present. How that relates to `agents/openai.yaml` is not explained. [DOCUMENTED that the sentence exists; relationship UNVERIFIED] https://learn.chatgpt.com/docs/app-server

**When the file is absent**

- The file is optional; `SKILL.md` alone is a complete skill. [DOCUMENTED] https://learn.chatgpt.com/docs/build-skills
- Implicit invocation stays allowed, because `allow_implicit_invocation` defaults to `true`. [DOCUMENTED] https://learn.chatgpt.com/docs/build-skills
- What the UI shows instead (for example whether it falls back to `name` and `description`), and whether anything is validated or warned about. [UNVERIFIED]
- Behaviour for unknown keys or a malformed file. [UNVERIFIED]
- Whether Claude Code ignores an `agents/` folder inside a skill. [UNVERIFIED] (Claude Code docs were out of scope for this fetch; the open spec allows extra files in a skill directory: https://agentskills.io/specification)

Illustrative minimal file (composed from documented fields; untested):

```yaml
interface:
  display_name: "My Skill"
  short_description: "One-line description shown in the UI"
policy:
  allow_implicit_invocation: true
```

---

## C. Codex subagents and custom agents

### C1. Where definitions live and the file format

- Custom agents are standalone **TOML** files, one agent per file, in `~/.codex/agents/` (personal) or `.codex/agents/` (project-scoped). [DOCUMENTED] https://learn.chatgpt.com/docs/agent-configuration/subagents
- Roles can also be declared in `config.toml` under `[agents.<name>]` with `description` and `config_file` (path to a TOML config layer; relative paths resolve from the declaring config file). [DOCUMENTED] https://learn.chatgpt.com/docs/config-file/config-reference
- The agent is identified by its `name` field, not by the filename; matching them is only a convention. [DOCUMENTED] https://learn.chatgpt.com/docs/agent-configuration/subagents
- Custom agents are a local Codex client feature (desktop app, CLI, IDE extension); subagent workflows are enabled by default in current releases. [DOCUMENTED] https://learn.chatgpt.com/docs/agent-configuration/subagents
- A Markdown agent-definition format for Codex. [UNVERIFIED] (none is documented)

### C2. Fields

| Field | Required | Notes | Status | Source |
|---|---|---|---|---|
| `name` | Yes | Name used when spawning or referring to the agent | [DOCUMENTED] | https://learn.chatgpt.com/docs/agent-configuration/subagents |
| `description` | Yes | Guidance on when Codex should use the agent | [DOCUMENTED] | same |
| `developer_instructions` | Yes | Core behaviour instructions | [DOCUMENTED] | same |
| `model` | No | File value takes precedence over spawn value, `[agents]` default and parent value | [DOCUMENTED] | same |
| `model_reasoning_effort` | No | Levels named on the page: `low`, `medium`, `high`, `xhigh`, `max`, `ultra`, subject to model support | [DOCUMENTED] | same |
| `model_reasoning_summary`, `model_verbosity` | No | Accepted values are in the config reference | [DOCUMENTED] | same |
| `features.shell_tool`, `features.apps`, `features.plugins`, `features.memories`, `features.request_permissions_tool` | No | Set to `false` to reduce the agent's capabilities | [DOCUMENTED] | same |
| `skills.config` | No | Disable individual skills for this agent (same `[[skills.config]]` shape as A7) | [DOCUMENTED] | same |
| `skills.bundled.enabled`, `skills.include_instructions` | No | Disable bundled skills / omit the automatic skills block | [DOCUMENTED] | same |
| `sandbox_mode`, `approval_policy`, `model_provider`, `mcp_servers` | - | Have **no effect** in a custom agent file; the parent session's values apply. Service tier also follows the root session. MCP servers must be configured in the parent session | [DOCUMENTED] | same |
| `nickname_candidates` | - | Not present on the subagents page, the config reference, or the combined docs export | [UNVERIFIED] | - |

Model IDs used in the page's examples are `gpt-6.1-sol` and `gpt-6-luna`; do not hard-code them in portable material. [DOCUMENTED] https://learn.chatgpt.com/docs/agent-configuration/subagents

Illustrative minimal agent file (composed from documented fields; untested):

```toml
# .codex/agents/reviewer.toml
name = "reviewer"
description = "Read-only reviewer for correctness and missing tests."
developer_instructions = """
Review the change. Do not edit files. Report concrete findings with file references.
"""
```

### C3. Built-in agents, global settings, limits

- Built-in agents: `default` (general-purpose fallback), `worker` (implementation and fixes), `explorer` (read-heavy exploration). A custom agent with the same name as a built-in takes precedence. [DOCUMENTED] https://learn.chatgpt.com/docs/agent-configuration/subagents
- Global `[agents]` keys: `enabled` (default `true`), `max_concurrent_threads_per_session`, `default_subagent_model`, `default_subagent_reasoning_effort`, `interrupt_message` (default `true`). [DOCUMENTED] https://learn.chatgpt.com/docs/agent-configuration/subagents ; https://learn.chatgpt.com/docs/config-file/config-reference
- Thread limit: `agents.max_concurrent_threads_per_session` caps concurrently open spawned-agent threads, not counting the primary thread. When unset, Codex picks the default; **the default number is not published**. `agents.max_threads` is a legacy alias. Examples on the page use 8 and 6. [DOCUMENTED] same two URLs
- A depth limit such as `agents.max_depth`, or any statement about subagents spawning subagents. [UNVERIFIED] (no such key in the config reference or the combined docs export)
- Subagent runs use more tokens than comparable single-agent runs. [DOCUMENTED] https://learn.chatgpt.com/docs/agent-configuration/subagents

### C4. Behaviour

- Spawning: on a direct request, or when applicable `AGENTS.md` or skill instructions ask for delegation. [DOCUMENTED] https://learn.chatgpt.com/docs/agent-configuration/subagents
- Model resolution: explicit spawn value, then `[agents]` default, then the parent's value; a value in the agent file overrides the result. [DOCUMENTED] same
- Sandbox and approvals are inherited from the parent turn (including `/permissions` or `--yolo` changes). A custom agent file cannot replace them; telling an agent not to edit is not a separate read-only sandbox. In non-interactive runs an action needing fresh approval fails and the error returns to the parent. [DOCUMENTED] same
- CLI controls: `/subagents` switches between agent threads; `/agents` opens the agent command center. [DOCUMENTED] https://learn.chatgpt.com/docs/developer-commands

### C5. Can custom agents reference skills?

- Skills are inherited from the parent session; a custom agent can only **disable** individual skills (`skills.config`), disable bundled skills, or drop the skills instruction block. [DOCUMENTED] https://learn.chatgpt.com/docs/agent-configuration/subagents
- In the other direction, skill instructions can request delegation to subagents. [DOCUMENTED] same
- A field that attaches, preloads, or pins a named skill to a custom agent. [UNVERIFIED] (none documented)

### C6. Difference from AGENTS.md

- `AGENTS.md` is plain Markdown guidance read before work starts. Global: `AGENTS.override.md` or else `AGENTS.md` in the Codex home (`~/.codex` unless `CODEX_HOME` is set). Project: from the project root down to the working directory, at most one file per directory (`AGENTS.override.md`, then `AGENTS.md`, then names in `project_doc_fallback_filenames`), concatenated root-first so nearer files come later. Combined size is limited by `project_doc_max_bytes` (32 KiB default). [DOCUMENTED] https://learn.chatgpt.com/docs/agent-configuration/agents-md
- Summary (inference from the two pages): `AGENTS.md` is always-on instructions for whichever agent is running; a custom agent is a named TOML role with its own model settings and instructions that is spawned on demand. `AGENTS.md` has no schema; custom agents have required keys.

### C7. Is any documented format shared with Claude Code's `.claude/agents/*.md`?

**No.** The only documented Codex agent-definition format is TOML under `.codex/agents/` or `~/.codex/agents/` (plus `[agents.<name>]` in `config.toml`), with `developer_instructions` as a TOML string. [DOCUMENTED] https://learn.chatgpt.com/docs/agent-configuration/subagents

- The bridge the docs offer is a one-time migration: the import flow lists Claude Code "Subagents" as importable into "Codex subagents" (protocol item type `SUBAGENTS`). That is a conversion, not shared files. [DOCUMENTED] https://learn.chatgpt.com/docs/import ; https://learn.chatgpt.com/docs/app-server
- Codex reading `.claude/agents/*.md` directly. [UNVERIFIED] (no page says so)
- What is shared across the two tools according to these pages: the `SKILL.md` skill folder (open standard), and plugin marketplaces to the extent that `.claude-plugin/marketplace.json` is read as legacy-compatible. [DOCUMENTED] https://learn.chatgpt.com/docs/build-skills ; https://developers.openai.com/plugins/build/plugins

---

## D. OpenAI skill-evaluation guidance (eval-skills blog)

Post: "Testing Agent Skills Systematically with Evals", shown as dated Jan 22, 2026, authors Dominik Kundel and Gabriel Chua. [DOCUMENTED] https://developers.openai.com/blog/eval-skills

All items below: [DOCUMENTED] https://developers.openai.com/blog/eval-skills unless another URL is given.

### D1. Definition

An eval is a prompt, a captured run (trace plus artifacts), a small set of checks, and a score that can be compared over time; in practice it resembles a lightweight end-to-end test.

### D2. Recommended workflow

1. **Define success before writing the skill**, in measurable terms, keeping the list small and limited to must-pass checks.
2. **Create the skill** (`SKILL.md` with `name` and `description`; `$skill-creator` can bootstrap it). The sample skill is deliberately opinionated and ends with a "definition of done" so there is something concrete to check.
3. **Trigger it manually first** (`/skills` or `$name`) in a real or scratch repository to expose hidden assumptions of three kinds: triggering (should fire but does not, or fires on adjacent requests), environment (empty directory, a specific package manager), execution (skipped or reordered steps). Every manual fix is a candidate eval.
4. **Small prompt set**: 10-20 prompts per skill, kept in a CSV with columns `id`, `should_trigger`, `prompt`; grow it from real failures.
5. **Deterministic graders on traces**: run each prompt with `codex exec --json`, save the JSONL from stdout, and run checks over the events (for example: was a given command run and did it exit 0; does an expected file exist; were commands issued in the expected order).
6. **Rubric grading with structured output**: a second, read-only `codex exec` pass inspects the result and must answer in a JSON Schema supplied with `--output-schema` (the example schema has `overall_pass`, `score` 0-100, and a `checks` array of `id` / `pass` / `notes`), written to a file with `-o`.
7. **Extend as the skill matures**: command count (looping), token budget, build check, runtime smoke check, repository cleanliness (`git status --porcelain` empty or matching an allow list), sandbox and permission regressions.

### D3. Categories of checks named

| Category | Question it answers |
|---|---|
| Outcome goals | Did the task complete; does the result work |
| Process goals | Was the skill invoked; were the intended tools and steps followed |
| Style goals | Does the output follow the requested conventions |
| Efficiency goals | Did it get there without thrashing (unneeded commands, excess tokens) |

### D4. Should-trigger vs should-not-trigger

The example CSV covers four kinds of row: explicit invocation (prompt names `$skill`), implicit invocation (describes the exact scenario without naming the skill), contextual invocation (same need with extra domain noise), and a negative control with `should_trigger=false` (an adjacent request that must not fire the skill). The post asks for at least one negative control to catch false positives.

### D5. Trace details

- With `--json`, stdout is a JSONL event stream; the checks in the post look at `item.completed` events whose `item.type` is `command_execution`, using `command`, `status`, `exit_code`. Token usage is on `turn.completed` (`usage.input_tokens`, `usage.output_tokens`).
- Current CLI docs list the event types `thread.started`, `turn.started`, `turn.completed`, `turn.failed`, `item.*`, `error`, and item kinds: agent messages, reasoning, command executions, file changes, MCP tool calls, web searches, plan updates. [DOCUMENTED] https://learn.chatgpt.com/docs/non-interactive-mode
- Without `--json`, `codex exec` streams progress to stderr and prints only the final message to stdout; `-o` / `--output-last-message` writes the final message to a file. [DOCUMENTED] https://learn.chatgpt.com/docs/non-interactive-mode
- The Codex GitHub Action (`openai/codex-action@v1`) accepts `--output-schema` through `codex-args`. [DOCUMENTED] https://learn.chatgpt.com/docs/github-action
- A trace event that explicitly says "skill X was activated". [UNVERIFIED] The post lists "was the skill invoked" as a process goal, but its sample checks only look at command executions and files, and the documented item kinds do not include a skill item.

### D6. Explicit cautions in the post

- Keep the success list small; do not try to encode every preference up front.
- Vague or overloaded `name` / `description` make triggering unreliable.
- `codex exec` runs in a restricted sandbox by default; when automating, grant the least permissions that get the job done.
- Deterministic checks are intentionally lightweight, fast, explainable signals, to be in place before any model-based grading.
- Prefer several targeted signals over one pass/fail verdict at the end.
- Runtime smoke checks add confidence but cost time; use them selectively. Start with fast checks and add heavier ones only where they reduce risk.
- Re-verify that the skill still works without permissions beyond what was intended.

### D7. Where the post is out of date against current docs

- The post's commands use `codex exec --full-auto`. The current non-interactive page says `--full-auto` is no longer supported and to use `--sandbox workspace-write` (or `--approve-for-me`); default is a read-only sandbox. The post's own Node runner already uses `--sandbox workspace-write`. [DOCUMENTED] https://learn.chatgpt.com/docs/non-interactive-mode
- The post's skill paths (`.codex/skills/...`, `~/.codex/skills/...`) are not the locations on the current Build skills page (see A3). [DOCUMENTED] https://learn.chatgpt.com/docs/build-skills
- `codex exec` requires a Git repository unless `--skip-git-repo-check` is passed; `--ephemeral` avoids persisting session files; `--ignore-user-config` skips `$CODEX_HOME/config.toml`. Useful for a clean eval harness. [DOCUMENTED] https://learn.chatgpt.com/docs/non-interactive-mode
- The method is Codex-specific in tooling (`codex exec`, JSONL schema, `--output-schema`). The workflow shape (success criteria first, small prompt CSV with positive and negative triggers, deterministic checks, rubric pass, grow from failures) is tool-neutral (inference).

---

## E. GitHub Pages

### E1. Site types and URL shape

- Project site: source lives in a folder of the project's repository; one Pages site per repository; default location `http(s)://<owner>.github.io/<repositoryname>`. For an organization repository the owner is the organization account name. [DOCUMENTED] https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
- User/organization site: repository must be named `<owner>.github.io`; one per account; served at `http(s)://<owner>.github.io`. [DOCUMENTED] same
- Owner names containing uppercase letters must be lowercased in the `<owner>.github.io` repository name. [DOCUMENTED] https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
- Lowercasing of the owner in the project-site host name. [UNVERIFIED] (not stated for project sites)
- The API reports the real address in `html_url` of `GET /repos/{owner}/{repo}/pages`. [DOCUMENTED] https://docs.github.com/en/rest/pages/pages

### E2. Availability by plan and visibility

- Pages is available in public repositories with GitHub Free and GitHub Free for organizations, and in public and private repositories with Pro, Team, Enterprise Cloud and Enterprise Server. [DOCUMENTED] https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
- If the owning account is on GitHub Free or GitHub Free for organizations, the repository must be public. [DOCUMENTED] https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
- Organization owners can allow or disallow members publishing Pages sites (Settings > Member privileges > Pages creation > Public); already published sites stay published. Private publishing needs Enterprise Cloud. [DOCUMENTED] https://docs.github.com/en/organizations/managing-organization-settings/managing-the-publication-of-github-pages-sites-for-your-organization
- Published sites are public on the internet even when the repository is private. [DOCUMENTED] https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- Standard GitHub Actions runners are free for public repositories. [DOCUMENTED] https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

### E3. Publishing source options

| Option | Rules and constraints | Status | Source |
|---|---|---|---|
| Deploy from a branch | Any branch; folder is either the repository root `/` or `/docs` on that branch, nothing else. Pushes to that branch publish the folder. Recommended when no control over the build is needed. The branch must already exist | [DOCUMENTED] | https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site |
| Deploy from a branch: symlinks | A repository containing symbolic links must publish with a GitHub Actions workflow instead | [DOCUMENTED] | same |
| Deploy from a branch: who pushes | If the site does not publish automatically, someone with admin permission and a verified email must have pushed to the source. Commits pushed by a workflow using `GITHUB_TOKEN` do not trigger a Pages build | [DOCUMENTED] | same |
| Deploy from a branch: `/docs` removed | Removing `/docs` later causes a build error for the missing folder | [DOCUMENTED] | same |
| Deploy from a branch: how it runs | The site is always deployed by a GitHub Actions workflow run, visible in the repository's workflow runs | [DOCUMENTED] | same |
| GitHub Actions | Recommended for a build process other than Jekyll, or to avoid a dedicated branch of compiled files. GitHub suggests workflow templates. No specific workflow is tied to the Pages settings; the settings link to the run that deployed last | [DOCUMENTED] | same |
| UI path | Settings > Pages > Build and deployment > Source: "Deploy from a branch" or "GitHub Actions" | [DOCUMENTED] | same |
| Entry file | `index.html`, `index.md` or `README.md`, at the top level of the source folder (branch source) or of the artifact (Actions source) | [DOCUMENTED] | https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site |
| Publish delay | Changes can take up to 10 minutes to appear | [DOCUMENTED] | same |
| Custom domain | A `CNAME` file does not add or remove a custom domain; use settings or the API | [DOCUMENTED] | https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site |
| Whether branch publishing works when GitHub Actions is disabled for the repository or organization | - | [UNVERIFIED] | - |

### E4. Jekyll and `.nojekyll`

- When publishing from a source branch, Pages builds the site with Jekyll by default. [DOCUMENTED] https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
- To disable the Jekyll build, create an empty file named `.nojekyll` in the root of the publishing source. [DOCUMENTED] same. Reading "publishing source" as branch plus folder, that is `docs/.nojekyll` when the source is `/docs` (inference from the page's definition of publishing source).
- With `.nojekyll` present, the Pages workflow detects that no build step is needed and only runs the deployment steps. [DOCUMENTED] https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- What Jekyll does if left on: it does not build files or folders located in `node_modules` or `vendor`, starting with `_`, `.` or `#`, or ending with `~`. A fixed set of plugins is always enabled and cannot be disabled, among them `jekyll-optional-front-matter`, `jekyll-readme-index`, `jekyll-relative-links`, `jekyll-titles-from-headings` and `jekyll-default-layout` (the page lists the names only; it does not describe what each does). [DOCUMENTED] https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll
- Consequence for a hand-written static site in `/docs` (inference): without `.nojekyll`, underscore-prefixed asset folders are dropped and Markdown files are likely to be processed by Jekyll; with `.nojekyll`, files are published as they are.
- With the GitHub Actions source, only the steps in the workflow run; the docs' Jekyll example adds an explicit `actions/jekyll-build-pages@v1` step and the "no build" example has none. [DOCUMENTED] https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages . So `.nojekyll` is unnecessary there (inference).
- Pages does not run server-side languages. [DOCUMENTED] https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

### E5. Usage limits

The limits are no longer on "What is GitHub Pages?"; they are on a separate page. All [DOCUMENTED] https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits

- Source repository: recommended limit 1 GB.
- Published site: no larger than 1 GB.
- Deployment: times out after 10 minutes.
- Bandwidth: soft limit 100 GB per month.
- Builds: soft limit 10 per hour; does not apply when building and publishing with a custom GitHub Actions workflow.
- Rate limiting may apply (HTTP 429).
- One user or organization site per account.
- Not allowed as free hosting for an online business, e-commerce or SaaS; not for sensitive transactions.

### E6. REST API

Base facts: [DOCUMENTED] https://docs.github.com/en/rest/pages/pages . Headers shown on the page: `Accept: application/vnd.github+json`, `Authorization: Bearer <token>`, `X-GitHub-Api-Version: 2026-03-10` (labelled latest).

| Operation | Endpoint | Body | Success / errors | Classic token | Fine-grained token |
|---|---|---|---|---|---|
| Get site | `GET /repos/{owner}/{repo}/pages` | none | 200; 404 | `repo` scope | Pages: read (public resources readable without auth) |
| Create site | `POST /repos/{owner}/{repo}/pages` | `build_type` (`legacy` or `workflow`) and/or `source` object: `branch` (required inside `source`), `path` (`/` or `/docs`, default `/`) | 201; 409 conflict; 422 | `repo` scope | Pages: write and Administration: write |
| Update site | `PUT /repos/{owner}/{repo}/pages` | `cname` (string or null), `https_enforced` (bool), `build_type`, `source` object with `branch` and `path` both required | 204; 400; 409; 422 | `repo` scope | Pages: write and Administration: write |
| Delete site | `DELETE /repos/{owner}/{repo}/pages` | none | 204; 404; 409; 422 | `repo` scope | Pages: write and Administration: write |
| List builds | `GET /repos/{owner}/{repo}/pages/builds` | none (`per_page`, `page`) | 200 | `repo` scope | Pages: read |
| Latest build | `GET /repos/{owner}/{repo}/pages/builds/latest` | none | 200 | `repo` scope | Pages: read |
| One build | `GET /repos/{owner}/{repo}/pages/builds/{build_id}` | none | 200 | `repo` scope | Pages: read |
| Request a build | `POST /repos/{owner}/{repo}/pages/builds` | none | 201 | not stated on the page | Pages: write |
| Create deployment | `POST /repos/{owner}/{repo}/pages/deployments` | `artifact_id` or `artifact_url`, `environment` (default `github-pages`), `pages_build_version` (required), `oidc_token` (required) | 200; 400; 404; 422 | not stated (needs repository write permission) | Pages: write |
| Deployment status | `GET /repos/{owner}/{repo}/pages/deployments/{pages_deployment_id}` | none | 200; 404 | not stated | Pages: read |
| Cancel deployment | `POST /repos/{owner}/{repo}/pages/deployments/{pages_deployment_id}/cancel` | none | 204; 404 | not stated | Pages: write |
| DNS health | `GET /repos/{owner}/{repo}/pages/health` | none | 200; 202; 400; 404; 422 | `repo` scope | Administration: write and Pages: write |

- Who may create, update or delete: the authenticated user must be a repository administrator, a maintainer, or hold the "manage GitHub Pages settings" permission. [DOCUMENTED] https://docs.github.com/en/rest/pages/pages
- `build_type` meanings: `workflow` = built by a custom GitHub Actions workflow; `legacy` = built by GitHub when changes are pushed to a specific branch. [DOCUMENTED] same
- The only request example on the docs page for "create" is the branch form (`source` with `branch: main`, `path: /docs`). [DOCUMENTED] same
- The published OpenAPI description for this operation requires either `source` or `build_type` (`anyOf`), so a body with only `build_type: workflow` satisfies the schema. [DOCUMENTED] https://github.com/github/rest-api-description (file `descriptions/api.github.com/api.github.com.json`, operation `repos/create-pages-site`). Actual server acceptance was not exercised.
- Reading status: site-level `status` is `built`, `building`, `errored` or null, and the site object also returns `build_type`, `source`, `html_url`, `https_enforced`, `custom_404`, `public`. Build objects return `status`, `error.message`, `commit`, `duration`, timestamps. Deployment `status` values include `deployment_in_progress`, `syncing_files`, `updating_pages`, `deployment_failed`, `succeed` (full enum on the page). [DOCUMENTED] https://docs.github.com/en/rest/pages/pages
- "Request a build" rebuilds from the latest revision of the default branch without a new commit; one concurrent build per repository and per requester, extra requests queue. [DOCUMENTED] same
- The page has a GitHub CLI tab for each example; its `gh api` text is rendered client-side and was not captured. [UNVERIFIED] exact `gh api` syntax
- Whether the `GITHUB_TOKEN` of a workflow can call "create site". The `configure-pages` action says its `enablement` option needs a token other than `GITHUB_TOKEN` (a PAT with `repo` scope or Pages write, or a GitHub App with `administration:write` and `pages:write`). [DOCUMENTED] https://github.com/actions/configure-pages (`action.yml`)

Illustrative request bodies (composed from the documented parameters; untested):

```jsonc
// POST /repos/OWNER/REPO/pages  -> publish main:/docs from a branch
{ "source": { "branch": "main", "path": "/docs" } }

// POST /repos/OWNER/REPO/pages  -> publish with a GitHub Actions workflow
{ "build_type": "workflow" }

// PUT /repos/OWNER/REPO/pages   -> switch an existing site to Actions
{ "build_type": "workflow" }
```

### E7. Actions-based publishing

All [DOCUMENTED] https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages unless another URL is given.

- Prerequisite: the repository's Pages source must be set to GitHub Actions (UI in E3, or API in E6). [DOCUMENTED] https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- General flow of the templates: trigger on push to the default branch or manual dispatch; `actions/checkout`; optional build; `actions/upload-pages-artifact`; `actions/deploy-pages` (skipped on pull requests). [DOCUMENTED] same URL as the prerequisite
- Deploy job permissions: at minimum `pages: write` and `id-token: write`; the docs example also sets `contents: read`.
- Environment: the deploy job needs an environment for branch/deployment protection; the default is `github-pages`, with `url` taken from the deploy step's `page_url` output. The environment is created automatically if missing, and GitHub recommends a protection rule so only the default branch can deploy. [DOCUMENTED] this page and https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- When build and deploy are separate jobs, the deploy job must declare `needs:` on the build job, otherwise it may wait for an artifact that never arrives.
- Artifact rules: a gzip archive containing a single tar file; tar under 10 GB; no symbolic or hard links.
- A single job with no build step is acceptable when there is nothing to build (checkout, configure, upload, deploy).

Versions stated in the docs versus elsewhere:

| Action | Version in the "Using custom workflows" docs page | Version in the official static starter workflow | Latest release (GitHub releases API) |
|---|---|---|---|
| `actions/configure-pages` | `v5` | `v5` | `v6.0.0` (2026-03-25) |
| `actions/upload-pages-artifact` | `v4` | `v3` | `v5.0.0` (2026-04-10) |
| `actions/deploy-pages` | `v4` | `v5` | `v5.0.1` (2026-09-01) |
| `actions/checkout` | `v6` | `v4` | `v7.0.1` (2026-07-20) |
| `actions/jekyll-build-pages` | `v1` | not used | `v1.0.13` (2024-08-06) |

Sources for the table: [DOCUMENTED] docs page above; https://github.com/actions/starter-workflows/blob/main/pages/static.yml ; `https://api.github.com/repos/actions/<name>/releases/latest`. The three sources disagree, so pick versions deliberately and state which source was followed; none of the combinations was run here.

Action details from the action repositories:

- `configure-pages`: inputs `static_site_generator`, `generator_config_file`, `token`, `enablement` (default `false`); outputs `base_url`, `origin`, `host`, `base_path` (for a project site `base_path` is `/<repo>`). [DOCUMENTED] https://github.com/actions/configure-pages
- `upload-pages-artifact`: inputs `name` (default `github-pages`), `path` (default `_site/`), `retention-days` (default `1`), `include-hidden-files` (default `false`; dot-files are excluded unless enabled, `.git` and `.github` always excluded); output `artifact_id`. Its README recommends keeping the tar under 1 GB. [DOCUMENTED] https://github.com/actions/upload-pages-artifact
- `deploy-pages`: inputs `token`, `timeout` (default 600000 ms), `error_count`, `reporting_interval`, `artifact_name` (default `github-pages`), `preview` (alpha, not public); output `page_url`. If the site uses a source branch, deployments must originate from that branch unless the environment is protected. [DOCUMENTED] https://github.com/actions/deploy-pages
- The official static template sets workflow-level `permissions` (`contents: read`, `pages: write`, `id-token: write`) and a `concurrency` group `pages` with `cancel-in-progress: false`, and uploads `path: '.'`. [DOCUMENTED] https://github.com/actions/starter-workflows/blob/main/pages/static.yml

Illustrative workflow for publishing `/docs` unchanged (composed from the documented pieces, using the versions printed on the docs page; untested):

```yaml
name: Deploy docs to Pages
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: false
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v6
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v4
        with:
          path: docs
      - id: deployment
        uses: actions/deploy-pages@v4
```

---

## F. Discrepancies and stale material found

1. `https://developers.openai.com/codex/skills` no longer hosts content; it permanently redirects to `https://learn.chatgpt.com/docs/build-skills`. Cite the new URL and mention the old one.
2. The eval blog (Jan 22, 2026) uses `--full-auto` and `.codex/skills` paths; current docs say `--full-auto` is unsupported and list `.agents/skills`. https://developers.openai.com/blog/eval-skills vs https://learn.chatgpt.com/docs/non-interactive-mode and https://learn.chatgpt.com/docs/build-skills
3. Build skills still links to `openai/skills` for examples and curated installs, while that repository's README says it is deprecated in favour of plugins. https://learn.chatgpt.com/docs/build-skills vs https://github.com/openai/skills
4. User-level skill location: docs say `$HOME/.agents/skills`; the installer skill source and app-server examples use `~/.codex/skills`. See A3.
5. Skill metadata file: Build skills says `agents/openai.yaml`; the app-server page mentions `SKILL.json`. See B.
6. Dependency types: the creator skill's reference says only `mcp`; the app-server example shows `env_var`. See B.
7. Pages action versions differ between the docs page, the starter workflow and the latest releases. See E7.
8. Pages usage limits moved from "What is GitHub Pages?" to "GitHub Pages limits". See E5.
9. The REST docs example for creating a site shows only the branch form; `build_type` alone is confirmed only by the OpenAPI schema. See E6.

---

## G. Decision-relevant summary

### G1. One SKILL.md package for both Codex and Claude Code

- Portable core = a folder named exactly as the skill's `name`, containing `SKILL.md` whose front matter has `name` and `description` (the only two fields Codex docs require and the only two the open spec requires), a Markdown body, and optional `scripts/`, `references/`, `assets/`. [DOCUMENTED] https://learn.chatgpt.com/docs/build-skills ; https://agentskills.io/specification
- Keep `name` within the spec's rules and the description within 1024 characters, with the trigger wording first (Codex may shorten descriptions in its initial list). [DOCUMENTED] same
- Codex finds repo skills under `.agents/skills/<name>/`, not under `.claude/skills/`. The same folder therefore has to be present in each tool's location (copy, or symlink, which Codex documents as supported), or be shipped through each tool's plugin mechanism. [DOCUMENTED for the Codex side] https://learn.chatgpt.com/docs/build-skills
- Codex's own import flow treats Claude Code skill folders as directly copyable into `~/.agents/skills`, which is the strongest documentary sign that the folder format is common to both. [DOCUMENTED] https://learn.chatgpt.com/docs/app-server
- Claude Code's own discovery paths, its symlink handling, and any extra front-matter fields it supports were not part of this fetch. [UNVERIFIED here]
- Honest compatibility wording: "Follows the Agent Skills format that Codex documents; location and invocation follow Codex docs as read on 2026-11-13; not executed on Codex."

### G2. What must stay out of the portable core (Codex-specific)

- `agents/openai.yaml` and everything in it (UI metadata, `policy.allow_implicit_invocation`, MCP `dependencies`). It may physically sit inside the skill folder, but behaviour must not depend on it; ship it as an optional overlay.
- The `$skill-name` mention syntax and `/skills` picker (ChatGPT uses `@`), so the skill body should not hard-code an invocation syntax.
- `.agents/skills` placement, `[[skills.config]]` / `[skills.bundled]` TOML, `skills.max_context_tokens`.
- Custom agents (`.codex/agents/*.toml`, `developer_instructions`) and `AGENTS.md`; there is no agent-definition format shared with `.claude/agents/*.md`.
- The eval harness built on `codex exec --json` and `--output-schema`.
- Plugin metadata under `extensions.com.openai` or `.codex-plugin/plugin.json`.
- Model IDs and reasoning-effort names.

### G3. Simplest reliable way to publish the static site

- Branch route (fewest moving parts): keep the site in `docs/` on `main` with `docs/index.html`, add an empty `docs/.nojekyll`, and set the source to `main` + `/docs` in Settings > Pages or with `POST /repos/{owner}/{repo}/pages` and a `source` body. Site address: `https://<org>.github.io/<repo>/`. Allowed for a public repository of an organization on GitHub Free. Needs repository admin/maintainer rights (classic token `repo`, or fine-grained Pages write + Administration write).
- Actions route (use when the repository has symlinks, a build step is needed, pushes come from automation, or more than 10 builds per hour are expected): set `build_type` to `workflow`, then a workflow with `pages: write` and `id-token: write`, the `github-pages` environment, and configure-pages, upload-pages-artifact (`path: docs`), deploy-pages.
- Check first that the organization has not disabled Pages creation in Member privileges.

---

## H. Consolidated list of UNVERIFIED items

- Whether `.codex/skills`, `~/.codex/skills` or `$CODEX_HOME/skills` are still scanned for skills, and whether they are formally legacy.
- Precedence between duplicate skill names across scopes.
- Admin skill path on Windows; parent-directory scanning outside a Git repository; whether repo skills need a trusted project.
- Whether Codex enforces the spec's naming rules or reads optional spec fields (`license`, `compatibility`, `metadata`, `allowed-tools`).
- UI fallbacks and validation when `agents/openai.yaml` is missing, malformed, or has unknown keys; the meaning of `SKILL.json`; whether `env_var` dependencies can be declared in `openai.yaml`.
- `nickname_candidates`, any agent depth limit, and the default value of `agents.max_concurrent_threads_per_session`.
- Any way to attach a specific skill to a custom agent; Codex reading `.claude/agents/*.md` directly.
- A trace event that marks skill activation in `codex exec --json` output.
- All runtime behaviour on Codex (nothing was executed).
- Claude Code-side rules (not fetched in this task).
- Whether branch-based Pages publishing works with GitHub Actions disabled; exact `gh api` syntax; server acceptance of a create body containing only `build_type`; which action version combination is best (docs, template and releases disagree).
