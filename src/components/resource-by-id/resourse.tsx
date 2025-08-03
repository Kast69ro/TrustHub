"use client";

import {
  CheckBadgeIcon,
  StarIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Stack,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../shared/hooks/app-dispatch/app-dispatch";
import { getCatalogById } from "@/entities/api/catalog/catalog";
import { Marquee } from "../magicui/marquee";

interface ResourceDetailPageProps {
  id: string;
}

export default function ResourceDetailPage({ id }: ResourceDetailPageProps) {
  const resource = useAppSelector((state) => state.catalog.catalogById);
  const dispatch = useAppDispatch();
  console.log(resource);
  

  useEffect(() => {
    dispatch(getCatalogById(id));
  }, [dispatch, id]);

  if (!resource) {
    return (
      <Box
        sx={{
          bgcolor: "#f9f7f3",
          minHeight: "100vh",
          py: 8,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const trustStars = Number.parseInt(resource.trustLevel) || 0;

  return (
    <>
    <Box sx={{ bgcolor: "#f9f7f3", minHeight: "100vh", py: 8 }}>
      <Box sx={{ maxWidth: "960px", mx: "auto", px: 2 }}>
        <Card elevation={1} sx={{ p: { xs: 3, sm: 6 }, borderRadius: 3 }}>
          <CardContent sx={{ p: 0 }}>
            {/* Заголовок + статус */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ color: "#1a1a1a", fontFamily: "serif" }}
                >
                {resource.title}
              </Typography>
              {resource.isOfficial && (
                  <Tooltip title="Официальный ресурс">
                  <CheckBadgeIcon className="w-6 h-6 text-[#d7c4a3]" />
                </Tooltip>
              )}
            </Box>

            {/* Категория и рейтинг */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 3 }}>
              <Chip
                label={resource.category}
                variant="outlined"
                size="small"
                sx={{
                    borderColor: "#D7C4A3",
                    color: "#000000",
                    bgcolor: "transparent",
                    "&:hover": { bgcolor: "#F5F1E9" },
                }}
                />
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {[...Array(5)].map((_, i) => (
                    <StarIcon
                    key={i}
                    className={`w-5 h-5 ${i < trustStars ? "text-yellow-400" : "text-gray-300"}`}
                    />
                ))}
                <Typography variant="body2" sx={{ ml: 1, color: "gray" }}>
                  ({trustStars}/5 Trust)
                </Typography>
              </Box>
            </Box>

            {/* Краткое описание */}
            <Typography
              variant="body1"
              sx={{ color: "#444", fontSize: "1.05rem", mb: 3 }}
              >
              {resource.description}
            </Typography>

            {/* Полное описание */}
            <Typography
              variant="body1"
              sx={{ color: "#444", fontSize: "1rem", mb: 3 }}
              >
              {resource.fullDescription}
            </Typography>

            {/* Теги */}
            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 4 }}>
              {resource.tags.map((tag) => (
                  <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  sx={{
                      backgroundColor: "#F5F1E9",
                      color: "#000000",
                      "&:hover": { backgroundColor: "#D7C4A3" },
                    }}
                    />
                ))}
            </Stack>

            {/* Кнопка перехода */}
            <Button
              variant="contained"
              component={Link}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<ArrowTopRightOnSquareIcon className="h-5 w-5" />}
              sx={{
                  width: "100%",
                  backgroundColor: "#000000",
                  color: "#FFFFFF",
                  padding: "12px 24px",
                  fontSize: "1rem",
                  textTransform: "none",
                  "&:hover": {
                      backgroundColor: "#333333",
                    },
                }}
                >
              Visit Resource
            </Button>
          </CardContent>
        </Card>
        

     <Marquee pauseOnHover repeat={5}/>
      </Box>
    </Box>
                </>
  );
}
