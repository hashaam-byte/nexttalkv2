'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, Users, Video, Bell, 
  ArrowRight, Calendar, Heart, Sparkles, 
  Activity, BookOpen, UserPlus, Star, Camera, Cpu, Film, Gamepad, Tv, Trophy, Code,
  Zap, Coffee, Music, Briefcase, Plane, ShoppingBag, Smartphone, Headphones
} from 'lucide-react';

const DEFAULT_AVATAR = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="40" height="40"%3E%3Crect width="100%25" height="100%25" fill="%234B5563"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="14" fill="white" text-anchor="middle" dy=".3em"%3E?%3C/text%3E%3C/svg%3E';

interface Friend {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'away' | 'offline';
  lastSeen?: string;
  activity?: string;
}

interface Activity {
  id: string;
  type: 'message' | 'call' | 'event' | 'group' | 'like' | 'story' | 'achievement';
  content: string;
  timestamp: Date;
  user: {
    name: string;
    avatar?: string;
  };
}

export default function MillennialHomePage() {
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState({
    stats: {
      messages: 247,
      contacts: 89,
      groups: 12,
      streaks: 5
    },
    onlineContacts: [
      { id: '1', name: 'Sarah Chen', status: 'online', activity: 'Watching Netflix' },
      { id: '2', name: 'Mike Rodriguez', status: 'online', activity: 'Gaming' },
      { id: '3', name: 'Emma Thompson', status: 'away', activity: 'At work' },
      { id: '4', name: 'Jake Wilson', status: 'online', activity: 'Listening to Spotify' }
    ],
    activities: [
      { id: '1', type: 'story', content: 'Posted a new story about weekend plans', timestamp: new Date(Date.now() - 300000), user: { name: 'You' } },
      { id: '2', type: 'achievement', content: 'Completed 7-day chat streak with Sarah!', timestamp: new Date(Date.now() - 600000), user: { name: 'System' } },
      { id: '3', type: 'group', content: 'Added to "Weekend Warriors" group', timestamp: new Date(Date.now() - 900000), user: { name: 'Mike' } }
    ]
  });
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('trending');

  const QuickActions = () => (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      {[
        { title: "Stories", icon: Camera, color: "from-pink-500 to-rose-500", gradient: "bg-gradient-to-r from-pink-500/20 to-rose-500/20", path: "/stories" },
        { title: "Groups", icon: Users, color: "from-purple-500 to-indigo-500", gradient: "bg-gradient-to-r from-purple-500/20 to-indigo-500/20", path: "/groups" },
        { title: "Live Chat", icon: Zap, color: "from-cyan-500 to-blue-500", gradient: "bg-gradient-to-r from-cyan-500/20 to-blue-500/20", path: "/live" },
        { title: "Discover", icon: Sparkles, color: "from-amber-500 to-orange-500", gradient: "bg-gradient-to-r from-amber-500/20 to-orange-500/20", path: "/discover" }
      ].map((action, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer"
          onClick={() => router.push(action.path)}
        >
          <div className={`${action.gradient} backdrop-blur-sm border border-white/20 rounded-2xl p-4 h-full hover:border-white/30 transition-all duration-300`}>
            <div className="flex flex-col items-center justify-center text-center">
              <div className={`p-3 bg-gradient-to-br ${action.color} rounded-full mb-2 shadow-lg`}>
                <action.icon size={20} className="text-white" />
              </div>
              <span className="text-sm font-medium text-white">{action.title}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const TrendingTopics = () => (
    <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 p-5 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white flex items-center">
          <Sparkles className="mr-2 text-yellow-400" size={20} />
          Trending Now
        </h2>
        <div className="flex space-x-2">
          {['trending', 'tech', 'lifestyle'].map((tab) => (
            <button 
              key={tab}
              className={`px-3 py-1 text-xs rounded-full transition-all capitalize ${
                activeTab === tab 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                  : 'bg-white/10 text-gray-400 hover:bg-white/20'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          { title: "AI Tools for Content Creation", category: "Tech", icon: Cpu, engagement: "2.4k discussing" },
          { title: "Remote Work Life Hacks", category: "Lifestyle", icon: Coffee, engagement: "1.8k sharing" },
          { title: "Crypto Market Updates", category: "Finance", icon: Briefcase, engagement: "3.1k following" },
          { title: "Travel on a Budget", category: "Travel", icon: Plane, engagement: "1.2k planning" }
        ].map((topic, index) => (
          <motion.div
            key={index}
            whileHover={{ x: 5, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
            className="flex items-center p-3 rounded-xl cursor-pointer border border-white/5 hover:border-white/20 transition-all"
          >
            <div className="p-2 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg mr-3">
              <topic.icon size={16} className="text-purple-300" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{topic.title}</p>
              <p className="text-xs text-gray-400">{topic.engagement}</p>
            </div>
            <ArrowRight size={14} className="text-gray-400" />
          </motion.div>
        ))}
      </div>
    </div>
  );

  const ActivityFeed = () => (
    <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 p-5 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white flex items-center">
          <Activity className="mr-2 text-cyan-400" size={20} />
          What's Happening
        </h2>
        <button className="text-xs text-purple-400 hover:text-purple-300 flex items-center">
          See all <ArrowRight size={14} className="ml-1" />
        </button>
      </div>

      <div className="space-y-4">
        {dashboardData.activities.map((activity, index) => (
          <motion.div 
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start space-x-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
          >
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold">
                {activity.user.name[0]}
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-200">{activity.content}</p>
              <p className="text-xs text-gray-400 mt-1">
                {Math.floor((Date.now() - activity.timestamp.getTime()) / 60000)}m ago
              </p>
            </div>
            {activity.type === 'story' && (
              <div className="flex space-x-2">
                <button className="p-1.5 bg-red-500/20 hover:bg-red-500/30 rounded-full transition-all">
                  <Heart size={14} className="text-red-400" />
                </button>
                <button className="p-1.5 bg-blue-500/20 hover:bg-blue-500/30 rounded-full transition-all">
                  <MessageSquare size={14} className="text-blue-400" />
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );

  const StatsCards = () => (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {[
        { 
          title: "Messages", 
          value: dashboardData.stats.messages, 
          icon: MessageSquare, 
          color: "from-cyan-500 to-blue-500",
          change: "+12%",
          trend: "up"
        },
        { 
          title: "Connections", 
          value: dashboardData.stats.contacts, 
          icon: Users, 
          color: "from-purple-500 to-pink-500",
          change: "+8%",
          trend: "up"
        },
        { 
          title: "Groups", 
          value: dashboardData.stats.groups,
          icon: Users, 
          color: "from-emerald-500 to-green-500",
          change: "+3",
          trend: "up"
        },
        {
          title: "Streaks",
          value: dashboardData.stats.streaks,
          icon: Zap,
          color: "from-amber-500 to-orange-500",
          change: "🔥",
          trend: "fire"
        }
      ].map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ scale: 1.02, y: -3 }}
          className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-4 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-xs mb-1 font-medium">{stat.title}</p>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className={`text-xs mt-1 ${stat.trend === 'up' ? 'text-green-400' : stat.trend === 'fire' ? 'text-amber-400' : 'text-gray-400'}`}>
                {stat.change}
              </p>
            </div>
            <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-xl text-white shadow-lg`}>
              <stat.icon size={20} />
            </div>
          </div>
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5`}></div>
        </motion.div>
      ))}
    </div>
  );

  const OnlineFriends = () => (
    <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white flex items-center">
          <Users className="mr-2 text-green-400" size={20} />
          Active Now
        </h2>
        <button className="text-xs text-purple-400 hover:text-purple-300">View all</button>
      </div>

      <div className="space-y-3">
        {dashboardData.onlineContacts.map((friend, index) => (
          <motion.div 
            key={friend.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ x: -3, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
            className="flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition-all"
            onClick={() => router.push(`/chat/${friend.id}`)}
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                {friend.name[0]}
              </div>
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-900 ${
                friend.status === 'online' ? 'bg-green-400' : 
                friend.status === 'away' ? 'bg-amber-400' : 'bg-gray-500'
              }`}></div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">{friend.name}</p>
              <p className="text-xs text-gray-400">{friend.activity}</p>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 bg-purple-500/20 hover:bg-purple-500/30 rounded-full transition-all">
                <MessageSquare size={14} className="text-purple-400" />
              </button>
              <button className="p-2 bg-green-500/20 hover:bg-green-500/30 rounded-full transition-all">
                <Video size={14} className="text-green-400" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="h-full bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 relative overflow-hidden">
      {/* Dynamic background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-purple-600/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 -right-20 w-96 h-96 bg-cyan-600/10 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-3/4 left-1/3 w-60 h-60 bg-pink-600/10 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Animated grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,69,239,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(139,69,239,0.1)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20"></div>
      </div>

      <div className="relative z-10 h-full overflow-y-auto p-4 md:p-6">
        {/* Welcome message */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Hey there! 👋
          </h1>
          <p className="text-gray-300 mt-1">Ready to connect and create today?</p>
        </div>

        {/* Quick actions */}
        <QuickActions />

        {/* Stats */}
        <StatsCards />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-6">
            {/* Trending topics */}
            <TrendingTopics />
            
            {/* Activity feed */}
            <ActivityFeed />
          </div>

          <div>
            {/* Online friends */}
            <OnlineFriends />
          </div>
        </div>
      </div>
    </div>
  );
}