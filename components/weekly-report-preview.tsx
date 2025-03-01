"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { ChevronLeft, ChevronRight, Download, MessageSquare } from "lucide-react"

const weeklyData = [
  { day: "Mon", calories: 1950, protein: 130, carbs: 200, fat: 50 },
  { day: "Tue", calories: 2100, protein: 145, carbs: 220, fat: 55 },
  { day: "Wed", calories: 1850, protein: 125, carbs: 180, fat: 45 },
  { day: "Thu", calories: 2050, protein: 140, carbs: 210, fat: 52 },
  { day: "Fri", calories: 1900, protein: 135, carbs: 190, fat: 48 },
  { day: "Sat", calories: 2200, protein: 150, carbs: 230, fat: 60 },
  { day: "Sun", calories: 1800, protein: 120, carbs: 170, fat: 42 },
]

export default function WeeklyReportPreview() {
  const [currentWeek, setCurrentWeek] = useState("March 1-7, 2025")
  const [showNotes, setShowNotes] = useState(false)

  return (
    <div className="card bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Weekly Report</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">{currentWeek}</span>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={weeklyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="calories" stroke="#329FFF" activeDot={{ r: 8 }} />
            <Line yAxisId="right" type="monotone" dataKey="protein" stroke="#7BD0D4" />
            <Line yAxisId="right" type="monotone" dataKey="carbs" stroke="#BEEDB2" />
            <Line yAxisId="right" type="monotone" dataKey="fat" stroke="#F9CF6A" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 flex flex-wrap gap-4">
        <Button variant="outline" onClick={() => setShowNotes(!showNotes)}>
          {showNotes ? "Hide Notes" : "Add Notes"}
        </Button>
        <Button variant="outline">
          <MessageSquare className="w-4 h-4 mr-2" />
          Ask AI Assistant
        </Button>
        <Button variant="outline" className="ml-auto">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {showNotes && (
        <div className="mt-4">
          <textarea
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary2 focus:border-transparent"
            placeholder="Add your notes for this week..."
            rows={3}
          />
          <div className="mt-2 flex justify-end">
            <Button size="sm">Save Notes</Button>
          </div>
        </div>
      )}
    </div>
  )
}

