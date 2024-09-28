/* eslint-disable react/display-name */
import { forwardRef } from "react";
import { IconProps } from "./helper";

export const ChevronDownIcon = forwardRef<SVGSVGElement, IconProps>(
  ({ color = "currentColor", ...props }, forwardedRef) => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      ref={forwardedRef}
    >
      <path
        d="M11.58 5.58L12.4287 6.42839L8.42865 10.4297C8.19432 10.6641 7.81432 10.6641 7.57999 10.4297L3.57999 6.42839L4.42865 5.58L8.00432 9.15684L11.58 5.58Z"
        fill={color}
      />
    </svg>
  )
);

export default ChevronDownIcon;
