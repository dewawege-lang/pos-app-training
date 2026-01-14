import { IconLogout } from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface ISidebarUserInfoProps {
  sidebarStatus: boolean
  userData: any
  textTheme: string
}

export default function SidebarUserInfo(props: ISidebarUserInfoProps) {
  return (
    <div className={`flex justify-between ${props.textTheme} bg-darkbg1 border-darkline rounded-lg border p-1.5`}>
      {props.sidebarStatus && (
        <div className="flex text-sm font-medium gap-2">
          {/* <div className="size-12 bg-primary rounded-full centered">AV</div> */}
          <Avatar>
            <AvatarImage src={props.userData && props.userData.image} />
            <AvatarFallback>AV</AvatarFallback>
          </Avatar>

          <div>
            <p>
              {props.userData && props.userData.firstName + " " + props.userData.lastName}
            </p>
            <span className="font-light text-xs text-grayfont">
              {props.userData && props.userData.email}
            </span>
          </div>
        </div>
      )}

      <button className="text-primary">
        <IconLogout />
      </button>
    </div>
  );
}
