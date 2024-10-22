import { collection, onSnapshot } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { db } from "../../Firebase/FirebaseConfig";

interface useFetchAllUsersResult {
  loading: boolean;
  users: any[];
}

const useFetchAllUsers = (): useFetchAllUsersResult => {
  const [loading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = useCallback(() => {
    try {
      const usersList: any = [];
      const unsubscribe = onSnapshot(
        collection(db, "users"),
        (querySnapshot) => {
          querySnapshot.docs.forEach((doc) => {
            usersList.push({ ...doc.data(), id: doc.id });
          });
        }
      );
      setUsers(usersList);
      return () => unsubscribe();
    } catch (error) {
      console.error("Error fetching users from the db", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { loading, users };
};

export default useFetchAllUsers;
