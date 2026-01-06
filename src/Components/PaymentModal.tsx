"use client";
import {
  IconArrowLeft,
  IconPlus,
  IconTrash,
  IconCreditCard,
  IconCheck,
  IconBrandPaypal,
  IconCash,
} from "@tabler/icons-react";

// 1. Tambahkan setOrders ke dalam list Props
export default function PaymentModal({
  orders,
  setOrders,
  onClose,
  activePaymentTab,
  setActivePaymentTab,
}) {
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
      <div className="bg-darkbg2 w-[850px] h-full flex shadow-2xl animate-in slide-in-from-right duration-300">
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
                      <p className="font-medium">
                        {item.dishName}
                      </p>
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
          {/* Tab Payment */}
          {/* <div className="grid grid-cols-3 gap-3 mb-8 text-white">
            {PaymentTab.map((tab, index) =>(
              <div
              key={index}
              onClick={() => setActivePaymentTab(tab)}
              className={`border-2 border-primary bg-search p-4 rounded-xl flex flex-col items-center gap-2 relative cursor-pointer ${
              activePaymentTab === tab
                ? "text-primary border-b-3 font-semibold"
                : ""
              }`}
              >
                {tab}

              </div>
            ))}
            </div> */}
          {/* Card Option Terpilih */}
          <div className="flex justify-between gap-4 w">
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
          </div>

          {/* Form Input (Levi Ackerman) */}
          <div className="space-y-4 mb-8">
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
          </div>

          {/* TOTAL OTOMATIS */}
          <div className="mt-auto border-t border-gray-700 pt-4">
            <div className="flex justify-between text-white font-bold text-xl mb-6">
              <span>Total</span>
              <span>
                ${" "}
                {orders
                  .reduce((acc, curr) => acc + curr.price * curr.qty, 0)
                  .toFixed(2)}
              </span>
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
