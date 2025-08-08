import type { AppProps } from 'next/app';
import '../styles/globals.css';

/**
 * Custom App component for Next.js.  It loads global CSS and wraps every page.
 */
export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}