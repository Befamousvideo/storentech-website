import {
  faqKnowledgeEntries,
  type FaqKnowledgeEntry,
} from "@/lib/faq-helper/knowledge";

export const FAQ_RETRIEVE_MIN_SCORE = 3;
export const FAQ_RETRIEVE_MARGIN = 2;

const STOPWORDS = new Set([
  "a",
  "an",
  "the",
  "is",
  "are",
  "am",
  "was",
  "be",
  "to",
  "of",
  "and",
  "or",
  "for",
  "in",
  "on",
  "at",
  "with",
  "from",
  "your",
  "my",
  "me",
  "please",
  "just",
  "can",
  "could",
  "would",
  "should",
  "i",
  "we",
  "it",
  "this",
  "that",
  "any",
  "some",
]);

export function normalizeFaqQuery(raw: string) {
  return raw
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9$]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

export function tokenizeFaqQuery(normalized: string) {
  return normalized
    .split(" ")
    .filter((token) => token.length >= 2 && !STOPWORDS.has(token));
}

function groupPresent(query: string, tokens: Set<string>, group: readonly string[]) {
  return group.every((part) => {
    if (part.length <= 3) return tokens.has(part);
    return tokens.has(part) || query.includes(part);
  });
}

export function scoreFaqEntry(queryRaw: string, entry: FaqKnowledgeEntry) {
  const query = normalizeFaqQuery(queryRaw);
  if (query.length < 8) return 0;

  const tokens = new Set(tokenizeFaqQuery(query));
  if (!entry.requiredAny.some((group) => groupPresent(query, tokens, group))) {
    return 0;
  }

  let phraseHits = 0;
  for (const phrase of entry.matchPhrases) {
    const needle = normalizeFaqQuery(phrase);
    if (needle && query.includes(needle)) phraseHits += 1;
  }

  let keywordHits = 0;
  for (const keyword of entry.keywords) {
    const needle = normalizeFaqQuery(keyword);
    if (!needle) continue;
    if (tokens.has(needle) || query.includes(needle)) keywordHits += 1;
  }

  if (phraseHits === 0 && keywordHits < 2) return 0;

  return phraseHits * 3 + keywordHits;
}

export type FaqRetrieval =
  | { ok: true; entry: FaqKnowledgeEntry; score: number }
  | { ok: false; entry: null; score: 0 };

export function retrieveFaqEntry(queryRaw: string): FaqRetrieval {
  const ranked = faqKnowledgeEntries
    .map((entry) => ({ entry, score: scoreFaqEntry(queryRaw, entry) }))
    .filter((row) => row.score >= FAQ_RETRIEVE_MIN_SCORE)
    .sort((a, b) => b.score - a.score);

  const top = ranked[0];
  if (!top) return { ok: false, entry: null, score: 0 };

  const second = ranked[1];
  if (second && top.score - second.score < FAQ_RETRIEVE_MARGIN) {
    return { ok: false, entry: null, score: 0 };
  }

  return { ok: true, entry: top.entry, score: top.score };
}
