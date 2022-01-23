import React, { useEffect, useRef, useState } from "react";
import { string } from "yup";
import { filters } from "../../Provider/InventoryProvider.type";
import styles from "./SelectBox.module.scss";
import SelectOptions from "./SelectOptions/SelectOptions";

interface selectBoxProps {
  width?: number | string;
  value: string;
  onChange: (selectedOption: filters) => void;
  options: filters[];
}

const SelectBox = ({ value, onChange, options, width }: selectBoxProps) => {
  const [inputValue, setInputValue] = useState<string>(value || "");
  const [isShow, setIsShow] = useState<boolean>(false);
  const optionsRef = useRef<HTMLDivElement>(null!);

    useEffect(()=> {
        function handleCloseOptions(e: any){
            if(optionsRef.current && !optionsRef.current.contains(e.target)){
                setIsShow(false)
            }
        }

        document.addEventListener("mousedown", handleCloseOptions);
        return () => {
            document.removeEventListener("mousedown", handleCloseOptions);
        };
    }, [optionsRef])

  const selectOptionHandler = (selectedOption: filters) => {
    setInputValue(selectedOption.label);
    onChange(selectedOption);
    setIsShow(false);
  };

  return (
    <div ref={optionsRef} className={styles.selectBox}>
      <div>
        <input
            onClick={()=> setIsShow(true)}
          style={{ width }}
          className={styles.selectBoxInput}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      {isShow && <SelectOptions onSelect={selectOptionHandler} options={options} />}
    </div>
  );
};
export default SelectBox;
