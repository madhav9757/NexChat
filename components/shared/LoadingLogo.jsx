import React from 'react';
import Image from 'next/image';

const LoadingLogo = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-black">
      <Image
        src="/logo.svg"
        alt="Loading..."
        width={100}
        height={100}
        className="animate-bounce"
        priority
      />
    </div>
  );
};

export default LoadingLogo;
