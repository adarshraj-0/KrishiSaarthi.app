"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts"

const data = [
  { name: "Jan", "Tomatoes": 25, "Potatoes": 12 },
  { name: "Feb", "Tomatoes": 28, "Potatoes": 14 },
  { name: "Mar", "Tomatoes": 32, "Potatoes": 15 },
  { name: "Apr", "Tomatoes": 30, "Potatoes": 18 },
  { name: "May", "Tomatoes": 35, "Potatoes": 20 },
  { name: "Jun", "Tomatoes": 38, "Potatoes": 22 },
];

export function MarketPricesChart() {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
             contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                borderColor: 'hsl(var(--border))'
            }}
          />
          <Legend />
          <Line type="monotone" dataKey="Tomatoes" stroke="hsl(var(--primary))" strokeWidth={2} />
          <Line type="monotone" dataKey="Potatoes" stroke="hsl(var(--secondary-foreground))" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
