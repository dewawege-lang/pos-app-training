"use client"

import { Badge } from "@/components/ui/badge";
import { Ole } from "next/font/google";
import { useParams } from "next/navigation";
import React from "react";


export interface IRecipes {
  id: number
  name: string
  ingredients: string
  image: string
  cuisine: string
  instructions: string[];
  tags: string[]
  mealType: string[]

}

export default function AdminSlugPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = React.useState<IRecipes|null>(null);
  const handleFetchRecipe = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/recipes/${id}`);
      const data = await response.json();
      setRecipe(data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    handleFetchRecipe();
  }, []);

  return (
    <section>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">
          <div>
            <div className="max-w-prose md:max-w-none">
              <h2 className="text-3xl font-semibold text-gray-200 sm:text-4xl">
                {recipe && recipe.name}
              </h2>

              <ol className="mt-4 text-pretty text-gray-400">
                {recipe?.instructions.map((inst: string, index: number) => (
                  <li key={index}>
                    <span>
                      {index + 1}
                      {". "}
                    </span>
                    {inst}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {recipe && <img src={recipe.image} className="rounded-xl" alt="" />}
            <div className="flex gap-x-1">
              {recipe?.tags.map((tag:string, index:number) => (
                <Badge key={index}>{tag}</Badge>
              ))}
            </div>
            <div>
              {recipe?.mealType.map((type: string, index: number) => (
                <Badge variant={"secondary"} key={index}>
                  {type}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
