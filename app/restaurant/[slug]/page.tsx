import React from "react";
import Description from "./components/Description";
import Images from "./components/Images";
import Rating from "./components/Rating";
import ReservationCard from "./components/ReservationCard";
import RestaurantNavBar from "./components/RestaurantNavBar";
import Reviews from "./components/Reviews";
import Title from "./components/Title";
import { PrismaClient, Review } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";

const prisma = new PrismaClient();

interface Restaurant {
  id: number;
  name: string;
  images: string[];
  description: string;
  slug: string;
  reviews: Review[];
}
const fetchRestaurantBySlug = async (slug: string): Promise<Restaurant> => {
  const restaurant = await prisma.restaurant.findUnique({
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      slug: true,
      // main_image: true,
      // cuisine: true,
      // location: true,
      // price: true,
      reviews: true,
    },
    where: { slug },
  });
  if (!restaurant) {
    notFound();

    // throw new Error("Can not find restaurant [" + slug + "]");
  }
  return restaurant;
};

// const fetchRestaurantReviews = async (restaurant_id: number): Promise<Review[]> => {
//   const reviews = await prisma.review.findMany(
//     { where: { restaurant_id } }
//   );
//   return reviews;
// };

const RestaurantDetails = async (props: any) => {
  const slug = props?.params?.slug;
  const restaurant = await fetchRestaurantBySlug(slug);
  // const restaurantReviews = await fetchRestaurantReviews(restaurant.id);
  // console.log("rest reviews:", restaurantReviews);
  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestaurantNavBar slug={restaurant?.slug} />
        <Title name={restaurant.name} />
        <Rating reviews={restaurant.reviews} />
        <Description description={restaurant.description} />
        <Images images={restaurant.images} />
        <Reviews reviews={restaurant.reviews} />
      </div>
      <div className="w-[27%] relative text-reg">
        <ReservationCard />
      </div>
    </>
  );
};

export default RestaurantDetails;
