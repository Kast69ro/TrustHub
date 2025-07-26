"use client"

import React, { useState } from "react"
import {
  TextField,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  InputAdornment,
  IconButton,
  Box,
} from "@mui/material"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { Logo } from "@/components/shared/logo/logo"
import { toast } from "sonner"
import { useAppDispatch } from "@/components/shared/hooks/app-dispatch/app-dispatch"
import { registerUser } from "@/entities/api/registration/registration"

export default function RegisterPage() {
  const dispatch = useAppDispatch()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    try {
      await dispatch(
        registerUser({
          email: formData.email,
          password: formData.password,
        })
      )
      toast.success("Account created successfully!")
      setFormData({ email: "", password: "", confirmPassword: "" })
    } catch (err: any) {
      toast.error("Registration failed")
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
      {/* Логотип и приветствие */}
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
          Join TrustHub
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "#555", mt: 1 }}>
          Create your account to get started
        </Typography>
      </Box>

      <Card sx={{ width: 400 }}>
        <CardHeader
          title="Create Account"
          subheader="Join TrustHub to explore the best resources"
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

            <TextField
              fullWidth
              required
              margin="normal"
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      edge="end"
                      aria-label="toggle confirm password visibility"
                    >
                      {showConfirmPassword ? (
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
            >
              Create Account
            </Button>
          </form>

          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            Already have an account?{" "}
            <Link href="/login" className="text-black font-bold hover:underline">
              Sign in here
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}
