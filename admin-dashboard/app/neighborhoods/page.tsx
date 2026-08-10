"use client";

import { LocationDirectory } from "@/components/location-table";

export default function NeighborhoodsPage() {
  return (
    <LocationDirectory
      type="neighborhood"
      title="Neighborhoods"
      description="The most specific level renters search by"
      parentLabel="Sub-city"
    />
  );
}
