export default function BillingSideBar() {
  return (
    <div></div>
  );
}

// "use client";

// import { IconShoppingCartFilled, IconTrash } from "@tabler/icons-react";
// import Image from "next/image";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";

// // Import komponen dasar Shadcn Form
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/components/ui/form";
// import { useEffect } from "react";

// // 1. Definisi Schema Validasi
// const formSchema = z.object({
//   orderItems: z
//     .array(z.any())
//     .min(1, "Orders are still empty! Please select the menu first."),
//   // Note: Untuk note per item biasanya menggunakan array,
// });

// export default function BillingSideBar({
//   orders,
//   setOrders,
//   activeBillingTab,
//   setActiveBillingTab,
//   onContinue,
// }) {
//   const tabs = ["Dine in", "Take Away", "Delivery"];

//   // Memfilter pesanan sesuai tab billing yang sedang dibuka
//   const filteredOrders = orders.filter(
//     (order) => order.type === activeBillingTab
//   );

//   // 2. Inisialisasi Shadcn Form
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       orderItems: filteredOrders,
//     },
//   });

//   //Sinkronasi state 'orders' ke dalam internal form shadcn
//   //Agar saat item dihapus/ditambah, shadcn tahhu jumlah terbarunya
//   useEffect(() => {
//     form.setValue("orderItems", filteredOrders, { shouldValidate: true });
//   }, [filteredOrders, form]);

//   // 3. Handler saat tombol "Continue" diklik (Submit)
//   const onSubmit = (values: z.infer<typeof formSchema>) => {
//     //jika sampai sini, berarti validasi .min(1) terpenuhi
//     onContinue();
//   };

//   const deleteOrder = (itemToReduce) => {
//     setOrders((prevOrders) => {
//       return prevOrders
//         .map((order) => {
//           if (
//             order.dishName === itemToReduce.dishName &&
//             order.type === itemToReduce.type
//           ) {
//             if (order.qty > 1) {
//               return { ...order, qty: order.qty - 1 };
//             }
//             return null;
//           }
//           return order;
//         })
//         .filter((order) => order !== null);
//     });
//   };

//   return (
//     <div className="flex flex-col bg-darkbg2 p-6 w-full h-full shadow-2xl border-l border-gray-700">
//       {/* 4. Bungkus dengan Provider Form */}
//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(onSubmit)}
//           className="flex flex-col h-full"
//         >
//           {/* Header */}
//           <div className="flex justify-between">
//             <div className="text-white text-2xl font-bold mb-4">
//               Orders #34562
//             </div>
//             <div className="flex justify-between gap-1 px-2 py-1.5 h-min bg-gray-700 rounded-2xl items-center">
//               <div className="text-white text-2xl text-center font-bold">
//                 <IconShoppingCartFilled />
//               </div>
//               <div className="rounded-full bg-darkbg2 size-7 flex items-center justify-center text-white text-xs">
//                 {filteredOrders.reduce((acc, item) => acc + item.qty, 0)}
//               </div>
//             </div>
//           </div>

//           {/* Tabs Billing */}
//           <div className="flex gap-3 mb-6">
//             {tabs.map((tab, index) => (
//               <button
//                 key={index}
//                 type="button" // PENTING: Agar klik tab tidak men-submit form
//                 onClick={() => setActiveBillingTab(tab)}
//                 className={`px-4 py-2 border-2 rounded-xl transition-all duration-200 text-sm ${
//                   activeBillingTab === tab
//                     ? "bg-primary border-primary text-white"
//                     : "border-gray-700 text-primary hover:bg-gray-800"
//                 }`}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>

//           {/* List Header */}
//           <div className="grid grid-cols-12 gap-2 mt-2 font-semibold text-white border-b border-gray-700 pb-4">
//             <p className="col-span-8 text-sm">Item</p>
//             <p className="text-center text-sm">Qty</p>
//             <p className="col-span-3 pl-4 text-center text-sm">Price</p>
//           </div>

//           {/* Scrollable order list validasi dengan formfield (hidden)*/}
//           <FormField
//             control={form.control}
//             name="orderItems"
//             render={() => (
//               <FormItem className="flex-1 flex flex-col overflow-hidden mt-4">
//                 {/* Eror message diletakkan di atas daftar menu */}
//                 <FormMessage className="bg-red-500/10 border-red-500/10 text-red-400 p-3 rounded-lg text-center mb-4 animate-in fade-in zoom-in duration-300" />

//                 <FormControl>
//           <div className="flex-1 overflow-y-auto mt-4 space-y-6 pr-2 custom-scrollbar">
//             {filteredOrders.length > 0 ? (
//               filteredOrders.map((item, idx) => (
//                 <div key={idx} className="flex flex-col gap-3">
//                   <div className="grid grid-cols-12 gap-2 items-center text-white">
//                     <div className="col-span-2">
//                       <Image
//                         src={item.imgUrl}
//                         alt={item.dishName}
//                         width={50}
//                         height={50}
//                         className="drop-shadow-2xl"
//                         />
//                     </div>
//                     <div className="col-span-6">
//                       <p className="font-medium truncate">{item.dishName}</p>
//                       <p className="text-sm text-gray-500">
//                         $ {item.price.toFixed(2)}
//                       </p>
//                     </div>
//                     <div className="col-span-2 flex justify-center">
//                       <div className="bg-search p-2 rounded-lg w-10 text-center border border-gray-700 text-sm">
//                         {item.qty}
//                       </div>
//                     </div>
//                     <div className="col-span-2 text-right font-semibold text-sm">
//                       $ {(item.qty * item.price).toFixed(2)}
//                     </div>
//                   </div>

//                   {/* Note & Delete row */}
//                   <div className="flex gap-3 items-center">
//                     <input
//                       type="text"
//                       placeholder="Order note..."
//                       className="flex-1 bg-search rounded-xl h-11 px-4 text-white text-xs border border-gray-700 focus:outline-none focus:border-primary"
//                       />
//                     <button
//                       type="button" // PENTING: Agar klik hapus tidak men-submit form
//                       onClick={() => deleteOrder(item)}
//                       className="p-2.5 border border-red-500/50 rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all"
//                       >
//                       <IconTrash size={18} />
//                     </button>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="text-center py-20 text-gray-500 italic text-sm">
//                 No orders for {activeBillingTab}
//               </div>
//             )}
//         </div>
//         </FormControl>
//       </FormItem>
//     )}
//   />

//           {/* Total Footer */}
//           <div className="border-t border-gray-700 pt-5 mt-auto">
//             <div className="flex justify-between text-gray-400 text-sm mb-2">
//               <span>Discount</span>
//               <span>$0.00</span>
//             </div>
//             <div className="flex justify-between text-white font-bold text-xl mb-6">
//               <span>Subtotal</span>
//               <span>
//                 $ {filteredOrders
//                   .reduce((acc, curr) => acc + curr.price * curr.qty, 0)
//                   .toFixed(2)}
//               </span>
//             </div>
//             <div className="flex justify-between mb-6">
//               <p className="col-span-4 text-white">Cashier</p>
//               <p className="col-span-8 text-white">Nama Kasir</p>
//             </div>

//             {/* Tombol Submit Utama */}
//             <button
//               type="submit"
//               className="w-full bg-primary hover:bg-opacity-90 py-4 rounded-xl text-white font-bold shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
//             >
//               Continue to Payment
//             </button>
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// }
