import Link from "next/link";
import Image from "next/image";
import {
  Box,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import {
  ShieldCheckIcon,
  SparklesIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import foto from "@/assets/about.png";
import { getTranslations } from "next-intl/server";

export default async function AboutUsPage() {
  const t = await getTranslations("about");

  const black = "#000000";
  const white = "#FFFFFF";
  const beige = "#D7C4A3";
  const bgColor = "#f1eadb";

  const steps = [
    {
      title: t("section-4-card-1-title"),
      description: t("section-4-card-1-about"),
    },
    {
      title: t("section-4-card-2-title"),
      description: t("section-4-card-2-about"),
    },
    {
      title: t("section-4-card-3-title"),
      description: t("section-4-card-3-about"),
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        background: bgColor,
        color: black,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box component="main" sx={{ flex: 1 }}>
        {/* Hero Section */}
        <Box
          component="section"
          sx={{
            py: { xs: 10, md: 17, lg: 20, xl: 25 },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            backgroundColor: bgColor,
          }}
        >
          <Container
            sx={{
              position: "relative",
              zIndex: 1,
              px: { xs: 4, md: 6 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Typography
                component="h1"
                variant="h2"
                fontWeight="bold"
                sx={{
                  textShadow: "0 1px 2px rgba(0,0,0,0.1)",
                  fontSize: {
                    xs: "2.25rem",
                    sm: "3rem",
                    md: "3.75rem",
                    lg: "4.5rem",
                  },
                  letterSpacing: "-0.025em",
                  color: black,
                }}
              >
                {t("title")}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  maxWidth: 800,
                  color: black,
                  fontWeight: 400,
                  lineHeight: 1.6,
                  mx: "auto",
                }}
              >
                {t("about")}
              </Typography>
              <Link href="/contact">
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    mt: 3,
                    px: 8,
                    py: 1.5,
                    borderRadius: "9999px",
                    boxShadow: 4,
                    bgcolor: beige,
                    color: black,
                    "&:hover": {
                      bgcolor: black,
                      color: white,
                      boxShadow: 6,
                    },
                  }}
                >
                  {t("title-button")}
                </Button>
              </Link>
            </Box>
          </Container>
        </Box>

        {/* Who We Are Section */}
        <Box
          component="section"
          sx={{ py: { xs: 12, md: 24, lg: 32 }, backgroundColor: white }}
        >
          <Container sx={{ px: { xs: 4, md: 6 } }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column-reverse", md: "row-reverse" },
                alignItems: "center",
                justifyContent: "space-between",
                gap: 6,
              }}
            >
              {/* Text */}
              <Box
                sx={{
                  flex: 1,
                  maxWidth: { md: "50%" },
                }}
              >
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ color: black, mb: 2 }}
                >
                  {t("section-2-title")}
                </Typography>
                <Typography
                  variant="body1"
                  color={black}
                  paragraph
                  sx={{ lineHeight: 1.7, fontSize: { xs: 16, md: 18 } }}
                >
                  {t("section-2-about")}
                </Typography>
                <Typography
                  variant="body1"
                  color={black}
                  paragraph
                  sx={{ lineHeight: 1.7, fontSize: { xs: 16, md: 21 } }}
                >
                  {t("section-2-about-2")}
                </Typography>
              </Box>

              {/* Image */}
              <Box
                sx={{
                  flex: 1,
                  maxWidth: { md: "50%" },
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  "& img": {
                    width: "100%",
                    height: "auto",
                    transition: "transform 0.5s ease",
                  },
                  "&:hover img": {
                    transform: "scale(1.03)",
                  },
                }}
              >
                <Image
                  src={foto}
                  alt="Who We Are"
                  width={800}
                  height={500}
                  style={{ display: "block" }}
                />
              </Box>
            </Box>
          </Container>
        </Box>

        {/* Our Values */}
        <Box
          component="section"
          sx={{ py: { xs: 12, md: 24, lg: 30 }, backgroundColor: bgColor }}
        >
          <Container sx={{ px: { xs: 4, md: 6 }, textAlign: "center" }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              mb={6}
              sx={{ color: black }}
            >
              {t("section-3-title")}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 4,
              }}
            >
              {[1, 2, 3].map((val, i) => {
                const Icon =
                  val === 1
                    ? ShieldCheckIcon
                    : val === 2
                    ? SparklesIcon
                    : LightBulbIcon;
                return (
                  <Card
                    key={i}
                    sx={{
                      width: {
                        xs: "100%",
                        sm: "calc(50% - 16px)",
                        lg: "calc(33.333% - 22px)",
                      },
                      p: 4,
                      borderRadius: 3,
                      boxShadow: 4,
                      textAlign: "center",
                      cursor: "default",
                      "&:hover": { boxShadow: 6 },
                    }}
                  >
                    <CardHeader
                      title={
                        <Icon
                          style={{
                            width: 48,
                            height: 48,
                            color: beige,
                            marginBottom: 16,
                            marginInline: "auto",
                          }}
                        />
                      }
                    />
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {t(`section-3-card-${val}-title`)}
                      </Typography>
                      <Typography variant="body2" color={black}>
                        {t(`section-3-card-${val}-about`)}
                      </Typography>
                    </CardContent>
                  </Card>
                );
              })}
            </Box>
          </Container>
        </Box>

        {/* How We Check Resources */}
        <Box
          component="section"
          sx={{
            py: { xs: 12, md: 24, lg: 32 },
            px: { xs: 4, md: 6 },
            backgroundColor: white,
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            mb={8}
            sx={{ color: "black" }}
          >
            {t("section-4-title")}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 3,
              flexWrap: "wrap",
            }}
          >
            {steps.map((step, i) => (
              <Box key={i} sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    width: 400,
                    backgroundColor: white,
                    border: `1px solid ${bgColor}`,
                    borderRadius: 3,
                    p: 8,
                    textAlign: "center",
                    boxShadow: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      mb: 2,
                      borderRadius: "50%",
                      bgcolor: beige,
                      color: black,
                      fontWeight: "bold",
                      fontSize: "1.75rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      userSelect: "none",
                    }}
                  >
                    {i + 1}
                  </Box>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    mb={1}
                    sx={{ color: black }}
                  >
                    {step.title}
                  </Typography>
                  <Typography color={black} sx={{ fontSize: 14 }}>
                    {step.description}
                  </Typography>
                </Box>
                {i < steps.length - 1 && (
                  <ArrowRightIcon
                    style={{
                      width: 40,
                      height: 40,
                      color: beige,
                      marginLeft: 20,
                      marginRight: 20,
                      flexShrink: 0,
                    }}
                  />
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
