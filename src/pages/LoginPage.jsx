import { useState, useRef } from "react";

const activeTabStyles =
  "border-l border-r border-t border-gray-600 text-lg font-semibold";
const tabStyles = "py-1 px-3 w-full";
const inactiveTabStyles = "border-b border-gray-600";

export default function LoginPage() {
  const [newUser, setNewUser] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  async function doLogin(e) {
    console.log(username);
    console.log(password);
    e.preventDefault();
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
    }
  }

  return (
    <main className="mx-auto grid h-screen min-h-screen w-full max-w-7xl grid-rows-6 md:grid-cols-6 md:grid-rows-1">
      <div className="row-span-2 flex flex-col items-center justify-center md:col-span-3">
        <p className="text-5xl font-medium lg:text-7xl">Welcome!</p>
        <h1 className="text-2xl font-semibold lg:text-4xl">
          This is <strong className="font-extrabold">YATMAN</strong>
        </h1>
        <h2>Your friend for tasks management!</h2>
      </div>
      <div className="row-span-3 flex justify-center md:col-span-3 md:items-center">
        <div className="max-h-96 w-4/5 md:h-4/6">
          <div className="flex justify-center">
            <button
              onClick={() => setNewUser(false)}
              className={`${tabStyles} ${!newUser ? activeTabStyles : inactiveTabStyles}`}
            >
              Login
            </button>
            <button
              onClick={() => setNewUser(true)}
              className={`${tabStyles} ${newUser ? activeTabStyles : inactiveTabStyles}`}
            >
              New Account
            </button>
          </div>
          <div className="h-full border border-t-0 border-gray-600 px-4">
            {newUser ? (
              <form>
                <p>Create your account!</p>
                <p>Its free, easy and you will love the result</p>
                {/* <input type="text" placeholder="Usename" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" /> */}
              </form>
            ) : (
              <form className="flex flex-col">
                <p>Enter in your account!</p>
                <label htmlFor="username">Username</label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  placeholder="Enter your Username..."
                  id="username"
                />
                <label htmlFor="password" className="mt-2">
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Enter your Password..."
                  id="password"
                />
                <button onClick={doLogin}>Login</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
