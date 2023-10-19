import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import ButtonList from "../components/ButtonList";

const Home = () => {
  const [items, setItems] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(true);

  const [categoryId, setCategoryId] = React.useState(0);

  const [sortType, setSortType] = React.useState({
    name: "популярности",
    sortProperty: "rating"
  });

  const [checkItem, setCheckItem] = React.useState(0)

  React.useEffect(() => {
    setIsLoading(true)
    fetch(`https://65279f93931d71583df116d9.mockapi.io/items?${categoryId > 0 ? `category=${categoryId}`: ''}&sortBy=${sortType.sortProperty}&order=desc`)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      });
      window.scrollTo(0,0)
  }, [categoryId, sortType]);
console.log(categoryId, sortType)
  return (
    <>
    <div className="container">
      <ButtonList value={checkItem} onClickButton={(i)=>setCheckItem(i)}/>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(i)=>setCategoryId(i)}/>
        <Sort value={sortType} onClickSort={(i)=>setSortType(i)}/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
      </div>
    </>
  );
};

export default Home;
