import { Cuisine, Location, PRICE, PrismaClient, Review } from "@prisma/client";
// import { Inter } from "@next/font/google";
import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";

// const inter = Inter({ subsets: ["latin"] });

export interface RestaurantCardType {
  id: number;
  name: string;
  slug: string;
  main_image: string;
  cuisine: Cuisine;
  location: Location;
  price: PRICE;
  reviews: Review[];
}

const prisma = new PrismaClient();

const fetchRestaurants = async (): Promise<RestaurantCardType[]> => {
  const restaurants = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      main_image: true,
      cuisine: true,
      location: true,
      price: true,
      reviews: true,
    },
  });
  return restaurants;
};

// const fetchReviews = async (): Promise<Review[]> => {
//   const reviews = await prisma.review
//     .findMany    ();
//   return reviews;
// };

export default async function Home() {
  const restaurants = await fetchRestaurants();
  // const reviews = await fetchReviews();
  // console.log("reviews:", reviews);
  return (
    <main>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {restaurants.map((restaurant) => {
          // const restaurantReviews = reviews.filter(
          //   (review) => review.restaurant_id === restaurant.id
          // );
          return (
            <RestaurantCard
              restaurant={restaurant}
              key={restaurant.id}
              // reviews={restaurantReviews}
            />
          );
        })}
      </div>
    </main>
  );
}
