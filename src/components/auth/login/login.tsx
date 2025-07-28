"use client"

import React, { useState } from "react"
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { Logo } from "@/components/shared/logo/logo"
import { toast } from "sonner"
import { useAppDispatch } from "@/components/shared/hooks/app-dispatch/app-dispatch"
import { loginUser } from "@/entities/api/login/login" 
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const dispatch = useAppDispatch()

  const router = useRouter()

  const [formData, setFormData] = useState({ email: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields")
      return
    }

    if (!formData.email.includes("@")) {
      toast.error("Please enter a valid email")
      return
    }

    try {
      setIsLoading(true)
       await dispatch(loginUser(formData)).unwrap()
      toast.success("Login successful!")
   window.location.href = '/'


    } catch (err: any) {
      toast.error(err.message || "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f1e9",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 12,
        px: 4,
      }}
    >
      <Box
        sx={{
          mb: 6,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Logo />
        <Typography
          variant="h4"
          component="h1"
          sx={{ fontFamily: "serif", fontWeight: "bold", mt: 2, color: "#000" }}
        >
          Welcome Back
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "#555", mt: 1 }}>
          Sign in to your TrustHub account
        </Typography>
      </Box>

      <Card sx={{ width: 400 }}>
        <CardHeader
          title="Sign In"
          subheader="Access the best verified resources"
          sx={{ textAlign: "center" }}
        />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              required
              margin="normal"
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />

            <TextField
              fullWidth
              required
              margin="normal"
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5 text-gray-600" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-600" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />


            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                bgcolor: "#d7c4a3",
                color: "#000",
                fontWeight: "bold",
                height: 48,
                "&:hover": { bgcolor: "#c2ae91" },
              }}
              disabled={isLoading}
            >
            Sign In
            </Button>
          </form>

          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
           Don&apos;t have an account?{" "}
            <Link href="/registration" className="text-black font-bold hover:underline">
              Create one here
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}
