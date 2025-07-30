"use client"

import type React from "react"
import { forwardRef, useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import {
  AcademicCapIcon,
  ChatBubbleBottomCenterTextIcon,
  GlobeAltIcon,
  InboxStackIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline"

// Responsive icon styles
const getIconBaseStyle = (size: "sm" | "md" | "lg" = "md") => {
  const sizes = {
    sm: { width: 20, height: 20 },
    md: { width: 28, height: 28 },
    lg: { width: 32, height: 32 },
  }

  return {
    ...sizes[size],
    strokeWidth: 1.5,
    stroke: "currentColor",
    style: { verticalAlign: "middle" },
  }
}

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
  containerRef: React.RefObject<HTMLDivElement | null>
  fromRef: React.RefObject<HTMLDivElement | null>
  toRef: React.RefObject<HTMLDivElement | null>
  curvature?: number
  endYOffset?: number
  reverse?: boolean
}

function AnimatedBeam({
  containerRef,
  fromRef,
  toRef,
  curvature = 50,
  endYOffset = 0,
  reverse = false,
}: AnimatedBeamProps) {
  const [pathD, setPathD] = useState<string>("")
  const [strokeWidth, setStrokeWidth] = useState<number>(2.5)

  useEffect(() => {
    function updatePath() {
      if (!containerRef.current || !fromRef.current || !toRef.current) {
        setPathD("")
        return
      }

      // Responsive stroke width based on screen size
      const screenWidth = window.innerWidth
      if (screenWidth < 640) {
        setStrokeWidth(1.5) // Mobile
      } else if (screenWidth < 1024) {
        setStrokeWidth(2) // Tablet
      } else {
        setStrokeWidth(2.5) // Desktop
      }

      const containerRect = containerRef.current.getBoundingClientRect()
      const fromRect = fromRef.current.getBoundingClientRect()
      const toRect = toRef.current.getBoundingClientRect()

      const startX = fromRect.left - containerRect.left + fromRect.width / 2
      const startY = fromRect.top - containerRect.top + fromRect.height / 2
      const endX = toRect.left - containerRect.left + toRect.width / 2
      const endY = toRect.top - containerRect.top + toRect.height / 2 + endYOffset

      const direction = reverse ? -1 : 1
      const deltaX = endX - startX
      const deltaY = endY - startY

      // Responsive curvature adjustment
      const responsiveCurvature = screenWidth < 640 ? curvature * 0.6 : curvature

      const controlPointX1 = startX + deltaX * 0.3
      const controlPointY1 = startY + deltaY * 0.1 + responsiveCurvature
      const controlPointX2 = startX + deltaX * 0.7
      const controlPointY2 = startY + deltaY * 0.9 + responsiveCurvature

      const d = `M ${startX},${startY} C ${controlPointX1},${controlPointY1} ${controlPointX2},${controlPointY2} ${endX},${endY}`
      setPathD(d)
    }

    updatePath()
    window.addEventListener("resize", updatePath)

    return () => {
      window.removeEventListener("resize", updatePath)
    }
  }, [containerRef, fromRef, toRef, curvature, endYOffset, reverse])

  if (!pathD) return null

  return (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      <path
        d={pathD}
        stroke="#1e40af"
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="opacity-70 sm:opacity-80 lg:opacity-90" // Responsive opacity
      />
    </svg>
  )
}

export function ResponsiveAnimatedBeamDemo() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const div1Ref = useRef<HTMLDivElement | null>(null)
  const div2Ref = useRef<HTMLDivElement | null>(null)
  const div3Ref = useRef<HTMLDivElement | null>(null)
  const div4Ref = useRef<HTMLDivElement | null>(null)
  const div5Ref = useRef<HTMLDivElement | null>(null)
  const div6Ref = useRef<HTMLDivElement | null>(null)
  const div7Ref = useRef<HTMLDivElement | null>(null)

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-gray-100 py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Connected Ecosystem</h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Seamlessly integrated tools and platforms working together
          </p>
        </div>

        {/* Main Container - Responsive height and padding */}
        <div
          className="relative flex items-center justify-center overflow-hidden
                     h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] xl:h-[550px]
                     p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12"
          ref={containerRef}
        >
          <div
            className="flex size-full flex-col items-stretch justify-between 
                         gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12"
          >
            {/* Top Row - Responsive spacing */}
            <div
              className="flex flex-row items-center justify-between 
                           px-2 sm:px-4 md:px-6 lg:px-8"
            >
              <Circle ref={div1Ref} size="md">
                <Icons.googleDrive />
              </Circle>
              <Circle ref={div5Ref} size="md">
                <Icons.googleDocs />
              </Circle>
            </div>

            {/* Middle Row - Center circle with responsive sizing */}
            <div
              className="flex flex-row items-center justify-between 
                           px-1 sm:px-2 md:px-4 lg:px-6"
            >
              <Circle ref={div2Ref} size="md">
                <Icons.notion />
              </Circle>

              {/* Central Circle - Responsive sizing */}
              <Circle ref={div4Ref} size="xl" className="relative">
                <Icons.openai />
                {/* Subtle glow effect for center */}
                <div className="absolute inset-0 rounded-full bg-blue-100 opacity-20 animate-pulse -z-10"></div>
              </Circle>

              <Circle ref={div6Ref} size="md">
                <Icons.zapier />
              </Circle>
            </div>

            {/* Bottom Row */}
            <div
              className="flex flex-row items-center justify-between 
                           px-2 sm:px-4 md:px-6 lg:px-8"
            >
              <Circle ref={div3Ref} size="md">
                <Icons.whatsapp />
              </Circle>
              <Circle ref={div7Ref} size="md">
                <Icons.messenger />
              </Circle>
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

        {/* Footer Info */}
        <div className="text-center mt-8 sm:mt-12">
          <p className="text-gray-500 text-sm sm:text-base">Hover over the circles to see interactive effects</p>
        </div>
      </div>
    </div>
  )
}

// Responsive Icons with dynamic sizing
const Icons = {
  notion: () => (
    <InboxStackIcon
      {...getIconBaseStyle("md")}
      className="text-gray-700 hover:text-orange-500 transition-colors w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8"
    />
  ),
  openai: () => (
    <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 relative">
      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-xs sm:text-sm md:text-base lg:text-lg">AI</span>
      </div>
    </div>
  ),
  googleDrive: () => (
    <ChatBubbleBottomCenterTextIcon className="text-green-600 hover:text-green-800 transition-colors w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
  ),
  whatsapp: () => (
    <SparklesIcon className="text-yellow-500 hover:text-yellow-600 transition-colors w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
  ),
  googleDocs: () => (
    <ShieldCheckIcon className="text-blue-600 hover:text-blue-800 transition-colors w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
  ),
  zapier: () => (
    <AcademicCapIcon className="text-indigo-600 hover:text-indigo-800 transition-colors w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
  ),
  messenger: () => (
    <GlobeAltIcon className="text-cyan-600 hover:text-cyan-800 transition-colors w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
  ),
}
