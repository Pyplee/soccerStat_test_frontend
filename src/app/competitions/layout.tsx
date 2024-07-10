import HeaderComponent from "@/app/ui/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <HeaderComponent />
      <main className="bg-[#f5f7fa] flex justify-center">{children}</main>
    </div>
  );
}
