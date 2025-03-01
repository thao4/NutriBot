"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { Button } from "@/components/ui/button"

// Sample data
const macroData = [
  { name: "Protein", value: 125, goal: 150, unit: "g" },
  { name: "Carbs", value: 180, goal: 250, unit: "g" },
  { name: "Fat", value: 45, goal: 60, unit: "g" },
  { name: "Fiber", value: 22, goal: 30, unit: "g" },
  { name: "Sugar", value: 35, goal: 50, unit: "g" },
  { name: "Sodium", value: 1800, goal: 2300, unit: "mg" },
]

const vitaminData = [
  { name: "Vitamin A", value: 75, goal: 100, unit: "%" },
  { name: "Vitamin C", value: 120, goal: 100, unit: "%" },
  { name: "Vitamin D", value: 60, goal: 100, unit: "%" },
  { name: "Calcium", value: 80, goal: 100, unit: "%" },
  { name: "Iron", value: 65, goal: 100, unit: "%" },
  { name: "Potassium", value: 70, goal: 100, unit: "%" },
]

const mealDistribution = [
  { name: "Breakfast", value: 450 },
  { name: "Lunch", value: 650 },
  { name: "Dinner", value: 550 },
  { name: "Snacks", value: 200 },
]

const COLORS = ["#7BD0D4", "#329FFF", "#BEEDB2", "#F9CF6A"]

export default function NutritionVisualization() {
  const [activeTab, setActiveTab] = useState("macros")
  const [hoveredItem, setHoveredItem] = useState<null | {
    name: string
    value: number
    goal?: number
    unit: string
  }>(null)

  const handleBarMouseEnter = (data: any) => {
    setHoveredItem(data)
  }

  const handleBarMouseLeave = () => {
    setHoveredItem(null)
  }

  return (
    <div className="card bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Nutritional Visualization</h2>
        <div className="flex gap-2">
          <Button
            variant={activeTab === "macros" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("macros")}
          >
            Macros
          </Button>
          <Button
            variant={activeTab === "vitamins" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("vitamins")}
          >
            Vitamins
          </Button>
          <Button
            variant={activeTab === "meals" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("meals")}
          >
            Meals
          </Button>
        </div>
      </div>

      {hoveredItem && (
        <div className="mb-4 p-3 bg-accent1 rounded-md">
          <h3 className="font-semibold">{hoveredItem.name}</h3>
          <p className="text-sm">
            Current: {hoveredItem.value} {hoveredItem.unit}
          </p>
          {hoveredItem.goal && (
            <p className="text-sm">
              Goal: {hoveredItem.goal} {hoveredItem.unit}({Math.round((hoveredItem.value / hoveredItem.goal) * 100)}%)
            </p>
          )}
        </div>
      )}

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {activeTab === "macros" ? (
            <BarChart data={macroData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="value"
                fill="#7BD0D4"
                name="Current"
                onMouseEnter={handleBarMouseEnter}
                onMouseLeave={handleBarMouseLeave}
              />
              <Bar dataKey="goal" fill="#329FFF" name="Goal" />
            </BarChart>
          ) : activeTab === "vitamins" ? (
            <BarChart data={vitaminData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="value"
                fill="#BEEDB2"
                name="Current %"
                onMouseEnter={handleBarMouseEnter}
                onMouseLeave={handleBarMouseLeave}
              />
              <Bar dataKey="goal" fill="#27FB71" name="Goal %" />
            </BarChart>
          ) : (
            <PieChart>
              <Pie
                data={mealDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                onMouseEnter={(_, index) => {
                  setHoveredItem({
                    name: mealDistribution[index].name,
                    value: mealDistribution[index].value,
                    unit: "calories",
                  })
                }}
                onMouseLeave={handleBarMouseLeave}
              >
                {mealDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="mt-4 text-sm text-gray-500 text-center">
        Scroll through metrics or hover over items for more details
      </div>
    </div>
  )
}

