import React from "react";
import qs from 'qs';
import {list} from "../components/Sort"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import ButtonList from "../components/ButtonList";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId, setPageCount, setFilters } from "../redux/slises/filterSlice";

const Home = () => {
  const navigate = useNavigate()
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const { searchValue } = React.useContext(SearchContext);

  const [items, setItems] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(true);

  const [checkItem, setCheckItem] = React.useState(0);

  const fetchPizzas = ()=>{
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    // fetch(
    //   `https://65279f93931d71583df116d9.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    // )
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((json) => {
    //     setItems(json);
    //     setIsLoading(false);
    //   });

    axios
      .get(
        `https://65279f93931d71583df116d9.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then(response =>{
        setItems(response.data);
         setIsLoading(false);
      });
  }

  React.useEffect(()=>{
    if(isMounted.current){
const queryString = qs.stringify({
  sortProperty: sort.sortProperty,
  categoryId,
  currentPage,
});
navigate(`?${queryString}`)
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage])

  React.useEffect(() => {
if(window.location.search){
const params = qs.parse(window.location.search.substring(1))

const sort = list.find(obj => obj.sortProperty === params.sortProperty)

dispatch(setFilters({
  ...params,
  sort
}))
isSearch.current = true
}
  }, []);



  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  const onChangePage = number =>{
dispatch(setPageCount(number))
  }

  React.useEffect(() => {
    setIsLoading(true);
    window.scrollTo(0, 0);

    if(!isSearch.current){
      fetchPizzas();
    }
    isSearch.current=false
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  return (
    <>
      <div className="container">
        <ButtonList value={checkItem} onClickButton={(i) => setCheckItem(i)} />
        <div className="content__top">
          <Categories value={categoryId} onClickCategory={onClickCategory} />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">{isLoading ? skeletons : pizzas}</div>
        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
    </>
  );
};

export default Home;
