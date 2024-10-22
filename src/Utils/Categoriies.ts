import { CiLaptop } from "react-icons/ci";
import { FaGamepad } from "react-icons/fa";
import { MdNetworkWifi, MdStorefront, MdTv, MdWatch } from "react-icons/md";
import { TbDeviceDesktopCheck } from "react-icons/tb";
import { LiaHeadsetSolid } from "react-icons/lia";
import { DiTechcrunch } from "react-icons/di";
import { IoPhonePortraitOutline } from "react-icons/io5";

export const Categories = [
  {
    label: "All",
    icon: MdStorefront,
  },
  {
    label: "Phones",
    icon: IoPhonePortraitOutline,
  },
  {
    label: "Laptops",
    icon: CiLaptop,
  },
  {
    label: "Gaming",
    icon: FaGamepad,
  },
  {
    label: "PCs",
    icon: TbDeviceDesktopCheck,
  },
  {
    label: "Watches",
    icon: MdWatch,
  },
  {
    label: "Internet",
    icon: MdNetworkWifi,
  },
  {
    label: "TVs",
    icon: MdTv,
  },
  {
    label: "Headsets",
    icon: LiaHeadsetSolid,
  },
  {
    label: "Accessories",
    icon: DiTechcrunch,
  },
];
