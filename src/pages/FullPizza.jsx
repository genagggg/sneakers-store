import axios from "axios";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const FullPizza = () => {
  const [pizza, setPizza] = React.useState();
  const { id } = useParams();
  const navigate = useNavigate();
  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://65279f93931d71583df116d9.mockapi.io/items/${id}`
        );
        setPizza(data);
      } catch (error) {
        alert("Ошибка при получении пиццы!");
        navigate("/");
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return "Загрузка...";
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <h2> {pizza.title}</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo quas velit
        rerum voluptatibus at aliquam expedita atque, repudiandae iste cum
        minima magnam earum praesentium quia vel accusantium ipsa eveniet.
        Eaque!
      </p>
      <h4>{pizza.price} Руб</h4>
    </div>
  );
};

export default FullPizza;
