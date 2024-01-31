export interface RoomFeature {
  name: string;
  count: number;
}

export interface RoomsPage {
  description: string;
  banner: string;
}

export interface Room {
  id: string;
  name: string;
  description: string;
  features: RoomFeature[];
  price: number;
  image: string;
  createdAt?: any;
}
