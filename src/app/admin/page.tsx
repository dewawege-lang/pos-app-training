'use client'
import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { IRecipes } from "./[id]/page";

export default function AdiminPage() {
  const [recipes,setRecipe] = React.useState([]);
        console.log(recipes);
  const handleFetchRecipe = async () => {
    try {
      const response = await fetch("https://dummyjson.com/recipes");
      if(!response.ok) throw new Error("Ada Eror Saat Fetching!");

      const data = await response.json();
      setRecipe(data.recipes);

    } catch (error) {}
  };

  React.useEffect(() => {
    handleFetchRecipe();
  }, []);

  return (
    <div className="centered">
      <Carousel
        opts={{
          align: "start",
        }}
        className=" object-cover w-full max-w-[70vw]"
      >
        <CarouselContent>
          {recipes.map((recipe: IRecipes) => (
            <CarouselItem key={recipe.id} className="md:basis-1/2 lg:basis-1/3">
              <Link href={`/admin/${recipe.id}`} className=" block p-1 relative">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <Image 
                    src={recipe.image}
                    alt={recipe.name}
                    fill
                    className="object-cover"
                    />
                    <div className="w-full h-20 bg-primary/60 absolute bottom-0 ">
                    <span className="font-semibold text-2xl text-neutral-900 p-4">{recipe.name}</span>
                    <p className="p-4 italic">{recipe.cuisine}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
