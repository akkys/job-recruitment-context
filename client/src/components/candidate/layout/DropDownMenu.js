import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

const DropDownMenu = (props) => {
  const { sortByHighToLow } = props;
  return (
    <Dropdown>
      <DropdownButton
        id="price-dropdown"
        variant="dark"
        title="Sort By Salary"
        size="md"
      >
        {/* <Dropdown.Item id="price-dropdown" onClick={sortBy}>
                        Default
                      </Dropdown.Item> */}
        {/* <Dropdown.Item id="price-dropdown" onClick={greaterThan}>
                        Lowest To Highest
                      </Dropdown.Item> */}

        <Dropdown.Item id="price-dropdown" onClick={sortByHighToLow}>
          Highest To Lowest
        </Dropdown.Item>
      </DropdownButton>
    </Dropdown>
  );
};

export default DropDownMenu;
