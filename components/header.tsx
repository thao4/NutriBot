"use client"

import { Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6">
      <div className="relative w-64">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search..."
          className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary2 focus:border-transparent"
        />
      </div>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary2 rounded-full text-[10px] text-white flex items-center justify-center">
            3
          </span>
        </Button>
        <Button>Create Meal Plan</Button>
      </div>
    </header>
  )
}

