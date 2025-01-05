import Navbar from "@/components/navbar/navbar";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <ToastContainer/>
      <Navbar />
      {children}
    </section>
  );
}
