/* eslint-disable react/display-name */
import { forwardRef } from "react";
import { IconProps } from "./helper";

export const CheckIcon = forwardRef<SVGSVGElement, IconProps>(
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.501 5L6.828 9.556L3.91 6.695L3 7.623L6.372 10.93C6.498 11.053 6.663 11.116 6.827 11.116C6.991 11.116 7.154 11.053 7.281 10.93L12.409 5.93L11.501 5Z"
        fill={color}
      />
    </svg>
  )
);

export default CheckIcon;
