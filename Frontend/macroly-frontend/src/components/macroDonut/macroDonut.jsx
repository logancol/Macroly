import { useMemo } from "react";
import * as d3 from "d3";

const colors = [
  "#fcfaacff",
  "#d67373ff",
  "#7a99ceff",
];
// https://www.react-graph-gallery.com/donut

function MacroDonut({ nutrition, width=200, height=200 }) {
    const radius = Math.min(width, height) / 2;
    const pie = useMemo(() => {
        const pieGenerator = d3.pie().value(d => d.value);
        return pieGenerator(nutrition);
    }, [nutrition]);

    const arcs = useMemo(() => {
        const arcPathGenerator = d3.arc();
        return pie.map((p) =>
            arcPathGenerator({
                innerRadius: 50,
                outerRadius: radius,
                startAngle: p.startAngle,
                endAngle: p.endAngle,
            })
        );
    }, [radius, pie]);

    return (
    <svg width={width} height={height} style={{ display: "inline-block" }}>
        <g transform={`translate(${width / 2}, ${height / 2})`}>
            {arcs.map((arc, i) => {
            return <path key={i} d={arc} fill={colors[i]} />;
            })}
        </g>
        
    </svg>
    
    );
}

export default MacroDonut;