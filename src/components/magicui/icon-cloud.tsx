"use client"

import React, { useEffect, useRef, useState, useMemo, useCallback } from "react"
import { renderToString } from "react-dom/server"

interface Icon {
  x: number
  y: number
  z: number
  scale: number
  opacity: number
  id: number
}

interface IconCloudProps {
  icons?: React.ReactNode[]
  images?: string[]
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

export function IconCloud({ icons, images }: IconCloudProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [iconPositions, setIconPositions] = useState<Icon[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 })
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [targetRotation, setTargetRotation] = useState<null | {
    x: number
    y: number
    startX: number
    startY: number
    distance: number
    startTime: number
    duration: number
  }>(null)

  const rotationRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number | undefined>(undefined)
  const iconCanvasesRef = useRef<HTMLCanvasElement[]>([])
  const imagesLoadedRef = useRef<boolean[]>([])

  // Мемоизируем items и useIcons, чтобы не пересоздавать на каждом рендере
  const items = useMemo(() => icons || images || [], [icons, images])
  const useIcons = useMemo(() => !!icons, [icons])

  // Генерация позиций иконок
  useEffect(() => {
    const numIcons = items.length
    if (numIcons === 0) {
      setIconPositions([])
      return
    }
    const offset = 2 / numIcons
    const increment = Math.PI * (3 - Math.sqrt(5))

    const positions: Icon[] = []

    for (let i = 0; i < numIcons; i++) {
      const y = i * offset - 1 + offset / 2
      const r = Math.sqrt(1 - y * y)
      const phi = i * increment
      const x = Math.cos(phi) * r
      const z = Math.sin(phi) * r

      positions.push({ x: x * 150, y: y * 150, z: z * 150, scale: 1, opacity: 1, id: i })
    }

    setIconPositions(positions)
  }, [items])

  // Генерация offscreen canvas для каждого icon/image
  useEffect(() => {
    if (items.length === 0) {
      iconCanvasesRef.current = []
      imagesLoadedRef.current = []
      return
    }
    const newCanvases: HTMLCanvasElement[] = []
    imagesLoadedRef.current = items.map(() => false)

    const loadPromises = items.map((item, i) => {
      return new Promise<void>((resolve) => {
        const canvas = document.createElement("canvas")
        canvas.width = 60
        canvas.height = 60
        const ctx = canvas.getContext("2d")
        if (!ctx) {
          resolve()
          return
        }

        if (!useIcons) {
          // Обрабатываем картинки
          const img = new Image()
          img.crossOrigin = "anonymous"
          img.src = item as string
          img.onload = () => {
            ctx.clearRect(0, 0, 40, 40)
            ctx.beginPath()
            ctx.arc(30, 30, 30, 0, 2 * Math.PI)
            ctx.clip()
            ctx.drawImage(img, 0, 0, 60, 60)
            imagesLoadedRef.current[i] = true
            resolve()
          }
          img.onerror = () => resolve() // На случай ошибки загрузки
        } else {
          // Обрабатываем SVG
          let svg = renderToString(item as React.ReactElement)
          if (!svg.includes("xmlns")) {
            svg = svg.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"')
          }
          const svg64 = btoa(unescape(encodeURIComponent(svg)))
          const img = new Image()
          img.src = "data:image/svg+xml;base64," + svg64
          img.onload = () => {
            ctx.clearRect(0, 0, 40, 40)
            ctx.scale(0.4, 0.4)
            ctx.drawImage(img, 0, 0)
            imagesLoadedRef.current[i] = true
            resolve()
          }
          img.onerror = () => resolve()
        }

        newCanvases[i] = canvas
      })
    })

    Promise.all(loadPromises).then(() => {
      iconCanvasesRef.current = newCanvases
    })
  }, [items, useIcons])

  // Обработчики мыши
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true)
    setLastMousePos({ x: e.clientX, y: e.clientY })
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMousePos({ x, y })

    if (isDragging) {
      const dx = e.clientX - lastMousePos.x
      const dy = e.clientY - lastMousePos.y
      rotationRef.current.x += dy * 0.002
      rotationRef.current.y += dx * 0.002
      setLastMousePos({ x: e.clientX, y: e.clientY })
    }
  }, [isDragging, lastMousePos])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Анимация
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const dx = mousePos.x - centerX
      const dy = mousePos.y - centerY
      const maxDist = Math.sqrt(centerX ** 2 + centerY ** 2)
      const dist = Math.sqrt(dx ** 2 + dy ** 2)
      const speed = 0.005 + (dist / maxDist) * 0.01

      if (targetRotation) {
        const elapsed = performance.now() - targetRotation.startTime
        const progress = Math.min(1, elapsed / targetRotation.duration)
        const eased = easeOutCubic(progress)
        rotationRef.current.x = targetRotation.startX + (targetRotation.x - targetRotation.startX) * eased
        rotationRef.current.y = targetRotation.startY + (targetRotation.y - targetRotation.startY) * eased
        if (progress === 1) setTargetRotation(null)
      } else if (!isDragging) {
        rotationRef.current.x += (dy / canvas.height) * speed
        rotationRef.current.y += (dx / canvas.width) * speed
      }

      const cosX = Math.cos(rotationRef.current.x)
      const sinX = Math.sin(rotationRef.current.x)
      const cosY = Math.cos(rotationRef.current.y)
      const sinY = Math.sin(rotationRef.current.y)

      iconPositions.forEach((icon, i) => {
        const rx = icon.x * cosY - icon.z * sinY
        const rz = icon.x * sinY + icon.z * cosY
        const ry = icon.y * cosX + rz * sinX

        const scale = (rz + 200) / 300
        const opacity = Math.max(0.2, Math.min(1, (rz + 150) / 200))

        ctx.save()
        ctx.translate(centerX + rx, centerY + ry)
        ctx.scale(scale, scale)
        ctx.globalAlpha = opacity

        const buffer = iconCanvasesRef.current[i]
        if (buffer && imagesLoadedRef.current[i]) {
          ctx.drawImage(buffer, -40, -40, 60, 60)
        }

        ctx.restore()
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()
    return () => {
      if (animationFrameRef.current !== undefined) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [iconPositions, targetRotation, mousePos, isDragging])

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={400}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      aria-label="3D Icon Cloud"
    />
  )
}
