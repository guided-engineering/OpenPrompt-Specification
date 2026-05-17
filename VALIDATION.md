# Validation Protocol

This document is the manual validation contract for every YAML artifact in this repository.
There is no CI yet (see ROADMAP §9); contributors are expected to run the commands below before opening a PR.

## TL;DR

```bash
# One-time: install ajv-cli on demand
npx --yes ajv-cli@5 --version

# Validate every prompt in the repo
for f in .guides/prompts/*.yaml; do
  npx --yes ajv-cli@5 validate \
    -s .guides/schemas/prompt.schema.json \
    -d "$f" \
    --strict=false
done

# Validate the personas file
npx --yes ajv-cli@5 validate \
  -s .guides/schemas/persona.schema.json \
  -d .guides/personas/personas.yaml \
  --strict=false
```

Every command must report `valid`. A non-zero exit means the file does not conform — fix the file, do not change the schema (unless the schema itself is wrong).

`--strict=false` is required because `ajv-cli` defaults to strict mode and rejects `$schema` references inside data files; the project schema explicitly allows them.

## What gets validated

| File | Schema | Notes |
|---|---|---|
| `.guides/prompts/prompt.commit.yaml` | `.guides/schemas/prompt.schema.json` | |
| `.guides/prompts/prompt.copilot.yaml` | `.guides/schemas/prompt.schema.json` | |
| `.guides/prompts/prompt.discovery.yaml` | `.guides/schemas/prompt.schema.json` | |
| `.guides/prompts/prompt.execution.yaml` | `.guides/schemas/prompt.schema.json` | |
| `.guides/prompts/prompt.init.standalone-nextjs.codebase.yaml` | `.guides/schemas/prompt.schema.json` | |
| `.guides/prompts/prompt.onboarding.yaml` | `.guides/schemas/prompt.schema.json` | |
| `.guides/prompts/prompt.setup.guides.structure.yaml` | `.guides/schemas/prompt.schema.json` | Renamed and moved in Phase 1; was `setup.guides.structure.yml` at repo root. |
| `.guides/prompts/prompt.web.generate-page.yaml` | `.guides/schemas/prompt.schema.json` | |
| `.guides/personas/personas.yaml` | `.guides/schemas/persona.schema.json` | |
| `templates/template.prompt.yaml` | `.guides/schemas/prompt.schema.json` | Template uses `<placeholder>` values; not expected to validate as-is. Skip until Phase 4 upgrade. |
| `templates/template.persona.yaml` | `.guides/schemas/persona.schema.json` | Same caveat as above. |

## Cross-cutting checks (no installer needed)

Run from the repo root. Every command should produce **zero hits** (except where noted).

```bash
# 1. Prompt schema itself is valid JSON
python3 -c "import json; json.load(open('.guides/schemas/prompt.schema.json'))"

# 2. No deprecated apiVersion
grep -rn "apiVersion: ops/v1" .

# 3. No .guided/ (singular) typo
grep -rn "\.guided/" . --include="*.yaml" --include="*.yml" --include="*.json" --include="*.md" | grep -v "ROADMAP.md"

# 4. No active DocumentationEngineer usages (historical references in ROADMAP.md allowed)
grep -rn "persona: DocumentationEngineer\|id: DocumentationEngineer" .

# 5. No forbidden personaDetails field
grep -rn "^personaDetails:" .

# 6. No `createBy` typo
grep -rn "^createBy:" .
```

## Python fallback (if Node/npx is unavailable)

```bash
pip install -q jsonschema pyyaml
python3 - <<'PY'
import json, yaml, sys
from jsonschema import Draft7Validator

schema = json.load(open('.guides/schemas/prompt.schema.json'))
v = Draft7Validator(schema)

import glob
files = sorted(glob.glob('.guides/prompts/*.yaml'))

failed = False
for f in files:
    try:
        data = yaml.safe_load(open(f))
    except yaml.YAMLError as e:
        print(f'YAMLERR {f}: {e}')
        failed = True
        continue
    errors = sorted(v.iter_errors(data), key=lambda e: list(e.path))
    if errors:
        failed = True
        print(f'INVALID {f}')
        for e in errors[:5]:
            print(f'  at {list(e.path)}: {e.message}')
    else:
        print(f'VALID   {f}')

sys.exit(1 if failed else 0)
PY
```

## When the schema is wrong

If the schema rejects a field that should be allowed, the fix belongs to the schema, not the data.
Add the field to `properties` of `.guides/schemas/prompt.schema.json` (and to `.guides/schemas/persona.schema.json` for persona-level fields), bump the schema's `description` to note the change, and commit separately from the data changes.

Phase 3 of the roadmap introduces `prompt.schema.v2.json` as a strict superset for SDD vocabulary. Until then, all changes land in v1.
