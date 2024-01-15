import React from "react";
import { Link } from "react-router-dom";

const CartEmpty: React.FC = () => {
  return (
    <>
      <div className="cart cart--empty">
        <h2>Корзина пустая</h2>
        <p>Вероятнее всего вы не заказывали ещё пицу</p>
        <Link to="/">Вернуться назад</Link>
      </div>
    </>
  );
};

export default CartEmpty;
