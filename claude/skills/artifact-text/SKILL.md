---
name: artifact-text
description: The transversal text discipline for every slice-design artifact — text is data, not writing. MUST be read before writing or editing any text field in any artifact (glossary, goals, use cases, steps, PHS, sitemap, org types & roles, docs).
---

# Artifact text — data, not writing

Every artifact skill assumes this one. Read it before writing any text field
in any artifact: glossary definitions, goal titles and statements, group
descriptions, use-case titles, descriptions, steps and assertions, PHS fields,
org-type and role descriptions, sitemap capabilities, todo items, docs.

## The core

Text in an artifact is **data**. Each field has a declared role: a definition
defines, a title promises, a statement states a rule, a description narrates,
a step records one act, an assertion asserts a checkable outcome. The text
does exactly its field's job, at its field's abstraction level, and nothing
else. Author effects (poetry, emphasis, performed completeness, self-notes)
are contamination of data, not style. A reader who hits one decorative or
out-of-scope clause must then distrust every clause.

## The five rules

1. **Role fidelity.** Text doing another field's job is misplaced even when
   true: an assertion restating the goal's rule, a definition sneaking in a
   behavior, a description carrying a reminder. Put the claim where its field
   is, or drop it.
2. **Container scope.** A text claims only what its own entity covers. One
   term, one goal, one scenario, one section stands alone. Importing sibling
   or parent claims to feel complete makes the text inaccurate, not richer.
3. **Scientific register.** Life-science precision: plain declaratives, exact
   modals (can, may, must, only carry logic, never emphasis), no aphorisms,
   no copywriter cadence. Compression is equally wrong: TLDR-speak drops the
   purpose. Signal-to-noise 1.0, at the right abstraction, purpose intact.
4. **Ruled vocabulary.** One word per concept, everywhere, the user's word.
   Synonyms are drift ("verified" won; "proven" died everywhere that day).
   Speak the glossary: `[[term]]` wherever the term is meant.
5. **No author residue.** The author's own reminders, hedges and provenance
   never enter artifact text. Ruled statuses go to the designated notes
   channel (`notes: [{ id, text, status }]`, e.g. "owed, not configured
   today"); everything else goes to chat.

## Speaking the glossary — `[[term]]`

Ruled vocabulary is only real if it is linked. The glossary is a checkable,
navigable dictionary; every field speaks it.

- **Link where the term is meant** — the concept, in its defined sense — with
  `[[term]]`. A glossary term used in a definition, statement, step, description
  or capability should resolve to its entry.
- **Don't over-link.** Link the meaningful occurrence, not every casual word; a
  term's own definition need not link itself. A page dense with brackets reads as
  noise, and noise is contamination like any other.
- **Canonical label, longest match.** Use the term's own label; prefer the whole
  multi-word term (`[[Process Applicant Data Share]]`) over a fragment inside it.
  Use `[[slug|shown text]]` when the sentence needs a different surface (a plural,
  a lower-case form).
- **Never inside code or literal values.** A pipeline name in backticks, or an
  answer option `"Individuals"`, is not the glossary `[[Individual]]` — it is a
  literal, and linking it is wrong.

## Canon examples — real, user-ruled

- Assertion, rejected: *"An account exists, reachable by the registered email
  **and by nothing else**."* The tail imports the goal's rule; no step checks
  it. Rejected: *"no mandatory requirement stands against it"* — imported
  vocabulary, unchecked, purpose unclear. Accepted, the whole assertion:
  **"The user is signed in with their email."** An assertion is checkable from
  the steps above it, like a test.
- Precondition, accepted as written: **"The email used belongs to no
  account."** Correct, precise, nothing extra.
- Title, rejected: *"Nothing exists until the code is verified"* — vague
  poetry. Accepted: **"No account is created until the registration code is
  verified."** Same fact, stated seriously.
- Goal, rejected: *"Authority: role-derived, inherited, context-scoped,
  platform-decided"* — a development standpoint. Accepted: **"A member may do
  exactly what their roles allow."** The business states the rule.

## The tells

Agent signatures to strip on sight: em-dash chains as rhythm, triads,
mirrored clauses ("not X but Y", "nothing A, nothing B"), closing flourishes,
capability adjectives ("seamless", "robust"), an aphorism where a rule was
asked for. Plain syntax: subject, verb, claim.

## The delete test

For every phrase: delete it. If the meaning did not change, it was noise —
leave it deleted. Run this before presenting, on every field you touched.
