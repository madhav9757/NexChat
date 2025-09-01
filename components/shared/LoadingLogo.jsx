import React from 'react';
import Image from 'next/image';

const LoadingLogo = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-zinc-950 transition-colors duration-500">
      <div className="relative h-24 w-24">
        <Image
          src="/logo.svg"
          alt="Loading..."
          fill
          className="animate-float-and-fade"
          priority
        />
      </div>
    </div>
  );
};

export default LoadingLogo;