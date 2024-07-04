import "@/app/globals.scss";
import ThemeConfigProvider from "@/libs/antd/ConfigProvider";
import { NotificationProvider } from "@/libs/antd/NotificationProvider";
import { getMessages, locales } from "@/libs/next-intl";
import { ReduxProvider } from "@/libs/redux/provider";
import SocketProvider from "@/libs/socket/SocketProvider";
import { Web3Provider } from "@/libs/web3/provider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import SocketComponent from "../_components/socket";

export const metadata: Metadata = {
  title: "Bounty Temple",
  description: "",
  icons: {
    icon: "/images/logo/TYT.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale },
}: React.PropsWithChildren & any) {
  if (!locales.includes(locale as any)) notFound();
  let messages = await getMessages(locale);
  unstable_setRequestLocale(locale);
  return (
    <html lang="en" className="bg-neutral-scrollbar">
      <body className={"font-din-pro bg-light-gray"}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Suspense>
            <Web3Provider>
              <ReduxProvider>
                <AntdRegistry>
                  <ThemeConfigProvider>
                    <NotificationProvider>
                      <SocketProvider>
                        <SocketComponent />
                        {children}
                      </SocketProvider>
                    </NotificationProvider>
                  </ThemeConfigProvider>
                </AntdRegistry>
              </ReduxProvider>
            </Web3Provider>
          </Suspense>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
