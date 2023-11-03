import React from "react";
import { ActionMenuIcons, ActionMenuContainer } from "./styles.action-menu";

export const ActionMenu = ({ actionMenuItems = [] }) => {
  return (
    <ActionMenuContainer>
      {actionMenuItems.map((actionMenuItem, index) => {
        return (
          <ActionMenuIcons
            key={`action-menu-index-${index}`}
            src={actionMenuItem?.src}
            onClick={actionMenuItem?.handler}
          />
        );
      })}
    </ActionMenuContainer>
  );
};
