import React from "react";
import { Container } from "@mui/material";
import HeadersComp from "../../Components/Headers";
import Service from "./service";
import {
  CiChat2,
  CiDeliveryTruck,
  CiMoneyCheck1,
  CiSquareCheck,
} from "react-icons/ci";

const services = [
  {
    icon: CiDeliveryTruck,
    heading: "COUNTRY WIDE DELIVERY",
    text: "Fast delivery",
  },
  {
    icon: CiMoneyCheck1,
    heading: "GREAT SECURE PRICES",
    text: "Secure payment",
  },
  {
    icon: CiSquareCheck,
    heading: "Quality Guarantee",
    text: "Original Product",
  },
  {
    icon: CiChat2,
    heading: "24/7 CUSTOMER SUPPORT",
    text: "Give us feedback",
  },
];

const Services = () => {
  return (
    <div className="mt-4 mb-8">
      <HeadersComp label="Why our customers trust us" />
      <Container maxWidth={"xl"}>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 pt-5 pb-5 justify-center items-center">
          {services.map((service) => {
            return (
              <Service
                key={service.heading}
                icon={service.icon}
                heading={service.heading}
                text={service.text}
              />
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default Services;
