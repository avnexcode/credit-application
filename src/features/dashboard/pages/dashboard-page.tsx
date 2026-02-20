import { DateTimeDisplay } from "@/components/elements";
import {
  AdminLayout,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { ChartjsProvider } from "@/components/layouts/providers";
import { Card, CardContent } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { capitalizeWords, formatCurrency } from "@/utils";
import { useTranslation } from "react-i18next";
import { DashboardBadge, DoughnutChart, LineChart } from "../components";
import { DashboardLayout } from "../components/layouts";

const VerifiedIcon = () => {
  return (
    <svg
      id="Layer_1"
      viewBox="0 0 120 120"
      enableBackground="new 0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>
        {`
          .st0{fill:#00D566;}
          .st1{opacity:0.15;}
          .st2{fill:#FFFFFF;}
        `}
      </style>

      <g>
        <path
          className="st0"
          d="M99.5,52.8l-1.9,4.7c-0.6,1.6-0.6,3.3,0,4.9l1.9,4.7c1.1,2.8,0.2,6-2.3,7.8L93,77.8c-1.4,1-2.3,2.5-2.7,4.1
          l-0.9,5c-0.6,3-3.1,5.2-6.1,5.3l-5.1,0.2c-1.7,0.1-3.3,0.8-4.5,2l-3.5,3.7c-2.1,2.2-5.4,2.7-8,1.2l-4.4-2.6
          c-1.5-0.9-3.2-1.1-4.9-0.7l-5,1.2c-2.9,0.7-6-0.7-7.4-3.4l-2.3-4.6c-0.8-1.5-2.1-2.7-3.7-3.2l-4.8-1.6c-2.9-1-4.7-3.8-4.4-6.8
          l0.5-5.1c0.2-1.7-0.3-3.4-1.4-4.7l-3.2-4c-1.9-2.4-1.9-5.7,0-8.1l3.2-4c1.1-1.3,1.6-3,1.4-4.7l-0.5-5.1c-0.3-3,1.5-5.8,4.4-6.8
          l4.8-1.6c1.6-0.5,2.9-1.7,3.7-3.2l2.3-4.6c1.4-2.7,4.4-4.1,7.4-3.4l5,1.2c1.6,0.4,3.4,0.2,4.9-0.7l4.4-2.6c2.6-1.5,5.9-1.1,8,1.2
          l3.5,3.7c1.2,1.2,2.8,2,4.5,2l5.1,0.2c3,0.1,5.6,2.3,6.1,5.3l0.9,5c0.3,1.7,1.3,3.2,2.7,4.1l4.2,2.9C99.7,46.8,100.7,50,99.5,52.8z"
        />

        <polyline className="st0" points="44,53.6 56.5,67.9 82.1,47.3" />

        <path
          className="st2"
          d="M53.5,75.3c-1.4,0-2.8-0.6-3.8-1.7L37.2,59.3c-1.8-2.1-1.6-5.2,0.4-7.1c2.1-1.8,5.2-1.6,7.1,0.4l9.4,10.7
          l21.9-17.6c2.1-1.7,5.3-1.4,7,0.8c1.7,2.2,1.4,5.3-0.8,7L56.6,74.2C55.7,74.9,54.6,75.3,53.5,75.3z"
        />
      </g>
    </svg>
  );
};
const SuccessBadgeIcon = ({ size = 120, color = "#00D566", ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      {...props}
    >
      <path
        fill={color}
        d="M99.5,52.8l-1.9,4.7c-0.6,1.6-0.6,3.3,0,4.9l1.9,4.7c1.1,2.8,0.2,6-2.3,7.8L93,77.8c-1.4,1-2.3,2.5-2.7,4.1l-0.9,5
        c-0.6,3-3.1,5.2-6.1,5.3l-5.1,0.2c-1.7,0.1-3.3,0.8-4.5,2l-3.5,3.7c-2.1,2.2-5.4,2.7-8,1.2l-4.4-2.6c-1.5-0.9-3.2-1.1-4.9-0.7
        l-5,1.2c-2.9,0.7-6-0.7-7.4-3.4l-2.3-4.6c-0.8-1.5-2.1-2.7-3.7-3.2l-4.8-1.6c-2.9-1-4.7-3.8-4.4-6.8l0.5-5.1
        c0.2-1.7-0.3-3.4-1.4-4.7l-3.2-4c-1.9-2.4-1.9-5.7,0-8.1l3.2-4c1.1-1.3,1.6-3,1.4-4.7l-0.5-5.1c-0.3-3,1.5-5.8,4.4-6.8l4.8-1.6
        c1.6-0.5,2.9-1.7,3.7-3.2l2.3-4.6c1.4-2.7,4.4-4.1,7.4-3.4l5,1.2c1.6,0.4,3.4,0.2,4.9-0.7l4.4-2.6c2.6-1.5,5.9-1.1,8,1.2
        l3.5,3.7c1.2,1.2,2.8,2,4.5,2l5.1,0.2c3,0.1,5.6,2.3,6.1,5.3l0.9,5c0.3,1.7,1.3,3.2,2.7,4.1l4.2,2.9C99.7,46.8,100.7,50,99.5,52.8z"
      />

      <polyline
        fill="none"
        stroke="#fff"
        strokeWidth="8"
        points="44,53.6 56.5,67.9 82.1,47.3"
      />
    </svg>
  );
};

type DashboardPageProps = {
  sidebarDefaultOpen: boolean;
};

export const DashboardPage = () => {
  const { t } = useTranslation();
  return (
    <PageContainer
      title={`${capitalizeWords(t("components.sidebar.items.dashboard"))} `}
    >
      <SectionContainer padded>
        <DashboardLayout
          title={t("components.sidebar.items.dashboard")}
          className="space-y-10"
        >
          <div className="w-10">
            <VerifiedIcon />
          </div>
          <div className="w-10">
            <SuccessBadgeIcon />
          </div>
          <DateTimeDisplay />
          <div className="grid grid-cols-1 gap-5 py-10 xl:grid-cols-2 2xl:grid-cols-3">
            <DashboardBadge
              header={{ title: "Payment", icon: "AppWindowMac" }}
              content={formatCurrency(1000000, "USD")}
              footer="+12% from last month"
            />
          </div>
          <ChartjsProvider>
            <Heading className="font-bold" size={"h4"}>
              Statistik Judol
            </Heading>
            <Card>
              <CardContent>
                <LineChart />
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-4">
              <div className="mx-auto w-full max-w-87.5">
                <DoughnutChart />
              </div>
              <div className="mx-auto w-full max-w-87.5">
                <DoughnutChart />
              </div>
              <div className="mx-auto w-full max-w-87.5">
                <DoughnutChart />
              </div>
            </div>
          </ChartjsProvider>
        </DashboardLayout>
      </SectionContainer>
    </PageContainer>
  );
};

DashboardPage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as DashboardPageProps;
  return (
    <AdminLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </AdminLayout>
  );
};
