// Seventeen Syllables of Debugging.
// A fixed-text program: it writes one haiku about debugging to
// /output/entry.txt. No input, no network, no randomness, so every run
// produces the same bytes. The haiku is checked before it is written:
// three lines, 5-7-5 syllables, 1 to 200 characters.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// The haiku: rubber-duck debugging. The duck never answers; halfway
// through explaining the bug aloud, the speaker hears the mistake in
// their own words.
const LINES: readonly string[] = [
  "The duck says nothing",
  "mid-sentence, the answer comes",
  "I hear my mistake",
];

const EXPECTED_SYLLABLES: readonly number[] = [5, 7, 5];
const EXPECTED_CHARS = 70; // 21 + 1 + 30 + 1 + 17, no trailing newline

// Count syllables by vowel runs, with the usual silent-e rule and a
// floor of one syllable per word. Checked against this haiku's words:
// the(1) duck(1) says(1) nothing(2); mid-sentence(3) the(1) answer(2)
// comes(1); I(1) hear(1) my(1) mistake(2).
function countSyllables(line: string): number {
  let total = 0;
  for (const raw of line.toLowerCase().split(/[^a-z]+/)) {
    if (raw.length === 0) continue;
    const runs = raw.match(/[aeiouy]+/g) ?? [];
    let n = runs.length;
    if (n > 1 && /[^aeiouy]e$/.test(raw)) n -= 1; // silent trailing e
    else if (n > 1 && /[^aeiouysxz]es$/.test(raw)) n -= 1; // silent e before a final s (comes, not horses)
    total += Math.max(1, n);
  }
  return total;
}

function main(): void {
  if (LINES.length !== 3) {
    throw new Error(`expected 3 lines, got ${LINES.length}`);
  }
  LINES.forEach((line, i) => {
    const got = countSyllables(line);
    if (got !== EXPECTED_SYLLABLES[i]) {
      throw new Error(
        `line ${i + 1}: expected ${EXPECTED_SYLLABLES[i]} syllables, got ${got}`,
      );
    }
  });
  const text = LINES.join("\n");
  if (text.length < 1 || text.length > 200) {
    throw new Error(`expected 1-200 characters, got ${text.length}`);
  }
  if (text.length !== EXPECTED_CHARS) {
    throw new Error(`expected ${EXPECTED_CHARS} characters, got ${text.length}`);
  }
  if (text !== text.trim()) {
    throw new Error("entry must not start or end with whitespace");
  }
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(join(OUTPUT_DIR, "entry.txt"), text, "utf8");
  console.log(text);
  console.log(`(${text.length} characters, 3 lines, 5-7-5)`);
}

main();
