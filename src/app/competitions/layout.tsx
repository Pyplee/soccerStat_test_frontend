import HeaderComponent from "@/app/ui/Header";
import Footer from "@/app/ui/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <HeaderComponent activeElement={"competitions"} />
      <main className="bg-[#f5f7fa] flex justify-center">{children}</main>
      <Footer />
    </div>
  );
}
