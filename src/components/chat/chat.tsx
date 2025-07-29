"use client";

import React, { useState } from "react";
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

interface Message {
  id: number;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: 1,
    content:
      "Hello! I'm your TrustHub AI assistant. I can help you find resources, answer questions about our directory, or assist with submissions. What can I help you with today?",
    sender: "assistant",
    timestamp: new Date(),
  },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: messages.length + 1,
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Имитация ответа AI с корректным использованием актуального состояния
    setTimeout(() => {
      setMessages((prevMessages) => {
        const assistantMessage: Message = {
          id: prevMessages.length + 1,
          content: getAIResponse(inputValue),
          sender: "assistant",
          timestamp: new Date(),
        };
        return [...prevMessages, assistantMessage];
      });
      setIsLoading(false);
    }, 1000);
  };

  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    if (input.includes("design") || input.includes("figma") || input.includes("ui")) {
      return "For design resources, I'd recommend checking out Figma, Adobe Creative Suite, or Sketch. Would you like more design resources?";
    }

    if (input.includes("development") || input.includes("code") || input.includes("programming")) {
      return "Great! We have VS Code, GitHub, and many frameworks. Are you looking for a specific language or tool?";
    }

    if (input.includes("productivity") || input.includes("organize") || input.includes("task")) {
      return "For productivity, check out Notion, Todoist, or Slack. What productivity challenges do you have?";
    }

    if (input.includes("submit") || input.includes("add") || input.includes("suggest")) {
      return "To submit a resource, please use our Submit Resource page. Would you like me to guide you through the submission?";
    }

    return "I'm here to help! What resources are you interested in? Design, development, productivity, or something else?";
  };

  return (
    <Box sx={{ bgcolor: "#f9f7f3", minHeight: "100vh", py: 8 }}>
      <Box maxWidth="md" mx="auto" px={2}>
        {/* Заголовок */}
        <Typography
          variant="h4"
          fontWeight="bold"
          align="center"
          mb={2}
          fontFamily="serif"
          color="#1a1a1a"
        >
          AI Assistant
        </Typography>
        <Typography variant="body1" align="center" mb={4} color="text.secondary">
          Get personalized recommendations and instant help finding the right resources.
        </Typography>

        {/* Чат */}
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
                  justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                }}
              >
                <Stack direction="row" spacing={1} alignItems="flex-end" sx={{ maxWidth: "80%" }}>
                  {msg.sender === "assistant" && (
                    <Avatar sx={{ bgcolor: "#f1eadb", color: "#1a1a1a", width: 32, height: 32 }}>
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
                      {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </Typography>
                  </Box>
                  {msg.sender === "user" && (
                    <Avatar sx={{ bgcolor: "#1a1a1a", width: 32, height: 32 }}>
                      <UserIcon style={{ width: 20, height: 20, color: "#fff" }} />
                    </Avatar>
                  )}
                </Stack>
              </Box>
            ))}

            {isLoading && (
              <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Avatar sx={{ bgcolor: "#f1eadb", color: "#1a1a1a", width: 32, height: 32 }}>
                    <BoltIcon style={{ width: 20, height: 20 }} />
                  </Avatar>
                  <CircularProgress size={16} thickness={4} />
                </Stack>
              </Box>
            )}
          </CardContent>

          {/* Ввод сообщения */}
          <Box
            component="form"
            onSubmit={handleSendMessage}
            sx={{ display: "flex", gap: 2, p: 2, bgcolor: "white", borderTop: "1px solid #ddd" }}
          >
            <TextField
              variant="outlined"
              placeholder="Ask me about resources, categories, or how to submit..."
              fullWidth
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
              size="medium"
            />
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading || !inputValue.trim()}
              sx={{ minWidth: 100, display: "flex", alignItems: "center", gap: 1 }}
            >
              Send <PaperAirplaneIcon style={{ width: 20, height: 20 }} />
            </Button>
          </Box>
        </Card>

        {/* Быстрые вопросы */}
        <Box mt={4} textAlign="center">
          <Typography variant="body2" color="text.secondary" mb={2}>
            Quick questions to get started:
          </Typography>
          <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap" gap={1}>
            {[
              "Show me design tools",
              "What are the best productivity apps?",
              "How do I submit a resource?",
              "Find development resources",
            ].map((question) => (
              <Button
                key={question}
                variant="outlined"
                size="small"
                onClick={() => setInputValue(question)}
                sx={{
                  borderColor: "#d7c4a3",
                  color: "#1a1a1a",
                  textTransform: "none",
                  "&:hover": { backgroundColor: "#f1eadb", borderColor: "#bfa974" },
                }}
              >
                {question}
              </Button>
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
