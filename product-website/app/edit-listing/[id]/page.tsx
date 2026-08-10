"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { PROPERTIES } from "@/lib/data";
import { ArrowLeft, Save, CheckCircle2, Building2, Zap, Droplets, ShieldCheck } from "lucide-react";

export default function EditListingPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const property = PROPERTIES.find((p) => p.id === id || p.slug === id) || PROPERTIES[0];

  const [title, setTitle] = useState(property.title);
  const [rentETB, setRentETB] = useState(property.rentETB.toString());
  const [bedrooms, setBedrooms] = useState(property.bedrooms.toString());
  const [bathrooms, setBathrooms] = useState(property.bathrooms.toString());
  const [generator, setGenerator] = useState(property.generator);
  const [waterTank, setWaterTank] = useState(property.waterTank);
  const [description, setDescription] = useState(property.description);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => {
      router.push("/my-listings");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-canvas text-ink font-sans pb-24">
      {/* Header */}
      <div className="bg-primary text-white py-10 border-b border-primary-hover">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link href="/my-listings" className="inline-flex items-center gap-1 text-xs font-mono-label text-accent hover:text-white mb-3">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to My Listings</span>
          </Link>
          <h1 className="font-serif-display text-3xl text-white">
            Edit Property Listing
          </h1>
          <p className="text-xs text-line/80 mt-1">
            Update rental pricing, infrastructure specs, or property description.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-8">
        <div className="bg-surface rounded-panel border border-line shadow-xl p-6 sm:p-8">
          {saved ? (
            <div className="py-8 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h2 className="font-serif-display text-2xl">Listing Changes Saved!</h2>
              <p className="text-xs text-muted">Redirecting to your listings dashboard...</p>
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-micro font-mono-label text-muted font-bold uppercase mb-1">
                  PROPERTY TITLE
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-4 rounded-card bg-canvas border border-line text-sm text-ink"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-micro font-mono-label text-muted font-bold uppercase mb-1">
                    MONTHLY RENT (ETB)
                  </label>
                  <input
                    type="number"
                    required
                    value={rentETB}
                    onChange={(e) => setRentETB(e.target.value)}
                    className="w-full p-4 rounded-card bg-canvas border border-line font-mono-label text-sm text-ink"
                  />
                </div>
                <div>
                  <label className="block text-micro font-mono-label text-muted font-bold uppercase mb-1">
                    BEDROOMS
                  </label>
                  <input
                    type="number"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    className="w-full p-4 rounded-card bg-canvas border border-line font-mono-label text-sm text-ink"
                  />
                </div>
                <div>
                  <label className="block text-micro font-mono-label text-muted font-bold uppercase mb-1">
                    BATHROOMS
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={bathrooms}
                    onChange={(e) => setBathrooms(e.target.value)}
                    className="w-full p-4 rounded-card bg-canvas border border-line font-mono-label text-sm text-ink"
                  />
                </div>
              </div>

              <div>
                <label className="block text-micro font-mono-label text-muted font-bold uppercase mb-1">
                  DESCRIPTION & AGENT NOTES
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-4 rounded-card bg-canvas border border-line text-sm text-ink"
                />
              </div>

              {/* Infrastructure Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="p-4 rounded-card bg-canvas border border-line flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    <span className="font-bold text-xs">Standby Generator</span>
                  </div>
                  <input type="checkbox" checked={generator} onChange={(e) => setGenerator(e.target.checked)} className="w-5 h-5 accent-primary" />
                </label>

                <label className="p-4 rounded-card bg-canvas border border-line flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Droplets className="w-5 h-5 text-blue-600" />
                    <span className="font-bold text-xs">Reserve Water Tank</span>
                  </div>
                  <input type="checkbox" checked={waterTank} onChange={(e) => setWaterTank(e.target.checked)} className="w-5 h-5 accent-primary" />
                </label>
              </div>

              <div className="pt-4 border-t border-line flex items-center justify-end gap-3">
                <Link
                  href="/my-listings"
                  className="px-6 py-3 rounded-full bg-canvas border border-line text-xs font-mono-label text-ink"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-full bg-primary text-white font-mono-label text-xs font-bold hover:bg-primary-hover transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4 text-accent" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
