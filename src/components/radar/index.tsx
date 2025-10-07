import { useEffect, useState } from "react";

export function Radar() {
  const [pingAngle, setPingAngle] = useState(0);
  const [sweepAngle, setSweepAngle] = useState(-90);
  const [sweepDirection, setSweepDirection] = useState(1);

  useEffect(() => {
    const pingInterval = setInterval(() => {
      setPingAngle(Math.random() * 180 - 90);
    }, 1000);

    const sweepInterval = setInterval(() => {
      setSweepAngle((prev) => {
        const newAngle = prev + 5 * sweepDirection;

        if (newAngle >= 90 && sweepDirection === 1) {
          setSweepDirection(-1);
          return 90;
        } else if (newAngle <= -90 && sweepDirection === -1) {
          setSweepDirection(1);
          return -90;
        }

        return newAngle;
      });
    }, 30);

    return () => {
      clearInterval(pingInterval);
      clearInterval(sweepInterval);
    };
  }, [sweepDirection]);

  const radius = 100;
  const centerX = 120;
  const centerY = 120;

  const angleToCoords = (angle: number, r: number) => {
    const radians = ((-angle + 90) * Math.PI) / 180;
    return {
      x: centerX + r * Math.cos(radians),
      y: centerY - r * Math.sin(radians),
    };
  };

  const angleToMarkerCoords = (angle: number, r: number) => {
    const radians = ((-angle + 90) * Math.PI) / 180;
    return {
      x: centerX + r * Math.cos(radians),
      y: centerY - r * Math.sin(radians),
    };
  };

  const pingCoords = angleToCoords(pingAngle, radius * 0.8);
  const sweepCoords = angleToCoords(sweepAngle, radius);

  return (
    <div
      className="radar-container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#0a0a0a",
        borderRadius: "10px",
        border: "2px solid #00ff00",
      }}
    >
      <div
        style={{
          color: "#00ff00",
          marginBottom: "10px",
          fontFamily: "monospace",
        }}
      >
        RADAR - PING: {Math.round(pingAngle)}°
      </div>

      <svg
        width="240"
        height="140"
        style={{ backgroundColor: "#000", borderRadius: "5px" }}
      >
        <defs>
          <clipPath id="halfCircle">
            <path
              d={`M ${
                centerX - radius
              } ${centerY} A ${radius} ${radius} 0 0 1 ${
                centerX + radius
              } ${centerY} Z`}
            />
          </clipPath>
        </defs>

        <g clipPath="url(#halfCircle)">
          <circle
            cx={centerX}
            cy={centerY}
            r={radius * 0.25}
            fill="none"
            stroke="#00ff0030"
            strokeWidth="1"
          />
          <circle
            cx={centerX}
            cy={centerY}
            r={radius * 0.5}
            fill="none"
            stroke="#00ff0030"
            strokeWidth="1"
          />
          <circle
            cx={centerX}
            cy={centerY}
            r={radius * 0.75}
            fill="none"
            stroke="#00ff0030"
            strokeWidth="1"
          />
          <circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="none"
            stroke="#00ff00"
            strokeWidth="2"
          />
          <line
            x1={centerX - radius}
            y1={centerY}
            x2={centerX + radius}
            y2={centerY}
            stroke="#00ff0030"
            strokeWidth="1"
          />
          <line
            x1={centerX}
            y1={centerY}
            x2={centerX - radius * 0.707}
            y2={centerY - radius * 0.707}
            stroke="#00ff0030"
            strokeWidth="1"
          />
          <line
            x1={centerX}
            y1={centerY}
            x2={centerX + radius * 0.707}
            y2={centerY - radius * 0.707}
            stroke="#00ff0030"
            strokeWidth="1"
          />
          <line
            x1={centerX}
            y1={centerY}
            x2={centerX}
            y2={centerY - radius}
            stroke="#00ff0030"
            strokeWidth="1"
          />
        </g>

        <g clipPath="url(#halfCircle)">
          <line
            x1={centerX}
            y1={centerY}
            x2={sweepCoords.x}
            y2={sweepCoords.y}
            stroke="#00ff0080"
            strokeWidth="2"
          />

          <defs>
            <radialGradient id="sweepGradient" cx="0%" cy="0%">
              <stop offset="0%" stopColor="#00ff0060" />
              <stop offset="100%" stopColor="#00ff0000" />
            </radialGradient>
          </defs>
        </g>

        <g clipPath="url(#halfCircle)">
          <circle
            cx={pingCoords.x}
            cy={pingCoords.y}
            r="4"
            fill="#ff0000"
            opacity="0.8"
          >
            <animate
              attributeName="r"
              values="4;8;4"
              dur="1s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.8;0.3;0.8"
              dur="1s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx={pingCoords.x} cy={pingCoords.y} r="2" fill="#ff0000" />
        </g>

        {[-90, -75, -60, -45, -30, -15, 0, 15, 30, 45, 60, 75, 90].map(
          (angle) => {
            const coords = angleToMarkerCoords(angle, radius + 12);
            return (
              <text
                key={angle}
                x={coords.x}
                y={coords.y}
                fill="#00ff00"
                fontSize="9"
                textAnchor="middle"
                dominantBaseline="middle"
                fontFamily="monospace"
              >
                {angle}°
              </text>
            );
          }
        )}
      </svg>

      <div
        style={{
          color: "#ff0000",
          marginTop: "10px",
          fontFamily: "monospace",
          fontSize: "12px",
        }}
      >
        TARGET DETECTED
      </div>
    </div>
  );
}
