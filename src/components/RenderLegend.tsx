import React from "react";

interface RenderLegendProps {
  payload: any[];
  hiddenLines: Record<string, boolean>;
  onLegendClick: (dataKey: string) => void;
}

const RenderLegend: React.FC<RenderLegendProps> = ({
  payload,
  hiddenLines,
  onLegendClick,
}) => {
  return (
    <div className="block-flex flex-col gap-1 pt-3">
      {payload.map((entry: any) => {
        const { dataKey, color, value } = entry;
        const isHidden = hiddenLines[dataKey];
        return (
          <div
            key={dataKey}
            style={{ cursor: "pointer" }}
            onClick={() => onLegendClick(dataKey)}
            className="flex items-center"
          >
            <div
              style={{
                width: 12,
                height: 12,
                marginRight: 8,
                backgroundColor: isHidden ? "transparent" : color,
                border: "2px solid black",
              }}
            />
            <span>{value}</span>
          </div>
        );
      })}
    </div>
  );
};

export default RenderLegend;
