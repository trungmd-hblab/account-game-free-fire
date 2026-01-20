"use client"
import useClientConfigStore from "@/stores/clientConfig";
import { Box, Image as ImageMantine } from "@mantine/core";

function SectionBanner() {
  const bannerUrl = useClientConfigStore((state) => state.clientConfig.bannerUrl);

  return (
    <Box className="rounded-xl overflow-hidden">
      {bannerUrl &&
        <ImageMantine
          src={bannerUrl}
          alt="banner-sell-feature-product"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center'
          }}
        />
      }
    </Box>
  );
}

export default SectionBanner;
