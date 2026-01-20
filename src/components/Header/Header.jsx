import { titlePage } from "@/constants/titlePage";
import AvatarUser from "@/lib/AvatarUser/AvatarUser";
import TitlePage from "@/lib/TitlePage/TitlePage";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();
    const currentPage = titlePage.filter((item) => item.link == pathname)
    return (
        <div className="flex justify-between mb-3">
            <TitlePage title={currentPage[0]?.titlePage} />
            <AvatarUser />
        </div>
    );
}
