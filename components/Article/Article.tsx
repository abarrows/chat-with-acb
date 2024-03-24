import React from 'react';

import { database } from '@/utilities/prisma';

export default async function Article({ id: number }) {
  // Retrieve the article from the database using the id
  const article = await database.trainingItem.findUnique({
    where: {
      id: number,
    },
  });

  return (
    <main>
      <article className='prose dark:prose-dark max-w-none'>
        <h1>{article?.title}</h1>
        <section>{article?.body}</section>
        <aside>
          <p>{article?.url}</p>
          <p>{article?.key}</p>
          <p>{article?.updatedAt.toDateString()}</p>
          <p>{article?.createdAt.toDateString()}</p>
          <p>{article?.labels}</p>
          <p>{article?.proficiencies}</p>
          <p>{article?.tools}</p>
          <p>{article?.advancedSkills}</p>
        </aside>
        {article.body}
      </article>
    </main>
  );
}
