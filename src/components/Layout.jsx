'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import {
  Home,
  Users,
  BarChart2,
  User,
  Lock,
  LogOut,
  AlertCircle,
  Info,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function Layout({ children }) {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Akses Log', href: '/log_access', icon: Lock },
    { name: 'Peringatan', href: '/alert', icon: AlertCircle },
    { name: 'Statistik', href: '/statistic', icon: BarChart2 },
    { name: 'Pengguna', href: '/users', icon: Users },
  ];

  const isActive = (path) => {
    return router.pathname === path;
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  if (loading) return (
    <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-70 flex items-center justify-center z-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <ProtectedRoute adminOnly>
      <div className="flex h-screen bg-gray-50">
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-5">
              <div className="text-2xl font-light text-gray-800">C A R D</div>
              <div className="text-2xl font-light text-gray-800">R F I D</div>
            </div>
          </div>

          <nav className="flex-1 px-2 py-6 space-y-1">
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${active
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center px-4 py-3 rounded-md transition-colors duration-200`}
                >
                  <item.icon
                    className={`${active
                      ? 'text-gray-900'
                      : 'text-gray-500 group-hover:text-gray-700'
                    } h-5 w-5`}
                  />
                  <span className="ml-3 font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="text-gray-500" size={20} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <button
                className="text-gray-500 hover:text-gray-700 focus:outline-none transition-colors duration-200"
                onClick={handleSignOut}
                aria-label="Sign out"
                title="Sign out"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto bg-gray-50">
          <main className="">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
