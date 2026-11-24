// Funniest Time Machine Warning Label — make.fun bounty
// u-eager-stork-81-9647-funniest-time-machine-warning-f8add151
// Writes one one-line warning label (1-120 chars) to /output/entry.txt.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LABEL =
  "WARNING: Your past self has already read this label. Do not let him borrow the machine.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

// Gate: the scorer requires 1-120 chars of non-whitespace UTF-8 text,
// a single line. Fail loudly instead of shipping an invalid entry.
const body = LABEL.trim();
if (body.length < 1 || body.length > 120) {
  throw new Error(`Label is ${body.length} chars; gate requires 1-120.`);
}
if (/\n/.test(body)) {
  throw new Error("Label must be a single line.");
}
writeFileSync(join(outDir, "entry.txt"), LABEL + "\n", "utf8");
console.log(`Wrote ${LABEL.length} chars to ${join(outDir, "entry.txt")}`);
