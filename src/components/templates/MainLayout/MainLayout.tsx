import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import { Footer } from "@components/organisms/Footer/Footer";
import { Header } from "@components/organisms/Header/Header";
import { LoadingFallback } from "@components/organisms/LoadingFallback/LoadingFallback";
import { Sidebar } from "@components/organisms/Sidebar/Sidebar";

export const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-4 md:p-6">
          <Suspense fallback={<LoadingFallback />}>
            <Outlet />
          </Suspense>
        </main>
      </div>

      <Footer />
    </div>
  );
};
