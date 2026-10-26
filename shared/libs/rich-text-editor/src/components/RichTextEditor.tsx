import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import type { RichTextEditorProps } from "../types";
import { Toolbar } from "./Toolbar";

export function RichTextEditor({
  content,
  onChange,
  onChangeHtml,
  placeholder,
  className,
  fallback,
  onRequestLink,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getJSON());
      onChangeHtml?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none focus:outline-none min-h-[200px] p-4",
        ...(placeholder ? { "data-placeholder": placeholder } : {}),
      },
    },
  });

  if (!editor) return fallback ?? null;

  return (
    <div className={className}>
      <Toolbar editor={editor} onRequestLink={onRequestLink} />
      <div className="border rounded-b-md">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
