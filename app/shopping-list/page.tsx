"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Check, Clock, Edit, Plus, Search, ShoppingCart, Trash } from "lucide-react"

// Sample data
const shoppingItems = [
  { id: 1, name: "Greek Yogurt", category: "Dairy", quantity: "32 oz", inStock: false, expiry: null },
  { id: 2, name: "Chicken Breast", category: "Meat", quantity: "2 lbs", inStock: false, expiry: null },
  { id: 3, name: "Quinoa", category: "Grains", quantity: "1 bag", inStock: true, expiry: "2025-06-15" },
  { id: 4, name: "Spinach", category: "Vegetables", quantity: "1 bunch", inStock: false, expiry: null },
  { id: 5, name: "Blueberries", category: "Fruits", quantity: "1 pint", inStock: false, expiry: null },
  { id: 6, name: "Eggs", category: "Dairy", quantity: "1 dozen", inStock: true, expiry: "2025-03-15" },
  { id: 7, name: "Almond Milk", category: "Dairy", quantity: "1 carton", inStock: true, expiry: "2025-03-20" },
  { id: 8, name: "Sweet Potatoes", category: "Vegetables", quantity: "3 medium", inStock: true, expiry: "2025-04-01" },
  { id: 9, name: "Brown Rice", category: "Grains", quantity: "2 lbs", inStock: true, expiry: "2025-09-30" },
  { id: 10, name: "Avocados", category: "Fruits", quantity: "3", inStock: false, expiry: null },
]

const categories = ["All", "Dairy", "Meat", "Vegetables", "Fruits", "Grains", "Other"]

export default function ShoppingListPage() {
  const [items, setItems] = useState(shoppingItems)
  const [newItem, setNewItem] = useState("")
  const [newCategory, setNewCategory] = useState("Other")
  const [newQuantity, setNewQuantity] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [editingItem, setEditingItem] = useState<number | null>(null)

  const addItem = () => {
    if (!newItem.trim()) return

    const newId = Math.max(...items.map((item) => item.id)) + 1
    setItems([
      ...items,
      {
        id: newId,
        name: newItem,
        category: newCategory,
        quantity: newQuantity || "1",
        inStock: false,
        expiry: null,
      },
    ])

    setNewItem("")
    setNewQuantity("")
    setNewCategory("Other")
  }

  const toggleInStock = (id: number) => {
    setItems(items.map((item) => (item.id === id ? { ...item, inStock: !item.inStock } : item)))
  }

  const deleteItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const updateItem = (id: number, updates: Partial<(typeof items)[0]>) => {
    setItems(items.map((item) => (item.id === id ? { ...item, ...updates } : item)))
  }

  const filteredItems = items.filter((item) => {
    // Search filter
    if (searchTerm && !item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }

    // Category filter
    if (selectedCategory !== "All" && item.category !== selectedCategory) {
      return false
    }

    return true
  })

  const inStockItems = filteredItems.filter((item) => item.inStock)
  const toShopItems = filteredItems.filter((item) => !item.inStock)

  // Check for expired items
  const today = new Date()
  const expiredItems = items.filter((item) => item.expiry && new Date(item.expiry) < today)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Shopping List</h1>
          <p className="text-gray-500">Manage your grocery items</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Import from Recipes</Button>
          <Button>Create New List</Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search items..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1">
            <Input placeholder="Add new item..." value={newItem} onChange={(e) => setNewItem(e.target.value)} />
          </div>
          <div className="w-32">
            <Input placeholder="Quantity" value={newQuantity} onChange={(e) => setNewQuantity(e.target.value)} />
          </div>
          <div className="w-40">
            <Select value={newCategory} onValueChange={setNewCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.slice(1).map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={addItem}>
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>

        <Tabs defaultValue="to-shop">
          <TabsList className="mb-4">
            <TabsTrigger value="to-shop" className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              To Shop
              <span className="ml-1 w-5 h-5 rounded-full bg-primary1 text-white text-xs flex items-center justify-center">
                {toShopItems.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="in-stock" className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              In Stock
              <span className="ml-1 w-5 h-5 rounded-full bg-secondary1 text-gray-800 text-xs flex items-center justify-center">
                {inStockItems.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="expired" className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Expired
              <span className="ml-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                {expiredItems.length}
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="to-shop" className="space-y-2">
            {toShopItems.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <ShoppingCart className="w-12 h-12 mx-auto mb-2 opacity-30" />
                <p>Your shopping list is empty</p>
                <p className="text-sm">Add items to get started</p>
              </div>
            ) : (
              toShopItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-md hover:bg-accent1/50">
                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => toggleInStock(item.id)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                    <div>
                      <p>{item.name}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="px-1.5 py-0.5 bg-gray-100 rounded-full">{item.category}</span>
                        <span>{item.quantity}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => setEditingItem(item.id)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteItem(item.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </TabsContent>

          <TabsContent value="in-stock" className="space-y-2">
            {inStockItems.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Check className="w-12 h-12 mx-auto mb-2 opacity-30" />
                <p>No items in stock</p>
                <p className="text-sm">Items you've purchased will appear here</p>
              </div>
            ) : (
              inStockItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-md bg-secondary1/20">
                  <div className="flex items-center gap-3">
                    <Button variant="secondary" size="icon" className="h-6 w-6" onClick={() => toggleInStock(item.id)}>
                      <Check className="h-4 w-4" />
                    </Button>
                    <div>
                      <p>{item.name}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="px-1.5 py-0.5 bg-gray-100 rounded-full">{item.category}</span>
                        <span>{item.quantity}</span>
                        {item.expiry && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Expires: {new Date(item.expiry).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => setEditingItem(item.id)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteItem(item.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </TabsContent>

          <TabsContent value="expired" className="space-y-2">
            {expiredItems.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <AlertCircle className="w-12 h-12 mx-auto mb-2 opacity-30" />
                <p>No expired items</p>
                <p className="text-sm">All your items are fresh!</p>
              </div>
            ) : (
              expiredItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-md bg-red-100">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    <div>
                      <p>{item.name}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="px-1.5 py-0.5 bg-gray-100 rounded-full">{item.category}</span>
                        <span>{item.quantity}</span>
                        <span className="flex items-center gap-1 text-red-500">
                          <Clock className="w-3 h-3" />
                          Expired: {new Date(item.expiry!).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => deleteItem(item.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

