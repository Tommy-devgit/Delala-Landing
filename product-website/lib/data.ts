import { Property, City, Neighborhood, Broker } from "./types";

// Empty arrays — Data is fetched live from NestJS REST API connected to Supabase PostgreSQL database
export const BROKERS: Broker[] = [];
export const CITIES: City[] = [];
export const NEIGHBORHOODS: Neighborhood[] = [];
export const PROPERTIES: Property[] = [];
