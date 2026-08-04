"use client";

import { useState } from "react";
import Link from "next/link";
import { apiClient } from "@/lib/api-client";
import {
  Building2,
  MapPin,
  Zap,
  Droplets,
  ShieldCheck,
  Upload,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  DollarSign,
  Bed,
  Bath,
  Maximize2,
  Sparkles,
} from "lucide-react";

export default function PublishListingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [propertyType, setPropertyType] = useState("Villa");
  const [rentETB, setRentETB] = useState("");
  const [city, setCity] = useState("Addis Ababa");
  const [subCity, setSubCity] = useState("Bole");
  const [neighborhood, setNeighborhood] = useState("Bole Medhanialem");
  const [address, setAddress] = useState("");
  const [bedrooms, setBedrooms] = useState("4");
  const [bathrooms, setBathrooms] = useState("3.5");
  const [areaSqm, setAreaSqm] = useState("320");
  const [generator, setGenerator] = useState(true);
  const [waterTank, setWaterTank] = useState(true);
  const [parking, setParking] = useState(true);
  const [furnished, setFurnished] = useState(true);
  const [securityGuard, setSecurityGuard] = useState(true);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([
    "/images/hero_property.png",
    "/images/hero_home_away.jpg",
  ]);

  const totalSteps = 5;

  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await apiClient.createProperty({
      title: title || "Bole Medhanialem Property",
      description: description || "Newly published residential property in Bole sub-city.",
      propertyType,
      rentETB: Number(rentETB || 65000),
      bedrooms: Number(bedrooms || 3),
      bathrooms: Number(bathrooms || 2),
      areaSqm: Number(areaSqm || 250),
      generator,
      waterTank,
      parking,
      furnished,
      securityGuard,
    });

    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#1C1B12] font-sans pb-24">
      {/* Page Header */}
      <div className="bg-[#4C061D] text-white py-12 border-b border-[#3B0416]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF8F4]/10 text-[#B4C292] text-xs font-mono-label mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Property Verification Engine</span>
          </div>
          <h1 className="font-serif-display text-3xl sm:text-4xl text-white">
            Publish Property Listing
          </h1>
          <p className="mt-2 text-sm text-[#ECE7DA]/80 max-w-xl">
            List your residential villa, apartment, or studio. Every property undergoes a mandatory field-agent verification before going live.
          </p>

          {/* Stepper Progress Bar */}
          {!submitted && (
            <div className="mt-8 flex items-center justify-between max-w-2xl">
              {[
                { step: 1, label: "Essentials" },
                { step: 2, label: "Location" },
                { step: 3, label: "Infrastructure" },
                { step: 4, label: "Photos" },
                { step: 5, label: "Review & Audit" },
              ].map((item) => (
                <div key={item.step} className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-mono-label text-xs font-bold transition-all ${
                      currentStep === item.step
                        ? "bg-[#B4C292] text-[#4C061D] shadow-md ring-4 ring-[#B4C292]/30"
                        : currentStep > item.step
                        ? "bg-emerald-500 text-white"
                        : "bg-white/10 text-white/50"
                    }`}
                  >
                    {currentStep > item.step ? "✓" : item.step}
                  </div>
                  <span
                    className={`hidden sm:inline text-xs font-mono-label ${
                      currentStep === item.step ? "text-white font-bold" : "text-white/40"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-6">
        <div className="bg-white rounded-3xl border border-[#ECE7DA] shadow-xl p-6 sm:p-10">
          {submitted ? (
            <div className="py-12 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="font-serif-display text-3xl text-[#1C1B12]">
                Listing Submitted for Field Verification!
              </h2>
              <p className="text-sm text-[#736F4E] max-w-md mx-auto">
                Your listing <strong className="text-[#1C1B12]">{title || "Bole Medhanialem Property"}</strong> has been set to <span className="font-mono-label text-[#4C061D] font-bold">PENDING_APPROVAL</span>.
                A Delala field agent will audit the property specs within 24 hours.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/my-listings"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#4C061D] text-white font-mono-label text-xs font-bold hover:bg-[#3B0416] transition-colors"
                >
                  Manage My Listings →
                </Link>
                <Link
                  href="/"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#FAF8F4] border border-[#ECE7DA] text-[#1C1B12] font-mono-label text-xs hover:bg-[#ECE7DA] transition-colors"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* STEP 1: ESSENTIALS */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif-display text-2xl text-[#1C1B12]">
                      Step 1: Listing Essentials
                    </h3>
                    <p className="text-xs text-[#736F4E]">Basic property headline, type, and monthly rental price.</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-mono-label text-[#736F4E] font-bold uppercase mb-1.5">
                        PROPERTY TITLE / HEADLINE *
                      </label>
                      <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Bole Medhanialem Modern G+1 Villa with Standby Generator"
                        className="w-full p-4 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] text-sm text-[#1C1B12] focus:outline-none focus:border-[#4C061D]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-mono-label text-[#736F4E] font-bold uppercase mb-1.5">
                          PROPERTY TYPE *
                        </label>
                        <select
                          value={propertyType}
                          onChange={(e) => setPropertyType(e.target.value)}
                          className="w-full p-4 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] text-sm text-[#1C1B12] focus:outline-none focus:border-[#4C061D]"
                        >
                          <option value="Villa">Villa Compound</option>
                          <option value="Apartment">Modern Apartment</option>
                          <option value="Studio">Serviced Studio</option>
                          <option value="G+1 Residence">G+1 Residential Residence</option>
                          <option value="Penthouse">Penthouse</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono-label text-[#736F4E] font-bold uppercase mb-1.5">
                          MONTHLY RENT (ETB) *
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            required
                            value={rentETB}
                            onChange={(e) => setRentETB(e.target.value)}
                            placeholder="65000"
                            className="w-full p-4 pl-12 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] text-sm font-mono-label text-[#1C1B12] focus:outline-none focus:border-[#4C061D]"
                          />
                          <span className="absolute left-4 top-4 font-mono-label text-xs font-bold text-[#4C061D]">
                            ETB
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: LOCATION */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif-display text-2xl text-[#1C1B12]">
                      Step 2: Location & Address
                    </h3>
                    <p className="text-xs text-[#736F4E]">Specify Ethiopian city, sub-city, and neighborhood location.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono-label text-[#736F4E] font-bold uppercase mb-1.5">
                        CITY *
                      </label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full p-4 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] text-sm text-[#1C1B12]"
                      >
                        <option value="Addis Ababa">Addis Ababa</option>
                        <option value="Hawassa">Hawassa</option>
                        <option value="Adama">Adama</option>
                        <option value="Bahir Dar">Bahir Dar</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono-label text-[#736F4E] font-bold uppercase mb-1.5">
                        SUB-CITY *
                      </label>
                      <select
                        value={subCity}
                        onChange={(e) => setSubCity(e.target.value)}
                        className="w-full p-4 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] text-sm text-[#1C1B12]"
                      >
                        <option value="Bole">Bole</option>
                        <option value="Kirkos">Kirkos (Kazanchis)</option>
                        <option value="Nifas Silk">Nifas Silk (Old Airport)</option>
                        <option value="Yeka">Yeka (CMC)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono-label text-[#736F4E] font-bold uppercase mb-1.5">
                        NEIGHBORHOOD *
                      </label>
                      <input
                        type="text"
                        value={neighborhood}
                        onChange={(e) => setNeighborhood(e.target.value)}
                        placeholder="e.g. Medhanialem Church Area"
                        className="w-full p-4 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] text-sm text-[#1C1B12]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono-label text-[#736F4E] font-bold uppercase mb-1.5">
                      STREET ADDRESS & LANDMARK
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. Next to Atlas Hotel, Ring Road Access"
                      className="w-full p-4 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] text-sm text-[#1C1B12]"
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: INFRASTRUCTURE */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif-display text-2xl text-[#1C1B12]">
                      Step 3: Verified Infrastructure & Specs
                    </h3>
                    <p className="text-xs text-[#736F4E]">Specify generator capacity, reserve water tanks, and bedrooms.</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono-label text-[#736F4E] font-bold uppercase mb-1.5">BEDROOMS</label>
                      <input
                        type="number"
                        value={bedrooms}
                        onChange={(e) => setBedrooms(e.target.value)}
                        className="w-full p-4 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] font-mono-label text-sm text-[#1C1B12]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono-label text-[#736F4E] font-bold uppercase mb-1.5">BATHROOMS</label>
                      <input
                        type="number"
                        step="0.5"
                        value={bathrooms}
                        onChange={(e) => setBathrooms(e.target.value)}
                        className="w-full p-4 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] font-mono-label text-sm text-[#1C1B12]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono-label text-[#736F4E] font-bold uppercase mb-1.5">AREA (SQM)</label>
                      <input
                        type="number"
                        value={areaSqm}
                        onChange={(e) => setAreaSqm(e.target.value)}
                        className="w-full p-4 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] font-mono-label text-sm text-[#1C1B12]"
                      />
                    </div>
                  </div>

                  {/* Infrastructure Checkboxes */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <label className="p-4 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] flex items-center justify-between cursor-pointer hover:border-[#4C061D]">
                      <div className="flex items-center gap-3">
                        <Zap className="w-5 h-5 text-[#4C061D]" />
                        <div>
                          <div className="font-bold text-xs text-[#1C1B12]">Standby Generator</div>
                          <div className="text-[10px] text-[#736F4E]">Automatic 45kVA capacity</div>
                        </div>
                      </div>
                      <input type="checkbox" checked={generator} onChange={(e) => setGenerator(e.target.checked)} className="w-5 h-5 accent-[#4C061D]" />
                    </label>

                    <label className="p-4 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] flex items-center justify-between cursor-pointer hover:border-[#4C061D]">
                      <div className="flex items-center gap-3">
                        <Droplets className="w-5 h-5 text-blue-600" />
                        <div>
                          <div className="font-bold text-xs text-[#1C1B12]">Reserve Water Tank</div>
                          <div className="text-[10px] text-[#736F4E]">12,000L Overhead tank</div>
                        </div>
                      </div>
                      <input type="checkbox" checked={waterTank} onChange={(e) => setWaterTank(e.target.checked)} className="w-5 h-5 accent-[#4C061D]" />
                    </label>

                    <label className="p-4 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] flex items-center justify-between cursor-pointer hover:border-[#4C061D]">
                      <div className="flex items-center gap-3">
                        <ShieldCheck className="w-5 h-5 text-[#736F4E]" />
                        <div>
                          <div className="font-bold text-xs text-[#1C1B12]">24/7 Perimeter Security</div>
                          <div className="text-[10px] text-[#736F4E]">Electric fence & guardhouse</div>
                        </div>
                      </div>
                      <input type="checkbox" checked={securityGuard} onChange={(e) => setSecurityGuard(e.target.checked)} className="w-5 h-5 accent-[#4C061D]" />
                    </label>

                    <label className="p-4 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] flex items-center justify-between cursor-pointer hover:border-[#4C061D]">
                      <div className="flex items-center gap-3">
                        <Building2 className="w-5 h-5 text-[#736F4E]" />
                        <div>
                          <div className="font-bold text-xs text-[#1C1B12]">Fully Furnished</div>
                          <div className="text-[10px] text-[#736F4E]">Move-in ready appliances</div>
                        </div>
                      </div>
                      <input type="checkbox" checked={furnished} onChange={(e) => setFurnished(e.target.checked)} className="w-5 h-5 accent-[#4C061D]" />
                    </label>
                  </div>
                </div>
              )}

              {/* STEP 4: PHOTOS */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif-display text-2xl text-[#1C1B12]">
                      Step 4: Property Photo Gallery
                    </h3>
                    <p className="text-xs text-[#736F4E]">Upload high-resolution interior, exterior, and generator room photos.</p>
                  </div>

                  <div className="p-8 border-2 border-dashed border-[#ECE7DA] rounded-3xl bg-[#FAF8F4] text-center space-y-3 cursor-pointer hover:border-[#4C061D] transition-colors">
                    <div className="w-12 h-12 rounded-2xl bg-[#4C061D] text-white flex items-center justify-center mx-auto shadow-md">
                      <Upload className="w-6 h-6 text-[#B4C292]" />
                    </div>
                    <div className="font-bold text-sm text-[#1C1B12]">
                      Drag & Drop Property Photos Here
                    </div>
                    <div className="text-xs text-[#736F4E] font-mono-label">
                      Supports JPG, PNG, WEBP up to 10MB per image
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {images.map((img, idx) => (
                      <div key={idx} className="relative rounded-2xl overflow-hidden aspect-square border border-[#ECE7DA]">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                        {idx === 0 && (
                          <span className="absolute top-2 left-2 bg-[#4C061D] text-white font-mono-label text-[9px] font-bold px-2 py-0.5 rounded-full">
                            HERO PHOTO
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 5: REVIEW */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif-display text-2xl text-[#1C1B12]">
                      Step 5: Review & Audit Submission
                    </h3>
                    <p className="text-xs text-[#736F4E]">Confirm details before sending to field verification queue.</p>
                  </div>

                  <div className="p-6 rounded-3xl bg-[#FAF8F4] border border-[#ECE7DA] space-y-4">
                    <div className="flex items-center justify-between pb-4 border-b border-[#ECE7DA]">
                      <div>
                        <div className="font-serif-display text-xl text-[#1C1B12]">{title || "Bole Medhanialem Villa"}</div>
                        <div className="text-xs text-[#736F4E]">{subCity}, {city} • {propertyType}</div>
                      </div>
                      <div className="font-mono-label text-lg font-bold text-[#4C061D]">
                        ETB {Number(rentETB || 65000).toLocaleString()}/mo
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono-label text-[#736F4E]">
                      <div>🛏️ {bedrooms} Bedrooms</div>
                      <div>🚿 {bathrooms} Baths</div>
                      <div>📐 {areaSqm} sqm</div>
                      <div>⚡ {generator ? "45kVA Generator" : "No Generator"}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Wizard Navigation Actions */}
              <div className="pt-6 border-t border-[#ECE7DA] flex items-center justify-between">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-6 py-3 rounded-full bg-[#FAF8F4] border border-[#ECE7DA] text-xs font-mono-label font-bold text-[#1C1B12] hover:bg-[#ECE7DA] transition-colors flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                ) : <div />}

                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-8 py-3.5 rounded-full bg-[#4C061D] text-white font-mono-label text-xs font-bold hover:bg-[#3B0416] transition-colors flex items-center gap-2 shadow-md"
                  >
                    <span>Continue to Step {currentStep + 1}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-10 py-4 rounded-full bg-[#4C061D] text-white font-mono-label text-xs font-bold hover:bg-[#3B0416] transition-colors shadow-lg flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#B4C292]" />
                    <span>Submit for Field Audit →</span>
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
