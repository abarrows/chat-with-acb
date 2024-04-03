import { Metadata } from 'next';

import serviceRouteHandler from '@/components/serviceRouteHandler';
import saveTrainingData from '@/utilities/saveTrainingData';

interface LangChainItem {
  title: string;
  url: string;
  body: string;
  id: string;
  key: string;
  excerpt: string;
  labels: string[] | '';
}

export const metadata: Metadata = {
  title: 'LangChain Training Data',
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
  // Initial request to LangChain API using credentials to search using jql.
  const getItems = await serviceRouteHandler('api/langchain');
  const dataItems = getItems;
  saveTrainingData('gpt-recommendations', dataItems);
  return (
    <>
      <section className='bg-white dark:bg-gray-900'>
        <div className='container mx-auto'>
          <div className='mx-auto place-self-center'>
            <h1 className='mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white'>
              LangChain Articles List
            </h1>
            <div className='overflow-x-auto'></div>
          </div>
        </div>
      </section>
    </>
  );
}
