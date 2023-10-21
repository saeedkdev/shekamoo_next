"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Meal } from "@/types/schemas"
import { useEffect, useState } from "react"

interface OverviewProps {
  meals: Meal[]
}

type ChartData = {
  name: string
  total: number
}

export function Overview({ meals }: OverviewProps) {

  const [chartData, setChartData] = useState<ChartData[]>([])

  function formatOverviewChart() {
    console.log(meals)
    const data = [
      {
        name: "Sat",
        total: Math.floor(Math.random() * 5000) + 1000,
      },
      {
        name: "Sun",
        total: Math.floor(Math.random() * 5000) + 1000,
      },
      {
        name: "Mon",
        total: Math.floor(Math.random() * 5000) + 1000,
      },
      {
        name: "Tue",
        total: Math.floor(Math.random() * 5000) + 1000,
      },
      {
        name: "Wed",
        total: Math.floor(Math.random() * 5000) + 1000,
      },
      {
        name: "Thu",
        total: Math.floor(Math.random() * 5000) + 1000,
      },
      {
        name: "Fri",
        total: Math.floor(Math.random() * 5000) + 1000,
      },
    ];
    setChartData(data);
  }

  useEffect(() => {
    formatOverviewChart()
  }, [meals])

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}kcal`}
        />
        <Bar dataKey="total" fill="#ef4444" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
