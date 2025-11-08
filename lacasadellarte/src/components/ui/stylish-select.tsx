"use client";

import * as Select from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";
import { ComponentType } from "react";
import clsx from "clsx";

export interface StylishSelectOption {
  value: string;
  label: string;
  icon?: ComponentType<{ className?: string }>;
}

interface StylishSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: StylishSelectOption[];
  placeholder?: string;
  icon?: ComponentType<{ className?: string }>; // leading icon
  className?: string;
  panelClassName?: string;
}

// Accessible, themeable select built on Radix UI primitives
export function StylishSelect({
  label,
  value,
  onChange,
  options,
  placeholder,
  icon: LeadingIcon,
  className,
  panelClassName,
}: StylishSelectProps) {
  // NOTE: We intentionally allow focus to leave the trigger after selection for fluid page scrolling.
  // This slightly reduces keyboard continuity (user must tab again to re-enter) but matches requested UX.

  return (
    <div className={clsx("flex flex-col gap-3 group", className)}>
      <label className="text-xs font-semibold text-foreground/70 uppercase tracking-wider transition-colors duration-200 group-hover:text-[#8B7355] group-focus-within:text-[#8B7355]">
        {label}
      </label>
      <Select.Root
        value={value}
        onValueChange={(val) => {
          onChange(val)
          // Blur after selection to avoid keeping focus (requested fluid scroll behavior)
          setTimeout(() => {
            const active = document.activeElement as HTMLElement | null
            if (active && active.blur) active.blur()
          }, 0)
        }}
      >
        <div className="relative group/select">
          <Select.Trigger
            className={clsx(
              "relative w-full pl-12 pr-10 py-3 rounded-xl text-sm font-medium text-foreground",
              "bg-gradient-to-r from-[var(--color-beige-light)] to-[var(--color-beige)]",
              "shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_1px_2px_rgba(0,0,0,0.06)]",
              "border border-[var(--color-beige)] hover:shadow-md hover:border-[var(--color-gold)]",
              "focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] transition-all duration-300",
              "cursor-pointer text-left flex items-center",
            )}
            aria-label={label}
          >
            {LeadingIcon && (
              <LeadingIcon className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#8B7355] pointer-events-none transition-transform duration-300 group-hover/select:scale-110" />
            )}
            <Select.Value placeholder={placeholder} />
            <Select.Icon>
              <ChevronDown className="w-4 h-4 text-[#8B7355] absolute right-4 top-1/2 -translate-y-1/2 transition-transform duration-300 data-[state=open]:translate-y-[2px] group-hover/select:translate-y-[2px]" />
            </Select.Icon>
          </Select.Trigger>
        </div>
        <Select.Portal>
          <Select.Content
            position="popper"
            sideOffset={6}
            className={clsx(
              "z-[1000] rounded-xl overflow-hidden pointer-events-none",
              "bg-gradient-to-br from-[var(--color-beige)] to-[var(--color-beige-light)]",
              "border border-[var(--color-gold)] shadow-2xl",
              // Subtle open/close animation using opacity + scale with data-state
              "opacity-0 scale-95 data-[state=open]:opacity-100 data-[state=open]:scale-100 data-[state=closed]:opacity-0 data-[state=closed]:scale-95",
              "transition-[opacity,transform] duration-200 ease-out",
              "max-h-[18rem] w-[var(--radix-select-trigger-width)]",
              panelClassName
            )}
            // If viewport cannot scroll, bubble wheel to page to avoid feeling stuck
            onWheel={(e) => {
              const viewport = (e.currentTarget.querySelector('[data-radix-select-viewport]') as HTMLElement | null)
              if (viewport && viewport.scrollHeight <= viewport.clientHeight) {
                // Allow page scroll
                window.scrollBy({ top: e.deltaY, behavior: 'auto' })
              }
            }}
          >
            <Select.ScrollUpButton className="pointer-events-auto flex items-center justify-center py-1 bg-[var(--color-beige-light)] text-[#8B7355] text-xs">▲</Select.ScrollUpButton>
            <Select.Viewport className="pointer-events-auto p-1">
              {options.map((opt) => (
                <Select.Item
                  key={opt.value}
                  value={opt.value}
                  className={clsx(
                    // Layout and grouping
                    "relative group/item flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium cursor-pointer",
                    // Base text color and outline behavior
                    "text-[var(--color-text)] data-[highlighted]:outline-none",
                    // Animated background + text color on hover/highlight
                    "hover:bg-[var(--color-gold)]/15 data-[highlighted]:bg-[var(--color-gold)]/20",
                    "hover:text-[#8B7355] data-[highlighted]:text-[#8B7355]",
                    // Subtle motion and accent bar
                    "transition-[color,background-color,transform] duration-200 ease-out",
                    "hover:translate-x-[2px] data-[highlighted]:translate-x-[2px]",
                    "before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-[var(--color-gold)] before:opacity-0 data-[highlighted]:before:opacity-100",
                    // Checked background hint
                    "data-[state=checked]:bg-[#8B7355]/15",
                  )}
                >
                  {opt.icon && <opt.icon className="w-4 h-4 text-current" />}
                  <Select.ItemText>{opt.label}</Select.ItemText>
                  <Select.ItemIndicator className="absolute right-2 inline-flex items-center">
                    <Check className="w-4 h-4 text-[#8B7355]" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
            <Select.ScrollDownButton className="pointer-events-auto flex items-center justify-center py-1 bg-[var(--color-beige-light)] text-[#8B7355] text-xs">▼</Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}
