import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HightlightText from "../components/core/HomePage/HightlightText";

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

        <div className="flex flex-row gap-7 mt-8">
            {/* <CTAButton></CTAButton>
            <CTAButton></CTAButton> */}
        </div>
      </div>

      {/* Section2 */}
      {/* Section3 */}
      {/* Section4 */}
    </>
  );
};

export default Home;
