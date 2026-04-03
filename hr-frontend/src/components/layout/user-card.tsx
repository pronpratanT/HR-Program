"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function UserCard() {
  const router = useRouter();

  const [user, setUser] = useState<{
    user_id: number;
    employee_id: string;
    department_id: number;
    f_name: string;
    l_name: string;
    is_active: boolean;
    email?: string;
  } | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleSignOut = async () => {
    try {
      const response = await fetch(
        `http://192.168.2.139:8080/api/auth/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)authToken\s*=\s*([^;]*).*$)|^.*$/, "$1")}`,
          },
        },
      );
      if (!response.ok) {
        console.error("Failed to log out from server");
      }
      localStorage.removeItem("user");
      setUser(null);
      document.cookie =
        "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      router.push("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="bg-[#241f36] rounded-2xl shadow-xl px-6 py-4 min-w-[220px] max-w-xs text-white border border-[#3a335a]">
        <div className="mb-2 flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-lg font-bold">
            {user?.f_name ? user.f_name[0] : "U"}
          </div>
          <div>
            <div className="font-semibold text-base">
              {user?.f_name
                ? `${user.f_name} ${user.l_name ?? ""}`
                : "Guest User"}
            </div>
            <div className="text-xs text-gray-300">
              รหัสพนักงาน: {user?.employee_id ? String(user.employee_id) : "-"}
            </div>
          </div>
        </div>
        <div className="text-sm mt-2">
          <div>
            <span className="font-medium">แผนก:</span>{" "}
            {user?.department_id !== undefined
              ? String(user.department_id)
              : "-"}
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">สถานะ:</span>
            {user?.is_active ? (
              <span title="Active" className="inline-block w-3 h-3 rounded-full bg-green-400 border border-green-700"></span>
            ) : (
              <span title="Inactive" className="inline-block w-3 h-3 rounded-full bg-red-400 border border-red-700"></span>
            )}
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="border border-red-500 p-2 rounded-lg mt-4 w-full text-center text-red-400 hover:bg-red-500/10 transition cursor-pointer"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default UserCard;
