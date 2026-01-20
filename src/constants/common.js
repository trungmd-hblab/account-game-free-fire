export const PENDING = "pending";
export const STATUS_PENDING = ["pending"];
export const STATUS_CHECKED = ["success", "failed"];

export const SOLD = "sold";
export const STATUS_SELLING_ACCOUNT = ["available", "unavailable"];
export const STATUS_SOLD_ACCOUNT = ["sold"];
export const TYPE_FREE_FIRE_GAME = "free_fire";
export const TYPE_CATE_FREE_FIRE_ACCOUNT = "free_fire_account";
export const TYPE_CATE_OTHER_GAME_ACCOUNT = "other_game_account";
export const TYPE_CATE_RANDOM_GAME_ACCOUNT = "random_account";
export const TYPE_CATE_DIAMOND_LUCKY_WHEEL = "lucky_wheel";
export const TYPE_CATE_MINI_GAME = "mini_game";
export const DROPDOWN_TYPE_CATEGORY = [
  { value: "free_fire_account", label: "Tài khoản free fire" },
  { value: "random_account", label: "Tài khoản random" },
  // { value: "lucky_wheel", label: "Vòng quay kim cương" },
  // { value: "mini_game", label: "Mini game" },
  { value: "other_game_account", label: "Tài khoản game khác" },
];
export const LOGIN_TYPE_ACCOUNT = [
  {
    label: "Facebook",
    value: "facebook",
  },
  {
    label: "Google",
    value: "google",
  },
  {
    label: "Twitter",
    value: "x",
  },
  {
    label: "Roblox",
    value: "normal"
  }
]
export const RANKS = [
  "un_rank",
  "bronze",
  "silver",
  "gold",
  "platinum",
  "diamond",
  "master",
];
export const RANK_NICK = [
  {
    label: "Không hạng",
    value: "un_rank",
  },
  {
    label: "Đồng",
    value: "bronze",
  },
  {
    label: "Bạc",
    value: "silver",
  },
  {
    label: "Vàng",
    value: "gold",
  },
  {
    label: "Tinh anh",
    value: "platinum",
  },
  {
    label: "Kim cương",
    value: "diamond",
  },
  {
    label: "Cao thủ",
    value: "master",
  },
];
export const NAME_FREE_FIRE = "Tài khoản free fire";
export const NAME_RANDOM = "Tài khoản random";
export const NAME_ORTHER = "Tài khoản game khác";
export const NAME_DIAMOND = "Vòng quay kim cương";
export const NAME_MINI_GAME = "Mini game";

export const PATH_TYPE_CATEGORY = [
  {
    link: "tai_khoan_free_fire",
    value: "free_fire_account",
    title: "🎮 Tài Khoản Free Fire"
  },
  {
    link: "tai_khoan_game",
    value: "other_game_account",
    title: "⭐ Tài khoản Roblox"
  },
  {
    link: "vong_quay_kim_cuong",
    value: "lucky_wheel",
    title: "💎 Vòng Quay Kim Cương"
  },
  {
    link: "mini_game",
    value: "mini_game",
    title: "🍀 Mini game"
  },
  {
    link: "tai_khoan_dong_gia",
    value: "random_account",
    title: "😎 Ưu Đãi Độc Quyền"
  },
];
export const TRANSLATE_TEXT = [
  {
    text: "tim_kiem",
    value: "keyword",
  },
  {
    text: "trang",
    value: "page",
  },
];

export const LIMIT = 20;

export const TYPETRANSLATIONS = {
  "add_money": "Cộng tiền",
  "subtract_money": "Trừ tiền",
  "purchase_diamond": "Mua kim cương",
  "purchase_account": "Mua tài khoản",
  "card_top_up": "Nạp thẻ",
  "atm_top_up": "Nạp ATM",
  "lucky_wheel": "Chơi vòng quay"
};

export const TYPE_SUBTRACT = ["subtract_money", "purchase_diamond", "purchase_account", "lucky_wheel"]

export const STATUS = {
  "pending": "Chờ duyệt",
  "success": "Đã xác nhận",
  "failed": "Đã từ chối"
};

export const GAME_ACCOUNT = "game_account";
export const DIAMOND = "diamond";