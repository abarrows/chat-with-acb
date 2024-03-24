import { Metadata } from 'next';

import Table from '@/components/Table/Table';
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

export default async function Page({ params: { label, ...params } }) {
  // Retrieve all training items in the database that contain the label name in
  // the request
  const dataItems = await database.trainingItem.findMany({
    where: {
      labels: {
        some: {
          name: label,
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
              Training Items with Label {label}
            </h1>
          </div>
        </div>
      </section>
      {/* Display a list of all the training items with a given label */}
      <Table items={dataItems} />
    </>
  );
}
