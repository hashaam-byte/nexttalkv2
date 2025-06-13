'use client'
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import TiltCard from '@/components/TiltCard';

// Holographic Button Component
const HolographicButton = ({ children, onClick, className = "", variant = "primary" }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const baseClasses = "relative px-6 py-3 rounded-full font-semibold text-sm overflow-hidden transition-all duration-300 transform";
  const variants = {
    primary: "bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-white shadow-lg shadow-purple-500/30",
    secondary: "bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white/20"
  };
  
  return (
    <motion.button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Holographic glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 opacity-0 blur-xl"
        animate={{ opacity: isHovered ? 0.8 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Scanning line effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: isHovered ? "100%" : "-100%" }}
        transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0 }}
      />
      
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

// Floating Particle Component
const FloatingParticles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

// Futuristic Chat Interface
const FuturisticChat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey! Check out this new holographic messaging!", sender: "other", time: "10:12 AM" },
    { id: 2, text: "Whoa! This looks incredible! 🚀", sender: "me", time: "10:13 AM" }
  ]);
  
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(true);
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now(),
          text: "The future of communication is here! ✨",
          sender: "other",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
        setIsTyping(false);
      }, 2000);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[500px] w-full max-w-sm mx-auto">
      {/* Holographic border */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-3xl p-0.5">
        <div className="h-full w-full bg-black/90 rounded-3xl overflow-hidden backdrop-blur-xl">
          {/* Chat header */}
          <div className="p-4 bg-gradient-to-r from-indigo-900/80 to-purple-900/80 border-b border-cyan-400/30">
            <div className="flex items-center">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 p-0.5">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center">
                    <span className="text-xl">🚀</span>
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-black animate-pulse" />
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-white font-semibold">Alex Future</h3>
                <p className="text-cyan-300 text-sm">Online • In the metaverse</p>
              </div>
              <div className="flex space-x-2">
                {['📞', '📹', '🎮'].map((icon, i) => (
                  <motion.div
                    key={i}
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-cyan-400/30"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(34, 211, 238, 0.2)" }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="text-lg">{icon}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 space-y-4 h-80 overflow-y-auto bg-gradient-to-b from-slate-900/50 to-black/50">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] rounded-2xl p-3 relative ${
                    message.sender === 'me' 
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30' 
                      : 'bg-white/10 backdrop-blur-md border border-white/20 text-white'
                  }`}>
                    {/* Holographic effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-2xl blur-sm" />
                    <p className="relative text-sm">{message.text}</p>
                    <p className="relative text-xs opacity-70 mt-1">{message.time}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3">
                  <div className="flex space-x-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-cyan-400 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-gradient-to-r from-indigo-900/60 to-purple-900/60 border-t border-cyan-400/30">
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="w-full bg-white/10 backdrop-blur-md border border-cyan-400/30 rounded-full px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-500/10 rounded-full blur-sm" />
              </div>
              <motion.button
                className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center shadow-lg shadow-cyan-500/30"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="text-lg">🚀</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Component
export default function MobileLayout() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  
  const [activeFeature, setActiveFeature] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      icon: "🌌",
      title: "Quantum Messaging",
      description: "Instant message delivery across dimensions with quantum encryption that makes your conversations unhackable.",
      gradient: "from-cyan-400 to-blue-600"
    },
    {
      icon: "🔮",
      title: "Holographic Calls",
      description: "Experience the future with 3D holographic video calls that make you feel like you're in the same room.",
      gradient: "from-purple-400 to-pink-600"
    },
    {
      icon: "🚀",
      title: "AI Assistant",
      description: "Your personal AI companion that helps you communicate better, translates languages, and predicts your needs.",
      gradient: "from-green-400 to-teal-600"
    },
    {
      icon: "⚡",
      title: "Neural Interface",
      description: "Connect your thoughts directly to the app with our experimental brain-computer interface technology.",
      gradient: "from-yellow-400 to-orange-600"
    },
    {
      icon: "🌐",
      title: "Metaverse Integration",
      description: "Meet friends in virtual worlds, attend events, and explore infinite digital universes together.",
      gradient: "from-indigo-400 to-purple-600"
    },
    {
      icon: "🎭",
      title: "Reality Filters",
      description: "Transform your environment in real-time with AR filters that change how you see and interact with the world.",
      gradient: "from-pink-400 to-rose-600"
    }
  ];

  const testimonials = [
    {
      name: "Zara X",
      role: "Digital Nomad",
      avatar: "🚀",
      content: "NextTalk transported me to the future! The holographic calls feel like magic.",
      rating: 5
    },
    {
      name: "Alex Neo",
      role: "Tech Influencer", 
      avatar: "🌟",
      content: "This isn't just an app, it's a portal to tomorrow. Mind = blown! 🤯",
      rating: 5
    },
    {
      name: "Luna Cyber",
      role: "VR Designer",
      avatar: "💫",
      content: "The metaverse integration is revolutionary. I'm living in the future!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Dynamic background */}
      <div className="fixed inset-0 z-0">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900" />
        
        {/* Moving orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-cyan-400/10 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 30, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Floating particles */}
        <FloatingParticles />
        
        {/* Cursor glow effect */}
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-cyan-400/5 blur-3xl pointer-events-none"
          animate={{
            x: mousePosition.x - 128,
            y: mousePosition.y - 128
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-white/10 bg-black/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="relative">
                <motion.div
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 p-0.5"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                    <span className="text-2xl">🌌</span>
                  </div>
                </motion.div>
              </div>
              <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-400 bg-clip-text text-transparent">
                NextTalk
              </span>
            </motion.div>
            
            {/* Navigation section */}
            <div className="flex items-center space-x-3">
              <Link href="/auth/login">
                <HolographicButton variant="secondary">Login</HolographicButton>
              </Link>
              <Link href="/auth/register">
                <HolographicButton>Sign Up</HolographicButton>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section 
        className="relative pt-32 pb-20 px-4"
        style={{ opacity, scale }}
      >
        <div className="container mx-auto text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Welcome to the
            <br />
            <span className="bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Future of Chat
            </span>
          </motion.h1>
          
          <motion.p
            className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Experience communication like never before with holographic calls, quantum encryption, 
            AI assistance, and metaverse integration. The future is here.
          </motion.p>
          
          {/* Hero section buttons */}
          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/auth/register">
              <HolographicButton className="text-lg px-8 py-4">
                Enter the Future 🚀
              </HolographicButton>
            </Link>
            <Link href="#demo">
              <HolographicButton variant="secondary" className="text-lg px-8 py-4">
                Watch Demo
              </HolographicButton>
            </Link>
          </motion.div>

          {/* Futuristic Chat Interface */}
          <motion.div
            initial={{ opacity: 0, y: 50, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="perspective-1000"
          >
            <TiltCard>
              <FuturisticChat />
            </TiltCard>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto">
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Futuristic Features
            </span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <TiltCard className="h-full">
                  <div className="relative p-8 h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden group-hover:border-cyan-400/30 transition-all duration-300">
                    {/* Gradient border effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-300`} />
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <div className="text-6xl mb-6">{feature.icon}</div>
                      <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                    </div>

                    {/* Holographic scanning line */}
                    <motion.div
                      className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100"
                      animate={{ y: [0, 300, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto">
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Experience the Magic
            </span>
          </motion.h2>

          <div className="relative max-w-4xl mx-auto">
            {/* Holographic device showcase */}
            <motion.div
              className="relative h-96 rounded-3xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-white/20 rounded-3xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="text-8xl"
                    animate={{ 
                      rotateY: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  >
                    🌌
                  </motion.div>
                </div>
                
                {/* Floating elements */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-16 h-16 rounded-full bg-gradient-to-r from-cyan-400/30 to-purple-500/30 backdrop-blur-sm border border-white/20"
                    style={{
                      top: `${20 + (i * 15)}%`,
                      left: `${10 + (i * 15)}%`
                    }}
                    animate={{
                      y: [0, -20, 0],
                      rotate: [0, 180, 360],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 3 + i,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center text-2xl">
                      {['💫', '⚡', '🔮', '🌟', '✨', '🚀'][i]}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <div className="text-center mt-12">
              {/* Interactive Demo section button */}
              <Link href="/register">
                <HolographicButton className="text-xl px-10 py-5">
                  Start Your Journey 🌌
                </HolographicButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto">
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Future Testimonials
            </span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <TiltCard>
                  <div className="relative p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden group hover:border-cyan-400/30 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    
                    <div className="relative z-10">
                      <div className="flex items-center mb-6">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center text-2xl">
                          {testimonial.avatar}
                        </div>
                        <div className="ml-4">
                          <h4 className="font-semibold text-white">{testimonial.name}</h4>
                          <p className="text-cyan-300 text-sm">{testimonial.role}</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 mb-4">"{testimonial.content}"</p>
                      
                      <div className="flex space-x-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className="text-yellow-400 text-xl">⭐</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto text-center">
          <motion.div
            className="relative p-12 bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Animated background */}
            <div className="absolute inset-0">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-purple-500/10 to-pink-400/10 opacity-50"
                  animate={{
                    scale: [1, 1.5, 1],
                    rotate: [0, 180, 360],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 8 + i * 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>

            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold mb-8">
                <span className="bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Ready for Tomorrow?
                </span>
              </h2>
              
              <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                Join millions of users who are already living in the future. Download NextTalk today and transform how you communicate forever.
              </p>
              
              {/* Download section buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link href="/register">
                  <HolographicButton className="text-xl px-12 py-6">
                    Download for iOS 🍎
                  </HolographicButton>
                </Link>
                <Link href="/register">
                  <HolographicButton className="text-xl px-12 py-6">
                    Download for Android 🤖
                  </HolographicButton>
                </Link>
              </div>
              
              <div className="mt-8 flex justify-center space-x-8 text-gray-400">
                <div className="flex items-center">
                  <span className="text-2xl mr-2">⭐</span>
                  <span>4.9/5 Rating</span>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-2">📱</span>
                  <span>10M+ Downloads</span>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-2">🚀</span>
                  <span>From the Future</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 border-t border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-6">
                <motion.div
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 p-0.5"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                    <span className="text-2xl">🌌</span>
                  </div>
                </motion.div>
                <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-400 bg-clip-text text-transparent">
                  NextTalk
                </span>
              </div>
              <p className="text-gray-400 mb-6">
                Connecting the future, one quantum message at a time.
              </p>
              <div className="flex space-x-4">
                {['🐦', '📘', '📷', '🎵'].map((icon, i) => (
                  <motion.div
                    key={i}
                    className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center cursor-pointer"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(34, 211, 238, 0.2)" }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="text-xl">{icon}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Quantum Messaging</li>
                <li>Holographic Calls</li>
                <li>AI Assistant</li>
                <li>Neural Interface</li>
                <li>Metaverse Integration</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Contact Us</li>
                <li>Bug Reports</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Careers</li>
                <li>Press Kit</li>
                <li>Investors</li>
                <li>Blog</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 NextTalk. All rights reserved. Made in the future. 🚀</p>
          </div>
        </div>
      </footer>
    </div>
  );
}