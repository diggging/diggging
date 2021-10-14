import * as React from "react";

function SvgDirectory(props) {
  return (
    <svg
      width={21}
      height={15}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M19.031 2.5h-7.875L8.531 0H1.97C.88 0 0 .84 0 1.875v11.25C0 14.161.881 15 1.969 15H19.03C20.12 15 21 14.16 21 13.125v-8.75c0-1.036-.881-1.875-1.969-1.875z"
        fill="#C4C4C4"
      />
    </svg>
  );
}

export default SvgDirectory;
