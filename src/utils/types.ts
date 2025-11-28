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

export interface ReduxState<T = any> {
  status: boolean;
  loading: boolean;
  data: T | null;
  error: string | null;
}

export interface PayloadParams1 {
  params?: string;
  payload?: any;
  toast_status?: boolean;
}

export interface PayloadParams2 {
  params?: string;
  toast_status?: boolean;
}
