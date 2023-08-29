import React from "react";
import CTAButton from "./CTAButton";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

const CodeBlocks = ({
  position,
  heading,
  subHeading,
  ctabtn1,
  ctabtn2,
  codeblock,
  backgroundGradient,
  codeColor,
}) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10 flex-col lg:flex-row `}>
      {" "}
      <div className="flex flex-col lg:w-[50%] gap-8">
        {heading}
        <div className="text-richblack-300 font-bold text-sm md:text-lg">{subHeading}</div>
        <div className="flex gap-7 mt-7">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className="flex gap-2 items-center">
              {ctabtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>
          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            {ctabtn2.btnText}
          </CTAButton>
        </div>
      </div>
      <div className="h-fit flex lg:w-[50%] py-3 glass">
        <div className="text-center flex flex-col lg:w-[10%] text-richblack-700 font-inter font-bold ">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
          <p>12</p>
          <p>13</p>
          <p>14</p>
        </div>
        {/* {codeblock} */}
        <div
          className={`flex flex-col lg:w-[90%] gap-2 font-bold font-mono ${codeColor} px-2 relative`}
        >
            <div className={`${backgroundGradient}`}></div>
          <TypeAnimation
            sequence={[codeblock, 5000, ""]}
            repeat={Infinity}

            style={{
              whiteSpace: "pre-line",
              display: "block",
              fontSize: '16px'
            }}
            omitDeletionAnimation={true}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;
