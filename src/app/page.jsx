'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
<meta name="google-site-verification" content="PppcBBop543j4AQtw5nUZuvc9nEJI2Frffiq-lAGWi0" />

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const { signIn, loading, error } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormErrors({});

    let errors = {};
    if (!email) errors.email = 'Email is required';
    if (!password) errors.password = 'Password is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const result = await signIn(email, password);
    if (result.success) {
      router.push('/dashboard');
    } else if (result.error?.errors) {
      setFormErrors(result.error.errors);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="flex w-full md:max-w-3xl md:h-[550px] bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="w-20 bg-[#292929] items-center justify-center gap-9 flex flex-col">
          <div className="w-full justify-around items-center flex flex-col space-y-2">
            {['C', 'A', 'R', 'D'].map((l, i) => (
              <div key={i} className="font-bold text-5xl text-white">{l}</div>
            ))}
          </div>
          <div className="w-full justify-around items-center flex flex-col space-y-2">
            {['R', 'F', 'I', 'D'].map((l, i) => (
              <div key={i} className="font-bold text-5xl text-white">{l}</div>
            ))}
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <h1 className="text-5xl font-semibold text-gray-800 mb-8">Sign In</h1>

            {error && <div className="mb-4 text-red-600 font-medium">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="email" className="block text-md font-semibold text-gray-800 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent text-black"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block text-md font-semibold text-gray-800 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-black px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-300 hover:bg-yellow-400 text-gray-800 font-semibold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-200"
              >
                {loading ? 'Logging in...' : 'Log In'}
              </button>
            </form>
          </div>
        </div>

        <div className="w-20 bg-[#292929] items-center justify-around gap-2 flex flex-col">
          <div className="w-full justify-around items-center flex flex-col space-y-4">
            {['W', 'E', 'L', 'C', 'O', 'M', 'E'].map((l, i) => (
              <div key={i} className="font-bold text-5xl text-white">{l}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
