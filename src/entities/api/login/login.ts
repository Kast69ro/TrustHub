import { createAsyncThunk } from "@reduxjs/toolkit"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/config/firebase/firebase"

interface LoginResult {
  uid: string
  email: string
}

export const loginUser = createAsyncThunk<LoginResult, { email: string; password: string }>(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      const token = await user.getIdToken()
      localStorage.setItem('trust_token',token)


      return {
        uid: user.uid,
        email: user.email ?? "", 
      }
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)
