import { LatLng } from "leaflet";

type FishingSpot = {
  fishingSpotId: number;
  bounds: LatLng[];
  name: string;
};

export type FishingSpotDTO = {
  fishingSpotId: number;
  name: string;
  perimeter: CoordinateDTO[];
};

export type CoordinateDTO = {
  latitude: number;
  longitude: number;
};

export default FishingSpot;
