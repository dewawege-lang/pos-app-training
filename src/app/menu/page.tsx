"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IconGardenCartFilled,
  IconSearch,
  IconTrash,
} from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import z from "zod";

interface IOrderItem {
  imgUrl: string;
  dishName: string;
  price: number;
  stock: number;
}

interface ICartItem extends IOrderItem {
  qty: number;
}

export default function MenuPage() {
  const today = new Date();

  const tabs = [
    "Hot Dishes",
    "Cold Dishes",
    "Soup",
    "Grill",
    "Appetizer",
    "Desert",
  ];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const handleChangeTab = (tab: string) => {
    console.log(tab);
    setActiveTab(tab);
  };

  const menus = [
    {
      type: "Hot Dishes",

      items: [
        {
          imgUrl:
            "https://mykoreankitchen.com/wp-content/uploads/2016/04/2.-Jjampong-500x375.jpg",

          dishName: "Spicy seasoned seafood noodles",

          price: 2.29,

          stock: 20,
        },

        {
          imgUrl:
            "https://www.cucinabyelena.com/wp-content/uploads/2025/01/Creamy-Mushroom-Pasta-Recipe-21.jpg",

          dishName: "Salted pasta with mushroom sauce",

          price: 2.69,

          stock: 11,
        },

        {
          imgUrl:
            "https://www.marionskitchen.com/wp-content/uploads/2019/12/Mushroom-Dumpling-Hot-Sour-Soup2.jpg",

          dishName: "Beef dumpling in hot and sour sauce",

          price: 2.99,

          stock: 16,
        },
      ],
    },

    {
      type: "Cold Dishes",

      items: [
        {
          imgUrl: "",

          dishName: "Cold spicy seasoned seafood noodles",

          price: 2.29,

          stock: 20,
        },

        {
          imgUrl: "",

          dishName: "Cold salted pasta with mushroom sauce",

          price: 2.69,

          stock: 11,
        },

        {
          imgUrl: "",

          dishName: "Cold beef dumpling in hot and sour sauce",

          price: 2.99,

          stock: 16,
        },
      ],
    },
  ];

  const orderType = ["Dine In", "To Go", "Delivery"];

  const [currentOrderType, setCurrentOrderType] = useState(orderType[0]);

  const orderFormSchema = z.object({
    customerName: z
      .string()
      .regex(/^[a-zA-Z]+$/, "Hanya huruf")
      .min(2, "Nama Pelanggan Minimal 2 Huruf"),
    tableNumber: z.string().regex(/^\d*$/, "Harus angka").optional(),
    order: z
      .array(
        z.object({
          dishName: z.string(),
          qty: z.number(),
          price: z.number(),
          imgUrl: z.string(),
        })
      )
      .min(1, "Minimal 1 item dipilih"),
  });

  const orderForm = useForm<z.infer<typeof orderFormSchema>>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      customerName: "",
      tableNumber: "",
      order: [],
    },
  });

  function onFormSubmit(values: z.infer<typeof orderFormSchema>) {
    console.log(values);
  }

  const paymentOrderSchema = z.object({
    cardHolderName: z
      .string()
      .min(2)
      .regex(/^[a-zA-Z]+$/, "Hanya huruf"),
    cardNumber: z.string().length(16, "Harus 16 digit angka"),
    expirationDate: z.string(),
    cvv: z.string().length(3, "Hanya 3 angka").regex(/^\d*$/, "Harus angka"),
  });

  const paymentOrderForm = useForm<z.infer<typeof paymentOrderSchema>>({
    resolver: zodResolver(paymentOrderSchema),
    defaultValues: {
      cardHolderName: "",
      cardNumber: "",
      expirationDate: "",
      cvv: "",
    },
  });

  function onPaymentFormSubmit(values: z.infer<typeof paymentOrderSchema>) {
    console.log(values);
  }

  const { control, handleSubmit } = orderForm;

  const { fields, update, append, remove } = useFieldArray({
    control,
    name: "order",
  });

  const cartSubTotal = fields.reduce(
    (sum, curr) => sum + curr.price * curr.qty,
    0
  );

  return (
    <Sheet>
      <div className="bg-darkbg1 rounded-2xl min-w-full min-h-full flex gap-2 overflow-hidden">
        <div className="p-4 flex-1">
          {/* header  */}
          <header className="flex justify-between items-center text-white">
            {/* resto name & date  */}
            <div>
              <h1 className="text-2xl font-semibold">Joger Resto</h1>
              <h3>
                {today.toLocaleString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                })}
              </h3>
            </div>
            {/* search bar  */}
            <div className="centered h-10 bg-formbg rounded-md overflow-hidden">
              <div className="bg-darkbg2 size-full centered p-2">
                <IconSearch />
              </div>
              <input
                type="text"
                name=""
                id=""
                placeholder="Search food, coffee, and others..."
                className="ml-2 outline-none w-50 h-full text-sm"
              />
            </div>
          </header>

          {/* tabs  */}
          <div className="flex mt-4 text-white border-b border-white/50">
            {tabs.map((tab, index) => (
              <div
                key={index}
                onClick={() => handleChangeTab(tab)}
                className={`px-3 pb-1 hover:bg-primary cursor-pointer ${
                  activeTab === tab
                    ? "text-primary border-b-2 border-primary font-semibold"
                    : ""
                }`}
              >
                {tab}
              </div>
            ))}
          </div>

          {/* dishes cards  */}
          <div className="px-4 mt-4">
            <div className="flex items-center justify-between">
              <h1 className="text-white">Choose Dishes</h1>
              <select
                name=""
                id=""
                className="bg-darkbg2 text-white p-1 rounded"
              >
                <option value="">Dine In</option>
                <option value="">Take Away</option>
              </select>
            </div>
            <div className="grid grid-cols-5 gap-5 mt-4">
              {menus
                .find((menu) => menu.type === activeTab)
                ?.items.map((item, index) => (
                  <div
                    key={index}
                    className="bg-formbg flex flex-col gap-1 items-center text-white hover:ring-1 hover:ring-blue-700 cursor-pointer p-4 rounded-xl"
                    onClick={() => {
                      const currentIndex = fields.findIndex(
                        (f) => f.dishName === item.dishName
                      );

                      if (currentIndex === -1) {
                        append({
                          dishName: item.dishName,
                          qty: 1,
                          price: item.price,
                          imgUrl: item.imgUrl,
                        });
                      } else {
                        update(currentIndex, {
                          ...fields[currentIndex],
                          qty: fields[currentIndex].qty + 1,
                        });
                      }
                    }}
                  >
                    {item.imgUrl !== "" ? (
                      <div className="relative size-32 mb-2">
                        <Image
                          src={item.imgUrl}
                          alt={item.dishName}
                          fill
                          className="object-cover rounded-full"
                        />
                      </div>
                    ) : (
                      // fallback
                      <div className="size-32 rounded-full bg-primary mb-2"></div>
                    )}
                    <h3 className="text-center font-medium line-clamp-2 h-10">
                      {item.dishName}
                    </h3>
                    <p className="text-primary">${item.price}</p>
                    <p className="text-gray-400 text-xs">
                      {item.stock} Bowls available
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/* order sheet  */}
        <div className="w-100">
          <Form {...orderForm}>
            <form
              onSubmit={handleSubmit(onFormSubmit)}
              className="bg-darkbg2 w-full min-h-full p-6 text-white flex flex-col gap-y-5"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Order #32412</h2>

                <div className="flex items-center">
                  <IconGardenCartFilled />
                  <p className="p-1 size-6 centered bg-primary text-white text-xs rounded-full">
                    {fields.length}
                  </p>
                </div>
              </div>
              <FormField
                control={orderForm.control}
                name="customerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Santoso"
                        {...field}
                        className="bg-formbg border-none"
                      />
                    </FormControl>
                    <FormDescription>Tulis nama pelanggan</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2 items-center">
                {orderType.map((item, index) => (
                  <Button
                    type="button"
                    variant={currentOrderType === item ? "default" : "ghost"}
                    key={index}
                    onClick={() => setCurrentOrderType(item)}
                    className={
                      currentOrderType === item
                        ? "bg-primary"
                        : "text-primary border border-primary"
                    }
                  >
                    {item}
                  </Button>
                ))}
              </div>
              {currentOrderType === "Dine In" && (
                <FormField
                  control={orderForm.control}
                  name="tableNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Table No.</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="1"
                          {...field}
                          className="bg-formbg border-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <div className="grid grid-cols-12 gap-x-1 gap-y-3 mt-4">
                <span className="col-span-8 text-sm font-medium">Item</span>
                <span className="col-span-2 text-sm font-medium">Qty</span>
                <span className="col-span-2 text-sm font-medium">Price</span>
                <div className="col-span-12 border-b border-white/20 w-full"></div>
                <div className="col-span-12 max-h-[400px] overflow-y-auto custom-scrollbar">
                  <div className="grid grid-cols-12 gap-y-4">
                    {fields.map((cartItem, index) => (
                      <div key={cartItem.id} className="contents">
                        <div className="col-span-8 flex items-center">
                          {cartItem.imgUrl ? (
                            <div className="relative size-12 mr-3 flex-shrink-0">
                              <Image
                                src={cartItem.imgUrl}
                                alt={cartItem.dishName}
                                fill
                                className="object-cover rounded-md"
                              />
                            </div>
                          ) : (
                            <div className="size-12 rounded-md bg-primary mr-3 flex-shrink-0"></div>
                          )}
                          <div className="flex flex-col overflow-hidden">
                            <p className="text-sm font-medium truncate">
                              {cartItem.dishName}
                            </p>
                            <p className="text-xs text-gray-400">
                              ${cartItem.price}
                            </p>
                          </div>
                        </div>
                        <div className="col-span-2 centered">
                          <div className="size-10 centered bg-formbg rounded-md border border-white/10">
                            {cartItem.qty}
                          </div>
                        </div>
                        <div className="col-span-2 centered text-sm">
                          ${(cartItem.qty * cartItem.price).toFixed(2)}
                        </div>
                        <div className="col-span-10">
                          <Input
                            type="text"
                            placeholder="Order Note..."
                            className="bg-formbg border-none h-8 text-xs"
                          />
                        </div>
                        <div
                          className="col-span-2 centered cursor-pointer"
                          onClick={() => {
                            if (cartItem.qty > 1) {
                              update(index, {
                                ...cartItem,
                                qty: cartItem.qty - 1,
                              });
                            } else {
                              remove(index);
                            }
                          }}
                        >
                          <IconTrash className="p-1.5 size-8 text-red-400 hover:text-red-500 border border-red-400/30 rounded-md" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-span-12 border-b border-white/20 my-2"></div>
                <p className="col-span-10 text-gray-400">Discount</p>
                <p className="col-span-2 text-right">$0</p>
                <p className="col-span-10 text-gray-400">Subtotal</p>
                <p className="col-span-2 text-right font-semibold">
                  $
                  {cartSubTotal.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <SheetTrigger
                type="submit"
                className="bg-primary text-white w-full py-6 mt-auto"
              >
                Continue To Payment
              </SheetTrigger>
            </form>
          </Form>
        </div>
        <Form {...paymentOrderForm}>
          <SheetContent className="bg-darkbg1 text-white">
            <SheetHeader>
              <SheetTitle className="text-primary text-3xl font-bold">
                Payment
              </SheetTitle>
              <SheetDescription className="my-6 flex flex-col gap-y-5">
                <FormField
                  control={paymentOrderForm.control}
                  name="cardHolderName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Pemegang Kartu</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Santoso"
                          {...field}
                          className="bg-formbg border-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={paymentOrderForm.control}
                  name="cardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>No Kartu</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="XXXX XXXX XXXX XXXX"
                          {...field}
                          className="bg-formbg border-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={paymentOrderForm.control}
                  name="expirationDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expired On:</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Santoso"
                          {...field}
                          className="bg-formbg border-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={paymentOrderForm.control}
                  name="cvv"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CVV</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="XXX"
                          {...field}
                          className="bg-formbg border-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Form>
      </div>
    </Sheet>
  );
}
