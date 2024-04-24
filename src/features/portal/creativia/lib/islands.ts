import { MAP_IMAGES } from "./images";

export type Island = {
  slug: string;
  name: string;
  type: "island" | "beach" | "mountain";
  description: string;
  image: string;
  price: number;
  premium: boolean;
  supply: number;
};

export const ISLANDS = [
  {
    slug: "normal_1",
    name: "Island 1",
    type: "island",
    description:
      "A normal island, a perfect little place to start your creative journey.",
    image: MAP_IMAGES.normal_1,
    price: 0,
    premium: false,
    supply: -1,
  },
  {
    slug: "normal_2",
    name: "Island 2",
    type: "island",
    description:
      "Another normal island, a perfect little place to start your creative journey.",
    image: MAP_IMAGES.normal_2,
    price: 5,
    premium: false,
    supply: -1,
  },
  {
    slug: "normal_3",
    name: "Island 3",
    type: "island",
    description:
      "Yet another normal island, a perfect not so little place to start your creative journey.",
    image: MAP_IMAGES.normal_3,
    price: 20,
    premium: true,
    supply: -1,
  },
  {
    slug: "normal_4",
    name: "Island 4",
    type: "island",
    description:
      "The last normal island, a perfect place to start your creative journey.",
    image: MAP_IMAGES.normal_4,
    price: 25,
    premium: false,
    supply: 10,
  },
];
