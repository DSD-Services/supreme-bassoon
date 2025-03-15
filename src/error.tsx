'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const [errorMessage, setErrorMessage] = useState<string>('An unexpected error occurred.');
  const router = useRouter();

  useEffect(() => {
    console.error('Error caught by error.tsx:', error);

    if (error instanceof Error) {
      if (error.message.includes('Network request failed')) {
        setErrorMessage('Network connection error. Please check your internet connection.');
      } else if (error.message.includes('Supabase')) {
        setErrorMessage('Supabase service error. Please try again later.');
      } else if (error.message.includes('404')) {
        setErrorMessage('Page not found.');
      }
    }
  }, [error]);

  const handleReload = () => {
    reset();
  };

  const handleHome = () => {
    router.push('/');
  };

  
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Oops! Something went wrong.</h1>
      <p>{errorMessage}</p>
      <div>
        <button onClick={handleReload} style={{ marginRight: '10px' }}>
          Reload
        </button>
        <button onClick={handleHome}>Return to Homepage</button>
      </div>
    </div>
  );
}