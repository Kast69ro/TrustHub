import { auth } from "@/config/firebase/firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";

export const registerUser = createAsyncThunk<
  boolean,
  { email: string; password: string },
  { rejectValue: string }
>(
  "auth/registerUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error: unknown) {
      const err = error as FirebaseError;
      console.log(err);
      return rejectWithValue(err.message);
    }
  }
);
