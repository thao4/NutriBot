"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Calendar, ChevronLeft, ChevronRight, Download, MessageSquare, Share2 } from "lucide-react"

// Sample data
const weeklyData = [
  { day: "Mon", calories: 1950, protein: 130, carbs: 200, fat: 50, goal: 2000 },
  { day: "Tue", calories: 2100, protein: 145, carbs: 220, fat: 55, goal: 2000 },
  { day: "Wed", calories: 1850, protein: 125, carbs: 180, fat: 45, goal: 2000 },
  { day: "Thu", calories: 2050, protein: 140, carbs: 210, fat: 52, goal: 2000 },
  { day: "Fri", calories: 1900, protein: 135, carbs: 190, fat: 48, goal: 2000 },
  { day: "Sat", calories: 2200, protein: 150, carbs: 230, fat: 60, goal: 2000 },
  { day: "Sun", calories: 1800, protein: 120, carbs: 170, fat: 42, goal: 2000 },
]

const macroDistribution = [
  { name: "Protein", value: 845, percentage: 30 },
  { name: "Carbs", value: 1400, percentage: 50 },
  { name: "Fat", value: 560, percentage: 20 },
]

const COLORS = ["#7BD0D4", "#329FFF", "#BEEDB2", "#F9CF6A"]

const mealEntries = [
  {
    id: 1,
    day: "Monday",
    meal: "Breakfast",
    name: "Greek Yogurt Parfait",
    calories: 320,
    protein: 22,
    carbs: 40,
    fat: 8,
  },
  {
    id: 2,
    day: "Monday",
    meal: "Lunch",
    name: "Chicken Salad",
    calories: 450,
    protein: 35,
    carbs: 25,
    fat: 20,
  },
  {
    id: 3,
    day: "Monday",
    meal: "Dinner",
    name: "Salmon with Quinoa",
    calories: 580,
    protein: 42,
    carbs: 45,
    fat: 22,
  },
  {
    id: 4,
    day: "Tuesday",
    meal: "Breakfast",
    name: "Protein Smoothie",
    calories: 350,
    protein: 30,
    carbs: 45,
    fat: 5,
  },
  {
    id: 5,
    day: "Tuesday",
    meal: "Lunch",
    name: "Turkey Wrap",
    calories: 480,
    protein: 32,
    carbs: 50,
    fat: 18,
  },
]

export default function WeeklyReportPage() {
  const [currentWeek, setCurrentWeek] = useState("March 1-7, 2025")
  const [activeTab, setActiveTab] = useState("overview")
  const [showChatbot, setShowChatbot] = useState(false)
  const [chatMessage, setChatMessage] = useState("")
  const [chatHistory, setChatHistory] = useState<{role: string, content: string}[]>([
    {role: "assistant", content: "Hi there! I'm your nutrition assistant. How can I help you understand your weekly report?"}
  ])
  
  const sendMessage = () => {
    if (!chatMessage.trim()) return
    
    // Add user message to chat
    setChatHistory([...chatHistory, {role: "user", content: chatMessage}])
    
    // Simulate AI response
    setTimeout(() => {
      setChatHistory(prev => [
        ...prev, 
        {
          role: "assistant", 
          content: "Based on your weekly report, you're doing well with protein intake but could improve your carbohydrate balance. Your calorie intake has been consistent with your goals except for Saturday when you exceeded by 200 calories."
        }
      ])
    }, 1000)
    
    setChatMessage("")
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Weekly Report</h1>
          <p className="text-gray-500">Track your nutrition and fitness progress</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2 px-3 py-2 border rounded-md">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="font-medium">{currentWeek}</span>
          </div>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrition Details</TabsTrigger>
          <TabsTrigger value="meals">Meal Entries</TabsTrigger>
          <TabsTrigger value="goals">Goals & Progress</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card bg-white p-4 rounded-lg shadow flex flex-col items-center justify-center">
              <div className="text-4xl font-bold text-primary2">13,850</div>
              <div className="text-sm text-gray-500">Weekly Calories</div>
              <div className="text-xs mt-2 text-secondary2">98% of goal</div>
            </div>
            <div className="card bg-white p-4 rounded-lg shadow flex flex-col items-center justify-center">
              <div className="text-4xl font-bold text-primary2">945g</div>
              <div className="text-sm text-gray-500">Weekly Protein</div>
              <div className="text-xs mt-2 text-secondary2">105% of goal</div>
            </div>
            <div className="card bg-white p-4 rounded-lg shadow flex flex-col items-center justify-center">
              <div className="text-4xl font-bold text-primary2">1,400g</div>
              <div className="text-sm text-gray-500">Weekly Carbs</div>
              <div className="text-xs mt-2 text-secondary2">93% of goal</div>
            </div>
            <div className="card bg-white p-4 rounded-lg shadow flex flex-col items-center justify-center">
              <div className="text-4xl font-bold text-primary2">352g</div>
              <div className="text-sm text-gray-500">Weekly Fat</div>
              <div className="text-xs mt-2 text-secondary2">88% of goal</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Daily Calories</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={weeklyData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="calories" fill="#7BD0D4" name="Calories" />
                    <Bar dataKey="goal" fill="#329FFF" name="Goal" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Macronutrient Distribution</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={macroDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percentage }) => `${name} ${percentage}%`}
                    >
                      {macroDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Weekly Summary</h2>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowChatbot(!showChatbot)}>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Ask AI Assistant
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-accent1/50 rounded-lg">
                <h3 className="font-semibold mb-2">Highlights</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>You met your protein goals 6 out of 7 days this week</li>
                  <li>Your calorie intake was consistent throughout the week</li>
                  <li>You had a good balance of macronutrients</li>
                  <li>Saturday had the highest calorie intake (2200 calories)</li>
                </ul>
              </div>
              
              <div className="p-4 bg-secondary1/20 rounded-lg">
                <h3 className="font-semibold mb-2">Recommendations</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Try to increase fiber intake by adding more vegetables</li>
                  <li>Consider reducing carbohydrate intake on rest days</li>
                  <li>Add more variety to your protein sources</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Notes</h3>
                <Textarea 
                  placeholder="Add your notes for this week..."
                  className="w-full"
                  rows={3}
                />
                <div className="mt-2 flex justify-end">
                  <Button size="sm">Save Notes</Button>
                </div>
              </div>
            </div>
          </div>
          
          {showChatbot && (
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">AI Nutrition Assistant</h2>
                <Button variant="ghost" size="sm" onClick={() => setShowChatbot(false)}>
                  Close
                </Button>
              </div>
              
              <div className="h-64 overflow-y-auto border rounded-md p-4 mb-4">
                {chatHistory.map((message, index) => (
                  <div 
                    key={index} 
                    className={`mb-3 ${
                      message.role === "user" 
                        ? "text-right" 
                        : "text-left"
                    }`}
                  >
                    <div 
                      className={`inline-block p-3 rounded-lg max-w-[80%] ${
                        message.role === "user" 
                          ? "bg-primary1 text-white" 
                          : "bg-gray-100"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Input 
                  placeholder="Ask about your nutrition data..." 
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <Button onClick={sendMessage}>Send</Button>
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="nutrition" className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-6">Detailed Nutrition Breakdown</h2>
            
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={weeklyData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="protein" stroke="#7BD0D4" name="Protein (g)" />
                  <Line type="monotone" dataKey="carbs" stroke="#329FFF" name="Carbs (g)" />
                  <Line type="monotone" dataKey="fat" stroke="#F9CF6A" name="Fat (g\

