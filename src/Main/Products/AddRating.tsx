import React, { useState } from "react";
import { Item } from "../../Utils/Store";
import { auth, db } from "../../Firebase/FirebaseConfig";
import { useParams } from "react-router-dom";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Rating } from "@mui/material";
import Input from "../../Components/Inputs/Input";
import ButtonComp from "../../Components/Button";
import toast from "react-hot-toast";
import {
  fetchUserNameById,
  fetchUserPhotoById,
} from "../../Actions/ExportedFunctions/Functions";
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import useFetchUserOrders from "../../Actions/Orders/UserOrders/GetOrdersByUserId";
import useFetchReviewsByProductId from "../../Actions/FetchReviews/FetchReviews";

export interface Review {
  rating: number;
  comment: string;
  productId: string;
  userId: string;
  image: string;
  name: string;
  dateCreated: Timestamp;
}

interface AddRatingProps {
  product: Item & {
    reviews: Review;
  };
}

const AddRating: React.FC<AddRatingProps> = ({ product }) => {
  const [loading, setLoading] = useState(false);
  // const [userId, setUserId] = useState<string | undefined>(undefined);
  const { id } = useParams<{ id: string }>();
  const orders = useFetchUserOrders();
  const { reviews } = useFetchReviewsByProductId(id);
  const userId = auth.currentUser?.uid;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      comment: "",
      rating: 0,
    },
  });

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    const currentUser = auth.currentUser;

    if (!currentUser) {
      toast.error("Log in to add a rating!");
      setLoading(false);
      return;
    }

    if (data.rating === 0) {
      toast.error("Please select your rating!");
      setLoading(false);
      return;
    }

    const productIs = orders.some(
      (order: any) =>
        order.userId === currentUser.uid && order.deliveryStatus === "delivered"
    );
    if (!productIs) {
      toast("Can only review delivered products!");
      return setLoading(false);
    }

    const review = reviews.find((review) => review.userId === currentUser.uid);
    if (review) {
      toast("You alredy have a review");
      setLoading(false);
      return;
    }

    const ratingData = { ...data, userId: currentUser.uid, product: product };

    try {
      if (id) {
        // Reference to the reviews subcollection for the specific product
        const reviewsRef = collection(db, "products", id, "reviews");
        const photo = await fetchUserPhotoById(userId);
        const name = await fetchUserNameById(userId);

        // Add the new review document
        await addDoc(reviewsRef, {
          ...ratingData,
          dateCreated: serverTimestamp(),
          name: name,
          image: photo,
        });

        toast.success("Review added successfully!");
      } else {
        toast.error("Product not found.");
      }
    } catch (error) {
      console.error("Error adding review: ", error);
      toast.error("Error adding review. Please try again.");
    } finally {
      setLoading(false);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-2 max-w-[500px]">
      <div className="font-semibold text-2xl mb-3">Rate this Product</div>

      <Rating
        onChange={(event, newValue) => {
          setCustomValue("rating", newValue);
        }}
      />
      <Input
        id="comment"
        label="comment"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
      <ButtonComp
        label={loading ? "Loading.." : "Rate this Item"}
        onClick={handleSubmit(onSubmit)}
      />
    </div>
  );
};

export default AddRating;
