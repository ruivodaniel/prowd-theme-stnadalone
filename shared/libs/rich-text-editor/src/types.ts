import type { ReactNode } from "react";
import type { JSONContent } from "@tiptap/react";

/** TipTap JSON document content */
export type RichTextContent = JSONContent;

export interface RichTextEditorProps {
  /** Initial document content — TipTap JSON, or an HTML string */
  content?: RichTextContent | string;
  /** Called when content changes */
  onChange?: (content: RichTextContent) => void;
  /** Called when content changes, with the document as HTML */
  onChangeHtml?: (html: string) => void;
  /** Placeholder text when editor is empty */
  placeholder?: string;
  /** Additional CSS class for the editor container */
  className?: string;
  /** Rendered when the editor is not yet available (loading or failed) */
  fallback?: ReactNode;
  /** Optional callback to obtain a link URL via custom UI instead of window.prompt(). */
  onRequestLink?: () => Promise<string | null>;
}

export interface RichTextViewerProps {
  /** Document content to render (TipTap JSON) */
  content: RichTextContent;
  /** Additional CSS class for the viewer container */
  className?: string;
}
