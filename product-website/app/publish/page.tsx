"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient, UserSession } from "@/lib/auth-client";
import {
  Building2,
  MapPin,
  Upload,
  CheckCircle2,
  Lock,
  X,
  Star,
  Sparkles,
  ArrowRight,
  Plus,
  Home,
  Tag,
  DollarSign,
} from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

// Ethiopian Location Hierarchy Tree
const LOCATION_TREE: Record<
  string,
  Record<string, string[]>
> = {
  "Addis Ababa": {
    Bole: ["Bole Medhanialem", "Gerji", "Bole Atlas", "Bole Bulbula"],
    Kirkos: ["Kazanchis UN Quarter", "Bole Road", "Meskel Square"],
    "Nifas Silk": ["Old Airport", "Gotera", "Bisrate Gabriel"],
    Yeka: ["CMC Sunshine", "Ayat", "Megenagna"],
  },
  Hawassa: {
    Tabor: ["Lake View Riviera", "Haile Resort Area", "Piazza"],
    Hawela: ["Referral Area", "Industrial Park Quarter"],
  },
  Adama: {
    Bole: ["Expressway Gate", "Posta Bet", "Bishoftu Road"],
  },
  "Bahir Dar": {
    "Belay Zeleke": ["Tana Waterfront", "Kebele 11", "Palace Zone"],
  },
};

