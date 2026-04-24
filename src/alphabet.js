/**
 * Georgian alphabet correspondences between Mkhedruli (modern) and Nuskhuri
 * (ecclesiastical, used in old Georgian manuscripts alongside Asomtavruli).
 *
 * Listed in historical order, including the five archaic letters
 * (ჱ, ჲ, ჳ, ჴ, ჵ) which are not part of the modern 33-letter alphabet but
 * appear frequently in the old texts typically rendered in Nuskhuri.
 *
 * Unicode ranges:
 *   Mkhedruli: U+10D0–U+10FA (Georgian block)
 *   Nuskhuri:  U+2D00–U+2D25 (Georgian Supplement block)
 */
const PAIRS = [
  ['ა', 'ⴀ'], ['ბ', 'ⴁ'], ['გ', 'ⴂ'], ['დ', 'ⴃ'], ['ე', 'ⴄ'],
  ['ვ', 'ⴅ'], ['ზ', 'ⴆ'], ['ჱ', 'ⴡ'], ['თ', 'ⴇ'], ['ი', 'ⴈ'],
  ['კ', 'ⴉ'], ['ლ', 'ⴊ'], ['მ', 'ⴋ'], ['ნ', 'ⴌ'], ['ჲ', 'ⴢ'],
  ['ო', 'ⴍ'], ['პ', 'ⴎ'], ['ჟ', 'ⴏ'], ['რ', 'ⴐ'], ['ს', 'ⴑ'],
  ['ტ', 'ⴒ'], ['ჳ', 'ⴣ'], ['უ', 'ⴓ'], ['ფ', 'ⴔ'], ['ქ', 'ⴕ'],
  ['ღ', 'ⴖ'], ['ყ', 'ⴗ'], ['შ', 'ⴘ'], ['ჩ', 'ⴙ'], ['ც', 'ⴚ'],
  ['ძ', 'ⴛ'], ['წ', 'ⴜ'], ['ჭ', 'ⴝ'], ['ხ', 'ⴞ'], ['ჴ', 'ⴤ'],
  ['ჯ', 'ⴟ'], ['ჰ', 'ⴠ'], ['ჵ', 'ⴥ'],
];

export const Direction = Object.freeze({
  MkhedruliToNuskhuri: 'mkh-to-nus',
  NuskhuriToMkhedruli: 'nus-to-mkh',
});

const MKH_TO_NUS = Object.fromEntries(PAIRS);
const NUS_TO_MKH = Object.fromEntries(PAIRS.map(([m, n]) => [n, m]));

/**
 * Convert a string between Mkhedruli and Nuskhuri. Characters with no
 * mapping (digits, Latin, punctuation, whitespace) are passed through.
 *
 * Uses Array.from so surrogate pairs are iterated as whole code points
 * rather than split into half-characters.
 */
export function convert(text, direction) {
  const map =
    direction === Direction.MkhedruliToNuskhuri ? MKH_TO_NUS : NUS_TO_MKH;
  return Array.from(text, (ch) => map[ch] ?? ch).join('');
}

/** Default sample text — the full alphabet, so every correspondence is
 *  visible on first load. */
export const SAMPLES = Object.freeze({
  [Direction.MkhedruliToNuskhuri]: PAIRS.map(([m]) => m).join(''),
  [Direction.NuskhuriToMkhedruli]: PAIRS.map(([, n]) => n).join(''),
});

export const LABELS = Object.freeze({
  [Direction.MkhedruliToNuskhuri]: {
    source: 'Mkhedruli · მხედრული',
    target: 'Nuskhuri · ⴌⴓⴑⴞⴓⴐⴈ',
  },
  [Direction.NuskhuriToMkhedruli]: {
    source: 'Nuskhuri · ⴌⴓⴑⴞⴓⴐⴈ',
    target: 'Mkhedruli · მხედრული',
  },
});
