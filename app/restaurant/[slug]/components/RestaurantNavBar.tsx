import Link from "next/link";
import React from "react";

type Props = {};

const RestaurantNavBar = (props: Props) => {
  return (
    <nav className="flex text-reg border-b pb-2">
      <Link href="/restaurant/abc" className="mr-7">
        Overview{" "}
      </Link>
      <Link href="/restaurant/abc/menu" className="mr-7">
        Menu{" "}
      </Link>
    </nav>
  );
};

export default RestaurantNavBar;
