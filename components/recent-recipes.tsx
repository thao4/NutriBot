"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { PlusCircle, Clock, Star } from "lucide-react"

const recipes = [
  {
    id: 1,
    name: "Greek Yogurt Parfait",
    time: "10 min",
    rating: 4.5,
    calories: 320,
    protein: 22,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "Chicken & Veggie Stir Fry",
    time: "25 min",
    rating: 4.8,
    calories: 450,
    protein: 35,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "Quinoa Salad Bowl",
    time: "15 min",
    rating: 4.2,
    calories: 380,
    protein: 12,
    image: "/placeholder.svg?height=80&width=80",
  },
]

export default function RecentRecipes() {
  return (
    <div className="card bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Recent Recipes</h2>
        <Button variant="link" className="text-primary2">
          View All
        </Button>
      </div>

      <div className="space-y-4">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="flex items-center gap-4 p-3 hover:bg-accent1/50 rounded-md transition-colors">
            <Image
              src={recipe.image || "/placeholder.svg"}
              alt={recipe.name}
              width={80}
              height={80}
              className="rounded-md object-cover"
            />
            <div className="flex-1">
              <h3 className="font-medium">{recipe.name}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{recipe.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-accent2" />
                  <span>{recipe.rating}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs mt-1">
                <span className="px-2 py-0.5 bg-primary1/20 rounded-full">{recipe.calories} cal</span>
                <span className="px-2 py-0.5 bg-secondary1/20 rounded-full">{recipe.protein}g protein</span>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <PlusCircle className="w-5 h-5" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

