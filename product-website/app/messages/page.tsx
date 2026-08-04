"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Send, CheckCircle2, Building2, User, Phone, Lock } from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { authClient, UserSession } from "@/lib/auth-client";
import { AuthModal } from "@/components/auth-modal";
import { Property } from "@/lib/types";

export default function MessagesPage() {
  const [session, setSession] = useState<{ user: UserSession; token: string } | null>(null);
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
  const [property, setProperty] = useState<Property | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      const activeSession = authClient.getSession();
      setSession(activeSession);

      const data = await apiClient.getProperties();
      if (data.length > 0) setProperty(data[0]);
    }
    loadData();
  }, []);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user || session.user.role === "GUEST") {
      setIsAuthModalOpen(true);
      return;
    }
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
        
        {!session?.user ? (
          <div className="py-20 text-center bg-white rounded-3xl border border-[#ECE7DA] p-8 max-w-xl mx-auto space-y-4 shadow-sm">
            <Lock className="w-12 h-12 text-[#4C061D] mx-auto opacity-70" />
            <h2 className="font-serif-display text-2xl text-[#1C1B12]">
              Sign in to view messages
            </h2>
            <p className="text-xs text-[#736F4E]">
              Authenticate as a Home Seeker or Certified Broker to chat directly about rental terms and walkthrough appointments.
            </p>
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-8 py-3.5 rounded-full bg-[#4C061D] text-white font-mono-label text-xs font-bold shadow-md hover:bg-[#3B0416] transition-colors"
            >
              Sign In / Choose Persona →
            </button>
          </div>
        ) : (
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
                    <div>
                      <div className="font-bold text-xs text-[#1C1B12]">Abebe Tesfaye</div>
                      <div className="text-[11px] text-[#736F4E] truncate max-w-[160px]">
                        {property?.title || "Bole Medhanialem Property"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Chat Thread */}
            <div className="md:col-span-2 flex flex-col justify-between p-6 bg-white">
              
              {/* Header */}
              <div className="pb-4 border-b border-[#ECE7DA] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#4C061D] text-white flex items-center justify-center font-bold text-xs">
                    AT
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#1C1B12]">Abebe Tesfaye</h3>
                    <span className="font-mono-label text-[10px] text-emerald-700">VERIFIED BROKER</span>
                  </div>
                </div>

                {property && (
                  <div className="text-right hidden sm:block">
                    <div className="font-mono-label text-xs font-bold text-[#4C061D]">
                      ETB {property.rentETB.toLocaleString()}/mo
                    </div>
                    <div className="text-[10px] text-[#736F4E]">{property.subCity}, {property.city}</div>
                  </div>
                )}
              </div>

              {/* Message Thread */}
              <div className="py-6 space-y-4 flex-1 overflow-y-auto">
                {messages.map((m) => (
                  <div key={m.id} className={`flex ${m.isMe ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-md p-4 rounded-2xl text-xs leading-relaxed ${
                        m.isMe
                          ? "bg-[#4C061D] text-white rounded-br-none"
                          : "bg-[#FAF8F4] border border-[#ECE7DA] text-[#1C1B12] rounded-bl-none"
                      }`}
                    >
                      <p>{m.text}</p>
                      <span className={`block text-[9px] font-mono-label mt-1.5 ${m.isMe ? "text-white/60 text-right" : "text-[#736F4E]"}`}>
                        {m.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Form */}
              <form onSubmit={handleSend} className="pt-4 border-t border-[#ECE7DA] flex items-center gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your inquiry about walkthrough or rental terms..."
                  className="flex-1 p-4 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] text-xs text-[#1C1B12] focus:outline-none focus:border-[#4C061D]"
                />
                <button
                  type="submit"
                  className="p-4 rounded-2xl bg-[#4C061D] text-white hover:bg-[#3B0416] transition-colors shadow-md"
                >
                  <Send className="w-4 h-4 text-[#B4C292]" />
                </button>
              </form>

            </div>

          </div>
        )}

      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={(u) => setSession({ user: u, token: "active" })}
      />
    </div>
  );
}
