'use client'

import Image from "next/image"
import { useState } from "react"


export default function MenuPage () {
    const today = new Date()

    const tabs = ["Hot Dishes", "Cold Dishes", "Soup", "Grill", "Apetizer", "Desert"]
    const [activeTab, setActiveTab] = useState(tabs[0])
    const handleChangeTab = (tab:string) => {
        console.log(tab)
        setActiveTab(tab)
    }

    const menus = [
        {
            type: "Hot Dishes",
            items: [
                {
                    imgUrl: "/image/1.png",
                    dishName:"Spicy seasoned seafood noodles",
                    price: 2.29,
                    stock: 20
                },
                {
                    imgUrl:"/image/2.png",
                    dishName:"Salted Pasta with mushroom sauce",
                    price: 2.69,
                    stock: 11
                },
                {
                    imgUrl:"/image/3.png",
                    dishName:"Beef dumpling in hot and sour soup",
                    price: 2.99,
                    stock: 16
                },
                {
                    imgUrl:"/image/4.png",
                    dishName:"Healthy noodle with spinach leaf",
                    price: 3.29,
                    stock: 22
                },
                {
                    imgUrl:"/image/5.png",
                    dishName:"Hot spicy fried rice with omelet",
                    price: 3.49,
                    stock: 13
                },
                {
                    imgUrl:"/image/6.png",
                    dishName:"Spicy instant noodle with special omelette",
                    price: 3.59,
                    stock: 17
                },
            ]
        },
        {
            type: "Cold Dishes",
            items: [
                {
                    imgUrl:"/image/7.png",
                    dishName:"Salad garlic sauce",
                    price: 2.19,
                    stock: 21
                },
                {
                    imgUrl:"/image/8.png",
                    dishName:"Salad tropic mushroom sauce",
                    price: 3.99,
                    stock: 15
                },
                {
                    imgUrl:"/image/9.png",
                    dishName:"Classic Salad with brown sauce",
                    price: 3.49,
                    stock: 13
                },
                {
                    imgUrl:"/image/10.png",
                    dishName:"Special Salad garden",
                    price: 2.49,
                    stock: 11
                },
                {
                    imgUrl:"/image/11.png",
                    dishName:"Dimsum soup special",
                    price: 2.12,
                    stock: 15
                },
                {
                    imgUrl:"/image/12.png",
                    dishName:"Kwetiau kungfu panda",
                    price: 3.49,
                    stock: 10
                },
            ]
        }

]

    return (
        <div className="bg-darkbg1 rounded-2xl p-4 min-w-full min-h-full">
            {/* header */}
            <div className="flex flex-row justify-between items-center text-white">
                <div className="font-bold w-2xl  ">
                    <div className="font-light text-4xl text-whitefont">Jaegar Resto</div>
                    <div className="font-extralight text-whitefont">Tesday, 2 Februari 2023</div>
                </div>
            {/* search bar */}
                <div className="flex flex-row">
                    <input 
                type="text" 
                placeholder="Search for food, etc..." 
                className="bg-search rounded-2xl w-100 h-15 p-4" 
                />
                <div className="text-white bg-search">IconSearch</div>
                </div>
            
            </div>
            {/* tabs */}
            <div className="flex mt-4 mb-1 text-white border-b border-white/50 font-light">
                {tabs.map((tab, index) =>(
                    <div key={index} onClick={()=>handleChangeTab(tab)} className={`px-3 pb-1 hover:bg-primary ${activeTab===tab?"text-primary border-b-3 border-primary font-semibold":""}`}>{tab}</div>
                ))}
            </div>

            {/* dishes card */}
            <div className="px-4 mt-4">
                <div className="flex items-center justify-between">
                    <h1>Choose Dishes</h1>
                    <select name="" id="">
                        <option value="">Dine In</option>
                        <option value="">Take Away</option>
                    </select>
                </div>
                <div className="grid grid-cols-5 gap-5 ">
                    {menus.find(menu => menu.type === activeTab )?.items.map((item, index) => (
                        <div key={index} className="bg-search flex flex-col gap-1 items-center text-white">
                            {item.imgUrl !== ""? (
                                <Image src={item.imgUrl} alt={item.dishName} width={132} height={132} />
                            ) : (
                            <div className="size-33 rounded-full bg-primary m-52"></div> 
                            )}
                            <h3 className="centered">{item.dishName}</h3>
                            <p>{item.price}</p>
                            <p>{item.stock} Bowls available</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
            
    )
}