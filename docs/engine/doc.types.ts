/**
 * Seed docs — the canonical document interface.
 *
 * Every JSON file listed in index.json MUST comply with one of the document
 * types below. There is exactly ONE renderer for all of them — viewer.html —
 * fully agnostic to content: it dispatches on the `type` field and renders any
 * compliant JSON. Per-document HTML files are forbidden: HTML and JSON drifting
 * apart is how documentation dies.
 *
 * `docs/` holds only ReferenceDoc-shaped documents (axiom → purpose → reference)
 * — every doc there shares that one structure. `system/` holds documents with a
 * different shape (the glossary has no axioms/purpose/reference) and machinery
 * that isn't authored documentation at all (the standards tracker).
 *
 * Check compliance:  node docs/engine/validate-docs.mjs   (after: node docs/engine/build.ts)
 *
 * The docs are one database in docs/db: see Entry below. The types of the payloads follow.
 */

/**
 * The database: every doc, glossary term and ADR entry is one entry, one json file, in docs/db/<kind>/.
 * Nothing is filed by folder: an entry carries tags (any glossary term or topic) and the paths it is specific to.
 * An entry with no path is global. The viewer groups and filters; `node docs/engine/remove.ts <path>` removes by path.
 * id is the file path without `.json`, e.g. "doc/list-query-getting-started".
 */
export interface Entry {
  id: string;
  kind: 'doc' | 'term' | 'adr' | 'standards';
  title: string;
  /** `todo`: listed, not migrated. `converted`: migrated, not validated. `approved`: reviewed and approved. */
  status: 'todo' | 'converted' | 'approved';
  /** Exactly one subject for a doc, decision or standard: what the folders used to be (main, ui, orchestrator...). The default way to browse. */
  subject?: string;
  /** A term has one or more subjects. */
  subjects?: string[];
  /** The cross axis: any glossary term or topic, consumer, contributor... */
  tags: string[];
  /** Repo paths the entry is specific to. Empty: global. */
  paths: string[];
  summary?: string;
  /** kind doc: the doc's own id, used by [[doc-id]] references. */
  docId?: string;
  /** kind doc, todo: the starting point of what is not migrated. */
  entry?: string;
  /** kind doc: axioms, purpose, reference. */
  doc?: Pick<ReferenceDoc, 'axioms' | 'purpose' | 'reference' | 'review' | 'converted'> | null;
  /** kind term. */
  term?: { def: RichText; aliases?: string[]; proposed?: true };
  /** kind adr: the entry of the decision register. */
  adr?: { date: string; context: RichText; decision: RichText; consequences: RichText[]; affects?: string[]; supersededBy?: string; adrStatus: 'accepted' | 'proposed' | 'superseded' };
  /** kind standards: the temporary digestion tracker. */
  standards?: { note?: RichText; files: StandardsDoc['files'] };
}

/* ------------------------------------------------------------------ */
/* Shared blocks                                                       */
/* ------------------------------------------------------------------ */

/**
 * Inline markup allowed in any text field:
 *   `code` · **bold** · *em* · [[glossary term]] · [[term|shown text]]
 */
export type RichText = string;

/** Review state of a section. */
export type ReviewState =
  /** Reviewed and approved by Daniel — canonical. */
  | 'closed'
  /** Drafted (possibly by an agent) — NOT canon yet; read with suspicion. */
  | 'unreviewed';

export interface SectionReview {
  state: ReviewState;
}

/** One claim: a single simple sentence stating one rule. */
export interface Claim {
  /**
   * Standards provenance — which standards.json rule(s) this claim digested.
   * Exactly one of `id` | `ids` when present. Kept only until standards.json
   * is fully digested and deleted; a claim with neither is an original claim.
   */
  id?: string;
  ids?: string[];
  text: RichText;
  /** Source standards file, when the id prefix alone doesn't tell. */
  source?: RichText;
}

/**
 * A visual inside a topic — a diagram or any other image.
 * Three kinds only. Mermaid is deliberately NOT one of them (no control over
 * positions, awful formatting) — draw an HTML fragment instead.
 * `src` files live in the doc's own `assets/` folder, so a doc's folder is
 * fully self-contained: JSON + assets build the whole page.
 */
export type ImageOrDiagram =
  /** Inline monospace drawing. */
  | { title?: RichText; type: 'ascii'; value: string }
  /** Binary image file (png / svg / jpg / webp) in this doc's assets/. */
  | { title?: RichText; type: 'image'; src: string; alt?: string }
  /** Self-contained HTML fragment file in this doc's assets/, inserted into the block. */
  | { title?: RichText; type: 'html'; src: string }
  /** Inline HTML fragment, inserted into the block. */
  | { title?: RichText; type: 'html'; value: string };

