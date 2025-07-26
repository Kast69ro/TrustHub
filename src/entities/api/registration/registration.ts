import { auth } from "@/config/firebase/firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password }: { email: string; password: string }) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      return true; 
    } catch (error: any) {
      console.log(error);
      
    }
  }
);


