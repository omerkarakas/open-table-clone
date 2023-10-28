import React from "react";
import MenuCard from "./MenuCard";
import { Item } from "@prisma/client";

type Props = {};

const Menu = ({ menu }: { menu: Item[] }) => {
  return (
    <main className="bg-white mt-5">
      <div>
        <div className="mt-4 pb-1 mb-1">
          <h1 className="font-bold text-4xl">Menu</h1>
        </div>
        <div className="flex flex-wrap justify-between">
          {menu.length > 0 ? (
            menu.map((item) => {
              return <MenuCard item={item} key={item.id} />;
            })
          ) : (
            <p>This restaurant does not have any menu</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Menu;
