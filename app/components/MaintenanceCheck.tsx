"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function MaintenanceCheck({ children }: { children: React.ReactNode }) {
  const [isChecking, setIsChecking] = useState(true);
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const checkMaintenanceMode = async () => {
      try {
        const response = await fetch('/api/public/settings');
        if (response.ok) {
          const settings = await response.json();
          const maintenanceEnabled = settings.maintenance_mode === true;

          // If maintenance mode is on and user is not admin
          if (maintenanceEnabled && session?.user?.role !== 'ADMIN') {
            setIsMaintenanceMode(true);
            router.push('/maintenance');
          } else {
            setIsMaintenanceMode(false);
          }
        }
      } catch (error) {
        console.error('Error checking maintenance mode:', error);
      } finally {
        setIsChecking(false);
      }
    };

    checkMaintenanceMode();

    // Recheck every 30 seconds
    const interval = setInterval(checkMaintenanceMode, 30000);

    return () => clearInterval(interval);
  }, [session, router]);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#121417' }}>
        <div className="animate-pulse text-white">Loading...</div>
      </div>
    );
  }

  // If in maintenance mode and not admin, don't show content
  if (isMaintenanceMode && session?.user?.role !== 'ADMIN') {
    return null;
  }

  return <>{children}</>;
}