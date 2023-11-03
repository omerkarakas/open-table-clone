import { Cuisine, Location, PRICE, Restaurant, Review } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { reviewRatingAverage } from "../../../utilities/reviewRatingAverage";
import Price from "../../components/Price";
import Stars from "../../components/Stars";

export type RestaurantCardProps = {
  id: number;
  name: string;
  main_image: string;
  slug: string;
  price: PRICE;
  location: Location;
  cuisine: Cuisine;
  reviews: Review[];
};

const ratingConsideration = (reviews: Review[]) => {
  let avgRating = reviewRatingAverage(reviews);
  if (avgRating === "N/A") {
    return "No rating yet";
  }
  if (Number(avgRating) >= 4) {
    return "Awesome";
  } else if (Number(avgRating) >= 3) {
    return "Good";
  } else if (Number(avgRating) >= 0) {
    return "Average";
  } else return "";
};
const RestaurantCard = ({ restaurant }: { restaurant: RestaurantCardProps }) => {
  // console.log(restaurant);
  return (
    <div className="border-b flex pb-5 ml-5">
      <img src={restaurant.main_image} alt="" className="w-44 h-36 rounded" />
      <div className="pl-5">
        <h2 className="text-3xl">{restaurant.name}</h2>
        <div className="flex items-start">
          <div className="flex mb-2">
            <Stars reviews={restaurant.reviews} />
          </div>

          <p className="ml-2 text-sm">{ratingConsideration(restaurant.reviews)}</p>
        </div>
        <div className="mb-9">
          <div className="font-light flex text-reg">
            <Price price={restaurant.price} />
            <p className="mr-4 capitalize">{restaurant.cuisine?.name}</p>
            <p className="mr-4 capitalize">{restaurant.location?.name}</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href={`/restaurant/${restaurant.slug}`}>View more information</Link>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
