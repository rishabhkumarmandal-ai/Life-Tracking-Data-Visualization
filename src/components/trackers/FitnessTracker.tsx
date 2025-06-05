
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Flame, Footprints } from 'lucide-react';

const FitnessTracker = () => {
  const weeklyData = [
    { day: 'Mon', duration: 45, calories: 320, steps: 8500 },
    { day: 'Tue', duration: 60, calories: 450, steps: 10200 },
    { day: 'Wed', duration: 0, calories: 0, steps: 6800 },
    { day: 'Thu', duration: 30, calories: 250, steps: 7500 },
    { day: 'Fri', duration: 75, calories: 580, steps: 12000 },
    { day: 'Sat', duration: 90, calories: 650, steps: 15000 },
    { day: 'Sun', duration: 40, calories: 300, steps: 9200 },
  ];

  const totalWorkouts = weeklyData.filter(day => day.duration > 0).length;
  const totalCalories = weeklyData.reduce((sum, day) => sum + day.calories, 0);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <Activity className="text-green-600" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Fitness Tracker</h3>
            <p className="text-gray-600 text-sm">Monitor your workout progress</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl">
          <div className="flex items-center gap-2 mb-1">
            <Activity size={16} className="text-green-600" />
            <span className="text-sm font-medium text-green-800">Active Days</span>
          </div>
          <p className="text-2xl font-bold text-green-900">{totalWorkouts}/7</p>
        </div>
        
        <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl">
          <div className="flex items-center gap-2 mb-1">
            <Flame size={16} className="text-orange-600" />
            <span className="text-sm font-medium text-orange-800">Calories</span>
          </div>
          <p className="text-2xl font-bold text-orange-900">{totalCalories}</p>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="day" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                border: 'none', 
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
              }} 
            />
            <Bar 
              dataKey="duration" 
              fill="#10b981" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {['🏃‍♂️ Running', '💪 Strength', '🧘‍♀️ Yoga'].map((activity, index) => (
          <div 
            key={activity}
            className="p-3 bg-gray-50 rounded-lg text-center"
          >
            <span className="text-sm font-medium text-gray-700">{activity}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FitnessTracker;
