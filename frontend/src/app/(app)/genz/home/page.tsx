'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, Users, Video, Bell, 
  ArrowRight, Calendar, Heart, Sparkles, 
  Activity, BookOpen, UserPlus, Star, Camera, Cpu, Film, Gamepad, Tv, Trophy, Code,
  Zap, TrendingUp, Coffee, Headphones, Instagram, Twitter, Youtube, Twitch
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

export default function GenZHomePage() {
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
  const [activeTab, setActiveTab] = useState('vibes');

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
      const interval = setInterval(fetchDashboardData, 30000);
      return () => clearInterval(interval);
    }
  }, [session]);

  const formatTimestamp = (timestamp: Date | string | undefined) => {
    if (!timestamp) return 'just now';
    try {
      const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
      const now = new Date();
      const diff = now.getTime() - date.getTime();
      const minutes = Math.floor(diff / 60000);

      if (minutes < 1) return 'just now';
      if (minutes < 60) return `${minutes}m`;
      const hours = Math.floor(minutes / 60);
      if (hours < 24) return `${hours}h`;
      return date.toLocaleDateString();
    } catch (error) {
      return 'just now';
    }
  };

  const QuickActions = () => (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 text-transparent bg-clip-text">
          quick actions ✨
        </h2>
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-100"></div>
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-200"></div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {[
          { title: "slide into DMs", icon: MessageSquare, emoji: "💬", color: "from-pink-500 to-rose-500", path: "/contacts" },
          { title: "start a vibe", icon: Users, emoji: "👥", color: "from-purple-500 to-indigo-500", path: "/create-group" },
          { title: "face time", icon: Video, emoji: "📹", color: "from-cyan-500 to-blue-500", path: "/videos" },
          { title: "find your people", icon: UserPlus, emoji: "🔍", color: "from-yellow-500 to-orange-500", path: "/contacts" }
        ].map((action, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, rotate: 1 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer group"
            onClick={() => router.push(action.path)}
          >
            <div className={`bg-gradient-to-br ${action.color} p-4 rounded-2xl shadow-lg relative overflow-hidden`}>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex flex-col items-center text-white relative z-10">
                <div className="text-2xl mb-2">{action.emoji}</div>
                <span className="text-sm font-medium lowercase">{action.title}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const VibeCheck = () => (
    <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-xl rounded-3xl border border-white/10 p-6 mb-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-50"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">today's vibe check 🌟</h2>
          <div className="flex space-x-2">
            {['vibes', 'tea', 'chaos'].map((tab) => (
              <button
                key={tab}
                className={`px-3 py-1 text-xs rounded-full transition-all ${
                  activeTab === tab 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white' 
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {[
            { label: "messages", value: dashboardData.stats.messages, emoji: "💬", color: "from-pink-400 to-rose-400" },
            { label: "besties", value: dashboardData.stats.contacts, emoji: "👯", color: "from-purple-400 to-indigo-400" },
            { label: "group chats", value: dashboardData.stats.groups, emoji: "🗣️", color: "from-cyan-400 to-blue-400" },
            { label: "vibes", value: "∞", emoji: "✨", color: "from-yellow-400 to-orange-400" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/20 backdrop-blur-sm rounded-2xl p-4 border border-white/10"
            >
              <div className="text-2xl mb-2">{stat.emoji}</div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs text-gray-300 lowercase">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center justify-center space-x-4 text-sm">
          <span className="text-gray-300">current mood:</span>
          <div className="flex space-x-2">
            {['😎', '🔥', '💅', '✨'].map((emoji, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.2, rotate: 10 }}
                className="cursor-pointer"
              >
                {emoji}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const FeedContent = () => (
    <div className="space-y-4">
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-black/20 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-4 bg-white/10 rounded-full animate-pulse w-1/2 mb-2"></div>
                  <div className="h-3 bg-white/10 rounded-full animate-pulse w-1/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        dashboardData.activities.map((activity: Activity, index: number) => (
          <motion.div
            key={`${activity.id}-${index}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-black/20 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:border-pink-500/30 transition-all"
          >
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold">
                {activity?.user?.name?.[0] || '?'}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-white font-medium">{activity.user.name}</span>
                  <span className="text-xs text-gray-400">{formatTimestamp(activity.timestamp)}</span>
                  {index < 3 && <span className="text-xs bg-pink-500 text-white px-2 py-0.5 rounded-full">new</span>}
                </div>
                <p className="text-gray-300 text-sm">{activity.content}</p>
                <div className="flex space-x-4 mt-2 text-xs text-gray-400">
                  <button className="hover:text-pink-400 transition-colors">💬 reply</button>
                  <button className="hover:text-red-400 transition-colors">❤️ like</button>
                  <button className="hover:text-cyan-400 transition-colors">🔄 share</button>
                </div>
              </div>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );

  const OnlineSquad = () => (
    <div className="bg-black/20 backdrop-blur-sm rounded-3xl border border-white/10 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">your squad online 👑</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-400">{dashboardData.onlineContacts.length} online</span>
        </div>
      </div>

      <div className="space-y-3">
        {dashboardData.onlineContacts.map((friend: Friend) => (
          <motion.div
            key={friend.id}
            whileHover={{ x: 5, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
            className="flex items-center space-x-3 p-3 rounded-xl cursor-pointer"
            onClick={() => router.push(`/chat/${friend.id}`)}
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold">
                {friend.name[0]}
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-900"></div>
            </div>
            <div className="flex-1">
              <p className="text-white font-medium">{friend.name}</p>
              <p className="text-xs text-gray-400">online • ready to chat 💬</p>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 bg-pink-500/20 hover:bg-pink-500/30 rounded-full transition-all">
                <MessageSquare size={16} className="text-pink-400" />
              </button>
              <button className="p-2 bg-purple-500/20 hover:bg-purple-500/30 rounded-full transition-all">
                <Video size={16} className="text-purple-400" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {dashboardData.onlineContacts.length === 0 && (
        <div className="text-center py-8">
          <div className="text-4xl mb-2">😴</div>
          <p className="text-gray-400 text-sm">nobody's online rn</p>
          <button className="mt-3 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full text-xs">
            find more friends
          </button>
        </div>
      )}
    </div>
  );

  if (status === 'loading') {
    return (
      <div className="h-full bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 rounded-full border-4 border-t-pink-400 border-r-purple-400 border-b-cyan-400 border-l-transparent mx-auto mb-4"
          ></motion.div>
          <p className="text-white text-lg">loading the vibes... ✨</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="h-full bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">😭</div>
          <h2 className="text-2xl font-bold text-white mb-4">you're not logged in bestie</h2>
          <p className="text-gray-300 mb-6">sign in to see all the tea ☕</p>
          <button 
            className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-medium shadow-lg"
            onClick={() => router.push('/login')}
          >
            let's go! 🚀
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 -left-20 w-64 h-64 bg-pink-500/20 rounded-full filter blur-3xl"
        ></motion.div>
        <motion.div
          animate={{ x: [0, -100, 0], y: [0, 50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/3 -right-20 w-80 h-80 bg-cyan-500/20 rounded-full filter blur-3xl"
        ></motion.div>
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-3/4 left-1/3 w-40 h-40 bg-purple-500/20 rounded-full filter blur-3xl"
        ></motion.div>
      </div>

      <div className="relative z-10 h-full overflow-y-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">
                hey {session.user?.name?.split(' ')[0] || 'bestie'} 💖
              </h1>
              <p className="text-gray-300 text-sm">what's the vibe today?</p>
            </div>
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce delay-200"></div>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* Vibe Check */}
        <VibeCheck />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-black/20 backdrop-blur-sm rounded-3xl border border-white/10 p-6">
              <h2 className="text-xl font-bold text-white mb-4">the feed 📱</h2>
              <FeedContent />
            </div>
          </div>

          <div>
            <OnlineSquad />
          </div>
        </div>
      </div>
    </div>
  );
}