import { Container, useMediaQuery } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { MdFacebook } from "react-icons/md";
import { AiFillTwitterCircle, AiFillYoutube } from "react-icons/ai";

const Footer: React.FC = () => {
  const isDesktop = useMediaQuery("(min-width: 900px)");

  return (
    <footer className="bg-slate-700 text-slate-200 text-md md:text-sm mt-8">
      <Container maxWidth={"xl"}>
        <div className="flex flex-col md:flex-row  justify-between align-top pt-8 pb-16 gap-8 md:gap-16">
          <div className="min-w-fit">
            <h3 className="text-lg mb-2">Products categories</h3>
            <p className="mb-1">Phones </p>
            <p>Laptops </p>
            <p className="mb-1">PCs </p>
            <p className="mb-1">TVs </p>
            <p className="mb-1">Sound Systems </p>
            <p className="mb-1">Gaming </p>
          </div>
          <div className="min-w-fit">
            <h3 className="text-lg font-semibold mb-2">Customer service</h3>
            <p className="mb-1">Contact us </p>
            <p className="mb-1">Shipping policy </p>
            <p className="mb-1">Returns & Exchanges </p>
            <p>FAQs </p>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg  font-semibold mb-2">About us</h3>
            {isDesktop ? (
              <p className="mb-2">
                At our shop, we are dedicated to offering the best services to
                our customers full satisfaction with a wide range of products to
                chose from TVs, Sound systems, Laptops, Phones and much more :
                At our shop, we are dedicated to offering the best services to
                our customers full satisfaction{" "}
              </p>
            ) : (
              <p className="mb-2">
                At our shop, we are dedicated to offering the best services to
                our customers full satisfaction
              </p>
            )}
            <p>&copy; {new Date().getFullYear()} Logo All rights reserved</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">Follow us</h3>
            <div className="flex justify-between gap-2 w-fit">
              <Link to="#">
                <MdFacebook size={24} />
              </Link>
              <Link to="#">
                <AiFillTwitterCircle size={24} />
              </Link>
              <Link to="#">
                <AiFillYoutube size={24} />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
