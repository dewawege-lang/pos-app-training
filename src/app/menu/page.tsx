'use client'

import { useState } from "react"

export default function MenuPage () {
    const today = new Date()

    const tabs = ["Hot Dishes", "Cold Dishes", "Soup", "Grill", "Apetizer", "Desert"]
    const [activeTab, setActiveTab] = useState(tabs[0])
    const handleChangeTab = (tab:string) => {
        console.log(tab)
        setActiveTab(tab)
    }

    return (
        <div className="bg-darkbg1 rounded-2xl p-4 min-w-full min-h-full">
            {/* header */}
            <div className="flex flex-row justify-between items-center text-white">
                <div className="font-bold w-2xl  ">
                    <div className="font-light text-4xl text-whitefont">Jaegar Resto</div>
                    <div className="font-extralight text-whitefont">Tesday, 2 Februari 2023</div>
                </div>
            {/* search bar */}
                <div>
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
        </div>
            
    )
}