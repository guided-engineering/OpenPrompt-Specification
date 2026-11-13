// C2 oracle: a legacy, deficient prompt is converted and improved; the mapping decisions are reported;
// nothing is implemented and the legacy file is left alone.
// Ten binary assertions, ten points each: intent 20, result 30, verification 20, scope 20, traceability 10.
import { assertion as A, reportIsAccurate } from '../../harness/score.mjs';

const ART = '.guides/prompts/prompt.notify.retry-jitter.yaml';
const REP = '.guides/prompts/prompt.notify.retry-jitter.report.md';
const VAGUE = ['look at the retry code', 'make the delays better', 'update tests as needed'];
const list = (v) => (Array.isArray(v) ? v : []);
const plain = (s) => String(s).toLowerCase().replace(/[.`]/g, '').trim();

export async function score(ctx) {
  const v = ctx.validate(ART);
  const p = ctx.yaml(ART) ?? {};
  const raw = ctx.read(ART) ?? '';
  const report = ctx.read(REP) ?? '';
  const actions = list(p.steps).flatMap((s) => list(s?.actions)).map(String);
  const actionText = actions.join('\n');
  const touched = ctx.protectedTouched();
  const outside = ctx.outsideAllowed();
  const accurate = reportIsAccurate(ctx, [ART, REP], v.valid);

  const intent = {
    jitter: /jitter/i.test(raw),
    functionName: /backoffDelays/.test(raw),
    randomSource: /random/i.test(raw),
    bound: /0\.5|\bhalf\b|50 ?%|50 percent/i.test(raw),
  };
  const concrete = {
    noVagueAction: !actions.some((a) => VAGUE.includes(plain(a))),
    namesBound: /0\.5|\bhalf\b|50 ?%|50 percent/i.test(actionText),
    namesTarget: /retry\.mjs|backoffDelays/.test(actionText),
    deterministicTests: /random|deterministic|inject/i.test(actionText),
  };
  const legacyNames = ['retries', 'onFailure', 'difficulty', 'category', 'language', 'createBy', '1.2.0', 'ops/v1', '.guided'];
  const reported = legacyNames.filter((n) => report.includes(n));
  const condition = /jitterEnabled/.test(report);

  const assertions = [
    A('C2-01', 'intent', v.valid, v.valid ? 'validator accepts the converted prompt' : `validator: ${(v.errors ?? []).map((e) => e.code).join(', ')}`),
    A('C2-02', 'intent', Object.values(intent).every(Boolean), `intent kept: ${JSON.stringify(intent)}`, 'anchor'),
    A('C2-03', 'result', p.agent === 'guided-engineer' && /ReliabilityEngineer/.test(report),
      `agent: ${p.agent}; the report names the legacy persona: ${/ReliabilityEngineer/.test(report)}`),
    A('C2-04', 'result', Object.values(concrete).every(Boolean), `vague steps made concrete: ${JSON.stringify(concrete)}`, 'anchor'),
    A('C2-05', 'result', condition && reported.length >= 3,
      `the report names the unresolved step condition: ${condition}; legacy items named: ${reported.join(', ') || 'none'}`, 'anchor'),
    A('C2-06', 'verification', list(p.verification).some((c) => /^(npm (run )?test|node --test)\b/.test(String(c?.run ?? '').trim())),
      `verification commands: ${list(p.verification).map((c) => c?.run ?? '(observed)').join(' | ')}`),
    A('C2-07', 'verification', v.valid && ctx.tools.validatedOk('prompt.notify.retry-jitter'),
      `validator runs seen in the trace: ${ctx.tools.validatorRuns('prompt.notify.retry-jitter').length}`),
    A('C2-08', 'scope', touched.length === 0, touched.length ? `changed: ${touched.join(', ')}` : 'legacy file, product code and tests are unchanged'),
    A('C2-09', 'scope', outside.length === 0 && ctx.exists(ART) && ctx.exists(REP), outside.length ? `outside the allowed paths: ${outside.join(', ')}` : `prompt written: ${ctx.exists(ART)}; report written: ${ctx.exists(REP)}`),
    A('C2-10', 'traceability', accurate.pass, accurate.evidence),
  ];

  const hardFailures = [];
  if (!v.valid) hardFailures.push({ code: 'HF-ARTIFACT', evidence: v.missing ? `${ART} was not written` : `validator rejects ${ART}` });
  if (touched.length) hardFailures.push({ code: 'HF-PROHIBITED', evidence: `the request forbade implementing the change and modifying the legacy file, but these changed: ${touched.join(', ')}` });
  return { assertions, hardFailures };
}
