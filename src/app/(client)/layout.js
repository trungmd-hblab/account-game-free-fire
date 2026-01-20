import HeaderClient from "@/components/HeaderClient/HeaderClient";
import { QueryProvider } from "@/components/Providers/QueryProvider";
import SectionFooter from "@/components/SectionFooter/SectionFooter";
import { Container, MantineProvider } from "@mantine/core";
import { MantineEmotionProvider } from "@mantine/emotion";

export default function Layout({ children }) {
  return (
    <MantineProvider>
      <MantineEmotionProvider>
        <QueryProvider>
          <HeaderClient />
          <Container
            size="full"
            className="mt-[60px] md:mt-0 mx-auto p-2 sm:p-3 md:p-6"
            style={{ maxWidth: "1536px" }}
          >
            {children}
          </Container>
          <SectionFooter />
        </QueryProvider>
      </MantineEmotionProvider>
    </MantineProvider>
  );
}
