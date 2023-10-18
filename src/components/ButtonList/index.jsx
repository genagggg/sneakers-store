import React from "react";
import style from "./ButtonList.module.scss"
const ButtonList =()=>{
const [checkItem, setCheckItem] = React.useState(0)
    const buttons = ["Бургеры", "Нагетсы","Стрипсы","Роллы","Шаурма"];
    console.log(checkItem)
    return(
        < >
            <ul className={style.buttons}>
                {buttons.map((btn,i)=>(
                    <li className={checkItem === i ? style.active :""} onClick={()=>setCheckItem(i)} key={i}>{btn}</li>
                ))}
            </ul>
        </>
    )
}

export default ButtonList;