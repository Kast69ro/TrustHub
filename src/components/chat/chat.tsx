"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  Avatar,
  Stack,
  CircularProgress,
} from "@mui/material";

import {
  UserIcon,
  BoltIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

import { getAIChatResponseWithHistory } from "@/entities/api/ai-assistent/ai";
import { useTranslations } from "next-intl";

interface Message {
  id: number;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

interface ChatMessage {
  sender: "user" | "assistant";
  content: string;
}

export default function ChatPage() {
  const t = useTranslations("chat");

  const inputRef = useRef<HTMLInputElement>(null); 
  const messagesEndRef = useRef<HTMLDivElement>(null); 

  const initialMessages: Message[] = [
    {
      id: 1,
      content: t("content"),
      sender: "assistant",
      timestamp: new Date(),
    },
  ];

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus();
    }
  }, [isLoading]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toChatMessages = (msgs: Message[]): ChatMessage[] =>
    msgs.map((m) => ({
      sender: m.sender,
      content: m.content,
    }));

  const handleSendMessage = async (e: React.FormEvent | string) => {
    if (typeof e !== "string") {
      e.preventDefault();
    }

    const messageToSend = typeof e === "string" ? e : inputValue;

    if (!messageToSend.trim() || isLoading) return;

    const userMessage: Message = {
      id: messages.length + 1,
      content: messageToSend,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const aiText = await getAIChatResponseWithHistory(
        toChatMessages([...messages, userMessage])
      );

      const assistantMessage: Message = {
        id: messages.length + 2,
        content: aiText,
        sender: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: messages.length + 2,
          content: t("error") || "Something went wrong. Please try again later.",
          sender: "assistant",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

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

  const quickQuestionsKeys = ["one", "two", "three", "four"];

  return (
    <Box sx={{ bgcolor: "#f9f7f3", minHeight: "100vh", py: 8 }}>
      <Box maxWidth="md" mx="auto" px={2}>
        <Typography
          variant="h4"
          fontWeight="bold"
          align="center"
          mb={2}
          fontFamily="serif"
          color="#1a1a1a"
        >
          {t("title")}
        </Typography>
        <Typography variant="body1" align="center" mb={4} color="text.secondary">
          {t("about")}
        </Typography>

        <Card sx={{ display: "flex", flexDirection: "column", height: 600 }}>
          <CardContent
            sx={{
              flexGrow: 1,
              overflowY: "auto",
              px: 3,
              py: 2,
              bgcolor: "white",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {messages.map((msg) => (
              <Box
                key={msg.id}
                sx={{
                  display: "flex",
                  justifyContent:
                    msg.sender === "user" ? "flex-end" : "flex-start",
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="flex-end"
                  sx={{ maxWidth: "80%" }}
                >
                  {msg.sender === "assistant" && (
                    <Avatar
                      sx={{
                        bgcolor: "#f1eadb",
                        color: "#1a1a1a",
                        width: 32,
                        height: 32,
                      }}
                    >
                      <BoltIcon style={{ width: 20, height: 20 }} />
                    </Avatar>
                  )}
                  <Box
                    sx={{
                      bgcolor: msg.sender === "user" ? "#1a1a1a" : "#f1eadb",
                      color: msg.sender === "user" ? "#fff" : "#1a1a1a",
                      borderRadius: 2,
                      p: 2,
                      position: "relative",
                    }}
                  >
                    <Typography variant="body2" sx={{ wordWrap: "break-word" }}>
                      {msg.content}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        position: "absolute",
                        bottom: 2,
                        right: 8,
                        fontSize: 10,
                        color:
                          msg.sender === "user"
                            ? "rgba(255,255,255,0.6)"
                            : "rgba(0,0,0,0.5)",
                      }}
                    >
                      {msg.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Typography>
                  </Box>
                  {msg.sender === "user" && (
                    <Avatar sx={{ bgcolor: "#1a1a1a", width: 32, height: 32 }}>
                      <UserIcon
                        style={{ width: 20, height: 20, color: "#fff" }}
                      />
                    </Avatar>
                  )}
                </Stack>
              </Box>
            ))}

            {isLoading && (
              <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Avatar
                    sx={{
                      bgcolor: "#f1eadb",
                      color: "#1a1a1a",
                      width: 32,
                      height: 32,
                    }}
                  >
                    <BoltIcon style={{ width: 20, height: 20 }} />
                  </Avatar>
                  <CircularProgress size={16} thickness={4} />
                </Stack>
              </Box>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          <Box
            component="form"
            onSubmit={handleSendMessage}
            sx={{
              display: "flex",
              gap: 1,
              p: { xs: 1, md: 2 },
              bgcolor: "white",
              borderTop: "1px solid #ddd",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TextField
              variant="outlined"
              placeholder={t("input")}
              fullWidth
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
              size="medium"
              sx={textFieldSx}
              inputRef={inputRef}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading || !inputValue.trim()}
              sx={{
                minWidth: 100,
                display: "flex",
                alignItems: "center",
                gap: 1,
                bgcolor: "#1a1a1a",
                color: "#f9f7f3",
                py: 1.5,
                fontWeight: "bold",
                "&:hover": {
                  bgcolor: "#333",
                },
                flexShrink: 0,
                height: "56px",
              }}
            >
              {t("button")} <PaperAirplaneIcon style={{ width: 20, height: 20 }} />
            </Button>
          </Box>
        </Card>

        <Box mt={4} textAlign="center">
          <Typography variant="body2" color="text.secondary" mb={2}>
            {t("quick")}
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            flexWrap="wrap"
            gap={1}
          >
            {quickQuestionsKeys.map((key) => {
              const question = t(key);
              return (
                <Button
                  key={key}
                  variant="outlined"
                  size="small"
                  onClick={() => handleSendMessage(question)}
                  sx={{
                    borderColor: "#d7c4a3",
                    color: "#1a1a1a",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#f1eadb",
                      borderColor: "#bfa974",
                    },
                  }}
                >
                  {question}
                </Button>
              );
            })}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
