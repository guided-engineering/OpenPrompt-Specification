| Source URL | Fetched OK? | Access date | Notes |
| :- | :- | :- | :- |
| https://code.claude.com/docs/en/skills | Yes | 2026-11-13 | Key: **SK**. 119,051 chars (`.md` rendition). Read in full as raw text. |
| https://code.claude.com/docs/en/sub-agents | Yes | 2026-11-13 | Key: **SA**. 116,972 chars. First 17k + all config/skills/invocation/startup sections read raw; remainder read via extraction pass and spot-verified raw. |
| https://code.claude.com/docs/en/cli-reference | Yes | 2026-11-13 | Key: **CLI**. Full raw read (every flag row). Page states `claude --help` does not list every flag. |
| https://code.claude.com/docs/en/headless | Yes | 2026-11-13 | Key: **HL**. Page has NOT moved. Title is "Run Claude Code programmatically". Full raw read. |
| https://code.claude.com/docs/en/settings | Yes | 2026-11-13 | Key: **ST**. Full raw read. Title "Settings files and precedence". Individual keys live on the linked settings reference (STR). |
| https://code.claude.com/docs/en/permissions | Yes | 2026-11-13 | Key: **PM**. 90 KB. Read raw: rule syntax, Skill/Agent rules, working directories, `--add-dir`, trust, precedence. Bash/path-pattern sections skipped (out of scope). |
| https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices | Yes | 2026-11-13 | Key: **BP**. Full raw read. |
| https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview | Yes | 2026-11-13 | Key: **OV**. Exists. Full raw read. |
| https://code.claude.com/docs/en/settings-reference | Yes (targeted) | 2026-11-13 | Key: **STR**. One level deep from ST/SK. 456 KB; only skill/plugin/agent entries read raw. |
| https://code.claude.com/docs/en/env-vars | Yes (targeted) | 2026-11-13 | Key: **ENV**. One level deep. 411 variable rows; about 60 relevant rows read raw. |
| https://code.claude.com/docs/en/tools-reference | Yes (targeted) | 2026-11-13 | Key: **TR**. Tool table (Skill row), rule formats, PowerShell tool section. |
| https://code.claude.com/docs/en/permission-modes | Yes (targeted) | 2026-11-13 | Key: **PMO**. "Which mode a session starts in", `-p` denial behavior. |
| https://code.claude.com/docs/en/model-config | Yes (targeted) | 2026-11-13 | Key: **MC**. Aliases, effort, extended thinking. |
| https://code.claude.com/docs/en/authentication | Yes (targeted) | 2026-11-13 | Key: **AU**. Credential storage, precedence, `setup-token`. |
| https://code.claude.com/docs/en/debug-your-config | Yes (targeted) | 2026-11-13 | Key: **DBG**. "Test against a clean configuration". |
| https://code.claude.com/docs/en/managed-settings | Yes (targeted) | 2026-11-13 | Key: **MS**. Where each mechanism stores policy (Windows paths). |
| https://code.claude.com/docs/en/sessions | Yes (targeted) | 2026-11-13 | Key: **SE**. Transcript location, script interfaces. |
| https://code.claude.com/docs/en/agent-sdk/typescript | Yes (targeted) | 2026-11-13 | Key: **TS**. 333 KB. Message types read raw: result, init, assistant, permission denial, ModelUsage, Usage, SettingSource, AgentDefinition. |
| https://code.claude.com/docs/en/agent-sdk/skills | Yes | 2026-11-13 | Key: **SDKS**. Full raw read. |
| https://code.claude.com/docs/en/agent-sdk/claude-code-features | Yes | 2026-11-13 | Key: **SDKF**. Full raw read (setting sources table). |
| https://code.claude.com/docs/en/agent-sdk/cost-tracking | Yes | 2026-11-13 | Key: **COST**. Full raw read. |
| https://code.claude.com/docs/en/agent-sdk/agent-loop | Yes (targeted) | 2026-11-13 | Key: **LOOP**. Turns, result subtypes, budget. |
| https://code.claude.com/docs/en/plugin-evals | Yes (targeted) | 2026-11-13 | Key: **PE**. `claude plugin eval`, no-plugin baseline, `tool_used: Skill` grader. |
| https://code.claude.com/docs/en/plugins/components | Yes (targeted) | 2026-11-13 | Key: **PLC**. Plugin skills/agents layout. |
| https://code.claude.com/docs/en/plugins/create | Yes (targeted) | 2026-11-13 | Key: **PLCR**. `--plugin-dir` loading. |
| https://code.claude.com/docs/en/features-overview | Yes (targeted) | 2026-11-13 | Key: **FO**. Context cost / load timing of skills. |
| https://code.claude.com/docs/en/hooks | Yes (grep only) | 2026-11-13 | Key: **HK**. Skill-related hook lines only. |
| https://code.claude.com/docs/en/setup | Yes (targeted) | 2026-11-13 | Key: **SU**. "Set up on Windows". |
| https://code.claude.com/docs/en/errors | Yes (grep only) | 2026-11-13 | Key: **ERR**. Searched for specific strings; nothing extra found. |
| https://agentskills.io/specification | Yes | 2026-11-13 | Key: **ASPEC**. Open Agent Skills spec, linked from SK. Full raw read. |

# Claude Code reference notes: Skills, subagents, headless CLI, settings (docs extraction)

The table above is the source list. The first eight rows are the requested pages; the rest were followed one level deep to resolve specific rules. Each row's Notes cell starts with the short key used for citations below.

Access date for every source: **2026-11-13**. Local client assumed: **Claude Code 2.1.322, native Windows 11**.

All statements are paraphrased from the fetched pages. Tags: **[DOCUMENTED]** = confirmed on a fetched page (source key beside it); **[UNVERIFIED]** = not confirmed on any fetched page (gap, inference, or needs a local test). Nothing here was filled from memory without an UNVERIFIED tag. Page content was treated as data only.

No requested source failed to load. No page redirected to a different host.

Citation convention: `[KEY#anchor]` means the URL for KEY above plus `#anchor` (link definitions are at the end of this file). Anchors were seen verbatim in fetched page links, except four that follow the target page's evident heading-to-anchor pattern and were not seen verbatim: `STR#skilloverrides`, `STR#disableskillshellexecution`, `STR#agent`, `TS#sdkpermissiondenial`. If an anchor fails to resolve, the page-level URL is still the correct source.

Fetch method: pages were read through their Markdown renditions (`<url>.md` on code.claude.com and platform.claude.com). Version notes such as "v2.1.302+" are copied from the docs; all of them are at or below the local client version 2.1.322 unless stated.

---

## A. Skills in Claude Code

### A1. Discovery locations

