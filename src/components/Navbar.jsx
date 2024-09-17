// import Logo from "../assets/logo.jpg";
import coffeeImg1 from "../assets/coffee3.jpg";
import coffeeImg2 from "../assets/coffee4.jpg";
import coffeeImg3 from "../assets/coffee1.jpeg";

import mug1 from "../assets/mug1.png";
import mug2 from "../assets/mug2.png";
import mug3 from "../assets/mug3.png";
import { useState } from "react";

const Navbar = () => {
  const backgroundImages = [coffeeImg1, coffeeImg2, coffeeImg3];
  const mugImages = [mug1, mug2, mug3, mug2, mug3, mug1];

  const [currImageIndex, setCurrImageIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const [draggedMugStyles, setDraggedMugStyles] = useState({
    height: "100%",
    position: "absolute",
    top: "0",
    right: "0",
    zIndex: 5,
    transition: "none",
    visibility: "visible",
  });

  const [newMugStyles, setNewMugStyles] = useState({
    height: "100%",
    position: "absolute",
    top: "100%",
    right: "0",
    zIndex: 6,
    transition: "none",
  });

  const [mugBlur, setMugBlur] = useState(0);
  const [backgroundStyle, setBackgroundStyle] = useState({
    opacity: 1,
    transition: "opacity 0.8s ease-in-out",
  });

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    if (isDragging) {
      setDraggedMugStyles({
        height: "30%",
        position: "absolute",
        top: "-5%",
        right: "15%",
        zIndex: 5,
        transition: "none",
      });
    }

    setMugBlur(2);

    setTimeout(() => {
      const nextIndex = (currImageIndex + 1) % backgroundImages.length;
      setCurrImageIndex(nextIndex);

      setNewMugStyles({
        height: "90%",
        position: "absolute",
        top: "100%",
        right: "0",
        zIndex: 6,
        transition: "all 0.8s ease-in-out",
        overflow: "hidden",
      });

      setMugBlur(2);

      setTimeout(() => {
        setNewMugStyles({
          height: "90%",
          position: "absolute",
          top: "10%",
          right: "0",
          zIndex: 6,
          transition: "all 0.8s ease-in-out",
          overflow: "hiidden",
        });

        setIsDragging(false);
      }, 100);
    }, 200);
  };

  return (
    <div className="w-[100%] ">
      <img
        src={backgroundImages[currImageIndex]}
        alt="coffee-img"
        className="z-0 absolute h-[100%] w-[100%]"
        style={backgroundStyle}
      />

      <img
        src={
          currImageIndex === 0
            ? mugImages[currImageIndex]
            : mugImages[(currImageIndex - 1) % mugImages.length]
        }
        alt="mug-img"
        style={{
          ...draggedMugStyles,
          filter: `blur(${mugBlur}px)`,
        }}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      />

      <img
        src={mugImages[currImageIndex]}
        alt="new-mug-img"
        style={{
          ...newMugStyles,
        }}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      />

      <ul className="flex justify-between items-center w-4/12 px-10 h-[80px] z-100 relative">
        <li>Home</li>
        <li>About</li>
        <li>Menu</li>
        <li>Services</li>
        <li>Contact</li>
      </ul>

      <div className="flex justify-center items-center">
        {/* <img
          src={Logo}
          alt=""
          className="z-7 absolute top-40 left-96 h-[50%] mix-blend-multiply "
        />
        <h1 className="z-7 absolute top-[440px] left-80 text-blue-300 text-4xl font-bold tracking-wide ">
          This is a random text to test
        </h1> */}
      </div>
    </div>
  );
};

export default Navbar;
