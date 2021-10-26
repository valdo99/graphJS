import { useRef, useState } from "react";
// Check out the library doc: https://github.com/flavioschneider/graphire
import { Graph, useNode, useLink } from "graphire";

export default function App() {
  return (
    <svg style={{ width: "100vw", height: "100vh" }}>
      <Graph>
        <g id="nodes">
          <Node uid={0} x={110} y={300} color="#e74c3c" />
          <Node uid={1} x={50} y={30} color="#e67e22" />
          <Node uid={2} x={150} y={80} color="#2ecc71" />
          <Node uid="k" x={200} y={200} color="#3498db" />
          <Node uid={3} x={400} y={100} color="#f1c40f" />
        </g>
        <Link source={0} target={1} color="#2ecc71" />
        <Link source={1} target={2} />
        <Link source={1} target="k" />
        <Link source={3} target="k" />
        {/* This makes sure nodes are above links. */}
        <use href="#nodes" />
      </Graph>
    </svg>
  );
}

const Node = (props) => {
  const { color = "black", radius = 5, ...rest } = props;
  const ref = useRef();
  const [coords, setCoords] = useState({ x: rest.x, y: rest.y });
  useNode(([cx, cy]) => {
    ref.current.setAttribute("cx", cx);
    ref.current.setAttribute("cy", cy);
  }, rest);

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
  };

  const handleMouseMove = (e) => {
    const xDiff = coords.x - e.pageX;
    const yDiff = coords.y - e.pageY;
    setCoords({
      x: e.pageX,
      y: e.pageY
    });

    ref.current.setAttribute("cx", coords.x - xDiff);
    ref.current.setAttribute("cy", coords.y - yDiff);
  };
  const handleMouseDown = (e) => {
    setCoords({
      x: e.pageX,
      y: e.pageY
    });
    document.addEventListener("mousemove", handleMouseMove);
  };
  return (
    <circle
      ref={ref}
      cx="0"
      cy="0"
      r={radius}
      fill={color}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    />
  );
};

const Link = (props) => {
  const { source, target, color = "#95a5a6", ...rest } = props;
  const ref = useRef();

  useLink(
    ([x1, y1], [x2, y2]) => {
      ref.current.setAttribute("x1", x1);
      ref.current.setAttribute("y1", y1);
      ref.current.setAttribute("x2", x2);
      ref.current.setAttribute("y2", y2);
    },
    source,
    target,
    rest
  );
  return (
    <line
      ref={ref}
      x1="0"
      y1="0"
      x2="0"
      y2="0"
      stroke={color}
      strokeWidth={1}
    />
  );
};
