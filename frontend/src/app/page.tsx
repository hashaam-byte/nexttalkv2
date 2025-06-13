import { headers } from "next/headers";
import MobileLayout from "@/components/layouts/MobileLayout";
import DesktopLayout from "@/components/layouts/DesktopLayout";

export default async function Home() {
  const headersList = headers();
  const deviceType = headersList.get("x-device-type") || 'desktop';
  const isMobile = deviceType === 'mobile';

  return (
    <>
      {isMobile ? <MobileLayout /> : <DesktopLayout />}
    </>
  );
}
