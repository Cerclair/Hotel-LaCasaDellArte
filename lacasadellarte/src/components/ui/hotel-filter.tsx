"use client"

import { useEffect, useState } from "react"
import { Calendar, Users, Building2, BedDouble } from "lucide-react"
import { StylishSelect } from "@/components/ui/stylish-select"
import { Card } from "@/components/ui/card"

export interface DateRange {
  checkIn: Date | null
  checkOut: Date | null
}

export interface GuestCount {
  adults: number
  children: number
}

export interface FilterState {
  dateRange: DateRange
  roomType: string
  bedType: string
  guests: GuestCount
}

// Compatibility map between room types and bed types based on available inventory
const ROOM_TO_BEDS: Record<string, string[]> = {
  standard: ["queen"],
  deluxe: ["king"],
  "king-deluxe": ["king-sofa"],
}
const BED_TO_ROOMS: Record<string, string[]> = {
  queen: ["standard"],
  king: ["deluxe"],
  "king-sofa": ["king-deluxe"],
}

export function HotelFilter({ onChange }: { onChange?: (filters: FilterState) => void }) {
  const [filters, setFilters] = useState<FilterState>({
    dateRange: { checkIn: null, checkOut: null },
    roomType: "all",
    bedType: "all",
    guests: { adults: 1, children: 0 },
  })

  // Notify parent whenever filters change (live filtering)
  useEffect(() => {
    onChange?.(filters)
  }, [filters, onChange])

  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showGuestPicker, setShowGuestPicker] = useState(false)
  const [activeCalendar, setActiveCalendar] = useState<"checkIn" | "checkOut">("checkIn")

  const roomTypes = [
    { value: "all", label: "All Rooms" },
    { value: "standard", label: "Standard" },
    { value: "deluxe", label: "Deluxe" },
    { value: "king-deluxe", label: "King Deluxe" },
  ]

  const bedTypes = [
    { value: "all", label: "All Beds" },
    { value: "queen", label: "Queen Bed" },
    { value: "king", label: "King Bed" },
    { value: "king-sofa", label: "King + Sofa Bed" },
  ]

  // If a selection becomes incompatible after changing the other dropdown, reset it to "all"
  useEffect(() => {
    if (filters.roomType !== "all" && filters.bedType !== "all") {
      const allowedBeds = ROOM_TO_BEDS[filters.roomType] || [];
      if (!allowedBeds.includes(filters.bedType)) {
        setFilters((prev) => ({ ...prev, bedType: "all" }));
      }
    }
  }, [filters.roomType, filters.bedType]);

  useEffect(() => {
    if (filters.bedType !== "all" && filters.roomType !== "all") {
      const allowedRooms = BED_TO_ROOMS[filters.bedType] || [];
      if (!allowedRooms.includes(filters.roomType)) {
        setFilters((prev) => ({ ...prev, roomType: "all" }));
      }
    }
  }, [filters.bedType, filters.roomType]);

  // Derive disabled flags for options based on the current counterpart selection
  const roomTypeOptions = roomTypes.map((opt) => {
    if (opt.value === "all") return opt; // never disable 'All'
    if (filters.bedType === "all") return opt; // when bed is 'all', all rooms are selectable
    const allowedRooms = BED_TO_ROOMS[filters.bedType] || [];
    return { ...opt, disabled: !allowedRooms.includes(opt.value) };
  });

  const bedTypeOptions = bedTypes.map((opt) => {
    if (opt.value === "all") return opt; // never disable 'All'
    if (filters.roomType === "all") return opt; // when room is 'all', all beds are selectable
    const allowedBeds = ROOM_TO_BEDS[filters.roomType] || [];
    return { ...opt, disabled: !allowedBeds.includes(opt.value) };
  });

  const getDurationDays = () => {
    if (filters.dateRange.checkIn && filters.dateRange.checkOut) {
      const diffTime = Math.abs(filters.dateRange.checkOut.getTime() - filters.dateRange.checkIn.getTime())
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    }
    return 0
  }

  const formatDate = (date: Date | null) => {
    if (!date) return "Select date"
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  const handleDateClick = (date: Date) => {
    if (activeCalendar === "checkIn") {
      setFilters((prev) => ({
        ...prev,
        dateRange: { ...prev.dateRange, checkIn: date },
      }))
      setActiveCalendar("checkOut")
    } else {
      if (filters.dateRange.checkIn && date > filters.dateRange.checkIn) {
        setFilters((prev) => ({
          ...prev,
          dateRange: { ...prev.dateRange, checkOut: date },
        }))
        setShowDatePicker(false)
      }
    }
  }

  const generateCalendarDays = (month: number, year: number) => {
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }
    return days
  }

  const today = new Date()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()
  const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1
  const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear

  const currentMonthDays = generateCalendarDays(currentMonth, currentYear)
  const nextMonthDays = generateCalendarDays(nextMonth, nextYear)

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const isDateInRange = (date: Date | null) => {
    if (!date || !filters.dateRange.checkIn || !filters.dateRange.checkOut) return false
    return date > filters.dateRange.checkIn && date < filters.dateRange.checkOut
  }

  const isDateSelected = (date: Date | null) => {
    if (!date) return false
    return (
      filters.dateRange.checkIn?.toDateString() === date.toDateString() ||
      filters.dateRange.checkOut?.toDateString() === date.toDateString()
    )
  }

  const handleResetFilters = () => {
    const defaults: FilterState = {
      dateRange: { checkIn: null, checkOut: null },
      roomType: "all",
      bedType: "all",
      guests: { adults: 1, children: 0 },
    }
    setFilters(defaults)
    setActiveCalendar("checkIn")
    setShowDatePicker(false)
    setShowGuestPicker(false)
  }

  const isDefaultFilters =
    filters.roomType === "all" &&
    filters.bedType === "all" &&
    !filters.dateRange.checkIn &&
    !filters.dateRange.checkOut &&
    filters.guests.adults === 1 &&
    filters.guests.children === 0

  return (
    // Full-width section wrapper (previously constrained with container/max-w)
    <div className="w-full px-4 sm:px-8 py-8">
      <Card className="border-0 shadow-2xl bg-[var(--color-beige-light)] relative">
        {/* Gold accent bar */}
        <div className="absolute top-0 left-0 w-full h-2 bg-[var(--color-gold)]" />
  <div className="p-10 bg-[var(--color-beige-light)]">
          {/* Header */}
          <div className="mb-8 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-foreground mb-2 inline-block border-b-4 border-[var(--color-gold)] pb-2 rounded-md">Find Your Perfect Room</h2>
            <p className="text-muted-foreground text-base">Customize your stay with our premium selection</p>
          </div>

          {/* Filter Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8 divide-x-0 lg:divide-x lg:divide-border bg-[var(--color-beige-light)] shadow-md p-5 border-2 border-[var(--color-gold)]">
            {/* Date Range Picker */}
            <div className="lg:col-span-2 relative p-2 group">
              <label className="block text-xs font-semibold text-foreground/70 uppercase tracking-wider mb-3 transition-colors duration-200 group-hover:text-[#8B7355] group-focus-within:text-[#8B7355]">
                Check-in / Check-out
              </label>
              <div className="relative group/date">
                {/* Icon */}
                <Calendar className="w-4 h-4 text-[#8B7355] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300 group-hover/date:scale-110 group-focus-within/date:scale-110" />
                {/* Chevron */}
                <svg aria-hidden="true" className="w-4 h-4 text-[#8B7355] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-300 group-hover/date:translate-y-[2px]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 8l4 4 4-4" />
                </svg>
                <button
                  onClick={() => setShowDatePicker(!showDatePicker)}
                  className="w-full pl-12 pr-10 py-3 rounded-xl text-sm font-medium text-foreground text-left cursor-pointer appearance-none transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] bg-gradient-to-r from-[var(--color-beige-light)] to-[var(--color-beige)] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_1px_2px_rgba(0,0,0,0.06)] border border-[var(--color-beige)] hover:shadow-md hover:border-[var(--color-gold)] group-hover/date:border-[var(--color-gold)] flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <span>
                      {filters.dateRange.checkIn ? formatDate(filters.dateRange.checkIn) : "Check-in"} → {filters.dateRange.checkOut ? formatDate(filters.dateRange.checkOut) : "Check-out"}
                    </span>
                  </span>
                  {getDurationDays() > 0 && (
                    <span className="text-xs bg-[#8B7355]/10 text-[#8B7355] px-2 py-1 rounded">
                      {getDurationDays()} nights
                    </span>
                  )}
                </button>
              </div>

              {/* Date Picker Dropdown */}
              {showDatePicker && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[var(--color-beige)] border border-border rounded-lg shadow-xl p-6 z-[999]">
                  <div className="grid grid-cols-2 gap-6">
                    {/* Current Month */}
                    <div>
                      <h3 className="font-semibold text-foreground mb-4 text-sm">
                        {monthNames[currentMonth]} {currentYear}
                      </h3>
                      <div className="grid grid-cols-7 gap-2 text-center text-xs">
                        {["S", "M", "T", "W", "T", "F", "S"].map((day, dayIdx) => (
                          <div key={`current-${dayIdx}`} className="font-semibold text-muted-foreground py-2">
                            {day}
                          </div>
                        ))}
                        {currentMonthDays.map((date, idx) => (
                          <button
                            key={idx}
                            onClick={() => date && handleDateClick(date)}
                            disabled={!date || date < today}
                            className={`py-2 rounded text-xs font-medium transition-all ${
                              !date || date < today
                                ? "text-muted-foreground cursor-not-allowed"
                                : isDateSelected(date)
                                  ? "bg-primary text-primary-foreground"
                                  : isDateInRange(date)
                                    ? "bg-primary/20 text-primary"
                                    : "hover:bg-muted text-foreground"
                            }`}
                          >
                            {date?.getDate()}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Next Month */}
                    <div>
                      <h3 className="font-semibold text-foreground mb-4 text-sm">
                        {monthNames[nextMonth]} {nextYear}
                      </h3>
                      <div className="grid grid-cols-7 gap-2 text-center text-xs">
                        {["S", "M", "T", "W", "T", "F", "S"].map((day, dayIdx) => (
                          <div key={`next-${dayIdx}`} className="font-semibold text-muted-foreground py-2">
                            {day}
                          </div>
                        ))}
                        {nextMonthDays.map((date, idx) => (
                          <button
                            key={idx}
                            onClick={() => date && handleDateClick(date)}
                            disabled={!date || date < today}
                            className={`py-2 rounded text-xs font-medium transition-all ${
                              !date || date < today
                                ? "text-muted-foreground cursor-not-allowed"
                                : isDateSelected(date)
                                  ? "bg-primary text-primary-foreground"
                                  : isDateInRange(date)
                                    ? "bg-primary/20 text-primary"
                                    : "hover:bg-muted text-foreground"
                            }`}
                          >
                            {date?.getDate()}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowDatePicker(false)}
                    className="w-full mt-4 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>

            {/* Room Type */}
            <div className="p-2">
              <StylishSelect
                label="Room Type"
                value={filters.roomType}
                onChange={(value) => setFilters((prev) => ({ ...prev, roomType: value }))}
                options={roomTypeOptions}
                placeholder="All Rooms"
                icon={Building2}
              />
            </div>

            {/* Bed Type */}
            <div className="p-2">
              <StylishSelect
                label="Bed Type"
                value={filters.bedType}
                onChange={(value) => setFilters((prev) => ({ ...prev, bedType: value }))}
                options={bedTypeOptions}
                placeholder="All Beds"
                icon={BedDouble}
              />
            </div>

            {/* Guest Selector */}
            <div className="relative p-2 group">
              <label className="block text-xs font-semibold text-foreground/70 uppercase tracking-wider mb-3 transition-colors duration-200 group-hover:text-[#8B7355] group-focus-within:text-[#8B7355]">
                Guests
              </label>
              <div className="relative group/guests">
                <Users className="w-4 h-4 text-[#8B7355] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300 group-hover/guests:scale-110 group-focus-within/guests:scale-110" />
                <svg aria-hidden="true" className="w-4 h-4 text-[#8B7355] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-300 group-hover/guests:translate-y-[2px]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 8l4 4 4-4" />
                </svg>
                <button
                  onClick={() => setShowGuestPicker(!showGuestPicker)}
                  className="w-full pl-12 pr-10 py-3 rounded-xl text-sm font-medium text-foreground text-left cursor-pointer appearance-none transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] bg-gradient-to-r from-[var(--color-beige-light)] to-[var(--color-beige)] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_1px_2px_rgba(0,0,0,0.06)] border border-[var(--color-beige)] hover:shadow-md hover:border-[var(--color-gold)] group-hover/guests:border-[var(--color-gold)] flex items-center justify-between"
                >
                  <span>
                    {filters.guests.adults} {filters.guests.adults === 1 ? "Adult" : "Adults"}
                    {filters.guests.children > 0 && `, ${filters.guests.children} ${filters.guests.children === 1 ? "Child" : "Children"}`}
                  </span>
                </button>
              </div>

              {/* Guest Picker Dropdown */}
              {showGuestPicker && (
                <div className="absolute top-full right-0 mt-2 bg-[var(--color-beige)] border border-border rounded-lg shadow-xl p-4 z-50 w-64">
                  <div className="space-y-4">
                    {/* Adults */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">Adults</span>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            setFilters((prev) => ({
                              ...prev,
                              guests: {
                                ...prev.guests,
                                adults: Math.max(1, prev.guests.adults - 1),
                              },
                            }))
                          }
                          className="w-8 h-8 rounded border border-border hover:bg-muted transition-colors flex items-center justify-center text-foreground"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-semibold text-foreground">{filters.guests.adults}</span>
                        <button
                          onClick={() =>
                            setFilters((prev) => ({
                              ...prev,
                              guests: {
                                ...prev.guests,
                                adults: Math.min(4, prev.guests.adults + 1),
                              },
                            }))
                          }
                          className="w-8 h-8 rounded border border-border hover:bg-muted transition-colors flex items-center justify-center text-foreground"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Children */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">Children</span>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            setFilters((prev) => ({
                              ...prev,
                              guests: {
                                ...prev.guests,
                                children: Math.max(0, prev.guests.children - 1),
                              },
                            }))
                          }
                          className="w-8 h-8 rounded border border-border hover:bg-muted transition-colors flex items-center justify-center text-foreground"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-semibold text-foreground">{filters.guests.children}</span>
                        <button
                          onClick={() =>
                            setFilters((prev) => ({
                              ...prev,
                              guests: {
                                ...prev.guests,
                                children: Math.min(2, prev.guests.children + 1),
                              },
                            }))
                          }
                          className="w-8 h-8 rounded border border-border hover:bg-muted transition-colors flex items-center justify-center text-foreground"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowGuestPicker(false)}
                    className="w-full mt-4 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Reset Filters */}
          {!isDefaultFilters && (
            <div className="flex justify-center mb-4">
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-8 py-3 border border-[var(--color-gold)] rounded-lg font-semibold text-[var(--color-text)] hover:bg-[var(--color-gold)]/10 hover:shadow-md transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}


          {/* Filter Summary */}
          {(filters.dateRange.checkIn || filters.roomType !== "all" || filters.bedType !== "all") && (
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-xs text-muted-foreground mb-3">Active Filters:</p>
              <div className="flex flex-wrap gap-2">
                {filters.dateRange.checkIn && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                    {formatDate(filters.dateRange.checkIn)} - {formatDate(filters.dateRange.checkOut)}
                    <button
                      onClick={() => {
                        setFilters((prev) => ({
                          ...prev,
                          dateRange: { checkIn: null, checkOut: null },
                        }));
                        setActiveCalendar("checkIn");
                      }}
                      className="hover:opacity-70"
                    >
                      ×
                    </button>
                  </span>
                )}
                {filters.roomType !== "all" && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                    {roomTypes.find((t) => t.value === filters.roomType)?.label}
                    <button
                      onClick={() => setFilters((prev) => ({ ...prev, roomType: "all" }))}
                      className="hover:opacity-70"
                    >
                      ×
                    </button>
                  </span>
                )}
                {filters.bedType !== "all" && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                    {bedTypes.find((t) => t.value === filters.bedType)?.label}
                    <button
                      onClick={() => setFilters((prev) => ({ ...prev, bedType: "all" }))}
                      className="hover:opacity-70"
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
