import 'styles/tailwind.css';

import React, { Suspense } from 'react';

import Footer from '@/components/Layout/Footer';
import Navigation from '@/components/Layout/Navigation';

export const metadata = {
  title: 'Precedent - Building blocks for your Next.js project',
  description:
    'Precedent is the all-in-one solution for your Next.js project. It includes a design system, authentication, analytics, and more.',
  metadataBase: new URL('https://precedent.dev'),
};
// export const metadata = {
//   metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL),
//   alternates: {
//     canonical: '/',
//     languages: {
//       'en-US': '/en-US',
//     },
//   },
//   openGraph: {
//     url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
//     siteName: 'GoComics',
//     images: [
//       {
//         url: `${process.env.NEXT_PUBLIC_BASE_URL}/images/logos/logo-horizontal.svg`, // Must be an absolute URL
//         width: 224,
//         height: 54,
//         alt: 'GoComics',
//       },
//     ],
//     locale: 'en_US',
//     type: 'website',
//   },
//   icons: {
//     icon: '/images/logos/logo-vertical.svg',
//     shortcut: '/images/logos/logo-vertical.svg',
//     apple: '/images/logos/logo-vertical.svg',
//     // other: {
//     //   rel: 'apple-touch-icon-precomposed',
//     //   url: '/apple-touch-icon-precomposed.png',
//     // },
//   },
// };

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <div className='bg-gradient-to-br from-indigo-50 via-white to-cyan-100' />
        <Suspense fallback='...'>
          <Navigation />
        </Suspense>
        <main className='flex min-h-screen w-full flex-col items-center justify-center py-32'>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
