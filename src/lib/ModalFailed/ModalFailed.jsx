import { Alert, Box, Image, Modal, Text } from "@mantine/core";

function ModalFailed(props) {
    const { opened, setOpened, message } = props;
    return (
        <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            title="Thông báo"
            size={400}
            centered
        >
            <Alert color="red" className="flex flex-col items-center justify-center">
                <Box className="flex flex-col items-center justify-center">
                    <Image src='/images/failed.jpg' alt='thong_bao_that_bai' className="w-40" />
                    <Text mt={10}>
                        {message}
                    </Text>
                </Box>
            </Alert>
        </Modal>
    );
}

export default ModalFailed;
