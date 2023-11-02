import router from "next/navigation";
import Sidebar from "../../components/dashboard/page.tsx";

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) 


  {

    return <section>
        <Sidebar />
        {children}</section>
  }