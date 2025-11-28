import { createSlice } from "@reduxjs/toolkit";
import { CodeVisualState } from "./types";
import { codeVisualizerAction } from "./thunk";
import { initialState } from "@/src/config/Constants";

const initialStates: CodeVisualState = {
  codeVisualizerState: initialState,
};

const codeVisualizerSlice = createSlice({
  name: "code-visualizer",
  initialState: initialStates,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // codeVisualizerState
      .addCase(codeVisualizerAction?.pending, (state) => {
        state.codeVisualizerState.loading = true;
      })
      .addCase(codeVisualizerAction?.fulfilled, (state, action) => {
        state.codeVisualizerState.loading = false;
        state.codeVisualizerState.data = action?.payload;
        state.codeVisualizerState.status = true;
        state.codeVisualizerState.error = null;
      })
      .addCase(codeVisualizerAction?.rejected, (state, action) => {
        state.codeVisualizerState.loading = false;
        state.codeVisualizerState.error = action?.error?.message || null;
      });
  },
});

export default codeVisualizerSlice.reducer;
