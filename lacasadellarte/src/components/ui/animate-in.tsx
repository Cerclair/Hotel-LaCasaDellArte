"use client"

import React, { ElementType, HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

type AnimateInProps<T extends ElementType> = {
  as?: T
  delay?: number // milliseconds
  bounce?: boolean // add slow bounce after fade-in
  bounceDurationSec?: number
  className?: string
  children?: React.ReactNode
} & Omit<HTMLAttributes<Element>, "as" | "children" | "className">

export function AnimateIn<T extends ElementType = "div">({
  as,
  delay = 0,
  bounce = false,
  bounceDurationSec = 2.5,
  className,
  children,
  ...rest
}: AnimateInProps<T>) {
  const Comp = (as || "div") as ElementType
  const delaySec = Math.max(0, delay) / 1000

  const style: React.CSSProperties = bounce
    ? {
        animationName: "fadeIn, bounceSlow",
        animationDuration: `0.6s, ${bounceDurationSec}s`,
        animationTimingFunction: "ease-out, ease-in-out",
        animationDelay: `${delaySec}s, ${delaySec}s`,
        animationFillMode: "both, none",
        animationIterationCount: "1, infinite",
      }
  : {
        animationName: "fadeIn",
        animationDuration: "0.6s",
        animationTimingFunction: "ease-out",
        animationDelay: `${delaySec}s`,
    animationFillMode: "both",
    animationIterationCount: "1",
      }

  return (
    <Comp className={cn(className)} style={style} {...rest}>
      {children}
    </Comp>
  )
}
