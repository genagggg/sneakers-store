import React from "react";
type TInputField = {
label: string
}
const InputFields: React.FC<TInputField> = ({label}) =>{
    return <>
    <label>{label}</label>
    </>
}

export default InputFields;