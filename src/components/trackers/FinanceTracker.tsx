
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, PiggyBank } from 'lucide-react';

const FinanceTracker = () => {
  const monthlyData = [
    { month: 'Jan', income: 5000, expenses: 3500, savings: 1500 },
    { month: 'Feb', income: 5200, expenses: 3200, savings: 2000 },
    { month: 'Mar', income: 4800, expenses: 3800, savings: 1000 },
    { month: 'Apr', income: 5500, expenses: 3600, savings: 1900 },
  ];

  const currentMonth = monthlyData[monthlyData.length - 1];
  const savingsRate = ((currentMonth.savings / currentMonth.income) * 100).toFixed(1);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <DollarSign className="text-emerald-600" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Finance Tracker</h3>
            <p className="text-gray-600 text-sm">Monitor your financial health</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={16} className="text-emerald-600" />
            <span className="text-sm font-medium text-emerald-800">This Month</span>
          </div>
          <p className="text-2xl font-bold text-emerald-900">${currentMonth.income}</p>
        </div>
        
        <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
          <div className="flex items-center gap-2 mb-1">
            <PiggyBank size={16} className="text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Savings Rate</span>
          </div>
          <p className="text-2xl font-bold text-blue-900">{savingsRate}%</p>
        </div>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                border: 'none', 
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
              }} 
            />
            <Bar dataKey="income" fill="#10b981" radius={[2, 2, 0, 0]} />
            <Bar dataKey="expenses" fill="#f97316" radius={[2, 2, 0, 0]} />
            <Bar dataKey="savings" fill="#3b82f6" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="p-3 bg-green-50 rounded-lg text-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-1"></div>
          <span className="text-xs font-medium text-green-700">Income</span>
        </div>
        <div className="p-3 bg-orange-50 rounded-lg text-center">
          <div className="w-3 h-3 bg-orange-500 rounded-full mx-auto mb-1"></div>
          <span className="text-xs font-medium text-orange-700">Expenses</span>
        </div>
        <div className="p-3 bg-blue-50 rounded-lg text-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mx-auto mb-1"></div>
          <span className="text-xs font-medium text-blue-700">Savings</span>
        </div>
      </div>
    </div>
  );
};

export default FinanceTracker;
