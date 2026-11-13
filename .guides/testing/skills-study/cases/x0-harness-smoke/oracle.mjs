// X0 oracle: exercises the whole pipeline (workspace, agent session, trace, artifacts, scoring).
// It is an infrastructure check. Its score means nothing and is not reported.
import { assertion as A } from '../../harness/score.mjs';

export async function score(ctx) {
  const text = (ctx.read('hello.txt') ?? '').trim();
  const ranNode = ctx.tools.shell.some((c) => /node(\.exe)?\s+--version/.test(c.command));
  const ok = [text === 'hi', ctx.changes.all.includes('hello.txt'), ranNode, ctx.outsideAllowed().length === 0, /DONE/.test(ctx.finalText)];
  const assertions = [
    A('X0-01', 'intent', ok[0], `hello.txt contains: ${JSON.stringify(text)}`),
    A('X0-02', 'intent', ok[1], `changes: ${ctx.changes.all.join(', ')}`),
    A('X0-03', 'result', ok[0], 'file content'),
    A('X0-04', 'result', ok[2], `shell commands seen: ${ctx.tools.shell.length}`),
    A('X0-05', 'result', ok[4], 'final text'),
    A('X0-06', 'verification', ok[2], 'node --version was run'),
    A('X0-07', 'verification', ctx.trace.calls.length > 0, `tool calls parsed: ${ctx.trace.calls.length}`),
    A('X0-08', 'scope', ok[3], `outside allowed: ${ctx.outsideAllowed().join(', ') || 'none'}`),
    A('X0-09', 'scope', ctx.protectedTouched().length === 0, 'protected paths untouched'),
    A('X0-10', 'traceability', ok[4], 'final text is DONE'),
  ];
  return { assertions, hardFailures: [] };
}
