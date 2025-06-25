import Header from "@/components/header/header";
import ModalsWrapper from "@/components/modals/ModalsWrapper";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="main w-full min-h-screen overflow-x-auto">
      <Header />
      <main className="w-full mt-14">{children}</main>
      <ModalsWrapper />
    </div>
  );
}
