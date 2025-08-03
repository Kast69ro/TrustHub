"use client";

import React, { useEffect, useState, useTransition } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Chip,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  MagnifyingGlassIcon,
  ShieldCheckIcon,
  StarIcon,
  ArrowTopRightOnSquareIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import {
  useAppDispatch,
  useAppSelector,
} from "@/components/shared/hooks/app-dispatch/app-dispatch";
import { getCatalog } from "@/entities/api/catalog/catalog";
import { grey } from "@mui/material/colors";
import { useTranslations } from "next-intl";
import Link from "next/link";
const categories = [
  "All",
  "Design",
  "Development",
  "Documentation",
  "Education",
  "Security",
  "Marketing",
  "Business",
  "Technology",
  "Video",
  "Utilities"
];


export default function CatalogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const resources = useAppSelector((state) => state.catalog.catalog);
  const dispatch = useAppDispatch();

  const t = useTranslations('catalog')
  

  useEffect(() => {
    dispatch(
      getCatalog({
        category: selectedCategory === "All" ? undefined : selectedCategory,
        searchTerm: searchTerm || undefined,
      })
    );
  }, [dispatch, selectedCategory, searchTerm]);

  const handleMoreClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const visibleCategories =
    categories.length > 5 ? categories.slice(0, 5) : categories;

  return (
    <Box sx={{ bgcolor: "#f6f1e7", minHeight: "100vh", py: 8 }}>
      <Box maxWidth="xl" mx="auto" px={{ xs: 2, sm: 4, md: 8 }}>
        <Box mb={6}>
          <Typography
            variant="h3"
            fontFamily="serif"
            fontWeight="bold"
            color="#1a1a1a"
            mb={1}
          >
            {t('title')}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {t('about')}
          </Typography>
        </Box>

        <Box
          bgcolor="white"
          borderRadius={2}
          boxShadow={1}
          p={3}
          mb={6}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder={t('search')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#ccc", 
                },
                "&:hover fieldset": {
                  borderColor: "#bba77c", 
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#d7c4a3", 
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MagnifyingGlassIcon
                    style={{ width: 20, height: 20, color: "#000" }}
                  />
                </InputAdornment>
              ),
            }}
          />

          <Stack direction="row" spacing={1} flexWrap="wrap">
            {visibleCategories.map((category) => (
              <Button
                key={category}
                variant={
                  selectedCategory === category ? "contained" : "outlined"
                }
                onClick={() => setSelectedCategory(category)}
                sx={{
                  textTransform: "none",
                  borderColor: "#d7c4a3",
                  color: selectedCategory === category ? "white" : "#1a1a1a",
                  backgroundColor:
                    selectedCategory === category ? grey[800] : "transparent",
                  "&:hover": {
                    bgcolor:
                      selectedCategory === category ? grey[900] : "#f1eadb",
                    borderColor:
                      selectedCategory === category ? grey[900] : "#d7c4a3",
                  },
                }}
              >
                {category}
              </Button>
            ))}

            {categories.length > 5 && (
              <>
                <IconButton onClick={handleMoreClick} size="small">
                  <EllipsisHorizontalIcon
                    style={{ width: 24, height: 24, color: "#1a1a1a" }}
                  />
                </IconButton>
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                  {categories.slice(5).map((category) => (
                    <MenuItem
                      key={category}
                      selected={selectedCategory === category}
                      onClick={() => {
                        setSelectedCategory(category);
                        handleClose();
                      }}
                    >
                      {category}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
          </Stack>
        </Box>

        <Typography color="text.secondary" mb={3}>
          {t('showing')} {resources.length} {t('resource')}
        </Typography>

        <Box
          display="grid"
          gridTemplateColumns={{
            xs: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={3}
        >
          {resources.map((resource) => (
            <Link key={resource.id} href={`/catalog/${resource.id}`}>
            
            <Card
              key={resource.id}
              variant="outlined"
              sx={{
                borderRadius: 4,
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                border: "1px solid #f1eadb",
                transition: "transform 0.2s ease",
                display: "flex",
                flexDirection: "column",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 6px 30px rgba(0,0,0,0.08)",
                },
                background: "#fffdf8",
                height: "100%",
              }}
            >
              <CardHeader
                title={
                  <Box
                    display="flex"
                    alignItems="center"
                    sx={{ padding: "10px" }}
                    gap={1}
                  >
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      sx={{
                        color: "#1a1a1a",
                        fontSize: 18,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {resource.title}
                    </Typography>
                    {resource.isOfficial && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                          backgroundColor: "#fff8e1",
                          color: "#8d6e63",
                          borderRadius: 2,
                          px: 1,
                          py: 0.3,
                        }}
                      >
                        <ShieldCheckIcon style={{ width: 16, height: 16 }} />
                        <Typography variant="caption" fontWeight={500}>
                          Verified
                        </Typography>
                      </Box>
                    )}
                  </Box>
                }
                subheader={
                  <Box display="flex" alignItems="center" gap={2}>
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <StarIcon
                        style={{ width: 18, height: 18, color: "#facc15" }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {resource.trustLevel}
                      </Typography>
                    </Box>
                    <Chip
                      label={resource.category}
                      size="small"
                      sx={{
                        backgroundColor: "#f1eadb",
                        color: "#333",
                        fontSize: 11,
                        px: 1,
                        height: 22,
                        borderRadius: 1,
                      }}
                    />
                  </Box>
                }
                sx={{ pb: 0 }}
              />

              <CardContent
                sx={{
                  pt: 1,
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 2,
                    whiteSpace: "normal",
                    overflow: "visible",
                    textOverflow: "unset",
                    display: "block",
                    maxHeight: "none",
                    flexGrow: 1,
                  }}
                >
                  {resource.description}
                </Typography>

                <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
                  {resource.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      sx={{
                        bgcolor: "#f9f7f3",
                        color: "#5a5a5a",
                        fontSize: 11,
                        borderRadius: 1,
                      }}
                    />
                  ))}
                </Stack>

                <Box mt="auto">
                  {" "}
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => window.open(resource.url, "_blank")}
                    sx={{
                      textTransform: "none",
                      borderRadius: 2,
                      bgcolor: "#1a1a1a",
                      color: "#fff",
                      "&:hover": {
                        bgcolor: "#333",
                      },
                    }}
                    endIcon={
                      <ArrowTopRightOnSquareIcon
                        style={{ width: 18, height: 18 }}
                      />
                    }
                  >
                    Visit Web site
                  </Button>
                </Box>
              </CardContent>
            </Card>
             </Link> 
          ))}
        </Box>

        {resources.length === 0 && (
          <Box textAlign="center" py={6}>
            <Typography color="text.secondary" variant="h6" mb={2}>
              No resources found matching your criteria.
            </Typography>
            <Button
              variant="outlined"
              sx={{
                borderColor: "#d7c4a3",
                color: "#1a1a1a",
                "&:hover": { bgcolor: "#f1eadb" },
                textTransform: "none",
              }}
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
            >
              Clear Filters
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
