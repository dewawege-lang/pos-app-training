"use client";
import {
  IconArrowLeft,
  IconPlus,
  IconTrash,
  IconCreditCard,
  IconCheck,
  IconBrandPaypal,
  IconCash,
  IconClick,
} from "@tabler/icons-react";
import { act, useState } from "react";

// Tambahkan setOrders ke dalam list Props
export default function PaymentModal({
  orders,
  setOrders,
  onClose,
  activePaymentTab,
  setActivePaymentTab,
}) {
  // 1. State menghitung uang kembalian
  const [cashReceived, setCashReceived] = useState(0);
  
  const subtotal = orders.reduce((acc, curr) => acc + curr.price * curr.qty, 0);

  // 2. Fungsi menghapus pesanan
  const deleteOrder = (itemToDelete) => {
    setOrders(
      orders.filter(
        (order) =>
          !(
            order.dishName === itemToDelete.dishName &&
            order.type === itemToDelete.type
          )
      )
    );
  };

  const PaymentTab = ["Debit", "Paypal", "Cash"];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm">
      <div className="bg-darkbg2 w-[850px] h-full flex shadow-2xl animate-in slide-in-from-right duration-500">
        {/* BAGIAN 1: CONFIRMATION (Kiri) */}
        <div className="flex-1 p-8 border-r border-gray-700 overflow-y-auto">
          <button
            onClick={onClose}
            className="text-white mb-6 hover:text-primary"
          >
            <IconArrowLeft size={28} />
          </button>

          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white">Confirmation</h2>
              <p className="text-gray-400">Orders #34562</p>
            </div>
            <button className="bg-primary p-3 rounded-xl text-white">
              <IconPlus size={20} />
            </button>
          </div>

          <div className="space-y-6">
            {orders.map((item, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div className="flex gap-4 items-center">
                    <div className="text-white">
                      <p className="font-medium">{item.dishName}</p>
                      <p className="text-sm text-gray-500">$ {item.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <span className="my-2 text-[10px] bg-gray-700 px-2 py-0.5 rounded text-primary uppercase text-nowrap">
                      {item.type}
                    </span>
                    <span className="bg-search px-4 py-2 rounded-lg border border-gray-700">
                      {item.qty}
                    </span>
                    <span className="font-bold text-nowrap">
                      $ {(item.qty * item.price).toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <input
                    placeholder="Order Note..."
                    className="flex-1 bg-search border border-gray-700 rounded-xl p-3 text-sm text-white outline-none focus:border-primary"
                  />
                  <button
                    onClick={() => deleteOrder(item)} // Menjalankan fungsi hapus
                    className="p-2.5 border border-primary/50 rounded-xl text-primary hover:bg-red-500 hover:text-white transition-all"
                  >
                    <IconTrash size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BAGIAN 2: PAYMENT METHOD (Kanan) */}
        <div className="w-[380px] p-8 flex flex-col">
          <h2 className="text-2xl font-bold text-white mb-2">Payment</h2>
          <p className="text-gray-400 mb-8 text-sm">
            3 payment methods available
          </p>

          <h3 className="text-white font-medium mb-4">Payment Method</h3>
          {/* Card Option Terpilih */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {/* TOMBOL CARD */}
            <button
              type="button"
              onClick={() => setActivePaymentTab("Debit")}
              className={`p-4 rounded-xl flex flex-col items-center gap-2 relative transition-all ${
                activePaymentTab === "Debit"
                  ? "border-2 border-primary bg-search text-white"
                  : "border-gray-700 text-gray-500"
              }`}
            >
              {activePaymentTab === "Debit" && (
                <IconCheck
                  size={16}
                  className="absolute top-2 right-2 text-primary"
                />
              )}
              <IconCreditCard />
              <span className="text-xs">Card</span>
            </button>
            {/* TOMBOL PAYPAL */}
            <button
              type="button"
              onClick={() => setActivePaymentTab("Paypal")}
              className={`p-4 rounded-xl flex flex-col items-center gap-2 relative broder-2 transition-all ${
                activePaymentTab === "Paypal"
                  ? "border-2 border-primary bg-search text-white"
                  : "border-gray-700 text-gray-500"
              }`}
            >
              {activePaymentTab === "Paypal" && (
                <IconCheck
                  size={16}
                  className="absolute top-2 right-2 text-primary"
                />
              )}
              <IconBrandPaypal />
              <span className="text-xs">Paypal</span>
            </button>

            {/* TOMBOL CASH */}
            <button
              type="button"
              onClick={() => setActivePaymentTab("Cash")}
              className={`p-4 rounded-xl flex flex-col items-center gap-2 relative broder-2 transition-all ${
                activePaymentTab === "Cash"
                  ? "border-2 border-primary bg-search text-white"
                  : "border-gray-700 text-gray-500"
              }`}
            >
              {activePaymentTab === "Cash" && (
                <IconCheck
                  size={16}
                  className="absolute top-2 right-2 text-primary"
                />
              )}
              <IconCash />
              <span className="text-xs">Cash</span>
            </button>
          </div>

          {/* DYNAMIC FORM SECTION */}
          <div className="space-y-4 mb-8 flex-1">
            {/* Tampilan Jika Pilih Debit */}
            {activePaymentTab === "Debit" && (
              <div className="space-4 animate-in fade-in duration-900">
                <div>
                  <label className="text-white text-sm block mb-2">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    placeholder="Levi Ackerman"
                    className="w-full bg-search border border-gray-700 rounded-xl p-3 text-white outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-white text-sm block mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="2564 1421 0897 1244"
                    className="w-full bg-search border border-gray-700 rounded-xl p-3 text-white outline-none focus:border-primary"
                  />
                </div>
              </div>
            )}

            {/* Tampilan Jika Pilih PAYPAL */}
            {activePaymentTab === "Paypal" && (
              <div className="space-y-4 animate-in fade-in duration-900">
                <div>
                  <label className="text-white text-sm block mb-2">
                    Paypal Email
                  </label>
                  <input
                    type="email"
                    placeholder="example@paypal.com"
                    className="w-full bg-search border border-gray-700 rounded-xl p-3 text-white outline-none focus:border-primary"
                  />
                </div>
                <p className="text-xs text-gray-500 italic">
                  * You will be redirected to Paypal to complete payment
                </p>
              </div>
            )}

            {/* Tampilan Jika Pilih CASH */}
            {activePaymentTab === "Cash" && (
              <div className="space-y-4 animate-in fade-in duration-900">
                <div>
                  <label className="text-white text-sm block mb-2">
                    Cash Amount Given
                  </label>
                  <input
                    type="number"
                    onChange={(e) => setCashReceived(Number(e.target.value))}
                    className="w-full bg-search border border-primary/50 rounded-xl p-3 text-white text-xl font-bold  focus:border-primary"
                    placeholder="0.00"
                  />
                </div>
                <div className="bg-primary/10 p-4 rounded-xl border b border-primary/20">
                  <p className="text-gray-400 text-xs mb-1">Change</p>
                  <p className="text-pretty text-2xl font-bold">
                    $ {Math.max(0, cashReceived - subtotal).toFixed(2)}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* <div className="flex justify-between gap-4 w">
            <div className="border-2 border-primary bg-search p-4 rounded-xl flex flex-col items-center gap-2 relative cursor-pointer">
              <div className="absolute top-2 right-2 text-primary">
                <IconCheck size={16} />
              </div>
              <IconCreditCard />
              <span className="text-xs">Credit Card</span>
            </div>
            <div className="border border-gray-700 p-4 rounded-xl flex flex-col items-center gap-2 text-gray-500 cursor-pointer">
              <IconBrandPaypal />
              <span className="text-xs font-bold">Paypal</span>
            </div>
            <div className="border border-gray-700 p-4 rounded-xl flex flex-col items-center gap-2 text-gray-500 cursor-pointer">
              <IconCash />
              <span className="text-xs font-bold">Cash</span>
            </div>
          </div> */}

          {/* Form Input (Levi Ackerman) */}
          {/* <div className="space-y-4 mb-8">
            <div>
              <label className="text-white text-sm block mb-2">
                Cardholder Name
              </label>
              <input
                type="text"
                defaultValue="Levi Ackerman"
                className="w-full bg-search border border-gray-700 rounded-xl p-3 text-white outline-none"
              />
            </div>
            <div>
              <label className="text-white text-sm block mb-2">
                Card Number
              </label>
              <input
                type="text"
                defaultValue="2564 1421 0897 1244"
                className="w-full bg-search border border-gray-700 rounded-xl p-3 text-white outline-none"
              />
            </div>
          </div> */}

          {/* TOTAL & ACTION */}
          <div className="mt-auto border-t border-gray-700 pt-4">
            <div className="flex justify-between text-white font-bold text-xl mb-6">
              <span>Total</span>
              <span>$ {subtotal.toFixed(2)}</span>
            </div>

            <div className="flex gap-4">
              <button
                onClick={onClose}
                className="flex-1 py-4 border border-primary text-primary rounded-xl font-bold hover:bg-primary/10"
              >
                Cancel
              </button>
              <button className="flex-1 py-4 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/30">
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
