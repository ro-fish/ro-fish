import { LatLngExpression } from "leaflet";

type FishingSpot = {
  bounds: LatLngExpression[];
  name: string;
  taken: boolean;
};

export default FishingSpot;