import { PRICE, PrismaClient, Restaurant } from "@prisma/client";
import React from "react";
import Header from "./components/Header";
import RestaurantCard, { RestaurantCardProps } from "./components/RestaurantCard";
import SearchSideBar from "./components/SearchSideBar";

export interface SearchParams {
  city?: string;
  cuisine?: string;
  price?: PRICE;
}

const prisma = new PrismaClient();
const select = {
  id: true,
  name: true,
  main_image: true,
  price: true,
  cuisine: true,
  location: true,
  slug: true,
  reviews: true,
};
const fetchRestaurantsByCity = async (city: string | undefined) => {
  if (!city) return prisma.restaurant.findMany({ select });

  return prisma.restaurant.findMany({
    where: { location: { name: { equals: city.toLowerCase() } } },
    select,
  });
};
const fetchRestaurantsBySearchParam = async (searchParams: SearchParams) => {
  const { city, cuisine, price } = searchParams;

  const where: any = {};
  if (city) where.location = { name: { equals: city.toLowerCase() } };
  if (cuisine) where.cuisine = { name: { equals: cuisine.toLowerCase() } };
  if (price) where.price = { equals: price };
  // if (!city) return prisma.restaurant.findMany({ select });

  return prisma.restaurant.findMany({
    where,
    select,
  });
};

const fetchLocations = async () => {
  return prisma.location.findMany();
};

const fetchCuisines = async () => {
  return prisma.cuisine.findMany();
};

// const Search = async (props: any) => {
const Search = async ({ searchParams }: { searchParams: SearchParams }) => {
  // const searchParams = useSearchParams();
  // const city = searchParams.get("city");
  // need to change to a client component

  //or directly from the prop
  // const city = props?.searchParams?.city;
  // const cuisine = props?.searchParams?.cuisine;
  // const price = props?.searchParams?.price;
  console.log("searchParams:", searchParams);

  // if (!city) {
  //   throw new Error("Err");
  // }
  // const restaurants = await fetchRestaurantsByCity(searchParams.city);
  const restaurants = await fetchRestaurantsBySearchParam(searchParams);
  // console.log("restaurants:", { restaurants });

  // const locations = new Set(restaurants.map((rest) => rest.location.name));
  // console.log("locations:", locations);
  const locations = await fetchLocations();
  const cuisines = await fetchCuisines();

  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar locations={locations} cuisines={cuisines} searchParams={searchParams} />
        <div className="w-5/6">
          {restaurants.length === 0 ? (
            <h3>No restaurant in this city</h3>
          ) : (
            <div>
              {restaurants.map((restaurant, index) => {
                return <RestaurantCard restaurant={restaurant} key={restaurant.id} />;
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
