import React, { useEffect, useState } from "react";
import { auth, db } from "../Firebase/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Empty from "./Empty";
import { MdArrowBack } from "react-icons/md";
import Footer from "../Footer/Footer";
import { onAuthStateChanged } from "firebase/auth";

interface ProtectRoutesAdminOnlyProps {
  children: React.ReactNode;
}

const ProtectRoutesAdminOnly: React.FC<ProtectRoutesAdminOnlyProps> = ({
  children,
}) => {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Function to get user role from Firestore
  const getUserRole = async (uid: string) => {
    try {
      const usersDocRef = doc(db, "users", uid);
      const userDoc = await getDoc(usersDocRef);

      if (userDoc.exists()) {
        const data = userDoc.data();
        return data.role || null; // Return role if exists
      } else {
        console.error("User document does not exist");
        return null;
      }
    } catch (error) {
      console.error("Error retrieving user role", error);
      return null;
    }
  };

  useEffect(() => {
    // Use onAuthStateChanged to wait for Firebase Auth to initialize
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is authenticated, fetch the role
        const userRole = await getUserRole(user.uid);
        setRole(userRole);
      } else {
        // No user is authenticated, redirect or handle accordingly
        console.error("User not authenticated");
        navigate("/login"); // Redirect to login page if not authenticated
      }
      setLoading(false); // Set loading to false after auth state is resolved
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;

  // Redirect if the user is not an admin
  return role === "admin" ? (
    <>{children}</>
  ) : (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Empty
          heading="You are not authorized to access this page"
          icon={MdArrowBack}
          details="Go back shopping"
          onClick={() => navigate("/ShoppingCartComponent")}
        />
      </div>
      <Footer />
    </div>
  );
};

export default ProtectRoutesAdminOnly;
