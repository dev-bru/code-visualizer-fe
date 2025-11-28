import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import codeVisualizerReducer from "./slices/visuals";
import codeComplexityReducer from "./slices/complexity";
export const store = configureStore({
  reducer: {
    visualizer: codeVisualizerReducer,
    complexity: codeComplexityReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
