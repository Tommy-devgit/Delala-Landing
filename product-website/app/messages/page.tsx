"use client";

import { useState } from "react";
import { MessageSquare, Send, CheckCircle2, Building2, User, Phone } from "lucide-react";
import { PROPERTIES } from "@/lib/data";

export default function MessagesPage() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: "Abebe Tesfaye",
      avatar: "/images/hero_home_away.jpg",
      text: "Greetings! Is the 45kVA generator automatically switched on during power outages?",
      time: "10:14 AM",
      isMe: false,
    },
    {
      id: "2",
      sender: "You",
      text: "Yes, it features an automatic transfer switch (ATS) with 5-second takeover.",
      time: "10:16 AM",
      isMe: true,
    },
  ]);
  const [input, setInput] = useState("");

  const property = PROPERTIES[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: "You",
        text: input,
        time: "Just now",
        isMe: true,
      },
    ]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#1C1B12] font-sans pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-12">
        <div className="bg-white rounded-3xl border border-[#ECE7DA] shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-3 min-h-[640px]">
          
          {/* Left Conversations Sidebar */}
          <div className="border-r border-[#ECE7DA] bg-[#FAF8F4]/50 p-4">
            <h2 className="font-serif-display text-xl text-[#1C1B12] mb-4 px-2">
              Messages
            </h2>
            <div className="space-y-2">
              <div className="p-3.5 rounded-2xl bg-white border border-[#4C061D] shadow-xs cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#4C061D] text-white flex items-center justify-center font-bold text-xs">
                    AT
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-xs text-[#1C1B12] truncate">Abebe Tesfaye</div>
                    <div className="text-[11px] text-[#736F4E] truncate">Bole Medhanialem Villa</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Message Thread */}
          <div className="md:col-span-2 flex flex-col justify-between">
            {/* Header */}
            <div className="p-4 border-b border-[#ECE7DA] bg-[#FAF8F4] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={property.heroImage} alt="" className="w-12 h-12 rounded-xl object-cover border border-[#ECE7DA]" />
                <div>
                  <div className="font-bold text-sm text-[#1C1B12]">{property.title}</div>
                  <div className="text-xs font-mono-label text-[#4C061D]">
                    ETB {property.rentETB.toLocaleString()}/mo • {property.broker.agencyName}
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Body */}
            <div className="p-6 space-y-4 flex-1 overflow-y-auto bg-white">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-md p-4 rounded-2xl text-xs sm:text-sm shadow-xs ${
                      msg.isMe
                        ? "bg-[#4C061D] text-white rounded-br-none"
                        : "bg-[#FAF8F4] border border-[#ECE7DA] text-[#1C1B12] rounded-bl-none"
                    }`}
                  >
                    <div>{msg.text}</div>
                    <div className={`text-[10px] mt-1 text-right font-mono-label ${msg.isMe ? "text-white/60" : "text-[#736F4E]"}`}>
                      {msg.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSend} className="p-4 border-t border-[#ECE7DA] bg-[#FAF8F4] flex items-center gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask certified broker about generator, water tank, lease terms..."
                className="flex-1 p-3.5 rounded-full bg-white border border-[#ECE7DA] text-xs text-[#1C1B12] focus:outline-none focus:border-[#4C061D]"
              />
              <button
                type="submit"
                className="w-11 h-11 rounded-full bg-[#4C061D] text-white flex items-center justify-center hover:bg-[#3B0416] transition-colors shadow-md"
              >
                <Send className="w-4 h-4 text-[#B4C292]" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
