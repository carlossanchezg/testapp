import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

const MenuIcon = ({
  elementName,
  iconColor,
  onClickMenuIcon,
  onClickDelete,
  onClickEdit,
  noPaddingRight,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        paddingRight: noPaddingRight ? 0 : 25,
      }}
    >
      <Menu
        menuButton={
          <MenuButton>
            <FontAwesomeIcon
              icon="ellipsis-v"
              color={iconColor}
              size="lg"
              onClick={onClickMenuIcon}
            />
          </MenuButton>
        }
        transition
      >
        <MenuItem onClick={onClickDelete}>Delete {elementName}</MenuItem>
        <MenuItem onClick={onClickEdit}>Edit {elementName}</MenuItem>
      </Menu>
    </div>
  );
};

export default MenuIcon;
