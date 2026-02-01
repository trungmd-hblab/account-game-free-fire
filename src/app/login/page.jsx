'use client';
import LoginForm from '@/components/LoginForm/LoginForm';
import { Box, Container, Image as ImageMantine } from '@mantine/core';
import classes from '@/styles/login.module.css'
import { useState } from 'react';
import Link from 'next/link';

export default function LoginClient() {
    const [showFormRegister, setShowFormRegister] = useState(false)

    return (
        <Container fluid p={0} className={classes.container}>
            <Box className='relative flex-1 h-full md:block hidden' >
                <ImageMantine src='/images/wallpaperlogin.png' alt="img-login" className='h-full object-right' />
            </Box>
            <Box className='flex-1 flex items-center justify-center'>
                <LoginForm type="login_client" pathNext="/" showFormRegister={showFormRegister} setShowFormRegister={setShowFormRegister} />
            </Box>
        </Container>
    );
};