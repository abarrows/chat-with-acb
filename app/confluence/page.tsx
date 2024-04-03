import { SearchPageResponseSearchResult } from 'confluence.js/out/api/models';
import consola from 'consola';
import { Metadata } from 'next';

import SortableTable from '@/commons/SortableTable/Table';
import serviceRouteHandler from '@/components/serviceRouteHandler';

export const metadata: Metadata = {
  title: 'Confluence Article List',
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

// async function populateArticleBodyAndLabels(
//   item: TrainingItem,
//   itemContent: Content,
// ) {
//   item.body = itemContent.content.body.view.value;
//   item.labels = itemContent.metadata.labels.results;
// }

export default async function Page() {
  // Initial request to confluence API using credentials to search using jql.
  const dataItems: SearchPageResponseSearchResult | null =
    await serviceRouteHandler('api/confluence');
  consola.info(`Retrieved ${dataItems.length}`);
  // saveTrainingDataInDatabase('confluence', dataItems);
  // saveTrainingData('confluence', dataItems);
  return (
    <>
      <section className='bg-white dark:bg-gray-900'>
        <div className='container mx-auto'>
          <div className='mx-auto place-self-center'>
            <h1 className='mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white'>
              Confluence Articles List
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
