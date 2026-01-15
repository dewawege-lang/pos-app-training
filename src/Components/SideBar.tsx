'use client'

import { IconBuildingStore, IconBurger, IconDashboard, IconSettingsCog } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import SidebarUserInfo from "./sidebarUserInfo";
import { IUser } from "@/@types/user.type";

interface ISideBarProps {
  textTheme: string
}

export default function SideBar(props: ISideBarProps) {
  const [user, setUser] = useState<IUser|null>(null)

  const handleFetchUserCredential = async () => {
    fetch("https://dummyjson.com/users/16")
      .then((res) => res.json())
      .then(setUser)
      .catch((error)=> console.log(error))
  }
useEffect(()=>{
  handleFetchUserCredential()
}, [])

   const sideBarNavs = {
    header:{
      icon: <IconBuildingStore/>,
      title: "Kasir App",
      subTitle: "Kelola Penjualanmu",
    },
    navigations: [
      {
        icon: <IconDashboard/>,
        title: "Dashboard",
        url: "/dashboard"
      },
      {
        icon: <IconBurger/>,
        title: "Menu",
        url: "/menu",
      },
      {
        icon: <IconSettingsCog/>,
        title: "Settings",
        url: "/setting",
      },      
    ],
    footer:{}
  }

  const [sidebarOpen,setSidebarOpen] = useState(true)
  const handleSidebarOpen =() => {
    setSidebarOpen(!sidebarOpen)
  }
  return (
    <div
      className={`sm:w-[${
        sidebarOpen ? "300" : "60"
      }px] h-screen bg-darkbg2 p-4 flex flex-col justify-between`}
    >
      <div>
        {/* header */}
        <button
          onClick={handleSidebarOpen}
          className="centered gap-3 w-full font-semibold text-2xl bg-accent1 hover:bg-accent1/70 py-2 rounded-2xl"
        >
          <div className="*:size-10">{sideBarNavs.header.icon}</div>
          {sidebarOpen && <div>{sideBarNavs.header.title}</div>}
        </button>
        {/* nav */}
        <div className="my-3 py-4 flex flex-col gap-y-5">
          {sideBarNavs.navigations.map((nav, index) => (
            <Link
              key={index}
              href={nav.url}
              className={`flex gap-x-2 py-1.5 hover:bg-primary bg-[#1F1D2B] rounded-xl px-3 hover:font-bold ${props.textTheme}`}
            >
              {nav.icon}
              {sidebarOpen && <span>{nav.title}</span>}
            </Link>
          ))}
        </div>
      </div>
      {/* footer */}
          <SidebarUserInfo sidebarStatus={sidebarOpen} userData={user} textTheme={props.textTheme}/>
    </div>
  );
}