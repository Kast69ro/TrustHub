import { createSlice } from "@reduxjs/toolkit"
import { loginUser } from "@/entities/api/login/login"

interface AuthState {
  uid: string | null
  email: string | null
}

const initialState: AuthState = {
  uid: null,
  email: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.uid = action.payload.uid
      state.email = action.payload.email
    })
  },
})

export default authSlice.reducer
