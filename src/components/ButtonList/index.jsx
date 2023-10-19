import React from "react";
import style from "./ButtonList.module.scss"
const ButtonList =({value, onClickButton})=>{

    const buttons = ["Бургеры", "Нагетсы","Стрипсы","Роллы","Шаурма"];
    
    return(
        < >
            <ul className={style.buttons}>
                {buttons.map((btn,i)=>(
                    <li className={value === i ? style.active :""} onClick={()=>onClickButton(i)} key={i}>{btn}</li>
                ))}
            </ul>
        </>
    )
}

export default ButtonList;