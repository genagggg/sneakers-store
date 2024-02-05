import React from "react";
import qs from "qs";
import { list } from "../components/Sort";
import { Link, useNavigate } from "react-router-dom";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import ButtonList from "../components/ButtonList";
import Pagination from "../components/Pagination";
import { useSelector } from "react-redux";
import {
  setCategoryId,
  setPageCount,
  setFilters,
  selectFilter,
} from "../redux/slises/filterSlice";
import {
  SearchPizzaParams,
  fetchPizzas,
  selectPizzaItems,
} from "../redux/slises/pizzaSlice";
import { useAppDispatch } from "../redux/store";

const Home = () => {

  const navigate = useNavigate();
 
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter)
  const { items, status } = useSelector(selectPizzaItems);
  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const onClickCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  },[])

  const [checkItem, setCheckItem] = React.useState(0);

  const getPizzas = () => {
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
      })
    );
  };

  // React.useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       sortProperty: sort.sortProperty,
  //       categoryId,
  //       currentPage,
  //     });
  //     navigate(`?${queryString}`);
  //   }
  //   isMounted.current = true;
  // }, [categoryId, sort.sortProperty, currentPage]);

  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;

  //     const sort = list.find((obj) => obj.sortProperty === params.sortBy);
     
  //     dispatch(setFilters(
  //       {
  //         searchValue: params.search,
  //         categoryId: Number(params.category),
  //         currentPage: Number(params.currentPage),
  //         sort: sort || list[0],
  //       }
  //     ));
  //     isSearch.current = true;
  //   }
  // }, []);

  const pizzas = items.map((obj: any) => (
    
      <PizzaBlock key={obj.id} {...obj} />
  
  ));

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  const onChangePage = (number: number) => {
    dispatch(setPageCount(number));
  };

  React.useEffect(() => {
      getPizzas(); 
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  return (
    <>
      <div className="container">
        <ButtonList value={checkItem} onClickButton={(i) => setCheckItem(i)} />
        <div className="content__top">
          <Categories value={categoryId} onClickCategory={onClickCategory} />
          <Sort value={sort}/>
        </div>
        <h2 className="content__title">Все пиццы</h2>

        {status === "error" ? (
          <div>
            <h2>Произошла ошибка!</h2>
            <p>К сожалению не удалось получить Питсы!!</p>
          </div>
        ) : (
          <div className="content__items">
            {status === "loading" ? skeletons : pizzas}
          </div>
        )}

        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
    </>
  );
};

export default Home;
