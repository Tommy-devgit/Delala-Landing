"use client";

import { LocationDirectory } from "@/components/location-table";

export default function CitiesPage() {
  return (
    <LocationDirectory
      type="city"
      title="Cities"
      description="Every city in the location hierarchy, with its live listing counts"
      parentLabel="Country"
    />
  );
}
