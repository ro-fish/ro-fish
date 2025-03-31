import { LatLng } from "leaflet";

type FishingSpot = {
  bounds: LatLng[];
  name: string;
};

export type FishingSpotDTO = {
    name: string;
    id?: string;
    perimeter: CoordinateDTO[];
};

export type CoordinateDTO = {
    latitude: number;
    longitude: number;
};

export default FishingSpot;