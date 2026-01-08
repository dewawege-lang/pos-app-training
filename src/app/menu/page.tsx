"use client";

import { IconCaretDownFilled, IconCaretUpDownFilled, IconSearch } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";
import BillingSideBar from "@/Components/BillingSideBar";
import PaymentModal from "@/Components/PaymentModal";
import { menus } from "@/data/menuData";

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

  
  const [activeMenuTab, setActiveMenuTab] = useState(menuTabs[0]);
  const [orders, setOrders] = useState([]);
  const [activeBillingTab, setActiveBillingTab] = useState("Dine in");
  const [activePaymentTab, setActivePaymentTab] =useState("Debit");

  const [showPayment, setShowPayment] = useState(false);
  const currentOrders = orders.filter(o => o.type === activeBillingTab);
  const subtotal = currentOrders.reduce((acc, curr) => acc+ (curr.price * curr.qty), 0);

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
    <div className="flex bg-darkbg1 w-full h-screen overflow-hidden custom-scrollbar">
      <div className="flex-1 pr-8 px-15 pt-8 overflow-y-auto custom-scrollbar">
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
          <div className="flex justify-between mt-5 mb-15">
            <div className="flex items-center justify-between py-2 ">
              <h1 className="font-medium text-white text-2xl">Choose Dishes</h1>
            </div>

            <div className=" relative inline-block text-left">
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
                <IconCaretDownFilled />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-10 gap-y-15 mt-12">
            {menus
              .find((menu) => menu.type === activeMenuTab)
              ?.items.map((item, index) => (
                <div
                  key={index}
                  onClick={() => addToOrder(item)}
                  className="bg-darkbg2 flex flex-col gap-1 items-center h-75 text-white rounded-2xl p-2 transition-transform duration-300 hover:scale-110 active:scale-95 cursor-pointer"
                >
                  <Image
                    src={item.imgUrl}
                    alt={item.dishName}
                    width={160}
                    height={160}
                    className="mt-[-50px] drop-shadow-2xl"
                  />
                  <div className="flex-1 flex flex-col justify-end gap-3 pb-8 w-full">
                    <h3 className="px-4 text-center font-medium">
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
          onContinue={() => setShowPayment(true)}
        />
      </aside>
      {/* Modal Overlay */}
      {showPayment && (
        <PaymentModal
          orders={orders}
          setOrders={setOrders}
          activePaymentTab={activePaymentTab}
          setActivePaymentTab={setActivePaymentTab}
          onClose={() => setShowPayment(false)}
        />
      )}
    </div>
  );
}