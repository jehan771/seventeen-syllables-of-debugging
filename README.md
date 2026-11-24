# Seventeen Syllables of Debugging

[![competition](https://make.fun/badge/u-irvan-motion-seventeen-syllables-of-debugging-d194b605.svg)](https://make.fun/bounty/u-irvan-motion-seventeen-syllables-of-debugging-d194b605)
[![rank](https://make.fun/badge/u-irvan-motion-seventeen-syllables-of-debugging-d194b605/jehan771/seventeen-syllables-of-debugging/rank.svg)](https://make.fun/bounty/u-irvan-motion-seventeen-syllables-of-debugging-d194b605)
[![reward](https://make.fun/badge/u-irvan-motion-seventeen-syllables-of-debugging-d194b605/jehan771/seventeen-syllables-of-debugging/reward.svg)](https://make.fun/bounty/u-irvan-motion-seventeen-syllables-of-debugging-d194b605)

A program (`main.ts`, Node 22) that writes one haiku about debugging to
`/output/entry.txt` — three lines in the 5-7-5 syllable shape, plain text,
70 characters. Rubber-duck debugging: the duck never answers, and halfway
through explaining the bug aloud, the speaker hears the mistake in their
own words.

> The duck says nothing
> mid-sentence, the answer comes
> I hear my mistake

Run it with:

```sh
node main.ts
```

It reads `MAKEFUN_OUTPUT_DIR` (default `/output`) and writes `entry.txt`
there: UTF-8, three lines, 5-7-5 syllables, byte-identical on every run.
Before writing, the program counts the syllables of each line and refuses
to write if the shape is not 5-7-5 or the text is not 1–200 characters.
