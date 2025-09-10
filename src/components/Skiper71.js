"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import ReactLenis from "lenis/react";
import { useEffect, useRef, useState } from "react";

const data = [
  { title: "Digital Architecture", image: "/images/333.jpg" },
  { title: "Horizon Beyond", image: "/images/333.jpg" },
  { title: "Sound Wave Circuit", image: "/images/333.jpg" },
  { title: "Light Writer", image: "/images/333.jpg" },
  { title: "Star Explorer", image: "/images/333.jpg" },
];

const ImageRevealScroll = () => {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const cycleProgress = useTransform(scrollYProgress, [0, 1], [0, data.length]);

  useEffect(() => {
    const unsubscribe = cycleProgress.on("change", (value) => {
      const cycle = Math.floor(value);
      if (cycle !== currentIndex && cycle < data.length) {
        setCurrentIndex(cycle);
      }
      setScrollProgress(value);
    });

    return unsubscribe;
  }, [cycleProgress, currentIndex]);

  const getImageScale = (index) => {
    if (index === currentIndex) {
      const progress = scrollProgress - Math.floor(scrollProgress);
      return 1 - 0.25 * progress;
    }
    return index < currentIndex ? 0.75 : 1.25;
  };

  const getImageStyle = (index) => {
    const progress = scrollProgress - Math.floor(scrollProgress);

    if (index === currentIndex) {
      const clipProgress = Math.min(progress * 2, 1);
      const clipPath = `polygon(0% ${100 - clipProgress * 100}%, 100% ${
        100 - clipProgress * 100
      }%, 100% 100%, 0% 100%)`;

      const brightness = 1 + (1 - clipProgress) * 2;
      const contrast = 1 + (1 - clipProgress) * 1.5;

      return { opacity: 1, clipPath, filter: `brightness(${brightness}) contrast(${contrast})` };
    }

    if (index < currentIndex) {
      const shouldHide = progress > 0.5;
      return {
        opacity: shouldHide ? 0 : 1,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        filter: "brightness(1) contrast(1)",
      };
    }

    return {
      opacity: 0,
      clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      filter: "brightness(3) contrast(2.5)",
    };
  };

  const getProgressHeight = () => {
    const cycle = Math.floor(scrollProgress);
    const fraction = scrollProgress - cycle;
    if (cycle < data.length) {
      return `${fraction * 100}%`;
    }
    return "100%";
  };

  return (
    <ReactLenis root>
      <div ref={containerRef} className="h-[1000vh] w-full">
        <section className="sticky top-0 h-screen w-full bg-[#121212]">
          <div className="h-30 absolute right-4 top-1/2 w-0.5 -translate-x-1/2 -translate-y-1/2 transform bg-[rgb(40,40,40)] lg:right-12">
            <motion.div
              className="absolute left-0 top-0 z-10 w-full bg-white"
              style={{ height: getProgressHeight() }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {data.map((item, index) => (
            <motion.div
              key={index}
              className="absolute left-1/2 top-1/2 -z-10 h-[70%] w-full max-w-xl -translate-x-1/2 -translate-y-1/2 transform"
              style={{
                scale: getImageScale(index),
                ...getImageStyle(index),
              }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
            >
              <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
            </motion.div>
          ))}
        </section>
      </div>
    </ReactLenis>
  );
};

const Skiper71 = () => {
  return (
    <div className="h-full w-full">
      <div className="my-20 grid content-start justify-items-center gap-6 text-center">
        <span className="after:to-foreground relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-transparent after:content-['']">
          Scroll down to reveal the images
        </span>
      </div>
      <ImageRevealScroll />
    </div>
  );
};

export { Skiper71 };
