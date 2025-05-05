 import Header from "@/components/header/header";
  
 export default function Layout({

   children,
 }: Readonly<{
   children: React.ReactNode;
 }>) {
   return (
     <div className="main">
       <Header />
       {children}
      
     </div>
   );
 }
 