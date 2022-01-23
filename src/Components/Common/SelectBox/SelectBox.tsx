import React, { useState } from "react";
import { filters } from "../../Provider/InventoryProvider.type";

interface selectBoxProps {
    value: string,
    onChange: (selectedOption: filters) => void,
    options: filters[];
}

const SelectBox = ({ value, onChange, options }: selectBoxProps) => {
    const [inputValue, setInputValue] = useState<string>(value || '');

    const changeOptionHandler = (selectedOption: filters) => {
        setInputValue(selectedOption.label);
        onChange(selectedOption);
    }

    return (
        <div>
            <div>
                <input type="text" value={inputValue} onChange={(e)=> setInputValue(e.target.value)}/>
            </div>
            <div>
                {options.map(option => <div onClick={()=> changeOptionHandler(option)} key={option.id}>{option.label}</div>)}
            </div>
        </div>
    )
}
export default SelectBox;