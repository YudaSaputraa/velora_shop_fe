import {
  LayoutDashboard,
  Users,
  LayoutList,
  ShoppingBag,
  ListOrdered,
  Files,
} from "lucide-react";

export const Menus = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    link: "/admin-dashboard",
  },
  {
    label: "Users",
    icon: Users,
    link: "/admin-user",
  },
  {
    label: "Category",
    icon: LayoutList,
    link: "/admin-kategori",
  },
  {
    label: "Product",
    icon: ShoppingBag,
    link: "/admin-produk",
  },
  {
    label: "Orders",
    icon: ListOrdered,
    link: "/admin-pesanan",
  },
  {
    label: "Report",
    icon: Files,
    link: "/admin-laporan",
  },
];
