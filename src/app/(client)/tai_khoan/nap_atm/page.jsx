"use client";
import { Box, Card, Container, Text } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";

function TransactionATM() {
  return (
    <Container size="full" p={0}>
      <Card
        style={{ boxShadow: "1px 2px 8px 1px #dcdbdb", padding: "40px" }}
        radius={8}
      >
        <Box className="flex gap-2 items-center mb-4">
          <Link href="/cac_danh_muc_thong_tin" className="block lg:hidden">
            <IconArrowLeft size={22} className="cursor-pointer" />
          </Link>
          <Text size="xl" fw={600}>
            Nạp ATM
          </Text>
        </Box>
        <Text className="text-gray-500">Chức năng tạm thời không khả dụng.</Text>
      </Card>
    </Container>
  );
}

export default TransactionATM;
