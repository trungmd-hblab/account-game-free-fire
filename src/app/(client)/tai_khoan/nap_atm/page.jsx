"use client";
import useStore from "@/stores/clientStore";
import {
  ActionIcon,
  Box,
  Card,
  Container,
  CopyButton,
  Image as ImageMantine,
  Text
} from "@mantine/core";
import { IconArrowLeft, IconCheck, IconCopy } from "@tabler/icons-react";
import Link from "next/link";
import { VietQR } from "vietqr";

function TransactionATM() {
  const { code } = useStore((state) => ({
    code: state.code,
  }));

  const accountNumber = "17249761";
  const accountHolder = "Tran Hoang Linh";
  const bank = "ACB";
  const transferContent = code;
  let vietQR = new VietQR({
    clientID: process.env.VIETQR_CLIENT_ID,
    apiKey: process.env.VIETQR_API_KEY,
  });

  let imgQRCode = vietQR.genQuickLink({

    bank: '970416',
    accountName: accountHolder,
    accountNumber: accountNumber,
    amount: null,
    memo: transferContent,
    template: 'print',
    media: '.jpg'
  });


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
        <Box className="flex lg:flex-row flex-col-reverse justify-between gap-10">
          <Box className="flex flex-col gap-3">
            <Box>
              <Box className="flex gap-2 items-center">
                <Text className="mb-1 text-sm">Ngân hàng:</Text>
                <Text fw={500} className="text-[#28a745]">{bank}</Text>
              </Box>
            </Box>
            <Box className="flex gap-2 items-center">
              <Text className="mb-1 text-sm">Số tài khoản:</Text>
              <Box className="flex items-center gap-1">
                <Text fw={500} className="text-[#28a745]">{accountNumber}</Text>
                <CopyButton value={accountNumber}>
                  {({ copied, copy }) => (
                    <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
                      {copied ? (
                        <IconCheck size={18} />
                      ) : (
                        <IconCopy size={18} />
                      )}
                    </ActionIcon>
                  )}
                </CopyButton>
              </Box>
            </Box>
            <Box className="flex gap-2 items-center">
              <Text className="mb-1 text-sm">Chủ tài khoản:</Text>
              <Box className="flex items-center">
                <Text fw={500} className="text-[#28a745]">{accountHolder}</Text>
              </Box>
            </Box>
            <Box className="flex gap-2 items-center">
              <Text className="mb-1 text-sm">Nội dung chuyển khoản:</Text>
              <Box className="flex items-center gap-1">
                <Text fw={500} className="text-[#28a745]">{transferContent}</Text>
                <CopyButton value={transferContent}>
                  {({ copied, copy }) => (
                    <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
                      {copied ? (
                        <IconCheck size={18} />
                      ) : (
                        <IconCopy size={18} />
                      )}
                    </ActionIcon>
                  )}
                </CopyButton>
              </Box>
            </Box>
          </Box>
          <Box className="flex justify-center">
            <ImageMantine src={imgQRCode} alt="qr-code" className='w-80 lg:w-96 h-auto border rounded-lg p-2' />
          </Box>
        </Box>
      </Card>
    </Container>
  );
}

export default TransactionATM;
