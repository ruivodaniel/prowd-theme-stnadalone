import type { Editor } from "@tiptap/react";

const ALLOWED_PROTOCOLS = ["http:", "https:", "mailto:"];

interface ToolbarProps {
  editor: Editor;
  /** Optional callback to obtain a link URL via custom UI instead of window.prompt(). */
  onRequestLink?: () => Promise<string | null>;
}

interface ToolbarButtonProps {
  onClick: () => void | boolean | Promise<void>;
  isActive?: boolean;
  children: React.ReactNode;
  title: string;
}

function ToolbarButton({
  onClick,
  isActive,
  children,
  title,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`px-2 py-1 text-sm rounded hover:bg-accent ${
        isActive ? "bg-accent font-bold" : ""
      }`}
    >
      {children}
    </button>
  );
}

export function Toolbar({ editor, onRequestLink }: ToolbarProps) {
  const setLink = async () => {
    const url = onRequestLink
      ? await onRequestLink()
      : window.prompt("URL:")?.trim();
    if (!url) return;
    try {
      const parsed = new URL(url, "https://placeholder.com");
      if (!ALLOWED_PROTOCOLS.includes(parsed.protocol)) return;
      editor.chain().focus().setLink({ href: url }).run();
    } catch {
      // Invalid URL — do nothing
    }
  };

  return (
    <div className="flex flex-wrap gap-1 border border-b-0 rounded-t-md p-2 bg-muted/50">
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold")}
        title="Bold"
      >
        B
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive("italic")}
        title="Italic"
      >
        I
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        isActive={editor.isActive("underline")}
        title="Underline"
      >
        U
      </ToolbarButton>

      <span className="w-px border mx-1" />

      <ToolbarButton
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
        isActive={editor.isActive("heading", { level: 2 })}
        title="Heading 2"
      >
        H2
      </ToolbarButton>
      <ToolbarButton
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 3 }).run()
        }
        isActive={editor.isActive("heading", { level: 3 })}
        title="Heading 3"
      >
        H3
      </ToolbarButton>

      <span className="w-px border mx-1" />

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive("bulletList")}
        title="Bullet List"
      >
        • List
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive("orderedList")}
        title="Ordered List"
      >
        1. List
      </ToolbarButton>

      <span className="w-px border mx-1" />

      <ToolbarButton
        onClick={setLink}
        isActive={editor.isActive("link")}
        title="Link"
      >
        Link
      </ToolbarButton>
      {editor.isActive("link") && (
        <ToolbarButton
          onClick={() => editor.chain().focus().unsetLink().run()}
          title="Remove Link"
        >
          Unlink
        </ToolbarButton>
      )}
    </div>
  );
}
