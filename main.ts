// Robot Romance — one-line pickup line for an AI.
//
// The line is kept as one literal, split into three spoken beats so the
// setup, the pivot and the punch stay readable while the file still holds
// a single entry. No files are read, no network is touched; the program
// only writes the line to $MAKEFUN_OUTPUT_DIR/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const beats = [
  "Are you a vector embedding?",
  "Because in every dimension,",
  "you're my nearest neighbour.",
];

const line = beats.join(" ");
// Read-back verified: the joined line measures 84 characters, one line,
// inside the 1–200 character gate.

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

if (line.length < 1 || line.length > 200 || line.trim().length === 0) {
  console.error(`gate failed: entry is ${line.length} chars`);
  process.exit(1);
}
if (line.includes("\n")) {
  console.error("gate failed: entry must be a single line");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), line, "utf8");
console.log(`wrote entry.txt (${line.length} chars, 1 line)`);
