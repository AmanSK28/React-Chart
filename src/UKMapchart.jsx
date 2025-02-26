// src/UKMapChart.jsx
import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { geoCentroid } from "d3-geo";
import { scaleQuantize } from "d3-scale";

// Path to your new UK GeoJSON file (must be in public/ folder)
const geoUrl = "/uk-region.geojson";

// Define a color scale for job percentages (0% to 100%)
const colorScale = scaleQuantize()
  .domain([0, 100])
  .range(["#D6EAF8", "#AED6F1", "#5DADE2"]);

export default function UKMapChart({ regionData }) {
  // regionData example: { ENG: 60, SCT: 20, WLS: 15, NIR: 5 }
  return (
    <ComposableMap projection="geoMercator" projectionConfig={{ scale: 1500, center: [-2, 55] }}>
      <Geographies geography={geoUrl}>
        {({ geographies, projection }) =>
          geographies.map((geo) => {
            // The property in your GeoJSON is "CTRY21NM"
            const regionName = geo.properties.CTRY21NM; // e.g. "England", "Scotland", "Wales", "Northern Ireland"
            let regionKey = "";

            // Match regionName to your regionData keys
            switch (regionName) {
              case "England":
                regionKey = "ENG";
                break;
              case "Scotland":
                regionKey = "SCT";
                break;
              case "Wales":
                regionKey = "WLS";
                break;
              case "Northern Ireland":
                regionKey = "NIR";
                break;
              default:
                regionKey = ""; // For any unexpected features
            }

            // Get the corresponding percentage value, default to 0
            const value = regionKey ? parseFloat(regionData[regionKey]) || 0 : 0;
            const fillColor = colorScale(value);

            // Compute centroid for label placement
            const centroid = projection(geoCentroid(geo));

            return (
              <React.Fragment key={geo.rsmKey}>
                <Geography
                  geography={geo}
                  fill={fillColor}
                  stroke="#FFFFFF"
                  style={{
                    default: { outline: "none" },
                    hover: { fill: "#FFCDD2", outline: "none" },
                    pressed: { outline: "none" },
                  }}
                />
                {centroid && (
                  <text
                    x={centroid[0]}
                    y={centroid[1]}
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    style={{ fontSize: 12, fill: "#000", pointerEvents: "none" }}
                  >
                    {value > 0 ? `${value}%` : ""}
                  </text>
                )}
              </React.Fragment>
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
}
