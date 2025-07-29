"use client"

import React, { useState } from "react"
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  Stack,
  Divider,
} from "@mui/material"

import {
  EnvelopeIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ClockIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline"
import { toast } from "sonner"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

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
    } catch (error) {
      toast.error("Неожиданная ошибка");
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Box
      sx={{
        bgcolor: "#f9f7f3",
        minHeight: "100vh",
        py: 8,
        px: { xs: 2, md: 4 },
      }}
    >
      <Box maxWidth="1200px" mx="auto">
        <Box textAlign="center" mb={10}>
          <Typography
            variant="h3"
            component="h1"
            fontFamily="serif"
            fontWeight="bold"
            color="#1a1a1a"
            gutterBottom
          >
            Get in Touch
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            maxWidth={600}
            mx="auto"
          >
            Have questions, suggestions, or want to collaborate? We&apos;d love to
            hear from you.
          </Typography>
        </Box>

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={6}
          alignItems="flex-start"
        >
          <Stack spacing={4} flex={1}>
            {[{
              icon: (
                <EnvelopeIcon
                  style={{ width: 28, height: 28, color: "#1a1a1a" }}
                />
              ),
              title: "Email Us",
              subtitle: "hello@trusthub.com",
              description: "For general inquiries, partnerships, or support questions.",
            }, {
              icon: (
                <ChatBubbleOvalLeftEllipsisIcon
                  style={{ width: 28, height: 28, color: "#1a1a1a" }}
                />
              ),
              title: "Live Chat",
              subtitle: "Available 9 AM - 5 PM EST",
              description: "Get instant help with our AI assistant or connect with our team.",
            }, {
              icon: (
                <ClockIcon style={{ width: 28, height: 28, color: "#1a1a1a" }} />
              ),
              title: "Response Time",
              subtitle: "Within 24 hours",
              description:
                "We typically respond to all inquiries within one business day.",
            }].map(({ icon, title, subtitle, description }, idx) => (
              <Card key={idx} sx={{ boxShadow: 2, borderRadius: 2 }}>
                <CardContent>
                  <Stack direction="row" spacing={3} alignItems="center" mb={2}>
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
                      {icon}
                    </Box>
                    <Box>
                      <Typography variant="h6" fontWeight="600" color="#1a1a1a">
                        {title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {subtitle}
                      </Typography>
                    </Box>
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    {description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>

          {/* Contact Form */}
          <Stack flex={2} spacing={2}>
            <Card sx={{ boxShadow: 3, borderRadius: 2, padding: "8px" }}>
              <CardHeader
                title={
                  <Typography variant="h5" fontWeight="bold" color="#1a1a1a">
                    Send us a Message
                  </Typography>
                }
              />
              <Divider />
              <CardContent>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <Stack spacing={3}>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
                      <TextField
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        size="medium"
                      />
                      <TextField
                        required
                        fullWidth
                        type="email"
                        id="email"
                        label="Email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        size="medium"
                      />
                    </Stack>

                    <TextField
                      required
                      fullWidth
                      id="subject"
                      label="Subject"
                      placeholder="What&apos;s this about?"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      size="medium"
                    />

                    <TextField
                      required
                      fullWidth
                      multiline
                      minRows={5}
                      id="message"
                      label="Message"
                      placeholder="Tell us more about your inquiry..."
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      size="medium"
                    />

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{
                        mt: 2,
                        bgcolor: "#1a1a1a",
                        height: 48,
                        "&:hover": { bgcolor: "#333" },
                      }}
                      endIcon={<PaperAirplaneIcon style={{ width: 20, height: 20 }} />}
                    >
                      Send Message
                    </Button>
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          </Stack>
        </Stack>

        <Box mt={12}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardHeader
              title={
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  color="#1a1a1a"
                  align="center"
                >
                  Frequently Asked Questions
                </Typography>
              }
            />
            <Divider />
            <CardContent>
              <Stack spacing={6}>
                {[{
                  question: "How do you verify resources?",
                  answer:
                    "Our team manually reviews each submission, checking functionality, legitimacy, and value before approval.",
                }, {
                  question: "Can I suggest a resource?",
                  answer:
                    "Use our Submit Resource page to suggest new tools and services for the community.",
                }, {
                  question: "Is TrustHub free to use?",
                  answer:
                    "Yes, TrustHub is completely free for all users. We believe in open access to quality resources.",
                }, {
                  question: "How often is content updated?",
                  answer:
                    "We review and update our directory weekly, removing outdated resources and adding new ones.",
                }].map(({ question, answer }, idx) => (
                  <Box key={idx}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="600"
                      mb={1}
                      color="#1a1a1a"
                    >
                      {question}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {answer}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  )
}
