import React from 'react';

import { Metadata } from 'next';
import Link from 'next/link';

import { database } from '@/utilities/prisma';

export const metadata: Metadata = {
  title: `Training Item - Label`,
  twitter: {
    card: 'summary_large_image',
  },
  openGraph: {
    url: 'https://next-enterprise.vercel.app/',
    images: [
      {
        width: 1200,
        height: 630,
        url: 'https://raw.githubusercontent.com/Blazity/next-enterprise/main/project-logo.png',
      },
    ],
  },
};

export default async function Page({ params: { category, ...params } }) {
  // Retrieve all training items in the database that contain the label name in
  // the request
  const dataItems = await database.trainingItem.findMany({
    where: {
      labels: {
        some: {
          categoryName: params.category,
        },
      },
    },
    include: {
      labels: true,
    },
  });

  return (
    <>
      <section className='bg-white dark:bg-gray-900'>
        <div className='mx-auto grid max-w-screen-xl px-4 py-8 text-center lg:py-16'>
          <div className='mx-auto place-self-center'>
            <h1 className='mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white'>
              Training Items with Label {category}
            </h1>
          </div>
        </div>
      </section>
      {/* Display a list of all the training items with a given label */}
      <dl>
        {dataItems.map((item) => (
          <React.Fragment key={item.itemId}>
            <dt>
              <Link href={`/category/${category}/${item.itemId}`}>
                {item.title}
              </Link>
            </dt>
            <dd>
              <Link href={`/category/${category}/${item.itemId}`}>
                {item.itemId}
              </Link>
            </dd>
          </React.Fragment>
        ))}
      </dl>
    </>
  );
}
