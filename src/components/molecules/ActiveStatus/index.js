import React from "react";
import { activeStatus } from "./constants";
import Box from "../../atoms/box.atom";

export const ActiveStatus = ({ status = "", mr = "" }) => {
  let statusColor;
  let statusTitle;

  switch (status) {
    case activeStatus?.ACTIVE?.value:
      statusColor = activeStatus?.ACTIVE?.color;
      statusTitle = activeStatus?.ACTIVE?.title;
      break;
    case activeStatus?.INACTIVE?.value:
      statusColor = activeStatus?.INACTIVE?.color;
      statusTitle = activeStatus?.INACTIVE?.title;
      break;
    default:
      statusColor = activeStatus?.DEFAULT?.color;
      statusTitle = activeStatus?.DEFAULT?.title;
      break;
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
    >
      <Box
        width="0.4em"
        height="0.4em"
        borderRadius="50%"
        backgroundColor={statusColor}
        mr={mr}
      />
      <Box>{statusTitle}</Box>
    </Box>
  );
};
