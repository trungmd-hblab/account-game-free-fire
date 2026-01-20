'use client'
import NavbarInProfile from "@/components/NavbarInProfile/NavbarInProfile";
import { checkLogin } from "@/utils/checkLogined";
import { Box } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function LayoutProfile({ children }) {
    const router = useRouter()
    useEffect(() => {
        if (!checkLogin()) {
            router.push('/login')
        }
    }, [router])

    return (
        <Box className="lg:flex gap-4 px-0 sm:px-3 md:px-6 mb-16">
            <Box className="hidden lg:block w-[20%] min-w-[250px]">
                <NavbarInProfile />
            </Box>
            <Box className="w-full lg:w-[80%] ">{children}</Box>
        </Box>
    );
}

export default LayoutProfile;