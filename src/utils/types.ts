/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/traceTypes.ts

export type RefValue = ["REF", number];
export type Primitive = string | number | boolean | null;
export type EncodedValue = Primitive | RefValue;

// One frame in stack_to_render
export interface StackFrame {
  func_name: string;
  is_parent: boolean;
  frame_id: number;
  parent_frame_id_list: number[];
  encoded_locals: Record<string, EncodedValue>;
  ordered_varnames: string[];
  is_zombie: boolean;
  is_highlighted: boolean;
  unique_hash: string;
}

// One step from your backend trace
export interface TraceStep {
  line: number;
  event: "call" | "return" | "step_line" | "error";
  func_name: string;
  globals: Record<string, EncodedValue>;
  ordered_globals: string[];
  stack_to_render: StackFrame[];
  heap: Record<string, HeapEntryRaw>;
  stdout: string;
}

// Raw heap entry from backend
export type HeapEntryRaw =
  | ["FUNCTION", string, null]
  | ["CLASS", string, any[], ...any[]]
  | ["INSTANCE", string, ...any[]]
  | ["LIST", EncodedValue[]]
  | ["DICT", Record<string, EncodedValue>]
  | any[];

// Normalized heap objects for UI
export type HeapObject =
  | {
      kind: "FUNCTION";
      id: string;
      name: string;
    }
  | {
      kind: "CLASS";
      id: string;
      name: string;
      methods: { name: string; refId: number }[];
    }
  | {
      kind: "INSTANCE";
      id: string;
      className: string;
      fields: { name: string; value: EncodedValue }[];
    }
  | {
      kind: "LIST";
      id: string;
      items: EncodedValue[];
    }
  | {
      kind: "DICT";
      id: string;
      entries: { key: string; value: EncodedValue }[];
    };

// Parse a single heap entry into a UI-friendly object
export function parseHeapEntry(
  id: string,
  raw: HeapEntryRaw
): HeapObject | null {
  const tag = raw[0];

  if (tag === "FUNCTION") {
    const name = raw[1] as string;
    return { kind: "FUNCTION", id, name };
  }

  if (tag === "CLASS") {
    const name = raw[1] as string;
    const methods: { name: string; refId: number }[] = [];
    // raw looks like ["CLASS", name, [], ["__init__", ["REF", 2]], ...]
    for (let i = 3; i < raw.length; i++) {
      const entry = raw[i] as any[];
      const mName = entry[0];
      const ref = entry[1] as RefValue;
      methods.push({ name: mName, refId: ref[1] });
    }
    return { kind: "CLASS", id, name, methods };
  }

  if (tag === "INSTANCE") {
    const className = raw[1] as string;
    const fields: { name: string; value: EncodedValue }[] = [];
    for (let i = 2; i < raw.length; i++) {
      const [fname, fval] = raw[i] as [string, EncodedValue];
      fields.push({ name: fname, value: fval });
    }
    return { kind: "INSTANCE", id, className, fields };
  }

  if (tag === "LIST") {
    return { kind: "LIST", id, items: (raw[1] as EncodedValue[]) ?? [] };
  }

  if (tag === "DICT") {
    const obj = (raw[1] as Record<string, EncodedValue>) ?? {};
    const entries = Object.entries(obj).map(([key, value]) => ({ key, value }));
    return { kind: "DICT", id, entries };
  }

  return null;
}

export function parseHeap(step: TraceStep): HeapObject[] {
  return Object.entries(step.heap)
    .map(([id, raw]) => parseHeapEntry(id, raw))
    .filter((x): x is HeapObject => x !== null);
}

// Resolve a value into a display string (shows REF->id)
export function formatValue(val: EncodedValue): string {
  if (Array.isArray(val) && val[0] === "REF") {
    return `REF(${val[1]})`;
  }
  return String(val);
}
