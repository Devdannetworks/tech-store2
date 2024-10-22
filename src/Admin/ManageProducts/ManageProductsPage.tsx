import React, { useCallback } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { selectedImg } from "../../Utils/Store";
import {
  MdCached,
  MdClose,
  MdDelete,
  MdDone,
  MdRemoveRedEye,
} from "react-icons/md";
import HeadersComp from "../../Components/Headers";
import ProductStatus from "../../Components/ProductStatus";
import ActionBtn from "../../Components/ActionBtn";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../Firebase/FirebaseConfig";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { deleteObject, ref } from "firebase/storage";

interface DatabaseInterface {
  id: string;
  name: string;
  price: string;
  category: string;
  brand: string;
  prevPrice: string;
  checkbox: boolean;
  images: selectedImg;
}

interface ManageProductsPageProps {
  products: DatabaseInterface[];
}

const ManageProductsPage: React.FC<ManageProductsPageProps> = ({
  products,
}) => {
  const navigate = useNavigate();
  let rows: any = [];

  if (products) {
    rows = products.map((product) => {
      return {
        name: product.name,
        price: product.price,
        category: product.category,
        prevPrice: product.prevPrice,
        brand: product.brand,
        available: product.checkbox,
        images: product.images,
        id: product.id,
      };
    });
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "name", headerName: "Name", width: 180 },
    {
      field: "price",
      headerName: "Price",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-500">{params.row.price}</div>
        );
      },
    },
    { field: "category", headerName: "Category", width: 100 },
    { field: "brand", headerName: "Brand", width: 100 },
    {
      field: "available",
      headerName: "Available",
      width: 140,
      renderCell: (params) => {
        return (
          <div className="h-full flex items-center">
            {params.row.available === true ? (
              <ProductStatus
                label="Available"
                icon={MdDone}
                color="text-teal-700"
                bg="bg-teal-200"
              />
            ) : (
              <ProductStatus
                label="Out of Stock"
                icon={MdClose}
                color="text-rose-700"
                bg="bg-rose-200"
              />
            )}
          </div>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      renderCell: (params) => {
        return (
          <div className="flex items-center justify-between gap-3 w-full h-full">
            <ActionBtn
              icon={MdCached}
              onClick={() => toggleAvailable(params.row.id)}
            />
            <ActionBtn
              icon={MdDelete}
              onClick={() => deleteProduct(params.row.id, params.row.images)}
            />
            <ActionBtn
              icon={MdRemoveRedEye}
              onClick={() => {
                navigate(`/Product/${params.row.id}`);
              }}
            />
          </div>
        );
      },
    },
  ];

  const toggleAvailable = useCallback(async (productId: string) => {
    try {
      const productRef = doc(db, "products", productId);
      const productSnapshot = await getDoc(productRef);

      if (productSnapshot.exists()) {
        const currentAvailability = productSnapshot.data().checkbox;

        await updateDoc(productRef, {
          checkbox: !currentAvailability,
        });
        toast.success(" product updated successfully!");
      } else {
        toast("No such product was found");
      }
    } catch (error) {
      console.log("Error updating product availability", error);
    }
  }, []);

  const deleteProduct = useCallback(
    async (productId: string, images: any[]) => {
      toast("Deleting product please wait...");

      const handleImageDelete = async () => {
        try {
          for (const item of images) {
            if (item.image) {
              const imageRef = ref(storage, item.image);
              await deleteObject(imageRef);
              toast("images deleted from store");
              console.log("Image delete successfully from storage", item.image);
            }
          }
        } catch (error) {
          console.error("Error deleting the image", error);
        }
      };

      await handleImageDelete();
      try {
        await deleteDoc(doc(db, "products", productId));
        toast("Product deleted from the database");
      } catch (error) {
        console.error("Error deleting the product", error);
      }
    },
    []
  );
  return (
    <div className="max-w-[1150px] w-full">
      <div>
        <HeadersComp label="Manage Products" />
      </div>

      <div className="h-[600px] w-[100%]">
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
};

export default ManageProductsPage;
