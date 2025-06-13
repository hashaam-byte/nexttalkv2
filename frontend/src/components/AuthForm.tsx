// src/components/AuthForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { GeistMono } from 'geist/font/mono';
import { Eye, EyeOff, Sparkles, Zap, Star, Heart, Coffee } from 'lucide-react';

interface AuthFormProps {
  mode: 'login' | 'register';
}

type Generation = 'genalpha' | 'genz' | 'millennial' | 'genx' | 'boomer';

const generationThemes = {
  genalpha: {
    name: 'Gen Alpha',
    gradient: 'from-violet-600 via-pink-500 to-cyan-400',
    bgGradient: 'from-violet-950 via-purple-900 to-cyan-900',
    accent: 'violet-400',
    secondary: 'pink-400',
    icon: Sparkles,
    title: 'Let\'s Go! 🚀',
    subtitle: 'Join the revolution',
    buttonText: 'LFG! 💫',
    effects: 'neon-glow rainbow-border',
  },
  genz: {
    name: 'Gen Z',
    gradient: 'from-emerald-400 via-cyan-400 to-blue-500',
    bgGradient: 'from-gray-900 via-emerald-950 to-blue-950',
    accent: 'emerald-400',
    secondary: 'cyan-400',
    icon: Zap,
    title: 'No Cap 💯',
    subtitle: 'Main character energy',
    buttonText: 'Send it ⚡',
    effects: 'cyber-glow pulse-border',
  },
  millennial: {
    name: 'Millennial',
    gradient: 'from-purple-500 via-pink-500 to-orange-400',
    bgGradient: 'from-gray-900 via-purple-900 to-pink-900',
    accent: 'purple-400',
    secondary: 'pink-400',
    icon: Coffee,
    title: 'Adulting Level Up',
    subtitle: 'Because we deserve nice things',
    buttonText: 'Let\'s do this ☕',
    effects: 'retro-glow gradient-border',
  },
  genx: {
    name: 'Gen X',
    gradient: 'from-indigo-500 via-purple-500 to-teal-400',
    bgGradient: 'from-gray-900 via-indigo-950 to-gray-900',
    accent: 'indigo-400',
    secondary: 'teal-400',
    icon: Star,
    title: 'Keep it Real',
    subtitle: 'Simple, secure, straightforward',
    buttonText: 'Get started',
    effects: 'classic-glow clean-border',
  },
  boomer: {
    name: 'Boomer',
    gradient: 'from-blue-600 via-indigo-500 to-purple-500',
    bgGradient: 'from-slate-900 via-blue-950 to-slate-900',
    accent: 'blue-400',
    secondary: 'indigo-400',
    icon: Heart,
    title: 'Welcome',
    subtitle: 'Trusted and reliable',
    buttonText: 'Continue',
    effects: 'elegant-glow traditional-border',
  },
};

