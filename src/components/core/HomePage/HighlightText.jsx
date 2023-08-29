import React from "react";

const HighlightText = ({ text }) => {
    return (
        <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]  font-bold bg-clip-text text-transparent">
            {" "}
            {text}
        </span>
    );
};

export default HighlightText;
