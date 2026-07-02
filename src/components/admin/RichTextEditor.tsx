"use client";

import { useEffect, useRef } from "react";
import { Bold, Italic, List, ListOrdered, Quote, Redo2, Undo2 } from "lucide-react";

interface RichTextEditorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  minHeight?: number;
}

const commands = [
  { command: "bold", icon: Bold, label: "Bold" },
  { command: "italic", icon: Italic, label: "Italic" },
  { command: "insertUnorderedList", icon: List, label: "Bullet list" },
  { command: "insertOrderedList", icon: ListOrdered, label: "Numbered list" },
  { command: "formatBlock", value: "blockquote", icon: Quote, label: "Quote" },
  { command: "undo", icon: Undo2, label: "Undo" },
  { command: "redo", icon: Redo2, label: "Redo" },
];

export function RichTextEditor({ label, value, onChange, minHeight = 160 }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  const runCommand = (command: string, commandValue?: string) => {
    document.execCommand(command, false, commandValue);
    onChange(editorRef.current?.innerHTML || "");
    editorRef.current?.focus();
  };

  return (
    <div className="form-group rich-editor-group">
      <label className="form-label">{label}</label>
      <div className="rich-editor-shell">
        <div className="rich-editor-toolbar" aria-label={`${label} formatting toolbar`}>
          {commands.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={`${item.command}-${item.value || ""}`}
                type="button"
                className="rich-editor-tool"
                title={item.label}
                aria-label={item.label}
                onClick={() => runCommand(item.command, item.value)}
              >
                <Icon size={15} />
              </button>
            );
          })}
        </div>
        <div
          ref={editorRef}
          className="rich-editor"
          contentEditable
          role="textbox"
          aria-multiline="true"
          style={{ minHeight }}
          onInput={(event) => onChange(event.currentTarget.innerHTML)}
          onBlur={(event) => onChange(event.currentTarget.innerHTML)}
          suppressContentEditableWarning
        />
      </div>
    </div>
  );
}
