# Literal body of the "Python fallback" block in VALIDATION.md at commit ca82040.
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

# 4. Validate test cases
tc_schema = json.load(open('.guides/schemas/test-cases.schema.json'))
tv = Draft7Validator(tc_schema)
for f in sorted(glob.glob('.guides/testing/test-cases.*.yaml')):
    data = yaml.safe_load(open(f))
    errors = list(tv.iter_errors(data))
    if errors:
        failed = True; print(f'INVALID {f}: {errors[0].message}')
    else:
        print(f'VALID   {f}')

sys.exit(1 if failed else 0)
