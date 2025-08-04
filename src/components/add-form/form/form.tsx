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
import { useTranslations } from "next-intl";

export default function SubmissionPage() {
  const t = useTranslations("add-form");
  const k = useTranslations("add-page");
  const i = useTranslations("add-form-ai-unswer");

  const [formData, setFormData] = useState({
    title: "",
    url: "",
    description: "",
    fullDescription: "",
  });

  const [aiDecision, setAiDecision] = useState<"Accepted" | "Rejected" | "Sent to Manual Review" | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const decisionMap: Record<string, string> = {
    Accepted: i("accepted"),
    Rejected: i("rejected"),
    "Sent to Manual Review": i("manual"),
  };

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
      errors.push(i("one"));
    }

    if (countWords(formData.fullDescription) < 20) {
      errors.push(i("two"));
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
        toast.success(i("three"));

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
        toast.success(i("four"));

        setFormData({
          title: "",
          url: "",
          description: "",
          fullDescription: "",
        });
      } else if (aiResponse.trusted === false) {
        setAiDecision("Rejected");
        toast.error(i("five"));
        setFormData({
          title: "",
          url: "",
          description: "",
          fullDescription: "",
        });
      } else {
        setAiDecision("Sent to Manual Review");
        toast(i("six"));
        setFormData({
          title: "",
          url: "",
          description: "",
          fullDescription: "",
        });

        await axios.post("/api/contact", {
          name: `AI unsure about ${formData.title} site `,
          email: `URL: ${formData.url}`,
          subject: `Description:\n${formData.description}`,
          message: `Full Description:\n${formData.fullDescription}`,
        });

        toast.success(i("seven"));
      }
    } catch (err) {
      console.error("AI check failed:", err);
      setError(i("eight"));
      toast.error(i("eight"));
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
          {k("title")}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "#555", mt: 1 }}>
          {k("about")}
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
        <Card sx={{ flex: 1, minWidth: 350 }}>
          <CardHeader
            title={t("title")}
            subheader={t("about")}
            sx={{ textAlign: "center" }}
          />
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                required
                label={t("input-one")}
                name="title"
                value={formData.title}
                onChange={handleChange}
                margin="normal"
                sx={inputStyles}
              />

              <TextField
                fullWidth
                required
                label={t("input-two")}
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
                label={t("input-three")}
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
                label={t("input-four")}
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
                {loading ? <CircularProgress size={24} /> : t("submit")}
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
                  {t("ai")}:
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
                  {decisionMap[aiDecision]}
                </pre>
              </>
            )}
          </CardContent>
        </Card>

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
