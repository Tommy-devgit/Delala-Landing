"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/use-session";
import { apiClient } from "@/lib/api-client";
import { LocationSelector } from "@/components/location-selector";
import { LocationPicker } from "@/components/map";
import { City, Coordinates } from "@/lib/types";
import { EMPTY_LOCATION_SELECTION, LocationSelection, resolveLocationFocus } from "@/lib/locations";
import { CheckCircle2, Lock, Phone, Star, Upload, X } from "lucide-react";
import { Button, FieldHint, FieldLabel, Input, Panel, Select, Textarea, buttonClasses } from "@/components/ui";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
const MAX_IMAGES = 12;

/** Amenities the marketplace assumes for new listings until a spec editor exists. */
const DEFAULT_AMENITIES = { generator: true, waterTank: true, parking: true } as const;

interface SelectedImage {
  file: File;
  previewUrl: string;
}


export default function PublishListingPage() {
  const router = useRouter();
  const session = useSession();

  // Ethiopian locations come from the API — never from a hardcoded frontend list.
  const [cities, setCities] = useState<City[]>([]);
  const [citiesLoading, setCitiesLoading] = useState(true);
  const [citiesError, setCitiesError] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function loadCities() {
      setCitiesLoading(true);
      try {
        const data = await apiClient.getCities();
        if (cancelled) return;
        setCities(data);
        setCitiesError(data.length === 0 ? "No cities were returned by the Delala location service." : "");
      } catch {
        if (!cancelled) setCitiesError("The location service is unreachable. Please try again shortly.");
      } finally {
        if (!cancelled) setCitiesLoading(false);
      }
    }
    loadCities();
    return () => {
      cancelled = true;
    };
  }, []);

  // Property information
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [propertyType, setPropertyType] = useState("Villa");
  const [listingType, setListingType] = useState<"Rent" | "Sale">("Rent");
  const [price, setPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("3");
  const [bathrooms, setBathrooms] = useState("2");
  const [area, setArea] = useState("250");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Structured location (for search, filtering and SEO) and the map pin (for
  // geographic display) are kept deliberately separate.
  const [location, setLocation] = useState<LocationSelection>(EMPTY_LOCATION_SELECTION);
  const [pin, setPin] = useState<Coordinates | null>(null);

  const mapFocus = useMemo(() => resolveLocationFocus(cities, location), [cities, location]);

  // Photos
  const [images, setImages] = useState<SelectedImage[]>([]);
  const [primaryIndex, setPrimaryIndex] = useState(0);

  const [isPublishing, setIsPublishing] = useState(false);
  const [error, setError] = useState("");

  // Preview object URLs are owned by this page and must be released.
  useEffect(() => {
    return () => images.forEach((image) => URL.revokeObjectURL(image.previewUrl));
    // Cleanup only needs to run on unmount; removals revoke their own URL.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return;
      const incoming = Array.from(fileList);
      const rejected: string[] = [];

      setImages((prev) => {
        const room = MAX_IMAGES - prev.length;
        const accepted: SelectedImage[] = [];

        for (const file of incoming) {
          if (accepted.length >= room) {
            rejected.push(`${file.name} (limit of ${MAX_IMAGES} photos reached)`);
            continue;
          }
          if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
            rejected.push(`${file.name} (only JPG, PNG or WEBP)`);
            continue;
          }
          if (file.size > MAX_IMAGE_BYTES) {
            rejected.push(`${file.name} (larger than 8MB)`);
            continue;
          }
          accepted.push({ file, previewUrl: URL.createObjectURL(file) });
        }

        return accepted.length > 0 ? [...prev, ...accepted] : prev;
      });

      setError(rejected.length > 0 ? `Some photos were skipped: ${rejected.join(", ")}.` : "");
    },
    []
  );

  const handleRemoveImage = (index: number) => {
    setImages((prev) => {
      const removed = prev[index];
      if (removed) URL.revokeObjectURL(removed.previewUrl);
      return prev.filter((_, i) => i !== index);
    });
    setPrimaryIndex((current) => {
      if (current === index) return 0;
      return current > index ? current - 1 : current;
    });
  };

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
    if (!location.city) {
      setError("Please select the city where the property is located.");
      return;
    }

    setIsPublishing(true);

    try {
      // Hero photo first — the API treats the first upload as the hero image.
      const orderedImages = [...images];
      if (primaryIndex > 0 && primaryIndex < orderedImages.length) {
        const [primary] = orderedImages.splice(primaryIndex, 1);
        orderedImages.unshift(primary);
      }

      const created = await apiClient.createProperty(
        {
          title,
          description: description || "Newly published residential property.",
          propertyType,
          listingType,
          rentETB: price,
          city: location.city,
          subCity: location.subCity,
          neighborhood: location.neighborhood,
          address,
          phone,
          bedrooms,
          bathrooms,
          areaSqm: area,
          brokerId: session.user.id,
          ...DEFAULT_AMENITIES,
          latitude: pin?.latitude ?? null,
          longitude: pin?.longitude ?? null,
          images: orderedImages.map((image) => image.file),
        },
        session.token
      );

      router.push(`/property/${created.slug || created.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while publishing your listing.");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-canvas text-ink font-sans pb-24">
      {/* Simple Clean Header */}
      <div className="bg-primary text-white py-10 border-b border-primary-hover">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="font-serif-display text-3xl sm:text-4xl text-white font-light">
            List Your Property
          </h1>
          <p className="mt-1 text-sm text-line/80">
            Photos, details and location — everything on one page.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-4">
        {!session?.user ? (
          <div className="p-6 sm:p-8 text-center space-y-5 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto shadow-xs">
              <Lock className="w-8 h-8" aria-hidden="true" />
            </div>
            <h2 className="font-serif-display text-3xl text-ink">
              Sign in or Create an Account to List a Property
            </h2>
            <p className="text-xs sm:text-sm text-muted max-w-md mx-auto leading-relaxed">
              To post a property on Delala, you have to sign in with an existing account or create a new account first.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/auth/signin?callbackUrl=/publish"
                className={buttonClasses({ size: "lg", className: "w-full sm:w-auto" })}
              >
                Sign in or create account
              </Link>
              <Link
                href="/"
                className={buttonClasses({ variant: "secondary", size: "lg", className: "w-full sm:w-auto" })}
              >
                Explore marketplace
              </Link>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-surface rounded-panel border border-line shadow-sm p-6 sm:p-8 space-y-9"
          >
            {error && (
              <div
                role="alert"
                className="p-4 rounded-card bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium"
              >
                {error}
              </div>
            )}

            {/* PHOTOS */}
            <section className="space-y-4">
              <div>
                <h2 className="font-serif-display text-2xl text-ink">Photos</h2>
                <p className="text-xs text-muted">
                  Add up to {MAX_IMAGES} photos. Use the star to choose the main photo.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <label
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    addFiles(e.dataTransfer.files);
                  }}
                  className="relative aspect-square rounded-card border-2 border-dashed border-line bg-canvas flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary transition-colors focus-within:border-primary"
                >
                  <input
                    type="file"
                    multiple
                    accept={ACCEPTED_IMAGE_TYPES.join(",")}
                    onChange={(e) => {
                      addFiles(e.target.files);
                      e.target.value = "";
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    aria-label="Add property photos"
                  />
                  <span className="w-10 h-10 rounded-card bg-primary text-accent flex items-center justify-center shadow-md">
                    <Upload className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <span className="text-micro font-bold text-ink">Add photos</span>
                  <span className="text-label font-mono-label text-muted">JPG, PNG or WEBP</span>
                </label>

                {images.map((image, idx) => (
                  <div
                    key={image.previewUrl}
                    className={`relative rounded-card overflow-hidden aspect-square border-2 transition-all ${
                      primaryIndex === idx
                        ? "border-primary ring-2 ring-primary/20 shadow-md"
                        : "border-line"
                    }`}
                  >
                    <img src={image.previewUrl} alt={`Property photo ${idx + 1}`} className="w-full h-full object-cover" />

                    <button
                      type="button"
                      onClick={() => setPrimaryIndex(idx)}
                      className={`absolute top-2 left-2 p-1.5 rounded-full backdrop-blur-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                        primaryIndex === idx ? "bg-primary text-white" : "bg-black/40 text-white/70 hover:text-white"
                      }`}
                      aria-label={`Set photo ${idx + 1} as the main photo`}
                      aria-pressed={primaryIndex === idx}
                    >
                      <Star className={`w-3.5 h-3.5 ${primaryIndex === idx ? "fill-white" : ""}`} aria-hidden="true" />
                    </button>

                    {primaryIndex === idx && (
                      <span className="absolute bottom-2 left-2 bg-primary text-white font-mono-label text-label font-bold px-2 py-0.5 rounded-full shadow-xs">
                        MAIN
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white hover:bg-rose-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                      aria-label={`Remove photo ${idx + 1}`}
                    >
                      <X className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <hr className="border-line" />

            {/* PROPERTY INFORMATION */}
            <section className="space-y-4">
              <h2 className="font-serif-display text-2xl text-ink">Property information</h2>

              <div>
                <FieldLabel htmlFor="property-title" >
                  Property title *
                </FieldLabel>
                <Input
                  id="property-title"
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Modern 3 Bedroom House in Bole"
                  
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <FieldLabel htmlFor="property-type" >
                    Property type *
                  </FieldLabel>
                  <Select
                    id="property-type"
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    
                  >
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Villa">Villa</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Land">Land</option>
                  </Select>
                </div>

                <div>
                  <FieldLabel htmlFor="listing-type" >
                    Listing type *
                  </FieldLabel>
                  <Select
                    id="listing-type"
                    value={listingType}
                    onChange={(e) => setListingType(e.target.value as "Rent" | "Sale")}
                    
                  >
                    <option value="Rent">For Rent</option>
                    <option value="Sale">For Sale</option>
                  </Select>
                </div>

                <div>
                  <FieldLabel htmlFor="property-price" >
                    Price (ETB) *
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      id="property-price"
                      type="number"
                      min="0"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="65000"
                      className="pl-12 font-mono-label"
                    />
                    <span className="absolute left-3.5 top-3 font-mono-label text-xs font-bold text-primary">
                      ETB
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <FieldLabel htmlFor="property-bedrooms" >
                    Bedrooms
                  </FieldLabel>
                  <Input
                    id="property-bedrooms"
                    type="number"
                    min="0"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    className="font-mono-label"
                  />
                </div>

                <div>
                  <FieldLabel htmlFor="property-bathrooms" >
                    Bathrooms
                  </FieldLabel>
                  <Input
                    id="property-bathrooms"
                    type="number"
                    min="0"
                    step="0.5"
                    value={bathrooms}
                    onChange={(e) => setBathrooms(e.target.value)}
                    className="font-mono-label"
                  />
                </div>

                <div>
                  <FieldLabel htmlFor="property-area" >
                    Area (sqm)
                  </FieldLabel>
                  <Input
                    id="property-area"
                    type="number"
                    min="0"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="font-mono-label"
                  />
                </div>
              </div>
            </section>

            <hr className="border-line" />

            {/* LOCATION */}
            <section className="space-y-4">
              <div>
                <h2 className="font-serif-display text-2xl text-ink">Location</h2>
                <p className="text-xs text-muted">
                  Choose the city, sub-city and neighborhood renters will search by.
                </p>
              </div>

              <LocationSelector
                cities={cities}
                value={location}
                onChange={setLocation}
                loading={citiesLoading}
                error={citiesError}
              />

              <div>
                <FieldLabel htmlFor="property-address" >
                  Street address or landmark (optional)
                </FieldLabel>
                <Input
                  id="property-address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. Near Atlas Hotel, Ring Road access"
                  
                />
              </div>
            </section>

            <hr className="border-line" />

            {/* APPROXIMATE MAP LOCATION */}
            <section className="space-y-4">
              <div>
                <h2 className="font-serif-display text-2xl text-ink">
                  Approximate location
                </h2>
                <p className="text-xs text-muted">
                  Set the approximate location of the property on the map. You never have to share
                  the exact address of a private home.
                </p>
              </div>

              <LocationPicker
                value={pin}
                onChange={setPin}
                focus={mapFocus.coordinates}
                focusZoom={mapFocus.zoom}
              />
            </section>

            <hr className="border-line" />

            {/* DESCRIPTION & CONTACT */}
            <section className="space-y-4">
              <div>
                <FieldLabel htmlFor="property-description" >
                  Description
                </FieldLabel>
                <Textarea
                  id="property-description"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the property layout, water tank, standby generator, and neighborhood features..."
                  
                />
              </div>

              <div>
                <FieldLabel htmlFor="property-phone" >
                  Contact phone *
                </FieldLabel>
                <div className="relative">
                  <Input
                    id="property-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+251 911 234 567"
                    className="pl-10 font-mono-label"
                  />
                  <Phone className="w-4 h-4 text-primary absolute left-3.5 top-3.5" aria-hidden="true" />
                </div>
                <FieldHint>
                  This number appears on the front of your listing card so renters can call you directly.
                </FieldHint>
              </div>
            </section>

            {/* PUBLISH */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-muted">
                By publishing, your property will immediately be posted on the marketplace.
              </div>

              <Button type="submit" size="lg" disabled={isPublishing} className="w-full sm:w-auto">
                <CheckCircle2 className="w-4 h-4 text-accent" aria-hidden="true" />
                <span>{isPublishing ? "Publishing…" : "Publish property"}</span>
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
