import Footer from "./_components/footer";
import Header from "./_components/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="overflow-hidden">
      <div className="mt-5">
        <Header />
      </div>
      <div className="w-screen min-h-screen mx-auto container">
        {children}
      </div>
      <Footer />
    </main>
  );
}
