
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { CheckSquare, Clock, Target } from 'lucide-react';

const ProductivityTracker = () => {
  const taskData = [
    { name: 'Work', value: 45, color: '#3b82f6' },
    { name: 'Study', value: 30, color: '#10b981' },
    { name: 'Personal', value: 20, color: '#f59e0b' },
    { name: 'Exercise', value: 5, color: '#ef4444' },
  ];

  const dailyStats = {
    tasksCompleted: 12,
    pomodoros: 8,
    focusRating: 4.2,
    screenTime: '6.5h'
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <CheckSquare className="text-purple-600" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Productivity Tracker</h3>
            <p className="text-gray-600 text-sm">Monitor your daily productivity</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl">
          <div className="flex items-center gap-2 mb-1">
            <CheckSquare size={16} className="text-purple-600" />
            <span className="text-sm font-medium text-purple-800">Tasks Done</span>
          </div>
          <p className="text-2xl font-bold text-purple-900">{dailyStats.tasksCompleted}</p>
        </div>
        
        <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
          <div className="flex items-center gap-2 mb-1">
            <Clock size={16} className="text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Pomodoros</span>
          </div>
          <p className="text-2xl font-bold text-blue-900">{dailyStats.pomodoros}</p>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Task Distribution</h4>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={taskData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {taskData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: 'none', 
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Target size={14} className="text-gray-600" />
            <span className="text-xs font-medium text-gray-700">Focus Rating</span>
          </div>
          <p className="text-lg font-bold text-gray-800">{dailyStats.focusRating}/5</p>
        </div>
        
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Clock size={14} className="text-gray-600" />
            <span className="text-xs font-medium text-gray-700">Screen Time</span>
          </div>
          <p className="text-lg font-bold text-gray-800">{dailyStats.screenTime}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductivityTracker;
