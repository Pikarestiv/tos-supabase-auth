import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

const App: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") {
          setUser(session?.user || null);
          // setMessage("Successfully signed in!");
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      setMessage("Error sending magic link");
      console.error("Error:", error.message);
    } else {
      setMessage("Magic link sent! Check your email.");
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setMessage("Error logging out");
      console.error("Error:", error.message);
    } else {
      setUser(null);
      setMessage("You have been logged out");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-500">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-center text-3xl font-bold mb-6 text-gray-800">
          {user ? "Welcome!" : "Sign In"}
        </h1>
        {!user ? (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSignIn}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg font-semibold shadow-md transition duration-300"
            >
              Send Magic Link
            </button>
          </>
        ) : (
          <>
            <p className="text-center mb-4 text-gray-600">
              You are signed in as {user.email}
            </p>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg font-semibold shadow-md transition duration-300"
            >
              Logout
            </button>
          </>
        )}
        {message && <p className="text-center mt-4 text-gray-600">{message}</p>}
      </div>
    </div>
  );
};

export default App;
