"use client"

import type React from "react"
import { forwardRef, useRef, useState, useEffect, useId } from "react"
import { cn } from "@/lib/utils"
import {
  AcademicCapIcon,
  ChatBubbleBottomCenterTextIcon,
  FolderIcon,
  GlobeAltIcon,
  InboxStackIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline"
import Image from "next/image"
import logo from "@/assets/logo.png"
import { motion } from "framer-motion"

type CircleProps = {
  className?: string
  children?: React.ReactNode
  size?: "sm" | "md" | "lg" | "xl"
}

const Circle = forwardRef<HTMLDivElement, CircleProps>(({ className, children, size = "md" }, ref) => {
  // Responsive size classes for Circle component
  const sizeClasses = {
    sm: "w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20", // Mobile: 64px, SM: 72px, MD: 80px
    md: "w-18 h-18 sm:w-20 sm:h-20 md:w-22 md:h-22 lg:w-24 lg:h-24", // Mobile: 72px -> Desktop: 96px
    lg: "w-20 h-20 sm:w-22 sm:h-22 md:w-24 md:h-24 lg:w-26 lg:h-26 xl:w-28 xl:h-28", // Mobile: 80px -> XL: 112px
    xl: "w-22 h-22 sm:w-24 sm:h-24 md:w-26 md:h-26 lg:w-28 lg:h-28 xl:w-32 xl:h-32", // Mobile: 88px -> XL: 128px
  }
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex items-center justify-center rounded-full border-2 bg-white shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        "transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-[0_0_25px_-10px_rgba(0,0,0,0.9)]",
        "p-2 sm:p-2.5 md:p-3 lg:p-3.5", // Responsive padding
        sizeClasses[size],
        className ?? "",
      )}
    >
      {children}
    </div>
  )
})
Circle.displayName = "Circle"

type AnimatedBeamProps = {
  className?: string
  containerRef: React.RefObject<HTMLDivElement | null>
  fromRef: React.RefObject<HTMLDivElement | null>
  toRef: React.RefObject<HTMLDivElement | null>
  curvature?: number
  reverse?: boolean
  pathColor?: string
  pathWidth?: number
  pathOpacity?: number
  gradientStartColor?: string
  gradientStopColor?: string
  delay?: number
  duration?: number
  startXOffset?: number
  startYOffset?: number
  endXOffset?: number
  endYOffset?: number
}

