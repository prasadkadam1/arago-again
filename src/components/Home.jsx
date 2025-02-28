import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { FaStarOfLife } from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";
import { FaArrowUpLong } from "react-icons/fa6";
// import { useRef } from "react";
import * as THREE from "three";
// import Chipset from "./components/Chipset";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Chipset from "./Chipset";
import { FaArrowsToEye } from "react-icons/fa6";
const Home = () => {
  gsap.registerPlugin(ScrollTrigger);
  const containerRef = useRef(null);
  const slowedRef = useRef(null);
  const navRef = useRef(null);
  const scrollToDiscroverRef = useRef(null);
  const scrollToDiscroverRef2 = useRef(null);
  const scrollToDiscroverRef3 = useRef(null);
  const threeElementRef = useRef(null);
  let [elementRotation, setElementRotation] = useState();
  const [scrolled, setScrolled] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollPositionReverse, setScrollPositionReverse] = useState(0);
  let [windoScrollstate, setWindoScrollstate] = useState(7);
  let [windoScrollstateRotation, setWindoScrollstateRotation] = useState(1);
  const [prevScrollPosition, setPrevScrollPosition] = useState(0);
  const [prevScrollPositionRotation, setPrevScrollPositionRotation] = useState(0);

  useEffect(() => {
    const container = document.getElementById("homePage");

    const handleScroll = () => {
      setPrevScrollPosition(scrollPosition);
      setPrevScrollPositionRotation(scrollPosition);
      setScrollPosition(container.scrollTop);
      if (container.scrollTop > 50) {
        setScrolled(true);
      } else if (container.scrollTop < 50) {
        setScrolled(false);
      }
    };

    container?.addEventListener("scroll", handleScroll, { passive: true });
    return () => container?.removeEventListener("scroll", handleScroll);
  }, [scrollPosition]);

  useEffect(() => {
    // Set initial state
    gsap.set(slowedRef.current, {
      opacity: 0,
    });

    // Fade in animation on load
    gsap.to(slowedRef.current, {
      opacity: 1,
      transform: "translateY(-20px)",
      duration: 3,
      ease: "power2.out",
    });
    //========================
    gsap.set(navRef.current, {
      opacity: 0,
    });

    // Fade in animation on load
    gsap.to(navRef.current, {
      opacity: 1,
      transform: "translateY(10px)",
      duration: 3,
      ease: "power2.out",
    });
    //========================
    gsap.set(scrollToDiscroverRef.current, {
      opacity: 0,
    });

    // Fade in animation on load
    gsap.to(scrollToDiscroverRef.current, {
      opacity: 1,
      transform: "translateY(-20px)",
      duration: 3,
      ease: "power2.out",
    });
    //========================
    gsap.set(scrollToDiscroverRef2.current, {
      opacity: 0,
    });

    // Fade in animation on load
    gsap.to(scrollToDiscroverRef2.current, {
      opacity: 1,
      transform: "translateY(-20px)",
      duration: 3,
      ease: "power2.out",
    });
    //=====================
  }, []);
  useEffect(() => {
    console.log(scrollPosition);

    if (scrolled && scrollToDiscroverRef3.current) {
      gsap.to(scrollToDiscroverRef3.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(scrollToDiscroverRef3.current, {
        opacity: 1,
        y: 20,
        duration: 0.5,
        ease: "power2.out",
      });
    }
    if (scrollPosition < 5000 || scrollPosition > 10000) {
      setWindoScrollstate((prevState) => {
        if (scrollPosition > prevScrollPosition) {
          return prevState + 0.1;
        } else {
          return prevState - 0.1;
        }
      });
      setWindoScrollstateRotation((prevState) => {
        if (scrollPosition > prevScrollPositionRotation) {
          return prevState - 0.03;
        } else {
          return prevState + 0.03;
        }
      });
      gsap.to(threeElementRef.current, {
        transform: `translateX(-${scrollPosition * 0.2}px)`,
        duration: 0.5,
        ease: "none",
      });
    } else {
      const reversePosition = (scrollPosition - 10000) * 0.1;
      gsap.to(threeElementRef.current, {
        transform: `translateX(-${300 - reversePosition}px)`,
        duration: 0.5,
        ease: "none",
      });
    }
  }, [scrolled, scrollPosition]);

  return (
    <div
      className="h-screen w-screen text-white overflow-auto"
      id="homePage"
      ref={containerRef}
    >
      <nav
        ref={navRef}
        className="p-10 flex justify-between sticky top-0 z-10 bg-transparent"
      >
        <div className="w-[35%] flex justify-between" data-aos="fade-up">
          <h3 className="border-r-2 pr-5">Arago</h3>
          <p className="text-sm">
            AI-system powered by light AI-system powered by light
          </p>
        </div>
        <div className="flex" data-aos="fade-up">
          <p>CONTACT SALES</p>
          <p>--</p>
        </div>
      </nav>
      <div
        // style={{ zIndex: '-100' }}
        ref={threeElementRef}
        className="fixed w-[70vw]  h-[1000px] top-[0px] right-[0px]"
      >
        <Canvas shadows>
          <PerspectiveCamera
            makeDefault
            position={[-3, windoScrollstate, windoScrollstateRotation]}
            fov={50}
          />
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 1, 5]} intensity={1} />
          <Chipset scale={10} />
          <OrbitControls 
            enableZoom={false}
            enableRotate={false}
            enablePan={false}
          />
        </Canvas>
      </div>
      {/* <ThreeCube /> */}
      <h1
        ref={slowedRef}
        className="text-white p-16 text-8xl relative inline-block z-[1]"
      >
        Still slowed <br /> by electrons?
      </h1>
      <p ref={scrollToDiscroverRef2} className="pl-16 text-gray-500 text-lg">
        Arago reinvents computing, with light
      </p>
      <main className="p-[5vw] pt-96" ref={scrollToDiscroverRef}>
        <p
          ref={scrollToDiscroverRef3}
          style={{
            opacity: 1,
            transition: "opacity 0.5s ease",
          }}
          className="h-[20vh] uppercase border-l-[1px] pl-5 border-l-gray-600 text-gray-300"
        >
          Scroll to discover
        </p>
        <div className="w-[50%] h-[100vh]  border-t-[1px] border-t-white mt-20">
          <p className="pt-3 text-gray-400">Our mission</p>
          <h1 className="text-2xl pt-10 text-gray-500">
            Current models are tuned to fit the compute and <br /> memory
            capacity of today's accelerators,{" "}
            <span className="text-gray-300 font-normal">
              capping their <br /> potential
            </span>
          </h1>
          <p className="pt-14 text-gray-400">
            Arago's system combines a PyTorch-based software stack with a
            multi-physics processor, maximizing Flops/$ and Flops/Watt.
          </p>
        </div>
        <div className="w-[50%] h-[100vh]  border-t-[1px] border-t-white mt-20">
          <p className="pt-3 text-gray-400">Specificity </p>
          <h1 className="pt-14 text-gray-400 text-2xl">
            Unlocking lightning-fast <br />{" "}
            <span className="text-gray-300 font-normal">
              matrix multiplication
            </span>{" "}
            for <br />{" "}
            <span className="text-gray-300 font-normal">next-generation</span>{" "}
            models <br /> and applications
          </h1>
        </div>
        <div className="w-[90vw]  flex justify-end h-[130vh]">
          <section className="w-[20vw] text-slate-500">
            <p>
              Matrix multiplications are the <br /> backbone of every AI model.{" "}
            </p>{" "}
            <br /> <br />
            <p>
              Based on a multi-physics <br /> technology, we accelerate this{" "}
              <br /> process without disrupting the <br /> user experience,
              while ensuring <br /> compatibility with existing <br /> systems.
            </p>
          </section>
        </div>
        <div className="w-[90vw]  flex justify-end h-[130vh]">
          <section className="w-[35vw] text-slate-500">
            <p className="text-sm ">Performance</p> <br /> <br />
            <p className=" text-gray-400 text-2xl">
              <span className="text-gray-300 font-normal">
                Higher computation capacity:
              </span>{" "}
              a byte of <br /> data in a GPU is only used for a few <br />{" "}
              operations, whereas on Arago's <br /> system, that same byte
              enables <br /> thousands of operations, achieving <br />{" "}
              multi-PetaOp/s performance.
            </p>
          </section>
        </div>
        <div className="w-[40vw]  h-[120vh]">
          <section className="w-[35vw] text-slate-500">
            <p className="text-sm ">SPEED</p> <br /> <br />
            <p className=" text-gray-400 text-2xl">
              <span className="text-gray-300 font-normal">
                Higher throughput:
              </span>{" "}
              excel when <br /> treating tensor sizes in the hundreds <br /> and
              thousands.
            </p>
          </section>
        </div>
        <div className="w-[90vw]  flex justify-end h-[130vh]">
          <section className="w-[35vw] text-slate-500">
            <p className="text-sm ">Energy</p> <br /> <br />
            <p className=" text-gray-400 text-2xl">
              <span className="text-gray-300 font-normal">
                Lower energy consumption:
              </span>{" "}
              reduce <br /> costs and enable the next multi-die 3D <br />{" "}
              systems.
            </p>
          </section>
        </div>
        <section className="w-[95%] border-t-[1px] border-t-gray-300">
          <div className="w-[40vw]  h-[220vh]">
            <section className="w-[35vw] text-slate-500">
              <p className="text-sm ">SPEED</p> <br /> <br />
              <p className=" text-gray-400 text-2xl">
                <span className="text-gray-300 font-normal">
                  Higher throughput:
                </span>{" "}
                excel when <br /> treating tensor sizes in the hundreds <br />{" "}
                and thousands.
              </p>
            </section>
            <section>
              <div className="w-[90vw]  flex justify-end mt-[-100px] h-[130vh]">
                <section className="w-[40vw] flex gap-6 text-slate-500">
                  <p>
                    Matrix multiplications are the <br /> backbone of every AI
                    model.{" "}
                  </p>{" "}
                  <br /> <br />
                  <p>
                    Based on a multi-physics <br /> technology, we accelerate
                    this <br /> process without disrupting the <br /> user
                    experience, while ensuring <br /> compatibility with
                    existing <br /> systems.
                  </p>
                </section>
              </div>
            </section>
          </div>
        </section>
        <article className="h-[100vh]">
          <h1 className="text-4xl">Welcome to the new era</h1>
        </article>
        <article className="flex">
          <section className="flex flex-col w-[60vw]">
            {/* <div className="w-[15vw] bg-[ rgba(100, 100, 100, 0.7 ) ] h-[15vw] border-[1px] border-gray-300"></div>
            <div className="w-[15vw] bg-[ rgba(100, 100, 100, 0.7 ) ] h-[15vw] border-[1px] border-gray-300"></div>
            <div className="w-[15vw] bg-[ rgba(100, 100, 100, 0.7 ) ] h-[15vw] border-[1px] border-gray-300"></div> */}
            <article className="flex relative left-32  ">
              <div className="sim-card p-[20px]">
                <FaArrowsToEye className="text-[40px]" />
                <p className="uppercase text-slate-500 pt-3">
                  Baby steps, giant strides
                </p>
                <p>We take one step at a time, with velocity.</p>
              </div>
              <span className="inline-block w-[25px] border-t-[1px] border-t-[#888] rotate-[45deg] relative right-[93px] bottom-5"></span>
            </article>
            <article className="flex mt-4 ml-8">
              <div className="sim-card p-[20px]">
                <FaStarOfLife className="text-[40px]" />
                <p className="uppercase text-slate-500 pt-3">Do great things</p>
                <p>Think bold, give it all, make it real.</p>
              </div>
              <span className="inline-block w-[25px] border-t-[1px] border-t-[#888] rotate-[45deg] relative right-[93px] bottom-5"></span>
            </article>
            <article className="flex relative bottom-[230px] left-[280px]">
              <div className="sim-card p-[20px]">
                <TbWorld className="text-[40px] text-slate-300" />
                <p className="uppercase text-slate-500 pt-3">We move as one</p>
                <p>Trust and peer admiration drive our mission.</p>
              </div>
              <span className="inline-block w-[25px] border-t-[1px] border-t-[#888] rotate-[45deg] relative right-[93px] bottom-5"></span>
            </article>
          </section>
          <section>
            <div className="w-[50vw] ps-48 h-[50vh] ">
              <p className="pt-3 text-gray-400">TEAM</p>
              <h1 className="text-2xl pt-10 text-gray-500">
                If you're excited about{" "}
                <span className="text-gray-300 font-normal">
                  {" "}
                  shaping the <br /> future{" "}
                </span>{" "}
                of computing and AI, we'd love <br /> to hear from you
              </h1>
              <p className="pt-14 text-gray-400">
                The power of computing has enabled humanity to explore new{" "}
                <br /> planets, discover treatments for the rarest diseases, and{" "}
                <br /> produce the most beautiful films ever seen. <br />
                We don't want discoveries and creativity to be slowed by a lack{" "}
                <br /> of appropriate infrastructure.
              </p>
            </div>
          </section>
        </article>
        <section>
          <div className="w-[50vw] ps-48 h-[100vh] ">
            <p className="text-gray-400">Career</p>
            <h1 className="text-2xl pt-10 text-gray-500">
              We are a team of AI engineers and <br /> physicists who believe in{" "}
              <span className="text-gray-300 font-normal">great science</span>{" "}
              and <br />{" "}
              <span className="text-gray-300 font-normal">
                fast achievements
              </span>
              . We're looking for bold <br />
              jack-of-all-trades who love to{" "}
              <span className="text-gray-300 font-normal">
                ship products <br /> quickly
              </span>
              . If that's you, please apply for one of <br /> our open roles
              here.{" "}
            </h1>
            <article className="flex mt-5 items-center gap-4">
              <div className="small-sim-card p-[20px] mt-5">
                <FaArrowUpLong className="rotate-[45deg] relative  bottom-[5px] text-gray-500 right-[5px]" />
              </div>
              <h1 className="text-gray-500 text-2xl pt-2">
                <a href="#">Join the team</a>
              </h1>
            </article>
            <span className="inline-block w-[6px] border-t-[1px] border-t-[#888] rotate-[45deg] relative left-[45px] bottom-[65px]"></span>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
