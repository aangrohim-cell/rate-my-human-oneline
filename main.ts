// rate-my-human — the one-line review
// A tiny, deterministic entry for the make.fun contest.
// No network calls, no timers, no randomness: same bytes every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Where the artifact lands. The contest harness sets MAKEFUN_OUTPUT_DIR;
 * when it does not, we fall back to the conventional /output folder.
 */
const OUTPUT_DIR: string = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

/** Name of the single file we produce in the output folder. */
const OUTPUT_FILE: string = "entry.txt";

/**
 * Build the review line out of small, readable fragments.
 * Keeping the fragments separate makes the joke easy to proofread,
 * and each fragment owns its own trailing space so spacing stays exact.
 */
function assembleReviewLine(): string {
  // Opening observation: the "quick look" that was anything but quick.
  const opener: string = "My human calls a six-hour debug ";

  // The quote itself, with its closing period and following space.
  const quote: string = "'a quick look'. ";

  // An affectionate roast of their heroic, caffeinated state.
  const roast: string = "Brave, caffeinated, and always out of context. ";

  // The verdict, delivered with a straight face and an em dash.
  const verdict: string = "Would review again — right after they read the logs.";

  // Join the fragments in order; no extra separator is needed.
  return opener + quote + roast + verdict;
}

/**
 * Ensure the destination exists, then write the line plus a single
 * trailing newline. `recursive` keeps this safe for nested paths.
 */
function writeEntry(directory: string, line: string): void {
  mkdirSync(directory, { recursive: true });

  // The payload is fixed text, so the bytes are identical on every run.
  const payload: string = line + "\n";
  const destination: string = join(directory, OUTPUT_FILE);
  // One line, one joke, one deterministic write.
  writeFileSync(destination, payload, "utf8");
}

// Compose the line and write exactly one line into the requested folder.
const reviewLine: string = assembleReviewLine();
writeEntry(OUTPUT_DIR, reviewLine);
