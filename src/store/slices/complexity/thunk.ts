/* eslint-disable @typescript-eslint/no-explicit-any */
import { POSTAPI } from "@/src/api/api";
import { ApiConfig } from "@/src/config/CommonConfig";
import { PayloadParams1 } from "@/src/utils/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const codeComplexityAction = createAsyncThunk(
  "code-complexity/report",
  async (
    { params = "", payload, toast_status = false }: PayloadParams1,
    { rejectWithValue }
  ) => {
    try {
      const res = await POSTAPI(
        `${ApiConfig?.codeComplexity}${params}`,
        payload,
        toast_status
      );
      if (res?.status) {
        return res.data;
      } else {
        return rejectWithValue(res?.data?.message);
      }
    } catch (err: any) {
      return rejectWithValue(err?.message);
    }
  }
);
