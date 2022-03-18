import React, { FunctionComponent, useEffect, useState } from "react";
import { Category, SimpleModuleProps } from "./Options";

type CartProps = {
  cart: SimpleModuleProps[];
};

export const displayCost = (cost: number) => {
  return cost >= 0 ? `+${cost}€` : `${cost}€`;
};

type Pair<T> = {
  left: T;
  right: T;
};

export const Cart: FunctionComponent<CartProps> = ({ cart }) => {
  const [totalCost, setTotalCost] = useState<number>(0);

  const categoryOrdering = [
    Category.BasePrice,
    Category.Color,
    Category.Power,
    Category.WarpDrive,
    Category.OptionPackage,
  ];

  const calculateTotalCost = (cart: SimpleModuleProps[]) => {
    return cart.reduce(
      (totalCost, module: SimpleModuleProps) => totalCost + module.cost,
      0
    );
  };

  const displayCart = (cart: SimpleModuleProps[]): Pair<JSX.Element[]> => {
    const sortedCart = cart.sort((a, b) =>
      categoryOrdering.findIndex((el) => el === a.category) <
      categoryOrdering.findIndex((el) => el === b.category)
        ? -1
        : 1
    );
    const items: JSX.Element[] = [];
    const costs: JSX.Element[] = [];

    sortedCart.forEach((m, index) => {
      items.push(<span className="item">{m.category}:</span>);
      costs.push(
        <span className="cost">
          {m.category === "Base price" ? `${m.cost}€` : displayCost(m.cost)}
        </span>
      );
    });

    return { left: items, right: costs };
  };

  useEffect(() => setTotalCost(calculateTotalCost(cart)), [cart]);

  const { left: items, right: costs } = displayCart(cart);

  return (
    <div className="cart-container">
      <div className="cart">
        <div className="items">{items}</div>
        <div className="costs">{costs}</div>
        <hr />
        <div className="total items">
          <span className="item">Total:</span>
        </div>
        <div className="total costs">
          <span className="cost">{totalCost}€</span>
        </div>
      </div>
    </div>
  );
};
