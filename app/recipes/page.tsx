"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, Filter, PlusCircle, Search, Star, X } from "lucide-react"

const recipes = [
  {
    id: 1,
    name: "Greek Yogurt Parfait",
    category: "Breakfast",
    time: "10 min",
    rating: 4.5,
    calories: 320,
    protein: 22,
    carbs: 40,
    fat: 8,
    ingredients: ["Greek yogurt", "Berries", "Granola", "Honey"],
    image: "/placeholder.svg?height=200&width=300",
    difficulty: "Easy",
  },
  {
    id: 2,
    name: "Chicken & Veggie Stir Fry",
    category: "Lunch",
    time: "25 min",
    rating: 4.8,
    calories: 450,
    protein: 35,
    carbs: 30,
    fat: 15,
    ingredients: ["Chicken breast", "Bell peppers", "Broccoli", "Soy sauce", "Brown rice"],
    image: "/placeholder.svg?height=200&width=300",
    difficulty: "Medium",
  },
  {
    id: 3,
    name: "Quinoa Salad Bowl",
    category: "Lunch",
    time: "15 min",
    rating: 4.2,
    calories: 380,
    protein: 12,
    carbs: 45,
    fat: 18,
    ingredients: ["Quinoa", "Cucumber", "Cherry tomatoes", "Feta cheese", "Olive oil"],
    image: "/placeholder.svg?height=200&width=300",
    difficulty: "Easy",
  },
  {
    id: 4,
    name: "Baked Salmon with Asparagus",
    category: "Dinner",
    time: "30 min",
    rating: 4.7,
    calories: 420,
    protein: 38,
    carbs: 12,
    fat: 22,
    ingredients: ["Salmon fillet", "Asparagus", "Lemon", "Olive oil", "Garlic"],
    image: "/placeholder.svg?height=200&width=300",
    difficulty: "Medium",
  },
  {
    id: 5,
    name: "Protein Smoothie",
    category: "Snack",
    time: "5 min",
    rating: 4.3,
    calories: 280,
    protein: 25,
    carbs: 30,
    fat: 5,
    ingredients: ["Protein powder", "Banana", "Almond milk", "Peanut butter"],
    image: "/placeholder.svg?height=200&width=300",
    difficulty: "Easy",
  },
  {
    id: 6,
    name: "Turkey Chili",
    category: "Dinner",
    time: "45 min",
    rating: 4.6,
    calories: 380,
    protein: 32,
    carbs: 35,
    fat: 10,
    ingredients: ["Ground turkey", "Kidney beans", "Tomatoes", "Onion", "Bell pepper"],
    image: "/placeholder.svg?height=200&width=300",
    difficulty: "Medium",
  },
]

export default function RecipesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [calorieRange, setCalorieRange] = useState([0, 600])
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState("featured")

  const categories = ["Breakfast", "Lunch", "Dinner", "Snack"]

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  const filteredRecipes = recipes
    .filter((recipe) => {
      // Search filter
      if (searchTerm && !recipe.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false
      }

      // Category filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(recipe.category)) {
        return false
      }

      // Calorie filter
      if (recipe.calories < calorieRange[0] || recipe.calories > calorieRange[1]) {
        return false
      }

      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating
        case "time":
          return Number.parseInt(a.time) - Number.parseInt(b.time)
        case "calories":
          return a.calories - b.calories
        default:
          return 0
      }
    })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Recipe Selector</h1>
        <Button>Add New Recipe</Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search recipes..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
            {(selectedCategories.length > 0 || calorieRange[0] > 0 || calorieRange[1] < 600) && (
              <span className="w-5 h-5 rounded-full bg-primary1 text-white text-xs flex items-center justify-center">
                {selectedCategories.length + (calorieRange[0] > 0 || calorieRange[1] < 600 ? 1 : 0)}
              </span>
            )}
          </Button>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="time">Quickest</SelectItem>
              <SelectItem value="calories">Lowest Calories</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {showFilters && (
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Filters</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedCategories([])
                setCalorieRange([0, 600])
              }}
            >
              Reset All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-2">Meal Type</h4>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center gap-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => toggleCategory(category)}
                    />
                    <Label htmlFor={`category-${category}`}>{category}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Calories</h4>
              <div className="px-2">
                <Slider
                  value={calorieRange}
                  min={0}
                  max={600}
                  step={10}
                  onValueChange={setCalorieRange}
                  className="my-6"
                />
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{calorieRange[0]} cal</span>
                  <span>{calorieRange[1]} cal</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Ingredients</h4>
              <div className="relative">
                <Input placeholder="Search ingredients..." />
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-primary1/20 rounded-full text-sm flex items-center gap-1">
                    Chicken
                    <button className="text-gray-500 hover:text-gray-700">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="relative h-48">
              <Image src={recipe.image || "/placeholder.svg"} alt={recipe.name} fill className="object-cover" />
              <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs font-medium">
                {recipe.category}
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-lg">{recipe.name}</h3>

              <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{recipe.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-accent2" />
                  <span>{recipe.rating}</span>
                </div>
                <div className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">{recipe.difficulty}</div>
              </div>

              <div className="flex items-center gap-2 mt-3">
                <div className="text-xs px-2 py-1 bg-primary1/20 rounded-full">{recipe.calories} cal</div>
                <div className="text-xs px-2 py-1 bg-secondary1/20 rounded-full">{recipe.protein}g protein</div>
                <div className="text-xs px-2 py-1 bg-accent2/20 rounded-full">{recipe.carbs}g carbs</div>
              </div>

              <div className="mt-3">
                <h4 className="text-sm font-medium">Ingredients:</h4>
                <div className="flex flex-wrap gap-1 mt-1">
                  {recipe.ingredients.map((ingredient, index) => (
                    <span key={index} className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex justify-between">
                <Button variant="outline" size="sm">
                  View Recipe
                </Button>
                <Button size="sm">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add to Plan
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

