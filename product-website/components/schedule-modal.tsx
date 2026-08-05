"use client";

import { useState } from "react";
import { X, Calendar, Clock, Phone, CheckCircle2, ShieldCheck, User } from "lucide-react";
import { Property } from "@/lib/types";
import { apiClient } from "@/lib/api-client";

export function ScheduleModal({
  isOpen,
  onClose,
  property,
}: {
  isOpen: boolean;
  onClose: () => void;
  property: Property;
}) {
  const [selectedDate, setSelectedDate] = useState("Tomorrow (10:00 AM)");
  const [seekerName, setSeekerName] = useState("");
  const [seekerPhone, setSeekerPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await apiClient.scheduleVisit({
      propertyId: property.id,
      seekerName,
      seekerPhone,
      scheduledDate: selectedDate,
      timeSlot: "Morning Slot",
      brokerId: property.broker?.id || "u1",
    });

    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-lg rounded-3xl border border-[#ECE7DA] shadow-2xl overflow-hidden font-sans">
        
        {/* Header */}
        <div className="p-6 bg-[#FAF8F4] border-b border-[#ECE7DA] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#4C061D] text-white flex items-center justify-center shadow-xs">
              <Calendar className="w-5 h-5 text-[#B4C292]" />
            </div>
            <div>
              <h3 className="font-serif-display text-xl text-[#1C1B12]">
                Schedule Walkthrough Visit
              </h3>
              <p className="text-xs text-[#736F4E] font-mono-label">
                Physical Property Walkthrough Appointment
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-xl text-[#736F4E] hover:text-[#4C061D] hover:bg-[#ECE7DA] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-serif-display text-2xl text-[#1C1B12]">Appointment Requested!</h4>
            <p className="text-sm text-[#736F4E] max-w-xs mx-auto">
              Your walkthrough request for <strong className="text-[#1C1B12]">{property.title}</strong> has been sent to property lister <strong className="text-[#4C061D]">{property.broker?.name || "Verified Owner"}</strong>.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-4 px-6 py-3 rounded-full bg-[#4C061D] text-white font-mono-label text-xs font-bold hover:bg-[#3B0416] transition-colors"
            >
              Done & Return to Property
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Property Summary Pill */}
            <div className="p-3.5 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] flex items-center gap-3">
              <img src={property.heroImage || property.galleryImages[0]} alt="" className="w-14 h-14 rounded-xl object-cover" />
              <div>
                <div className="font-bold text-sm text-[#1C1B12] line-clamp-1">{property.title}</div>
                <div className="text-xs font-mono-label text-[#4C061D] font-bold">
                  ETB {property.rentETB.toLocaleString()}/mo • {property.subCity}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono-label text-[#736F4E] font-bold uppercase mb-1">
                PREFERRED DATE & TIME SLOT
              </label>
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#FAF8F4] border border-[#ECE7DA] text-xs font-mono-label text-[#1C1B12] focus:outline-none focus:border-[#4C061D]"
              >
                <option value="Tomorrow (10:00 AM)">Tomorrow at 10:00 AM (Morning Slot)</option>
                <option value="Tomorrow (02:30 PM)">Tomorrow at 02:30 PM (Afternoon Slot)</option>
                <option value="Weekend (11:00 AM)">Saturday at 11:00 AM</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono-label text-[#736F4E] font-bold uppercase mb-1">
                YOUR FULL NAME
              </label>
              <input
                type="text"
                required
                value={seekerName}
                onChange={(e) => setSeekerName(e.target.value)}
                placeholder="e.g. Tewodros Kassahun"
                className="w-full p-3 rounded-xl bg-[#FAF8F4] border border-[#ECE7DA] text-xs text-[#1C1B12] focus:outline-none focus:border-[#4C061D]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono-label text-[#736F4E] font-bold uppercase mb-1">
                PHONE NUMBER FOR CONFIRMATION
              </label>
              <input
                type="tel"
                required
                value={seekerPhone}
                onChange={(e) => setSeekerPhone(e.target.value)}
                placeholder="e.g. +251 911 234 567"
                className="w-full p-3 rounded-xl bg-[#FAF8F4] border border-[#ECE7DA] text-xs font-mono-label text-[#1C1B12] focus:outline-none focus:border-[#4C061D]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-full bg-[#4C061D] text-white font-mono-label text-xs font-bold hover:bg-[#3B0416] transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <span>{isSubmitting ? "Transmitting Request..." : "Confirm Walkthrough Booking →"}</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
