"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
  Divider,
  CircularProgress,
} from "@mui/material";

import { toast } from "sonner";
import { Logo } from "@/components/shared/logo/logo";
import { queryGeminiAI, type AiResponse } from "@/entities/api/check-site/check";
import axios from "axios";
import { ResourceToAdd, saveResourceIfTrusted } from "@/entities/api/catalog/catalog";
import Image from "next/image";
import foto from "@/assets/form-img (2).jpeg";

export default function SubmissionPage() {
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    description: "",
    fullDescription: "",
  });
  const [aiDecision, setAiDecision] = useState<"Accepted" | "Rejected" | "Sent to Manual Review" | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const countWords = (text: string) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const errors = [];

    if (countWords(formData.description) < 10) {
      errors.push("Description must be at least 10 words.");
    }

    if (countWords(formData.fullDescription) < 20) {
      errors.push("Full description must be at least 20 words.");
    }

    if (errors.length > 0) {
      toast.error(errors.join("\n"));
      setLoading(false);
      return;
    }

    try {
      const aiResponse: AiResponse = await queryGeminiAI(
        formData.title,
        formData.description,
        formData.fullDescription
      );

      if (aiResponse.trusted === true) {
        setAiDecision("Accepted");
        toast.success("AI approved this site!");

        const fullResource: ResourceToAdd = {
          category: aiResponse.category,
          description: formData.description,
          fullDescription: formData.fullDescription,
          isOfficial: aiResponse.isOfficial,
          tags: aiResponse.tags,
          title: formData.title,
          trustLevel: aiResponse.trustLevel,
          url: formData.url,
          trusted: aiResponse.trusted,
        };

        await saveResourceIfTrusted(fullResource);
        toast.success("Resource saved to Firebase!");

        setFormData({
          title: "",
          url: "",
          description: "",
          fullDescription: "",
        });
      } else if (aiResponse.trusted === false) {
        setAiDecision("Rejected");
        toast.error("AI rejected the site");
      } else {
        setAiDecision("Sent to Manual Review");
        toast("AI is unsure — sending to moderators");

        await axios.post("/api/contact", {
          name: `AI unsure about ${formData.title} sie `,
          email: `URL: ${formData.url}`,
          subject: `Description:\n${formData.description}`,
          message: `Full Description:\n${formData.fullDescription}`,
        });

        toast.success("Sent to Telegram moderation group");
      }
    } catch (err) {
      console.error("AI check failed:", err);
      setError("AI failed to process. Please try again later.");
      toast.error("AI failed to process. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyles = {
    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#f1eadb",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#f1eadb",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#bfae8f",
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f1e9",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 8,
        px: 2,
      }}
    >
      <Box textAlign="center" mb={4}>
        <div className="flex justify-center">
          <Logo />
        </div>
        <Typography
          variant="h4"
          sx={{ fontFamily: "serif", fontWeight: "bold", mt: 2, color: "#000" }}
        >
          Submit a Resource
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "#555", mt: 1 }}>
          Help us expand TrustHub with useful tools and knowledge
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          alignItems: "stretch",
          justifyContent: "center",
          width: "100%",
          maxWidth: 1100,
        }}
      >
        {/* Форма */}
        <Card sx={{ flex: 1, minWidth: 350 }}>
          <CardHeader
            title="Submission Form"
            subheader="All submissions will be reviewed by AI"
            sx={{ textAlign: "center" }}
          />
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                required
                label="Website Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                margin="normal"
                sx={inputStyles}
              />

              <TextField
                fullWidth
                required
                label="Website URL"
                name="url"
                value={formData.url}
                onChange={handleChange}
                type="url"
                margin="normal"
                sx={inputStyles}
              />

              <TextField
                fullWidth
                required
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                margin="normal"
                multiline
                rows={4}
                sx={inputStyles}
              />

              <TextField
                fullWidth
                required
                label="Full Description"
                name="fullDescription"
                value={formData.fullDescription}
                onChange={handleChange}
                margin="normal"
                multiline
                rows={6}
                sx={inputStyles}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
                  mt: 3,
                  bgcolor: "#f1eadb",
                  color: "#000",
                  fontWeight: "bold",
                  height: 48,
                  "&:hover": { bgcolor: "#e5dbca" },
                }}
              >
                {loading ? <CircularProgress size={24} /> : "Submit Website"}
              </Button>
            </form>

            {error && (
              <Typography color="error" textAlign="center" mt={2}>
                {error}
              </Typography>
            )}

            {aiDecision && (
              <>
                <Divider sx={{ my: 3 }} />
                <Typography variant="subtitle1" textAlign="center" fontWeight={600}>
                  AI Decision:
                </Typography>
                <pre
                  style={{
                    backgroundColor: "#eee",
                    padding: 16,
                    borderRadius: 8,
                    whiteSpace: "pre-wrap",
                    fontSize: 14,
                  }}
                >
                  {aiDecision}
                </pre>
              </>
            )}
          </CardContent>
        </Card>

        {/* Изображение */}
        <Box
          sx={{
            flex: 1,
            position: "relative",
            borderRadius: 2,
            overflow: "hidden",
            minHeight: { xs: 600, md: "100%" },
          }}
        >
          <Image
            src={foto}
            alt="TrustHub Illustration"
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </Box>
      </Box>
    </Box>
  );
}
