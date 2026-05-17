# Validation Protocol

This document is the manual validation contract for every YAML/JSON artifact in this repository.
There is no CI yet (see ROADMAP §9); contributors are expected to run the commands below before opening a PR.

## TL;DR

```bash
# One-time: install ajv-cli on demand
npx --yes ajv-cli@5 --version

# Validate every prompt against the canonical v2 schema
for f in .guides/prompts/*.yaml; do
  npx --yes ajv-cli@5 validate \
    -s .guides/schemas/prompt.schema.v2.json \
    -d "$f" \
    --strict=false
done

# Validate the personas file
npx --yes ajv-cli@5 validate \
  -s .guides/schemas/persona.schema.json \
  -d .guides/personas/personas.yaml \
  --strict=false

# Validate SDD artifacts as they land (Phase 4 onwards)
# Specs (spec.schema.json $refs requirement + acceptance-criterion):
for f in .guides/specs/*.yaml; do
  npx --yes ajv-cli@5 validate \
    -s .guides/schemas/spec.schema.json \
    -r .guides/schemas/requirement.schema.json \
    -r .guides/schemas/acceptance-criterion.schema.json \
    -d "$f" \
    --strict=false
done

# ADRs (Markdown bodies wrap a YAML front-matter block validated against adr.schema.json):
# Traceability matrices:
for f in .guides/traceability/*.yaml; do
  npx --yes ajv-cli@5 validate \
    -s .guides/schemas/traceability.schema.json \
    -d "$f" \
    --strict=false
done
```

Every command must report `valid`. A non-zero exit means the file does not conform — fix the file, do not change the schema (unless the schema itself is wrong).

`--strict=false` is required because `ajv-cli` defaults to strict mode and rejects `$schema` references inside data files; the project schema explicitly allows them. The `-r` flag pre-loads sibling schemas so `$ref` resolves locally.

## What gets validated

| File / Glob | Schema | Notes |
|---|---|---|
| `.guides/prompts/*.yaml` | `.guides/schemas/prompt.schema.v2.json` (canonical) | v2 is a strict superset of v1; every v1-valid prompt also validates under v2. |
| `.guides/prompts/*.yaml` | `.guides/schemas/prompt.schema.json` (v1, deprecated) | Kept for backward compatibility; new prompts should target v2. |
| `.guides/personas/personas.yaml` | `.guides/schemas/persona.schema.json` | |
| `.guides/specs/*.yaml` | `.guides/schemas/spec.schema.json` | Refs `requirement.schema.json` and `acceptance-criterion.schema.json` — preload them with `-r`. |
| `.guides/traceability/*.yaml` | `.guides/schemas/traceability.schema.json` | |
| `.guides/architecture/adr/*.{md,yaml}` | `.guides/schemas/adr.schema.json` | ADRs may be authored as YAML directly or as Markdown with a YAML front-matter block. |
| `templates/template.prompt.yaml` | `.guides/schemas/prompt.schema.v2.json` | Template uses `<placeholder>` values; not expected to validate as-is. Skip until Phase 4 upgrade. |
| `templates/template.persona.yaml` | `.guides/schemas/persona.schema.json` | Same caveat as above. |

## Cross-cutting checks (no installer needed)

Run from the repo root. Every command should produce **zero hits** (except where noted).

```bash
# 1. All schemas parse as valid JSON
for s in .guides/schemas/*.json; do
  python3 -c "import json; json.load(open('$s'))" || echo "BROKEN: $s"
done

# 2. No deprecated apiVersion
grep -rn "apiVersion: ops/v1" .

# 3. No .guided/ (singular) typo
grep -rn "\.guided/" . --include="*.yaml" --include="*.yml" --include="*.json" --include="*.md" | grep -v "ROADMAP.md\|VALIDATION.md"

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
import json, yaml, sys, os, glob
from jsonschema import Draft7Validator, RefResolver

# 1. Self-validate every schema against draft-07
for s in sorted(glob.glob('.guides/schemas/*.json')):
    try:
        schema = json.load(open(s))
        Draft7Validator.check_schema(schema)
        print(f'SCHEMA OK    {s}')
    except Exception as e:
        print(f'SCHEMA FAIL  {s}: {e}')
        sys.exit(1)

# 2. Validate every prompt against the canonical v2 schema
v2 = json.load(open('.guides/schemas/prompt.schema.v2.json'))
v = Draft7Validator(v2)
failed = False
for f in sorted(glob.glob('.guides/prompts/*.yaml')):
    try:
        data = yaml.safe_load(open(f))
    except yaml.YAMLError as e:
        print(f'YAMLERR {f}: {e}'); failed = True; continue
    errors = sorted(v.iter_errors(data), key=lambda e: list(e.path))
    if errors:
        failed = True
        print(f'INVALID {f}')
        for e in errors[:5]:
            print(f'  at {list(e.path)}: {e.message}')
    else:
        print(f'VALID   {f}')

# 3. Validate specs (with $ref resolver pointing at schemas folder)
spec_schema = json.load(open('.guides/schemas/spec.schema.json'))
base_uri = 'file://' + os.path.abspath('.guides/schemas') + '/'
resolver = RefResolver(base_uri=base_uri, referrer=spec_schema)
sv = Draft7Validator(spec_schema, resolver=resolver)
for f in sorted(glob.glob('.guides/specs/*.yaml')):
    data = yaml.safe_load(open(f))
    errors = list(sv.iter_errors(data))
    if errors:
        failed = True; print(f'INVALID {f}: {errors[0].message}')
    else:
        print(f'VALID   {f}')

sys.exit(1 if failed else 0)
PY
```

## When the schema is wrong

If the schema rejects a field that should be allowed, the fix belongs to the schema, not the data.
Add the field to the appropriate schema under `.guides/schemas/`, bump the schema's `description` to note the change, and commit separately from the data changes.

The canonical prompt schema is now `prompt.schema.v2.json`. The v1 file is retained for backward compatibility during the v0.x window but is deprecated; do not extend it.
