import * as React from "react";
import { PlusIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";
import { IUser } from "@/@types/user.type";


export default async function usersPage() {
  const data = await fetch("https://dummyjson.com/users", {
    cache: "no-store",
  }).then((res) => res.json());
  const people = await data.users;

  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <ItemGroup>
        {people.map((person:IUser, index:number) => (
          <React.Fragment key={person.username}>
            <Item>
              <ItemMedia>
                <Avatar>
                  <AvatarImage src={person.image} className="grayscale" />
                  <AvatarFallback>{person.username.charAt(0)}</AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent className="gap-1">
                <ItemTitle>{person.username}</ItemTitle>
                <ItemDescription>{person.email}</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <PlusIcon />
                </Button>
              </ItemActions>
            </Item>
            {index !== people.length - 1 && <ItemSeparator />}
          </React.Fragment>
        ))}
      </ItemGroup>
    </div>
  );
}
