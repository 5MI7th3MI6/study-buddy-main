import "./globals.css";
import getMetadata from "@/lib/seo";
import Providers from "@/app/providers";

export const metadata = getMetadata({});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          <Providers>
            {children}
          </Providers>
        </main>
      </body>
    </html>
  );
}
