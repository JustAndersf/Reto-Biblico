import { Outlet } from "react-router";

export function RootLayout() {
  return (
    <div className="min-h-screen bg-[#EEF4FB] w-full" style={{ fontFamily: "Nunito, sans-serif" }}>
      <Outlet />
    </div>
  );
}
