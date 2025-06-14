// src/app/register/page.tsx
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AuthForm from '@/components/AuthForm';
import { UserFormData } from '@/types/auth';

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    bio: '',
    generation: 'genz'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Register the user
      const registerResponse = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const registerData = await registerResponse.json();

      if (!registerResponse.ok) {
        setError(registerData.error || 'Registration failed');
        return;
      }

      // Sign in immediately after registration
      const signInResponse = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
        callbackUrl: `/${formData.generation}/home`
      });

      if (signInResponse?.error) {
        setError('Error signing in after registration');
        return;
      }

      // Redirect to generation-specific home page
      router.push(`/${formData.generation}/home`);
      
    } catch (error) {
      console.error('Registration error:', error);
      setError('An error occurred during registration');
    }
  };

  const handleFormDataChange = (data: UserFormData) => {
    setFormData(data);
  };

  return (
    <AuthForm 
      mode="register" 
      onSubmit={handleSubmit}
      onChange={handleFormDataChange}
      initialData={formData}
      error={error}
    />
  );
}