import React from 'react';

import { trainingItem } from '@prisma/client';

import { database } from '@/utilities/prisma';

export default async function Article({ itemId }) {
  // Retrieve the article from the database using the id
  const article: trainingItem | null = await database.trainingItem.findUnique({
    where: {
      itemId: itemId,
    },
    include: {
      labels: true,
    },
  });

  return (
    <main>
      <article className='prose dark:prose-dark grid grid-cols-12'>
        <header className='bg-white/95 z-40 supports-backdrop-blur:bg-white/60 backdrop-blur py-4 relative shadow-md shadow-slate-700/5 dark:bg-transparent'>
          <h1>{article?.title}</h1>
        </header>
        <section className='grid col-span-8'>{article?.body}</section>
        <aside className='grid col-span-3'>
          <dl>
            <dt>URL: </dt>
            <dd>{article?.url}</dd>
            <dt>Key: </dt>
            <dd>{article?.key}</dd>
            <dt>Updated At: </dt>
            <dd>{article?.updatedAt.toDateString()}</dd>
            <dt>Created At: </dt>
            <dd>{article?.createdAt.toDateString()}</dd>
          </dl>
          <h2>Labels: </h2>
          <ul className='list-disc'>
            {article?.labels &&
              article.labels.map((labelObj, index) => (
                <li key={index}>
                  {`Label: ${labelObj.name}, Category Name: ${labelObj.categoryName}`}
                </li>
              ))}
          </ul>
        </aside>
      </article>
    </main>
  );
}
