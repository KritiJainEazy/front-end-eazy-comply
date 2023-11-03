import React from "react";

export const StatusIcon = ({ statusColor = "", width = "", height = "" }) => {
  return (
    <Box width={width} height={height} backgroundColor={statusColor} borderRadius="50%"></Box>
  );
};
