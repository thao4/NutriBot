import { Button } from "@/components/ui/button"
import NutritionVisualization from "@/components/nutrition-visualization"
import RecentRecipes from "@/components/recent-recipes"
import ShoppingListPreview from "@/components/shopping-list-preview"
import WeeklyReportPreview from "@/components/weekly-report-preview"

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, John!</h1>
          <p className="text-gray-500">Here's your nutrition overview for today</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Edit Goals</Button>
          <Button>Log Meal</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-white p-4 rounded-lg shadow flex flex-col items-center justify-center">
          <div className="text-4xl font-bold text-primary2">1850</div>
          <div className="text-sm text-gray-500">Calories Today</div>
          <div className="text-xs mt-2 text-secondary2">350 calories remaining</div>
        </div>
        <div className="card bg-white p-4 rounded-lg shadow flex flex-col items-center justify-center">
          <div className="text-4xl font-bold text-primary2">125g</div>
          <div className="text-sm text-gray-500">Protein</div>
          <div className="text-xs mt-2 text-secondary2">25g remaining</div>
        </div>
        <div className="card bg-white p-4 rounded-lg shadow flex flex-col items-center justify-center">
          <div className="text-4xl font-bold text-primary2">45g</div>
          <div className="text-sm text-gray-500">Fat</div>
          <div className="text-xs mt-2 text-secondary2">15g remaining</div>
        </div>
        <div className="card bg-white p-4 rounded-lg shadow flex flex-col items-center justify-center">
          <div className="text-4xl font-bold text-primary2">180g</div>
          <div className="text-sm text-gray-500">Carbs</div>
          <div className="text-xs mt-2 text-secondary2">70g remaining</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NutritionVisualization />
        <div className="space-y-6">
          <RecentRecipes />
          <ShoppingListPreview />
        </div>
      </div>

      <WeeklyReportPreview />
    </div>
  )
}

