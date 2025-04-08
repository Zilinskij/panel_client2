import AuthGuard from "@/components/shared/authGuard";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <AuthGuard allowedRoles={["admin", "user"]}>
      <div className={"m-6 bg-muted/40 p-4 text-center rounded-md"}>
        <Button
          variant={"ghost"}
          className="p-2 bg-muted/90 shadow-sm rounded mb-4"
        >
          ГОЛОВНА СТОРІНКА
        </Button>
      </div>
    </AuthGuard>
  );
}
