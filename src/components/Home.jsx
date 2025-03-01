import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Canvas, useFrame } from "@react-three/fiber";
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

const FloatingChipset = () => {
  const chipsetRef = useRef();
  const [time, setTime] = useState(0);

  useFrame((state, delta) => {
    setTime((prev) => prev + delta);
    if (chipsetRef.current) {
      // Gentle floating motion with increased speed (0.5 -> 1.0)
      chipsetRef.current.position.y = Math.sin(time * 1.0) * 0.2;
      // Subtle rotation with increased speed (0.3 -> 0.6)
      chipsetRef.current.rotation.y = Math.sin(time * 0.6) * 0.1;
    }
  });

  return (
    <group ref={chipsetRef}>
      <Chipset scale={1} />
    </group>
  );
};

const Home = () => {
  gsap.registerPlugin(ScrollTrigger);
  const containerRef = useRef(null);
  const slowedRef = useRef(null);
  const navRef = useRef(null);
  const scrollToDiscroverRef = useRef(null);
  const scrollToDiscroverRef2 = useRef(null);
  const scrollToDiscroverRef3 = useRef(null);
  const threeElementRef = useRef(null);
  const specificityRef = useRef(null);
  const rotatingLineRef1 = useRef(null);
  const rotatingLineRef2 = useRef(null);
  let [degree, setDegree] = useState(70);
  let [elementRotation, setElementRotation] = useState();
  const [scrolled, setScrolled] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollPositionReverse, setScrollPositionReverse] = useState(0);
  let [windoScrollstate, setWindoScrollstate] = useState(7);
  let [windoScrollstateRotation, setWindoScrollstateRotation] = useState(4);
  const [prevScrollPosition, setPrevScrollPosition] = useState(0);
  const [prevScrollPositionRotation, setPrevScrollPositionRotation] =
    useState(0);

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
    // console.log(scrollPosition);

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

    if (scrollPosition < 3000 ) {
      console.log(scrollPosition);
      setWindoScrollstate((prevState) => {
        if (scrollPosition > prevScrollPosition) {
          return prevState + 0.1;
        } else {
          return prevState - 0.1;
        }
      });
      setWindoScrollstateRotation((prevState) => {
        if (scrollPosition > prevScrollPositionRotation) {
          return prevState - 0.05;
        } else {
          return prevState + 0.05;
        }
      });
      gsap.to(threeElementRef.current, {
        transform: `translateX(-${scrollPosition * 0.07}px)`,
        duration: 0.5,
        ease: "none",
      });
    } 
    // else  {
    //   const reversePosition = (scrollPosition - 10000) * 0.05;
    //   gsap.to(threeElementRef.current, {
    //     transform: `translateX(-${300 - reversePosition}px)`,
    //     duration: 0.5,
    //     ease: "none",
    //   });
    // }
    if (
      specificityRef.current &&
      scrollPosition > 1000 &&
      scrollPosition < 1900
    ) {
      const scrollRange = 1900 - 1000;
      const scrollProgress = (scrollPosition - 1000) / scrollRange;
      const newDegree = -30 + scrollProgress * 90;
      setDegree(newDegree);
      console.log(degree);
      gsap.to(rotatingLineRef1.current, {
        rotate: `${newDegree}deg`,
        duration: 0.01,
        ease: "none",
      });
      gsap.to(rotatingLineRef2.current, {
        rotate: `${-newDegree}deg`,
        duration: 0.01,
        ease: "none",
      });
    }
    // console.log(scrollPosition);

    if (
      specificityRef.current &&
      scrollPosition > 700 &&
      scrollPosition < 1900
    ) {
      gsap.to(specificityRef.current, {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      });
    } else {
      gsap.to(specificityRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power2.out",
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
        <div className="w-[15%] flex justify-between" data-aos="fade-up">
          <h3 className="border-r-2 pr-5">arago</h3>
          <p className="text-sm uppercase">AI-system powered by light</p>
        </div>
        <div className="flex" data-aos="fade-up">
          <p>CONTACT SALES</p>
          <p>--</p>
        </div>
      </nav>
      <div
        // style={{ zIndex: '-100' }}
        ref={threeElementRef}
        className="fixed w-[70vw]  h-[1000px] top-[0px] right-[50px]"
      >
        <Canvas shadows>
          <PerspectiveCamera
            makeDefault
            position={[-3, windoScrollstate, windoScrollstateRotation]}
            fov={50}
          />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 5, 10]} intensity={1} />
          <FloatingChipset />
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
        <section className="flex gap-10" ref={specificityRef}>
          <article className="w-[25%] relative bottom-[100px] left-[100px] border-b-[1px] border-r-gray-500">
            <h1 className=" text-lg">
              The digital processor controls and performs the final 1% of
              operations
            </h1>
            <p className="text-gray-400 pt-2  pb-10  text-sm">
              {" "}
              Its deterministic architecture maximizes memory transfer
              efficiency and speeds up pointwise operations, achieving optimal
              performance for tasks with 𝑛^2 complexity.
            </p>
          </article>
          <div
            ref={rotatingLineRef1}
            className={`h-[1px] relative top-[9.2vh] origin-left left-[3.1vw] w-[30vw]  bg-gray-100`}
          ></div>
          <div
            ref={rotatingLineRef2}
            className={`h-[1px] relative bottom-[34.7vh] origin-right right-[3.1vw] w-[30vw]  bg-gray-100`}
          ></div>
          <article className="w-[25%] relative bottom-[500px] right-[100px] border-b-[1px]  border-r-gray-500">
            <h1 className=" text-lg">
              Arago's system accelerate 99% of operations: matrix
              multiplications
            </h1>
            <p className="text-gray-400 pt-2 text-sm">
              Harness the unmatched parallelism of light to accelerate
              high-volume tasks with 𝑛^3 complexity.
            </p>
          </article>
        </section>
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
        <section className="flex border-b-[1px] border-b-gray-500 ">
          <div className="w-[50vw] ps-48 h-[70vh] ">
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
          <article>
            <table className="text-start">
              <tr className="border-b-[1px] border-b-gray-500">
                <td className="p-5 w-[20vw] h-[10vh]">POSITION</td>
                <td className="p-5 w-[20vw] h-[10vh]">LOCATION</td>
                <td className="p-5 w-[20vw] h-[10vh]"></td>
              </tr>
              <tr className="border-b-[1px] border-b-gray-500">
                <th className="p-5 w-[20vw] text-start h-[10vh]">
                  Senior Processor Architect
                </th>
                <td className="p-5 w-[20vw] h-[10vh]">Paris, San Francisco</td>
                <th className="p-5 w-[20vw] h-[10vh]">
                  <div className="flex items-center gap-5">
                    <FaArrowUpLong className="rotate-[45deg] text-sm  text-gray-500" />
                    Apply now
                  </div>
                </th>
              </tr>
              <tr className="border-b-[1px] border-b-gray-500">
                <th className="p-5 w-[20vw] text-start h-[10vh]">
                  Senior Analog and Mixed Signal Engineer
                </th>
                <td className="p-5 w-[20vw] h-[10vh]">Paris, Tel Aviv</td>
                <th className="p-5 w-[20vw] h-[10vh]">
                  <div className="flex items-center gap-5">
                    <FaArrowUpLong className="rotate-[45deg] text-sm  text-gray-500" />
                    Apply now
                  </div>
                </th>
              </tr>
              <tr className="border-b-[1px] border-b-gray-500">
                <th className="p-5 w-[20vw] text-start h-[10vh]">
                  Low-Level Software Engineer
                </th>
                <td className="p-5 w-[20vw] h-[10vh]">Paris, San Francisco</td>
                <th className="p-5 w-[20vw] h-[10vh]">
                  <div className="flex items-center gap-5">
                    <FaArrowUpLong className="rotate-[45deg] text-sm  text-gray-500" />
                    Apply now
                  </div>
                </th>
              </tr>
            </table>
          </article>
        </section>
        <p className="uppercase text-gray-400 pt-5">
          Backed by executives and founders from...
        </p>
        <div className="w-[90vw] overflow-hidden">
          <div className="flex animate-infinite-scroll">
            {[...Array(10)].map((_, index) => (
              <article key={index} className="flex mt-4">
                <div className="sim-card-clients p-[20px]">
                  <FaStarOfLife className="text-[40px]" />
                </div>
                <span className="inline-block w-[35px] border-t-[1px] border-t-[#888] rotate-[33deg] relative right-[79px] bottom-[5px]"></span>
              </article>
            ))}
          </div>
        </div>
      </main>
      <footer className="h-[80vh] flex flex-col border-b-[1px] border-b-gray-300 border-t-gray-500  gap-4 items-center">
        <h1 className="text-9xl text-center  pt-10 text-gray-100">
          Get <br />
          in touch
        </h1>
        <p>Arago reinvents computing - with light.</p>
        <section className="flex gap-4">
          <article className="flex mt-4">
            <div className="sim-card-small p-[20px] bg-slate-50 ">Email</div>
            <span className="inline-block w-[15px] border-t-[1px] border-t-[#888] rotate-[33deg] relative right-[29px] bottom-[1px]"></span>
          </article>
          <article className="flex mt-4">
            <div className="sim-card-small p-[20px]">LinkedIn</div>
            <span className="inline-block w-[15px] border-t-[1px] border-t-[#888] rotate-[33deg] relative right-[29px] bottom-[1px]"></span>
          </article>
        </section>
      </footer>
      <footer className="h-[10vh] flex justify-between px-10 uppercase text-2xl items-center">
        <p>© 2025 Arago.</p>
        <p>Terms Of Use.</p>
      </footer>
      <style jsx>{`
        @keyframes infinite-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(
              calc(-100px * 5)
            ); /* Adjust based on item width */
          }
        }

        .animate-infinite-scroll {
          animation: infinite-scroll 15s linear infinite;
          display: flex;
          gap: 1rem;
        }

        /* When animation reaches halfway, jump back to start */
        .animate-infinite-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default Home;
