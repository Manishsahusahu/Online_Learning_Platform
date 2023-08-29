import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/CTAButton";
import video from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";

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
                    <HighlightText text={" Coding Skills"} />
                </div>
                <div className="mt-4 w-[90%] text-center text-lg font-bold text-richblack-200">
                    With our online coding courses, you can learn at your own
                    pace, from anywhere in the world, and get access to a wealth
                    of resources, including hands on projects, quizzes and
                    personalized feedback from instructors.{" "}
                </div>

                <div className="flex flex-row gap-7 mt-8 ">
                    <CTAButton active={true} linkto={"/signup"}>
                        Learn More
                    </CTAButton>
                    <CTAButton active={false} linkto={"/login"}>
                        Book a demo
                    </CTAButton>
                </div>

                <div className=" my-12 mx-3 shadow-blue-200 shadow-xl">
                    <video
                        muted
                        loop
                        autoPlay
                        src={video}
                        typeof="video/mp4"
                    ></video>
                </div>

                <div>
                    <CodeBlocks
                        position={"lg:flex-row"}
                        heading={
                            <div className="font-semibold text-4xl">
                                Unlock your{" "}
                                <HighlightText text={"Coding Potential"} /> with
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
                        codeblock={`<!doctype html>\n<html lang="en">\n<head>\n<meta charset="UTF-8" />\n<link rel="icon" type="image/svg+xml" href="/vite.svg" />\n<meta name="viewport" content="width=device-width, initial-scale=1.0" />\n<title>Vite + React</title>\n</head>\n<body>\n<div id="root"></div>\n</body>\n</html>`}
                        codeColor={"text-yellow-5"}
                        backgroundGradient={"grad"}
                    />
                </div>
                <div>
                    <CodeBlocks
                        position={"lg:flex-row-reverse "}
                        heading={
                            <div className="font-semibold text-4xl">
                                Unlock your{" "}
                                <HighlightText text={"Coding Potential"} /> with
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
                        codeblock={`<!doctype html>\n<html lang="en">\n<head>\n<meta charset="UTF-8" />\n<link rel="icon" type="image/svg+xml" href="/vite.svg" />\n<meta name="viewport" content="width=device-width, initial-scale=1.0" />\n<title>Vite + React</title>\n</head>\n<body>\n<div id="root"></div>\n</body>\n</html>`}
                        codeColor={"text-yellow-5"}
                        backgroundGradient={"grad"}
                    />
                </div>
            </div>

            {/* Section2 */}

            <div className="bg-pure-greys-5 text-richblack-700">
                <div className="homepage_bg h-[310px]">
                    <div className="w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto">
                        <div className="h-[150px]"></div>
                        <div className="flex flex-row gap-7 text-white ">
                            <CTAButton
                                active={true}
                                linkto={"/catalog/Web Developement"}
                            >
                                <div className="flex items-center gap-3">
                                    Explore Full Catalog
                                    <FaArrowRight />
                                </div>
                            </CTAButton>
                            <CTAButton active={false} linkto={"/signup"}>
                                <div>Learn more</div>
                            </CTAButton>
                        </div>
                    </div>
                </div>

                <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between">
                    <div className="flex flex-row justify-evenly mb-10 mt-[95px]">
                        <div className="text-4xl font-semibold w-[45%]">
                            Get the Skills you need for a
                            <HighlightText text={"Job that is in demand"} />
                        </div>

                        <div className="flex flex-col gap-10 w-[40%] items-start">
                            <div className="text-[16px]">
                                The modern StudyNotion is the dictates its own
                                terms. Today, to be a competitive specialist
                                requires more than professional skills.
                            </div>
                            <CTAButton active={true} linkto={"/signup"}>
                                <div>Learn more</div>
                            </CTAButton>
                        </div>
                    </div>

                    <TimelineSection />

                    <LearningLanguageSection />
                </div>
            </div>

            {/* Section3 */}

            <div className="w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 first-letter bg-richblack-900 text-white">
                <InstructorSection />
            </div>

            {/* Section4 */}
        </>
    );
};

export default Home;
