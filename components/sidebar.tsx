"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, ChefHat, ShoppingCart, BarChart2, User, Settings, Utensils } from "lucide-react"

export default function Sidebar() {
  const pathname = usePathname()

  const routes = [
    {
      name: "Dashboard",
      path: "/",
      icon: Home,
    },
    {
      name: "Nutrition",
      path: "/nutrition",
      icon: Utensils,
    },
    {
      name: "Recipes",
      path: "/recipes",
      icon: ChefHat,
    },
    {
      name: "Shopping List",
      path: "/shopping-list",
      icon: ShoppingCart,
    },
    {
      name: "Weekly Report",
      path: "/weekly-report",
      icon: BarChart2,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: User,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ]

  return (
    <div className="w-64 bg-white shadow-md flex flex-col h-full">
      <div className="p-4 flex items-center gap-2 border-b">
        <div className="w-8 h-8 rounded-full bg-primary1 flex items-center justify-center">
          <Utensils className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-xl font-bold text-gray-800">NutriBot</h1>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {routes.map((route) => {
            const Icon = route.icon
            return (
              <li key={route.path}>
                <Link
                  href={route.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                    pathname === route.path ? "bg-primary1 text-white" : "text-gray-700 hover:bg-primary1/10",
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{route.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="p-4 border-t">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-accent2 flex items-center justify-center">
            <span className="font-semibold text-gray-800">JS</span>
          </div>
          <div>
            <p className="text-sm font-medium">John Smith</p>
            <p className="text-xs text-gray-500">Weight Loss Plan</p>
          </div>
        </div>
      </div>
    </div>
  )
}

