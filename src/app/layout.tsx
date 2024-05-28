import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GDSC-WOW-API',
  description: 'GDSC-WOW Backend API deployed on Vercel using Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className} bg-neutral-900 text-white`}>
        <div className='m-8'>
          <a className='text-center' href='/'>HOME</a>
        </div>
        {children}
      </body>
    </html>
  );
}
