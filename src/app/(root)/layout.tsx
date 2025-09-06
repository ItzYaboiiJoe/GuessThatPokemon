export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-y-auto">
      <div className="flex-1">{children}</div>
    </div>
  );
}
