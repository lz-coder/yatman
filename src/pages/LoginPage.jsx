import { useState, useRef, useEffect } from "react";

const activeTabStyles =
  "border-l border-r border-t border-gray-600 text-lg font-semibold";
const tabStyles = "py-1 px-3 w-full";
const inactiveTabStyles = "border-b border-gray-600";

export default function LoginPage() {
  const [newUser, setNewUser] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const formRef = useRef();

  async function submitForm(e) {
    if (!e.target.checkValidity()) return;
    e.preventDefault();

    let url = "http://localhost:3000/login";

    const formData = new FormData(formRef.current);

    const reqBody = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    if (newUser) {
      url = "http://localhost:3000/user";
      reqBody.email = formData.get("email");
    }

    const response = await fetch(url, {
      method: formRef.current.method,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(reqBody),
    });

    const data = await response.json();
    if (!response.ok) {
      data.message && setErrorMessage(data.message);
      return;
    }

    console.log(data);
  }

  function genFormInputs(login) {
    let buttonText = login ? "Log in" : "Sign up";

    return (
      <div className="flex flex-col">
        {!login && (
          <>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter a valid email here..."
              id="email"
              name="email"
              required
            />
          </>
        )}
        <label htmlFor="username">Username</label>
        <input
          required
          type="text"
          placeholder="Enter your Username..."
          id="username"
          name="username"
        />
        <label htmlFor="password" className="mt-2">
          Password
        </label>
        <input
          required
          minLength={6}
          type="password"
          placeholder="Enter your Password..."
          id="password"
          name="password"
        />

        {errorMessage && (
          <p className="mt-10 text-center text-sm font-semibold text-red-700">
            {errorMessage}
          </p>
        )}

        <div className="absolute bottom-4 left-0 flex w-full justify-center">
          <button>{buttonText}</button>
        </div>
      </div>
    );
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
              onClick={() => {
                setErrorMessage(null);
                setNewUser(false);
              }}
              className={`${tabStyles} ${!newUser ? activeTabStyles : inactiveTabStyles}`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setErrorMessage(null);
                setNewUser(true);
              }}
              className={`${tabStyles} ${newUser ? activeTabStyles : inactiveTabStyles}`}
            >
              New Account
            </button>
          </div>
          <div className="relative h-full border border-t-0 border-gray-600 px-4">
            <form ref={formRef} onSubmit={submitForm} method="POST">
              {newUser ? (
                <>
                  <p>Create your account!</p>
                  <p>Its free, easy and you will love the result</p>
                </>
              ) : (
                <>
                  <p>Enter in your account!</p>
                </>
              )}

              {genFormInputs(!newUser)}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
