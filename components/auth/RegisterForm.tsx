"use client"
// src/components/features/auth/RegisterForm.tsx
import { useState } from 'react';
import { useRouter } from 'next/navigation';
//import useAuth  from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, name }),
      });
      const data = await res.json();
      if (res.ok) {
        const userRes = await fetch('/api/auth/user');
        const { user } = await userRes.json();
        setUser(user);
        router.push('/dashboard');
      } else {
        setError(data.error || 'An error occurred');
      }
    } catch (e) {
      setError('An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      {error && <p className="text-red-500">{error}</p>}
      <Button type="submit" className="w-full">Register</Button>
    </form>
  );
}