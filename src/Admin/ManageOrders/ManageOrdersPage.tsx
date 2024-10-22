import React, { useCallback } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { cartProductsType } from "../../Utils/Store";
import {
  MdAccessTimeFilled,
  MdDeliveryDining,
  MdDone,
  MdRemoveRedEye,
} from "react-icons/md";
import HeadersComp from "../../Components/Headers";
import ProductStatus from "../../Components/ProductStatus";
import ActionBtn from "../../Components/ActionBtn";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../Firebase/FirebaseConfig";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export interface OrderInterface {
  id: string;
  name: string;
  totalAmount: number;
  deliveryStatus: string;
  paymentStatus: string;
  products: cartProductsType;
  date: string;
}

interface ManageOrdersPageProps {
  orders: OrderInterface[];
}

const ManageOrdersPage: React.FC<ManageOrdersPageProps> = ({ orders }) => {
  const navigate = useNavigate();
  let rows: any = [];
  const user = auth.currentUser;
  if (orders && user) {
    rows = orders.map((order) => {
      return {
        id: order.id,
        name: order.name,
        totalAmount: order.totalAmount,
        deliveryStatus: order.deliveryStatus,
        paymentStatus: order.paymentStatus,
        products: order.products,
        date: order.date,
      };
    });
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "name", headerName: "Name", width: 180 },
    {
      field: "totalAmount",
      headerName: "Amount",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-500">
            {params.row.totalAmount}
          </div>
        );
      },
    },
    {
      field: "deliveryStatus",
      headerName: "Delivery status",
      width: 140,
      renderCell: (params) => {
        return (
          <div className="h-full flex items-center">
            {params.row.deliveryStatus === "pending" ? (
              <ProductStatus
                label="pending"
                icon={MdAccessTimeFilled}
                color="text-slate-700"
                bg="bg-slate-200"
              />
            ) : params.row.deliveryStatus === "dispatched" ? (
              <ProductStatus
                label="dispatched"
                icon={MdDeliveryDining}
                color="text-slate-700"
                bg="bg-purple-200"
              />
            ) : params.row.deliveryStatus === "delivered" ? (
              <ProductStatus
                label="delivered"
                icon={MdDone}
                color="text-slate-700"
                bg="bg-green-200"
              />
            ) : (
              <></>
            )}
          </div>
        );
      },
    },
    {
      field: "paymentStatus",
      headerName: "Payment status",
      width: 140,
      renderCell: (params) => {
        return (
          <div className="h-full flex items-center">
            {params.row.paymentStatus === "pending" ? (
              <ProductStatus
                label="pending"
                icon={MdAccessTimeFilled}
                color="text-slate-700"
                bg="bg-slate-200"
              />
            ) : params.row.paymentStatus === "paid" ? (
              <ProductStatus
                label="paid"
                icon={MdDone}
                color="text-slate-700"
                bg="bg-teal-200"
              />
            ) : (
              <></>
            )}
          </div>
        );
      },
    },
    { field: "date", headerName: "date", width: 100 },

    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      renderCell: (params) => {
        return (
          <div className="flex items-center justify-between gap-3 w-full h-full">
            <ActionBtn
              icon={MdDeliveryDining}
              onClick={() => handleDispatch(params.row.id)}
            />
            <ActionBtn
              icon={MdDone}
              onClick={() => handleDeliver(params.row.id)}
            />
            <ActionBtn
              icon={MdRemoveRedEye}
              onClick={() => {
                navigate(`/order/${params.row.id}`);
              }}
            />
          </div>
        );
      },
    },
  ];

  const handleDispatch = useCallback(async (productId: string) => {
    try {
      const productRef = doc(db, "orders", productId);
      const productSnapshot = await getDoc(productRef);

      if (productSnapshot.exists()) {
        await updateDoc(productRef, {
          deliveryStatus: "dispatched",
        });
        toast.success(" order dispatched!");
      } else {
        toast("No such product was found");
      }
    } catch (error) {
      console.log("Error dispatching product", error);
    }
  }, []);

  const handleDeliver = useCallback(async (productId: string) => {
    try {
      const productRef = doc(db, "orders", productId);
      const productSnapshot = await getDoc(productRef);

      if (productSnapshot.exists()) {
        await updateDoc(productRef, {
          deliveryStatus: "delivered",
        });
        toast.success(" order delivered!");
      } else {
        toast("No such product was found");
      }
    } catch (error) {
      console.log("Error delivering product", error);
    }
  }, []);

  return (
    <div className="max-w-[1150px] w-full">
      <div>
        <HeadersComp label="Manage Orders" />
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

export default ManageOrdersPage;
