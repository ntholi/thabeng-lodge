interface RoomFeature {
  name: string;
  count: number;
}

interface Room {
  id: string;
  name: string;
  description: string;
  features: RoomFeature[];
  price: number;
  image: string;
  createdAt?: any;
}
