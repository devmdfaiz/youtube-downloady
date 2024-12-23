"use client";
import { Button } from "@/components/ui/button";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import { useCallback, useEffect, useState } from "react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  BoldIcon,
  Code,
  CornerDownLeft,
  Italic,
  Link2,
  List,
  QuoteIcon,
  Redo,
  StrikethroughIcon,
  UnderlineIcon,
  Undo,
} from "lucide-react";

const Tiptap = ({
  field,
}: {
  field: any;
}) => {
  const editor = useEditor({
    immediatelyRender: false, // Ensure this is set to false
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
    ],
    content: field.value || `<p></p>`,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();

      field.onChange(html);
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[60vh] rounded-md border border-input bg-transparent px-3 py-3 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
  });

  useEffect(() => {
    if (editor && field.value !== editor.getHTML()) {
      editor.commands.setContent(field.value || "<p></p>");
    }
  }, [editor, field.value]);

  if (!editor) {
    return null;
  }

  return (
    <div className="py-1 relative">
      <MenuBar editor={editor} />
      <div className="py-3">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Tiptap;

function MenuBar({ editor }: any) {
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="flex items-center justify-start flex-wrap gap-3 static top-0">
      <Button
        type="button"
        variant={editor.isActive("bold") ? "default" : "outline"}
        size="icon"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
      >
        <BoldIcon className="w-4 h-4" />
      </Button>

      <Button
        type="button"
        variant={editor.isActive("italic") ? "default" : "outline"}
        size="icon"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
      >
        <Italic className="w-4 h-4" />
      </Button>

      <Button
        type="button"
        variant={editor.isActive("underline") ? "default" : "outline"}
        size="icon"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <UnderlineIcon className="w-4 h-4" />
      </Button>

      <Button
        type="button"
        variant={editor.isActive({ textAlign: "left" }) ? "default" : "outline"}
        size="icon"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
      >
        <AlignLeft className="w-4 h-4" />
      </Button>

      <Button
        type="button"
        variant={
          editor.isActive({ textAlign: "center" }) ? "default" : "outline"
        }
        size="icon"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
      >
        <AlignCenter className="w-4 h-4" />
      </Button>
      <Button
        type="button"
        variant={
          editor.isActive({ textAlign: "right" }) ? "default" : "outline"
        }
        size="icon"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
      >
        <AlignRight className="w-4 h-4" />
      </Button>

      <Button
        type="button"
        variant={editor.isActive("strike") ? "default" : "outline"}
        size="icon"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
      >
        <StrikethroughIcon className="w-4 h-4" />
      </Button>

      <Button
        type="button"
        variant={editor.isActive("code") ? "default" : "outline"}
        size="icon"
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
      >
        <Code className="w-4 h-4" />
      </Button>

      <Button
        type="button"
        variant={editor.isActive("paragraph") ? "default" : "outline"}
        size="icon"
        onClick={() => editor.chain().focus().setParagraph().run()}
      >
        <span className="select-none font-light w-4 h-4">P</span>
      </Button>

      <Button
        type="button"
        variant={
          editor.isActive("heading", { level: 1 }) ? "default" : "outline"
        }
        size="icon"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        <span className="select-none font-light w-4 h-4">H1</span>
      </Button>

      <Button
        type="button"
        variant={
          editor.isActive("heading", { level: 2 }) ? "default" : "outline"
        }
        size="icon"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <span className="select-none font-light w-4 h-4">H2</span>
      </Button>

      <Button
        type="button"
        variant={
          editor.isActive("heading", { level: 3 }) ? "default" : "outline"
        }
        size="icon"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <span className="select-none font-light w-4 h-4">H3</span>
      </Button>

      <Button
        type="button"
        variant={
          editor.isActive("heading", { level: 4 }) ? "default" : "outline"
        }
        size="icon"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
      >
        <span className="select-none font-light w-4 h-4">H4</span>
      </Button>

      <Button
        type="button"
        variant={editor.isActive("bulletList") ? "default" : "outline"}
        size="icon"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="w-4 h-4" />
      </Button>

      <Button
        type="button"
        variant={editor.isActive("orderedList") ? "default" : "outline"}
        size="icon"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4"
        >
          <line x1="10" x2="21" y1="6" y2="6" />
          <line x1="10" x2="21" y1="12" y2="12" />
          <line x1="10" x2="21" y1="18" y2="18" />
          <path d="M4 6h1v4" />
          <path d="M4 10h2" />
          <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
        </svg>
      </Button>

      <Button
        type="button"
        variant={editor.isActive("blockquote") ? "default" : "outline"}
        size="icon"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <QuoteIcon className="w-4 h-4" />
      </Button>

      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => editor.chain().focus().setHardBreak().run()}
      >
        <CornerDownLeft className="w-4 h-4" />
      </Button>

      <Button
        type="button"
        variant={editor.isActive("link") ? "default" : "outline"}
        size="icon"
        onClick={setLink}
      >
        <Link2 className="w-4 h-4" />
      </Button>

      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <Undo className="w-4 h-4" />
      </Button>

      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <Redo className="w-4 h-4" />
      </Button>
    </div>
  );
}