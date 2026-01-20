import { Alert, Box, Image, Modal, Text } from "@mantine/core";

function ModalSuccess(props) {
    const { opened, setOpened, message } = props;
    return (
        <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            title="Thông báo"
            size={400}
            centered
        >
            <Alert color="blue" >
                <Box className="flex flex-col items-center justify-center">
                    <Image src='/images/success.png' alt='thong_bao_thanh_cong'  className="w-40" />
                    <Text mt={10}>
                        {message}
                    </Text>
                </Box>
            </Alert>
        </Modal>
    );
}

export default ModalSuccess;
