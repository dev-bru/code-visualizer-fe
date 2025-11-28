import { createSlice } from "@reduxjs/toolkit";
import { CodeComplexityState } from "./types";
import { codeComplexityAction } from "./thunk";
import { initialState } from "@/src/config/Constants";

const initialStates: CodeComplexityState = {
  codeComplexityState: initialState,
};

const codeComplexitySlice = createSlice({
  name: "code-complexity",
  initialState: initialStates,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // codeComplexityState
      .addCase(codeComplexityAction?.pending, (state) => {
        state.codeComplexityState.loading = true;
      })
      .addCase(codeComplexityAction?.fulfilled, (state, action) => {
        state.codeComplexityState.loading = false;
        state.codeComplexityState.data = action?.payload;
        state.codeComplexityState.status = true;
        state.codeComplexityState.error = null;
      })
      .addCase(codeComplexityAction?.rejected, (state, action) => {
        state.codeComplexityState.loading = false;
        state.codeComplexityState.error = action?.error?.message || null;
      });
  },
});

export default codeComplexitySlice.reducer;
