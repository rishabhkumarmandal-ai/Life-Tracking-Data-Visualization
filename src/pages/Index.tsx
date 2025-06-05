
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import LearningTracker from '../components/trackers/LearningTracker';
import FitnessTracker from '../components/trackers/FitnessTracker';
import MoodTracker from '../components/trackers/MoodTracker';
import ProductivityTracker from '../components/trackers/ProductivityTracker';
import ReadingTracker from '../components/trackers/ReadingTracker';
import FinanceTracker from '../components/trackers/FinanceTracker';
import Profile from '../components/Profile';
import Settings from '../components/Settings';
import Notifications from '../components/Notifications';
import Chatbot from '../components/Chatbot';
import { AuthProvider, useAuth } from '../components/auth/AuthContext';
import LoginForm from '../components/auth/LoginForm';

const DashboardContent = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LearningTracker />
              <FitnessTracker />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MoodTracker />
              <ProductivityTracker />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ReadingTracker />
              <FinanceTracker />
            </div>
          </div>
        );
      case 'profile':
        return <Profile />;
      case 'settings':
        return <Settings />;
      case 'notifications':
        return <Notifications />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100">
      <div className="flex">
        <Sidebar 
          activeSection={activeSection} 
          setActiveSection={setActiveSection}
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />
        
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
          <DashboardHeader 
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            setActiveSection={setActiveSection}
          />
          
          <div className="p-6">
            {renderContent()}
          </div>
        </main>
      </div>
      
      <Chatbot />
    </div>
  );
};

const Index = () => {
  return (
    <AuthProvider>
      <DashboardContent />
    </AuthProvider>
  );
};

export default Index;
