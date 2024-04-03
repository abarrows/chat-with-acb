import { trainingItem } from '@prisma/client';
import { Metadata } from 'next';

import Article from '@/components/Article/Article';
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

export const revalidate = 1;

export default async function Page({
  params,
}: {
  params: { itemId: trainingItem['itemId'] };
}) {
  // Retrieve all training items in the database that contain the label name in
  // the request
  const dataItem = await database.trainingItem.findUniqueOrThrow({
    where: {
      itemId: params.itemId,
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
              Training Item: {dataItem.title}
            </h1>
          </div>
        </div>
      </section>
      {/* Display a list of all the training items with a given label */}
      <Article itemId={dataItem.itemId} />
    </>
  );
}
