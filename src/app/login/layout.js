'use client'
import { Container, MantineProvider } from "@mantine/core";
import { MantineEmotionProvider } from "@mantine/emotion";
import { QueryClient, QueryClientProvider } from "react-query";

export default function Layout({ children }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <MantineEmotionProvider>
            {children}
        </MantineEmotionProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
}
