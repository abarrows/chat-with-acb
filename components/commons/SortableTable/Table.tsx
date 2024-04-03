'use client';

import { Table } from '@radix-ui/themes';
import Link from 'next/link';
import { TrainingItem } from 'types/training-items';

export default function SortableTable({ items }) {
  if (!items) return null;
  return (
    <Table.Root variant='surface'>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Index</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Key</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Title & Excerpt</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Url</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Labels</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Body</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {items &&
          items.map((item: TrainingItem, index: number) => (
            <Table.Row key={index}>
              <Table.RowHeaderCell>{index}</Table.RowHeaderCell>
              <Table.Cell>{item.id}</Table.Cell>
              <Table.Cell>{item.key}</Table.Cell>
              <Table.Cell>
                <Link href={`training-items/${item.itemId}`}>
                  {item.title}
                  <br />
                  <br />
                  {item.excerpt && (
                    <blockquote cite={item.url}>{item.excerpt}</blockquote>
                  )}
                </Link>
              </Table.Cell>
              <Table.Cell>
                <Link href={item.url} target='_blank' rel='noreferrer'>
                  {item.url}
                </Link>
              </Table.Cell>
              <Table.Cell>
                {item?.labels &&
                  item.labels.map((labelObj, index) => (
                    <li key={index}>
                      {`Label: ${labelObj.name}, Category Name: ${labelObj.categoryName}`}
                    </li>
                  ))}
              </Table.Cell>
              <Table.Cell>
                {/* {item?.body && <article>{item.body}</article>} */}
              </Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table.Root>
  );
}
