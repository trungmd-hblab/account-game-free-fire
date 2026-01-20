import { Alert, Image, Modal, Text } from "@mantine/core";
import Link from "next/link";

function ModalCheckLogin(props) {
    const { opened, setOpend } = props
    return (
        <Modal
            opened={opened}
            onClose={() => setOpend(false)}
            title="Thông báo"
            size={400}
            centered
        >
            <Alert color="blue" className="flex flex-col items-center justify-center">
                <Image src='/images/modallogin.png' alt='thong_bao_dang_nhap' styles={{width:'160px'}} />
                <Text>
                    Bạn chưa đăng nhập tài khoản. Hãy đăng nhập để thực hiện tiếp hành động.
                </Text>
                <Text>
                    Đăng nhập tại <strong className="underline cursor-pointer" ><Link href={'/login'}>đây.</Link></strong>
                </Text>
            </Alert>
        </Modal>
    );
}

export default ModalCheckLogin;