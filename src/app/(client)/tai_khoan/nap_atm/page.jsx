"use client";
import { useFetchClientConfig } from "@/api/config";
import useStore from "@/stores/clientStore";
import {
  ActionIcon,
  Box,
  Card,
  Container,
  CopyButton,
  Image,
  Text,
  Tooltip,
} from "@mantine/core";
import { IconArrowLeft, IconCheck, IconCopy } from "@tabler/icons-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useMemo } from "react";
import { VietQR } from "vietqr";

const BANK_CODE = "970422"; // Napas bin code của MB Bank
const BANK_NAME = "MB";
const ACCOUNT_NUMBER = "9650218852627";
const ACCOUNT_HOLDER = "Mai Duc Trung";

function InfoRow({ label, value, copyable }) {
  return (
    <Box className="flex items-center gap-2">
      <Text fw={600} className="min-w-[170px]">
        {label}
      </Text>
      <Text>{value}</Text>
      {copyable && value && (
        <CopyButton value={value}>
          {({ copied, copy }) => (
            <Tooltip label={copied ? "Đã copy" : "Copy"}>
              <ActionIcon color={copied ? "teal" : "gray"} onClick={copy}>
                {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
              </ActionIcon>
            </Tooltip>
          )}
        </CopyButton>
      )}
    </Box>
  );
}

function TransactionATM() {
  const { data: config, isLoading } = useFetchClientConfig();
  const code = useStore((state) => state.code);

  const qrCodeUrl = useMemo(() => {
    if (!code) return "";
    const vietQR = new VietQR({
      clientID: process.env.VIETQR_CLIENT_ID,
      apiKey: process.env.VIETQR_API_KEY,
    });
    return vietQR.genQuickLink({
      bank: BANK_CODE,
      accountName: ACCOUNT_HOLDER,
      accountNumber: ACCOUNT_NUMBER,
      amount: null,
      memo: code,
      template: "print",
      media: ".jpg",
    });
  }, [code]);

  if (isLoading) return null;

  if (!config?.result?.isShowAtm) {
    notFound();
  }

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

        <Box className="flex flex-col md:flex-row gap-8">
          <Box className="flex justify-center md:justify-start">
            {qrCodeUrl ? (
              <Image
                src={qrCodeUrl}
                alt="QR chuyển khoản"
                w={260}
                radius={8}
              />
            ) : (
              <Text className="text-gray-500">Đang tải mã QR...</Text>
            )}
          </Box>

          <Box className="flex flex-col gap-3">
            <InfoRow label="Ngân hàng" value={BANK_NAME} />
            <InfoRow
              label="Số tài khoản"
              value={ACCOUNT_NUMBER}
              copyable
            />
            <InfoRow label="Chủ tài khoản" value={ACCOUNT_HOLDER} />
            <InfoRow label="Nội dung chuyển khoản" value={code} copyable />
            <Text size="sm" c="red" className="mt-2">
              * Vui lòng chuyển khoản đúng nội dung ở trên, hệ thống sẽ tự
              động cộng tiền vào số dư ATM sau vài phút.
            </Text>
          </Box>
        </Box>
      </Card>
    </Container>
  );
}

export default TransactionATM;
