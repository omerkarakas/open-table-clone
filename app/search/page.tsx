import { PrismaClient, Restaurant } from "@prisma/client";
import React from "react";
import Header from "./components/Header";
import RestaurantCard, { RestaurantCardProps } from "./components/RestaurantCard";
import SearchSideBar from "./components/SearchSideBar";

type Props = {};

const prisma = new PrismaClient();
const select = {
  id: true,
  name: true,
  main_image: true,
  price: true,
  cuisine: true,
  location: true,
  slug: true,
};
const fetchRestaurantsByCity = async (city: string | null) => {
  if (!city) return prisma.restaurant.findMany({ select });

  return prisma.restaurant.findMany({
    where: { location: { name: { equals: city.toLowerCase() } } },
    select,
  });
};

const Search = async (props: any) => {
  // const searchParams = useSearchParams();
  // const city = searchParams.get("city");
  // need to change to a client component

  //or directly from the prop
  const city = props?.searchParams?.city;

  // if (!city) {
  //   throw new Error("Err");
  // }
  const restaurants = await fetchRestaurantsByCity(city);
  // console.log("restaurants:", { restaurants });

  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar />
        <div className="w-5/6">
          {restaurants.length === 0 ? (
            <h3>No restaurant in this city</h3>
          ) : (
            <div>
              {restaurants.map((restaurant, index) => {
                return <RestaurantCard restaurant={restaurant} />;
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
