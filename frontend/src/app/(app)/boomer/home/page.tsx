'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  MessageSquare, Users, Video, Bell, Phone,
  ArrowRight, Calendar, Heart, 
  BookOpen, UserPlus, Star, Camera, 
  Home, Settings, HelpCircle, Mail, Clock, MapPin, Newspaper, Coffee
} from 'lucide-react';

const DEFAULT_AVATAR = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="40" height="40"%3E%3Crect width="100%25" height="100%25" fill="%236B7280"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="14" fill="white" text-anchor="middle" dy=".3em"%3E?%3C/text%3E%3C/svg%3E';

interface Contact {
  id: string;
  name: string;
  relationship: string;
  avatar?: string;
  status: 'online' | 'away' | 'offline';
  lastContact?: string;
  phone?: string;
}

interface RecentActivity {
  id: string;
  type: 'message' | 'call' | 'email' | 'photo';
  content: string;
  timestamp: Date;
  from: string;
  priority?: 'high' | 'normal';
}

export default function BoomerHomePage() {
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState({
    stats: {
      unreadMessages: 3,
      familyContacts: 15,
      todaysCalls: 2,
      photoShares: 8
    },
    favoriteContacts: [
      { id: '1', name: 'Sarah (Daughter)', relationship: 'Family', status: 'online', lastContact: 'Yesterday', phone: '+1-555-0123' },
      { id: '2', name: 'Mike (Son)', relationship: 'Family', status: 'away', lastContact: '2 days ago', phone: '+1-555-0124' },
      { id: '3', name: 'Emma (Granddaughter)', relationship: 'Family', status: 'online', lastContact: 'This morning', phone: '+1-555-0125' },
      { id: '4', name: 'Bob Johnson', relationship: 'Friend', status: 'offline', lastContact: 'Last week', phone: '+1-555-0126' }
    ],
    recentActivity: [
      { id: '1', type: 'message', content: 'New message from Sarah: "Hope you\'re doing well, Dad!"', timestamp: new Date(Date.now() - 300000), from: 'Sarah', priority: 'high' },
      { id: '2', type: 'photo', content: 'Emma shared 3 new photos from school', timestamp: new Date(Date.now() - 600000), from: 'Emma' },
      { id: '3', type: 'call', content: 'Missed call from Mike', timestamp: new Date(Date.now() - 900000), from: 'Mike', priority: 'high' }
    ]
  });
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const MainActions = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {[
        { 
          title: "Send Message", 
          icon: MessageSquare, 
          color: "bg-blue-500 hover:bg-blue-600", 
          path: "/messages",
          description: "Write to family & friends"
        },
        { 
          title: "Make Call", 
          icon: Phone, 
          color: "bg-green-500 hover:bg-green-600", 
          path: "/calls",
          description: "Call your loved ones"
        },
        { 
          title: "View Photos", 
          icon: Camera, 
          color: "bg-purple-500 hover:bg-purple-600", 
          path: "/photos",
          description: "See shared memories"
        },
        { 
          title: "Address Book", 
          icon: Users, 
          color: "bg-orange-500 hover:bg-orange-600", 
          path: "/contacts",
          description: "Manage your contacts"
        }
      ].map((action, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="cursor-pointer"
          onClick={() => router.push(action.path)}
        >
          <div className={`${action.color} text-white p-6 rounded-lg shadow-lg transition-all duration-200`}>
            <div className="flex flex-col items-center text-center">
              <action.icon size={32} className="mb-3" />
              <h3 className="text-lg font-semibold mb-1">{action.title}</h3>
              <p className="text-sm opacity-90">{action.description}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const WelcomeCard = () => (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Good {currentTime.getHours() < 12 ? 'Morning' : currentTime.getHours() < 18 ? 'Afternoon' : 'Evening'}!
          </h1>
          <p className="text-gray-600 text-lg">{formatDate(currentTime)}</p>
          <p className="text-gray-500">{formatTime(currentTime)}</p>
        </div>
        <div className="text-right">
          <div className="text-4xl mb-2">
            {currentTime.getHours() < 12 ? '☀️' : currentTime.getHours() < 18 ? '🌤️' : '🌙'}
          </div>
          <p className="text-sm text-gray-500">Have a wonderful day!</p>
        </div>
      </div>
    </div>
  );

  const ImportantNotifications = () => (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
      <div className="flex items-center mb-4">
        <Bell className="text-red-500 mr-2" size={24} />
        <h2 className="text-xl font-semibold text-gray-800">Important Messages</h2>
      </div>

      <div className="space-y-4">
        {dashboardData.recentActivity
          .filter(activity => activity.priority === 'high')
          .map((activity, index) => (
            <div 
              key={activity.id}
              className="flex items-start p-4 bg-red-50 border border-red-200 rounded-lg"
            >
              <div className="flex-shrink-0 mr-3">
                {activity.type === 'message' ? (
                  <MessageSquare className="text-red-600" size={20} />
                ) : activity.type === 'call' ? (
                  <Phone className="text-red-600" size={20} />
                ) : (
                  <Mail className="text-red-600" size={20} />
                )}
              </div>
              <div className="flex-1">
                <p className="text-gray-800 font-medium">{activity.content}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {Math.floor((Date.now() - activity.timestamp.getTime()) / 60000)} minutes ago
                </p>
              </div>
              <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors">
                View
              </button>
            </div>
          ))}
        
        {dashboardData.recentActivity.filter(activity => activity.priority === 'high').length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Heart className="mx-auto mb-2 text-green-500" size={32} />
            <p>No urgent messages - all caught up!</p>
          </div>
        )}
      </div>
    </div>
  );

  const FamilyContacts = () => (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <Users className="mr-2 text-blue-600" size={24} />
          Family & Close Friends
        </h2>
        <button 
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          onClick={() => router.push('/contacts')}
        >
          View All →
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {dashboardData.favoriteContacts.map((contact, index) => (
          <div 
            key={contact.id}
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => router.push(`/chat/${contact.id}`)}
          >
            <div className="relative mr-4">
              <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center text-white text-lg font-bold">
                {contact.name[0]}
              </div>
              <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
                contact.status === 'online' ? 'bg-green-500' : 
                contact.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
              }`}></div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{contact.name}</h3>
              <p className="text-sm text-gray-600">{contact.relationship}</p>
              <p className="text-xs text-gray-500">Last contact: {contact.lastContact}</p>
            </div>
            <div className="flex flex-col space-y-2">
              <button className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors">
                <Phone size={16} />
              </button>
              <button className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors">
                <MessageSquare size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const RecentActivity = () => (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <Clock className="mr-2 text-purple-600" size={24} />
          Recent Activity
        </h2>
        <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">
          View All →
        </button>
      </div>

      <div className="space-y-3">
        {dashboardData.recentActivity.map((activity, index) => (
          <div 
            key={activity.id}
            className="flex items-start p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex-shrink-0 mr-3 mt-1">
              {activity.type === 'message' ? (
                <MessageSquare className="text-blue-600" size={20} />
              ) : activity.type === 'call' ? (
                <Phone className="text-green-600" size={20} />
              ) : activity.type === 'photo' ? (
                <Camera className="text-purple-600" size={20} />
              ) : (
                <Mail className="text-orange-600" size={20} />
              )}
            </div>
            <div className="flex-1">
              <p className="text-gray-800">{activity.content}</p>
              <p className="text-sm text-gray-500 mt-1">
                {Math.floor((Date.now() - activity.timestamp.getTime()) / 60000)} minutes ago
              </p>
            </div>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const QuickStats = () => (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {[
        { 
          title: "Unread Messages", 
          value: dashboardData.stats.unreadMessages, 
          icon: MessageSquare, 
          color: "text-blue-600 bg-blue-100",
          bgColor: "bg-blue-50"
        },
        { 
          title: "Family Contacts", 
          value: dashboardData.stats.familyContacts, 
          icon: Users, 
          color: "text-green-600 bg-green-100",
          bgColor: "bg-green-50"
        },
        { 
          title: "Today's Calls", 
          value: dashboardData.stats.todaysCalls,
          icon: Phone, 
          color: "text-purple-600 bg-purple-100",
          bgColor: "bg-purple-50"
        },
        {
          title: "Photo Shares",
          value: dashboardData.stats.photoShares,
          icon: Camera,
          color: "text-orange-600 bg-orange-100",
          bgColor: "bg-orange-50"
        }
      ].map((stat, index) => (
        <div
          key={index}
          className={`${stat.bgColor} border border-gray-200 rounded-lg p-4`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium mb-1">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
            <div className={`p-3 ${stat.color} rounded-lg`}>
              <stat.icon size={24} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const HelpfulLinks = () => (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <div className="flex items-center mb-4">
        <HelpCircle className="mr-2 text-gray-600" size={24} />
        <h2 className="text-xl font-semibold text-gray-800">Helpful Resources</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { title: "How to Send Photos", icon: Camera, description: "Learn to share memories with family" },
          { title: "Video Call Guide", icon: Video, description: "Step-by-step calling instructions" },
          { title: "Privacy Settings", icon: Settings, description: "Keep your information safe" },
          { title: "Contact Support", icon: HelpCircle, description: "Get help when you need it" }
        ].map((link, index) => (
          <div 
            key={index}
            className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <div className="p-2 bg-gray-100 rounded-lg mr-3">
              <link.icon className="text-gray-600" size={20} />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">{link.title}</h3>
              <p className="text-sm text-gray-600">{link.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-full bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Welcome message */}
        <WelcomeCard />

        {/* Important notifications */}
        <ImportantNotifications />

        {/* Main actions */}
        <MainActions />

        {/* Quick stats */}
        <QuickStats />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-6">
            {/* Family contacts */}
            <FamilyContacts />
            
            {/* Recent activity */}
            <RecentActivity />
          </div>

          <div>
            {/* Helpful links */}
            <HelpfulLinks />
          </div>
        </div>
      </div>
    </div>
  );
}