import React from "react";

interface MovieCardWrapperProps {
  index: number;
}

const MovieCardWrapper: React.FC<MovieCardWrapperProps> = ({ index }) => {
  const wrapper = (column: number) => {
    const breakpoints = ["sm", "md", "lg", "xl", "xx"];
    if (index && !(index % column)) {
      return (
        <div
          className={`w-100
          d-none d-${breakpoints[column - 2]}-block 
          d-${breakpoints[column - 1]}-none`}
        >
          index:{index} col:{column}
        </div>
      );
    }

    return null;
  };

  return (
    <>
      {wrapper(2)}
      {wrapper(3)}
      {wrapper(4)}
      {wrapper(5)}
    </>
  );
};

export default MovieCardWrapper;
