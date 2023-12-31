import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import ShimmerMenu from "./ShimmerMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const [showIndex, setShowIndex] = useState(0);
  const resInfo = useRestaurantMenu(resId);

  if (resInfo === null) return <ShimmerMenu />;

  const { name, cuisines, costForTwoMessage, avgRating, areaName } =
    resInfo?.cards[0]?.card?.card?.info;

  const menu = resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards;

  return (
    <div className="menu py-8 px-4">
      <div className="w-[60%] px-4 py-8 mx-auto max-w-screen-xl flex flex-col  rounded-lg shadow-xl border-t-4 border-t-[#F1B4BB]">
        <div className="res-overview">
          <div className="name-rating flex justify-between items-center">
            <h2 className="font-bold text-3xl text-[#132043]">{name}</h2>
            <span className="py-[0.2em] px-2 text-[#FDF0F0] bg-[#1F4172] font-bold">
              {avgRating} <i className="fa-solid fa-star"></i>
            </span>
          </div>
          <div className="food-overview flex flex-col gap-1 mt-4 mb-[50px]">
            <span className="text-zinc-600 font-semibold ">
              <i className="fa-solid fa-bowl-food font-semibold"></i>{" "}
              {cuisines?.join(", ")}
            </span>
            <span className="text-zinc-600 font-semibold flex gap-[0.4em] items-center">
              <i className="fa-solid fa-location-dot"></i>
              {areaName}
            </span>
            <div>
              <span className="py-[0.2em] font-bold text-lg text-[#1F4172] flex gap-[0.4em] items-center">
                <i className="fa-solid fa-bolt"></i>
                {costForTwoMessage}
              </span>
            </div>
          </div>
        </div>
        <ul>
          {menu.slice(1, -3).map((category, index) => {
            const items =
              category.card?.card?.itemCards ||
              category.card?.card?.categories[0]?.itemCards;
            return (
              //controlled comp
              <RestaurantCategory
                key={category?.card?.card?.title}
                data={{ items, category }}
                showItems={index === showIndex && true}
                hideItems={() => setShowIndex(null)}
                setShowIndex={() => setShowIndex(index)}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default RestaurantMenu;
