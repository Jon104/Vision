import React from "react";

const Animate = () => {
  const [state, setState] = React.useState(0);

  const requestRef = React.useRef();

  const animate = (time) => {
    // The 'state' will always be the initial value here
    requestRef.current = requestAnimationFrame(animate);
  };

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []); // Make sure the effect runs only once

  return <div>{state}</div>;
};

export default Animate;
