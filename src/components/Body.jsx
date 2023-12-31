import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { MEDIA_ASSETS_URL, RES_LIST_API } from "../utils/constants";
import useOnlineStatus from "../utils/useOnlineStatus";
import { withOffersHeader } from "./RestaurantCard";
import isObjectEmpty from "../utils/emptyObject";

const Body = () => {
  // local state variable
  const [listOfRes, setListOfRes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredRes, setFilteredRes] = useState([]);
  const [offersList, setOffersList] = useState([]);

  const RestaurantCardOffers = withOffersHeader(RestaurantCard);

  useEffect(() => {
    fetchData();
  }, []); // If empty dependency array, useEffect is called only on the initial render

  const fetchData = async () => {
    const data = await fetch(RES_LIST_API);

    const fdata = await data.json();

    setListOfRes(
      fdata?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
    setFilteredRes(
      fdata?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );

    setOffersList(fdata?.data?.cards[0]?.card?.card?.imageGridCards?.info);
  };

  const onlineStatus = useOnlineStatus();
  if (!onlineStatus)
    return (
      <h1>Looks like you're offline! Please check your internet connection</h1>
    );

  return filteredRes.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body mt-4 mb-[50px]">
      <div className="w-[70%] mx-auto max-w-screen-xl flex flex-col">
        <div className="mt-4 mb-8">
          <h1 className="font-bold text-2xl text-[#132043] mb-4">
            Best offers for you
          </h1>
          <div className="flex gap-4 ">
            {offersList?.slice(0, 3).map((offer) => {
              return (
                <div
                  key={offer.id}
                  className="w-full hover:cursor-pointer hover:opacity-80 transition ease-in-out duration-300"
                >
                  <img
                    className="h-full object-cover"
                    src={MEDIA_ASSETS_URL + offer.imageId}
                    alt=""
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h1 className="pt-4 font-bold text-2xl text-[#132043] mt-4 mb-2 border-t-[2px] border-t-zinc-200">
            Top Restaurants in Kolkata
          </h1>
          <div className="flex gap-4 my-8 items-center ">
            <div
              className="search-bar border-2 border-zinc-400 px-4 py-1 flex gap-4 justify-between rounded-full
           focus-within:border-[#132043] shadow-md"
            >
              <input
                className="focus:outline-none"
                type="text"
                placeholder="Search restaurants"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              />
              <span
                onClick={() => {
                  // Search
                  // Input value
                  const filteredRes = listOfRes.filter((res) =>
                    res.info.name
                      .toLowerCase()
                      .includes(searchText.toLowerCase())
                  );
                  setFilteredRes(filteredRes);
                }}
              >
                <i
                  data-testid="search-res"
                  className="fa-solid fa-magnifying-glass"
                ></i>
              </span>
            </div>
            <div className="top-rated-res">
              <button
                data-testid="top-rated-btn"
                className="px-4 py-1 transition ease-in-out shadow-md
               whitespace-nowrap font-medium text-[#fb4157] bg-[#FDF0F0] border-2 border-[#fb4157]
               "
                style={{ borderRadius: 100 + "px" }}
                onClick={(e) => {
                  if (e.target.classList.toggle("active")) {
                    e.target.style.backgroundColor = "#fb4157";
                    e.target.style.color = "#FFF";

                    const filteredList = listOfRes.filter(
                      (res) => res.info.avgRating >= 4.4
                    );
                    setFilteredRes(filteredList);
                  } else {
                    e.target.style.backgroundColor = "#FDF0F0";
                    e.target.style.color = "#fb4157";
                    setFilteredRes(listOfRes);
                  }
                }}
              >
                Top Rated
              </button>
            </div>
          </div>
          <div
            className="res-container gap-5"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 30%))",
            }}
          >
            {filteredRes.map((res) => {
              return (
                <Link key={res.info.id} to={"/restaurants/" + res.info.id}>
                  {isObjectEmpty(
                    res.info.aggregatedDiscountInfoV3 ||
                      res.info.aggregatedDiscountInfoV2
                  ) ? (
                    <RestaurantCard data={res} />
                  ) : (
                    <RestaurantCardOffers data={res} />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
