import { Search } from 'jira.js/out/version2/parameters';
import { Metadata } from 'next';

import SortableTable from '@/commons/SortableTable/Table';
import serviceRouteHandler from '@/components/serviceRouteHandler';
import saveTrainingData from '@/utilities/saveTrainingData';
import saveTrainingDataInDatabase from '@/utilities/saveTrainingDataInDatabase';

export const metadata: Metadata = {
  title: 'Jira Issues List',
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

export default async function Page() {
  const dataItems: Promise<Search> = await serviceRouteHandler('api/jira');
  console.log(typeof dataItems);
  // consola.info(`Retrieved ${dataItems?.length}`);

  // Save the Jira Articles to database
  saveTrainingDataInDatabase('jira', dataItems);
  saveTrainingData('jira', dataItems);
  return (
    <>
      <section className='bg-white dark:bg-gray-900'>
        <div className='container mx-auto'>
          <div className='mx-auto place-self-start'>
            <h1 className='mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white'>
              Jira Articles List
            </h1>
            <div className='overflow-x-auto'>
              <SortableTable items={dataItems} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
