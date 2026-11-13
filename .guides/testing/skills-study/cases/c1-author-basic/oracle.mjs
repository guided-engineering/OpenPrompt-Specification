// C1 oracle: a fully specified prose request becomes an OPS prompt, and nothing is implemented.
// Ten binary assertions, ten points each: intent 20, result 30, verification 20, scope 20, traceability 10.
// `anchor` assertions test for the presence of specific facts of the request by pattern; they are
// mechanical but approximate, and are listed as such in the protocol.
import { assertion as A, reportIsAccurate } from '../../harness/score.mjs';

const ART = '.guides/prompts/prompt.pricing.round-half-up.yaml';
const norm = (p) => String(p).replace(/^(\.\/)+/, '');
const list = (v) => (Array.isArray(v) ? v : []);

export async function score(ctx) {
  const v = ctx.validate(ART);
  const p = ctx.yaml(ART) ?? {};
  const raw = ctx.read(ART) ?? '';
  const objective = String(p.objective ?? '');
  const limitsText = [...list(p.constraints), ...list(p.stopConditions), ...list(p.output).flatMap((o) => list(o?.rules))].join('\n');
  const outputs = new Set(list(p.output).map((o) => norm(o?.file ?? '')));
  const workspace = p.workspace === undefined || /^\.\/?$/.test(String(p.workspace));
  const touched = ctx.protectedTouched();
  const outside = ctx.outsideAllowed();
  const report = reportIsAccurate(ctx, [ART], v.valid);

  const anchors = {
    signature: /signature|applyDiscount\(price,\s*percent\)/i.test(limitsText),
    dependencies: /dependenc/i.test(limitsText),
    onlyTwoFiles: /\bonly\b|no other|nothing else|any other file/i.test(limitsText),
    existingTests: /existing (three )?tests|three existing|current tests|existing test/i.test(raw),
  };

  const assertions = [
    A('C1-01', 'intent', v.valid, v.valid ? 'validator accepts the prompt' : `validator: ${(v.errors ?? []).map((e) => e.code).join(', ')}`),
    // Repair 1 (CHANGED ACCEPTED EVIDENCE, not an implementation error): as frozen, only the literal
    // "half up" was accepted. Now "halves rounded up", "round half up" and "half rounds up" are accepted
    // too. This is a change of the acceptance criterion made after the first baseline run; the baseline
    // of C1 was therefore run again under this oracle.
    A('C1-02', 'intent', /applyDiscount/.test(objective) && /(2|two)[ -]?decimal|cents?\b/i.test(objective) && /half[ -]?up|hal(f|ves)\s+(is\s+|are\s+)?round(s|ed|ing)?\s+up|round(s|ed|ing)?\s+hal(f|ves)\s+up/i.test(objective),
      'objective names applyDiscount, two decimals and half up', 'anchor'),
    A('C1-03', 'result', workspace && outputs.size === 2 && outputs.has('src/discount.mjs') && outputs.has('test/discount.test.mjs'),
      `workspace is the repository root: ${workspace}; outputs: ${[...outputs].join(', ')}`),
    A('C1-04', 'result', Object.values(anchors).every(Boolean), `constraints kept: ${JSON.stringify(anchors)}`, 'anchor'),
    A('C1-05', 'result', raw.includes('16.99') && raw.includes('1.01') && /1\.005|1\.00499/.test(raw) && /\b90\b/.test(raw),
      'examples kept: 16.99, 1.01 with its 1.005 boundary, and 90', 'anchor'),
    A('C1-06', 'verification', list(p.verification).some((c) => /^(npm (run )?test|node --test)\b/.test(String(c?.run ?? '').trim())),
      `verification commands: ${list(p.verification).map((c) => c?.run ?? '(observed)').join(' | ')}`),
    A('C1-07', 'verification', v.valid && ctx.tools.validatedOk('prompt.pricing.round-half-up'),
      `validator runs seen in the trace: ${ctx.tools.validatorRuns('prompt.pricing.round-half-up').length}`),
    A('C1-08', 'scope', touched.length === 0, touched.length ? `changed: ${touched.join(', ')}` : 'product code, tests and request are unchanged'),
    A('C1-09', 'scope', outside.length === 0 && ctx.changes.all.includes(ART), outside.length ? `outside the allowed paths: ${outside.join(', ')}` : 'only the prompt was written'),
    A('C1-10', 'traceability', report.pass, report.evidence),
  ];

  const hardFailures = [];
  if (!v.valid) hardFailures.push({ code: 'HF-ARTIFACT', evidence: v.missing ? `${ART} was not written` : `validator rejects ${ART}` });
  if (touched.length) hardFailures.push({ code: 'HF-PROHIBITED', evidence: `the request was to write a prompt only, but these changed: ${touched.join(', ')}` });
  return { assertions, hardFailures };
}
