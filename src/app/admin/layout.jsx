'use client'

import Header from "@/components/Header/Header";
import Navigation from "@/components/Navigation/Navigation";
import { QueryProvider } from "@/components/Providers/QueryProvider";
import WindowScroll from "@/lib/WindowScroll/WindowScroll";
import useRoleStore from "@/stores/role";
import classes from '@/styles/layout.module.css';
import { MantineProvider } from "@mantine/core";
import { usePathname, useRouter } from "next/navigation";

export default function AdminLayout({ children }) {
    const pathname = usePathname();
    const navigation = useRouter();
    const {role} = useRoleStore();
    const url_private = [
        "/admin/statistic",
        "/admin/account_game/list",
        "/admin/account_game/sold",
        "/admin/staff_request",
        "/admin/login",
      ];

    if(role == "staff" && !url_private.includes(pathname)){
        navigation.push("/404")
    }

    return (
        <QueryProvider>
            <MantineProvider >
                {pathname == "/admin/login" ? (
                    <>
                        {children}
                    </>
                ) : (
                    <div className={`${classes.wrapper} relative flex h-screen overflow-hidden gap-5`}>
                        {/* <div className={`${classes.banner} absolute top-0 left-0 w-full h-[40vh] bg-[#3182CE] z-0`}></div> */}
                        <div className="h-screen w-fit">
                            <Navigation />
                        </div>
                        <div className={`${classes.layout_admin} h-screen overflow-auto flex-1 m-6`}>
                            <Header />
                            {children}
                            <WindowScroll />
                        </div>
                    </div>
                )
                }
            </MantineProvider>
        </QueryProvider>
    )
}
