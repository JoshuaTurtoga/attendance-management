import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AttendEase | Modern Attendance Management System",
  description: "Next.js & Supabase attendance tracking portal for students and faculty.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="ambient-bg" aria-hidden="true">
          <div className="ambient-blob-1" />
          <div className="ambient-blob-2" />
        </div>
        {children}
      </body>
    </html>
  );
}