const detectGeneration = (): Generation => {
  // This could be enhanced to detect based on user agent, preferences, or user input
  // For now, we'll cycle through or detect based on time/random
  const userAgent = navigator.userAgent.toLowerCase();
  const currentYear = new Date().getFullYear();
  
  // Simple heuristic - in a real app, you might have user preference or birth year
  if (userAgent.includes('mobile') && Math.random() > 0.7) return 'genalpha';
  if (Math.random() > 0.6) return 'genz';
  if (Math.random() > 0.4) return 'millennial';
  if (Math.random() > 0.2) return 'genx';
  return 'boomer';
};

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generation, setGeneration] = useState<Generation>('genz');
  const [mounted, setMounted] = useState(false);
  
  // File upload state
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    bio: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([]);

  const currentTheme = generationThemes[generation];
  const IconComponent = currentTheme.icon;

  useEffect(() => {
    setMounted(true);
    const detectedGen = detectGeneration();
    setGeneration(detectedGen);
    
    // Create floating particles for Gen Alpha and Gen Z
    if (detectedGen === 'genalpha' || detectedGen === 'genz') {
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
      }));
      setParticles(newParticles);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerationChange = (newGen: Generation) => {
    setGeneration(newGen);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    
    if (mode === 'login') {
      try {
        const result = await signIn('credentials', {
          redirect: false,
          email: formData.email,
          password: formData.password,
          callbackUrl: '/home'
        });

        if (result?.error) {
          setError('Invalid credentials');
        } else if (result?.ok) {
          router.push('/home');
          router.refresh();
        }
      } catch (error) {
        setError('An error occurred during sign in');
      }
    } else {
      try {
        const registerResponse = await fetch(`${API_URL}/api/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            phone: formData.phone || null,
            bio: formData.bio || null
          }),
        });

        if (!registerResponse.ok) {
          const data = await registerResponse.json();
          throw new Error(data.error || 'Registration failed');
        }

        const signInResult = await signIn('credentials', {
          redirect: false,
          email: formData.email,
          password: formData.password,
        });

        if (signInResult?.error) {
          throw new Error('Error signing in after registration');
        }

        if (selectedImage) {
          const imageFormData = new FormData();
          imageFormData.append('image', selectedImage);

          const imageUploadResponse = await fetch(`${API_URL}/api/user/profile-image`, {
            method: 'POST',
            body: imageFormData,
          });

          if (!imageUploadResponse.ok) {
            console.error('Failed to upload profile image');
          }
        }

        router.push('/');
        router.refresh();
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred');
      }
    }
    setLoading(false);
  };

  if (!mounted) return null;

  return (
    <>
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.6); }
        }
        
        @keyframes rainbow {
          0% { border-color: #ff0000; }
          16% { border-color: #ff8000; }
          33% { border-color: #ffff00; }
          50% { border-color: #00ff00; }
          66% { border-color: #0080ff; }
          83% { border-color: #8000ff; }
          100% { border-color: #ff0000; }
        }
        
        .neon-glow {
          box-shadow: 0 0 30px rgba(139, 92, 246, 0.4), inset 0 0 30px rgba(139, 92, 246, 0.1);
          animation: glow-pulse 2s ease-in-out infinite;
        }
        
        .cyber-glow {
          box-shadow: 0 0 25px rgba(16, 185, 129, 0.3), 0 0 50px rgba(16, 185, 129, 0.1);
        }
        
        .retro-glow {
          box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
        }
        
        .classic-glow {
          box-shadow: 0 0 15px rgba(99, 102, 241, 0.2);
        }
        
        .elegant-glow {
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.2);
        }
        
        .rainbow-border {
          border: 2px solid;
          animation: rainbow 3s linear infinite;
        }
        
        .pulse-border {
          border: 2px solid rgba(16, 185, 129, 0.5);
          animation: glow-pulse 2s ease-in-out infinite;
        }
        
        .floating-particle {
          animation: float 6s ease-in-out infinite;
        }
        
        .glass-morphism {
          backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>
      
      <div className={`min-h-screen relative overflow-hidden bg-gradient-to-br ${currentTheme.bgGradient} ${GeistMono.className}`}>
        {/* Floating Particles for Gen Alpha and Gen Z */}
        {(generation === 'genalpha' || generation === 'genz') && particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 bg-white/20 rounded-full floating-particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.id * 0.2}s`,
            }}
          />
        ))}
        
        {/* Grid Background for Gen Alpha */}
        {generation === 'genalpha' && (
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-20 grid-rows-20 h-full w-full">
              {Array.from({ length: 400 }).map((_, i) => (
                <div key={i} className="border border-violet-400/20" />
              ))}
            </div>
          </div>
        )}
        
        <div className="min-h-screen flex items-center justify-center p-4">
          {/* Generation Selector */}
          <div className="absolute top-4 right-4 z-10">
            <select
              value={generation}
              onChange={(e) => handleGenerationChange(e.target.value as Generation)}
              className="bg-black/30 text-white text-xs rounded-lg px-3 py-1 border border-white/20 backdrop-blur-sm"
            >
              {Object.entries(generationThemes).map(([key, theme]) => (
                <option key={key} value={key} className="bg-gray-900">
                  {theme.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className={`w-full max-w-md p-8 space-y-6 glass-morphism rounded-3xl ${currentTheme.effects} relative`}>
            {/* Animated Icon */}
            <div className="text-center">
              <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${currentTheme.gradient} mb-4 transform hover:scale-110 transition-transform duration-300`}>
                <IconComponent className="h-8 w-8 text-white" />
              </div>
              
              <h2 className={`text-3xl font-bold bg-gradient-to-r ${currentTheme.gradient} text-transparent bg-clip-text mb-2`}>
                {currentTheme.title}
              </h2>
              
              <p className="text-gray-300 text-sm">
                {mode === 'login' ? 'Welcome back!' : currentTheme.subtitle}
              </p>
            </div>
            
            {error && (
              <div className={`p-4 text-sm text-red-300 bg-red-500/20 rounded-xl border border-red-500/30 backdrop-blur-sm`}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {mode === 'register' && (
                <>
                  {/* Name Field */}
                  <div className="group">
                    <label className={`text-sm font-medium text-${currentTheme.accent} block mb-2`}>
                      Full Name ✨
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-4 bg-black/30 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm text-white placeholder-gray-400 transition-all duration-300 group-hover:bg-black/40"
                      placeholder="Your awesome name"
                    />
                  </div>
                  
                  {/* Enhanced Profile Image */}
                  <div className="group">
                    <label className={`text-sm font-medium text-${currentTheme.accent} block mb-2`}>
                      Profile Pic 📸
                    </label>
                    <div className="flex items-center space-x-6">
                      <div className="relative">
                        {previewUrl ? (
                          <div className={`relative h-20 w-20 overflow-hidden rounded-full ring-4 ring-${currentTheme.accent}/50 transform hover:scale-105 transition-transform duration-300`}>
                            <Image 
                              src={previewUrl}
                              alt="Profile preview" 
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className={`h-20 w-20 rounded-full bg-gradient-to-br ${currentTheme.gradient} flex items-center justify-center ring-4 ring-${currentTheme.accent}/30 transform hover:scale-105 transition-transform duration-300`}>
                            <span className="text-white text-2xl">✨</span>
                          </div>
                        )}
                      </div>
                      <label className={`cursor-pointer rounded-xl bg-gradient-to-r ${currentTheme.gradient} px-6 py-3 text-sm font-medium text-white hover:shadow-lg transform hover:scale-105 transition-all duration-300`}>
                        <span>{generation === 'genalpha' ? 'Upload fire pic 🔥' : generation === 'genz' ? 'Choose your vibe ✨' : 'Upload image'}</span>
                        <input 
                          id="profileImage" 
                          name="profileImage" 
                          type="file" 
                          className="sr-only" 
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>
                  </div>
                  
                  {/* Phone Field */}
                  <div className="group">
                    <label className={`text-sm font-medium text-${currentTheme.accent} block mb-2`}>
                      Phone {generation === 'genalpha' ? '📱' : generation === 'genz' ? '(optional but cool)' : '(optional)'}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-4 bg-black/30 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm text-white placeholder-gray-400 transition-all duration-300 group-hover:bg-black/40"
                      placeholder={generation === 'genalpha' ? 'Your digits' : 'Your phone number'}
                    />
                  </div>
                  
                  {/* Bio Field */}
                  <div className="group">
                    <label className={`text-sm font-medium text-${currentTheme.accent} block mb-2`}>
                      {generation === 'genalpha' ? 'Your Story 📝' : generation === 'genz' ? 'Bio (make it iconic)' : 'Bio (optional)'}
                    </label>
                    <textarea
                      name="bio"
                      rows={3}
                      value={formData.bio}
                      onChange={handleChange}
                      className="w-full p-4 bg-black/30 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm text-white placeholder-gray-400 transition-all duration-300 group-hover:bg-black/40 resize-none"
                      placeholder={
                        generation === 'genalpha' ? 'Tell us your vibe...' : 
                        generation === 'genz' ? 'Main character energy only...' : 
                        'Write a short bio about yourself'
                      }
                    />
                  </div>
                </>
              )}

              {/* Email Field */}
              <div className="group">
                <label className={`text-sm font-medium text-${currentTheme.accent} block mb-2`}>
                  Email {generation === 'genalpha' && '📧'}
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-4 bg-black/30 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm text-white placeholder-gray-400 transition-all duration-300 group-hover:bg-black/40"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Password Field */}
              <div className="group">
                <label className={`text-sm font-medium text-${currentTheme.accent} block mb-2`}>
                  Password {generation === 'genalpha' && '🔐'}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-4 pr-12 bg-black/30 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm text-white placeholder-gray-400 transition-all duration-300 group-hover:bg-black/40"
                    placeholder={
                      mode === 'register' ? 
                        (generation === 'genalpha' ? "Make it secure! 8+ chars" : "Create a password (8+ characters)") : 
                        "Enter your password"
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 text-${currentTheme.accent} hover:text-white transition-colors duration-300`}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              {mode === 'register' && (
                <div className="group">
                  <label className={`text-sm font-medium text-${currentTheme.accent} block mb-2`}>
                    Confirm Password {generation === 'genalpha' && '🔒'}
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full p-4 pr-12 bg-black/30 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm text-white placeholder-gray-400 transition-all duration-300 group-hover:bg-black/40"
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className={`absolute right-4 top-1/2 -translate-y-1/2 text-${currentTheme.accent} hover:text-white transition-colors duration-300`}
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              )}

              {/* Enhanced Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 px-6 mt-8 bg-gradient-to-r ${currentTheme.gradient} hover:shadow-2xl text-white font-bold rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-500/50 disabled:opacity-50 transform hover:scale-105 transition-all duration-300 relative overflow-hidden group`}
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  {loading ? (
                    <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                  ) : (
                    <>
                      <span>
                        {mode === 'login' ? 
                          (generation === 'genalpha' ? 'Let\'s GO! 🚀' : generation === 'genz' ? 'Send it ⚡' : 'Sign in') : 
                          currentTheme.buttonText
                        }
                      </span>
                      <IconComponent className="h-4 w-4" />
                    </>
                  )}
                </span>
                
                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </button>

              {/* Forgot Password Link */}
              {mode === 'login' && (
                <div className="text-center mt-6">
                  <Link 
                    href="/forgot-password" 
                    className={`text-sm text-${currentTheme.accent} hover:text-white transition-colors duration-300 hover:underline`}
                  >
                    Forgot your password?
                  </Link>
                </div>
              )}
            </form>

            {/* Mode Switch */}
            <div className="text-center text-sm text-gray-300 pt-4 border-t border-white/10">
              {mode === 'login' ? (
                <>
                  {generation === 'genalpha' ? "New here? " : "Don't have an account? "}
                  <Link 
                    href="/auth/login?mode=register" 
                    className={`text-${currentTheme.accent} hover:text-white font-medium transition-colors duration-300 hover:underline`}
                  >
                    {generation === 'genalpha' ? 'Join the fam! ✨' : generation === 'genz' ? 'Join us ✨' : 'Create one'}
                  </Link>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <Link 
                    href="/auth/login" 
                    className={`text-${currentTheme.accent} hover:text-white font-medium transition-colors duration-300 hover:underline`}
                  >
                    {generation === 'genalpha' ? 'Jump back in! 🎮' : generation === 'genz' ? 'Welcome back 👋' : 'Sign in'}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}