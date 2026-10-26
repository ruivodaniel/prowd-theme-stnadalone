# rich-text-editor

**What.** A TipTap-based rich-text editor wrapper, with a viewer for read-only rendering of stored content.
**How.** Wraps TipTap with the product's extension set, produces content JSON on write and serialised HTML/JSON on read. Consumers embed either the editor (write) or the viewer (read) via the shared slot on the UI provider.
**Why.** Rich text needs a single, auditable implementation — one extension set, one serialiser, one sanitiser. Otherwise every consumer re-invents the wheel and output drifts.

---

## For consumers

_Placeholder — expand as the lib gains real use._

## For contributors

_Placeholder — expand when extensions or serialisation change._
