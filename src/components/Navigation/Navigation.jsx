import { router } from "@/constants/router-site-admin";
import NavbarLinksGroup from "@/lib/NavbarLinksGroup/NavbarLinksGroup";
import useLayoutStore from "@/stores/layoutStore";
import useRoleStore from "@/stores/role";
import { Card } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import classes from './Navigation.module.css';

export default function Navigation() {
    const { isSidebarOpened, toggleSidebar } = useLayoutStore();
    const {role} = useRoleStore();
    const renderNavItems = router.map((item) => {
        if(item.role.includes(role)){
           return <NavbarLinksGroup {...item} key={item.label} />
        }
    })
    return (
        <Card className={classes.nav} miw={isSidebarOpened ? "260px" : "60px"}>
            {isSidebarOpened ? (
                    <IconChevronLeft size="20" className={classes.icon} onClick={toggleSidebar} />
            ) : (
                <IconChevronRight size="20" className={classes.icon} onClick={toggleSidebar} />
            )}
            {renderNavItems}
        </Card>
    )
}