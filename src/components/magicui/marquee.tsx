"use client";

import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useAppSelector } from "../shared/hooks/app-dispatch/app-dispatch";
import Link from "next/link";

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  vertical?: boolean;
  repeat?: number;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  url: string;
  category: string;
  tags: string[];
  isOfficial: boolean;
  trusted?: boolean;
  trustLevel?: number;
}

const Card = styled(Box)(() => ({
  backgroundColor: "#fff",
  borderRadius: "1.5rem",
  padding: "1.5rem 2rem",
  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
  minWidth: "340px",
  maxWidth: "340px",
  height: "340px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  textAlign: "left",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
  },
}));

const Tag = styled(Box)(() => ({
  backgroundColor: "#efeae2",
  color: "#444",
  fontSize: "12px",
  borderRadius: "0px",
  padding: "4px 12px",
  whiteSpace: "nowrap",
}));

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = true,
  vertical = false,
  repeat = 1,
  ...props
}: MarqueeProps) {
  const resources = useAppSelector((state) => state.catalog.catalog) || [];
  

  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2 [--duration:80s] [--gap:1.5rem]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
              "animate-marquee flex-row": !vertical,
              "animate-marquee-vertical flex-col": vertical,
            })}
            style={{
              animationDirection: reverse ? "reverse" : "normal",
              animationPlayState: pauseOnHover ? undefined : "running",
            }}
            onMouseEnter={(e) => {
              if (pauseOnHover)
                e.currentTarget.style.animationPlayState = "paused";
            }}
            onMouseLeave={(e) => {
              if (pauseOnHover)
                e.currentTarget.style.animationPlayState = "running";
            }}
          >
            {resources.map((res) => (
              <Link
                key={res.id}
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mx-3"
              >
                <Card>
                  <Box
                  gap={5}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={1}
                  >
                    <Typography variant="h6" fontWeight={700}>
                      {res.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontWeight: 600, border:'1px solid #d7c4a3',borderRadius:'10px', padding:'5px' }}
                    >
                      {res.category}
                    </Typography>
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{
                      flexGrow: 1,
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 5,
                      WebkitBoxOrient: "vertical",
                      mb: 2,
                      fontSize: "0.9rem",
                      lineHeight: 1.3,
                    }}
                  >
                    {res.description}
                  </Typography>

                  <Box
                    display="flex"
                    gap={1.5}
                    flexWrap="wrap"
                    justifyContent="flex-start"
                  >
                    {res.tags?.slice(0, 4).map((tag, idx) => (
                      <Tag sx={{borderRadius:'10px', border:'1px solid #d7c4a3'}} key={idx}>{tag}</Tag>
                    ))}
                  </Box>
                </Card>
              </Link>
            ))}
          </div>
        ))}
    </div>
  );
}