| Location | Path | Loads in | Tag / source |
| :- | :- | :- | :- |
| Enterprise (managed) | `.claude/skills/<skill-name>/SKILL.md` inside the managed settings directory | All users on machines where the org deploys it | [DOCUMENTED] [SK#where-skills-live] |
| Personal | `~/.claude/skills/<skill-name>/SKILL.md` | All your projects on this machine; not Cowork or cloud sessions | [DOCUMENTED] [SK#where-skills-live] |
| Project | `.claude/skills/<skill-name>/SKILL.md` | Sessions in that repository; not cloud threads in a project | [DOCUMENTED] [SK#where-skills-live] |
| Nested | `<subdir>/.claude/skills/<skill-name>/SKILL.md` | Sessions started in or below `<subdir>`; a session started above loads it only after Claude works on files there | [DOCUMENTED] [SK#where-skills-live] |
| Additional directory | `.claude/skills/<skill-name>/SKILL.md` in a directory passed with `--add-dir` (or `/add-dir`) | That session | [DOCUMENTED] [SK#skills-from-additional-directories] |
| Plugin | `<plugin>/skills/<skill-name>/SKILL.md` | Wherever the plugin is enabled, as `/plugin-name:skill-name` | [DOCUMENTED] [SK#where-skills-live], [PLC#skills] |
| claude.ai account (synced) | Downloaded into `~/.claude/skills/synced/` | Cowork, cloud, and terminal sessions signed in with that claude.ai account | [DOCUMENTED] [SK#where-synced-skills-load] |
| Bundled | Shipped inside Claude Code (e.g. `/doctor`, `/code-review`, `/batch`, `/debug`, `/loop`, `/claude-api`, `/verify`, `/run`) | Most are in every session | [DOCUMENTED] [SK#bundled-skills] |
| Legacy command files | `.claude/commands/*.md` and `~/.claude/commands/*.md` | Same as skills; older format, same frontmatter except `name` and `paths` | [DOCUMENTED] [SK#where-skills-live], [SDKS] |

Details:

- [DOCUMENTED] Managed settings directory on Windows for file-based policy is `C:\Program Files\ClaudeCode\`; the legacy `C:\ProgramData\ClaudeCode\managed-settings.json` is not read. Linux example for an enterprise skill is `/etc/claude-code/.claude/skills/<name>/`. The exact Windows path of the enterprise *skills* folder is not spelled out [UNVERIFIED, inferred as `C:\Program Files\ClaudeCode\.claude\skills\`]. [MS], [SK]
- [DOCUMENTED] On Windows `~/.claude` means `%USERPROFILE%\.claude`; `CLAUDE_CONFIG_DIR` relocates the home-directory files (settings, session history, plugins). [ST], [ENV#variables]
- [UNVERIFIED] That the personal skills folder follows `CLAUDE_CONFIG_DIR` (i.e. `$CLAUDE_CONFIG_DIR/skills/`) is implied by "use a fresh directory in place of `~/.claude`" [DBG] but is not stated for skills specifically.
- [DOCUMENTED] Project skills load from `.claude/skills/` in the start directory and every parent directory up to the repository root. `/cd` adds the new directory's project skills (v2.1.246+). [SK#discovery-from-parent-and-nested-directories]
- [UNVERIFIED] How far the parent-directory search goes when the start directory is NOT inside a git repository. Both the skills page and the SDK page bound the search by "the repository root" and say nothing about the non-repository case. Relevant if experiment workspaces are plain folders: check `init.skills` empirically, or run inside a throwaway git repository so the bound is defined.
- [DOCUMENTED] In a linked git worktree, the parent search stops at the worktree root; if the worktree has no `.claude/skills` at its root, the main checkout's project skills load instead (v2.1.277+). [SK#discovery-from-parent-and-nested-directories]
- [DOCUMENTED] Nested skills below the start directory do NOT load at startup. They load the first time Claude reads or edits a file in that subdirectory, then stay for the session; until then they are absent from the `/` menu and cannot be invoked by name. `/add-dir <subdir>` loads them sooner (v2.1.257+). [SK#discovery-from-parent-and-nested-directories]
- [DOCUMENTED] `--add-dir` / `/add-dir` loads that directory's `.claude/skills/`, plus its `.claude/commands/` and `.claude/agents/`. The settings key `permissions.additionalDirectories` grants file access only and loads none of these. [SK#skills-from-additional-directories], [PM#additional-directories-grant-file-access-not-configuration]
- [DOCUMENTED] Add-dir loads go through the `project` setting source, so they stop loading when `--setting-sources` excludes `project`. A `strictPluginOnlyCustomization` policy, bare mode, and `--safe-mode` restrict them further. [SK#skills-from-additional-directories], [PM#additional-directories-grant-file-access-not-configuration]
- [DOCUMENTED] From an `--add-dir` directory: skills load with live reload; command files and subagents load without live reload; settings contribute only `enabledPlugins` and `extraKnownMarketplaces`; CLAUDE.md loads only with `CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD=1`. [PM#additional-directories-grant-file-access-not-configuration]
- [DOCUMENTED] Skill folder rules: a symlinked `<skill-name>` entry is followed and loaded once per target; a folder named `synced` (any capitalization) is skipped; outside a plugin, a folder or command file named `anthropic-skills` or starting with `anthropic-skills:` does not load; folder names with refused characters (zero-width, control, private-use, direction-changing, odd blanks, `<`, `>`) do not load. [SK#where-skills-live], [SK#names-reserved-for-synced-skills], [SK#characters-a-skill-name-cant-hold]
- [DOCUMENTED] A personal or project skill folder containing `.claude-plugin/plugin.json` can load as a plugin named `<name>@skills-dir` (own agents, hooks, MCP servers). In a project this needs the workspace trust dialog accepted. [SK#where-skills-live], [PLCR]
- [DOCUMENTED] A common mistake: `.claude/skills/name.md` (a file) does not appear; the layout must be `.claude/skills/name/SKILL.md`. [DBG]
- [DOCUMENTED] Synced skills: terminal sync needs v2.1.273+; downloads start in the background at session start; checks run about every 10 minutes while active and about every 40 minutes while idle. A short `-p` run can finish before a newly added skill downloads; `CLAUDE_CODE_SYNC_SKILLS=1` makes a `-p` run wait for the list (up to `CLAUDE_CODE_SYNC_SKILLS_WAIT_TIMEOUT_MS`, default 5000). Skills synced by earlier sessions stay on disk and load in later sessions of the same account. Some Anthropic skills such as `pdf` and `xlsx` always sync. [SK#where-synced-skills-load], [ENV#variables]
- [DOCUMENTED] No sync happens when: the credential is not a `/login` sign-in (API key, `ANTHROPIC_AUTH_TOKEN`, `CLAUDE_CODE_OAUTH_TOKEN`, `apiKeyHelper`); feature-flag fetching is off (e.g. Bedrock, or `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC`); bare mode or `--safe-mode`; managed settings lock skills to plugins; or `--setting-sources` omits `user`. [SK#where-synced-skills-load]

### A2. Precedence and name resolution

- [DOCUMENTED] Same name in two of enterprise/personal/project: enterprise beats personal, personal beats project. [SK] (section "Resolve skills that share a name")
- [DOCUMENTED] Summary form elsewhere: managed > user > project for skills; managed > CLI flag > project > user > plugin for subagents. [FO]
- [DOCUMENTED] Your skill versus a bundled skill of the same name: yours replaces the bundled command but not its aliases (a project `code-review` skill replaces `/code-review`; the alias `/review` still runs the bundled one). [SK]
- [DOCUMENTED] Your skill versus a built-in command (local terminal session): yours replaces the built-in but not its aliases. [SK]
- [DOCUMENTED] A skill beats a `.claude/commands/` file of the same name. [SK]
- [DOCUMENTED] Project-root skill versus nested skill with the same directory name: both load; `/deploy` runs the root one, `/apps/web:deploy` runs the nested one, and Claude is told to pick the variant whose directory holds the files it is working on. [SK#discovery-from-parent-and-nested-directories]
- [DOCUMENTED] Enterprise/personal/project skill versus a same-named skill in an added directory: the former keeps the bare name, the added one runs under a prefixed name `/<prefix>:<skill-name>` where the prefix is the added directory's folder name (v2.1.309+). Between two added directories, the first added wins the bare name. [SK#run-a-same-named-skill-from-an-added-directory], [SK#how-a-skill-gets-its-command-name]
- [DOCUMENTED] Plugin skills never collide; they are namespaced `/plugin-name:skill-name`. The bare name also invokes a plugin skill unless another command already uses it. [SK#how-a-skill-gets-its-command-name]
- [DOCUMENTED] A synced claude.ai skill loses its short name when anything else uses it and then runs only as `/anthropic-skills:<name>`. Name comparison ignores case, spacing, and invisible characters (v2.1.228+). [SK#when-a-synced-skill-name-matches-another-command]
- [DOCUMENTED] Command name source: frontmatter `name` or the directory name for personal/project skills (the directory name also invokes the skill); file name for `.claude/commands/` files; `<plugin>:<name-or-dir>` for plugin skills. [SK#how-a-skill-gets-its-command-name]

### A3. SKILL.md frontmatter fields supported by Claude Code

General rules [DOCUMENTED] [SK#frontmatter-reference]:

- All fields are optional in Claude Code; only `description` is recommended.
- Field names are lowercase hyphenated, except `when_to_use`. An unrecognized field is ignored silently (no error).
- Booleans also accept `yes`/`no`/`on`/`off`/`1`/`0` in any letter case.
- Frontmatter is only read when the opening `---` is the file's first line; otherwise the whole file is body.
- If the YAML does not parse, the skill still loads with no fields set (so `/name` works but Claude cannot match a description). `--debug` shows the parse error; `claude plugin validate <skills-dir>` finds such files (v2.1.233+). [SK#skill-not-triggering]

Origin column: **STD** = part of the open Agent Skills spec (the six fields usable outside Claude Code, per [SK#using-skill-frontmatter-outside-claude-code] and [ASPEC]); **CC** = Claude Code extension. All rows [DOCUMENTED] [SK#frontmatter-reference].

| Field | Origin | Meaning in Claude Code |
| :- | :- | :- |
| `name` | STD | Command name shown in the `/` menu. Defaults to the directory name. |
| `description` | STD | What the skill does and when to use it; Claude uses it to decide when to apply the skill. If omitted, the first non-empty body line is used. Put the key use case first (truncation, see A6). `<` and `>` display as `&lt;` and `&gt;`. |
| `license` | STD | Accepted, not acted on. |
| `compatibility` | STD | String up to 500 characters; accepted, not acted on. |
| `metadata` | STD | Free-form YAML map for your own tooling; Claude Code ignores contents and drops a non-map value. Do not reuse frontmatter field names as keys. |
| `allowed-tools` | STD (marked experimental in the spec) | Tools pre-approved without prompting during the turn that invokes the skill; the grant clears on your next message. Space- or comma-separated string, or YAML list. Does not restrict the tool set. |
| `when_to_use` | CC | Extra trigger context (phrases, example requests). Appended to `description` in the listing; counts toward the per-entry cap. |
| `argument-hint` | CC | Autocomplete hint, e.g. `[issue-number]`. |
| `arguments` | CC | Named positional arguments for `$name` substitution; space-separated string or YAML list. |
| `disable-model-invocation` | CC | `true` stops Claude from loading the skill on its own; also blocks preloading into subagents and running from a session-scoped scheduled task. Default `false`. |
| `user-invocable` | CC | `false` hides the skill from the `/` menu and stops `/name` from running it; Claude can still invoke it. Default `true`. |
| `disallowed-tools` | CC | Tools removed from Claude's pool while the skill is active; clears on your next message. Cannot remove `EndConversation` while other tools remain. |
| `model` | CC | Model for the rest of the current turn (same values as `/model`, or `inherit`). Not saved. With `context: fork` it sets the forked subagent's model. Ignored if excluded by `availableModels`. |
| `effort` | CC | Effort level for the rest of the current turn: `low`, `medium`, `high`, `xhigh`, `max`. Does not override the `CLAUDE_CODE_EFFORT_LEVEL` env var. With `context: fork` it sets the subagent's effort. |
| `context` | CC | `fork` runs the skill in a subagent context. |
| `agent` | CC | Subagent type used with `context: fork` (built-in `Explore`, `Plan`, `general-purpose`, or a custom agent). Defaults to `general-purpose`. |
| `background` | CC | Only with `context: fork`. `false` waits for the result in the invoking turn. Default `true`. |
| `hooks` | CC | Hooks registered when the skill is invoked and kept for the rest of the session (`once: true` removes a hook after its first successful run). Limits apply (1,024 hooks and 16,384 matcher characters per skill source, v2.1.304+). [HK#hooks-in-skills-and-agents] |
| `paths` | CC | Glob patterns limiting automatic activation to work on matching files. Relative to Claude's current working directory; files outside it never match. Comma-separated string or YAML list. |
| `shell` | CC | Shell for `` !`command` `` and ` ```! ` blocks: `bash` (default) or `powershell` (needs the PowerShell tool enabled). |

Portability [DOCUMENTED] [SK#using-skill-frontmatter-outside-claude-code]:

- claude.ai skill uploads, the Skills API, and `package_skill.py` from anthropics/skills accept only `name`, `description`, `license`, `compatibility`, `metadata`, `allowed-tools`. Any other key is a hard error (`Unexpected key(s) in SKILL.md frontmatter: ...`), not an ignored field.
- Claude Code-only body features such as dynamic context injection do not work in claude.ai chat or through the API.
- Frontmatter that follows the spec loads in Claude Code unchanged.

Constraints that differ by surface:

| Rule | Claude Code [SK] | Open spec [ASPEC] | Platform docs [OV], [BP] |
| :- | :- | :- | :- |
| `name` required | No (defaults to directory) | Yes | Yes |
| `name` format | Not constrained beyond refused characters and reserved names | 1 to 64 chars; lowercase `a-z`, `0-9`, hyphens; no leading, trailing, or consecutive hyphens; must match the parent directory name | Max 64 chars; lowercase letters, numbers, hyphens; no XML tags; must not contain the reserved words `anthropic` or `claude` |
| `description` required | Recommended | Yes, 1 to 1024 chars | Yes, non-empty, max 1,024 chars, no XML tags |
| `allowed-tools` format | Space- or comma-separated string, or YAML list | Space-separated string | Listed as an allowed key only [SK] |
| `metadata` type | Any YAML map | Map from string keys to string values | n/a |
| `compatibility` | Up to 500 chars | 1 to 500 chars if present | n/a |

All rows [DOCUMENTED] on the page named in the column header.

### A4. String substitutions and argument handling

All [DOCUMENTED] [SK#available-string-substitutions], [SK#pass-arguments-to-skills].

| Placeholder | Expands to |
| :- | :- |
| `$ARGUMENTS` | Full argument string as typed. |
| `$ARGUMENTS[N]` | Argument at 0-based index N. |
| `$N` | Shorthand for `$ARGUMENTS[N]` (`$0` is the first argument). |
| `$name` | Named argument declared in the `arguments` frontmatter, by position. |
| `${CLAUDE_SESSION_ID}` | Current session ID. |
| `${CLAUDE_EFFORT}` | Current effort level (`low`, `medium`, `high`, `xhigh`, `max`). |
| `${CLAUDE_SKILL_DIR}` | Directory containing this skill's `SKILL.md` (for a plugin skill: the skill subdirectory, not the plugin root). |
| `${CLAUDE_PROJECT_DIR}` | Project root (same value hooks and MCP servers receive). |
| `${CLAUDE_PLUGIN_ROOT}` | Plugin installation directory; plugin skills only. |
| `${CLAUDE_PLUGIN_DATA}` | Plugin persistent data directory; plugin skills only. |

- `${CLAUDE_SKILL_DIR}` and `${CLAUDE_PROJECT_DIR}` (and the two plugin variables in plugin skills) are substituted in two places: the skill body and Bash rules inside `allowed-tools`. Using the same variable in both lets a bundled script run without a prompt, e.g. `allowed-tools: Bash(${CLAUDE_SKILL_DIR}/scripts/render.sh *)`.
- If arguments are passed but no placeholder receives one, Claude Code appends `ARGUMENTS: <value>` to the end of the content.
- Indexed arguments use shell-style quoting. A missing indexed argument leaves the placeholder literal; a missing named argument expands to an empty string.
- Argument values are inserted literally and not re-expanded; `${CLAUDE_*}` variables are still replaced afterwards.
- A single backslash escapes an argument placeholder (`\$1.00`). The escape does not stop `${CLAUDE_*}` substitution.
- For synced claude.ai skills in ordinary local sessions, `!` commands do not run, `@` references are not attached, and `${CLAUDE_PROJECT_DIR}` / `${CLAUDE_SESSION_ID}` are not substituted. [SK] (section on the body of a synced skill)

Dynamic context injection [DOCUMENTED] [SK#inject-dynamic-context], [SK#how-injected-commands-run], [SK#when-an-injected-command-fails], [SK#permission-checks-on-injected-commands]:

- `` !`<command>` `` (inline; only recognised at line start or after whitespace) and fenced ` ```! ` blocks run before the content reaches Claude; output replaces the placeholder and is not re-scanned.
- Runs in the session shell's current working directory with the Bash tool's default 2-minute timeout.
- A failed command aborts the whole invocation (`Shell command failed for pattern "..."`); any non-zero exit fails under bash except exit code 1 from search/comparison commands.
- No permission prompt during rendering: a deny match aborts; outside auto mode anything other than "allow" aborts (`Shell command permission check failed for pattern "..."`), so pre-approve with `allowed-tools`.
- Windows: `shell: bash` without Git Bash fails the invocation before any command runs; `shell: powershell` runs through the PowerShell tool when it is enabled; otherwise Bash if available, else PowerShell.
- `disableSkillShellExecution: true` replaces each command with `[shell command execution disabled by policy]` for user, project, plugin, and additional-directory skills (bundled and managed skills unaffected). [STR#disableskillshellexecution]
- The word `ultrathink` anywhere in skill content requests deeper reasoning.

### A5. How model invocation works

- [DOCUMENTED] A skill does not add a new tool; it runs through the existing built-in **`Skill`** tool ("executes a skill within the main conversation"). The tool table marks `Skill` as "Permission required: Yes". [TR]
- [DOCUMENTED] Claude Code loads a listing of skill names and descriptions into context so Claude knows what is available; for model-invocable skills Claude sees names and descriptions in every request. Full skill content loads only when the skill is invoked (by you with `/name` or by Claude). [SK#skill-descriptions-are-cut-short], [SK#control-who-invokes-a-skill], [FO#understand-context-costs]
- [DOCUMENTED] In Claude Code the listing appears to be delivered as a system reminder rather than inside the system prompt: the bare-mode section lists "the list of available skills" among the system reminders that bare mode drops. [HL#start-faster-with-bare-mode] The platform pages instead say metadata is put in the system prompt [OV], [BP]; treat the transport as product-specific.
- [DOCUMENTED] Claude matches the task against descriptions; vague or overlapping descriptions cause wrong or missed loads. [FO#understand-context-costs]
- [DOCUMENTED] On invocation, the rendered `SKILL.md` enters the conversation as a single message and stays for later turns. The file is not re-read on later turns. Re-invoking with identical rendered content adds only a short "already loaded" note; different content (new arguments or new injected output) is appended in full. [SK#skill-content-lifecycle]
- [DOCUMENTED] After auto-compaction, the most recent invocation of each skill is re-attached, keeping the first 5,000 tokens of each within a combined budget of 25,000 tokens, filled from the most recently invoked skill; older skills can be dropped. Put critical instructions near the top. [SK#skill-content-lifecycle]
- [DOCUMENTED] Invocation matrix: default = you and Claude can invoke, description always in context; `disable-model-invocation: true` = only you, description not in context; `user-invocable: false` = only Claude, description in context. [SK#control-who-invokes-a-skill]
- [DOCUMENTED] If Claude tries to call a skill with `disable-model-invocation: true`, the call is blocked and Claude is told not to reproduce the steps another way. [SK#control-who-invokes-a-skill]
- [DOCUMENTED] `/name args` at the start of a message runs the skill directly. A `/name` after plain text does not run it; it only counts as permission for Claude to run it in that message. [SK] (section "Where you write the skill's name")
- [DOCUMENTED] A few built-in commands are reachable through the Skill tool (`/init`, `/security-review`); others such as `/compact` are not. [SK] (section "Restrict Claude's skill access")
- [DOCUMENTED] `paths` restricts automatic loading to work on matching files inside Claude's current working directory. [SK#frontmatter-reference], [SK#skill-not-triggering]
- [DOCUMENTED] In `claude -p`: user-invoked skills work by putting `/skill-name` in the prompt string (expanded before the run); stacking several skills in one message loads only the first. [HL], [SK] (section "Stack several skills in one message")
- [DOCUMENTED] A `PreToolUse` hook matching `Skill` fires only when Claude calls the tool; a typed `/skillname` bypasses `PreToolUse` and fires `UserPromptExpansion` instead (`expansion_type`, `command_name`, `command_args`, `command_source`, `prompt`). [HK]
- [UNVERIFIED] Whether every Skill tool call actually triggers a permission check that fails in a `-p` Manual-mode run. Docs give the two halves separately: `Skill` needs permission [TR], and calls needing approval are denied in `-p` runs with no approver [HL#auto-approve-tools], [PMO]. No fetched page lists exemptions. Test locally and pre-approve `Skill` in the with-skill arm.

### A6. Description budget and truncation

All [DOCUMENTED] unless tagged.

- The listing always contains every skill **name**. When the listing exceeds its character budget, **descriptions** are dropped, starting with the skills you invoke least, so most-used skills keep full text. [SK#skill-descriptions-are-cut-short]
- Budget scales at 1% of the model's context window. Setting `skillListingBudgetFraction` (default `0.01`, a fraction greater than 0 and at most 1, any settings file) raises it. [SK#skill-descriptions-are-cut-short], [STR#skilllistingbudgetfraction]
- Env var `SLASH_COMMAND_TOOL_CHAR_BUDGET` overrides the budget with a fixed character count. The env-vars row adds a fallback of 8,000 characters and calls the name legacy. [SK#skill-descriptions-are-cut-short], [ENV#variables]
- Per-entry cap: combined `description` + `when_to_use` text is cut at 1,536 characters regardless of budget; configurable with `skillListingMaxDescChars` (default `1536`, positive integer). [SK#frontmatter-reference], [STR#skilllistingmaxdescchars]
- `skillOverrides` value `"name-only"` lists a skill without its description to free budget. [SK#override-skill-visibility-from-settings]
- Diagnostics: a warning goes to the debug log (`--debug`) when the listing exceeds budget; `/doctor` estimates the listing cost; `/skill-doctor` (v2.1.252+, needs feature-flag fetching) reports cost and usage; the Skills row in `/context` shows the post-budget size. [SK#skill-descriptions-are-cut-short], [SK#find-unused-skills]
- Experiment implication [DOCUMENTED basis, inference tagged]: because description dropping depends on per-skill invocation history, listing content can differ between machines or config directories with different history [UNVERIFIED where that history is stored].
- Platform-side figures for comparison: about 100 tokens of metadata per skill, SKILL.md body under 5k tokens. [OV], [ASPEC]

### A7. Live change detection

All [DOCUMENTED] [SK#live-change-detection] unless noted.

- Claude Code watches skill directories except in bare mode. Adding, editing, or removing a skill under `~/.claude/skills/`, the project `.claude/skills/`, or `.claude/skills/` inside an `--add-dir` directory takes effect within the current session, no restart.
- A top-level skills directory that did not exist at session start is not watched: run `/reload-skills`, and again after each later change there.
- Detection covers `SKILL.md` text only. For a skill folder that is also a plugin, changes to `hooks/`, `.mcp.json`, `agents/`, `output-styles/` need `/reload-plugins`.
- In an added directory, `.claude/commands/` and `.claude/agents/` are not watched (restart needed). [SK#skills-from-additional-directories]
- A `SessionStart` hook can return `reloadSkills: true` to re-scan skill and command directories after the hook installs skills. A `ConfigChange` hook receives source `skills` when a skill file changes. [HK]
- Settings files are also watched and reloaded mid-session (including `permissions`, `hooks`); `model`, `effortLevel`, `modelSettings` are read once at session start. [ST]

### A8. Supporting files

- [DOCUMENTED] A skill directory may hold extra files; only `SKILL.md` is required. Reference them from `SKILL.md` with relative Markdown links and a note on what each contains and when to load it; they load only when needed. Scripts are executed, not loaded. [SK#add-supporting-files]
- [DOCUMENTED] Keep `SKILL.md` under 500 lines; move reference material to separate files. [SK#add-supporting-files], [BP], [ASPEC]
- [DOCUMENTED] Use `${CLAUDE_SKILL_DIR}` in commands that reference bundled scripts so paths resolve regardless of the working directory or install level (personal, project, plugin). [SK#available-string-substitutions]
- [DOCUMENTED] Spec conventions: optional `scripts/`, `references/`, `assets/`; relative paths from the skill root; references one level deep. [ASPEC]

### A9. Skills and subagents

- [DOCUMENTED] Two directions: (1) a skill with `context: fork` runs as the task prompt of a subagent of type `agent`, with that agent's system prompt; (2) a subagent with a `skills:` field has those skills' full content preloaded and receives Claude's delegation message as its task. Both start without your conversation history. [SK#run-skills-in-a-subagent], [SA#preload-skills-into-subagents]
- [DOCUMENTED] `context: fork` is not a fork of the conversation; the subagent sees only the skill content. It only makes sense for skills with an explicit task; guideline-only skills return nothing useful. [SK#run-skills-in-a-subagent]
- [DOCUMENTED] A forked skill runs in the background by default; `background: false` waits. Claude Code also waits regardless in non-interactive mode (`-p` or the Agent SDK), with `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS=1`, when the same skill is already running, and for session-scoped scheduled tasks. Background forks get the narrower background tool set. [SK#run-skills-in-a-subagent]
- [DOCUMENTED] With `agent: Explore` or `Plan` the fork starts without CLAUDE.md and git status. [SK#run-skills-in-a-subagent]
- [DOCUMENTED] A non-fork subagent starts with a fresh context and does not see skills already invoked in the main conversation. [SA#what-loads-at-startup]
- [DOCUMENTED] `skills:` controls preloading only, not access: without it a subagent can still discover and invoke project, user, and plugin skills through the Skill tool. To block skills in a subagent, omit `Skill` from `tools` or add it to `disallowedTools`. `Skill` is among the built-ins that background subagents keep. [SA#preload-skills-into-subagents], [SA#available-tools]
- [DOCUMENTED] Skills with `disable-model-invocation: true` cannot be preloaded (includes bundled `/verify`). Missing or disabled skills are skipped with a debug-log warning. Built-in agents do not preload skills. Up to the first 32 distinct names are preloaded. [SA#preload-skills-into-subagents], [SA#what-loads-at-startup]
- [DOCUMENTED] A fork (conversation fork, `/subtask`) inherits the parent's full history, system prompt, tools, and model. [SA#fork-the-current-conversation]

### A10. Docs guidance on evaluating a skill

- [DOCUMENTED] Measure separately whether Claude invokes the skill on the prompts it should, and whether output is right when it does. Method: run each realistic prompt in a fresh session with the skill available and again with it turned off. [SK] (section "Evaluate and iterate on a skill")
- [DOCUMENTED] Turning the skill off for the second run: personal or project skill, set `"off"` in `skillOverrides`; plugin skill, use `claude plugin eval` (repeats each run with no plugin loaded) because `skillOverrides` does not apply to plugin skills. [SK]
- [DOCUMENTED] `claude plugin eval` (v2.1.269+): each case runs 3 times by default in a fresh isolated `claude -p` child with only the plugin loaded, and again with no plugin; graders include `regex`, `tool_used`, `tool_order`, `file_exists`, `llm`, `baseline`; exits non-zero below `--threshold` (default 1.0). Isolation gives each run a temporary home, working directory, and Claude Code configuration; user settings, hooks, CLAUDE.md, MCP servers, other plugins, memory, and skills are absent; managed policy still applies. [PE#the-no-plugin-baseline], [PE#how-runs-are-isolated], [PE#grader-types]
- [DOCUMENTED] The skill-creator plugin runs a similar loop in-conversation with `evals/evals.json`, `grading.json`, `benchmark.json`; formats are not interchangeable with `claude plugin eval`. [SK] (section "Run evals with skill-creator")

---

## B. Every documented way to make a skill unavailable or prevent loading

Goal context: a baseline where candidate skills are genuinely absent while authentication still works.

| # | Mechanism | What it does (per docs) | Auth impact | Tag / source |
| :- | :- | :- | :- | :- |
| B1 | Do not install / delete the directory | Personal or project skill disappears when `~/.claude/skills/<name>/` or `.claude/skills/<name>/` is deleted (dropped from `/skills` in the running session too). | None | [DOCUMENTED] [SK] (section "Remove a skill") |
| B2 | `skillOverrides` setting | Per skill name: `"on"`, `"name-only"`, `"user-invocable-only"` (hidden from Claude, still typable), `"off"` (hidden from Claude and from the `/` menu, Remote Control, and SDK lists; invoking by full name returns the skillOverrides error). Any settings scope; `/skills` writes `.claude/settings.local.json`. Does not apply to plugin skills. This is the docs' own baseline method for personal/project skills. | None | [DOCUMENTED] [SK#override-skill-visibility-from-settings], [STR#skilloverrides] |
| B3 | Frontmatter `disable-model-invocation: true` | Removes the skill's description from Claude's context; Claude cannot invoke it; also blocks subagent preload. Still user-invocable with `/name`. | None | [DOCUMENTED] [SK#control-who-invokes-a-skill] |
| B4 | Frontmatter `user-invocable: false` | Hides from the `/` menu only; Claude can still invoke. Not a way to keep Claude out. | None | [DOCUMENTED] [SK#control-who-invokes-a-skill] |
| B5 | Deny the `Skill` tool | A deny rule `Skill` disables all skills for Claude. A bare tool-name deny removes the tool from Claude's context entirely. Set in `/permissions`, `permissions.deny`, or `--disallowedTools "Skill"`. | None | [DOCUMENTED] [SK] (section "Restrict Claude's skill access"), [PM#manage-permissions], [CLI#cli-flags] |
| B6 | Deny specific skills | `Skill(name)` exact; `Skill(name *)` prefix with any arguments; `Skill(skill:<name>)` parameter form matches the skill under any of its names (alias, display name). An unqualified deny also blocks a nested `dir:name` variant (v2.1.260+). A scoped rule leaves the tool available and blocks matching calls when attempted. | None | [DOCUMENTED] [SK], [PM#match-by-input-parameter], [PM#manage-permissions] |
| B7 | `--disable-slash-commands` | CLI reference text: disables all skills and commands for the session. Sessions started with it also do not watch agent directories. | None stated | [DOCUMENTED] [CLI#cli-flags], [SA#write-subagent-files] |
| B8 | `--bare` (or `CLAUDE_CODE_SIMPLE=1`) | See B-bare below. | **Breaks OAuth/keychain auth** | [DOCUMENTED] [HL#start-faster-with-bare-mode], [CLI#cli-flags], [ENV#variables] |
| B9 | `--safe-mode` (or `CLAUDE_CODE_SAFE_MODE=1`) | All customizations off: CLAUDE.md, skills, plugins, hooks, MCP servers, custom commands and agents, output styles, workflows, themes, keybindings, status line, LSP, auto memory. Managed settings policy still applies; managed plugins, managed skills, managed CLAUDE.md, policy MCP servers do not load. No skill sync. | **Auth, model selection, built-in tools, permissions work normally** | [DOCUMENTED] [CLI#cli-flags], [DBG], [ENV#variables] |
| B10 | `--setting-sources` | See B-sources below. Omitting `project` drops project, parent-directory, and `--add-dir` skills/commands/subagents; omitting `user` drops personal skills and stops claude.ai skill sync. | None stated | [DOCUMENTED] [CLI#cli-flags], [SDKF#control-filesystem-settings-with-settingsources], [PM#additional-directories-grant-file-access-not-configuration], [SK#where-synced-skills-load] |
| B11 | Fresh `CLAUDE_CONFIG_DIR` + empty working directory | Docs' "clean configuration" recipe: set `CLAUDE_CONFIG_DIR` to a fresh directory in place of `~/.claude` and pass `--setting-sources user`. First launch shows first-run setup again. Managed settings still apply and claude.ai connectors still load after login. | **Credentials file moves with the config dir**, so a login, `CLAUDE_CODE_OAUTH_TOKEN`, or `ANTHROPIC_API_KEY` is needed there | [DOCUMENTED] [DBG], [AU#credential-management] |
| B12 | `disableBundledSkills: true` or `CLAUDE_CODE_DISABLE_BUNDLED_SKILLS=1` | Removes bundled skills and workflows; built-in commands such as `/init` stay typable but are hidden from the model. Plugin, `.claude/skills/`, `.claude/commands/` skills unaffected. `/doctor` needs `DISABLE_DOCTOR_COMMAND=1` or a `skillOverrides` entry. | None | [DOCUMENTED] [STR#disablebundledskills], [ENV#variables], [SK#bundled-skills] |
| B13 | `CLAUDE_CODE_DISABLE_POLICY_SKILLS=1` | Skips skills in the system-wide managed skills directory. | None | [DOCUMENTED] [ENV#variables] |
| B14 | `syncClaudeAiSkills: false` | Stops downloading claude.ai account skills and stops loading already-synced ones. Honored from user, local, managed settings and `--settings` files; not from the shared project file. Only `false` is honored. | None | [DOCUMENTED] [STR#syncclaudeaiskills], [ST#exceptions-to-managed-settings-precedence] |
| B15 | Token or API-key auth instead of `/login` | Sessions authenticated by API key, `ANTHROPIC_AUTH_TOKEN`, `CLAUDE_CODE_OAUTH_TOKEN`, or `apiKeyHelper` do not sync claude.ai skills. Previously synced files on disk: loading under a different credential is not described [UNVERIFIED]. | n/a | [DOCUMENTED] [SK#where-synced-skills-load] |
| B16 | Plugin-level removal | Disable or uninstall the plugin (`/plugin`, `/plugin uninstall <plugin>@<marketplace>`, `claude plugin disable`), set `"name@marketplace": false` in `enabledPlugins`, or simply do not pass `--plugin-dir`. `claude plugin eval` provides the no-plugin arm. | None | [DOCUMENTED] [SK] (section "Remove a skill"), [STR#enabledplugins], [PLCR], [PE#the-no-plugin-baseline] |
| B17 | Managed `strictPluginOnlyCustomization` with `skills` | Stops loading skills from `~/.claude/skills/`, `.claude/skills/`, command folders, `--add-dir` directories, and synced skills; bundled, managed-directory, and marketplace-plugin skills still load. Managed scope only. | None | [DOCUMENTED] [STR#strictpluginonlycustomization] |
| B18 | `--tools` without `Skill` | `--tools` restricts which built-in tools Claude can use (`""` none, `"default"`, or a name list). The SDK docs say an explicit tools list must include `Skill` for Claude to invoke skills. | None | [DOCUMENTED] [CLI#cli-flags], [SDKS]; effect on the skill listing [UNVERIFIED] |
| B19 | Agent SDK `skills` option | `[]` lets Claude invoke none; a name list is an allowlist (unlisted skills are not shown to the model and the Skill tool rejects them: `Skill <name> is not in this session's skills allowlist`). `/name` dispatch still works regardless. SDK only; no CLI flag equivalent found. | None | [DOCUMENTED] [SDKS] |
| B20 | Subagent-level | Omit `Skill` from a subagent's `tools`, or add it to `disallowedTools`. | None | [DOCUMENTED] [SA#preload-skills-into-subagents] |
| B21 | `--restricted` (or `CLAUDE_CODE_RESTRICTED=1`) | For evaluation harnesses on shared machines: removes command-running tools and WebFetch unless named individually in `--tools`, confines file tools to working directories, loads only managed settings and `--settings`, refuses `bypassPermissions` (v2.1.248+). | Not stated | [DOCUMENTED] [CLI#cli-flags]; whether skills load under it [UNVERIFIED] |
| B22 | Conditions that silently keep a skill from loading or triggering | Nested location not yet touched; `paths` not matching; folder name `synced` or `anthropic-skills*`; refused characters in the name; file instead of folder; malformed YAML (loads without description); description dropped by listing budget. | None | [DOCUMENTED] [SK#where-skills-live], [SK#skill-not-triggering], [SK#skill-descriptions-are-cut-short], [DBG] |

Important caveats for a baseline:

- [DOCUMENTED] Hiding is not the same as absence. For the SDK allowlist the docs state unlisted skills' files remain on disk and stay reachable through Read and Bash. [SDKS] The same exposure for `skillOverrides: "off"`, deny rules, and `disable-model-invocation` is not stated but follows from the files still being in the workspace [UNVERIFIED]. If candidate skill files sit inside the working directory, a baseline agent could read them.
- [UNVERIFIED] Whether a `Skill` deny rule or `--disable-slash-commands` also removes the skill listing text from context (as opposed to only blocking the tool) is not described.
- [UNVERIFIED] Whether a `Skill(...)` deny rule blocks a user-typed `/name` in the prompt (which does not go through the tool) is not described.
- [DOCUMENTED] Managed settings and `~/.claude.json` are read regardless of setting sources; auto memory (`~/.claude/projects/<project>/memory/`) loads into the system prompt at session start regardless; claude.ai MCP connectors load when authenticated with a claude.ai login regardless. Disable with `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1` / `autoMemoryEnabled: false`, and `--strict-mcp-config` / `disableClaudeAiConnectors: true` / `ENABLE_CLAUDEAI_MCP_SERVERS=false`. [SDKF#what-settingsources-does-not-control]

### B-bare. Exactly what `--bare` does (per docs)

All [DOCUMENTED]; sources [CLI#cli-flags], [HL#start-faster-with-bare-mode], [ENV#variables], [PM#what-runs-before-you-trust-a-folder], [AU#generate-a-long-lived-token].

- Skips auto-discovery of hooks, skills, custom commands, subagents, installed plugins, MCP servers, auto memory, and CLAUDE.md. Sets `CLAUDE_CODE_SIMPLE`. Runs with a minimal system prompt.
- Exception: a directory passed with `--add-dir` still has its `.claude/skills/` loaded, but its `.claude/commands/` and `.claude/agents/` are skipped.
- Tools: Bash, file read, and file edit tools only (MCP tools from `--mcp-config` remain available).
- Authentication: never reads OAuth credentials or the system keychain. Anthropic auth must come from `ANTHROPIC_API_KEY` or an `apiKeyHelper` supplied in the `--settings` JSON. `CLAUDE_CODE_OAUTH_TOKEN` is NOT read. Anthropic profiles and federation variables are not read. Bedrock, Agent Platform, and Foundry keep using their provider credentials.
- Things you can still pass explicitly: `--append-system-prompt[-file]`, `--settings <file-or-json>`, `--mcp-config`, `--agents <file-or-json>`, `--plugin-dir`, `--plugin-url`.
- Hooks do not run in bare mode even when supplied through `--settings` or a flag-loaded plugin.
- During the session (v2.1.286+): only command-line MCP servers connect; Claude receives no system reminders, so it does not get the list of available skills, including skills from an `--add-dir` folder; no background commands or background subagents.
- No live change detection of skills; no claude.ai skill sync; system prompt recording stays off unless `--system-prompt-snapshot on`.
- The project's `env` block and helpers such as `awsAuthRefresh` in settings files still apply; `apiKeyHelper` is read only from `--settings`.
- `CLAUDE_CODE_DISABLE_AUTO_MEMORY=0` forces auto memory on even under `--bare`.
- Docs call `--bare` the recommended mode for scripted and SDK calls and say it will become the default for `-p` in a future release.
- Consequence for skills [DOCUMENTED basis]: with no skill listing and a tool set limited to Bash/read/edit, model-invoked skills are effectively unavailable in bare mode; an add-dir skill is loaded but not advertised. Whether `/name` in the prompt still expands such a skill in bare mode [UNVERIFIED].

### B-sources. Exactly what `--setting-sources` does (per docs)

- [DOCUMENTED] CLI reference: a comma-separated list of setting sources to load, from `user`, `project`, `local`. Example `claude --setting-sources user,project`. Sessions you background or teammates you start can inherit the list. [CLI#cli-flags]
- [DOCUMENTED] What each source loads (SDK table; the SDK's `settingSources` is the same control, and the permissions page names the CLI flag and the SDK option together) [SDKF#control-filesystem-settings-with-settingsources], [PM#additional-directories-grant-file-access-not-configuration]:
  - `project`: project `settings.json` and hooks from `<cwd>/.claude/` (no parent fallback); project CLAUDE.md and `.claude/rules/*.md` from cwd and every parent; project skills, commands, and subagents from cwd and every parent up to the repository root, plus the `.claude/skills|commands|agents` of each `--add-dir` directory.
  - `user`: `~/.claude/settings.json`; user CLAUDE.md and `~/.claude/rules/*.md`; `~/.claude/skills/`, `~/.claude/commands/`, `~/.claude/agents/`.
  - `local`: `CLAUDE.local.md` and `.claude/settings.local.json`.
- [DOCUMENTED] Default (flag omitted) equals `user,project,local`. [SDKF#control-filesystem-settings-with-settingsources], [TS#settingsource]
- [DOCUMENTED] `--setting-sources user` makes Claude Code read neither the project's settings files nor its `.mcp.json`. [PM#what-runs-before-you-trust-a-folder]
- [DOCUMENTED] Not controlled by it: managed policy settings, `~/.claude.json`, auto memory, claude.ai MCP connectors, and `sandbox.credentials` deny/mask entries. [SDKF#what-settingsources-does-not-control]
- [DOCUMENTED] A list that omits `user` stops claude.ai skill sync. [SK#where-synced-skills-load]
- [UNVERIFIED] Whether the CLI accepts an empty list (the SDK accepts `[]`), whether bundled skills and installed plugins are affected, and whether stored credentials are affected. Credentials live in `.credentials.json`, not a settings file [AU#credential-management], and the clean-config recipe uses `--setting-sources user` together with a login, which suggests auth is unaffected; not stated outright.

### B-auth. What keeps authentication working

- [DOCUMENTED] Windows credentials are stored in `%USERPROFILE%\.claude\.credentials.json`; with `CLAUDE_CONFIG_DIR` set, the file lives under that directory instead. [AU#credential-management]
- [DOCUMENTED] Credential precedence: cloud provider vars, `ANTHROPIC_AUTH_TOKEN`, `ANTHROPIC_API_KEY` (always used in `-p` when present), `apiKeyHelper`, `CLAUDE_CODE_OAUTH_TOKEN`, Anthropic profile/federation, then subscription OAuth from `/login`. [AU#authentication-precedence]
- [DOCUMENTED] `claude setup-token` prints a one-year OAuth token (needs a Pro, Max, Ultra, Team, or Enterprise plan) to set as `CLAUDE_CODE_OAUTH_TOKEN`; it can only make model requests (no Remote Control, no claude.ai connectors). Bare mode does not read it. [AU#generate-a-long-lived-token]
- [DOCUMENTED] `claude auth status` prints JSON including `authMethod` (`none`, `claude.ai`, `oauth_token`, `api_key`, `api_key_helper`, `third_party`) and `configDirectory` (v2.1.268+); exit code 0 if logged in, 1 if not. [CLI#cli-commands]
- Summary: every mechanism in section B except `--bare` leaves subscription OAuth usable; `--safe-mode` says so explicitly. A fresh `CLAUDE_CONFIG_DIR` needs its own credential.

---

## C. Subagents

### C1. File format and locations

- [DOCUMENTED] A subagent is a Markdown file with YAML frontmatter; the body is its system prompt. Only `name` and `description` are required. A subagent receives only that system prompt plus basic environment details, not the Claude Code system prompt. [SA#write-subagent-files], [SA#supported-frontmatter-fields]

| Location | Scope | Priority | Tag / source |
| :- | :- | :- | :- |
| Managed settings (`.claude/agents/` inside the managed settings directory) | Organization | 1 (highest) | [DOCUMENTED] [SA#choose-the-subagent-scope] |
| `--agents` CLI flag (JSON) | Current session | 2 | [DOCUMENTED] [SA#choose-the-subagent-scope] |
| `.claude/agents/` | Current project | 3 | [DOCUMENTED] [SA#choose-the-subagent-scope] |
| `~/.claude/agents/` | All your projects | 4 | [DOCUMENTED] [SA#choose-the-subagent-scope] |
| Plugin `agents/` directory | Where the plugin is enabled | 5 (lowest) | [DOCUMENTED] [SA#choose-the-subagent-scope] |

- [DOCUMENTED] Same name in several locations: the higher-priority location wins. [SA#choose-the-subagent-scope]
- [DOCUMENTED] Project discovery walks up from the working directory to the repository root; for the same `name` in nested `.claude/agents/` directories the one closest to the working directory wins. `--add-dir` directories' `.claude/agents/` also load. [SA#choose-the-subagent-scope]
- [DOCUMENTED] `.claude/agents/` and `~/.claude/agents/` are scanned recursively; subfolders do not affect identity (only `name` does). Duplicate names inside one tree: only one loads, chosen by filesystem read order. Plugin `agents/` subfolders do become part of the scoped name (`my-plugin:review:security`). [SA#choose-the-subagent-scope], [PLC#agents]
- [DOCUMENTED] `--agents` JSON: each top-level key is an agent name (must not start with `-`). Fields: `prompt` (the system prompt; may be empty from v2.1.281) plus `description`, `tools`, `disallowedTools`, `model`, `permissionMode`, `mcpServers`, `hooks`, `maxTurns`, `autoCompactWindow`, `skills`, `initialPrompt`, `memory`, `effort`, `background`, `omitClaudeMd`, `isolation`. `color` and `experimental` are ignored there. With `--print`, the value may instead be a path to a JSON file (v2.1.281+); interactive sessions refuse a path. The value is validated at startup and an invalid one exits (v2.1.242+). [SA#choose-the-subagent-scope], [CLI#cli-flags]
- [DOCUMENTED] Plugin subagents ignore `hooks`, `mcpServers`, `permissionMode` (and `initialPrompt`). [SA#choose-the-subagent-scope], [PLC#agents]
- [DOCUMENTED] Hot reload: `~/.claude/agents/` and `.claude/agents/` are watched; changes apply within seconds. Restart still needed when the first agent file is created in a new `agents` directory, for agents in `--add-dir` directories, and in sessions started with `--disable-slash-commands`. [SA#write-subagent-files]
- [DOCUMENTED] Files silently skipped: no `name` (treated as documentation); opening `---` not on line 1; `name` starting with `-`, containing `:`, or longer than 256 chars; `name` without `description`; unparseable YAML. Reasons go to the debug log (`--debug`). `claude plugin validate <agents-dir>` checks a directory (v2.1.233+). [SA#subagent-files-claude-code-skips]
- [DOCUMENTED] Field names are camelCase and must match exactly; unknown fields are ignored silently. The debug log at `~/.claude/debug/<session-id>.txt` lists unrecognised fields under the text `does not recognize or apply` (v2.1.296+). [SA#supported-frontmatter-fields]
- [DOCUMENTED] Combined descriptions of non-built-in subagents above 15,000 tokens trigger a startup warning (all still load). [SA]

### C2. Frontmatter fields

All rows [DOCUMENTED] [SA#supported-frontmatter-fields].

| Field | Required | Meaning |
| :- | :- | :- |
| `name` | Yes | Unique identifier, at most 256 chars, no `:`. Hooks receive it as `agent_type`. Filename need not match. |
| `description` | Yes | When Claude should delegate to this subagent. |
| `tools` | No | Allowlist (comma-separated string or YAML list). Omitted = inherits every tool available to subagents. If nothing resolves, the subagent usually fails to launch. Use `skills` to preload skills rather than listing `Skill`. |
| `disallowedTools` | No | Denylist, applied before `tools`. An entry with a specifier still removes the whole tool. |
| `model` | No | `sonnet`, `opus`, `haiku`, `fable`, a full model ID, or `inherit`. Omitted = subagent model order. |
| `permissionMode` | No | `default`, `acceptEdits`, `auto`, `dontAsk`, `bypassPermissions`, `plan` (`manual` aliases `default`). Ignored for plugin subagents. |
| `maxTurns` | No | Max agentic turns; at the limit output is returned marked partial and the subagent can be resumed. |
| `autoCompactWindow` | No | Lower auto-compact window, 100000 to 1000000 tokens (v2.1.296+). No effect when the agent runs as the main session. |
| `skills` | No | Skills preloaded into context at startup: full content, not just descriptions. |
| `mcpServers` | No | Server names (reuse) or inline definitions (scoped). Ignored for plugin subagents. |
| `hooks` | No | Lifecycle hooks active while the subagent runs. Ignored for plugin subagents. |
| `memory` | No | Persistent memory scope: `user`, `project`, or `local`. |
| `background` | No | `true` keeps it in the background even when Claude asks to wait. |
| `omitClaudeMd` | No | `true` starts it without user, project, and local CLAUDE.md (v2.1.271+). Ignored when run as the main session agent. |
| `effort` | No | `low`, `medium`, `high`, `xhigh`, `max`. Overrides the session level but not `CLAUDE_CODE_EFFORT_LEVEL`. |
| `isolation` | No | `worktree` runs it in a temporary git worktree branched from the default branch. |
| `color` | No | `red`, `blue`, `green`, `yellow`, `purple`, `orange`, `pink`, `cyan`. |
| `initialPrompt` | No | Auto-submitted first user turn when the agent runs as the main session (`--agent` or `agent` setting); commands and skills are processed; prepended to a user prompt. Ignored for plugin subagents. |
| `experimental` | No | Map; `cacheTtl: 5m` or `1h` selects prompt cache lifetime (v2.1.248+). Subagent files only. |

Related behavior:

- [DOCUMENTED] Model resolution order (v2.1.251+): per-invocation `model` parameter (aliases only), frontmatter `model`, `CLAUDE_CODE_SUBAGENT_MODEL`, then the main conversation's model. `CLAUDE_CODE_SUBAGENT_MODEL_FORCE=1` (v2.1.257+) forces one model onto every subagent. A family alias resolves to the main conversation's exact model when the main model is in that family. [SA#choose-a-model], [SA#run-every-subagent-on-one-model]
- [DOCUMENTED] Effort: frontmatter `effort`, or a per-invocation `effort` parameter (v2.1.292+) that overrides it; `CLAUDE_CODE_EFFORT_LEVEL` overrides both. With neither, a subagent on the main model runs at the session level (`/effort` or `--effort`); on another model the session level does not apply. [SA#choose-an-effort-level], [MC#adjust-effort-level]
- [DOCUMENTED] Extended thinking: subagents inherit the main session's setting (v2.1.198+); no per-subagent thinking control. [SA#choose-a-model]
- [DOCUMENTED] Tools: subagents inherit built-in and MCP tools minus two filters. Always removed: `Agent` at the depth limit, `AskUserQuestion`, `EndConversation`, `EnterPlanMode`, `ExitPlanMode` (unless `permissionMode` is `plan`), `ScheduleWakeup`, `WaitForMcpServers`, `Workflow`. Background subagents keep all MCP tools but only these built-ins: `Read`, `Grep`, `Glob`, `LSP`, `Bash`, `PowerShell`, `Edit`, `Write`, `NotebookEdit`, `WebFetch`, `WebSearch`, `TodoWrite`, `Skill`, `ToolSearch`, `EnterWorktree`, `ExitWorktree`, `Monitor`, `TaskStop`, `SendMessage`, `Artifact` (plus `SubagentHandback` when used). The same definition can therefore resolve to different tools in foreground and background. [SA#available-tools]
- [DOCUMENTED] Permission mode interplay: unset = inherit. If the main conversation is in `bypassPermissions`, `acceptEdits`, or auto, the subagent uses that mode and its own `permissionMode` is ignored. If the main is in `plan`, the subagent stays in plan. If the main is in `default` or `dontAsk`, the subagent's value applies except `bypassPermissions` (v2.1.267+) and unavailable `auto`. [SA#permission-modes]
- [DOCUMENTED] Background by default: with nothing configured, a subagent Claude spawns from the main conversation starts in the background. In `claude -p` and the Agent SDK, Claude can wait on its own judgment or when asked. `CLAUDE_CODE_FORK_SUBAGENT=0` turns fork mode off; `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS=1` makes Claude wait. [SA#run-subagents-in-foreground-or-background], [SA#let-claude-wait-for-a-subagent]
- [DOCUMENTED] Nesting depth default: 3 layers below the main conversation (`CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH`; `1` disables nesting). Concurrency default: 20 running subagents (`CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS`, v2.1.217+). [SA#let-subagents-spawn-their-own-subagents], [SA]
- [DOCUMENTED] Startup context of a non-fork subagent: its own system prompt plus environment details; Claude's delegation message; the full CLAUDE.md hierarchy (skipped by Explore and Plan; reduced by `omitClaudeMd`); a git status snapshot; preloaded skills; a sibling roster when applicable. Not passed: output style, auto memory, the parent's context window size. [SA#what-loads-at-startup]
- [DOCUMENTED] Memory scopes: `user` = `~/.claude/agent-memory/<agent>/`, `project` = `.claude/agent-memory/<agent>/`, `local` = `.claude/agent-memory-local/<agent>/`. Enabling memory auto-enables Read, Write, and Edit and injects the first 200 lines or 25KB of `MEMORY.md`. No effect when auto memory is off. [SA#enable-persistent-memory]
- [DOCUMENTED] Restrict or disable: `permissions.deny` entries `Agent(<name>)` or `--disallowedTools "Agent(<name>)"`; deny `Agent` to stop all delegation; `CLAUDE_CODE_DISABLE_EXPLORE_PLAN_AGENTS=1`; `CLAUDE_AGENT_SDK_DISABLE_BUILTIN_AGENTS=1` removes all built-in types in non-interactive mode and the SDK. [SA#disable-specific-subagents], [SA#built-in-subagents], [PM#agent-subagents]
- [DOCUMENTED] Built-in types: Explore (read-only), Plan (read-only), general-purpose (all subagent tools), plus `claude`, `statusline-setup`, `claude-code-guide`. A user or project subagent named `Explore` overrides the built-in. [SA#built-in-subagents]

### C3. Skills and subagents: inheritance and the `skills:` field

- [DOCUMENTED] Subagents do not inherit skills already invoked in the parent conversation (fresh context). [SA#what-loads-at-startup]
- [DOCUMENTED] Subagents can still discover and invoke project, user, and plugin skills through the Skill tool at run time, with or without a `skills:` field. [SA#preload-skills-into-subagents], [SA#supported-frontmatter-fields]
- [DOCUMENTED] `skills:` injects the **full content** of each listed skill at startup (first 32 distinct names), not only the description. It selects what is preloaded, not what is accessible. [SA#preload-skills-into-subagents]
- [DOCUMENTED] Cannot preload skills with `disable-model-invocation: true`. Missing or disabled skills are skipped with a debug-log warning. [SA#preload-skills-into-subagents]
- [UNVERIFIED] Whether `skills:` preloading also applies when the agent is run as the main session via `--agent`. The docs explicitly cover `mcpServers`, `hooks`, `initialPrompt`, `omitClaudeMd`, and `autoCompactWindow` for the main-session case, but not `skills`.
- [UNVERIFIED] How preloaded skill names resolve for plugin skills (`plugin:skill` form) inside `skills:`.

### C4. Running the main session as a named agent

- [DOCUMENTED] `claude --agent <name>` starts a session where the main thread takes on that subagent's tool restrictions and model. Unless the agent's prompt is empty, its system prompt replaces the default Claude Code system prompt entirely (like `--system-prompt`). CLAUDE.md and project memory still load through the normal message flow, even with `omitClaudeMd`. [SA#invoke-subagents-explicitly]
- [DOCUMENTED] With `-p` and a custom agent that has its own prompt, the session also starts without the git status snapshot. [SA#invoke-subagents-explicitly]
- [DOCUMENTED] Setting `"agent": "<name>"` in a settings file (any scope) makes it the default; `--agent` overrides the setting for one session. Works with built-in and custom agents; plugin agents can be named bare or scoped (`my-plugin:agent`). The choice persists on resume. [SA#invoke-subagents-explicitly], [STR#agent], [CLI#cli-flags]
- [DOCUMENTED] In the main-session case: frontmatter hooks fire alongside settings hooks; inline `mcpServers` connect at startup under the trust rule; `initialPrompt` is auto-submitted; `tools: Agent(worker, researcher), ...` is an allowlist of spawnable subagent types (only meaningful for a main-thread agent). [SA], [SA#scope-mcp-servers-to-a-subagent]
- [DOCUMENTED] Other explicit invocation forms: natural language naming the agent (Claude decides); `@"name (agent)"` or `@agent-<name>` mention (guarantees that subagent runs for one task). [SA#invoke-subagents-explicitly]
- [DOCUMENTED] `--append-subagent-system-prompt` and `--append-subagent-system-prompt-file` (print mode only; v2.1.205+ and v2.1.261+) append text to every non-fork subagent's system prompt. [CLI#cli-flags]

### C5. Windows-specific caveats (subagents and related)

- [DOCUMENTED] `--agents` JSON in PowerShell: the docs show a single-quoted here-string (`@' ... '@`) rather than the bash single-quote form. [SA#choose-the-subagent-scope]
- [DOCUMENTED] Hook scripts for subagents on Windows: write them in PowerShell and add `shell: powershell` to the hook entry (hooks spawn PowerShell directly, independent of `CLAUDE_CODE_USE_POWERSHELL_TOOL`). [SA], [TR#powershell-tool]
- [DOCUMENTED] `isolation: worktree`: Bash commands get both working-directory and git-redirect checks; PowerShell commands get only the working-directory check. [SA#write-subagent-files]
- [DOCUMENTED] In hook input on Windows, `tool_input.file_path` arrives with backslash separators even under Git Bash; normalize before comparing. [HK#pretooluse-input]
- [DOCUMENTED] Native Windows needs no Git for Windows; without it shell commands go through the PowerShell tool. With Git Bash installed the PowerShell tool is on by default for claude.ai and Console accounts only when feature flags are fetched; with flag fetching off (`DISABLE_TELEMETRY`, `DO_NOT_TRACK`, `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC`, `CLAUDE_CODE_DISABLE_FEATURE_FLAGS`) commands route through Git Bash unless `CLAUDE_CODE_USE_POWERSHELL_TOOL=1`. This can change the tool set between runs. [SU#set-up-on-windows], [TR#powershell-tool], [ENV#features-that-need-feature-flag-fetching]
- [DOCUMENTED] On Windows with Git Bash, any Bash deny rule (even scoped) silently turns the PowerShell tool off unless `CLAUDE_CODE_USE_POWERSHELL_TOOL=1` or a scoped PowerShell rule exists. [TR#powershell-tool]
- [DOCUMENTED] Sandboxing is not supported on native Windows; PowerShell profiles are not loaded. [TR#powershell-tool], [SU#set-up-on-windows]
- [DOCUMENTED] `--tools` note: on macOS, Linux, and WSL the default tool set leaves out `Glob` and `Grep`; native Windows is not in that list. [CLI#cli-flags]
- [DOCUMENTED] `.claude/settings.local.json` stays beside `.claude/settings.json` on Windows instead of moving to the repository root. [ST#where-claude-code-keeps-the-local-file-in-a-git-repository]
- [DOCUMENTED] Network paths such as `\\server\share` cannot be added with `--add-dir`; map a drive letter. [PM#working-directories]
- [DOCUMENTED] `CLAUDE_CODE_PLUGIN_DIRS` uses `;` as the path separator on Windows; paths must be absolute or start with `~`. [ENV#variables]
- [DOCUMENTED] In PowerShell, `$env:CLAUDE_CONFIG_DIR = ...` stays set for the rest of that shell session (remove with `Remove-Item Env:CLAUDE_CONFIG_DIR`). [DBG]
- [DOCUMENTED] Startup failure reason `shell_tool_missing` exists for Windows with neither Git Bash nor a usable PowerShell. [TS#sdkresultmessage]

---

## D. Headless CLI for controlled runs

### D1. Print mode basics

- [DOCUMENTED] `-p` / `--print` runs non-interactively and exits. Exit code 0 on success, non-zero on failure; an invalid flag is reported on stderr before the run; a failure inside the run (e.g. missing auth) is printed as the result on stdout. SIGTERM exits with code 143 and records no result for the in-progress turn. [HL], [CLI#cli-flags]
- [DOCUMENTED] Without `--bare`, `claude -p` discovers and loads hooks, skills, plugins, MCP servers, memory, and CLAUDE.md like an interactive session, including from the working directory and `~/.claude`. It shows no workspace trust dialog: project hooks run and `.mcp.json` servers connect even in a never-trusted folder; project `permissions.allow` rules are NOT applied in an untrusted folder (stderr warning); a project skill's `allowed-tools` and hooks ARE applied. [HL#start-faster-with-bare-mode], [PM#what-runs-before-you-trust-a-folder]
- [DOCUMENTED] Piped stdin is capped at 10MB. [HL]
- [DOCUMENTED] After the final turn a `-p` run can stay open for background work; idle waiting is capped at 10 minutes by default (`CLAUDE_CODE_PRINT_BG_WAIT_CEILING_MS`, `0` = no cap). [HL#background-tasks-at-exit]
- [DOCUMENTED] Sessions from `-p` are persisted by default and can be continued with `-p --continue` or `--resume <id>`; a resumed run reports the conversation's whole cost total (v2.1.277+). [HL#continue-conversations], [COST]

### D2. Flags

All rows [DOCUMENTED] [CLI#cli-flags] unless another source is named.

| Flag | Documented behavior |
| :- | :- |
| `-p`, `--print` | Print response without interactive mode. |
| `--output-format` | Print mode output: `text` (default), `json` (structured JSON with result, session ID, metadata), `stream-json` (newline-delimited JSON events). [HL#get-structured-output] |
| `--verbose` | Verbose logging with full turn-by-turn output. Every documented `stream-json` example passes `--verbose`. A hard "stream-json requires --verbose" rule is not stated on the fetched pages [UNVERIFIED]; `--prompt-suggestions` explicitly requires `--print`, `stream-json`, and `--verbose`. |
| `--include-partial-messages` | Emits partial streaming events (`type: "stream_event"`); requires `--print` and `--output-format stream-json`. |
| `--include-hook-events` | Adds hook lifecycle events to the stream; requires `stream-json`. `SessionStart` and `Setup` hook events are always included. |
| `--forward-subagent-text` | Emits subagent text and thinking blocks with `parent_tool_use_id` set; requires `--print` and `stream-json` (v2.1.211+). Env equivalent `CLAUDE_CODE_FORWARD_SUBAGENT_TEXT=1`. |
| `--input-format` | `text` or `stream-json` (print mode). `--replay-user-messages` re-emits stdin user messages (needs both stream-json formats). |
| `--model` | Alias (`sonnet`, `opus`, `haiku`, `fable`) or a full model name. Overrides the `model` setting and `ANTHROPIC_MODEL`. Aliases move over time; pin a full ID for reproducibility. [MC] |
| `--effort` | `low`, `medium`, `high`, `xhigh`, `max`, or `ultracode` (xhigh plus dynamic workflows). Session only. Available levels depend on the model. `CLAUDE_CODE_EFFORT_LEVEL` takes precedence over it. [MC#adjust-effort-level] |
| `--fallback-model` | Comma-separated models tried in order when the primary is overloaded or unavailable. Overrides the `fallbackModel` setting. |
| `--max-turns` | Limit on agentic turns (print mode only); no limit by default. Env equivalent `CLAUDE_CODE_MAX_TURNS` (flag wins). Hitting it yields result subtype `error_max_turns` with no final response. [LOOP] |
| `--max-budget-usd` | Stops when the client-side cost estimate reaches the amount (print mode only). Subagent spend counts. Spend can overshoot by one response. Result subtype `error_max_budget_usd`. [LOOP] |
| `--permission-mode` | `default`, `acceptEdits`, `plan`, `auto`, `dontAsk`, `bypassPermissions`; `manual` aliases `default` (v2.1.200+). Overrides `defaultMode`. |
| `--dangerously-skip-permissions` | Same as `--permission-mode bypassPermissions`. |
| `--permission-prompts` | `host` (default) or `none`; `none` denies anything that would prompt and tells Claude not to retry (v2.1.259+). [HL#turn-off-permission-prompts-in-unattended-runs] |
| `--permission-prompt-tool` | MCP tool (`mcp__<server>__<tool>`) that answers permission prompts in non-interactive mode. |
| `--allowedTools`, `--allowed-tools` | Allow rules: listed tools run without prompting. Uses permission rule syntax. Examples show both space-separated arguments (`"Bash(git log *)" "Read"`) and one comma-separated string (`"Bash,Read,Edit"`). Pre-approves; does not restrict. [HL#auto-approve-tools] |
| `--disallowedTools`, `--disallowed-tools` | Deny rules. A bare tool name removes the tool from Claude's context (`"Edit"`, `"*"`, `"mcp__*"`); a scoped rule such as `Bash(rm *)` leaves the tool and denies matching calls. |
| `--tools` | Restricts built-in tools: `""` none, `"default"`, or names like `"Bash,Edit,Read"`. Does not affect MCP tools. |
| `--add-dir` | Extra working directories (file access). Validates each path is an existing directory. Example `claude --add-dir ../apps ../lib`. Loads that directory's skills, commands, and agents as exceptions (section A1). |
| `--append-system-prompt`, `--append-system-prompt-file` | Append text to the default system prompt (file content first when both are given). |
| `--system-prompt`, `--system-prompt-file` | Replace the entire default system prompt (drops default tool guidance and safety instructions; in `-p` the git status snapshot is also dropped). Can be combined with the append flags. [HL] |
| `--system-prompt-snapshot` | `off` rebuilds the prompt every request; default reuses the prompt recorded on the conversation's first request (v2.1.257+). |
| `--exclude-dynamic-system-prompt-sections` | Moves per-user context out of the system prompt into the first user message for better cache reuse; default system prompt only. |
| `--settings` | Path to a settings JSON file or an inline JSON string; overrides the same keys in settings files for the session. Regular file up to 2 MiB. Sits below managed settings and above local, project, and user files. Can set any key a user settings file can. [ST#change-a-setting-for-one-session], [ST#settings-precedence] |
| `--setting-sources` | See B-sources. |
| `--mcp-config` | Load MCP servers from JSON files or strings. With `-p`, waits for pending servers up to `MCP_TIMEOUT` (30 s default) before the first turn (v2.1.221+). |
| `--strict-mcp-config` | Use only servers from `--mcp-config`, ignoring all other MCP configuration. |
| `--no-session-persistence` | Print mode only: session not saved to disk, cannot be resumed. `CLAUDE_CODE_SKIP_PROMPT_HISTORY=1` does the same in any mode. |
| `--session-id` | Use a specific session ID; must be a valid UUID. |
| `--json-schema` | Validated JSON output matching a JSON Schema (print mode only); result arrives in `structured_output`; invalid schema exits with an error; the field is absent if no valid output was produced. [HL#get-structured-output] |
| `--agent` | Run the session as a named agent (overrides the `agent` setting). |
| `--agents` | Define subagents via JSON (or a JSON file path with `--print`). |
| `--plugin-dir` | Load a plugin from a directory or `.zip`, or a folder of plugins (v2.1.265+), for this session only. One path per flag; repeat the flag. A directory with no manifest is named after the directory. [PLCR] |
| `--bare` | See B-bare. |
| `--safe-mode` | See B9. |
| `--restricted` | See B21. |
| `--disable-slash-commands` | Disable all skills and commands for this session. |
| `--debug` | Debug mode with optional category filter that only binds in the `=` form (`--debug='mcp,startup'`, `--debug='!mcp'`). |
| `--debug-file <path>` | Write debug logs to a file; implies debug mode. Default log path is `~/.claude/debug/<session-id>.txt`. [ENV#variables] |
| `--continue`, `--resume`, `--fork-session` | Continue or resume; `claude -p --continue` includes `-p` sessions. |
| `--init`, `--maintenance` | Run Setup hooks before the session (print mode only). |

Permission behavior in `-p`:

- [DOCUMENTED] With no mode set, `claude -p` runs start in `default` (Manual) mode (v2.1.302+). Calls needing approval are denied unless an allow rule, hook, `canUseTool` callback, or `--permission-prompt-tool` approves them. Calls that need no approval (file reads in working directories, the read-only command set) still run. [PMO#which-mode-a-session-starts-in], [HL#auto-approve-tools]
- [DOCUMENTED] `dontAsk` denies every call that would prompt; `acceptEdits` auto-approves file edits and common filesystem commands; `auto` uses a classifier. `permissions.defaultMode` values `auto` and `bypassPermissions` do not take effect from project or local settings. [HL#auto-approve-tools], [ST]
- [DOCUMENTED] Rule evaluation order is deny, then ask, then allow; a deny at any level cannot be overridden by another level, including `--allowedTools`. [PM#manage-permissions], [PM#settings-precedence]
- [DOCUMENTED] Rule syntax is `Tool` or `Tool(specifier)`. Skill rules: `Skill(name)`, `Skill(name *)`. Allow rules match only the skill's own name and the name in Claude's invocation; plugin or synced names need their namespace (e.g. `Skill(anthropic-skills:pdf)`). Deny and ask rules can match a top-level input parameter with `Tool(param:value)`, e.g. `Skill(skill:<name>)`. Running with `--verbose` shows exact parameter names and values of each tool call. [PM#match-by-input-parameter], [SK], [TR]

### D3. Output: the final result object

Field list from the SDK type `SDKResultMessage` [DOCUMENTED] [TS#sdkresultmessage]. The headless page confirms that `--output-format json` returns the text in `result`, a `session_id`, `total_cost_usd`, a per-model cost breakdown, and `structured_output`, and that the last `stream-json` line is a `result` message [DOCUMENTED] [HL#get-structured-output]. Exact field-for-field parity of the CLI JSON with the SDK type on v2.1.322 [UNVERIFIED]; confirm with one local run.

| Field | Notes |
| :- | :- |
| `type` = `"result"`, `subtype` | `success`, `error_max_turns`, `error_during_execution`, `error_max_budget_usd`, `error_max_structured_output_retries`. |
| `is_error` | Boolean. |
| `result` | Final text; success variant only. |
| `session_id`, `uuid` | Identifiers. |
| `duration_ms`, `duration_api_ms` | Durations (semantics not elaborated on the page; `duration_api_ms` includes work done while waiting for background subagents [COST]). |
| `num_turns` | Turn count. |
| `total_cost_usd` | Client-side estimate; includes subagents; not billing data. |
| `usage` | Main agent loop only: `input_tokens`, `output_tokens`, `cache_creation_input_tokens`, `cache_read_input_tokens`, `cache_creation.{ephemeral_5m_input_tokens, ephemeral_1h_input_tokens}`, `server_tool_use`, `service_tier`, `speed`, `inference_geo`, `iterations`, `output_tokens_details.thinking_tokens`, `fallback_credit`. Excludes subagents. [TS#usage] |
| `modelUsage` | Map of model name to `inputTokens`, `outputTokens`, `thinkingTokens?`, `cacheReadInputTokens`, `cacheCreationInputTokens`, `webSearchRequests`, `costUSD`, `contextWindow`, `maxOutputTokens`, `canonicalModel?`, `provider?`, `costBasis?`. Includes subagents and internal calls such as compaction. [TS#modelusage] |
| `permission_denials` | Array of `{tool_name, tool_use_id, tool_input}`; the authoritative record of denials. [TS#sdkpermissiondenial] |
| `stop_reason` | e.g. `end_turn`, `max_tokens`, `refusal`; `null` after a crash. [LOOP] |
| `structured_output` | Present only with `--json-schema` and valid output. |
| `terminal_reason` | e.g. `completed`, `max_turns`, `budget_exhausted`, `api_error`, `prompt_too_long`. |
| `errors` | String array on error variants. |
| Optional timing | `ttft_ms`, `ttft_stream_ms`, `time_to_request_ms`, `first_content_frame_ms` (success variant). |
| Other optional | `api_error_status`, `result_index`, `fast_mode_state`, `fast_mode_disabled_reason`, `deferred_tool_use`, `startup_failure_reason`, `origin`, `queued_turn_count`, `local_command`. |

Accounting cautions [DOCUMENTED] [COST], [TS#sdkresultmessage]:

- Use `modelUsage` and `total_cost_usd` for whole-run accounting; `usage` undercounts as soon as a subagent (including a forked skill) runs.
- Per-step `output_tokens` on assistant messages is a placeholder from `message_start`; read output tokens from the result. Parallel tool calls produce several assistant messages sharing one `message.id`; deduplicate by ID.
- On `error_max_budget_usd`, `usage` omits the response that crossed the budget while `total_cost_usd` and `modelUsage` include it. After a crash the final result may carry zeroed totals.
- Costs come from a price table bundled at build time unless a `modelPricing` table applies.

### D4. Output: `stream-json` events

- [DOCUMENTED] First event is `system`/`init` unless startup events precede it (`plugin_install`, or `hook_started`/`hook_progress`/`hook_response` for `SessionStart` or `Setup` hooks). [HL]
- [DOCUMENTED] `system`/`init` fields: `session_id`, `uuid`, `agents?`, `apiKeySource`, `betas?`, `claude_code_version`, `cwd`, `tools`, `mcp_servers[{name, status, source?}]`, `model`, `permissionMode`, `slash_commands`, `output_style`, `skills`, `plugins[{name, path}]`, `plugin_errors?`, `mcp_server_errors?`, `capabilities?`, `fast_mode_state?`. [TS#sdksystemmessage], [HL]
- [DOCUMENTED] `init.skills` lists user-invocable skills that define a `description` or `when_to_use`, plus bundled skills. A skill with `user-invocable: false` is loaded but does not appear there or in `slash_commands`. `init.slash_commands` mixes built-in commands, bundled skills, user-invocable skills, and command files. [SDKS]
- [DOCUMENTED] `assistant` messages carry `message` (an Anthropic API message with `id`, `content`, `model`, `stop_reason`, `usage`), `parent_tool_use_id` (`null` for the main conversation), `session_id`, `uuid`, and optionally `agent_id`, `timestamp`, `error`. Each assistant message carries a single content block (text or a tool call). `user` messages carry tool results. [TS#sdkassistantmessage], [LOOP]
- [DOCUMENTED] `stream_event` messages (only with `--include-partial-messages`) wrap raw API stream events; emitted for the main session only. Example filter from the docs: `.type == "stream_event"` and `.event.delta.type == "text_delta"`. [HL], [TS]
- [DOCUMENTED] `system`/`api_retry` events: `attempt`, `max_retries`, `retry_delay_ms`, `error_status`, `error`. `system`/`permission_denied` events: `tool_name`, `tool_use_id`, `agent_id?`, `decision_reason_type?`, `decision_reason?`, `message` (best-effort; `permission_denials` on the result is authoritative; emitted in plain `-p` runs that have no permission callback or prompt tool from v2.1.223; never emitted when `--permission-prompt-tool` is set with the default `host` prompts). [HL], [TS]
- [DOCUMENTED] Subagent and forked-skill messages appear as `assistant` and `user` messages whose `parent_tool_use_id` is the ID of the `Agent` or `Skill` `tool_use` block that started them. By default only their `tool_use` and `tool_result` blocks are forwarded; text and thinking need `--forward-subagent-text`. A forked skill started by passing `/<skill-name>` as the prompt has no tool call; its messages carry a `parent_tool_use_id` starting with `forked-command-` and arrive together after it finishes (v2.1.287+). [HL#follow-subagent-messages]

How a Skill invocation appears [DOCUMENTED unless tagged]:

- The skill invocation appears in the stream as a **`Skill` tool use**, followed by the tool calls the skill leads to. [SDKS]
- Tool name is exactly `Skill`. [TR]
- Input shape: the JSON-encoded input contains a `"skill"` key whose value is the skill name, optionally in `plugin-name:skill-name` form. Evidence: the documented grader regex `'"skill"\s*:\s*"(?:[\w-]+:)?your-skill-name"'` for `tool_used` with `tool: Skill`, and the permission parameter form `Skill(skill:<name>)`, which matches a top-level input parameter. [PE], [PM#match-by-input-parameter]
- [UNVERIFIED] The name of the arguments key in the Skill tool input (not shown on any fetched page), and the exact text of the Skill `tool_result`. The hooks reference and the TypeScript tool-input reference do not list a Skill input schema.
- A user-typed `/skill-name` at the start of the prompt is expanded before the run and produces no `Skill` tool call. [HL], [HK]

### D5. Environment variables relevant to controlled runs

All [DOCUMENTED] [ENV#variables] unless noted.

| Variable | Effect |
| :- | :- |
| `CLAUDE_CONFIG_DIR` | Overrides the configuration directory (default `~/.claude`): settings, session history, plugins, and `.credentials.json` live under it. Ignored in project and local settings `env`. |
| `ANTHROPIC_API_KEY` | Used instead of the subscription; always used in `-p` when present. |
| `CLAUDE_CODE_OAUTH_TOKEN` | OAuth token from `claude setup-token`; takes precedence over stored credentials; not read in bare mode. |
| `ANTHROPIC_MODEL` | Model setting; overridden by `--model`. |
| `CLAUDE_CODE_EFFORT_LEVEL` | `low`..`max`, or `auto`/`unset` to send no level. Overrides `--effort`, `/effort`, and settings. |
| `MAX_THINKING_TOKENS` | Fixed thinking budget; `0` disables thinking on the Anthropic API except on Opus 5.5, Sonnet 5.5, Haiku 5.5, and Fable models, where thinking cannot be turned off. Ignored as a number on adaptive-reasoning models. |
| `CLAUDE_CODE_DISABLE_THINKING` | Omits the `thinking` parameter (compatibility option; the model may still think). |
| `CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING` | Reverts Opus 4.6 and Sonnet 4.6 to the fixed budget; no effect on newer models. |
| `CLAUDE_CODE_SIMPLE` | Same as `--bare`. |
| `CLAUDE_CODE_SAFE_MODE` | Same as `--safe-mode`; inherited by directly spawned children. |
| `CLAUDE_CODE_RESTRICTED` | Same as `--restricted`; ignored in settings `env`. |
| `CLAUDE_CODE_DISABLE_BUNDLED_SKILLS` | Removes bundled skills and workflows. |
| `CLAUDE_CODE_DISABLE_POLICY_SKILLS` | Skips the managed skills directory. |
| `SLASH_COMMAND_TOOL_CHAR_BUDGET` | Fixed character budget for the skill listing. |
| `CLAUDE_CODE_SYNC_SKILLS` (+ `_WAIT_TIMEOUT_MS`, `_INSTALL_TIMEOUT_MS`) | Make a `-p` run download claude.ai skills and wait for the list. |
| `CLAUDE_CODE_DISABLE_CLAUDE_MDS` | Loads no CLAUDE.md memory files (user, project, auto memory). |
| `CLAUDE_CODE_DISABLE_AUTO_MEMORY` | `1` disables auto memory; `0` forces it on. |
| `CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS` | Removes built-in commit/PR instructions and the git status snapshot. |
| `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS` | No background commands, subagents, or forked-skill background runs. |
| `CLAUDE_CODE_FORK_SUBAGENT` | `0` turns fork mode off. [SA] |
| `CLAUDE_CODE_SUBAGENT_MODEL`, `CLAUDE_CODE_SUBAGENT_MODEL_FORCE` | Default or forced subagent model. [SA] |
| `CLAUDE_CODE_DISABLE_EXPLORE_PLAN_AGENTS`, `CLAUDE_AGENT_SDK_DISABLE_BUILTIN_AGENTS` | Remove built-in subagent types. [SA] |
| `CLAUDE_CODE_MAX_TURNS` | Turn cap when `--max-turns` is absent. |
| `CLAUDE_CODE_SKIP_PROMPT_HISTORY` | No prompt history or transcripts written. |
| `CLAUDE_CODE_PRINT_BG_WAIT_CEILING_MS` | Idle wait cap for background work at the end of a `-p` run (default 600000). |
| `CLAUDE_CODE_FORWARD_SUBAGENT_TEXT` | Same as `--forward-subagent-text`. |
| `CLAUDE_CODE_PLUGIN_DIRS` | Plugin directories loaded like `--plugin-dir` (v2.1.280+). |
| `CLAUDE_CODE_USE_POWERSHELL_TOOL` | `1` enables, `0` disables the PowerShell tool. |
| `CLAUDE_CODE_GIT_BASH_PATH` | Windows only: path to `bash.exe`. |
| `CLAUDE_CODE_DEBUG_LOGS_DIR`, `CLAUDE_CODE_DEBUG_LOG_LEVEL` | Debug log file path (needs debug mode) and minimum level. |
| `CLAUDE_CODE_SIMPLE_SYSTEM_PROMPT` | Chooses the full or the shorter system prompt; default depends on the model. |
| `DISABLE_TELEMETRY` | Any non-empty value opts out (even `0`); also disables feature-flag fetching. |
| `DO_NOT_TRACK` | `1` opts out of telemetry and feature-flag fetching. |
| `DISABLE_ERROR_REPORTING` | Any non-empty value opts out. |
| `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` | Any non-empty value disables auto-updates, telemetry, error reporting, release notes, availability checks, and feature-flag fetching. |
| `CLAUDE_CODE_DISABLE_FEATURE_FLAGS` (older `DISABLE_GROWTHBOOK`) | Turns off feature-flag fetching (v2.1.319+). |
| `DISABLE_AUTOUPDATER`, `DISABLE_UPDATES` | Disable background updates / all updates. |
| `DISABLE_PROMPT_CACHING` | Disables prompt caching for all models. |
| `ENABLE_CLAUDEAI_MCP_SERVERS` | `false` stops fetching claude.ai MCP servers. |
| `ENABLE_TOOL_SEARCH` | Controls MCP tool-search deferral. |
| `API_TIMEOUT_MS` | Per-attempt time to receive response headers (default 600000). |
| `BASH_DEFAULT_TIMEOUT_MS`, `BASH_MAX_TIMEOUT_MS` | Foreground Bash/PowerShell timeout default (120000) and ceiling (600000). |
| `MCP_TIMEOUT`, `MCP_TOOL_TIMEOUT` | MCP startup timeout (30000) and tool execution timeout. |
| `CLAUDE_CODE_MAX_RETRIES` | API retry count (default 10). |
| `CLAUDECODE`, `CLAUDE_CODE_SESSION_ID`, `CLAUDE_EFFORT`, `CLAUDE_CODE_CHILD_SESSION` | Set automatically in subprocesses Claude Code spawns. |

Precedence notes [DOCUMENTED] [ENV], [ST#settings-precedence]:

- Settings precedence, highest first: managed, command line (`--settings`), project local, shared project, user. List keys such as `permissions.allow` merge across files instead of overriding.
- Environment variables are not a level in that stack; each variable/key pair has its own rule. A variable set in a settings `env` block usually replaces the value inherited from the shell.
- Feature-flag fetching is skipped with the telemetry/traffic variables above, on third-party providers, and in gateway sessions. With it off, among other things: no claude.ai skill or plugin sync, no `/skill-doctor`, and the Windows PowerShell-tool default changes. In a clean environment on every run, every run counts as a "first session" and flag-gated features can be missing. [ENV#features-that-need-feature-flag-fetching]

### D6. Model and reasoning controls

- [DOCUMENTED] Default effort when nothing sets one: `medium` on Fable 5.2, Opus 5.5, Sonnet 5.5, Haiku 5.5; `xhigh` on Opus 4.7; `high` on other effort-capable models. Resolution order: `CLAUDE_CODE_EFFORT_LEVEL`, in-session choice, `--effort`, settings (`modelSettings`, `effortLevel`), model default. An unsupported level falls back to the highest supported level at or below it. [MC#adjust-effort-level]
- [DOCUMENTED] The effort scale is calibrated per model, so the same level name is not comparable across models. [MC#adjust-effort-level]
- [DOCUMENTED] `/model`, `/effort`, `/fast`, `/color`, `/rename` accept their value as an argument in `-p`; `/config key=value` changes a setting (e.g. `/config thinking=false`). [HL]
- [DOCUMENTED] A skill's or subagent's `effort` and a skill's `model` override the session values while they apply, so a skill under test can itself change the reasoning level. [MC#adjust-effort-level], [SK#frontmatter-reference]
- [DOCUMENTED] Aliases: `opus`, `sonnet`, `haiku` resolve to Opus 5.5, Sonnet 5.5, Haiku 5.5 on the Anthropic API; `fable` resolves to Fable 5.2 outside gateway sessions. Aliases update over time. [MC]

### D7. Transcripts and other machine-readable evidence

- [DOCUMENTED] Transcripts are JSONL at `~/.claude/projects/<project>/<session-id>.jsonl` (`<project>` = working directory path with non-alphanumerics replaced by `-`). The entry format is internal and can change between releases; docs recommend the `-p` JSON/stream outputs or hooks instead. Retention defaults to 30 days (`cleanupPeriodDays`). [SE#where-transcripts-are-stored]
- [DOCUMENTED] Hooks and status line commands receive a `transcript_path` field. [SE]
- [DOCUMENTED] Subagent transcripts live under `~/.claude/projects/{project}/{sessionId}/subagents/` with `agent-{agentId}.meta.json` files. [SA]

---

## E. Anthropic authoring best practices (checkable rules)

All [DOCUMENTED] [BP] unless another key is given. The platform page is product-agnostic; where Claude Code differs it is noted.

Core principles:

1. Be concise: add only context Claude does not already have; question each paragraph's token cost. The example contrasts roughly 50 tokens against roughly 150 for the same instruction.
2. Match degrees of freedom to task fragility: high freedom (text instructions) when several approaches are valid; medium (pseudocode or parameterised scripts) when a preferred pattern exists; low (exact script, no modification) when operations are fragile or order matters.
3. Test with every model you plan to use (Haiku: enough guidance? Sonnet: clear and efficient? Opus: not over-explained?).

Metadata rules:

4. `name`: max 64 chars; lowercase letters, numbers, hyphens only; no XML tags; must not contain `anthropic` or `claude`. [BP], [OV]
5. `description`: non-empty; max 1,024 chars; no XML tags; states both what the skill does and when to use it. [BP], [OV]
6. Naming convention: prefer gerund form (`processing-pdfs`, `testing-code`); noun phrases (`pdf-processing`) and action forms (`process-pdfs`) are acceptable; avoid vague (`helper`, `utils`, `tools`), generic (`documents`, `data`, `files`), reserved-word names, and inconsistent patterns within a collection.
7. Write the description in third person ("Processes Excel files..."); avoid "I can..." and "You can...".
8. Be specific and include key terms and triggers; exactly one description field per skill; Claude may be choosing among 100+ skills.
9. Claude Code addition: put the key use case first because of the 1,536-character listing cap; `when_to_use` is available as a Claude Code-only extra. [SK#frontmatter-reference]

Structure and progressive disclosure:

10. Keep the `SKILL.md` body under 500 lines; split into separate files when approaching that. [BP], [SK#add-supporting-files], [ASPEC]
11. `SKILL.md` is an overview that points to detail files loaded on demand (patterns: high-level guide with references; domain-specific organisation; conditional details).
12. Keep references one level deep from `SKILL.md`; nested references may be only partially read.
13. Reference files longer than 100 lines get a table of contents at the top.
14. Name files descriptively (`form_validation_rules.md`, not `doc2.md`); organise directories by domain or feature.
15. Use forward slashes in all paths, even on Windows.
16. Bundled reference files cost no context until read; scripts cost only their output.

Workflows and content:

17. Break complex tasks into sequential steps; for complex workflows provide a checklist Claude can copy and tick off.
18. Add feedback loops: run validator, fix errors, repeat; proceed only when validation passes.
19. No time-sensitive information; put legacy material in an "old patterns" section.
20. Consistent terminology: one term per concept throughout.
21. Templates: strict when the format must be exact, flexible otherwise. Provide input/output example pairs when output quality depends on seeing examples.
22. Conditional workflows: guide Claude through decision points; move very large workflows into separate files.

Scripts (skills with executable code):

23. Solve, don't defer: scripts handle error conditions explicitly instead of failing and leaving it to Claude.
24. No unexplained constants: justify and document configuration values.
25. Prefer provided utility scripts for deterministic operations (more reliable, saves tokens and time, consistent).
26. State clearly whether Claude should run a script or read it as reference.
27. Plan-validate-execute for batch or destructive operations: produce an intermediate plan file, validate it with a script, then execute; make validation messages verbose and specific.
28. List required packages and verify availability; do not assume tools are installed. Claude Code note: skills have full network access there, and global package installation is discouraged. [OV]
29. Refer to MCP tools by fully qualified name; the page's format is `ServerName:tool_name`. Claude Code's own tool naming for permissions is `mcp__<server>__<tool>` [PM]; which form to use inside a Claude Code skill body is not reconciled on the fetched pages [UNVERIFIED].
30. Use visual analysis when inputs can be rendered as images.

Evaluation and iteration:

31. Build evaluations before writing extensive documentation: identify gaps by running without a skill; create three scenarios; measure the baseline; write minimal instructions; iterate against the baseline.
32. Evaluation record structure in the example: `skills`, `query`, `files`, `expected_behavior` (list).
33. The platform page says there is no built-in way to run these evaluations; Claude Code separately documents `claude plugin eval` and skill-creator (section A10). [BP], [SK], [PE]
34. Develop iteratively with two Claude instances: one helps author the skill, a fresh one uses it on real tasks; feed observations back.
35. Observe navigation: unexpected read order, missed references, over-reliance on one section, never-read files.
36. Pre-share checklist highlights: specific description with what and when; body under 500 lines; one-level references; consistent terminology; concrete examples; no Windows-style paths; explicit error handling; at least three evaluations; tested with Haiku, Sonnet, and Opus; tested on real usage scenarios; team feedback incorporated.

Anti-patterns named on the page:

37. Windows-style backslash paths.
38. Offering too many options: give one default with an escape hatch instead of a list of alternatives.
39. Deeply nested references; vague descriptions; time-sensitive statements; inconsistent terms; magic numbers; assuming installed packages.

Claude Code-specific authoring notes [DOCUMENTED] [SK]:

- State what to do rather than narrating how or why; every line of a loaded skill is a recurring token cost because content stays in context.
- Write guidance that should hold for the whole task as standing instructions (the file is not re-read on later turns), and put the most important instructions near the top (compaction keeps only the start).
- Rules that must hold every time belong in a hook, not a skill.
- Square brackets rather than angle brackets for placeholders in descriptions.

---

## F. Cross-source inconsistencies worth knowing

- [DOCUMENTED] Overview says custom skills do not sync across surfaces and that the pre-built document skills are not available in Claude Code [OV]; the Claude Code skills page says skills enabled on a claude.ai account, including Anthropic's `pdf` and `xlsx`, sync into terminal sessions signed in with that account (v2.1.273+) [SK#where-synced-skills-load]. The Claude Code page is the more specific one for this client.
- [DOCUMENTED] Platform pages make `name` and `description` required with hard limits; Claude Code treats every field as optional and applies only listing caps. A skill meant to be portable should satisfy the stricter set. [OV], [BP], [ASPEC], [SK]
- [DOCUMENTED] Platform pages describe Claude reading `SKILL.md` with bash in a VM; Claude Code loads it through the `Skill` tool. [OV], [TR]
- [DOCUMENTED] `allowed-tools` is a spec field but the spec marks it experimental and space-separated; Claude Code also accepts commas and YAML lists. [ASPEC], [SK]

---

## G. Synthesis for the experiment (derived; each claim tagged)

G1. Skill-free baseline with working auth

- [DOCUMENTED] `--bare` is unsuitable when auth is a subscription login: it ignores OAuth, the keychain, and `CLAUDE_CODE_OAUTH_TOKEN`; it also changes the tool set and system prompt, so it is not a like-for-like arm.
- [DOCUMENTED] The docs' recommended off-switch for personal/project skills is `skillOverrides: {"<name>": "off"}` (can be supplied per run through `--settings`); for plugin skills it is running without the plugin.
- [DOCUMENTED] Cleanest "genuinely absent" construction: keep candidate skills out of every discovery location for both arms (no `.claude/skills/` or `.claude/commands/` anywhere in the workspace tree, including subdirectories, which load lazily when Claude touches files there, nor in parent directories up to the repository root; none in the personal skills folder; no plugin providing them), and add them in the treatment arm only through one explicit channel: `--add-dir <dir containing .claude/skills/>`, `--plugin-dir <plugin root>`, or a project `.claude/skills/` copy. Note `--add-dir` also grants file access to that directory and loads its commands and agents; `--plugin-dir` namespaces skills as `plugin:skill`.
- [DOCUMENTED] Verify absence/presence per run from the `system`/`init` event: `skills`, `slash_commands`, `plugins`, `tools`, `agents`, `model`, `permissionMode`, `claude_code_version`. Keep candidate skills user-invocable with a description so they are visible in `init.skills`.
- [DOCUMENTED] Other state to hold constant in both arms: synced claude.ai skills (`syncClaudeAiSkills: false`, or token/API-key auth), bundled skills, auto memory, claude.ai MCP connectors, project hooks and `.mcp.json`, CLAUDE.md, permission mode (Manual by default in `-p`), pinned model ID and explicit `--effort`.
- [UNVERIFIED] That a `Skill` deny rule or `--disable-slash-commands` removes listing text, and that `skillOverrides: "off"` prevents the agent from reading the skill files directly; avoid relying on these when the files are inside the workspace.

G2. Proving a skill was invoked from machine-readable output

- [DOCUMENTED] Use `--output-format stream-json --verbose`. Evidence of model invocation = an `assistant` event whose content block is `tool_use` with `name` equal to `Skill` and `input.skill` equal to the skill name (or `plugin:skill`), with `parent_tool_use_id` null for the main conversation, and no matching entry in the result's `permission_denials`.
- [DOCUMENTED] `--output-format json` is described as one structured JSON result (result text, session ID, metadata such as usage, cost, denials). [UNVERIFIED] Nothing on the fetched pages says it carries the individual tool calls (or what `--verbose` adds to it), so do not rely on it to show a `Skill` call; use `stream-json`.
- [DOCUMENTED] A `/skill-name` prompt is user invocation: expanded before the run, no `Skill` tool call; forked skills started that way are tagged with a `forked-command-` parent ID.
- [DOCUMENTED] Independent corroboration: a `PreToolUse` hook with matcher `Skill` (fires only on model invocation) or `--include-hook-events`; hooks do not run in bare mode.
- [UNVERIFIED] Exact `tool_result` text for a Skill call and the arguments key name; capture one real run and pin the parser to observed output.

G3. Minimal subagent definition

- [DOCUMENTED] One Markdown file in `.claude/agents/` (project) or `~/.claude/agents/` (user) with frontmatter containing only `name` and `description`, and a body that becomes the system prompt. Optional thin additions: `skills:` (preload full content of listed skills), `tools:` (allowlist), `model: inherit`.
- [DOCUMENTED] Run it as the main session with `claude --agent <name>` (or the `agent` setting); its prompt then replaces the default Claude Code system prompt, and in `-p` the git status snapshot is dropped, so a run with `--agent` is not comparable to a run without it unless that difference is intended.
- [DOCUMENTED] For a session-only definition without files, `--agents` takes the same fields as JSON (PowerShell: here-string, or a JSON file path with `-p`).

[SK#where-skills-live]: https://code.claude.com/docs/en/skills#where-skills-live
[SK#skills-from-additional-directories]: https://code.claude.com/docs/en/skills#skills-from-additional-directories
[SK#where-synced-skills-load]: https://code.claude.com/docs/en/skills#where-synced-skills-load
[SK#bundled-skills]: https://code.claude.com/docs/en/skills#bundled-skills
[SK#discovery-from-parent-and-nested-directories]: https://code.claude.com/docs/en/skills#discovery-from-parent-and-nested-directories
[SK#names-reserved-for-synced-skills]: https://code.claude.com/docs/en/skills#names-reserved-for-synced-skills
[SK#characters-a-skill-name-cant-hold]: https://code.claude.com/docs/en/skills#characters-a-skill-name-cant-hold
[SK#run-a-same-named-skill-from-an-added-directory]: https://code.claude.com/docs/en/skills#run-a-same-named-skill-from-an-added-directory
[SK#how-a-skill-gets-its-command-name]: https://code.claude.com/docs/en/skills#how-a-skill-gets-its-command-name
[SK#when-a-synced-skill-name-matches-another-command]: https://code.claude.com/docs/en/skills#when-a-synced-skill-name-matches-another-command
[SK#frontmatter-reference]: https://code.claude.com/docs/en/skills#frontmatter-reference
[SK#skill-not-triggering]: https://code.claude.com/docs/en/skills#skill-not-triggering
[SK#using-skill-frontmatter-outside-claude-code]: https://code.claude.com/docs/en/skills#using-skill-frontmatter-outside-claude-code
[SK#available-string-substitutions]: https://code.claude.com/docs/en/skills#available-string-substitutions
[SK#pass-arguments-to-skills]: https://code.claude.com/docs/en/skills#pass-arguments-to-skills
[SK#inject-dynamic-context]: https://code.claude.com/docs/en/skills#inject-dynamic-context
[SK#how-injected-commands-run]: https://code.claude.com/docs/en/skills#how-injected-commands-run
[SK#when-an-injected-command-fails]: https://code.claude.com/docs/en/skills#when-an-injected-command-fails
[SK#permission-checks-on-injected-commands]: https://code.claude.com/docs/en/skills#permission-checks-on-injected-commands
[SK#skill-descriptions-are-cut-short]: https://code.claude.com/docs/en/skills#skill-descriptions-are-cut-short
[SK#control-who-invokes-a-skill]: https://code.claude.com/docs/en/skills#control-who-invokes-a-skill
[SK#skill-content-lifecycle]: https://code.claude.com/docs/en/skills#skill-content-lifecycle
[SK#override-skill-visibility-from-settings]: https://code.claude.com/docs/en/skills#override-skill-visibility-from-settings
[SK#find-unused-skills]: https://code.claude.com/docs/en/skills#find-unused-skills
[SK#live-change-detection]: https://code.claude.com/docs/en/skills#live-change-detection
[SK#add-supporting-files]: https://code.claude.com/docs/en/skills#add-supporting-files
[SK#run-skills-in-a-subagent]: https://code.claude.com/docs/en/skills#run-skills-in-a-subagent
[SK]: https://code.claude.com/docs/en/skills
[SA#choose-the-subagent-scope]: https://code.claude.com/docs/en/sub-agents#choose-the-subagent-scope
[SA#write-subagent-files]: https://code.claude.com/docs/en/sub-agents#write-subagent-files
[SA#supported-frontmatter-fields]: https://code.claude.com/docs/en/sub-agents#supported-frontmatter-fields
[SA#subagent-files-claude-code-skips]: https://code.claude.com/docs/en/sub-agents#subagent-files-claude-code-skips
[SA#choose-a-model]: https://code.claude.com/docs/en/sub-agents#choose-a-model
[SA#run-every-subagent-on-one-model]: https://code.claude.com/docs/en/sub-agents#run-every-subagent-on-one-model
[SA#choose-an-effort-level]: https://code.claude.com/docs/en/sub-agents#choose-an-effort-level
[SA#available-tools]: https://code.claude.com/docs/en/sub-agents#available-tools
[SA#permission-modes]: https://code.claude.com/docs/en/sub-agents#permission-modes
[SA#preload-skills-into-subagents]: https://code.claude.com/docs/en/sub-agents#preload-skills-into-subagents
[SA#enable-persistent-memory]: https://code.claude.com/docs/en/sub-agents#enable-persistent-memory
[SA#disable-specific-subagents]: https://code.claude.com/docs/en/sub-agents#disable-specific-subagents
[SA#built-in-subagents]: https://code.claude.com/docs/en/sub-agents#built-in-subagents
[SA#invoke-subagents-explicitly]: https://code.claude.com/docs/en/sub-agents#invoke-subagents-explicitly
[SA#run-subagents-in-foreground-or-background]: https://code.claude.com/docs/en/sub-agents#run-subagents-in-foreground-or-background
[SA#let-claude-wait-for-a-subagent]: https://code.claude.com/docs/en/sub-agents#let-claude-wait-for-a-subagent
[SA#let-subagents-spawn-their-own-subagents]: https://code.claude.com/docs/en/sub-agents#let-subagents-spawn-their-own-subagents
[SA#what-loads-at-startup]: https://code.claude.com/docs/en/sub-agents#what-loads-at-startup
[SA#fork-the-current-conversation]: https://code.claude.com/docs/en/sub-agents#fork-the-current-conversation
[SA#scope-mcp-servers-to-a-subagent]: https://code.claude.com/docs/en/sub-agents#scope-mcp-servers-to-a-subagent
[SA]: https://code.claude.com/docs/en/sub-agents
[CLI#cli-flags]: https://code.claude.com/docs/en/cli-reference#cli-flags
[CLI#cli-commands]: https://code.claude.com/docs/en/cli-reference#cli-commands
[HL#start-faster-with-bare-mode]: https://code.claude.com/docs/en/headless#start-faster-with-bare-mode
[HL#get-structured-output]: https://code.claude.com/docs/en/headless#get-structured-output
[HL#auto-approve-tools]: https://code.claude.com/docs/en/headless#auto-approve-tools
[HL#follow-subagent-messages]: https://code.claude.com/docs/en/headless#follow-subagent-messages
[HL#background-tasks-at-exit]: https://code.claude.com/docs/en/headless#background-tasks-at-exit
[HL#continue-conversations]: https://code.claude.com/docs/en/headless#continue-conversations
[HL#turn-off-permission-prompts-in-unattended-runs]: https://code.claude.com/docs/en/headless#turn-off-permission-prompts-in-unattended-runs
[HL]: https://code.claude.com/docs/en/headless
[ST#settings-precedence]: https://code.claude.com/docs/en/settings#settings-precedence
[ST#change-a-setting-for-one-session]: https://code.claude.com/docs/en/settings#change-a-setting-for-one-session
[ST#exceptions-to-managed-settings-precedence]: https://code.claude.com/docs/en/settings#exceptions-to-managed-settings-precedence
[ST#where-claude-code-keeps-the-local-file-in-a-git-repository]: https://code.claude.com/docs/en/settings#where-claude-code-keeps-the-local-file-in-a-git-repository
[ST]: https://code.claude.com/docs/en/settings
[PM#manage-permissions]: https://code.claude.com/docs/en/permissions#manage-permissions
[PM#match-by-input-parameter]: https://code.claude.com/docs/en/permissions#match-by-input-parameter
[PM#additional-directories-grant-file-access-not-configuration]: https://code.claude.com/docs/en/permissions#additional-directories-grant-file-access-not-configuration
[PM#what-runs-before-you-trust-a-folder]: https://code.claude.com/docs/en/permissions#what-runs-before-you-trust-a-folder
[PM#agent-subagents]: https://code.claude.com/docs/en/permissions#agent-subagents
[PM#settings-precedence]: https://code.claude.com/docs/en/permissions#settings-precedence
[PM#working-directories]: https://code.claude.com/docs/en/permissions#working-directories
[PM]: https://code.claude.com/docs/en/permissions
[BP]: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices
[OV]: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview
[STR#skilloverrides]: https://code.claude.com/docs/en/settings-reference#skilloverrides
[STR#skilllistingbudgetfraction]: https://code.claude.com/docs/en/settings-reference#skilllistingbudgetfraction
[STR#skilllistingmaxdescchars]: https://code.claude.com/docs/en/settings-reference#skilllistingmaxdescchars
[STR#disablebundledskills]: https://code.claude.com/docs/en/settings-reference#disablebundledskills
[STR#disableskillshellexecution]: https://code.claude.com/docs/en/settings-reference#disableskillshellexecution
[STR#syncclaudeaiskills]: https://code.claude.com/docs/en/settings-reference#syncclaudeaiskills
[STR#strictpluginonlycustomization]: https://code.claude.com/docs/en/settings-reference#strictpluginonlycustomization
[STR#enabledplugins]: https://code.claude.com/docs/en/settings-reference#enabledplugins
[STR#agent]: https://code.claude.com/docs/en/settings-reference#agent
[ENV#variables]: https://code.claude.com/docs/en/env-vars#variables
[ENV#features-that-need-feature-flag-fetching]: https://code.claude.com/docs/en/env-vars#features-that-need-feature-flag-fetching
[ENV]: https://code.claude.com/docs/en/env-vars
[TR#powershell-tool]: https://code.claude.com/docs/en/tools-reference#powershell-tool
[TR]: https://code.claude.com/docs/en/tools-reference
[PMO#which-mode-a-session-starts-in]: https://code.claude.com/docs/en/permission-modes#which-mode-a-session-starts-in
[PMO]: https://code.claude.com/docs/en/permission-modes
[MC#adjust-effort-level]: https://code.claude.com/docs/en/model-config#adjust-effort-level
[MC]: https://code.claude.com/docs/en/model-config
[AU#credential-management]: https://code.claude.com/docs/en/authentication#credential-management
[AU#authentication-precedence]: https://code.claude.com/docs/en/authentication#authentication-precedence
[AU#generate-a-long-lived-token]: https://code.claude.com/docs/en/authentication#generate-a-long-lived-token
[DBG]: https://code.claude.com/docs/en/debug-your-config
[MS]: https://code.claude.com/docs/en/managed-settings
[SE#where-transcripts-are-stored]: https://code.claude.com/docs/en/sessions#where-transcripts-are-stored
[SE]: https://code.claude.com/docs/en/sessions
[TS#sdkresultmessage]: https://code.claude.com/docs/en/agent-sdk/typescript#sdkresultmessage
[TS#sdksystemmessage]: https://code.claude.com/docs/en/agent-sdk/typescript#sdksystemmessage
[TS#sdkassistantmessage]: https://code.claude.com/docs/en/agent-sdk/typescript#sdkassistantmessage
[TS#sdkpermissiondenial]: https://code.claude.com/docs/en/agent-sdk/typescript#sdkpermissiondenial
[TS#modelusage]: https://code.claude.com/docs/en/agent-sdk/typescript#modelusage
[TS#usage]: https://code.claude.com/docs/en/agent-sdk/typescript#usage
[TS#settingsource]: https://code.claude.com/docs/en/agent-sdk/typescript#settingsource
[TS]: https://code.claude.com/docs/en/agent-sdk/typescript
[SDKS]: https://code.claude.com/docs/en/agent-sdk/skills
[SDKF#control-filesystem-settings-with-settingsources]: https://code.claude.com/docs/en/agent-sdk/claude-code-features#control-filesystem-settings-with-settingsources
[SDKF#what-settingsources-does-not-control]: https://code.claude.com/docs/en/agent-sdk/claude-code-features#what-settingsources-does-not-control
[COST]: https://code.claude.com/docs/en/agent-sdk/cost-tracking
[LOOP]: https://code.claude.com/docs/en/agent-sdk/agent-loop
[PE#the-no-plugin-baseline]: https://code.claude.com/docs/en/plugin-evals#the-no-plugin-baseline
[PE#how-runs-are-isolated]: https://code.claude.com/docs/en/plugin-evals#how-runs-are-isolated
[PE#grader-types]: https://code.claude.com/docs/en/plugin-evals#grader-types
[PE]: https://code.claude.com/docs/en/plugin-evals
[PLC#skills]: https://code.claude.com/docs/en/plugins/components#skills
[PLC#agents]: https://code.claude.com/docs/en/plugins/components#agents
[PLCR]: https://code.claude.com/docs/en/plugins/create
[FO#understand-context-costs]: https://code.claude.com/docs/en/features-overview#understand-context-costs
[FO]: https://code.claude.com/docs/en/features-overview
[HK#hooks-in-skills-and-agents]: https://code.claude.com/docs/en/hooks#hooks-in-skills-and-agents
[HK#pretooluse-input]: https://code.claude.com/docs/en/hooks#pretooluse-input
[HK]: https://code.claude.com/docs/en/hooks
[SU#set-up-on-windows]: https://code.claude.com/docs/en/setup#set-up-on-windows
[ASPEC]: https://agentskills.io/specification
