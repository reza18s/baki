import React, { FC } from "react";

import clsx from "clsx";
import { BaseProps } from "../type/base";

interface LoaderProps extends BaseProps {
  size?: string;
  thickness?: string;
}

export const CircleSpinner: FC<LoaderProps> = ({
  size = "h-8 w-8",
  thickness = "border-4",
  className,
}) => {
  return (
    <div
      className={clsx(
        "inline-block animate-spin rounded-full border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]",
        size,
        thickness,
        className,
      )}
      role="status"
    />
  );
};

export const DotesLoading: FC<LoaderProps> = ({
  className,
  size = "h-3 w-3",
}) => {
  return (
    <div className={"flex gap-1 flex-row-reverse justify-center items-center"}>
      <span className="sr-only">Loading...</span>
      <div
        className={clsx(
          "rounded-full animate-bounce even:[animation-delay:-0.3s]",
          size,
          className,
        )}
      />
      <div
        className={clsx(
          "rounded-full animate-bounce odd:[animation-delay:-0.15s]",
          size,
          className,
        )}
      />
      <div className={clsx("rounded-full animate-bounce", size, className)} />
    </div>
  );
};

export const RecShimmer: FC<BaseProps> = ({ className }) => {
  return <div className={"bg-gray-200 animate-pulse " + className} />;
};

export const CircleShimmer: FC<BaseProps> = ({ className }) => {
  return (
    <div
      className={clsx(
        "animate-pulse rounded-full bg-gray-200",
        "aspect-square",
        className,
      )}
    />
  );
};
