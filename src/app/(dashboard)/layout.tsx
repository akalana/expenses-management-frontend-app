import Navbar from "@/components/navbar/navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <Navbar />
      {children}
    </section>
  );
}
