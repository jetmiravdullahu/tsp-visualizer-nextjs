"use client";

import "./globals.css";
import { ReduxProvider } from "@/store/provider";
import { MapProvider } from "react-map-gl";

export default function RootLayout({
  children,
  hud,
}: {
  children: React.ReactNode;
  hud: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={"relative text-foreground bg-background font-pt"}
      >
        <ReduxProvider>
          <MapProvider>
            <div className="h-screen">{children}</div>
            {hud}
          </MapProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
