/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
// Updated Visualize.tsx - Integration with EnhancedHeapPanel

"use client";

import React, { useState, useEffect, useCallback } from "react";
import CodePanel from "./CodePanel";
import ControlsPanel from "./ControlsPanel";
import GlobalsPanel from "./GlobalsPanel";
import StackPanel from "./StackPanel";
import OutputPanel from "./OutputPanel";
import { EnhancedHeapPanel } from "./HeapPanel";

// Your real trace from Python Tutor
const LINKED_LIST_TRACE = [
  {
    line: 0,
    event: "call",
    func_name: "<module>",
    globals: {},
    ordered_globals: [],
    stack_to_render: [
      {
        func_name: "<module>",
        is_parent: false,
        frame_id: 1,
        parent_frame_id_list: [],
        encoded_locals: {},
        ordered_varnames: [],
        is_zombie: false,
        is_highlighted: true,
        unique_hash: "<module>_f1",
      },
    ],
    heap: {},
    stdout: "",
  },
  {
    line: 2,
    event: "step_line",
    func_name: "<module>",
    globals: {},
    ordered_globals: [],
    stack_to_render: [
      {
        func_name: "<module>",
        is_parent: false,
        frame_id: 1,
        parent_frame_id_list: [],
        encoded_locals: {},
        ordered_varnames: [],
        is_zombie: false,
        is_highlighted: true,
        unique_hash: "<module>_f1",
      },
    ],
    heap: {},
    stdout: "",
  },
  {
    line: 7,
    event: "step_line",
    func_name: "<module>",
    globals: {
      factorial: ["REF", 1],
    },
    ordered_globals: ["factorial"],
    stack_to_render: [
      {
        func_name: "<module>",
        is_parent: false,
        frame_id: 1,
        parent_frame_id_list: [],
        encoded_locals: {
          factorial: ["REF", 1],
        },
        ordered_varnames: ["factorial"],
        is_zombie: false,
        is_highlighted: true,
        unique_hash: "<module>_f1",
      },
    ],
    heap: {
      "1": ["FUNCTION", "factorial(n)", null],
    },
    stdout: "",
  },
  {
    line: 2,
    event: "call",
    func_name: "factorial",
    globals: {
      factorial: ["REF", 1],
    },
    ordered_globals: ["factorial"],
    stack_to_render: [
      {
        func_name: "<module>",
        is_parent: false,
        frame_id: 1,
        parent_frame_id_list: [],
        encoded_locals: {
          factorial: ["REF", 1],
        },
        ordered_varnames: ["factorial"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "<module>_f1",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 2,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 5,
        },
        ordered_varnames: ["n"],
        is_zombie: false,
        is_highlighted: true,
        unique_hash: "factorial_f2",
      },
    ],
    heap: {
      "1": ["FUNCTION", "factorial(n)", null],
    },
    stdout: "",
  },
  {
    line: 3,
    event: "step_line",
    func_name: "factorial",
    globals: {
      factorial: ["REF", 1],
    },
    ordered_globals: ["factorial"],
    stack_to_render: [
      {
        func_name: "<module>",
        is_parent: false,
        frame_id: 1,
        parent_frame_id_list: [],
        encoded_locals: {
          factorial: ["REF", 1],
        },
        ordered_varnames: ["factorial"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "<module>_f1",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 2,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 5,
        },
        ordered_varnames: ["n"],
        is_zombie: false,
        is_highlighted: true,
        unique_hash: "factorial_f2",
      },
    ],
    heap: {
      "1": ["FUNCTION", "factorial(n)", null],
    },
    stdout: "",
  },
  {
    line: 5,
    event: "step_line",
    func_name: "factorial",
    globals: {
      factorial: ["REF", 1],
    },
    ordered_globals: ["factorial"],
    stack_to_render: [
      {
        func_name: "<module>",
        is_parent: false,
        frame_id: 1,
        parent_frame_id_list: [],
        encoded_locals: {
          factorial: ["REF", 1],
        },
        ordered_varnames: ["factorial"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "<module>_f1",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 2,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 5,
        },
        ordered_varnames: ["n"],
        is_zombie: false,
        is_highlighted: true,
        unique_hash: "factorial_f2",
      },
    ],
    heap: {
      "1": ["FUNCTION", "factorial(n)", null],
    },
    stdout: "",
  },
  {
    line: 2,
    event: "call",
    func_name: "factorial",
    globals: {
      factorial: ["REF", 1],
    },
    ordered_globals: ["factorial"],
    stack_to_render: [
      {
        func_name: "<module>",
        is_parent: false,
        frame_id: 1,
        parent_frame_id_list: [],
        encoded_locals: {
          factorial: ["REF", 1],
        },
        ordered_varnames: ["factorial"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "<module>_f1",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 2,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 5,
        },
        ordered_varnames: ["n"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "factorial_f2",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 3,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 4,
        },
        ordered_varnames: ["n"],
        is_zombie: false,
        is_highlighted: true,
        unique_hash: "factorial_f3",
      },
    ],
    heap: {
      "1": ["FUNCTION", "factorial(n)", null],
    },
    stdout: "",
  },
  {
    line: 3,
    event: "step_line",
    func_name: "factorial",
    globals: {
      factorial: ["REF", 1],
    },
    ordered_globals: ["factorial"],
    stack_to_render: [
      {
        func_name: "<module>",
        is_parent: false,
        frame_id: 1,
        parent_frame_id_list: [],
        encoded_locals: {
          factorial: ["REF", 1],
        },
        ordered_varnames: ["factorial"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "<module>_f1",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 2,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 5,
        },
        ordered_varnames: ["n"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "factorial_f2",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 3,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 4,
        },
        ordered_varnames: ["n"],
        is_zombie: false,
        is_highlighted: true,
        unique_hash: "factorial_f3",
      },
    ],
    heap: {
      "1": ["FUNCTION", "factorial(n)", null],
    },
    stdout: "",
  },
  {
    line: 5,
    event: "step_line",
    func_name: "factorial",
    globals: {
      factorial: ["REF", 1],
    },
    ordered_globals: ["factorial"],
    stack_to_render: [
      {
        func_name: "<module>",
        is_parent: false,
        frame_id: 1,
        parent_frame_id_list: [],
        encoded_locals: {
          factorial: ["REF", 1],
        },
        ordered_varnames: ["factorial"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "<module>_f1",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 2,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 5,
        },
        ordered_varnames: ["n"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "factorial_f2",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 3,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 4,
        },
        ordered_varnames: ["n"],
        is_zombie: false,
        is_highlighted: true,
        unique_hash: "factorial_f3",
      },
    ],
    heap: {
      "1": ["FUNCTION", "factorial(n)", null],
    },
    stdout: "",
  },
  {
    line: 2,
    event: "call",
    func_name: "factorial",
    globals: {
      factorial: ["REF", 1],
    },
    ordered_globals: ["factorial"],
    stack_to_render: [
      {
        func_name: "<module>",
        is_parent: false,
        frame_id: 1,
        parent_frame_id_list: [],
        encoded_locals: {
          factorial: ["REF", 1],
        },
        ordered_varnames: ["factorial"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "<module>_f1",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 2,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 5,
        },
        ordered_varnames: ["n"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "factorial_f2",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 3,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 4,
        },
        ordered_varnames: ["n"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "factorial_f3",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 4,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 3,
        },
        ordered_varnames: ["n"],
        is_zombie: false,
        is_highlighted: true,
        unique_hash: "factorial_f4",
      },
    ],
    heap: {
      "1": ["FUNCTION", "factorial(n)", null],
    },
    stdout: "",
  },
  {
    line: 3,
    event: "step_line",
    func_name: "factorial",
    globals: {
      factorial: ["REF", 1],
    },
    ordered_globals: ["factorial"],
    stack_to_render: [
      {
        func_name: "<module>",
        is_parent: false,
        frame_id: 1,
        parent_frame_id_list: [],
        encoded_locals: {
          factorial: ["REF", 1],
        },
        ordered_varnames: ["factorial"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "<module>_f1",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 2,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 5,
        },
        ordered_varnames: ["n"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "factorial_f2",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 3,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 4,
        },
        ordered_varnames: ["n"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "factorial_f3",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 4,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 3,
        },
        ordered_varnames: ["n"],
        is_zombie: false,
        is_highlighted: true,
        unique_hash: "factorial_f4",
      },
    ],
    heap: {
      "1": ["FUNCTION", "factorial(n)", null],
    },
    stdout: "",
  },
  {
    line: 5,
    event: "step_line",
    func_name: "factorial",
    globals: {
      factorial: ["REF", 1],
    },
    ordered_globals: ["factorial"],
    stack_to_render: [
      {
        func_name: "<module>",
        is_parent: false,
        frame_id: 1,
        parent_frame_id_list: [],
        encoded_locals: {
          factorial: ["REF", 1],
        },
        ordered_varnames: ["factorial"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "<module>_f1",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 2,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 5,
        },
        ordered_varnames: ["n"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "factorial_f2",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 3,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 4,
        },
        ordered_varnames: ["n"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "factorial_f3",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 4,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 3,
        },
        ordered_varnames: ["n"],
        is_zombie: false,
        is_highlighted: true,
        unique_hash: "factorial_f4",
      },
    ],
    heap: {
      "1": ["FUNCTION", "factorial(n)", null],
    },
    stdout: "",
  },
  {
    line: 2,
    event: "call",
    func_name: "factorial",
    globals: {
      factorial: ["REF", 1],
    },
    ordered_globals: ["factorial"],
    stack_to_render: [
      {
        func_name: "<module>",
        is_parent: false,
        frame_id: 1,
        parent_frame_id_list: [],
        encoded_locals: {
          factorial: ["REF", 1],
        },
        ordered_varnames: ["factorial"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "<module>_f1",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 2,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 5,
        },
        ordered_varnames: ["n"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "factorial_f2",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 3,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 4,
        },
        ordered_varnames: ["n"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "factorial_f3",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 4,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 3,
        },
        ordered_varnames: ["n"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "factorial_f4",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 5,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 2,
        },
        ordered_varnames: ["n"],
        is_zombie: false,
        is_highlighted: true,
        unique_hash: "factorial_f5",
      },
    ],
    heap: {
      "1": ["FUNCTION", "factorial(n)", null],
    },
    stdout: "",
  },
  {
    line: 3,
    event: "step_line",
    func_name: "factorial",
    globals: {
      factorial: ["REF", 1],
    },
    ordered_globals: ["factorial"],
    stack_to_render: [
      {
        func_name: "<module>",
        is_parent: false,
        frame_id: 1,
        parent_frame_id_list: [],
        encoded_locals: {
          factorial: ["REF", 1],
        },
        ordered_varnames: ["factorial"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "<module>_f1",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 2,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 5,
        },
        ordered_varnames: ["n"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "factorial_f2",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 3,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 4,
        },
        ordered_varnames: ["n"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "factorial_f3",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 4,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 3,
        },
        ordered_varnames: ["n"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "factorial_f4",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 5,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 2,
        },
        ordered_varnames: ["n"],
        is_zombie: false,
        is_highlighted: true,
        unique_hash: "factorial_f5",
      },
    ],
    heap: {
      "1": ["FUNCTION", "factorial(n)", null],
    },
    stdout: "",
  },
  {
    line: 5,
    event: "step_line",
    func_name: "factorial",
    globals: {
      factorial: ["REF", 1],
    },
    ordered_globals: ["factorial"],
    stack_to_render: [
      {
        func_name: "<module>",
        is_parent: false,
        frame_id: 1,
        parent_frame_id_list: [],
        encoded_locals: {
          factorial: ["REF", 1],
        },
        ordered_varnames: ["factorial"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "<module>_f1",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 2,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 5,
        },
        ordered_varnames: ["n"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "factorial_f2",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 3,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 4,
        },
        ordered_varnames: ["n"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "factorial_f3",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 4,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 3,
        },
        ordered_varnames: ["n"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "factorial_f4",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 5,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 2,
        },
        ordered_varnames: ["n"],
        is_zombie: false,
        is_highlighted: true,
        unique_hash: "factorial_f5",
      },
    ],
    heap: {
      "1": ["FUNCTION", "factorial(n)", null],
    },
    stdout: "",
  },
  {
    line: 2,
    event: "call",
    func_name: "factorial",
    globals: {
      factorial: ["REF", 1],
    },
    ordered_globals: ["factorial"],
    stack_to_render: [
      {
        func_name: "<module>",
        is_parent: false,
        frame_id: 1,
        parent_frame_id_list: [],
        encoded_locals: {
          factorial: ["REF", 1],
        },
        ordered_varnames: ["factorial"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "<module>_f1",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 2,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 5,
        },
        ordered_varnames: ["n"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "factorial_f2",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 3,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 4,
        },
        ordered_varnames: ["n"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "factorial_f3",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 4,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 3,
        },
        ordered_varnames: ["n"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "factorial_f4",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 5,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 2,
        },
        ordered_varnames: ["n"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "factorial_f5",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 6,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 1,
        },
        ordered_varnames: ["n"],
        is_zombie: false,
        is_highlighted: true,
        unique_hash: "factorial_f6",
      },
    ],
    heap: {
      "1": ["FUNCTION", "factorial(n)", null],
    },
    stdout: "",
  },
  {
    line: 3,
    event: "step_line",
    func_name: "factorial",
    globals: {
      factorial: ["REF", 1],
    },
    ordered_globals: ["factorial"],
    stack_to_render: [
      {
        func_name: "<module>",
        is_parent: false,
        frame_id: 1,
        parent_frame_id_list: [],
        encoded_locals: {
          factorial: ["REF", 1],
        },
        ordered_varnames: ["factorial"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "<module>_f1",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 2,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 5,
        },
        ordered_varnames: ["n"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "factorial_f2",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 3,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 4,
        },
        ordered_varnames: ["n"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "factorial_f3",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 4,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 3,
        },
        ordered_varnames: ["n"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "factorial_f4",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 5,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 2,
        },
        ordered_varnames: ["n"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "factorial_f5",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 6,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 1,
        },
        ordered_varnames: ["n"],
        is_zombie: false,
        is_highlighted: true,
        unique_hash: "factorial_f6",
      },
    ],
    heap: {
      "1": ["FUNCTION", "factorial(n)", null],
    },
    stdout: "",
  },
  {
    line: 4,
    event: "step_line",
    func_name: "factorial",
    globals: {
      factorial: ["REF", 1],
    },
    ordered_globals: ["factorial"],
    stack_to_render: [
      {
        func_name: "<module>",
        is_parent: false,
        frame_id: 1,
        parent_frame_id_list: [],
        encoded_locals: {
          factorial: ["REF", 1],
        },
        ordered_varnames: ["factorial"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "<module>_f1",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 2,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 5,
        },
        ordered_varnames: ["n"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "factorial_f2",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 3,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 4,
        },
        ordered_varnames: ["n"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "factorial_f3",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 4,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 3,
        },
        ordered_varnames: ["n"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "factorial_f4",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 5,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 2,
        },
        ordered_varnames: ["n"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "factorial_f5",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 6,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 1,
        },
        ordered_varnames: ["n"],
        is_zombie: false,
        is_highlighted: true,
        unique_hash: "factorial_f6",
      },
    ],
    heap: {
      "1": ["FUNCTION", "factorial(n)", null],
    },
    stdout: "",
  },
  {
    line: 4,
    event: "return",
    func_name: "factorial",
    globals: {
      factorial: ["REF", 1],
    },
    ordered_globals: ["factorial"],
    stack_to_render: [
      {
        func_name: "<module>",
        is_parent: false,
        frame_id: 1,
        parent_frame_id_list: [],
        encoded_locals: {
          factorial: ["REF", 1],
        },
        ordered_varnames: ["factorial"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "<module>_f1",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 2,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 5,
        },
        ordered_varnames: ["n"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "factorial_f2",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 3,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 4,
        },
        ordered_varnames: ["n"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "factorial_f3",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 4,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 3,
        },
        ordered_varnames: ["n"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "factorial_f4",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 5,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 2,
        },
        ordered_varnames: ["n"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "factorial_f5",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 6,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 1,
          __return__: 1,
        },
        ordered_varnames: ["n", "__return__"],
        is_zombie: false,
        is_highlighted: true,
        unique_hash: "factorial_f6",
      },
    ],
    heap: {
      "1": ["FUNCTION", "factorial(n)", null],
    },
    stdout: "",
  },
  {
    line: 5,
    event: "return",
    func_name: "factorial",
    globals: {
      factorial: ["REF", 1],
    },
    ordered_globals: ["factorial"],
    stack_to_render: [
      {
        func_name: "<module>",
        is_parent: false,
        frame_id: 1,
        parent_frame_id_list: [],
        encoded_locals: {
          factorial: ["REF", 1],
        },
        ordered_varnames: ["factorial"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "<module>_f1",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 2,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 5,
        },
        ordered_varnames: ["n"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "factorial_f2",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 3,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 4,
        },
        ordered_varnames: ["n"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "factorial_f3",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 4,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 3,
        },
        ordered_varnames: ["n"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "factorial_f4",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 5,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 2,
          __return__: 2,
        },
        ordered_varnames: ["n", "__return__"],
        is_zombie: false,
        is_highlighted: true,
        unique_hash: "factorial_f5",
      },
    ],
    heap: {
      "1": ["FUNCTION", "factorial(n)", null],
    },
    stdout: "",
  },
  {
    line: 5,
    event: "return",
    func_name: "factorial",
    globals: {
      factorial: ["REF", 1],
    },
    ordered_globals: ["factorial"],
    stack_to_render: [
      {
        func_name: "<module>",
        is_parent: false,
        frame_id: 1,
        parent_frame_id_list: [],
        encoded_locals: {
          factorial: ["REF", 1],
        },
        ordered_varnames: ["factorial"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "<module>_f1",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 2,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 5,
        },
        ordered_varnames: ["n"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "factorial_f2",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 3,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 4,
        },
        ordered_varnames: ["n"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "factorial_f3",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 4,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 3,
          __return__: 6,
        },
        ordered_varnames: ["n", "__return__"],
        is_zombie: false,
        is_highlighted: true,
        unique_hash: "factorial_f4",
      },
    ],
    heap: {
      "1": ["FUNCTION", "factorial(n)", null],
    },
    stdout: "",
  },
  {
    line: 5,
    event: "return",
    func_name: "factorial",
    globals: {
      factorial: ["REF", 1],
    },
    ordered_globals: ["factorial"],
    stack_to_render: [
      {
        func_name: "<module>",
        is_parent: false,
        frame_id: 1,
        parent_frame_id_list: [],
        encoded_locals: {
          factorial: ["REF", 1],
        },
        ordered_varnames: ["factorial"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "<module>_f1",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 2,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 5,
        },
        ordered_varnames: ["n"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "factorial_f2",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 3,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 4,
          __return__: 24,
        },
        ordered_varnames: ["n", "__return__"],
        is_zombie: false,
        is_highlighted: true,
        unique_hash: "factorial_f3",
      },
    ],
    heap: {
      "1": ["FUNCTION", "factorial(n)", null],
    },
    stdout: "",
  },
  {
    line: 5,
    event: "return",
    func_name: "factorial",
    globals: {
      factorial: ["REF", 1],
    },
    ordered_globals: ["factorial"],
    stack_to_render: [
      {
        func_name: "<module>",
        is_parent: false,
        frame_id: 1,
        parent_frame_id_list: [],
        encoded_locals: {
          factorial: ["REF", 1],
        },
        ordered_varnames: ["factorial"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "<module>_f1",
      },
      {
        func_name: "factorial",
        is_parent: false,
        frame_id: 2,
        parent_frame_id_list: [],
        encoded_locals: {
          n: 5,
          __return__: 120,
        },
        ordered_varnames: ["n", "__return__"],
        is_zombie: false,
        is_highlighted: true,
        unique_hash: "factorial_f2",
      },
    ],
    heap: {
      "1": ["FUNCTION", "factorial(n)", null],
    },
    stdout: "",
  },
  {
    line: 8,
    event: "step_line",
    func_name: "<module>",
    globals: {
      factorial: ["REF", 1],
      result: 120,
    },
    ordered_globals: ["factorial", "result"],
    stack_to_render: [
      {
        func_name: "<module>",
        is_parent: false,
        frame_id: 1,
        parent_frame_id_list: [],
        encoded_locals: {
          factorial: ["REF", 1],
          result: 120,
        },
        ordered_varnames: ["factorial", "result"],
        is_zombie: false,
        is_highlighted: true,
        unique_hash: "<module>_f1",
      },
    ],
    heap: {
      "1": ["FUNCTION", "factorial(n)", null],
    },
    stdout: "",
  },
  {
    line: 249,
    event: "call",
    func_name: "write",
    globals: {
      factorial: ["REF", 1],
      result: 120,
    },
    ordered_globals: ["factorial", "result"],
    stack_to_render: [
      {
        func_name: "<module>",
        is_parent: false,
        frame_id: 1,
        parent_frame_id_list: [],
        encoded_locals: {
          factorial: ["REF", 1],
          result: 120,
        },
        ordered_varnames: ["factorial", "result"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "<module>_f1",
      },
    ],
    heap: {
      "1": ["FUNCTION", "factorial(n)", null],
    },
    stdout: "",
  },
  {
    line: 251,
    event: "return",
    func_name: "write",
    globals: {
      factorial: ["REF", 1],
      result: 120,
    },
    ordered_globals: ["factorial", "result"],
    stack_to_render: [
      {
        func_name: "<module>",
        is_parent: false,
        frame_id: 1,
        parent_frame_id_list: [],
        encoded_locals: {
          factorial: ["REF", 1],
          result: 120,
        },
        ordered_varnames: ["factorial", "result"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "<module>_f1",
      },
    ],
    heap: {
      "1": ["FUNCTION", "factorial(n)", null],
    },
    stdout: "Factorial of 5 is 120",
  },
  {
    line: 249,
    event: "call",
    func_name: "write",
    globals: {
      factorial: ["REF", 1],
      result: 120,
    },
    ordered_globals: ["factorial", "result"],
    stack_to_render: [
      {
        func_name: "<module>",
        is_parent: false,
        frame_id: 1,
        parent_frame_id_list: [],
        encoded_locals: {
          factorial: ["REF", 1],
          result: 120,
        },
        ordered_varnames: ["factorial", "result"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "<module>_f1",
      },
    ],
    heap: {
      "1": ["FUNCTION", "factorial(n)", null],
    },
    stdout: "Factorial of 5 is 120",
  },
  {
    line: 251,
    event: "return",
    func_name: "write",
    globals: {
      factorial: ["REF", 1],
      result: 120,
    },
    ordered_globals: ["factorial", "result"],
    stack_to_render: [
      {
        func_name: "<module>",
        is_parent: false,
        frame_id: 1,
        parent_frame_id_list: [],
        encoded_locals: {
          factorial: ["REF", 1],
          result: 120,
        },
        ordered_varnames: ["factorial", "result"],
        is_zombie: false,
        is_highlighted: false,
        unique_hash: "<module>_f1",
      },
    ],
    heap: {
      "1": ["FUNCTION", "factorial(n)", null],
    },
    stdout: "Factorial of 5 is 120\n",
  },
  {
    line: 8,
    event: "return",
    func_name: "<module>",
    globals: {
      factorial: ["REF", 1],
      result: 120,
    },
    ordered_globals: ["factorial", "result"],
    stack_to_render: [
      {
        func_name: "<module>",
        is_parent: false,
        frame_id: 1,
        parent_frame_id_list: [],
        encoded_locals: {
          factorial: ["REF", 1],
          result: 120,
          __return__: null,
        },
        ordered_varnames: ["factorial", "result", "__return__"],
        is_zombie: false,
        is_highlighted: true,
        unique_hash: "<module>_f1",
      },
    ],
    heap: {
      "1": ["FUNCTION", "factorial(n)", null],
    },
    stdout: "Factorial of 5 is 120\n",
  },
];

const SOURCE_CODE = `def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n\nresult = factorial(5)\nprint(f"Factorial of 5 is {result}")`;

interface TraceStep {
  line: number;
  event: string;
  func_name: string;
  globals: Record<string, any>;
  ordered_globals: string[];
  stack_to_render: any[];
  heap: Record<string, any>;
  stdout: string;
}

const Visualize = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [trace] = useState<TraceStep[]>(LINKED_LIST_TRACE);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < trace.length - 1) {
          return prev + 1;
        } else {
          setIsPlaying(false);
          return prev;
        }
      });
    }, speed);

    return () => clearInterval(interval);
  }, [isPlaying, speed, trace.length]);

  const handleFirst = useCallback(() => {
    setCurrentStep(0);
    setIsPlaying(false);
  }, []);

  const handlePrevious = useCallback(() => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentStep((prev) => Math.min(trace.length - 1, prev + 1));
  }, []);

  const handleLast = useCallback(() => {
    setCurrentStep(trace.length - 1);
    setIsPlaying(false);
  }, []);

  const handlePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const handleSpeedChange = useCallback((value: number) => {
    setSpeed(value);
  }, []);

  const currentStepData = trace[currentStep];

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Code Visualizer - Python Tutor Format</h1>
        <p style={styles.subtitle}>
          Step through linked list creation and traversal
        </p>
      </div>

      {/* Main Layout */}
      <div style={styles.mainLayout}>
        {/* Left Column */}
        <div style={styles.leftColumn}>
          <CodePanel code={SOURCE_CODE} currentLine={currentStepData?.line} />
          <div style={styles.divider} />
          <ControlsPanel
            currentStep={currentStep}
            totalSteps={trace.length}
            isPlaying={isPlaying}
            speed={speed}
            onFirst={handleFirst}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onLast={handleLast}
            onPlayPause={handlePlayPause}
            onSpeedChange={handleSpeedChange}
          />
        </div>

        {/* Right Column */}
        <div style={styles.rightColumn}>
          {/* Top Row */}
          <div style={styles.topRow}>
            <GlobalsPanel
              globals={currentStepData?.globals}
              orderedGlobals={currentStepData?.ordered_globals}
            />
            <EnhancedHeapPanel heap={currentStepData?.heap} />{" "}
            {/* ← Using EnhancedHeapPanel */}
          </div>

          {/* Stack */}
          <StackPanel stackToRender={currentStepData?.stack_to_render} />

          {/* Output */}
          <OutputPanel stdout={currentStepData?.stdout} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex" as const,
    flexDirection: "column" as const,
    height: "100vh",
    backgroundColor: "var(--color-background)",
    overflow: "hidden" as const,
  },
  header: {
    padding: "var(--space-24) var(--space-32)",
    backgroundColor: "var(--color-surface)",
    borderBottom: "1px solid var(--color-border)",
    boxShadow: "var(--shadow-sm)",
  },
  title: {
    margin: "0 0 var(--space-4) 0",
    fontSize: "var(--font-size-xl)",
    fontWeight: "var(--font-weight-bold)",
    color: "var(--color-text)",
  },
  subtitle: {
    margin: 0,
    fontSize: "var(--font-size-sm)",
    color: "var(--color-text-secondary)",
    fontWeight: "var(--font-weight-normal)",
  },
  mainLayout: {
    display: "grid" as const,
    gridTemplateColumns: "1fr 1.5fr",
    gap: "var(--space-24)",
    flex: 1,
    overflow: "hidden" as const,
    padding: "var(--space-24) var(--space-32)",
  },
  leftColumn: {
    display: "flex" as const,
    flexDirection: "column" as const,
    gap: "var(--space-16)",
    overflow: "hidden" as const,
  },
  rightColumn: {
    display: "flex" as const,
    flexDirection: "column" as const,
    gap: "var(--space-16)",
    overflow: "hidden" as const,
  },
  divider: {
    height: "1px",
    backgroundColor: "var(--color-border)",
    margin: "var(--space-12) 0",
  },
  topRow: {
    display: "grid" as const,
    gridTemplateColumns: "1fr 1fr",
    gap: "var(--space-16)",
    flex: "0 0 auto",
    maxHeight: "40%",
    overflow: "hidden" as const,
  },
};

export default Visualize;
