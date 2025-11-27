/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Card } from "@/src/helper/card";
import { Badge } from "@/src/helper/badge";

function resolve(heap: any, ref: any) {
  if (Array.isArray(ref) && ref[0] === "REF") {
    const obj = heap[String(ref[1])];
    if (!obj) return null;
    const [type, data] = obj;
    return { type, data, refId: ref[1] };
  }
  return ref;
}

function detectStructure(obj: any) {
  if (!obj || typeof obj !== "object") return null;

  // Linked list ⇒ next pointer exists
  if (obj.next && Array.isArray(obj.next) && obj.next[0] === "REF") {
    return "linked_list";
  }

  // Tree ⇒ left/right pointers
  if (obj.left || obj.right) {
    return "tree";
  }

  return "object";
}
// ARRAY
const ArrayRenderer = ({ arr }: { arr: any[] }) => {
  return (
    <div className="flex gap-3">
      {arr.map((v, i) => (
        <div
          key={i}
          className="w-12 h-12 flex items-center justify-center border rounded bg-muted text-foreground text-sm"
        >
          {String(v)}
        </div>
      ))}
    </div>
  );
};

// DICT
const DictRenderer = ({ dict }: { dict: Record<string, any> }) => {
  return (
    <div className="space-y-1">
      {Object.entries(dict).map(([key, val]) => (
        <div
          key={key}
          className="p-2 border rounded bg-muted flex justify-between text-xs"
        >
          <span className="font-mono">{key}:</span>
          <span>
            {typeof val === "object" ? JSON.stringify(val) : String(val)}
          </span>
        </div>
      ))}
    </div>
  );
};

// LINKED LIST
const LinkedListRenderer = ({ head, heap }: { head: any; heap: any }) => {
  const nodes = [];
  let node = head;

  while (node) {
    nodes.push(node.data.value ?? node.data.val ?? "?");

    if (node.data.next && node.data.next[0] === "REF") {
      node = resolve(heap, node.data.next);
    } else break;
  }

  return (
    <div className="flex items-center gap-3">
      {nodes.map((v, i) => (
        <React.Fragment key={i}>
          <div className="px-3 py-2 border rounded bg-muted">{v}</div>
          {i < nodes.length - 1 && <span className="text-xl">→</span>}
        </React.Fragment>
      ))}
    </div>
  );
};

// BASIC INSTANCE OBJECT
const ObjectRenderer = ({ data }: { data: any }) => {
  return (
    <div className="space-y-1">
      {Object.entries(data).map(([k, v]) => (
        <div key={k} className="text-xs flex gap-1">
          <span className="font-medium">{k}:</span>
          <span>{String(v)}</span>
        </div>
      ))}
    </div>
  );
};

export const DataStructureVisualizer = ({ frame }: { frame: any }) => {
  if (!frame) return null;

  const heap = frame.heap ?? {};
  const locals = frame.stack_to_render?.at(-1)?.encoded_locals ?? {};

  const resolvedLocals = Object.fromEntries(
    Object.entries(locals).map(([k, v]) => [k, resolve(heap, v)])
  );

  return (
    <Card className="h-full overflow-auto">
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4">Data Structures</h3>

        {Object.entries(resolvedLocals).map(([varname, value]: any) => {
          if (!value || typeof value !== "object") return null;

          let content = null;

          if (value.type === "LIST") {
            content = <ArrayRenderer arr={value.data} />;
          } else if (value.type === "DICT") {
            content = <DictRenderer dict={value.data} />;
          } else if (value.type === "FUNCTION") {
            content = (
              <div className="text-xs font-mono">
                <span className="text-muted-foreground">function: </span>
                <span className="font-semibold">{value.data}</span>
              </div>
            );
          } else if (value.type === "INSTANCE") {
            const structure = detectStructure(value.data);

            if (structure === "linked_list") {
              content = <LinkedListRenderer head={value} heap={heap} />;
            } else {
              content = <ObjectRenderer data={value.data} />;
            }
          }

          if (!content) return null;

          return (
            <div key={varname} className="mb-6 p-3 rounded border bg-card">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{varname}</Badge>
                <Badge className="text-xs">{value.type}</Badge>
              </div>
              {content}
            </div>
          );
        })}
      </div>
    </Card>
  );
};
