import React from 'react';
import { Skeleton } from '@mantine/core';

export default function LoadingLayout() {
  return (
    <>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: '0 0 250px' }}>
          <Skeleton visible={true} height={600} radius="xl" />
        </div>

        <div style={{ flex: '1' }}>
          <Skeleton visible={true} height={400} radius="xl" mb={4} />
          <Skeleton visible={true} height={200} radius="xl" mb={4} />
        </div>
      </div>

    </>
  );
}
