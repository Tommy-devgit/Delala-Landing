"use client";

import { useState } from "react";
import { X, Calendar, Clock, Phone, CheckCircle2, ShieldCheck } from "lucide-react";
import { Property } from "@/lib/types";

export function ScheduleModal({
  isOpen,
  onClose,
  property,
}: {
  isOpen: boolean;
  onClose: () => void;
  property: Property;
}) {
  const [date, setDate] = useState("2026-08-05");
  const [timeSlot, setTimeSlot] = useState("10:00 AM");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-[#FAF8F4] w-full max-w-lg rounded-2xl border border-[#ECE7DA] shadow-2xl overflow-hidden font-sans">
        
        {/* Header */}
        <div className="p-5 bg-white border-b border-[#ECE7DA] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#4C061D]" />
            <h2 className="font-serif-display text-xl font-light text-[#1c1b12]">
              Schedule Field Walkthrough
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-[#FAF8F4] border border-[#ECE7DA] text-[#736F4E] hover:text-[#4C061D]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#B4C292]/30 text-[#4C061D] flex items-center justify-center mb-4 border border-[#B4C292]">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif-display text-2xl font-light text-[#1c1b12] mb-2">
              Walkthrough Request Sent!
            </h3>
            <p className="text-xs text-[#736F4E] max-w-sm mb-6 leading-relaxed">
              Verified Agent <strong className="text-[#4C061D]">{property.broker.name}</strong> will contact you via phone within 15 minutes to confirm your visit for {date} at {timeSlot}.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-lg bg-[#4C061D] text-white font-medium text-xs shadow-sm hover:bg-[#3B3923] transition-colors"
            >
              Done →
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Property Summary */}
            <div className="bg-white p-3.5 rounded-xl border border-[#ECE7DA] flex items-center gap-3">
              <img
                src={property.heroImage}
                alt={property.title}
                className="w-14 h-14 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="font-mono-label text-[9px] text-[#4C061D] font-bold">
                  {property.subCity.toUpperCase()} • ETB {property.rentETB.toLocaleString()}/mo
                </div>
                <div className="font-serif-display text-sm font-light text-[#1c1b12] truncate">
                  {property.title}
                </div>
              </div>
            </div>

            {/* Date Selection */}
            <div>
              <label className="font-mono-label text-[10px] text-[#4C061D] block mb-1.5 font-bold">
                PREFERRED VISIT DATE
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-3 rounded-lg bg-white border border-[#ECE7DA] text-xs font-medium text-[#2D2D2D]"
              />
            </div>

            {/* Time Slot Selection */}
            <div>
              <label className="font-mono-label text-[10px] text-[#4C061D] block mb-1.5 font-bold">
                TIME SLOT
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["09:00 AM", "10:00 AM", "02:00 PM", "04:00 PM", "05:30 PM"].map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTimeSlot(slot)}
                    className={`py-2 text-xs font-medium border rounded-lg transition-colors ${
                      timeSlot === slot
                        ? "bg-[#4C061D] text-white border-[#4C061D] font-bold"
                        : "bg-white text-[#2D2D2D] border-[#ECE7DA] hover:border-[#4C061D]"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-3">
              <div>
                <label className="font-mono-label text-[10px] text-[#4C061D] block mb-1 font-bold">
                  YOUR FULL NAME
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dawit Kebede"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 rounded-lg bg-white border border-[#ECE7DA] text-xs font-medium text-[#2D2D2D]"
                />
              </div>

              <div>
                <label className="font-mono-label text-[10px] text-[#4C061D] block mb-1 font-bold">
                  ETHIOPIAN PHONE NUMBER
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+251 911 ..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 rounded-lg bg-white border border-[#ECE7DA] text-xs font-medium text-[#2D2D2D]"
                />
              </div>
            </div>

            {/* Broker Verification Note */}
            <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-[#ECE7DA] text-[11px] text-[#736F4E]">
              <ShieldCheck className="w-4 h-4 text-[#4C061D] shrink-0" />
              <span>You will meet in-person with ID-checked agent {property.broker.name}. Zero viewing fees.</span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-[#4C061D] text-white font-medium text-xs shadow-sm hover:bg-[#3B3923] transition-colors"
            >
              Confirm Walkthrough Request →
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
