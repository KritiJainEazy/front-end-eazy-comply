import React from "react";
import { activeStatus } from "./constants";
import Box from "../../atoms/box.atom";

export const ActiveStatus = ({ status = "", mr = "" }) => {
  let statusColor;

  switch (status.toLowerCase()) {
    case activeStatus?.ACTIVE?.value?.toLowerCase():
      statusColor = activeStatus?.ACTIVE?.color;
      break;
    case activeStatus?.INACTIVE?.value?.toLowerCase():
      statusColor = activeStatus?.INACTIVE?.color;
      break;
    case activeStatus?.PENDING?.value?.toLowerCase():
      statusColor = activeStatus?.PENDING?.color;
      break;
    default:
      statusColor = "rgb(104,104,104)";
  }

  return (
    <Box display="flex" alignItems="center">
      <Box
        width="0.4em"
        height="0.4em"
        borderRadius="50%"
        backgroundColor={statusColor}
        mr={mr}
      ></Box>
    </Box>
  );
};