function AnimatedBeam({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = Math.random() * 3 + 4,
  delay = 0,
  pathColor = "gray",
  pathWidth = 2,
  pathOpacity = 0.2,
  gradientStartColor = "#ffaa40",
  gradientStopColor = "#9c40ff",
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}: AnimatedBeamProps) {
  const id = useId()
  const [pathD, setPathD] = useState<string>("")
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 })

  // Calculate the gradient coordinates based on the reverse prop
  const gradientCoordinates = reverse
    ? {
        x1: ["90%", "-10%"],
        x2: ["100%", "0%"],
        y1: ["0%", "0%"],
        y2: ["0%", "0%"],
      }
    : {
        x1: ["10%", "110%"],
        x2: ["0%", "100%"],
        y1: ["0%", "0%"],
        y2: ["0%", "0%"],
      }

  useEffect(() => {
    const updatePath = () => {
      if (containerRef.current && fromRef.current && toRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect()
        const rectA = fromRef.current.getBoundingClientRect()
        const rectB = toRef.current.getBoundingClientRect()

        const svgWidth = containerRect.width
        const svgHeight = containerRect.height
        setSvgDimensions({ width: svgWidth, height: svgHeight })

        const startX = rectA.left - containerRect.left + rectA.width / 2 + startXOffset
        const startY = rectA.top - containerRect.top + rectA.height / 2 + startYOffset

        const endX = rectB.left - containerRect.left + rectB.width / 2 + endXOffset
        const endY = rectB.top - containerRect.top + rectB.height / 2 + endYOffset

        // Using quadratic Bezier curve (Q) as in magic ui
        const controlY = startY - curvature
        const d = `M ${startX},${startY} Q ${(startX + endX) / 2},${controlY} ${endX},${endY}`
        setPathD(d)
      }
    }

    // Initialize ResizeObserver [^2]
    const resizeObserver = new ResizeObserver((entries) => {
      // For all entries, recalculate the path
      for (const entry of entries) {
        updatePath()
      }
    })

    // Observe the container element
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    // Call the updatePath initially to set the initial path
    updatePath()

    // Clean up the observer on component unmount
    return () => {
      resizeObserver.disconnect()
    }
  }, [containerRef, fromRef, toRef, curvature, startXOffset, startYOffset, endXOffset, endYOffset])

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      xmlns="http://www.w3.org/2000/svg"
      className={cn("pointer-events-none absolute left-0 top-0 transform-gpu stroke-2", className)}
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
    >
      {/* Static path for the base stroke */}
      <path d={pathD} stroke={pathColor} strokeWidth={pathWidth} strokeOpacity={pathOpacity} strokeLinecap="round" />

      {/* Animated path for the gradient */}
      <path d={pathD} strokeWidth={pathWidth} stroke={`url(#${id})`} strokeOpacity="1" strokeLinecap="round" />

      <defs>
        <motion.linearGradient
          className="transform-gpu"
          id={id}
          gradientUnits={"userSpaceOnUse"}
          initial={{
            x1: "0%",
            x2: "0%",
            y1: "0%",
            y2: "0%",
          }}
          animate={{
            x1: gradientCoordinates.x1,
            x2: gradientCoordinates.x2,
            y1: gradientCoordinates.y1,
            y2: gradientCoordinates.y2,
          }}
          transition={{
            delay,
            duration,
            ease: [0.16, 1, 0.3, 1], // https://easings.net/#easeOutExpo
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 0,
          }}
        >
          <stop stopColor={gradientStartColor} stopOpacity="0"></stop>
          <stop stopColor={gradientStartColor}></stop>
          <stop offset="32.5%" stopColor={gradientStopColor}></stop>
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0"></stop>
        </motion.linearGradient>
      </defs>
    </svg>
  )
}

