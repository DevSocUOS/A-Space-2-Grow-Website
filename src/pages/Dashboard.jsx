import { useEffect, useState } from "react";
import supabase from "../helper/supabaseClient";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user", error);
        return;
      }

      setUserName(user?.user_metadata?.full_name || user?.email || "User");
    };

    fetchUser();
  }, []);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    navigate("/login");
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome, {userName}!
        </h1>
        <button
          onClick={signOut}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors duration-200"
        >
          Sign out
        </button>
      </div>
    </main>
  );
}

export default Dashboard;