export default function PublishListingPage() {
  const router = useRouter();
  const [session, setSession] = useState<{ user: UserSession; token: string } | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    setSession(authClient.getSession());
    window.addEventListener("delala_auth_change", () => setSession(authClient.getSession()));
  }, []);

  // Form Fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [propertyType, setPropertyType] = useState("Villa");
  const [listingType, setListingType] = useState<"Rent" | "Sale">("Rent");
  const [price, setPrice] = useState("");
  const [country] = useState("Ethiopia");
  const [city, setCity] = useState("Addis Ababa");
  const [subCity, setSubCity] = useState("Bole");
  const [neighborhood, setNeighborhood] = useState("Bole Medhanialem");
  const [address, setAddress] = useState("");
  const [bedrooms, setBedrooms] = useState("3");
  const [bathrooms, setBathrooms] = useState("2");
  const [area, setArea] = useState("250");
  const [generator, setGenerator] = useState(true);
  const [waterTank, setWaterTank] = useState(true);
  const [parking, setParking] = useState(true);

  // Image Upload State
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [primaryIndex, setPrimaryIndex] = useState(0);

  const [isPublishing, setIsPublishing] = useState(false);
  const [error, setError] = useState("");

  // Update Sub Cities when City changes
  const handleCityChange = (newCity: string) => {
    setCity(newCity);
    const subCities = Object.keys(LOCATION_TREE[newCity] || {});
    if (subCities.length > 0) {
      const firstSubCity = subCities[0];
      setSubCity(firstSubCity);
      const neighborhoods = LOCATION_TREE[newCity][firstSubCity] || [];
      if (neighborhoods.length > 0) setNeighborhood(neighborhoods[0]);
    }
  };

  // Update Neighborhoods when SubCity changes
  const handleSubCityChange = (newSubCity: string) => {
    setSubCity(newSubCity);
    const neighborhoods = LOCATION_TREE[city]?.[newSubCity] || [];
    if (neighborhoods.length > 0) setNeighborhood(neighborhoods[0]);
  };

  // Image Selection Handler
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles((prev) => [...prev, ...files]);
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prev) => [...prev, ...newPreviews]);
    }
  };

  // Drop File Handler
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      const files = Array.from(e.dataTransfer.files);
      setSelectedFiles((prev) => [...prev, ...files]);
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prev) => [...prev, ...newPreviews]);
    }
  };

  // Remove Selected Image
  const handleRemoveImage = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
    if (primaryIndex === index) {
      setPrimaryIndex(0);
    } else if (primaryIndex > index) {
      setPrimaryIndex((prev) => prev - 1);
    }
  };

  // Handle Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!session?.user) {
      router.push("/auth/signin?callbackUrl=/publish");
      return;
    }

    if (!title.trim()) {
      setError("Please provide a property title.");
      return;
    }

    if (!price || Number(price) <= 0) {
      setError("Please specify a valid price.");
      return;
    }

    setIsPublishing(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description || "Newly published residential property.");
      formData.append("propertyType", propertyType);
      formData.append("listingType", listingType);
      formData.append("rentETB", price);
      formData.append("price", price);
      formData.append("city", city);
      formData.append("subCity", subCity);
      formData.append("neighborhood", neighborhood);
      formData.append("location_id", `${city}-${subCity}-${neighborhood}`);
      formData.append("address", address);
      formData.append("bedrooms", bedrooms);
      formData.append("bathrooms", bathrooms);
      formData.append("areaSqm", area);
      formData.append("generator", String(generator));
      formData.append("waterTank", String(waterTank));
      formData.append("parking", String(parking));

      // Append images for Cloudflare R2 Upload backend handler
      if (selectedFiles.length > 0) {
        // Ensure primary image is placed first in array
        const reorderedFiles = [...selectedFiles];
        if (primaryIndex > 0 && primaryIndex < reorderedFiles.length) {
          const [primaryFile] = reorderedFiles.splice(primaryIndex, 1);
          reorderedFiles.unshift(primaryFile);
        }
        reorderedFiles.forEach((file) => formData.append("images", file));
      }

      const token = localStorage.getItem("delala_token");
      const res = await fetch(`${API_BASE}/properties`, {
        method: "POST",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: formData,
      });

      const created = await res.json();
      if (!res.ok) {
        throw new Error(created.message || "Failed to publish property.");
      }

      // Success: Redirect to property details page
      router.push(`/property/${created.slug || created.id}`);
    } catch (err: any) {
      setError(err.message || "An error occurred while publishing listing.");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#1C1B12] font-sans pb-24">
      {/* Simple Clean Header */}
      <div className="bg-[#4C061D] text-white py-10 border-b border-[#3B0416]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="font-mono-label text-[10px] text-[#B4C292] bg-white/10 px-3 py-1 rounded-full inline-block mb-2">
            SINGLE-PAGE LISTING CREATOR
          </span>
          <h1 className="font-serif-display text-3xl sm:text-4xl text-white font-light">
            Post Your Property
          </h1>
          <p className="mt-1 text-sm text-[#ECE7DA]/80">
            Share your house and find interested renters/buyers
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-4">
        {!session?.user ? (
          <div className="bg-white rounded-3xl border border-[#ECE7DA] shadow-xl p-8 sm:p-12 text-center space-y-5 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#4C061D]/10 text-[#4C061D] flex items-center justify-center mx-auto shadow-xs">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="font-serif-display text-3xl text-[#1C1B12]">
              Sign in or Create an Account to List a Property
            </h2>
            <p className="text-xs sm:text-sm text-[#736F4E] max-w-md mx-auto leading-relaxed">
              To post a property on Delala, you have to sign in with an existing account or create a new account first.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/auth/signin?callbackUrl=/publish"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#4C061D] text-white font-mono-label text-xs font-bold hover:bg-[#3B0416] transition-colors shadow-md text-center"
              >
                Sign In / Create Account →
              </Link>
              <Link
                href="/"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#FAF8F4] border border-[#ECE7DA] text-[#1C1B12] font-mono-label text-xs hover:bg-[#ECE7DA] transition-colors"
              >
                Explore Marketplace
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-[#ECE7DA] shadow-xl p-6 sm:p-10 space-y-10">
            {error && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                {error}
              </div>
            )}

            {/* SECTION 1: PROPERTY IMAGES */}
            <div className="space-y-4">
              <div>
                <h2 className="font-serif-display text-2xl text-[#1C1B12] flex items-center gap-2">
                  <span>1. Property Images</span>
                  <span className="text-xs font-mono-label text-[#736F4E] font-normal">(Cloudflare R2 Cloud Storage)</span>
                </h2>
                <p className="text-xs text-[#736F4E]">Upload high-res photos. Click the star icon to set the primary hero photo.</p>
              </div>

              {/* Drag and Drop Zone */}
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className="p-8 border-2 border-dashed border-[#ECE7DA] rounded-3xl bg-[#FAF8F4] text-center space-y-3 cursor-pointer hover:border-[#4C061D] transition-colors relative"
              >
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="w-12 h-12 rounded-2xl bg-[#4C061D] text-white flex items-center justify-center mx-auto shadow-md">
                  <Upload className="w-6 h-6 text-[#B4C292]" />
                </div>
                <div className="font-bold text-sm text-[#1C1B12]">
                  Drag & Drop Property Photos or <span className="text-[#4C061D] underline">Browse Files</span>
                </div>
                <div className="text-xs text-[#736F4E] font-mono-label">
                  Supports JPG, PNG, WEBP. Uploads directly to Cloudflare R2.
                </div>
              </div>

              {/* Image Previews Grid */}
              {previewUrls.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                  {previewUrls.map((url, idx) => (
                    <div
                      key={idx}
                      className={`relative rounded-2xl overflow-hidden aspect-square border-2 transition-all group ${
                        primaryIndex === idx ? "border-[#4C061D] ring-2 ring-[#4C061D]/20 shadow-md" : "border-[#ECE7DA]"
                      }`}
                    >
                      <img src={url} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />

                      {/* Primary Hero Star Badge */}
                      <button
                        type="button"
                        onClick={() => setPrimaryIndex(idx)}
                        className={`absolute top-2 left-2 p-1.5 rounded-full backdrop-blur-md transition-colors ${
                          primaryIndex === idx ? "bg-[#4C061D] text-white" : "bg-black/40 text-white/70 hover:text-white"
                        }`}
                        title="Set as Primary Image"
                      >
                        <Star className={`w-3.5 h-3.5 ${primaryIndex === idx ? "fill-white" : ""}`} />
                      </button>

                      {/* Primary Badge Label */}
                      {primaryIndex === idx && (
                        <span className="absolute bottom-2 left-2 bg-[#4C061D] text-white font-mono-label text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                          PRIMARY
                        </span>
                      )}

                      {/* Remove Image Button */}
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white hover:bg-rose-600 transition-colors"
                        title="Remove Image"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <hr className="border-[#ECE7DA]" />

            {/* SECTION 2: LOCATION SELECTION (Cascading Hierarchy) */}
            <div className="space-y-4">
              <div>
                <h2 className="font-serif-display text-2xl text-[#1C1B12]">
                  2. Location Selection
                </h2>
                <p className="text-xs text-[#736F4E]">Select country, city, sub-city, and neighborhood.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-[10px] font-mono-label text-[#736F4E] font-bold uppercase mb-1">
                    COUNTRY *
                  </label>
                  <input
                    type="text"
                    disabled
                    value={country}
                    className="w-full p-3.5 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] text-xs font-bold text-[#1C1B12]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono-label text-[#736F4E] font-bold uppercase mb-1">
                    CITY *
                  </label>
                  <select
                    value={city}
                    onChange={(e) => handleCityChange(e.target.value)}
                    className="w-full p-3.5 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] text-xs text-[#1C1B12] focus:outline-none focus:border-[#4C061D]"
                  >
                    {Object.keys(LOCATION_TREE).map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono-label text-[#736F4E] font-bold uppercase mb-1">
                    SUB CITY *
                  </label>
                  <select
                    value={subCity}
                    onChange={(e) => handleSubCityChange(e.target.value)}
                    className="w-full p-3.5 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] text-xs text-[#1C1B12] focus:outline-none focus:border-[#4C061D]"
                  >
                    {Object.keys(LOCATION_TREE[city] || {}).map((sc) => (
                      <option key={sc} value={sc}>
                        {sc}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono-label text-[#736F4E] font-bold uppercase mb-1">
                    NEIGHBORHOOD *
                  </label>
                  <select
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    className="w-full p-3.5 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] text-xs text-[#1C1B12] focus:outline-none focus:border-[#4C061D]"
                  >
                    {(LOCATION_TREE[city]?.[subCity] || []).map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono-label text-[#736F4E] font-bold uppercase mb-1">
                  OPTIONAL STREET ADDRESS & LANDMARK
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. Near Atlas Hotel, Ring Road access"
                  className="w-full p-3.5 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] text-xs text-[#1C1B12] focus:outline-none focus:border-[#4C061D]"
                />
              </div>
            </div>

            <hr className="border-[#ECE7DA]" />

            {/* SECTION 3: PROPERTY DETAILS */}
            <div className="space-y-4">
              <div>
                <h2 className="font-serif-display text-2xl text-[#1C1B12]">
                  3. Property Details
                </h2>
                <p className="text-xs text-[#736F4E]">Specify property type, listing type, price, and specs.</p>
              </div>

              {/* Title & Type */}
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono-label text-[#736F4E] font-bold uppercase mb-1">
                    PROPERTY TITLE *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Bole Medhanialem Executive Villa Compound"
                    className="w-full p-3.5 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] text-xs text-[#1C1B12] focus:outline-none focus:border-[#4C061D]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono-label text-[#736F4E] font-bold uppercase mb-1">
                      PROPERTY TYPE *
                    </label>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full p-3.5 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] text-xs text-[#1C1B12] focus:outline-none focus:border-[#4C061D]"
                    >
                      <option value="Apartment">Apartment</option>
                      <option value="House">House</option>
                      <option value="Villa">Villa</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Land">Land</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono-label text-[#736F4E] font-bold uppercase mb-1">
                      LISTING TYPE *
                    </label>
                    <select
                      value={listingType}
                      onChange={(e) => setListingType(e.target.value as "Rent" | "Sale")}
                      className="w-full p-3.5 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] text-xs text-[#1C1B12] focus:outline-none focus:border-[#4C061D]"
                    >
                      <option value="Rent">For Rent</option>
                      <option value="Sale">For Sale</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono-label text-[#736F4E] font-bold uppercase mb-1">
                      PRICE (ETB) *
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="65000"
                        className="w-full p-3.5 pl-12 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] text-xs font-mono-label text-[#1C1B12] focus:outline-none focus:border-[#4C061D]"
                      />
                      <span className="absolute left-3.5 top-3 font-mono-label text-xs font-bold text-[#4C061D]">
                        ETB
                      </span>
                    </div>
                  </div>
                </div>

                {/* Optional Specs */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono-label text-[#736F4E] font-bold uppercase mb-1">
                      BEDROOMS (OPTIONAL)
                    </label>
                    <input
                      type="number"
                      value={bedrooms}
                      onChange={(e) => setBedrooms(e.target.value)}
                      className="w-full p-3.5 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] font-mono-label text-xs text-[#1C1B12]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono-label text-[#736F4E] font-bold uppercase mb-1">
                      BATHROOMS (OPTIONAL)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      value={bathrooms}
                      onChange={(e) => setBathrooms(e.target.value)}
                      className="w-full p-3.5 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] font-mono-label text-xs text-[#1C1B12]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono-label text-[#736F4E] font-bold uppercase mb-1">
                      AREA SQM (OPTIONAL)
                    </label>
                    <input
                      type="number"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="w-full p-3.5 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] font-mono-label text-xs text-[#1C1B12]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono-label text-[#736F4E] font-bold uppercase mb-1">
                    DESCRIPTION *
                  </label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the property layout, water tank, standby generator, and neighborhood features..."
                    className="w-full p-3.5 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] text-xs text-[#1C1B12] focus:outline-none focus:border-[#4C061D]"
                  />
                </div>
              </div>
            </div>

            <hr className="border-[#ECE7DA]" />

            {/* SECTION 4: PUBLISH ACTION */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-[#736F4E]">
                By publishing, your property will immediately be submitted to the Delala marketplace database.
              </div>

              <button
                type="submit"
                disabled={isPublishing}
                className="w-full sm:w-auto px-10 py-4 rounded-full bg-[#4C061D] text-white font-mono-label text-xs font-bold hover:bg-[#3B0416] transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-[#B4C292]" />
                <span>{isPublishing ? "Publishing..." : "Publish Property"}</span>
              </button>
            </div>
          </form>
        )}
      </div>

    </div>
  );
}
