import { useEffect, useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { EditorView, Decoration, ViewPlugin, ViewUpdate } from "@codemirror/view";
import { python } from "@codemirror/lang-python";
import { vscodeLight } from "@uiw/codemirror-theme-vscode";

interface CodeMirrorDisplayProps {
  code: string;
  onCodeChange: (value: string) => void;
  currentLine: number | null | undefined;
  isLocked: boolean;     
}

export const CodeMirrorDisplay = ({
  code,
  onCodeChange,
  currentLine,
  isLocked,
}: CodeMirrorDisplayProps) => {
  const viewRef = useRef<EditorView | null>(null);
  const currentLineRef = useRef<number | null>(null);
  currentLineRef.current = currentLine ?? null;

  const highlightLinePlugin = ViewPlugin.fromClass(
    class {
      decorations;

      constructor(view: EditorView) {
        this.decorations = this.createDeco(view);
      }

      update(update: ViewUpdate) {
        this.decorations = this.createDeco(update.view);
      }

      createDeco(view: EditorView) {
        const lineNumber = currentLineRef.current;
        const total = view.state.doc.lines;

        if (!lineNumber || lineNumber < 1 || lineNumber > total) {
          return Decoration.none;
        }

        const line = view.state.doc.line(lineNumber);

        return Decoration.set([
          Decoration.line({
            attributes: {
              style:
                "background: rgba(0, 122, 255, 0.25); border-left: 3px solid #007aff;",
            },
          }).range(line.from),
        ]);
      }
    },
    { decorations: (v) => v.decorations }
  );

  // Auto-scroll to current line
  useEffect(() => {
    if (!viewRef.current) return;
    if (currentLine == null) return;

    const view = viewRef.current;
    const total = view.state.doc.lines;

    if (currentLine < 1 || currentLine > total) return;

    const line = view.state.doc.line(currentLine);

    view.dispatch({
      effects: EditorView.scrollIntoView(line.from, { y: "nearest" }),
    });
  }, [currentLine]);

  return (
    <div className="rounded-lg border-1 border-primary/110 p-1 h-full overflow-hidden">
    <CodeMirror
    className="border-b border-border"
      value={code}
      height="500px"
      theme={vscodeLight}
      editable={!isLocked}          
      extensions={[python(), highlightLinePlugin]}
      onChange={(value) => !isLocked && onCodeChange(value)}
      onCreateEditor={(view) => (viewRef.current = view)}
    />
    </div>
  );
};
