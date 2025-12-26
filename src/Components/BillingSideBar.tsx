'use client'

import { useState } from "react";
import { IconTrash } from "@tabler/icons-react"

export default function BillingSideBar({ orders, setOrders, activeBillingTab, setActiveBillingTab }) {
    const tabs = ["Dine in", "Take Away", "Delivery"]
    
    // Memfilter pesanan sesuai tab billing yang sedang dibuka
    const filteredOrders = orders.filter(order => order.type === activeBillingTab)
    
    // Fungsi menghapus pesanan
    const deleteOrder = (itemToDelete) => {
        // Filter orders utama, buang item yang dishName DAN type-nya sama
        setOrders(orders.filter(order => 
            !(order.dishName === itemToDelete.dishName && order.type === itemToDelete.type)
        ));
    }

    return (
        <div className="flex flex-col bg-darkbg2 p-6 w-full h-full shadow-2xl border-l border-gray-700">
            {/* Header */}
            <div className="text-white text-2xl font-bold mb-4">Orders #34562</div>
            
            {/* Tabs Billing */}
            <div className="flex gap-3 mb-6">
                {tabs.map((tab, index) => (
                    <button 
                        key={index}
                        onClick={() => setActiveBillingTab(tab)} 
                        className={`px-4 py-2 border-2 rounded-xl transition-all duration-200 text-sm ${
                            activeBillingTab === tab 
                                ? "bg-primary border-primary text-white" 
                                : "border-gray-700 text-primary hover:bg-gray-800"
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* List Header */}
            <div className="grid grid-cols-8 gap-2 mt-2 font-semibold text-white border-b border-gray-700 pb-4">
                <p className="col-span-5 text-sm">Item</p>
                <p className="text-center text-sm">Qty</p>
                <p className="col-span-2 text-right text-sm">Price</p>
            </div>
        
            {/* Scrollable order list */}
            <div className="flex-1 overflow-y-auto mt-4 space-y-6 pr-2 custom-scrollbar">
                {filteredOrders.length > 0 ? (
                    filteredOrders.map((item, idx) => (
                        <div key={idx} className="flex flex-col gap-3">
                            {/* Item row */}
                            <div className="grid grid-cols-8 gap-2 items-center text-white">
                                <div className="col-span-5">
                                    {/* Perbaikan: Menggunakan dishName sesuai data dari page.tsx */}
                                    <p className="text-sm font-medium truncate">{item.dishName}</p>
                                    <p className="text-xs text-gray-500">$ {item.price.toFixed(2)}</p>
                                </div>
                                <div className="flex justify-center">
                                    <div className="bg-search p-2 rounded-lg w-10 text-center border border-gray-700 text-sm">
                                        {item.qty}
                                    </div>
                                </div>
                                <div className="col-span-2 text-right font-semibold text-sm">
                                    $ {(item.qty * item.price).toFixed(2)}
                                </div>
                            </div>

                            {/* Note & Delete row */}
                            <div className="flex gap-3 items-center">
                                <input 
                                    type="text"
                                    placeholder="Order note..."
                                    className="flex-1 bg-search rounded-xl h-11 px-4 text-white text-xs border border-gray-700 focus:outline-none focus:border-primary"
                                />
                                <button 
                                    onClick={() => deleteOrder(item)} // Perbaikan: Link ke fungsi hapus
                                    className="p-2.5 border border-red-500/50 rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all"
                                >
                                    <IconTrash size={18}/>
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-20 text-gray-500 italic text-sm">
                        {/* Perbaikan: Nama variabel yang benar */}
                        No orders for {activeBillingTab}
                    </div>
                )}
            </div>

            {/* Total Footer */}
            <div className="border-t border-gray-700 pt-5 mt-auto">
                <div className="flex justify-between text-gray-400 text-sm mb-2">
                    <span>Discount</span>
                    <span>$0.00</span>
                </div>
                <div className="flex justify-between text-white font-bold text-xl mb-6">
                    <span>Subtotal</span>
                    <span>
                        $ {filteredOrders.reduce((acc, curr) => acc + (curr.price * curr.qty), 0).toFixed(2)}
                    </span>
                </div>
                <button className="w-full bg-primary hover:bg-opacity-90 py-4 rounded-xl text-white font-bold shadow-lg shadow-primary/20 transition-all active:scale-[0.98]">
                    Continue to Payment
                </button>
            </div>
        </div>
    );
}