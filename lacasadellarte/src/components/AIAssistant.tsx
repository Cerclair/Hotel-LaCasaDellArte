"use client";

import { useState, useEffect, useRef } from "react";

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<
    { text: string; isBot: boolean; timestamp?: string }[]
  >([
    {
      text: "Hi! I'm here to help with anything, and if I can't, I'll connect you with a Team Member.",
      isBot: true,
      timestamp: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickActions = [
    { id: 1, label: "Room Availability" },
    { id: 2, label: "Dining Options" },
    { id: 3, label: "Contact Us" },
    { id: 4, label: "Emergency" },
  ];

  const handleSend = () => {
    if (inputValue.trim()) {
      setMessages([
        ...messages,
        {
          text: inputValue,
          isBot: false,
          timestamp: new Date().toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          }),
        },
      ]);
      setIsTyping(true);

      setTimeout(() => {
        let response = "";
        const query = inputValue.toLowerCase();

        if (
          query.includes("room") ||
          query.includes("booking") ||
          query.includes("availability") ||
          query.includes("book a stay")
        ) {
          response =
            "You can check our room availability and make bookings on our Rooms page. We have Standard Rooms, Deluxe Rooms, and King Deluxe Suites. Would you like me to help you with a specific room type?";
        } else if (
          query.includes("dining") ||
          query.includes("restaurant") ||
          query.includes("food") ||
          query.includes("reservation")
        ) {
          response =
            "We have 5 dining options: Palette 360 (International Buffet), Dipinta (Italian), Lumière (French Fine Dining), Vetro (Bar & Lounge), and In-Room Dining. Which one interests you?";
        } else if (
          query.includes("spa") ||
          query.includes("wellness") ||
          query.includes("massage")
        ) {
          response =
            "Our ZEN Spa offers various treatments including massages, facials, and body treatments. We're open daily from 8:00 AM to 9:00 PM. Would you like to book an appointment?";
        } else if (
          query.includes("contact") ||
          query.includes("email") ||
          query.includes("phone")
        ) {
          response =
            "You can reach us at: Phone: +94 718 530 994, Email: ladellaarte@gmail.com. We're located at Galle Road, Colombo 03, Sri Lanka. How else can I assist you?";
        } else if (
          query.includes("emergency") ||
          query.includes("help") ||
          query.includes("urgent")
        ) {
          response =
            "For emergencies, please call our front desk immediately at +94 718 530 994. If you're a guest, you can also dial 0 from your room phone for 24/7 assistance.";
        } else if (
          query.includes("amenities") ||
          query.includes("facilities")
        ) {
          response =
            "Our hotel features a luxury spa, fitness center, outdoor pool, art gallery, and event spaces. Each room includes modern amenities for your comfort. What specific amenity would you like to know about?";
        } else if (query.includes("policy") || query.includes("policies")) {
          response =
            "Check-in is at 3:00 PM and check-out at 12:00 PM. For detailed information about our policies, please visit our Terms & Conditions page or contact us directly.";
        } else {
          response =
            "Thank you for your inquiry! For detailed information, you can explore our website or contact us directly at ladellaarte@gmail.com or +94 718 530 994. Is there anything specific I can help you with?";
        }

        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            text: response,
            isBot: true,
            timestamp: new Date().toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            }),
          },
        ]);
      }, 1200);

      setInputValue("");
    }
  };

  const handleQuickAction = (label: string) => {
    setInputValue(label);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <>
      {/* Floating Button - z-[9999] to be above everything */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
        style={{
          backgroundColor: "#8B7355",
          bottom: "1.5rem",
          right: "1.5rem",
          zIndex: 9999,
        }}
        aria-label="Chat with us"
      >
        {isOpen ? (
          <svg
            className="w-6 h-6 sm:w-7 sm:h-7 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6 sm:w-7 sm:h-7 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}
      </button>

      {/* Chat Window - z-[9998] to be just below the button */}
      {isOpen && (
        <div
          className="fixed bg-[#E8E4D8] rounded-2xl shadow-2xl flex flex-col overflow-hidden border-2 border-[#8B7355]/20"
          style={{
            bottom: "6rem",
            right: "1.5rem",
            width: "90vw",
            maxWidth: "420px",
            minWidth: "320px",
            height: "calc(100vh - 10rem)",
            maxHeight: "650px",
            zIndex: 9998,
          }}
        >
          {/* Header */}
          <div className="bg-[#E8E4D8] border-b border-[#8B7355]/15 px-5 py-4 flex items-center justify-center relative flex-shrink-0">
            <h3 className="font-bold text-[#2C2C2C] text-lg text-center">
              La Casa Concierge
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-5 p-1.5 hover:bg-[#8B7355]/10 rounded-lg transition-colors"
              aria-label="Close"
            >
              <svg
                className="w-5 h-5 text-[#2C2C2C]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Messages Area */}
          <div
            className="flex-1 overflow-y-auto space-y-3 bg-gradient-to-b from-[#F5F5DC]/40 to-[#E8E4D8]/40"
            style={{ paddingLeft: '24px', paddingRight: '24px', paddingTop: '20px', paddingBottom: '20px' }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.isBot ? "justify-start" : "justify-end"
                } animate-fadeIn`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded shadow-md text-sm ${
                    message.isBot
                      ? "bg-white text-[#2C2C2C]"
                      : "bg-[#8B7355] text-white"
                  }`}
                >
                  <p className="leading-relaxed break-words whitespace-normal">
                    {message.text}
                  </p>
                  {message.timestamp && (
                    <p
                      className={`text-[11px] mt-1 ${
                        message.isBot ? "text-[#999]" : "text-white/70"
                      }`}
                    >
                      {message.timestamp}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start animate-fadeIn">
                <div className="bg-white text-[#2C2C2C] rounded px-5 py-3 shadow-md">
                  <div className="flex space-x-2 items-center">
                    <div
                      className="w-2.5 h-2.5 bg-[#8B7355] rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2.5 h-2.5 bg-[#8B7355] rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2.5 h-2.5 bg-[#8B7355] rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length === 1 && !isTyping && (
            <div
              className="bg-[#E8E4D8] border-t border-[#8B7355]/15 flex-shrink-0"
              style={{ paddingLeft: '24px', paddingRight: '24px', paddingTop: '16px', paddingBottom: '16px' }}
            >
              <div className="grid grid-cols-2 gap-2.5">
                {quickActions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => handleQuickAction(action.label)}
                    className="flex items-center justify-center px-4 py-2.5 text-xs font-semibold text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 whitespace-normal"
                    style={{ backgroundColor: "#8B7355" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#D4AF37";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#8B7355";
                    }}
                  >
                    <span className="text-center leading-tight">
                      {action.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div
            className="bg-[#E8E4D8] border-t-2 border-[#8B7355]/15 flex-shrink-0"
            style={{ paddingLeft: '24px', paddingRight: '24px', paddingTop: '16px', paddingBottom: '16px' }}
          >
            <div className="flex gap-2.5 items-center mb-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 bg-white border border-[#E8E8CD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355] focus:border-transparent text-sm text-[#2C2C2C] placeholder-[#6B6B6B]/50 transition-all duration-300 shadow-sm"
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="text-white w-11 h-11 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center flex-shrink-0 transform hover:scale-105 active:scale-95"
                style={{ backgroundColor: "#8B7355" }}
                onMouseEnter={(e) => {
                  if (!inputValue.trim()) return;
                  e.currentTarget.style.backgroundColor = "#D4AF37";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#8B7355";
                }}
                aria-label="Send message"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
            <p className="text-[10px] text-[#6B6B6B] text-center font-medium">
              Demo assistant · For inquiries:{" "}
              <span className="font-semibold">ladellaarte@gmail.com</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
