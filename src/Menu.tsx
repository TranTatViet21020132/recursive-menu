import React, { useState } from 'react';
import './Menu.css';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

type item = {
  name: string;
  label: string;
  items?: item[];
};

type itemsProp = {
  items: item[];
};

type selectedItem = {
  parentIndex: number;
  childIndex: number;
};

const Menu: React.FC<itemsProp> = ({ items }) => {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [chosenItems, setChosenItems] = useState<selectedItem[]>([]);

  // for multiple parent choose
  const handleExpand = (index: number) => {
    if (expandedItems.includes(index)) {
      setExpandedItems(expandedItems.filter(itemIndex => itemIndex !== index));
    } else {
      setExpandedItems([...expandedItems, index]);
    }
  };

  // for single parent choose
  // const handleExpand = (index: number) => {
  //   if (expandedItems.includes(index)) {
  //     setExpandedItems([]);
  //   } else {
  //     setExpandedItems([index]);
  //   }
  // };

  const handleChosen = (parentIndex: number, childIndex: number) => {
    const selectedItem: selectedItem = { parentIndex, childIndex };
    if (chosenItems.length > 0) {
      if (chosenItems[0].parentIndex === parentIndex && chosenItems[0].childIndex === childIndex) {
        setChosenItems([]);
      } else {
        setChosenItems([selectedItem]);
      }
    } else {
      setChosenItems([selectedItem]);
    }
  };

  return (
    <div className="Menu">
      <div className="menu-header">
        <div className="menu-header-logo">
          <span>M</span>
        </div>
        <div className="menu-header-label">
          <div className="menu-header-label top">
            <h4>Side Menu Level 1</h4>
          </div>
          <div className="menu-header-label bot">
            <h5>Side Menu Level 1</h5>
          </div>
        </div>
      </div>
      <div className="menu-content">
        <ul className="menu-content-parents">
          {items.map((parentItem, parentIndex) => (
            <li className="parents-item" key={parentIndex}>
              <div
                className={`menu-option ${
                  parentItem.items && parentItem.items.length > 0 ? (
                    expandedItems.includes(parentIndex) ? 'expanded' : ''
                  ) : (
                    chosenItems.some((item) => item.parentIndex === parentIndex && item.childIndex === -1)
                      ? 'chosen'
                      : ''
                  )
                }`}
                onClick={() => {
                  if (parentItem.items && parentItem.items.length > 0) {
                    handleExpand(parentIndex);
                  } else {
                    handleChosen(parentIndex, -1);
                  }
                }}
              >
                <span>{parentItem.label}</span>
                {parentItem.items && parentItem.items.length > 0 ? (
                  expandedItems.includes(parentIndex) ? (
                    <BsChevronUp />
                  ) : (
                    <BsChevronDown />
                  )
                ) : null}
              </div>
              {parentItem.items && (
                <ul className="menu-content-children">
                  {parentItem.items.map((childItem, childIndex) => (
                    <li
                      className={`children-item ${
                        chosenItems.some(
                          (item) => item.parentIndex === parentIndex && item.childIndex === childIndex
                        )
                          ? 'chosen'
                          : ''
                      }`}
                      onClick={() => handleChosen(parentIndex, childIndex)}
                      key={childIndex}
                    >
                      <span>{childItem.label}</span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
