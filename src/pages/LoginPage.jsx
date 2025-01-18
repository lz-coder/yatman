import { useState } from "react";

export default function LoginPage() {
  const [newUser, setNewUser] = useState(false);

  return (
    <main className="min-h-screen w-full md:grid">
      <div>
        <p className="text-5xl font-medium">Welcome!</p>
        <h1 className="text-2xl font-semibold">
          This is <strong className="font-extrabold">YATMAN</strong>
        </h1>
        <h2>Your friend for tasks management!</h2>
      </div>
      <div>
        <div>
          <div>
            <button onClick={() => setNewUser(false)}>Login</button>
            <button onClick={() => setNewUser(true)}>New Account</button>
          </div>
          {newUser ? (
            <form>
              <p>Create your account!</p>
              <p>Its free, easy and you will love the result</p>
              <input type="text" placeholder="Usename" />
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
            </form>
          ) : (
            <form>
              <p>Enter in your account!</p>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
