import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import * as d3 from "d3";

function App() {
  const [points, setPoints] = useState(3);
  const [data, setData] = useState([
    { name: "triangle", angle: 60, length: 0 },
    { name: "square", angle: 90, length: 0 },
    { name: "pentagon", angle: 108, length: 0 },
    { name: "hexagon", angle: 120, length: 0 },
    { name: "heptagon", angle: 129, length: 0 },
    { name: "octagon", angle: 135, length: 0 },
    { name: "nonagon", angle: 140, length: 0 },
    { name: "decagon", angle: 144, length: 0 },
    { name: "hendecagon", angle: 147, length: 0 },
    { name: "dodecagon", angle: 150, length: 0 },
  ]);
  const ref = useRef(null);
  const size = 625;
  const scale = d3.scaleLinear().range([0, size]).domain([-1, 1]);

  useEffect(() => {
    d3.select(ref.current)
      .append("svg")
      .attr("width", size + 75)
      .attr("height", size + 75);
    // .style("background-color", "green");
  }, []);

  useEffect(() => {
    d3.selectAll("svg > *").remove();
    d3.select("svg")
      .append("g")
      .attr("transform", "translate(" + 50 + "," + 50 + ")")
      .call(wrapper);
  }, [points]);

  function pointsOnCircle(num) {
    console.log("---");
    let angle = (2 * Math.PI) / num;
    let pointsLocation = [];
    var i = 0;
    for (var a = 0; a < 2 * Math.PI; a += angle) {
      i++;
      pointsLocation.push({
        x: Math.cos(a),
        y: Math.sin(a),
        rotation: a,
        label: "point" + i,
      });
    }
    return pointsLocation;
  }

  const wrapper = (g) => {
    let arr = pointsOnCircle(points);
    //# This son of a gun puts a circle around the polygon
    // g.append("circle")
    //   .attr("id", "circle")
    //   .attr("cx", size / 2)
    //   .attr("cy", size / 2)
    //   .attr("r", size / 2)
    //   .attr("stroke", "black")
    //   .attr("fill", "none");
    //# This bad boy puts a dot on the verticies
    // g.selectAll(".dot")
    //   .data(arr)
    //   .enter()
    //   .append("circle")
    //   .attr("fill", "black")
    //   .attr("class", "dot")
    //   .attr("id", (d, i) => `circle-${i}`)
    //   .attr("r", 15)
    //   .attr("cx", function (d) {
    //     return scale(d.x);
    //   })
    //   .attr("cy", function (d) {
    //     return scale(d.y);
    //   });
    g.selectAll("line")
      .data(arr)
      .enter()
      .append("line")
      .attr("stroke", (d, i) => {
        if (points % 6 === 0) {
          return "red";
        } else if (points % 3 === 0) {
          return "blue";
        } else if (points % 2 === 0) {
          return "orange";
        } else return "green";
      })
      .attr("stroke-width", 3)
      .attr("x1", (d) => scale(d.x))
      .attr("y1", (d) => scale(d.y))
      .attr("x2", (d, i, a) => {
        return arr[i + 1] ? scale(arr[i + 1].x) : scale(arr[0].x);
      })
      .attr("y2", (d, i, a) => {
        return arr[i + 1] ? scale(arr[i + 1].y) : scale(arr[0].y);
      });
  };

  return (
    <div className="App">
      <div id="point-input">
        <input
          id="points"
          type="number"
          min={3}
          max={12}
          defaultValue={3}
          onChange={(e) => {
            setPoints(e.target.value);
          }}
          style={{ margin: "10px", fontSize: "24px" }}
        />
      </div>
      <article id="main">
        <div style={{ width: "100%", height: "93vh" }} ref={ref}></div>
        <section id="table">
          <div className="table-row">
            <p>interior angles:</p>
            <p>{data[points - 3].angle}°</p>
          </div>
          <div className="table-row">
            <p>sum of interior angles:</p>
            <p>{data[points - 3].angle * points}°</p>
          </div>
          <div className="table-row">
            <p>length of line segments:</p>
            <p>{data[points - 3].length}</p>
          </div>
          <div className="table-row">
            <p> exterior angles:</p>
            <p>{Math.trunc(360 / points)}°</p>
          </div>
          <div className="table-row">
            <p> exterior angles always add up to 360°!</p>
          </div>
        </section>
      </article>
    </div>
  );
}

export default App;
