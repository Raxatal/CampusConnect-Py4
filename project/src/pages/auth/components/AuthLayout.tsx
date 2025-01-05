import React from 'react';
import VideoBackground from './VideoBackground';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <>
      <VideoBackground />
      <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white/90 backdrop-blur-sm py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {children}
          </div>
        </div>

        <footer className="mt-8 text-center text-sm text-white">
          © {new Date().getFullYear()} Campus Connect. All rights reserved.
        </footer>
      </div>
    </>
  );
};

export default AuthLayout;