/** A worked example. Needs at least one of `text` or `snippets`. */
export interface Example {
  title?: RichText;
  /** The explanation, in prose. Rendered above the snippets. */
  text?: RichText;
  /** Code, paths or shapes, in reading order. Each carries its own caption. */
  snippets?: { caption?: RichText; code: string }[];
}

/* ------------------------------------------------------------------ */
/* type: "doc" — a canonical reference document (docs/)                */
/* ------------------------------------------------------------------ */

/**
 * One topic of the Reference.
 * Block order is fixed: statement → claims → imagesAndDiagrams → examples.
 */
export interface Topic {
  topic: RichText;
  /** Opening statement framing the topic. Canon requires it; the validator warns while it's pending. */
  statement?: RichText;
  claims: Claim[];
  imagesAndDiagrams?: ImageOrDiagram[];
  examples?: Example[];
}

export interface Axiom {
  text: RichText;
  sub?: RichText[];
}

/** Canonical doc anatomy: Axiom → Purpose → Reference (topics). Lives under docs/<id>/<id>.json. */
export interface ReferenceDoc {
  /** The doc's identity AND its folder/file name. No numbers — order comes from the map only. */
  id: string; // e.g. "scaffolding-and-import-boundaries"
  type: 'doc';
  title: string;
  /** Mechanically converted from markdown: axioms and purpose are still to write, nothing is reviewed. */
  converted?: true;
  /** Per-section review state. A section without an entry is of unknown state. */
  review?: {
    axioms?: SectionReview;
    purpose?: SectionReview;
    reference?: SectionReview;
  };
  axioms: Axiom[];
  purpose: { intro?: RichText; points?: RichText[]; note?: RichText };
  reference: Topic[];
}

/* ------------------------------------------------------------------ */
/* type: "adr" — the decision register (decisions/)                    */
/* ------------------------------------------------------------------ */

/**
 * Append-only journal of architecture decisions (DOC1, DOC8). Never edit an
 * entry once written: a decision that stops being true is superseded by a new
 * entry, not rewritten.
 *
 * This is where the reasoning goes. Canonical docs under `docs/` state the
 * rule and nothing else — no notes, no provenance, no "decided on" asides.
 * DOC1: an ADR never lives inside a canonical doc.
 */
export interface AdrDoc {
  id: string; // "decisions"
  type: 'adr';
  title: string;
  /** Newest first. Order is authoring order; nothing else encodes sequence. */
  entries: {
    /** Stable slug, referenced when a later entry supersedes this one. */
    id: string;
    /** ISO date, YYYY-MM-DD. */
    date: string;
    title: string;
    status: 'accepted' | 'proposed' | 'superseded';
    /** Entry id that replaced this one — required when status is superseded. */
    supersededBy?: string;
    /** What forced a decision. */
    context: RichText;
    /** What was decided, stated flatly. */
    decision: RichText;
    /** What follows — including the costs and anything now contradicted. */
    consequences: RichText[];
    /** Doc ids this decision governs. */
    affects?: string[];
  }[];
}

/* ------------------------------------------------------------------ */
/* type: "glossary" (system/ — shape differs from ReferenceDoc)        */
/* ------------------------------------------------------------------ */

export interface GlossaryDoc {
  id: string; // "glossary"
  type: 'glossary';
  title: string;
  terms: { term: string; def: RichText; status?: 'proposed' }[];
}

/* ------------------------------------------------------------------ */
/* type: "standards" — the intermediary digestion tracker (system/)    */
/* ------------------------------------------------------------------ */

/**
 * TEMPORARY artifact, destined to disappear. The rules were auto-generated
 * from ~10 meeting transcripts — some may be right, some totally wrong;
 * nothing here is canon until it lands, reviewed, in a canonical doc.
 * This file only tracks which rules were digested (accepted, rewritten, or
 * rejected). When every rule is consumed, the file — and this type — go away.
 */
export interface StandardsDoc {
  id: string; // "standards"
  type: 'standards';
  title: string;
  note?: RichText;
  files: {
    /** Source standards file, e.g. "scaffolding.md". */
    file: string;
    /** Rule id prefix, e.g. "SCF". */
    prefix: string;
    governs: RichText;
    rules: {
      id: string;
      /** Optional visual grouping label; renders when it changes between consecutive rules. */
      section?: RichText;
      text: RichText;
      /** ReferenceDoc ids that digested this rule. Empty/absent = not yet consumed. */
      consumedBy?: string[];
      note?: RichText;
      warning?: RichText;
    }[];
  }[];
}

export type Doc = ReferenceDoc | AdrDoc | GlossaryDoc | StandardsDoc;
