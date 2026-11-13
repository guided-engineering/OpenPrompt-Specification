# Request

Slugs coming out of `packages/slug` look wrong in the article URLs. A title like
`a  --  b` turns into `a------b`, and `  -Hello!  ` turns into `-hello-`.

Please make `slugify` produce clean slugs: one hyphen between words, and no
hyphen at the start or the end. Two tests in `packages/slug/test/slug.test.mjs`
already describe what I expect and currently fail.

Keep it small: do not add dependencies, do not change the function's name or
signature, and do not touch the tests. Other packages in this repository are
out of scope.
