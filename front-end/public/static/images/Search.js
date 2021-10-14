import * as React from "react";

function SvgSearch(props) {
  return (
    <svg
      width={22}
      height={23}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15.532 8.95c0 4.184-3.21 7.448-7.016 7.448S1.5 13.134 1.5 8.95C1.5 4.764 4.71 1.5 8.516 1.5s7.016 3.264 7.016 7.45zM13 14l7.097 7.458"
        stroke="#C4C4C4"
        strokeWidth={3}
      />
    </svg>
  );
}

export default SvgSearch;
