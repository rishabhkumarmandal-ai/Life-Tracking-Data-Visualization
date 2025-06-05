
import React from 'react';
import { Smile, TrendingUp, Calendar } from 'lucide-react';

const MoodTracker = () => {
  const moodData = [
    { day: 'Mon', mood: 4, emoji: '😊' },
    { day: 'Tue', mood: 5, emoji: '😄' },
    { day: 'Wed', mood: 3, emoji: '😐' },
    { day: 'Thu', mood: 4, emoji: '😊' },
    { day: 'Fri', mood: 5, emoji: '😄' },
    { day: 'Sat', mood: 5, emoji: '😄' },
    { day: 'Sun', mood: 4, emoji: '😊' },
  ];

  const avgMood = moodData.reduce((sum, day) => sum + day.mood, 0) / 7;
  const goodDays = moodData.filter(day => day.mood >= 4).length;

  const getMoodColor = (mood: number) => {
    if (mood >= 4) return 'bg-green-400';
    if (mood >= 3) return 'bg-yellow-400';
    return 'bg-red-400';
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <Smile className="text-yellow-600" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Mood Tracker</h3>
            <p className="text-gray-600 text-sm">Track your daily emotional wellness</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={16} className="text-yellow-600" />
            <span className="text-sm font-medium text-yellow-800">Avg Mood</span>
          </div>
          <p className="text-2xl font-bold text-yellow-900">{avgMood.toFixed(1)}/5</p>
        </div>
        
        <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl">
          <div className="flex items-center gap-2 mb-1">
            <Calendar size={16} className="text-green-600" />
            <span className="text-sm font-medium text-green-800">Good Days</span>
          </div>
          <p className="text-2xl font-bold text-green-900">{goodDays}/7</p>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Weekly Mood Heatmap</h4>
        <div className="grid grid-cols-7 gap-2">
          {moodData.map((day, index) => (
            <div key={index} className="text-center">
              <div className="text-xs text-gray-500 mb-1">{day.day}</div>
              <div 
                className={`w-full h-12 rounded-lg flex items-center justify-center text-2xl ${getMoodColor(day.mood)}`}
              >
                {day.emoji}
              </div>
              <div className="text-xs text-gray-600 mt-1">{day.mood}/5</div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Recent Tags:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {['Productive', 'Relaxed', 'Motivated', 'Social'].map((tag) => (
            <span 
              key={tag}
              className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;
