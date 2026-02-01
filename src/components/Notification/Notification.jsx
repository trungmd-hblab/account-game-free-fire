'use client';

import useClientConfigStore from '@/stores/clientConfig';
import { Modal } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import DOMPurify from 'dompurify';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export default function Notification() {
    const { clientConfig } = useClientConfigStore();
    const [opened, setOpened] = useState(true);

    useEffect(() => {
        const cookieValue = Cookies.get('hidden-notification');
        if (cookieValue === 'true') {
            setOpened(false);
        }
    }, []);
    const sanitizedFooterUrl = clientConfig?.footerUrl?.replace('https://api.supitv.com/uploads/', '');

    const sanitizedGuideContent = sanitizedFooterUrl
        ? DOMPurify.sanitize(sanitizedFooterUrl)
        : '';

    const handleClose = () => {
        Cookies.set('hidden-notification', 'true');
        setOpened(false);
    };

    return (
        <div>
            {
                sanitizedFooterUrl ? (
                    <Modal
                        opened={opened}
                        onClose={handleClose}
                        size={400}
                        centered
                        withCloseButton={false}
                    >
                        <div className='relative'>
                            <div 
                            onClick={handleClose}
                            className='absolute top-[-10px] right-[-10px] p-1 rounded-full bg-white' style={{boxShadow:'1px 1px 4px 0px #616161'}}>
                                <IconX size={22} className="cursor-pointer" />
                            </div>
                            <div dangerouslySetInnerHTML={{ __html: sanitizedGuideContent }} />
                        </div>
                    </Modal>
                ) : <></>
            }
        </div>
    );
}
