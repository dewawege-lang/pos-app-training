"use client";

import { IconSearch } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";
import BillingSideBar from "@/Components/BillingSideBar";
import { link } from "fs";
import Link from "next/link";

export default function MenuPage() {
  const today = new Date();

  const menuTabs = [
    "Hot Dishes",
    "Cold Dishes",
    "Soup",
    "Grill",
    "Apetizer",
    "Desert",
  ];

  // Perbaikan: Pastikan nama variabel konsisten (M besar)
  const [activeMenuTab, setActiveMenuTab] = useState(menuTabs[0]);
  const [orders, setOrders] = useState([]);
  const [activeBillingTab, setActiveBillingTab] = useState("Dine in");

  const menus = [
    {
      type: "Hot Dishes",
      items: [
        {
          imgUrl: "/image/1.png",
          dishName: "Spicy seasoned seafood noodles",
          price: 2.29,
          stock: 20,
        },
        {
          imgUrl: "/image/2.png",
          dishName: "Salted pasta with mushroom sauce",
          price: 2.69,
          stock: 11,
        },
        {
          imgUrl: "/image/3.png",
          dishName: "Beef dumpling in hot and sour soup",
          price: 2.99,
          stock: 16,
        },
        {
          imgUrl: "/image/4.png",
          dishName: "Healthy noodle with spinach leaf",
          price: 3.29,
          stock: 22,
        },
        {
          imgUrl: "/image/5.png",
          dishName: "Hot spicy fried rice with omelet",
          price: 3.49,
          stock: 13,
        },
        {
          imgUrl: "/image/6.png",
          dishName: "Spicy instant noodle with special omelette",
          price: 3.59,
          stock: 17,
        },
      ],
    },
    {
      type: "Cold Dishes",
      items: [
        {
          imgUrl: "/image/7.png",
          dishName: "Salad garlic sauce",
          price: 2.19,
          stock: 21,
        },
        {
          imgUrl: "/image/8.png",
          dishName: "Salad tropic mushroom sauce",
          price: 3.99,
          stock: 15,
        },
        {
          imgUrl: "/image/9.png",
          dishName: "Classic Salad with brown sauce",
          price: 3.49,
          stock: 13,
        },
        {
          imgUrl: "/image/10.png",
          dishName: "Special Salad garden",
          price: 2.49,
          stock: 11,
        },
        {
          imgUrl: "/image/11.png",
          dishName: "Dimsum soup special",
          price: 2.12,
          stock: 15,
        },
        {
          imgUrl: "/image/12.png",
          dishName: "Kwetiau kungfu panda",
          price: 3.49,
          stock: 10,
        },
      ],
    },
    {
      type: "Soup",
      items: [
        {
          imgUrl: "/image/13.png",
          dishName: "Chicken soup",
          price: 1.4,
          stock: 18,
        },
        {
          imgUrl: "/image/14.png",
          dishName: "Tomato soup",
          price: 2.1,
          stock: 15,
        },
        {
          imgUrl: "/image/15.png",
          dishName: "Pea and ham soup",
          price: 2.1,
          stock: 23,
        },
        {
          imgUrl: "/image/16.png",
          dishName: "Cock-a-leekie ",
          price: 2.14,
          stock: 14,
        },
        {
          imgUrl: "/image/17.png",
          dishName: "Butternut squash and bacon soup",
          price: 1.8,
          stock: 11,
        },
      ],
    },
    {
      type: "Grill",
      items: [
        {
          imgUrl: "/image/18.png",
          dishName: "Banger and mash",
          price: 3.4,
          stock: 16,
        },
        {
          imgUrl: "/image/19.png",
          dishName: "Tropic beef grilled",
          price: 3.1,
          stock: 22,
        },
        {
          imgUrl: "/image/20.png",
          dishName: "Beef steak BBQ",
          price: 4.1,
          stock: 13,
        },
        {
          imgUrl: "/image/21.png",
          dishName: "Beef steak with mushroom sauce",
          price: 4.14,
          stock: 17,
        },
      ],
    },
    {
      type: "Apetizer",
      items: [
        {
          imgUrl: "/image/22.png",
          dishName: "Tempura ujung pandang",
          price: 2.19,
          stock: 21,
        },
        {
          imgUrl: "/image/23.png",
          dishName: "Wonderfull croquette",
          price: 3.99,
          stock: 15,
        },
        {
          imgUrl: "/image/24.png",
          dishName: "Mayonnaise rissole",
          price: 3.49,
          stock: 13,
        },
        {
          imgUrl: "/image/25.png",
          dishName: "Seafood rissole",
          price: 2.49,
          stock: 11,
        },
        {
          imgUrl: "/image/26.png",
          dishName: "Dim sum ",
          price: 2.12,
          stock: 15,
        },
        {
          imgUrl: "/image/27.png",
          dishName: "Indonesian Steamed fish dumplings",
          price: 3.49,
          stock: 10,
        },
      ],
    },
    {
      type: "Desert",
      items: [
        {
          imgUrl: "/image/28.png",
          dishName: "Rainbow Swirl Delight",
          price: 1.49,
          stock: 21,
        },
        {
          imgUrl: "/image/29.png",
          dishName: "Strawberry Bliss Bowl",
          price: 3.99,
          stock: 15,
        },
        {
          imgUrl: "/image/30.png",
          dishName: "Choco-Almond Dream Box",
          price: 3.49,
          stock: 13,
        },
        {
          imgUrl: "/image/31.png",
          dishName: "Oreo Cookies & Cream Cheesecake",
          price: 2.49,
          stock: 11,
        },
        {
          imgUrl: "/image/32.png",
          dishName: "Berry Custard Delight",
          price: 2.12,
          stock: 15,
        },
        {
          imgUrl: "/image/33.png",
          dishName: "Tropical Fruit Dessert Box",
          price: 3.49,
          stock: 10,
        },
      ],
    },
  ];

  const addToOrder = (item) => {
    setOrders((prevOrders) => {
      const existingItem = prevOrders.find(
        (order) =>
          order.dishName === item.dishName && order.type === activeBillingTab
      );
      if (existingItem) {
        return prevOrders.map((order) =>
          order.dishName === item.dishName && order.type === activeBillingTab
            ? { ...order, qty: order.qty + 1 }
            : order
        );
      }
      return [
        ...prevOrders,
        { ...item, qty: 1, type: activeBillingTab, note: "" },
      ];
    });
  };

  return (
    <div className="flex bg-darkbg1 w-full h-screen overflow-hidden">
      <div className="flex-1 pr-8 px-15 pt-8 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-row justify-between items-center text-white">
          <div className="font-bold w-2xl">
            <div className="font-light text-4xl text-whitefont">
              Jaegar Resto
            </div>
            <h1 className="mt-3">
              {today.toLocaleString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "2-digit",
              })}
            </h1>
          </div>
          {/* Search bar */}
          <div className="relative flex items-center">
            <div className="absolute left-4 text-white text-center">
              <IconSearch size={20} />
            </div>
            <input
              type="text"
              placeholder="Search for food, etc..."
              className="bg-search rounded-2xl w-100 h-12 pl-12 pr-4 text-white focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Tabs Menu Makanan */}
        <div className="flex mt-8 mb-1 text-white border-b border-white/50 font-light cursor-pointer">
          {menuTabs.map((tab, index) => (
            <div
              key={index}
              onClick={() => setActiveMenuTab(tab)}
              className={`px-3 pb-1 hover:text-primary transition-all ${
                activeMenuTab === tab
                  ? "text-primary border-b-3 border-primary font-semibold"
                  : ""
              }`}
            >
              {tab}
            </div>
          ))}
        </div>

        {/* Dishes Grid */}
        <div className="mt-4 pb-20">
          <div className="flex items-center justify-between py-2 ">
            <h1 className="font-medium text-white text-2xl">Choose Dishes</h1>
          </div>

          <div className="relative inline-block text-left">
            <select
              value={activeBillingTab}
              onChange={(e) => setActiveBillingTab(e.target.value)}
              className="bg-darkbg2 text-white border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer appearance-none pr-10"
            >
                <option value="Dine in">Dine in</option>
                <option value="Take Away">Take Away</option>
                <option value="Delivery">Delivery</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-white">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                {/* <path d="M9.293 12.951.707.707L" */}
                </svg>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-10 gap-y-15 mt-12">
            {menus
              .find((menu) => menu.type === activeMenuTab)
              ?.items.map((item, index) => (
                <div
                  key={index}
                  onClick={() => addToOrder(item)} // Perbaikan: Typo dihapus
                  className="bg-darkbg2 flex flex-col gap-1 items-center h-75 text-white rounded-2xl p-2 transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Image
                    src={item.imgUrl}
                    alt={item.dishName}
                    width={160}
                    height={160}
                    className="m-[-50px] drop-shadow-2xl"
                  />
                  <div className="flex-1 flex flex-col justify-end pb-4 w-full">
                    <h3 className="mt-18 px-4 text-center font-medium">
                      {item.dishName}
                    </h3>
                    <p className="text-center my-2 text-white">
                      $ {item.price}
                    </p>
                    <p className="text-center text-gray-400 text-sm">
                      {item.stock} Bowls available
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Sidebar Billing */}
      <aside className="w-[450px] h-screen">
        <BillingSideBar
          orders={orders}
          setOrders={setOrders}
          activeBillingTab={activeBillingTab}
          setActiveBillingTab={setActiveBillingTab}
        />
      </aside>
    </div>
  );
}