export function AnimatedBeamDemo() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const div1Ref = useRef<HTMLDivElement | null>(null)
  const div2Ref = useRef<HTMLDivElement | null>(null)
  const div3Ref = useRef<HTMLDivElement | null>(null)
  const div4Ref = useRef<HTMLDivElement | null>(null)
  const div5Ref = useRef<HTMLDivElement | null>(null)
  const div6Ref = useRef<HTMLDivElement | null>(null)
  const div7Ref = useRef<HTMLDivElement | null>(null)

  return (
    <div className="w-full py-8 sm:py-12 ">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 ">
        {/* Main Container - Responsive height and padding */}
        <div
          className="relative flex items-center justify-center overflow-hidden  h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] xl:h-[600px] p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12"
          ref={containerRef}
        >
          <div className="flex size-full flex-col items-stretch justify-between gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12">
            {/* Top Row - Responsive spacing */}
            <div className="flex flex-row items-center justify-between  px-2 sm:px-4 md:px-6 lg:px-8">
              <div className="flex flex-col items-center">
                <Circle ref={div1Ref} size="md">
                  <Icons.googleDrive.component />
                </Circle>
                <p className="mt-2 text-center text-gray-600 text-xs sm:text-sm md:text-base">
                  {Icons.googleDrive.label}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <Circle ref={div5Ref} size="md">
                  <Icons.googleDocs.component />
                </Circle>
                <p className="mt-2 text-center text-gray-600 text-xs sm:text-sm md:text-base">
                  {Icons.googleDocs.label}
                </p>
              </div>
            </div>
            {/* Middle Row - Center circle with responsive sizing */}
            <div className="flex flex-row items-center justify-between  px-1 sm:px-2 md:px-4 lg:px-6">
              <div className="flex flex-col items-center">
                <Circle ref={div2Ref} size="md">
                  <Icons.notion.component />
                </Circle>
                <p className="mt-2 text-center text-gray-600 text-xs sm:text-sm md:text-base">{Icons.notion.label}</p>
              </div>
              {/* Central Circle - Responsive sizing */}
              <div className="flex flex-col items-center relative">
                <Circle ref={div4Ref} size="xl" className="relative">
                  <Icons.openai.component />
                  {/* Subtle glow effect for center */}
                  <div className="absolute inset-0 rounded-full opacity-40 animate-pulse -z-10"></div>
                </Circle>
                <p className="mt-2 text-center text-gray-600 text-xs sm:text-sm md:text-base">{Icons.openai.label}</p>
              </div>
              <div className="flex flex-col items-center">
                <Circle ref={div6Ref} size="md">
                  <Icons.zapier.component />
                </Circle>
                <p className="mt-2 text-center text-gray-600 text-xs sm:text-sm md:text-base">{Icons.zapier.label}</p>
              </div>
            </div>
            {/* Bottom Row */}
            <div className="flex flex-row items-center justify-between  px-2 sm:px-4 md:px-6 lg:px-8">
              <div className="flex flex-col items-center">
                <Circle ref={div3Ref} size="md">
                  <Icons.whatsapp.component />
                </Circle>
                <p className="mt-2 text-center text-gray-600 text-xs sm:text-sm md:text-base">{Icons.whatsapp.label}</p>
              </div>
              <div className="flex flex-col items-center">
                <Circle ref={div7Ref} size="md">
                  <Icons.messenger.component />
                </Circle>
                <p className="mt-2 text-center text-gray-600 text-xs sm:text-sm md:text-base">
                  {Icons.messenger.label}
                </p>
              </div>
            </div>
          </div>

          {/* Animated Beams - All connections to center */}
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div1Ref}
            toRef={div4Ref}
            curvature={-75}
            endYOffset={-10}
          />
          <AnimatedBeam containerRef={containerRef} fromRef={div2Ref} toRef={div4Ref} />
          <AnimatedBeam containerRef={containerRef} fromRef={div3Ref} toRef={div4Ref} curvature={75} endYOffset={10} />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div5Ref}
            toRef={div4Ref}
            curvature={-75}
            endYOffset={-10}
            reverse
          />
          <AnimatedBeam containerRef={containerRef} fromRef={div6Ref} toRef={div4Ref} reverse />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div7Ref}
            toRef={div4Ref}
            curvature={75}
            endYOffset={10}
            reverse
          />
        </div>
      </div>
    </div>
  )
}

const Icons = {
  notion: {
    component: () => (
      <InboxStackIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-gray-700 hover:text-orange-500 transition-colors" />
    ),
    label: "Knowledge Base",
  },
  openai: {
    component: () => <Image src={logo || "/placeholder.svg"} alt="OpenAI logo" width={100} height={100} />,
    label: "TrustHub",
  },
  googleDrive: {
    component: () => (
      <FolderIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-green-600 hover:text-green-800 transition-colors" />
    ),
    label: "File Storage",
  },
  whatsapp: {
    component: () => (
      <SparklesIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-yellow-500 hover:text-yellow-600 transition-colors" />
    ),
    label: "Community",
  },
  googleDocs: {
    component: () => (
      <ShieldCheckIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-blue-600 hover:text-blue-800 transition-colors" />
    ),
    label: "Verified Content",
  },
  zapier: {
    component: () => (
      <AcademicCapIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-indigo-600 hover:text-indigo-800 transition-colors" />
    ),
    label: "Education",
  },
  messenger: {
    component: () => (
      <GlobeAltIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-cyan-600 hover:text-cyan-800 transition-colors" />
    ),
    label: "Multilingual",
  },
}
