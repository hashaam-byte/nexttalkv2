'use client'
import { motion } from 'framer-motion';

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900 text-white">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-4"
      >
        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">
          Chat Messages
        </h1>
        {/* Add chat list content */}
        <div className="mt-4 space-y-4">
          {/* Recent chats will go here */}
        </div>
      </motion.div>
    </div>
  );
}
