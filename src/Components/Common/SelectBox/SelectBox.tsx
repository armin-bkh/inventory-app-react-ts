import { useState } from "react";
import { string } from "yup";
import { filters } from "../../Provider/InventoryProvider.type";
import styles from './SelectBox.module.scss';

interface selectBoxProps {
    width?: number | string,
    value: string,
    onChange: (selectedOption: filters) => void,
    options: filters[];
}

const SelectBox = ({ value, onChange, options, width }: selectBoxProps) => {
    const [inputValue, setInputValue] = useState<string>(value || '');

    const changeOptionHandler = (selectedOption: filters) => {
        setInputValue(selectedOption.label);
        onChange(selectedOption);
    }

    return (
        <div className={styles.selectBox}>
            <div>
                <input style={{ width }} className={styles.selectBoxInput} type="text" value={inputValue} onChange={(e)=> setInputValue(e.target.value)}/>
            </div>
            <div>
                {options.map(option => <div onClick={()=> changeOptionHandler(option)} key={option.id}>{option.label}</div>)}
            </div>
        </div>
    )
}
export default SelectBox;