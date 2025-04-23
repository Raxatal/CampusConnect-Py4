import React from 'react';
import { MapPin } from 'lucide-react';


interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-auth-bg-img bg-cover flex flex-col justify-center py-auto sm:px-6 lg:px-8">
      <div className="mt-auto sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {children}
        </div>
      </div>

      <footer className="mt-8 text-center text-sm text-white bg-black/40 font-medium rounded-md">
        © {new Date().getFullYear()} Campus Connect. All rights reserved.
      </footer>
    </div>
  );
};

export default AuthLayout;