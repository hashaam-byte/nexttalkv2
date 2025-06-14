'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, Users, Video, Bell, 
  ArrowRight, Calendar, Heart, Sparkles, 
  Activity, BookOpen, UserPlus, Star, Camera, Cpu, Film, Gamepad, Tv, Trophy, Code,
  Coffee, Briefcase, Clock, Settings, Mail, Phone, FileText, Archive, Shield, Globe
} from 'lucide-react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { TOPIC_CATEGORIES } from '@/config/topics';

const DEFAULT_AVATAR = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="40" height="40"%3E%3Crect width="100%25" height="100%25" fill="%234B5563"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="14" fill="white" text-anchor="middle" dy=".3em"%3E?%3C/text%3E%3C/svg%3E';

interface Friend {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'away' | 'offline';
  lastSeen?: string;
}

interface Activity {
  id: string;
  type: 'message' | 'call' | 'event' | 'group' | 'like';
  content: string;
  timestamp: Date;
  user: {
    name: string;
    avatar?: string;
  };
}

export default function GenXHomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState({
    stats: {
      messages: 0,
      contacts: 0,
      groups: 0
    },
    onlineContacts: [],
    activities: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeView, setActiveView] = useState('overview');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/dashboard');
        const data = await response.json();
        setDashboardData({
          stats: data.stats || { messages: 0, contacts: 0, groups: 0 },
          onlineContacts: data.onlineContacts || [],
          activities: data.activities || []
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setDashboardData({
          stats: { messages: 0, contacts: 0, groups: 0 },
          onlineContacts: [],
          activities: []
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (session?.user) {
      fetchDashboardData();
      const interval = setInterval(fetchDashboardData, 60000); // Refresh every minute
      return () => clearInterval(interval);
    }
  }, [session]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
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

  const formatActivityTime = (timestamp: Date | string) => {
    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diff = now.getTime() - date.getTime();
      const hours = Math.floor(diff / 3600000);
      const days = Math.floor(hours / 24);

      if (hours < 24) {
        return date.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        });
      } else if (days < 7) {
        return `${days} day${days > 1 ? 's' : ''} ago`;
      } else {
        return date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric'
        });
      }
    } catch (error) {
      return 'Recently';
    }
  };

  const QuickAccess = () => (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-200 mb-4 flex items-center">
        <Briefcase size={20} className="mr-2" />
        Quick Access
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { 
            title: "Messages", 
            icon: MessageSquare, 
            color: "bg-blue-600/20 hover:bg-blue-600/30 border-blue-500/30",
            textColor: "text-blue-400",
            path: "/contacts"
          },
          { 
            title: "Contacts", 
            icon: Users, 
            color: "bg-green-600/20 hover:bg-green-600/30 border-green-500/30",
            textColor: "text-green-400",
            path: "/contacts"
          },
          { 
            title: "Video Call", 
            icon: Video, 
            color: "bg-purple-600/20 hover:bg-purple-600/30 border-purple-500/30",
            textColor: "text-purple-400",
            path: "/videos"
          },
          { 
            title: "Settings", 
            icon: Settings, 
            color: "bg-gray-600/20 hover:bg-gray-600/30 border-gray-500/30",
            textColor: "text-gray-400",
            path: "/settings"
          }
        ].map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`${item.color} border rounded-lg p-4 cursor-pointer transition-all duration-200`}
            onClick={() => router.push(item.path)}
          >
            <div className="flex flex-col items-center text-center">
              <item.icon size={24} className={`${item.textColor} mb-2`} />
              <span className="text-sm font-medium text-gray-200">{item.title}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const StatusOverview = () => (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-200 flex items-center">
          <Activity size={20} className="mr-2" />
          Status Overview
        </h2>
        <div className="text-sm text-gray-400">
          {formatTime(currentTime)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            title: "Messages Today",
            value: dashboardData.stats.messages,
            icon: MessageSquare,
            color: "text-blue-400",
            bgColor: "bg-blue-500/10"
          },
          {
            title: "Active Contacts",
            value: dashboardData.stats.contacts,
            icon: Users,
            color: "text-green-400",
            bgColor: "bg-green-500/10"
          },
          {
            title: "Group Chats",
            value: dashboardData.stats.groups,
            icon: Users,
            color: "text-purple-400",
            bgColor: "bg-purple-500/10"
          }
        ].map((stat, index) => (
          <div key={index} className={`${stat.bgColor} rounded-lg p-4 border border-gray-700/30`}>
            <div className="flex items-center justify-between mb-2">
              <stat.icon size={20} className={stat.color} />
              <span className="text-2xl font-bold text-gray-200">{stat.value}</span>
            </div>
            <p className="text-sm text-gray-400">{stat.title}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const RecentActivity = () => (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-200 flex items-center">
          <Clock size={20} className="mr-2" />
          Recent Activity
        </h2>
        <div className="flex space-x-2">
          {['overview', 'messages', 'calls'].map((view) => (
            <button
              key={view}
              className={`px-3 py-1 text-xs rounded-md transition-all ${
                activeView === view
                  ? 'bg-blue-600/30 text-blue-400 border border-blue-500/50'
                  : 'bg-gray-700/30 text-gray-400 border border-gray-600/30 hover:bg-gray-600/30'
              }`}
              onClick={() => setActiveView(view)}
            >
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center space-x-3 p-3 bg-gray-700/30 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-gray-600/50 animate-pulse"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-600/50 rounded animate-pulse w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-600/50 rounded animate-pulse w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {dashboardData.activities.map((activity: Activity, index: number) => (
            <motion.div
              key={`${activity.id}-${index}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center space-x-3 p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white font-medium">
                {activity?.user?.name?.[0] || '?'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-gray-200 font-medium text-sm">{activity.user.name}</span>
                  <span className="text-gray-500 text-xs">{formatActivityTime(activity.timestamp)}</span>
                </div>
                <p className="text-gray-300 text-sm truncate">{activity.content}</p>
              </div>
              <div className="flex-shrink-0">
                {activity.type === 'message' && (
                  <MessageSquare size={16} className="text-blue-400" />
                )}
                {activity.type === 'call' && (
                  <Phone size={16} className="text-green-400" />
                )}
                {activity.type === 'group' && (
                  <Users size={16} className="text-purple-400" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-gray-700/50">
        <button 
          className="w-full py-2 text-center text-sm text-gray-400 hover:text-gray-300 transition-colors"
          onClick={() => router.push('/activity')}
        >
          View All Activity
        </button>
      </div>
    </div>
  );

  const ContactsList = () => (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-200 flex items-center">
          <Users size={20} className="mr-2" />
          Available Contacts
        </h3>
        <span className="text-sm text-gray-400">
          {dashboardData.onlineContacts.length} online
        </span>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center space-x-3 p-3 bg-gray-700/30 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-gray-600/50 animate-pulse"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-600/50 rounded animate-pulse w-2/3 mb-2"></div>
                <div className="h-3 bg-gray-600/50 rounded animate-pulse w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {dashboardData.onlineContacts.map((contact: Friend) => (
            <motion.div
              key={contact.id}
              whileHover={{ backgroundColor: "rgba(75, 85, 99, 0.3)" }}
              className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors"
              onClick={() => router.push(`/chat/${contact.id}`)}
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white font-medium overflow-hidden">
                  {contact.avatar ? (
                    <Image
                      src={contact.avatar}
                      alt={contact.name}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  ) : (
                    contact.name[0]
                  )}
                </div>
                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-800 ${
                  contact.status === 'online' ? 'bg-green-500' : 
                  contact.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
                }`}></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-200 truncate">{contact.name}</p>
                <p className="text-xs text-gray-400">
                  {contact.status === 'online' ? 'Online now' : contact.lastSeen || 'Offline'}
                </p>
              </div>
              <div className="flex space-x-1">
                <button 
                  className="p-1.5 bg-blue-600/20 hover:bg-blue-600/30 rounded-md transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/chat/${contact.id}`);
                  }}
                >
                  <MessageSquare size={14} className="text-blue-400" />
                </button>
                <button 
                  className="p-1.5 bg-green-600/20 hover:bg-green-600/30 rounded-md transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/call/${contact.id}`);
                  }}
                >
                  <Phone size={14} className="text-green-400" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-gray-700/50">
        <button 
          className="w-full py-2 text-center text-sm text-gray-400 hover:text-gray-300 transition-colors flex items-center justify-center"
          onClick={() => router.push('/contacts')}
        >
          <UserPlus size={16} className="mr-2" />
          Manage Contacts
        </button>
      </div>
    </div>
  );

  const TopicExplorer = () => (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-200 flex items-center">
          <Globe size={20} className="mr-2" />
          Discussion Topics
        </h3>
        <button 
          className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
          onClick={() => router.push('/topics')}
        >
          Browse All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {TOPIC_CATEGORIES?.slice(0, 2).flatMap(category => 
          category.topics.slice(0, 2).map(topic => (
            <motion.div
              key={topic.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center p-3 bg-gray-700/30 hover:bg-gray-700/50 rounded-lg cursor-pointer transition-all border border-gray-600/30"
              onClick={() => router.push(`/topics/${topic.id}`)}
            >
              <div className={`p-2 rounded-lg mr-3 ${topic.color || 'bg-gray-600'}`}>
                <topic.icon size={16} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-200 truncate">{topic.name}</p>
                <p className="text-xs text-gray-400 truncate">{topic.description}</p>
              </div>
              <ArrowRight size={14} className="text-gray-400 flex-shrink-0" />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );

  if (status === 'loading') {
    return (
      <div className="h-full flex items-center justify-center bg-gray-900">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-300 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-900">
        <div className="text-center p-8 bg-gray-800/50 rounded-xl border border-gray-700/50">
          <Shield size={48} className="mx-auto text-blue-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-200 mb-2">Authentication Required</h2>
          <p className="text-gray-400 mb-6">Please sign in to access your dashboard</p>
          <button 
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
            onClick={() => router.push('/login')}
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-100">
              Welcome back, {session.user?.name?.split(' ')[0] || 'User'}
            </h1>
            <p className="text-gray-400 mt-1">{formatDate(currentTime)}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-400">Current Time</p>
              <p className="text-lg font-semibold text-gray-200">{formatTime(currentTime)}</p>
            </div>
            <button className="p-2 bg-gray-700/50 hover:bg-gray-700/70 rounded-lg transition-colors">
              <Bell size={20} className="text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Quick Access */}
          <QuickAccess />

          {/* Status Overview */}
          <StatusOverview />

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2">
              <RecentActivity />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <ContactsList />
              <TopicExplorer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}