"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Stack,
  Divider,
  Paper,
} from "@mui/material";
import {
  EnvelopeIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ClockIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

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
      title: "Email Us",
      subtitle: "hello@trusthub.com",
      description: "For general inquiries, partnerships, or support questions.",
    },
    {
      icon: <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6 text-[#1a1a1a]" />,
      title: "Live Chat",
      subtitle: "Available 9 AM - 5 PM EST",
      description: "Get instant help with our AI assistant or connect with our team.",
    },
    {
      icon: <ClockIcon className="w-6 h-6 text-[#1a1a1a]" />,
      title: "Response Time",
      subtitle: "Within 24 hours",
      description: "We typically respond to all inquiries within one business day.",
    },
  ];

  const faqs = [
    {
      question: "How do you verify resources?",
      answer: "Our team manually reviews each submission, checking functionality, legitimacy, and value before approval.",
    },
    {
      question: "Can I suggest a resource?",
      answer: "Use our Submit Resource page to suggest new tools and services for the community.",
    },
    {
      question: "Is TrustHub free to use?",
      answer: "Yes, TrustHub is completely free for all users. We believe in open access to quality resources.",
    },
    {
      question: "How often is content updated?",
      answer: "We review and update our directory weekly, removing outdated resources and adding new ones.",
    },
  ];

    return (
  <Box sx={{ bgcolor: "#f9f7f3", py: 10, px: { xs: 2, md: 4 } }}>
    <Box maxWidth="1200px" mx="auto">
      {/* Header */}
      <Box textAlign="center" mb={12}>
        <Typography variant="h3" fontWeight="bold" color="#1a1a1a" gutterBottom>
          Get in Touch
        </Typography>
        <Typography variant="body1" color="text.secondary" maxWidth={620} mx="auto">
          Have questions, suggestions, or want to collaborate? We&apos;d love to hear from you.
        </Typography>
      </Box>

      {/* FAQ section moved here */}
      <Box mb={14}>
        <Paper sx={{ p: { xs: 3, md: 5 }, borderRadius: 3, border: "1px solid #e0ddd8", background: "#fff" }}>
          <Typography variant="h5" fontWeight="bold" textAlign="center" color="#1a1a1a" mb={4}>
            Frequently Asked Questions
          </Typography>
          <Stack spacing={5}>
            {faqs.map((faq, idx) => (
              <Box key={idx}>
                <Typography variant="subtitle1" fontWeight="600" mb={1} color="#1a1a1a">
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

      {/* Contact Info + Form */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={6} alignItems="flex-start">
        {/* Info Section */}
        <Stack spacing={4} flex={1}>
          {infoCards.map((item, idx) => (
            <Paper
              key={idx}
              elevation={3}
              sx={{ p: 3, borderRadius: 3, bgcolor: "#fff", transition: "0.3s", "&:hover": { boxShadow: 6 } }}
            >
              <Stack direction="row" spacing={2} alignItems="center" mb={1}>
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

        {/* Form Section */}
        <Box flex={2}>
          <Paper elevation={4} sx={{ p: { xs: 3, md: 4 }, borderRadius: 3 }}>
            <Typography variant="h5" fontWeight="bold" color="#1a1a1a" mb={3}>
              Send us a Message
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
                  <TextField
                    fullWidth
                    label="Name"
                    id="name"
                    variant="outlined"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    id="email"
                    type="email"
                    variant="outlined"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </Stack>
                <TextField
                  fullWidth
                  label="Subject"
                  id="subject"
                  variant="outlined"
                  value={formData.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  required
                />
                <TextField
                  fullWidth
                  label="Message"
                  id="message"
                  multiline
                  rows={5}
                  variant="outlined"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  required
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
                  endIcon={<PaperAirplaneIcon style={{ width: 20, height: 20 }} />}
                >
                  Send Message
                </Button>
              </Stack>
            </Box>
          </Paper>
        </Box>
      </Stack>
    </Box>
  </Box>
);

}
