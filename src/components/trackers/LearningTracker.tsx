
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BookOpen, Clock, Target } from 'lucide-react';

const LearningTracker = () => {
  const weeklyData = [
    { day: 'Mon', hours: 2.5, goal: 3 },
    { day: 'Tue', hours: 3.2, goal: 3 },
    { day: 'Wed', hours: 1.8, goal: 3 },
    { day: 'Thu', hours: 4.1, goal: 3 },
    { day: 'Fri', hours: 2.9, goal: 3 },
    { day: 'Sat', hours: 5.2, goal: 3 },
    { day: 'Sun', hours: 3.8, goal: 3 },
  ];

  const totalHours = weeklyData.reduce((sum, day) => sum + day.hours, 0);
  const avgHours = totalHours / 7;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <BookOpen className="text-blue-600" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Learning Tracker</h3>
            <p className="text-gray-600 text-sm">Track your daily learning progress</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
          <div className="flex items-center gap-2 mb-1">
            <Clock size={16} className="text-blue-600" />
            <span className="text-sm font-medium text-blue-800">This Week</span>
          </div>
          <p className="text-2xl font-bold text-blue-900">{totalHours.toFixed(1)}h</p>
        </div>
        
        <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl">
          <div className="flex items-center gap-2 mb-1">
            <Target size={16} className="text-green-600" />
            <span className="text-sm font-medium text-green-800">Daily Avg</span>
          </div>
          <p className="text-2xl font-bold text-green-900">{avgHours.toFixed(1)}h</p>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={weeklyData}>
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
            <Line 
              type="monotone" 
              dataKey="hours" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, stroke: '#3b82f6', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="goal" 
              stroke="#10b981" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Recent Topics:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {['React Hooks', 'TypeScript', 'UI Design', 'Data Structures'].map((topic) => (
            <span 
              key={topic}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningTracker;
