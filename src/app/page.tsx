import { IconBuilding, IconBuildingStore, IconBurger, IconDashboard, icons, IconSettingsCog } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { title } from "process";

export default function Home() {
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
        url: "/settings",
      },      
    ],
    footer:{}
  }
  return (
    <div className="flex">
      {/* sidebar */}
      <div className="sm:w-[280] h-screen bg-slate-800 p-4">
        {/* header */}
        <div className="centered gap-3 font-semibold text-2xl bg-indigo-700 py-2 rounded-2xl">
          <div className="*:size-10">{sideBarNavs.header.icon}</div>
          <div>{sideBarNavs.header.title}</div>
        </div>
        {/* nav */}
        <div className="my-2 p-4 flex flex-col gap-y-5">
          {sideBarNavs.navigations.map((nav,index)=>(
            <Link key={index} href={nav.url} className="flex gap-x-2 p-1.5 bg-indigo-900 rounded-xl px-3 hover:font-bold hover:bg-indigo-900/70">
              {nav.icon}
              <span>{nav.title}</span>
            </Link>
          ))}
        </div>
        {/* footer */}
        <div></div>
      </div>
      {/* content */}
      <div className="sm:w-[60%] w-full h-screen"></div>
      {/* sheet */}
      <div className="sm:w-[300px] h-screen bg-slate-700"></div>
    </div>

  );
}