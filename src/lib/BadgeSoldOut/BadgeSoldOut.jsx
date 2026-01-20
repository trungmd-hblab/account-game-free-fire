import { Box, Image as ImageMantine } from '@mantine/core';

function BadgeSoldOut() {
  return (
    <Box className='w-28'>
      <ImageMantine src='/images/pngegg.png' alt="badge-sold-out" />
    </Box>

  );
}

export default BadgeSoldOut;
