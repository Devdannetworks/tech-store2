import {
  collection,
  addDoc,
  doc,
  updateDoc,
  getDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { Review } from "../../Main/Products/AddRating";
import { db } from "../../Firebase/FirebaseConfig";
import moment from "moment";

export const TruncateText = (text: string) => {
  if (text.length <= 12) {
    return text;
  } else {
    return text.slice(0, 12) + "...";
  }
};

export const TruncateBlog = (text: string) => {
  if (text.length <= 50) {
    return text;
  } else {
    return text.slice(0, 12) + "...";
  }
};

export function formatPrice(price: number): string {
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formatter.format(price);
}

//checking if the product the user wants to review has been delivered to them

// Function to add a review
export const addReview = async (productId: string, review: Review) => {
  try {
    const reviewsRef = collection(db, "products", productId, "reviews");

    await addDoc(reviewsRef, {
      ...review,
      dateCreated: serverTimestamp(),
    });

    await updateProductRatings(productId);
  } catch (error) {
    console.error("Error adding review: ", error);
  }
};

// Function to update product ratings (optional)
const updateProductRatings = async (productId: string) => {
  try {
    const reviewsRef = collection(db, "products", productId, "reviews");
    const reviewsSnapshot = await getDocs(reviewsRef);

    let totalRating = 0;
    let reviewCount = 0;
    reviewsSnapshot.forEach((doc) => {
      totalRating += doc.data().rating;
      reviewCount++;
    });

    const averageRating = reviewCount > 0 ? totalRating / reviewCount : 0;

    const productRef = doc(db, "products", productId);
    await updateDoc(productRef, {
      averageRating: averageRating,
      reviewCount: reviewCount,
    });
  } catch (error) {
    console.error("Error updating product ratings: ", error);
  }
};

// Function to fetch user name by user ID
export const fetchUserNameById = async (userId: string | undefined) => {
  if (!userId || undefined) {
    console.error("Invalid userId or userId undefined:", userId);
    return "Unknown";
  }

  try {
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData?.name || "Unknown";
    }
  } catch (error) {
    console.error("Error fetching user name:", error);
  }
};

//fetchuserbyid
export const fetchUserById = async (userId: string | undefined) => {
  if (!userId || undefined) {
    console.error("Invalid userId:", userId);
    return "Unknown";
  }

  try {
    console.log(userId);
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData.name || null;
    }
  } catch (error) {
    console.error("Error fetching user photo:", error);
  }
};

//fetch user photo from db using the userId
export const fetchUserPhotoById = async (userId: string | undefined) => {
  if (!userId || undefined) {
    console.error("Invalid userId:", userId);
    return "Unknown";
  }

  try {
    console.log(userId);
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData?.photo || null;
    }
  } catch (error) {
    console.error("Error fetching user photo:", error);
  }
};

//checkif user is admin
export async function checkIfUserIsAdmin(
  userId: string | undefined
): Promise<boolean | undefined> {
  if (userId) {
    try {
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        return userData.role === "admin";
      } else {
        console.log("No such document!");
        return false;
      }
    } catch (error) {
      console.error("Error checking user role:", error);
      return false;
    }
  }
}

// Function to format Firestore timestamp
export const formatFirestoreTimestamp = (timestamp: any) => {
  const date = timestamp.toDate();

  return moment(date).format("DD MMMM YYYY, HH:mm");
};
