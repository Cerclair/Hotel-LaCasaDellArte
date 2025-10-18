'use client';

import { useState } from 'react';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([
    { text: 'Hello! I\'m your La Casa Dell\'Arte assistant. How can I help you today?', isBot: true }
  ]);
  const [inputValue, setInputValue] = useState('');

  const quickActions = [
    { id: 1, label: 'Room Availability', icon: '🏨' },
    { id: 2, label: 'Dining Options', icon: '🍽️' },
    { id: 3, label: 'Contact Us', icon: '📧' },
    { id: 4, label: 'Emergency', icon: '🚨' },
  ];

  const handleSend = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { text: inputValue, isBot: false }]);

      // Simulate bot response
      setTimeout(() => {
        let response = '';
        const query = inputValue.toLowerCase();

        if (query.includes('room') || query.includes('booking') || query.includes('availability')) {
          response = 'You can check our room availability and make bookings on our Rooms page. We have Standard Rooms, Deluxe Rooms, and King Deluxe Suites. Would you like me to help you with a specific room type?';
        } else if (query.includes('dining') || query.includes('restaurant') || query.includes('food')) {
          response = 'We have 5 dining options: Palette 360 (International Buffet), Dipinta (Italian), Lumière (French Fine Dining), Vetro (Bar & Lounge), and In-Room Dining. Which one interests you?';
        } else if (query.includes('spa') || query.includes('wellness') || query.includes('massage')) {
          response = 'Our ZEN Spa offers various treatments including massages, facials, and body treatments. We\'re open daily from 8:00 AM to 9:00 PM. Would you like to book an appointment?';
        } else if (query.includes('contact') || query.includes('email') || query.includes('phone')) {
          response = 'You can reach us at: Phone: +94 718 530 994, Email: ladellaarte@gmail.com. We\'re located at Galle Road, Colombo 03, Sri Lanka. How else can I assist you?';
        } else if (query.includes('emergency') || query.includes('help') || query.includes('urgent')) {
          response = 'For emergencies, please call our front desk immediately at +94 718 530 994. If you\'re a guest, you can also dial 0 from your room phone for 24/7 assistance.';
        } else {
          response = 'Thank you for your inquiry! For detailed information, you can explore our website or contact us directly at ladellaarte@gmail.com or +94 718 530 994. Is there anything specific I can help you with?';
        }

        setMessages(prev => [...prev, { text: response, isBot: true }]);
      }, 1000);

      setInputValue('');
    }
  };

  const handleQuickAction = (label: string) => {
    setInputValue(label);
    handleSend();
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-[var(--color-accent)] text-white rounded-full shadow-lg hover:bg-[var(--color-gold)] transition-all duration-300 transform hover:scale-110 z-50 flex items-center justify-center"
        aria-label="AI Assistant"
      >
        {isOpen ? (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl z-50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-[var(--color-accent)] text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold">La Casa Assistant</h3>
                <p className="text-xs opacity-90">Online - Here to help</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[var(--color-beige-light)]">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isBot
                      ? 'bg-white text-[var(--color-text)]'
                      : 'bg-[var(--color-accent)] text-white'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          {messages.length === 1 && (
            <div className="p-4 bg-white border-t border-[var(--color-beige-dark)]">
              <p className="text-xs text-[var(--color-gray)] mb-2">Quick actions:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => handleQuickAction(action.label)}
                    className="text-left p-2 text-xs bg-[var(--color-beige-light)] hover:bg-[var(--color-beige-dark)] rounded transition-colors"
                  >
                    <span className="mr-1">{action.icon}</span>
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 bg-white border-t border-[var(--color-beige-dark)]">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-[var(--color-beige-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] text-sm bg-white text-[var(--color-text)]"
              />
              <button
                onClick={handleSend}
                className="bg-[var(--color-accent)] text-white px-4 py-2 rounded-lg hover:bg-[var(--color-gold)] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <p className="text-xs text-[var(--color-gray)] mt-2">
              This is a demo assistant. For real inquiries, please email us.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
