import Link from 'next/link';
import { TrainingItem } from 'types/training-items';

export default async function Table({ items, ...props }) {
  if (!items) return null;
  return (
    <table className='w-full whitespace-nowrap'>
      <thead>
        <tr className='h-16 w-full text-sm leading-none text-gray-600'>
          <th className='font-normal text-left pl-1'>Index</th>
          <th className='font-normal text-left pl-1'>ID</th>
          <th className='font-normal text-left pl-1'>Key</th>
          <th className='font-normal text-left pl-4'>Title and Excerpt</th>
          <th className='font-normal text-left pl-1'>Url</th>
          <th className='font-normal text-left pl-1'>Labels</th>
          <th className='font-normal text-left pl-12'>Body</th>
        </tr>
      </thead>
      <tbody className='w-full'>
        {items &&
          items.map((item: TrainingItem, index: number) => (
            <tr
              className='h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-y border-gray-100'
              key={`${index}-${item.id}-${item.key}`}
            >
              <Link href={'/training-items/' + item.id} key={item.id}>
                <td className='pl-4 cursor-pointer'>{index}</td>
                <td className='pl-1'>{item.id}</td>
                <td className='pl-1'>{item.key}</td>
                <td className='pl-1'>
                  {item.title}
                  <br />
                  <br />
                  {item.excerpt && (
                    <blockquote cite={item.url}>{item.excerpt}</blockquote>
                  )}
                </td>
                <td className='pl-1'>
                  <Link href={item.url} target='_blank' rel='noreferrer'>
                    {item.url}
                  </Link>
                </td>
                <td className='font-normal text-left pl-1'>
                  <ul className='list-disc'>
                    {item?.labels &&
                      item.labels.map((labelObj, index) => (
                        <li key={index}>
                          {`Label: ${labelObj.name}, Category Name: ${labelObj.categoryName}`}
                        </li>
                      ))}
                  </ul>
                </td>
                <td className='pl-1'>
                  {item.body && <article>{item.body}</article>}
                </td>
              </Link>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
