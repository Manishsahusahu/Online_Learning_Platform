import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HightlightText from "../components/core/HomePage/HightlightText";
import CTAButton from "../components/core/HomePage/CTAButton";
import video from "../assets/testingVideo.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";

const Home = () => {
  return (
    <>
      {/* Section1 */}

      <div className="relative mx-auto flex flex-col w-11/12 items-center text-white justify-between max-w-screen-lg">
        <Link to={"/signup"}>
          <div className="group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-x-95 w-fit">
            <div className="flex flex-row items-center gap-5 rounded-full px-10 py-[5px] group-hover:bg-richblack-900">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="text-center text-4xl font-semibold mt-7">
          Empower Your Future with
          <HightlightText text={" Coding Skills"} />
        </div>
        <div className="mt-4 w-[90%] text-center text-lg font-bold text-richblack-200">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands on projects, quizzes and personalized feedback from
          instructors.{" "}
        </div>

        <div className="flex flex-row gap-7 mt-8 ">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto={"/login"}>
            Book a demo
          </CTAButton>
        </div>

        <div className=" my-12 mx-3 shadow-blue-200 shadow-lg">
          <video muted loop autoPlay src={video} typeof="video/mp4"></video>
        </div>

        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="font-semibold text-4xl">
                Unlock your <HightlightText text={"Coding Potential"} /> with
                our online courses
              </div>
            }
            subHeading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "try it yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "learn more",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<!doctype html>\n<html lang="en">\n<head>\n<meta charset="UTF-8" />\n<link rel="icon" type="image/svg+xml" href="/vite.svg" />\n<meta name="viewport" content="width=device-width, initial-scale=1.0" />\n<title>Vite + React</title>\n</head>\n<body>\n<div id="root"></div>\n</body>\n</html>\n`}
            codeColor={"text-yellow-25"}
          />
        </div>
      </div>

      {/* Section2 */}
      {/* Section3 */}
      {/* Section4 */}
    </>
  );
};

export default Home;
