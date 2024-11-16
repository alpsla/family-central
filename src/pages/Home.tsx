import { useAuthStore } from '../lib/store/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export function Home() {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Family Central</h1>
        <p className="text-xl text-gray-600">Your family's digital hub for staying organized</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Calendar</h2>
          <p className="text-gray-600">Keep track of family events, appointments, and activities</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Tasks</h2>
          <p className="text-gray-600">Manage household chores and responsibilities</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Shopping Lists</h2>
          <p className="text-gray-600">Organize grocery lists and household needs</p>
        </div>
      </div>
    </div>
  );
}