"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, Plus, ShoppingCart } from "lucide-react"

const shoppingItems = [
  { id: 1, name: "Greek Yogurt", category: "Dairy", quantity: "32 oz", inStock: false },
  { id: 2, name: "Chicken Breast", category: "Meat", quantity: "2 lbs", inStock: false },
  { id: 3, name: "Quinoa", category: "Grains", quantity: "1 bag", inStock: true },
  { id: 4, name: "Spinach", category: "Vegetables", quantity: "1 bunch", inStock: false },
  { id: 5, name: "Blueberries", category: "Fruits", quantity: "1 pint", inStock: true },
]

export default function ShoppingListPreview() {
  const [items, setItems] = useState(shoppingItems)

  const toggleInStock = (id: number) => {
    setItems(items.map((item) => (item.id === id ? { ...item, inStock: !item.inStock } : item)))
  }

  return (
    <div className="card bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-primary2" />
          <h2 className="text-xl font-bold">Shopping List</h2>
        </div>
        <Button variant="link" className="text-primary2">
          View Full List
        </Button>
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className={`flex items-center justify-between p-2 rounded-md ${
              item.inStock ? "bg-secondary1/20" : "hover:bg-accent1/50"
            }`}
          >
            <div className="flex items-center gap-3">
              <Button
                variant={item.inStock ? "secondary" : "outline"}
                size="icon"
                className="h-6 w-6"
                onClick={() => toggleInStock(item.id)}
              >
                {item.inStock ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </Button>
              <div>
                <p className={item.inStock ? "line-through text-gray-500" : ""}>{item.name}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="px-1.5 py-0.5 bg-gray-100 rounded-full">{item.category}</span>
                  <span>{item.quantity}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-between">
        <Button variant="outline" size="sm" className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </Button>
      </div>
    </div>
  )
}

