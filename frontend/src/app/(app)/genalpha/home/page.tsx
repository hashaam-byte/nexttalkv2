'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, Users, Video, Bell, 
  ArrowRight, Calendar, Heart, Sparkles, 
  Activity, BookOpen, UserPlus, Star, Camera, Cpu, Film, Gamepad, Tv, Trophy, Code,
  Zap, TrendingUp, Coffee, Headphones, Flame, Rocket, Diamond, Crown
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

export default function GenAlphaHomePage() {
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
  const [activeTab, setActiveTab] = useState('fire');
  const [streakCount, setStreakCount] = useState(7);

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

  const SigmaActions = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-transparent bg-clip-text">
          SIGMA MOVES 🔥
        </h2>
        <div className="flex items-center space-x-2 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 border border-yellow-500/30">
          <Flame size={16} className="text-yellow-400" />
          <span className="text-yellow-400 font-bold text-sm">{streakCount} DAY STREAK</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {[
          { 
            title: "RIZZ CHAT", 
            subtitle: "slide into DMs", 
            icon: MessageSquare, 
            emoji: "🗣️", 
            color: "from-blue-600 via-blue-500 to-cyan-400",
            glow: "shadow-blue-500/50",
            path: "/contacts"
          },
          { 
            title: "SQUAD UP", 
            subtitle: "build your crew", 
            icon: Users, 
            emoji: "👥", 
            color: "from-purple-600 via-purple-500 to-pink-400",
            glow: "shadow-purple-500/50",
            path: "/create-group"
          },
          { 
            title: "FACE CAM", 
            subtitle: "1v1 me bro", 
            icon: Video, 
            emoji: "📹", 
            color: "from-red-600 via-red-500 to-orange-400",
            glow: "shadow-red-500/50",
            path: "/videos"
          },
          { 
            title: "FIND GOATS", 
            subtitle: "network expand", 
            icon: UserPlus, 
            emoji: "🐐", 
            color: "from-green-600 via-green-500 to-lime-400",
            glow: "shadow-green-500/50",
            path: "/contacts"
          }
        ].map((action, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer group relative"
            onClick={() => router.push(action.path)}
          >
            <div className={`bg-gradient-to-br ${action.color} p-6 rounded-2xl shadow-2xl ${action.glow} relative overflow-hidden border border-white/20`}>
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-3xl">{action.emoji}</div>
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <action.icon size={24} className="text-white" />
                  </motion.div>
                </div>
                <div className="text-white">
                  <h3 className="font-black text-lg mb-1">{action.title}</h3>
                  <p className="text-sm opacity-90 uppercase tracking-wide">{action.subtitle}</p>
                </div>
              </div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -skew-x-12 group-hover:animate-pulse"></div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const RizzBoard = () => (
    <div className="bg-gradient-to-br from-yellow-900/40 to-orange-900/40 backdrop-blur-xl rounded-3xl border-2 border-yellow-500/30 p-6 mb-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10"></div>
      
      {/* Floating elements */}
      <div className="absolute top-4 right-4">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="text-2xl"
        >
          🔥
        </motion.div>
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-white">RIZZ BOARD 📊</h2>
          <div className="flex space-x-2">
            {['fire', 'w', 'cap'].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 text-sm font-bold rounded-full transition-all uppercase ${
                  activeTab === tab 
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black shadow-lg' 
                    : 'bg-black/30 text-gray-300 hover:bg-black/50'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { 
              label: "MESSAGES", 
              value: dashboardData.stats.messages, 
              emoji: "💬", 
              color: "from-blue-400 to-cyan-400",
              rank: "GOAT"
            },
            { 
              label: "SQUAD", 
              value: dashboardData.stats.contacts, 
              emoji: "👥", 
              color: "from-purple-400 to-pink-400",
              rank: "FIRE"
            },
            { 
              label: "GROUPS", 
              value: dashboardData.stats.groups, 
              emoji: "🏆", 
              color: "from-green-400 to-lime-400",
              rank: "W"
            },
            { 
              label: "RIZZ LEVEL", 
              value: "MAX", 
              emoji: "⚡", 
              color: "from-yellow-400 to-orange-400",
              rank: "SIGMA"
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-black/40 backdrop-blur-sm rounded-2xl p-4 border border-white/20 relative overflow-hidden"
            >
              <div className="absolute top-2 right-2">
                <span className="text-xs font-black bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-2 py-1 rounded-full">
                  {stat.rank}
                </span>
              </div>
              
              <div className="text-center">
                <div className="text-3xl mb-2">{stat.emoji}</div>
                <div className={`text-3xl font-black bg-gradient-to-r ${stat.color} text-transparent bg-clip-text mb-2`}>
                  {stat.value}
                </div>
                <div className="text-xs text-gray-300 font-bold uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center space-x-6">
          <div className="flex items-center space-x-2">
            <span className="text-gray-300 text-sm font-bold">CURRENT MOOD:</span>
            <div className="flex space-x-2">
              {['🔥', '💀', '🗿', '⚡', '🐐'].map((emoji, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.3, rotate: 15 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-2xl hover:shadow-lg transition-all"
                >
                  {emoji}
                </motion.button>
              ))}
            </div>
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
            <div key={i} className="bg-black/30 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-4 bg-white/20 rounded-full animate-pulse w-1/2 mb-2"></div>
                  <div className="h-3 bg-white/20 rounded-full animate-pulse w-1/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        dashboardData.activities.map((activity: Activity, index: number) => (
          <motion.div
            key={`${activity.id}-${index}`}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-black/30 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:border-yellow-500/50 transition-all relative overflow-hidden"
          >
            <div className="absolute top-2 right-2">
              {index < 3 && (
                <span className="text-xs font-black bg-gradient-to-r from-red-500 to-orange-500 text-white px-2 py-1 rounded-full">
                  HOT
                </span>
              )}
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center text-black font-black text-lg">
                {activity?.user?.name?.[0] || '?'}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-white font-black">{activity.user.name}</span>
                  <span className="text-xs text-gray-400 font-bold">
                    {Math.floor(Math.random() * 60)}m ago
                  </span>
                  <Crown size={14} className="text-yellow-400" />
                </div>
                <p className="text-gray-200 font-medium">{activity.content}</p>
                <div className="flex space-x-4 mt-3">
                  <button className="flex items-center space-x-1 text-xs font-bold text-red-400 hover:text-red-300 transition-colors">
                    <span>🔥</span>
                    <span>FIRE</span>
                  </button>
                  <button className="flex items-center space-x-1 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors">
                    <span>💬</span>
                    <span>REPLY</span>
                  </button>
                  <button className="flex items-center space-x-1 text-xs font-bold text-green-400 hover:text-green-300 transition-colors">
                    <span>🔄</span>
                    <span>SHARE</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );

  const OnlineGoats = () => (
    <div className="bg-black/30 backdrop-blur-sm rounded-3xl border border-white/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-black text-white">ONLINE GOATS 🐐</h3>
        <div className="flex items-center space-x-2 bg-green-500/20 rounded-full px-3 py-1">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs font-bold text-green-400">{dashboardData.onlineContacts.length} ONLINE</span>
        </div>
      </div>

      <div className="space-y-3">
        {dashboardData.onlineContacts.map((friend: Friend) => (
          <motion.div
            key={friend.id}
            whileHover={{ x: 8, scale: 1.02 }}
            className="flex items-center space-x-4 p-3 rounded-xl cursor-pointer bg-white/5 hover:bg-white/10 transition-all border border-white/10"
            onClick={() => router.push(`/chat/${friend.id}`)}
          >
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center text-black font-black text-lg">
                {friend.name[0]}
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-gray-900 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-white font-bold text-lg">{friend.name}</p>
              <p className="text-xs font-bold text-green-400 uppercase">ONLINE • READY TO VIBE</p>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 bg-blue-500/30 hover:bg-blue-500/50 rounded-full transition-all">
                <MessageSquare size={18} className="text-blue-400" />
              </button>
              <button className="p-2 bg-red-500/30 hover:bg-red-500/50 rounded-full transition-all">
                <Video size={18} className="text-red-400" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {dashboardData.onlineContacts.length === 0 && (
        <div className="text-center py-8">
          <div className="text-5xl mb-4">😴</div>
          <p className="text-gray-400 font-bold text-lg mb-4">NO GOATS ONLINE RN</p>
          <button className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-black rounded-full text-sm shadow-lg hover:shadow-xl transition-all">
            FIND MORE GOATS
          </button>
        </div>
      )}
    </div>
  );

  if (status === 'loading') {
    return (
      <div className="h-full bg-gradient-to-br from-yellow-900 via-orange-900 to-red-900 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 rounded-full border-4 border-t-yellow-400 border-r-orange-400 border-b-red-400 border-l-transparent mx-auto mb-6"
          ></motion.div>
          <p className="text-white text-xl font-black">LOADING THE SIGMA ENERGY... 🔥</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="h-full bg-gradient-to-br from-yellow-900 via-orange-900 to-red-900 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-8xl mb-6">💀</div>
          <h2 className="text-3xl font-black text-white mb-4">BRO YOU'RE NOT LOGGED IN</h2>
          <p className="text-gray-300 font-bold text-lg mb-8">SIGN IN TO UNLOCK THE SIGMA GRINDSET</p>
          <button 
            className="px-10 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-black rounded-full text-lg shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105"
            onClick={() => router.push('/login')}
          >
            LET'S GOOO! 🚀
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gradient-to-br from-yellow-900 via-orange-900 to-red-900 relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            x: [0, 100, -100, 0], 
            y: [0, -50, 50, 0],
            scale: [1, 1.5, 0.8, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 -left-20 w-72 h-72 bg-yellow-500/30 rounded-full filter blur-3xl"
        ></motion.div>
        <motion.div
          animate={{ 
            x: [0, -150, 100, 0], 
            y: [0, 80, -60, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/3 -right-20 w-96 h-96 bg-orange-500/30 rounded-full filter blur-3xl"
        ></motion.div>
        <motion.div
          animate={{ 
            scale: [1, 2, 0.5, 1], 
            opacity: [0.3, 0.8, 0.2, 0.3],
            rotate: [0, 90, 180, 270, 360]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-3/4 left-1/3 w-48 h-48 bg-red-500/30 rounded-full filter blur-3xl"
        ></motion.div>
      </div>

      <div className="relative z-10 h-full overflow-y-auto p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-white mb-2">
                YO {(session.user?.name?.split(' ')[0] || 'SIGMA').toUpperCase()} 🔥
              </h1>
              <p className="text-orange-300 font-bold text-lg">TIME TO LOCK IN AND GRIND</p>
            </div>
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="text-4xl"
              >
                ⚡
              </motion.div>
              <div className="text-right">
                <div className="text-yellow-400 font-black text-2xl">SIGMA</div>
                <div className="text-orange-300 font-bold text-sm">MODE: ON</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sigma Actions */}
        <SigmaActions />

        {/* Rizz Board */}
        <RizzBoard />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-black/30 backdrop-blur-sm rounded-3xl border border-white/10 p-6">
              <h2 className="text-2xl font-black text-white mb-6">THE FEED 📱</h2>
              <FeedContent />
            </div>
          </div>

          <div>
            <OnlineGoats />
          </div>
        </div>
      </div>
    </div>
  );
}