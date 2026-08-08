import { Coordinates, LocationNode, Property } from "./types";

/**
 * Broad default view. Delala is a nationwide Ethiopian marketplace, so the map
 * falls back to the whole country rather than to any single city.
 */
export const ETHIOPIA_CENTER: Coordinates = { latitude: 9.145, longitude: 40.4897 };

export const MAP_ZOOM = {
  country: 6,
  city: 12,
  subCity: 14,
  neighborhood: 15,
  property: 16,
} as const;

export const OSM_TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
export const OSM_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors';

/**
 * Guards every value that reaches Leaflet. Rejects NaN, Infinity, null,
 * undefined, empty strings and out-of-range degrees.
 */
export const isValidCoordinate = (latitude: unknown, longitude: unknown): boolean => {
  return (
    typeof latitude === "number" &&
    typeof longitude === "number" &&
    Number.isFinite(latitude) &&
    Number.isFinite(longitude) &&
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180
  );
};

/** Narrows an arbitrary lat/lng pair to `Coordinates`, or null when unusable. */
export const toCoordinates = (latitude: unknown, longitude: unknown): Coordinates | null => {
  const lat = typeof latitude === "string" ? Number(latitude) : latitude;
  const lng = typeof longitude === "string" ? Number(longitude) : longitude;
  if (!isValidCoordinate(lat, lng)) return null;
  return { latitude: lat as number, longitude: lng as number };
};

/** The map position of a property, or null when it should not get a marker. */
export const getPropertyCoordinates = (property: Property): Coordinates | null =>
  toCoordinates(property.latitude, property.longitude);

/** Properties that can safely be rendered as markers. */
export const withCoordinates = (
  properties: Property[]
): Array<{ property: Property; coordinates: Coordinates }> =>
  properties.reduce<Array<{ property: Property; coordinates: Coordinates }>>((acc, property) => {
    const coordinates = getPropertyCoordinates(property);
    if (coordinates) acc.push({ property, coordinates });
    return acc;
  }, []);

/** The map position of a hierarchy node, or null when it has none. */
export const getLocationCoordinates = (node?: LocationNode | null): Coordinates | null =>
  node ? toCoordinates(node.latitude, node.longitude) : null;

/**
 * Coordinates are stored at full precision for map accuracy, but shown rounded
 * to ~10m so the UI never implies a house-level address.
 */
export const formatApproximateCoordinates = ({ latitude, longitude }: Coordinates): string =>
  `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;

/** Stable key used to avoid refitting the map when the marker set is unchanged. */
export const coordinatesSignature = (
  entries: Array<{ property: Property; coordinates: Coordinates }>
): string =>
  entries
    .map(({ property, coordinates }) => `${property.id}:${coordinates.latitude},${coordinates.longitude}`)
    .join("|");
