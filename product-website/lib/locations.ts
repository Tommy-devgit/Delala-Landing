import { City, Coordinates, LocationNode } from "./types";
import { MAP_ZOOM, getLocationCoordinates } from "./map";

/** The structured location a publisher has chosen. Independent of map coordinates. */
export interface LocationSelection {
  city: string;
  subCity: string;
  neighborhood: string;
}

export const EMPTY_LOCATION_SELECTION: LocationSelection = {
  city: "",
  subCity: "",
  neighborhood: "",
};

const byName = <T extends { name: string }>(items: T[], name: string): T | undefined =>
  name ? items.find((item) => item.name.toLowerCase() === name.toLowerCase()) : undefined;

export const findCity = (cities: City[], name: string): City | undefined => byName(cities, name);

export const findSubCity = (city: City | undefined, name: string): LocationNode | undefined =>
  city ? byName(city.subCities || [], name) : undefined;

export const findNeighborhood = (
  subCity: LocationNode | undefined,
  name: string
): LocationNode | undefined => (subCity ? byName(subCity.children || [], name) : undefined);

/** Sub-cities available for the selected city. */
export const getSubCities = (cities: City[], cityName: string): LocationNode[] =>
  findCity(cities, cityName)?.subCities || [];

/** Neighborhoods available for the selected city + sub-city. */
export const getNeighborhoods = (
  cities: City[],
  cityName: string,
  subCityName: string
): LocationNode[] => findSubCity(findCity(cities, cityName), subCityName)?.children || [];

/**
 * Map view suggested by the structured selection: the most specific level that
 * actually has coordinates wins, and the country view is used when none does.
 * This never claims to be the property's real position — it only frames the map.
 */
export const resolveLocationFocus = (
  cities: City[],
  selection: LocationSelection
): { coordinates: Coordinates | null; zoom: number } => {
  const city = findCity(cities, selection.city);
  const subCity = findSubCity(city, selection.subCity);
  const neighborhood = findNeighborhood(subCity, selection.neighborhood);

  const neighborhoodPoint = getLocationCoordinates(neighborhood);
  if (neighborhoodPoint) return { coordinates: neighborhoodPoint, zoom: MAP_ZOOM.neighborhood };

  const subCityPoint = getLocationCoordinates(subCity);
  if (subCityPoint) return { coordinates: subCityPoint, zoom: MAP_ZOOM.subCity };

  const cityPoint =
    city && city.latitude !== null && city.longitude !== null
      ? getLocationCoordinates({
          id: city.id,
          name: city.name,
          slug: city.slug,
          latitude: city.latitude,
          longitude: city.longitude,
        })
      : null;
  if (cityPoint) return { coordinates: cityPoint, zoom: MAP_ZOOM.city };

  return { coordinates: null, zoom: MAP_ZOOM.country };
};
