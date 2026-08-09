"use client";

import { AlertCircle, Loader2 } from "lucide-react";
import { City } from "@/lib/types";
import { LocationSelection, getNeighborhoods, getSubCities } from "@/lib/locations";

const FIELD_CLASS =
  "w-full p-3.5 rounded-card bg-canvas border border-line text-xs text-ink focus:outline-none focus:border-primary disabled:opacity-60 disabled:cursor-not-allowed";

const LABEL_CLASS =
  "block text-label font-mono-label text-muted font-bold uppercase mb-1";

/**
 * Cascading City > Sub-city > Neighborhood selector. The options come entirely
 * from GET /api/v1/cities — no Ethiopian location data is hardcoded here.
 */
export function LocationSelector({
  cities,
  value,
  onChange,
  loading = false,
  error = "",
  required = true,
}: {
  cities: City[];
  value: LocationSelection;
  onChange: (selection: LocationSelection) => void;
  loading?: boolean;
  error?: string;
  required?: boolean;
}) {
  const subCities = getSubCities(cities, value.city);
  const neighborhoods = getNeighborhoods(cities, value.city, value.subCity);

  // Changing a level always clears the levels below it.
  const handleCityChange = (city: string) => onChange({ city, subCity: "", neighborhood: "" });
  const handleSubCityChange = (subCity: string) =>
    onChange({ ...value, subCity, neighborhood: "" });
  const handleNeighborhoodChange = (neighborhood: string) => onChange({ ...value, neighborhood });

  if (error) {
    return (
      <div className="p-4 rounded-card bg-rose-50 border border-rose-200 flex items-start gap-2">
        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" aria-hidden="true" />
        <div className="text-xs text-rose-700">
          <p className="font-bold">Locations could not be loaded.</p>
          <p className="text-micro mt-0.5">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div>
        <label htmlFor="location-country" className={LABEL_CLASS}>
          Country
        </label>
        <input
          id="location-country"
          type="text"
          disabled
          value="Ethiopia"
          className="w-full p-3.5 rounded-card bg-canvas border border-line text-xs font-bold text-ink"
        />
      </div>

      <div>
        <label htmlFor="location-city" className={LABEL_CLASS}>
          City {required && "*"}
        </label>
        <select
          id="location-city"
          required={required}
          value={value.city}
          disabled={loading || cities.length === 0}
          onChange={(e) => handleCityChange(e.target.value)}
          className={FIELD_CLASS}
        >
          <option value="">
            {loading ? "Loading cities…" : cities.length === 0 ? "No cities available" : "Select a city"}
          </option>
          {cities.map((city) => (
            <option key={city.id} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="location-sub-city" className={LABEL_CLASS}>
          Sub City {required && "*"}
        </label>
        <select
          id="location-sub-city"
          required={required}
          value={value.subCity}
          disabled={!value.city || subCities.length === 0}
          onChange={(e) => handleSubCityChange(e.target.value)}
          className={FIELD_CLASS}
        >
          <option value="">
            {!value.city
              ? "Select a city first"
              : subCities.length === 0
                ? "No sub-cities listed"
                : "Select a sub-city"}
          </option>
          {subCities.map((subCity) => (
            <option key={subCity.id} value={subCity.name}>
              {subCity.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="location-neighborhood" className={LABEL_CLASS}>
          Neighborhood
        </label>
        <select
          id="location-neighborhood"
          value={value.neighborhood}
          disabled={!value.subCity || neighborhoods.length === 0}
          onChange={(e) => handleNeighborhoodChange(e.target.value)}
          className={FIELD_CLASS}
        >
          <option value="">
            {!value.subCity
              ? "Select a sub-city first"
              : neighborhoods.length === 0
                ? "No neighborhoods listed"
                : "Select a neighborhood"}
          </option>
          {neighborhoods.map((neighborhood) => (
            <option key={neighborhood.id} value={neighborhood.name}>
              {neighborhood.name}
            </option>
          ))}
        </select>
      </div>

      {loading && (
        <p className="sm:col-span-2 lg:col-span-4 flex items-center gap-1.5 text-label text-muted">
          <Loader2 className="w-3 h-3 animate-spin" aria-hidden="true" />
          Loading Ethiopian locations from the Delala database…
        </p>
      )}
    </div>
  );
}
