"use client";
import React, { useEffect, useState, useMemo } from "react";
import { IconCoin, IconBookmark, IconUsers } from "@tabler/icons-react";
import { menus } from "@/data/menuData";

export default function DashboardPage() {
  const [reports, setReports] = useState([]);
  const today = new Date();

  useEffect(() => {
    const savedReports = JSON.parse(
      localStorage.getItem("orderReports") || "[]"
    );
    const formattedReports = savedReports.map((r) => ({
      name: r.customer,
      menu: r.menu,
      amount: r.totalPayment || "0",
      status: r.status,
      color: r.color,
    }));
    setReports(formattedReports);
  }, []);

  // Memastikan harga dihitung dengan aman
  const totalRevenue = useMemo(() => {
    return reports.reduce((acc, curr) => {
      const price =
        parseFloat(curr.amount.toString().replace(/[^0-9.-]+/g, "")) || 0;
      return acc + price;
    }, 0);
  }, [reports]);

  const { totalOrders, uniqueCustomers, mostOrderedDishes } = useMemo(() => {
    // 1. Hitung Kemunculan Menu
    const allDishes = reports.flatMap((r) =>
      r.menu ? r.menu.split(", ") : []
    );
    const dishCounts = allDishes.reduce((acc, dish) => {
      acc[dish] = (acc[dish] || 0) + 1;
      return acc;
    }, {});

    // 2. Ratakan Menu Data untuk cari gambar
    const allMenuItems = menus
      ? menus.flatMap((category) => category.items)
      : [];

    // 3. Olah Most Ordered
    const mostOrdered = Object.keys(dishCounts)
      .map((name) => {
        const menuItem = allMenuItems.find((item) => item.dishName === name);
        return {
          name,
          count: dishCounts[name],
          image: menuItem
            ? menuItem.imgUrl
            : `https://ui-avatars.com/api/?name=${name}&background=random`,
        };
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 4);

    return {
      totalOrders: reports.length,
      uniqueCustomers: new Set(reports.map((r) => r.name)).size,
      mostOrderedDishes: mostOrdered,
    };
  }, [reports]);


  
  return (
    <div className="flex-1 p-8 bg-darkbg1 text-white h-screen overflow-hidden flex flex-col">
      <header className="mb-6 flex-shrink-0">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <h2 className="mt-3 text-gray-500 font-sans">
          {today.toLocaleString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "2-digit",
          })}
        </h2>
        <div className="border-b-2 border-gray-700 mt-2 w-full max-w-[1080px]"></div>
      </header>

      <div className="grid grid-cols-12 gap-6 flex-1 min-h-0 items-stretch">
        {/* KOLOM KIRI */}
        <div className="col-span-8 flex flex-col min-h-0 ">
          <div className="grid grid-cols-3 gap-6 mb-6 flex-shrink-0">
            <StatCard
              icon={<IconCoin className="text-primary" />}
              title="Total Revenue"
              value={`$ ${totalRevenue.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}`}
              percentage="+32.40%"
              up
            />
            <StatCard
              icon={<IconBookmark className="text-yellow-400" />}
              title="Total Dish Ordered"
              value={totalOrders.toLocaleString()}
              percentage="-12.40%"
              up={false}
            />
            <StatCard
              icon={<IconUsers className="text-blue-800" />}
              title="Total Customer"
              value={uniqueCustomers.toLocaleString()}
              percentage="+2.40%"
              up
            />
          </div>

          <div className="bg-darkbg2 rounded-xl p-6 flex flex-col flex-1 min-h-0 shadow-lg">
            <h3 className="text-xl font-bold mb-6">Order Report</h3>
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <table className="w-full text-left border-separate border-spacing-y-2">
                <thead className="text-gray-400 border-b border-gray-700 sticky top-0 bg-darkbg2 z-10">
                  <tr>
                    <th className="pb-4 font-medium">Customer</th>
                    <th className="pb-4 font-medium">Menu</th>
                    <th className="pb-4 font-medium text-center">
                      Total Payment
                    </th>
                    <th className="pb-4 font-medium ">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/50">
                  {reports.map((report, index) => (
                    <OrderRow key={index} {...report} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* KOLOM KANAN */}
        <div className="col-span-4 flex flex-col gap-6 min-h-0 mt-[-110]">
          <div className="bg-darkbg2 rounded-xl p-6 flex flex-col flex-1 min-h-0 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Most Ordered</h3>
              <select className="bg-transparent text-sm text-gray-400 border border-gray-700 rounded-lg p-1 outline-none">
                <option>Today</option>
              </select>
            </div>
            <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
              {mostOrderedDishes.map((dish, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 hover:bg-white/5 p-2 rounded-lg transition-all"
                >
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-primary/20"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-white leading-tight">
                      {dish.name}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {dish.count} dishes ordered
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-3 border border-primary text-primary rounded-xl mt-6 font-bold hover:bg-primary hover:text-white transition-all">
              View All
            </button>
          </div>

          <div className="bg-darkbg2 rounded-xl p-6 h-[320px] flex-shrink-0 shadow-lg">
            <h3 className="text-xl font-bold mb-4">Most Type of Order</h3>
            <div className="h-full flex items-center justify-center border-2 border-dashed border-gray-700 rounded-xl bg-darkbg/30">
              <p className="text-gray-500 text-sm italic">Ready for Chart</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// SUB KOMPONEN
function StatCard({ icon, title, value, percentage, up }) {
  return (
    <div className="bg-darkbg2 p-6 rounded-xl space-y-3 shadow-lg">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-darkbg rounded-lg">{icon}</div>
        <span
          className={`text-sm font-bold ${
            up ? "text-green-500" : "text-red-500"
          }`}
        >
          {percentage} {up ? "↑" : "↓"}
        </span>
      </div>
      <h4 className="text-2xl font-bold">{value}</h4>
      <p className="text-gray-400 text-sm">{title}</p>
    </div>
  );
}

function OrderRow({ name, menu, amount, status, color }) {
  // Kita buat URL DiceBear secara langsung menggunakan string template
  // avataaars adalah style-nya, dan 'seed' adalah nama pelanggan agar wajahnya tetap sama
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
    name
  )}&backgroundColor=b6e3f4,c0aede,d1d4f9`;

  return (
    <tr className="text-lg border-b border-gray-700/50">
      <td className="py-2 flex items-center gap-3">
        <img
          src={avatarUrl}
          alt={name}
          className="w-10 h-10 rounded-full bg-darkbg" // Tambahkan bg agar terlihat rapi saat loading
          loading="lazy"
        />
        <span className="text-white font-medium">{name}</span>
      </td>
      <td className="py-2 text-gray-400 max-w-[200px] truncate">{menu}</td>
      <td className="py-2 text-gray-400 text-center">{amount}</td>
      <td className="py-2">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${color}`}>
          {status}
        </span>
      </td>
    </tr>
  );
}
