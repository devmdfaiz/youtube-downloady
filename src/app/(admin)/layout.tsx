import Header from "./_components/header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="overflow-hidden">
      <div className="mt-5">
        <Header />
      </div>
      <div className="w-screen min-h-screen mx-auto container">{children}</div>
    </main>
  );
}
