import { Cuisine, Location, PRICE, Prisma } from "@prisma/client";
import Link from "next/link";
import React, { useState } from "react";
import Price from "../../components/Price";
import { SearchParams } from "../page";

type Props = {};

const SearchSideBar = ({
  locations,
  cuisines,
  searchParams,
}: {
  locations: Location[];
  cuisines: Cuisine[];
  searchParams: SearchParams;
}) => {
  // let query: any = {};
  // if (searchParams.city) query.city = searchParams.city;
  // if (searchParams.cuisine) query.cuisine = searchParams.cuisine;
  // if (searchParams.price) query.price = searchParams.price;

  const prices = [
    { price: PRICE.CHEAP, label: "$" },
    { price: PRICE.REGULAR, label: "$$" },
    { price: PRICE.EXPENSIVE, label: "$$$" },
  ];

  return (
    <div className="w-1/5">
      <div className="border-b pb-4">
        <h1 className="mb-2">Region</h1>
        {locations.map((loc, index) => {
          return (
            <Link
              className={`text-reg capitalize block ${
                loc.name === searchParams.city?.toLowerCase() ? "font-bold " : "font-light"
              }`}
              key={index}
              href={{ pathname: `/search`, query: { ...searchParams, city: loc.name } }}
            >
              {loc.name}
            </Link>
          );
        })}
      </div>
      <div className="border-b pb-4 mt-3">
        <h1 className="mb-2">Cuisine</h1>
        {cuisines.map((cuisine, index) => {
          return (
            <Link
              className={`text-reg capitalize block ${
                cuisine.name === searchParams.cuisine?.toLowerCase() ? "font-bold " : "font-light"
              }`}
              key={index}
              href={{ pathname: `/search`, query: { ...searchParams, cuisine: cuisine.name } }}
            >
              {cuisine.name}
            </Link>
          );
        })}
      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>

        <div className="flex">
          {prices.map((p, index) => {
            return (
              <Link
                className={`border w-full text-reg rounded p-2 text-center ${
                  p.price === searchParams.price ? "font-bold " : "font-light"
                }`}
                href={{ pathname: `/search`, query: { ...searchParams, price: p.price } }}
              >
                {p.label}
              </Link>
            );
          })}

          {/* 
          <Link
            className="border w-full text-reg font-light rounded-l p-2"
            href={{ pathname: `/search`, query: { ...searchParams, price: PRICE.CHEAP } }}
          >
            $
          </Link>

          <Link
            className="border-r border-t border-b w-full text-reg font-light p-2"
            href={{ pathname: `/search`, query: { ...searchParams, price: PRICE.REGULAR } }}
          >
            $$
          </Link>

          <Link
            className="border-r border-t border-b w-full text-reg font-light p-2 rounded-r"
            href={{ pathname: `/search`, query: { ...searchParams, price: PRICE.EXPENSIVE } }}
          >
            $$$
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default SearchSideBar;
