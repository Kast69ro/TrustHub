"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Box,
  Button,
  Typography,
  TextField,
  Stack,
  Divider,
  Paper,
  Tabs,
  Tab,
} from "@mui/material";
import faq from "@/assets/faq.jpeg";
import contact from "@/assets/contact.jpeg";
import contact1 from "@/assets/contact-2.jpeg";
import {
  EnvelopeIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ClockIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function ContactTabs() {
  const t = useTranslations("faq");
  const k = useTranslations("contact");
  const f = useTranslations("contact-form");

  const [tabIndex, setTabIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const infoCardsRef = useRef<HTMLDivElement>(null);
  const [infoCardsHeight, setInfoCardsHeight] = useState<number | undefined>(
    undefined
  );

  const formRef = useRef<HTMLDivElement>(null);
  const [formHeight, setFormHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (infoCardsRef.current) {
      setInfoCardsHeight(infoCardsRef.current.clientHeight);
    }
    if (formRef.current) {
      setFormHeight(formRef.current.clientHeight);
    }
  }, [tabIndex, formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (res.ok) {
        toast.success("Сообщение успешно отправлено!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error("Ошибка: " + (result.error || "Неизвестная ошибка"));
      }
    } catch {
      toast.error("Неожиданная ошибка");
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const infoCards = [
    {
      icon: <EnvelopeIcon className="w-6 h-6 text-[#1a1a1a]" />,
      title: k('card-one-title'),
      subtitle: "hello@trusthub.com",
      description: k("card-one-about"),
    },
    {
      icon: (
        <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6 text-[#1a1a1a]" />
      ),
     title: k('card-two-title'),
      subtitle: k("card-two-about-1"),
      description: k("card-two-about")
    },
    {
      icon: <ClockIcon className="w-6 h-6 text-[#1a1a1a]" />,
      title: k('card-three-title') ,
      subtitle: k("card-three-about-1"),
      description: k("card-three-about")
    },
  ];

  const faqs = [
    {
      question: t("question-one"),
      answer: t("answer-one"),
    },
    {
      question: t("question-two"),
      answer: t("answer-two"),
    },
    {
      question: t("question-three"),
      answer: t("answer-three"),
    },
    {
      question: t("question-four"),
      answer: t("answer-four"), 
    },
  ];

  const textFieldSx = {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#d7c4a3",
      },
      "&:hover fieldset": {
        borderColor: "#d7c4a3",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#d7c4a3",
        borderWidth: 2,
      },
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: "#d7c4a3",
    },
  };

  const tabsSx = {
    "& .MuiTabs-indicator": {
      bgcolor: "#d7c4a3",
    },
  };

  const tabSx = {
    color: "#1a1a1a",
    fontWeight: "bold",
    textTransform: "none",
    "&.Mui-selected": {
      color: "#d7c4a3",
    },
    "&:hover": {
      color: "#d7c4a3",
      opacity: 1,
    },
  };

  return (
    <Box sx={{ bgcolor: "#f9f7f3", py: 10, px: { xs: 2, md: 4 } }}>
      <Box sx={{ bgcolor: "#f9f7f3", borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabIndex}
          onChange={(e, val) => setTabIndex(val)}
          centered
          sx={tabsSx}
        >
          <Tab label="FAQ" sx={tabSx} />
          <Tab label="Contact" sx={tabSx} />
        </Tabs>
      </Box>

      <Box maxWidth="1200px" mx="auto" sx={{ mt: 6 }}>
        {tabIndex === 0 && (
          <Box
            sx={{
              bgcolor: "#f9f7f3",
              py: { xs: 4, md: 6 },
              px: { xs: 2, md: 0 },
              borderRadius: 3,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 4,
              alignItems: "flex-start",
            }}
          >
            <Box flex={1} sx={{ borderRadius: 3, overflow: "hidden",display:'flex',alignItems:'center' }}>
              <Image
                src={faq}
                alt="FAQ Illustration"
                style={{
                  borderRadius: 12,
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                  minHeight: 300,
                }}
                sizes="(min-width: 900px) 50vw, 100vw"
                priority
              />
            </Box>

            <Box flex={2}>
              <Paper
                sx={{
                  p: { xs: 3, md: 5 },
                  borderRadius: 3,
                  border: "1px solid #e0ddd8",
                  background: "#fff",
                  height: "100%",
                }}
              >
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  textAlign="center"
                  color="#1a1a1a"
                  mb={4}
                >
                  {t("title")}
                </Typography>
                <Stack spacing={5}>
                  {faqs.map((faq, idx) => (
                    <Box key={idx}>
                      <Typography
                        variant="subtitle1"
                        fontWeight="600"
                        mb={1}
                        color="#1a1a1a"
                      >
                        {faq.question}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {faq.answer}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Paper>
            </Box>
          </Box>
        )}

        {tabIndex === 1 && (
          <Stack
            spacing={6}
            alignItems="flex-start"
            width="100%"
            maxWidth="1200px"
            mx="auto"
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 4,
                width: "100%",
                alignItems: "stretch",
              }}
            >
              <Box
                flex={1.65}
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  height: { xs: 200, sm: 300, md: infoCardsHeight || 400 },
                  minHeight: 200,
                }}
              >
                <Image
                  src={contact}
                  alt="Contact Illustration"
                  style={{
                    borderRadius: 12,
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                  }}
                  sizes="(max-width: 900px) 100vw, 33vw"
                  priority
                />
              </Box>

              <Stack
                flex={1}
                spacing={4}
                ref={infoCardsRef}
                sx={{
                  flexShrink: 0,
                  width: "100%",
                }}
              >
                {infoCards.map((item, idx) => (
                  <Paper
                    key={idx}
                    elevation={3}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      bgcolor: "#fff",
                      transition: "0.3s",
                      "&:hover": { boxShadow: 6 },
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      mb={1}
                    >
                      <Box
                        sx={{
                          bgcolor: "#d7c4a3",
                          p: 1.5,
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {item.icon}
                      </Box>
                      <Box>
                        <Typography fontWeight="bold" color="#1a1a1a">
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.subtitle}
                        </Typography>
                      </Box>
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </Paper>
                ))}
              </Stack>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 4,
                width: "100%",
                alignItems: "stretch",
              }}
            >
              {/* Форма */}
              <Paper
                ref={formRef}
                elevation={4}
                sx={{
                  p: { xs: 2, md: 4 },
                  borderRadius: 3,
                  flex: 1.5,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h5" fontWeight="bold" mb={3}>
                  {f('title')}
                </Typography>
                <Divider sx={{ mb: 3, borderColor: "#d7c4a3" }} />
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
                >
                  <Stack spacing={3} flexGrow={1}>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
                      <TextField
                        fullWidth
                        label={f('name')}
                        id="name"
                        variant="outlined"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        required
                        sx={textFieldSx}
                      />
                      <TextField
                        fullWidth
                        label={f('email')}
                        id="email"
                        type="email"
                        variant="outlined"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        required
                        sx={textFieldSx}
                      />
                    </Stack>
                    <TextField
                      fullWidth
                      label={f('subject')}
                      id="subject"
                      variant="outlined"
                      value={formData.subject}
                      onChange={(e) =>
                        handleInputChange("subject", e.target.value)
                      }
                      required
                      sx={textFieldSx}
                    />
                    <TextField
                      fullWidth
                      label={f('message')}
                      id="message"
                      multiline
                      rows={5}
                      variant="outlined"
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange("message", e.target.value)
                      }
                      required
                      sx={{ ...textFieldSx, flexGrow: 1 }}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      sx={{
                        bgcolor: "#1a1a1a",
                        color: "#f9f7f3",
                        py: 1.5,
                        fontWeight: "bold",
                        "&:hover": {
                          bgcolor: "#333",
                        },
                      }}
                      endIcon={
                        <PaperAirplaneIcon style={{ width: 20, height: 20 }} />
                      }
                    >
                      {f('button')}
                    </Button>
                  </Stack>
                </Box>
              </Paper>

              <Box
                sx={{
                  flex: 1,
                  borderRadius: 3,
                  overflow: "hidden",
                  height: { xs: 200, sm: 300, md: formHeight || 400 },
                  width: "100%",
                }}
              >
                <Image
                  src={contact1}
                  alt="Additional Contact Illustration"
                  style={{
                    borderRadius: 12,
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                  }}
                  sizes="(max-width: 900px) 100vw, 25vw"
                  priority
                />
              </Box>
            </Box>
          </Stack>
        )}
      </Box>
    </Box>
  );
}
