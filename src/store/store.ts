import { configureStore } from "@reduxjs/toolkit"
import authReducer from "@/entities/slices/auth/auth" 
import catalogReducer from "@/entities/slices/catalog/catalog" 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    catalog:catalogReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
