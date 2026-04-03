"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { setCookie, getThemeCookie } from "../../utils/cookies";

// icons
import { VscEye, VscEyeClosed } from "react-icons/vsc";

function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // อ่าน theme จาก cookies เมื่อเข้า login page
  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const theme = getThemeCookie();
  //     if (theme === 'dark') setIsDarkMode(true);
  //     else if (theme === 'light') setIsDarkMode(false);
  //   }
  // }, []);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (username.trim() === "" || password.trim() === "") {
      setError("Please enter username or password.");
      return;
    }

    const payload = {
      employee_id: username,
      password: password,
    };

    try {
      const response = await fetch(`http://192.168.2.139:8080/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        setSuccess("");
        setError(data.message);
        return;
      }
      if (data.access_token) {
        // 1. เก็บ token ลง cookies
        setCookie("authToken", data.access_token, 7);
        // 2. เก็บ user ลง localStorage
        const {
          user_id,
          employee_id,
          department_id,
          f_name,
          l_name,
          is_active,
        } = data;
        localStorage.setItem(
          "user",
          JSON.stringify({
            user_id,
            employee_id,
            department_id,
            f_name,
            l_name,
            is_active,
          }),
        );
      }
      setError("");
      setSuccess("Login successful!");
      setTimeout(() => {
        setSuccess("");
        router.push("/dashboard-hr/export");
      }, 1000);
    } catch (error) {
      setSuccess("");
      setError("Cannot connect to server. Please try again later.");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-6 sm:py-10 bg-stone-50">
      <div className="flex w-full max-w-6xl flex-col overflow-hidden rounded-3xl bg-gray-950 shadow-lg shadow-gray-500 lg:h-[650px] lg:flex-row">
        {/* Left side with image or background */}
        <div className="relative min-h-[280px] w-full p-4 lg:w-1/2 lg:p-5">
          <div className="relative h-full min-h-[280px] w-full overflow-hidden rounded-2xl">
            <Image
              src="/images/att7.jpg"
              alt="attention pic"
              fill
              className="rounded-2xl object-cover"
              priority
            />
          </div>
        </div>
        {/* Right side with login form */}
        <div className="flex w-full items-center p-6 sm:p-8 lg:w-1/2 lg:p-10">
          <div className="w-full">
            <h1 className="text-4xl font-bold">Welcome Back</h1>
            <h2 className="text-lg text-gray-400 mt-5">
              Please login to your account
            </h2>
            <form className="mt-10" onSubmit={handleLogin}>
              <div className="mb-5">
                <label
                  className="block text-gray-300 mb-2"
                  htmlFor="employeeId"
                >
                  Employee ID
                </label>
                <input
                  type="text"
                  id="employeeId"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (error) setError("");
                    if (success) setSuccess("");
                  }}
                  className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your employee ID"
                />
              </div>
              <div className="mb-5">
                <label className="block text-gray-300 mb-2" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError("");
                      if (success) setSuccess("");
                    }}
                    className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-0 inset-y-0 flex items-center px-4 text-gray-300 hover:text-white"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <VscEyeClosed className="w-4 h-4 cursor-pointer" />
                    ) : (
                      <VscEye className="w-4 h-4 cursor-pointer" />
                    )}
                  </button>
                </div>
              </div>
              {error && (
                <p className="text-red-500 mb-5 border border-red-500 p-2 rounded">
                  {error}
                </p>
              )}
              {success && (
                <p className="text-green-500 mb-5 border border-green-500 p-2 rounded">
                  {success}
                </p>
              )}
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-800 transition duration-200 cursor-pointer"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
