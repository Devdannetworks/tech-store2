import { useCallback, useEffect, useState } from "react";
import HeadersComp from "./Headers";
import Input from "./Inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import TextAreaInput from "./Inputs/TextAreaInput";
import CheckBox from "./Inputs/CheckBox";
import { Categories } from "../Utils/Categoriies";
import AdminCategories from "../Main/Categories/AdminCategories";
import { colors } from "../Utils/Colors";
import SelectColor from "./Inputs/SelectColor";
import ButtonComp from "./Button";
import toast from "react-hot-toast";
import { db, storage } from "../Firebase/FirebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

export type ImageType = {
  color: string;
  colorCode: string;
  image: File[]; // Modified to store multiple images
};

export type SelectedImageType = {
  color: string;
  colorCode: string;
  image: File[]; // Modified to store multiple images
};

const AddProductForm = () => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<ImageType[] | null>(null);
  const [isProductCreated, setIsProductCreated] = useState(false);

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      brand: "",
      category: "",
      description: "",
      prevPrice: "",
      price: "",
      images: [],
    },
  });

  const setCustomValue = useCallback(
    (id: string, value: any) => {
      console.log(`Setting ${id} to `, value);
      setValue(id, value, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    },
    [setValue]
  );

  useEffect(() => {
    setCustomValue("images", images);
    console.log(images);
  }, [images, setCustomValue]);

  useEffect(() => {
    if (isProductCreated) {
      reset();
      setIsProductCreated(false);
    }
  }, [isProductCreated, reset]);

  const category = watch("category");

  const addImageToState = useCallback((value: SelectedImageType) => {
    setImages((prev) => {
      if (!prev) return [value];

      const existing = prev.find((item) => item.color === value.color);
      if (existing) {
        return prev.map((item) =>
          item.color === value.color
            ? { ...item, image: [...item.image, ...value.image] }
            : item
        );
      }

      return [...prev, value];
    });
  }, []);

  const removeImageFromState = useCallback((value: SelectedImageType) => {
    setImages((prev) => {
      if (!prev) return [];

      return prev
        .map((item) =>
          item.color === value.color
            ? {
                ...item,
                image: item.image.filter((img) => !value.image.includes(img)),
              }
            : item
        )
        .filter((item) => item.image.length > 0); // Remove colors with no images
    });
  }, []);

  const handleImageUpload = async (data: FieldValues, uploadedImage: any[]) => {
    toast("Creating product, please wait...");
    setLoading(true);

    try {
      console.log("Data Images:", data.images);

      for (const item of data.images) {
        console.log("Processing Item:", item);

        if (!Array.isArray(item.image)) {
          console.error("item.image is not an array:", item.image);
          throw new TypeError(
            `item.image is not iterable. Received: ${typeof item.image}`
          );
        }

        if (item.image.length === 0) {
          console.error("No images to process for item:", item);
          continue; // Skip processing for this item
        }

        for (const image of item.image) {
          if (!(image instanceof File)) {
            console.error("item.image contains a non-File object:", image);
            throw new TypeError(
              `item.image contains a non-File object. Received: ${typeof image}`
            );
          }

          const fileName = new Date().getTime() + "_" + image.name;
          const storageRef = ref(storage, `products/${fileName}`);
          const uploadTask = uploadBytesResumable(storageRef, image);

          await new Promise<void>((resolve, reject) => {
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload progress: ${progress}%`);
              },
              (error) => {
                reject(error);
                console.error("Error uploading the file:", error);
              },
              () => {
                getDownloadURL(uploadTask.snapshot.ref)
                  .then((downloadURL) => {
                    console.log("Download URL:", downloadURL);
                    uploadedImage.push({ ...item, image: downloadURL });
                    resolve();
                  })
                  .catch((urlError) => {
                    console.error("Error getting download URL:", urlError);
                    reject(urlError);
                  });
              }
            );
          });
        }
      }
    } catch (error) {
      console.error("Error in handleImageUpload:", error);
      toast("Error uploading the images");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);

    if (!data.category) {
      setLoading(false);
      return toast.error("Category cannot be empty");
    }

    if (!data.images || data.images.length === 0) {
      setLoading(false);
      return toast.error("Images cannot be empty");
    }

    const uploadedImage: any[] = [];
    try {
      await handleImageUpload(data, uploadedImage);

      const productData = {
        ...data,
        images: uploadedImage,
        name: data.name.toLowerCase(),
        description: data.description.toLowerCase(),
        brand: data.brand.toLowerCase(),
        price: data.price,
        category: data.category.toLowerCase(),
        prevPrice: data.prevPrice.toLowerCase(),
      };

      // Ensure productData is consistently lowercase
      const docRef = await addDoc(collection(db, "products"), productData);

      console.log("Database ref is", docRef.id);
      setIsProductCreated(true);
      toast("Created the product successfully!");
    } catch (error) {
      console.log("Error uploading data to database", error);
      toast.error("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HeadersComp label="Add Product" />

      <div className="min-w-full flex flex-col gap-4">
        <Input
          label="Name"
          id="name"
          disabled={loading}
          register={register}
          errors={errors}
          required
        />
        <Input
          label="Brand"
          id="brand"
          disabled={loading}
          register={register}
          errors={errors}
          required
        />
        <Input
          label="Price"
          id="price"
          disabled={loading}
          register={register}
          errors={errors}
          required
        />
        <Input
          label="Prev price"
          id="prevPrice"
          disabled={loading}
          register={register}
          errors={errors}
          required
        />

        <TextAreaInput
          label="Description"
          id="description"
          disabled={loading}
          register={register}
          errors={errors}
          required
        />

        <CheckBox
          label="Is product in stock"
          id="checkbox"
          register={register}
        />

        <div className="w-full flex flex-col gap-2 font-medium">
          <div className="font-semibold">Select a category</div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 max-h-50vh overflow-y-auto">
            {Categories.filter((item) => item.label !== "all").map((item) => (
              <div key={item.label} className="col-span">
                <AdminCategories
                  label={item.label}
                  icon={item.icon}
                  onClick={(category) => setCustomValue("category", category)}
                  selected={category === item.label}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full flex flex-col gap-3 flex-wrap">
          <div className="font-semibold">Select a color and choose images</div>
          <div className="text-sm">
            *Ensure to upload images for each color selected, otherwise your
            color selection will be ignored.
          </div>
          <div className="grid grid-cols-2 gap-3">
            {colors.map((item) => {
              return (
                <SelectColor
                  key={item.colorCode}
                  item={item}
                  addImageToState={addImageToState}
                  removeImageFromState={removeImageFromState}
                  isProductCreated={isProductCreated}
                />
              );
            })}
          </div>
        </div>
      </div>

      <ButtonComp
        label={loading ? "Loading..." : "Add Product"}
        onClick={handleSubmit(onSubmit)}
      />
    </>
  );
};

export default AddProductForm;
