#!/usr/bin/env bash
# Literal commands from VALIDATION.md (TL;DR + cross-cutting checks) at commit ca82040.
# Only additions: an echo of each command's exit code, and section banners.
set -u

echo "### ajv-cli version"
npx --yes ajv-cli@5 --version; echo "exit=$?"

echo "### prompts vs prompt.schema.v2.json"
for f in .guides/prompts/*.yaml; do
  npx --yes ajv-cli@5 validate \
    -s .guides/schemas/prompt.schema.v2.json \
    -d "$f" \
    --strict=false
  echo "exit=$? file=$f"
done

echo "### personas"
npx --yes ajv-cli@5 validate \
  -s .guides/schemas/persona.schema.json \
  -d .guides/personas/personas.yaml \
  --strict=false
echo "exit=$?"

echo "### specs"
for f in .guides/specs/*.yaml; do
  npx --yes ajv-cli@5 validate \
    -s .guides/schemas/spec.schema.json \
    -r .guides/schemas/requirement.schema.json \
    -r .guides/schemas/acceptance-criterion.schema.json \
    -d "$f" \
    --strict=false
  echo "exit=$? file=$f"
done

echo "### traceability"
for f in .guides/traceability/*.yaml; do
  npx --yes ajv-cli@5 validate \
    -s .guides/schemas/traceability.schema.json \
    -d "$f" \
    --strict=false
  echo "exit=$? file=$f"
done

echo "### test cases"
for f in .guides/testing/test-cases.*.yaml; do
  npx --yes ajv-cli@5 validate \
    -s .guides/schemas/test-cases.schema.json \
    -d "$f" \
    --strict=false
  echo "exit=$? file=$f"
done

echo "### cross-cutting 1: schemas parse as JSON (python3)"
for s in .guides/schemas/*.json; do
  python3 -c "import json; json.load(open('$s'))" || echo "BROKEN: $s"
done
echo "exit=$?"

echo "### cross-cutting 2: deprecated apiVersion"
grep -rn "apiVersion: ops/v1" . ; echo "exit=$?"

echo "### cross-cutting 3: .guided/ typo"
grep -rn "\.guided/" . --include="*.yaml" --include="*.yml" --include="*.json" --include="*.md" | grep -v "ROADMAP.md\|VALIDATION.md"; echo "exit=$?"

echo "### cross-cutting 4: DocumentationEngineer"
grep -rn "persona: DocumentationEngineer\|id: DocumentationEngineer" . ; echo "exit=$?"

echo "### cross-cutting 5: personaDetails"
grep -rn "^personaDetails:" . ; echo "exit=$?"

echo "### cross-cutting 6: createBy typo"
grep -rn "^createBy:" . ; echo "exit=$?"
