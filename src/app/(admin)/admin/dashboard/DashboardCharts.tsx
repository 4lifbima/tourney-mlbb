'use client'

import { useEffect, useState } from 'react'
import { BarChart3, PieChart as PieChartIcon, ChartLine } from 'lucide-react'
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const COLORS = ['#b30e05', '#10b981', '#f59e0b']

export default function DashboardCharts() {
  const [registrantsByDate, setRegistrantsByDate] = useState<Array<{ date: string; count: number }>>([])
  const [registrantsByStatus, setRegistrantsByStatus] = useState<Array<{ status: string; count: number }>>([])

  useEffect(() => {
    // Fetch chart data on client side
    const fetchChartData = async () => {
      try {
        const [dateRes, statusRes] = await Promise.all([
          fetch('/api/dashboard/date'),
          fetch('/api/dashboard/status'),
        ])
        
        if (dateRes.ok) {
          const dateData = await dateRes.json()
          setRegistrantsByDate(dateData)
        }
        
        if (statusRes.ok) {
          const statusData = await statusRes.json()
          setRegistrantsByStatus(statusData)
        }
      } catch (error) {
        console.error('Error fetching chart data:', error)
      }
    }

    fetchChartData()
  }, [])

  return (
    <>
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Bar Chart - Pendaftar per Hari */}
        <div className="card">
          <h2 className="text-lg font-bold mb-4">Pendaftar per Hari</h2>
          {registrantsByDate.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={registrantsByDate}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#b30e05" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-400">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                <p>Belum ada data</p>
              </div>
            </div>
          )}
        </div>

        {/* Pie Chart - Status Pendaftar */}
        <div className="card">
          <h2 className="text-lg font-bold mb-4">Status Pendaftar</h2>
          {registrantsByStatus.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={registrantsByStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ payload, value }) => `${(payload as { status?: string })?.status ?? ''}: ${value ?? 0}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {registrantsByStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-400">
              <div className="text-center">
                <PieChartIcon className="w-12 h-12 mx-auto mb-2" />
                <p>Belum ada data</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Line Chart - Pertumbuhan Pendaftar */}
      <div className="card">
        <h2 className="text-lg font-bold mb-4">Pertumbuhan Pendaftar</h2>
        {registrantsByDate.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={registrantsByDate}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#b30e05"
                strokeWidth={2}
                dot={{ fill: '#b30e05' }}
                name="Total Pendaftar"
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[300px] flex items-center justify-center text-gray-400">
            <div className="text-center">
              <ChartLine className="w-12 h-12 mx-auto mb-2" />
              <p>Belum ada data</p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
