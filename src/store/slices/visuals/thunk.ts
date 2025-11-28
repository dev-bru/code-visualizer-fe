/* eslint-disable @typescript-eslint/no-explicit-any */
import { POSTAPI } from "@/src/api/api";
import { ApiConfig } from "@/src/config/CommonConfig";
import { PayloadParams1 } from "@/src/utils/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const codeVisualizerAction = createAsyncThunk(
  "cheating-detection/report",
  async (
    { params = "", payload, toast_status = false }: PayloadParams1,
    { rejectWithValue }
  ) => {
    try {
      const res = await POSTAPI(
        `${ApiConfig?.codeVisual}${params}`,
        payload,
        toast_status
      );
      if (res?.status) {
        return res.data;
      } else {
        return rejectWithValue(res?.data?.message || "Cheating report failed");
      }
    } catch (err: any) {
      return rejectWithValue(err?.message);
    }
  }
);
