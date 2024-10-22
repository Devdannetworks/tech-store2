import { Container } from "@mui/material";
import React, { useEffect } from "react";
import HomeBanner from "./HomeBanner";

const Hero: React.FC = () => {
  // const [currentImage, setCurrentImage] = useState();

  // const backgroundImages = [heroImage1, heroImage2, heroImage3, heroImage4];

  useEffect(() => {
    setInterval(() => {
      //  setCurrentImage(backgroundImages[0])
    }, 1000);
  }, []);

  return (
    <div>
      <Container maxWidth={"xl"}>
        <HomeBanner />
      </Container>
    </div>
  );
};

export default Hero;
