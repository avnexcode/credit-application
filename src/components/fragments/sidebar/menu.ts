import { t as translator, type TFunction } from "i18next";
import type { icons } from "lucide-react";

export type SidebarSubMenuItemType = {
  title: string;
  url: string;
  icon: keyof typeof icons;
  active: string[];
};

export type SidebarMenuItemType = {
  type: "Single" | "Collapsible";
  title: string;
  url?: string;
  icon: keyof typeof icons;
  active: string[];
  subMenu?: SidebarSubMenuItemType[];
};

export type SidebarMenuType = {
  label: string;
  menu: SidebarMenuItemType[];
};

export const createSidebarMenu = (
  t: TFunction = translator,
): SidebarMenuType[] => {
  const sidebarGroups = "components.sidebar.groups";
  const sidebarItems = "components.sidebar.items";
  return [
    {
      label: t(`${sidebarGroups}.application`),
      menu: [
        {
          type: "Single",
          title: t(`${sidebarItems}.dashboard`),
          url: "/dashboard",
          icon: "LayoutDashboard",
          active: [""],
        },
        {
          type: "Single",
          title: t(`${sidebarItems}.customer`),
          url: "/dashboard/customer",
          icon: "Users",
          active: [
            "/dashboard/customer/create",
            "/dashboard/customer/:id/view",
            "/dashboard/customer/:id/edit",
          ],
        },
        {
          type: "Single",
          title: t(`${sidebarItems}.guarantor`),
          url: "/dashboard/guarantor",
          icon: "UserCheck",
          active: [
            "/dashboard/guarantor/create",
            "/dashboard/guarantor/:id/view",
            "/dashboard/guarantor/:id/edit",
          ],
        },
        {
          type: "Single",
          title: t(`${sidebarItems}.creditApplication`),
          url: "/dashboard/credit-application",
          icon: "FileText",
          active: [
            "/dashboard/credit-application/create",
            "/dashboard/credit-application/:id/view",
            "/dashboard/credit-application/:id/edit",
          ],
        },
        {
          type: "Single",
          title: t(`${sidebarItems}.creditAssessment`),
          url: "/dashboard/credit-assessment",
          icon: "ClipboardCheck",
          active: [
            "/dashboard/credit-assessment/:id/view",
            "/dashboard/credit-assessment/:id/assess",
          ],
        },
        {
          type: "Collapsible",
          title: t(`${sidebarItems}.loanReference`),
          icon: "Landmark",
          active: [
            "/dashboard/loan-reference",
            "/dashboard/loan-balance",
            "/dashboard/payment-record",
          ],
          subMenu: [
            {
              title: t(`${sidebarItems}.loanReference`),
              url: "/dashboard/loan-reference",
              icon: "FileCheck",
              active: [
                "/dashboard/loan-reference/:id/view",
                "/dashboard/loan-reference/:id/edit",
              ],
            },
            {
              title: t(`${sidebarItems}.loanBalance`),
              url: "/dashboard/loan-balance",
              icon: "Scale",
              active: ["/dashboard/loan-balance/:id/view"],
            },
            {
              title: t(`${sidebarItems}.paymentRecord`),
              url: "/dashboard/payment-record",
              icon: "Receipt",
              active: [
                "/dashboard/payment-record/:id/view",
                "/dashboard/payment-record/:id/pay",
              ],
            },
          ],
        },
        {
          type: "Single",
          title: t(`${sidebarItems}.notification`),
          url: "/dashboard/notification",
          icon: "Bell",
          active: ["/dashboard/notification/:id/view"],
        },
      ],
    },
    {
      label: t(`${sidebarGroups}.management`),
      menu: [
        {
          type: "Single",
          title: t(`${sidebarItems}.admin`),
          url: "/dashboard/admin",
          icon: "ShieldCheck",
          active: [
            "/dashboard/admin/create",
            "/dashboard/admin/:id/view",
            "/dashboard/admin/:id/edit",
          ],
        },
        {
          type: "Single",
          title: t(`${sidebarItems}.interviewQuestion`),
          url: "/dashboard/interview-question",
          icon: "MessageSquare",
          active: [
            "/dashboard/interview-question/create",
            "/dashboard/interview-question/:id/edit",
          ],
        },
        {
          type: "Single",
          title: t(`${sidebarItems}.bankAccount`),
          url: "/dashboard/bank-account",
          icon: "CreditCard",
          active: [
            "/dashboard/bank-account/create",
            "/dashboard/bank-account/:id/view",
            "/dashboard/bank-account/:id/edit",
          ],
        },
        {
          type: "Single",
          title: t(`${sidebarItems}.document`),
          url: "/dashboard/document",
          icon: "FolderOpen",
          active: [
            "/dashboard/document/upload",
            "/dashboard/document/:id/view",
          ],
        },
        {
          type: "Single",
          title: t(`${sidebarItems}.report`),
          url: "/dashboard/report",
          icon: "ChartBar",
          active: ["/dashboard/report/create", "/dashboard/report/:id/view"],
        },
      ],
    },
    {
      label: t(`${sidebarGroups}.system`),
      menu: [
        {
          type: "Single",
          title: t(`${sidebarItems}.profile`),
          url: "/profile",
          icon: "User",
          active: [],
        },
        {
          type: "Single",
          title: t(`${sidebarItems}.settings`),
          url: "/settings",
          icon: "Settings",
          active: [],
        },
      ],
    },
  ];
};
