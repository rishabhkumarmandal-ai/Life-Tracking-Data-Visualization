
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BookOpen, TrendingUp, Target } from 'lucide-react';

const ReadingTracker = () => {
  const weeklyData = [
    { day: 'Mon', pages: 25 },
    { day: 'Tue', pages: 32 },
    { day: 'Wed', pages: 18 },
    { day: 'Thu', pages: 28 },
    { day: 'Fri', pages: 35 },
    { day: 'Sat', pages: 45 },
    { day: 'Sun', pages: 40 },
  ];

  const totalPages = weeklyData.reduce((sum, day) => sum + day.pages, 0);
  const avgPages = totalPages / 7;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-100 rounded-lg">
            <BookOpen className="text-orange-600" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Reading Tracker</h3>
            <p className="text-gray-600 text-sm">Track your reading progress</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl">
          <div className="flex items-center gap-2 mb-1">
            <BookOpen size={16} className="text-orange-600" />
            <span className="text-sm font-medium text-orange-800">This Week</span>
          </div>
          <p className="text-2xl font-bold text-orange-900">{totalPages} pages</p>
        </div>
        
        <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={16} className="text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Daily Avg</span>
          </div>
          <p className="text-2xl font-bold text-blue-900">{avgPages.toFixed(1)} pages</p>
        </div>
      </div>

      <div className="h-48">
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
              dataKey="pages" 
              stroke="#f97316" 
              strokeWidth={3}
              dot={{ fill: '#f97316', strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, stroke: '#f97316', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Currently Reading:</span>
        </div>
        <div className="p-3 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
          <h5 className="font-semibold text-orange-900">Atomic Habits</h5>
          <p className="text-sm text-orange-700">by James Clear</p>
          <div className="mt-2 bg-white rounded-full h-2">
            <div className="bg-orange-500 h-2 rounded-full w-3/5"></div>
          </div>
          <p className="text-xs text-orange-600 mt-1">60% complete</p>
        </div>
      </div>
    </div>
  );
};

export default ReadingTracker;
