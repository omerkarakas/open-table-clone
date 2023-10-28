import React from "react";
import Description from "./components/Description";
import Images from "./components/Images";
import Rating from "./components/Rating";
import ReservationCard from "./components/ReservationCard";
import RestaurantNavBar from "./components/RestaurantNavBar";
import Reviews from "./components/Reviews";
import Title from "./components/Title";
import { PrismaClient, Restaurant } from "@prisma/client";
import { useSearchParams } from "next/navigation";

const prisma = new PrismaClient();

const fetchRestaurantBySlug = async (slug: string): Promise<Restaurant> => {
  const restaurant = await prisma.restaurant.findUnique({
    // select: {
    //   id: true,
    //   name: true,
    //   slug: true,
    //   main_image: true,
    //   cuisine: true,
    //   location: true,
    //   price: true,
    // },
    where: { slug },
  });
  if (!restaurant) {
    throw new Error("No restaurant named [" + slug + "]");
  }
  return restaurant;
};

const RestaurantDetails = async (props: any) => {
  const slug = props?.params?.slug;
  const restaurant = await fetchRestaurantBySlug(slug);
  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestaurantNavBar slug={restaurant?.slug} />
        <Title name={restaurant.name} />
        <Rating />
        <Description description={restaurant.description} />
        <Images images={restaurant.images} />
        <Reviews />
      </div>
      <div className="w-[27%] relative text-reg">
        <ReservationCard />
      </div>
    </>
  );
};

export default RestaurantDetails;
