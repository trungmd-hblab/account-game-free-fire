import {
  IconBrandDiscordFilled,
  IconCashBanknoteFilled,
  IconCategoryFilled,
  IconChartLine,
  IconChartPieFilled,
  IconCoinFilled,
  IconDeviceMobileFilled,
  IconDiamondFilled,
  IconLayoutDashboardFilled,
  IconPlayCard,
  IconRosetteDiscountFilled,
  IconSettingsFilled,
  IconStarsFilled,
  IconUserFilled,
  IconWheel,
} from "@tabler/icons-react";

export const router = [
  {
    label: "Trang chủ",
    link: "/admin/dashboard",
    icon: IconLayoutDashboardFilled,
    role: ["admin"],
  },
  {
    label: "Thống kê doanh thu",
    link: "/admin/statistic",
    icon: IconChartPieFilled,
    role: ["staff"],
  },
  {
    label: "Yêu cầu nhận tiền",
    link: "/admin/staff_request",
    icon: IconChartLine,
    role: ["staff"],
  },
  {
    label: "Khách hàng",
    link: "/admin/customers",
    icon: IconUserFilled,
    role: ["admin"],
  },
  {
    label: "Quản lí cộng tác viên",
    link: "/admin/manage_staffs",
    icon: IconStarsFilled,
    role: ["admin"],
    links: [
      {
        label: "Doanh thu cộng tác",
        link: "/admin/manage_staffs/list",
        role: ["admin"],
      },
      {
        label: "Đơn chờ duyệt",
        link: "/admin/manage_staffs/request/pending",
        role: ["admin"],
      },
      {
        label: "Đơn đã duyệt",
        link: "/admin/manage_staffs/request/checked",
        role: ["admin"],
      },
    ],
  },
  {
    label: "Rút kim cương",
    link: "/admin/diamond",
    icon: IconDiamondFilled,
    role: ["admin"],
    links: [
      {
        label: "Đơn chờ duyệt",
        link: "/admin/diamond/pending",
        role: ["admin"],
      },
      {
        label: "Đơn đã duyệt",
        link: "/admin/diamond/checked",
        role: ["admin"],
      },
    ],
  },
  {
    label: "Giao dịch thẻ cào",
    icon: IconDeviceMobileFilled,
    link: "/admin/card",
    role: ["admin"],
    links: [
      {
        label: "Đơn chờ duyệt",
        link: "/admin/card/pending",
        role: ["admin"],
      },
      {
        label: "Đơn đã duyệt",
        link: "/admin/card/checked",
        role: ["admin"],
      },
    ],
  },
  {
    label: "Nạp ATM",
    link: "/admin/atm",
    icon: IconCashBanknoteFilled,
    role: ["admin"],
  },
  {
    label: "Cộng/Trừ tiền",
    link: "/admin/transaction",
    icon: IconCoinFilled,
    role: ["admin"],
  },
  {
    label: "Quản lí danh mục",
    link: "/admin/categories",
    icon: IconCategoryFilled,
    role: ["admin"],
  },
  {
    label: "Vòng quay may mắn",
    link: "/admin/lucky_wheel",
    icon: IconWheel,
    role: ["admin"],
    links: [
      {
        label: "Vòng quay đang hoạt động",
        link: "/admin/lucky_wheel/active",
        role: ["admin"],
      },
      {
        label: "Vòng quay không hoạt động",
        link: "/admin/lucky_wheel/inactive",
        role: ["admin"],
      },
      {
        label: "Lịch sử chơi vòng quay",
        link: "/admin/lucky_wheel/histories",
        role: ["admin"],
      },
    ],
  },
  {
    label: "Game lật thẻ",
    link: "/admin/flip_card",
    icon: IconPlayCard,
    role: ["admin"],
    links: [
      {
        label: "Game lật thẻ đang hoạt động",
        link: "/admin/flip_card/active",
        role: ["admin"],
      },
      {
        label: "Game lật thẻ không hoạt động",
        link: "/admin/flip_card/inactive",
        role: ["admin"],
      },
      {
        label: "Lịch sử chơi lật thẻ",
        link: "/admin/flip_card/histories",
        role: ["admin"],
      },
    ],
  },
  {
    label: "Quản lí tài khoản game",
    link: "/admin/account_game",
    icon: IconBrandDiscordFilled,
    role: ["admin", "staff"],
    links: [
      {
        label: "Danh sách tài khoản game",
        link: "/admin/account_game/list",
        role: ["admin", "staff"],
      },
      {
        label: "Lịch sử bán tài khoản",
        link: "/admin/account_game/sold",
        role: ["admin", "staff"],
      },
    ],
  },
  {
    label: "Cài đặt flash sale",
    link: "/admin/flash_sale",
    icon: IconRosetteDiscountFilled,
    role: ["admin"],
  },
  {
    label: "Cấu hình chung",
    link: "/admin/configs",
    icon: IconSettingsFilled,
    role: ["admin"],
  },
];
