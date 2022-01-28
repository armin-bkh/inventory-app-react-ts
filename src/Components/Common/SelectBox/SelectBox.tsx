import React, { useEffect, useRef, useState } from "react";
import { filters } from "../../Provider/InventoryProvider.type";
import styles from "./SelectBox.module.scss";
import SelectOptions from "./SelectOptions/SelectOptions";

interface selectBoxProps {
  width?: number | string;
  placeholder?: string;
  value: string;
  onChange: (selectedOption: filters) => void;
  options: filters[];
  onBlur?: () => void;
}

const SelectBox = ({
  value,
  onChange,
  onBlur,
  options,
  width,
  placeholder,
}: selectBoxProps) => {
  const [inputValue, setInputValue] = useState<string>(value || "");
  const [isShow, setIsShow] = useState<boolean>(false);
  const optionsRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    function handleCloseOptions(e: any) {
      if (optionsRef.current && !optionsRef.current.contains(e.target)) {
        setIsShow(false);
      }
    }

    document.addEventListener("mousedown", handleCloseOptions);
    return () => {
      document.removeEventListener("mousedown", handleCloseOptions);
    };
  }, [optionsRef]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const selectOptionHandler = (selectedOption: filters) => {
    setInputValue(selectedOption.label);
    onChange(selectedOption);
    setIsShow(false);
  };

  return (
    <div ref={optionsRef} className={styles.selectBox}>
      <div>
        <input
          onFocus={() => setIsShow(true)}
          style={{ width }}
          className={styles.selectBoxInput}
          type="text"
          value={inputValue}
          onChange={()=> setInputValue(inputValue)}
          onBlur={onBlur}
          placeholder={placeholder || "Select..."}
        />
      </div>
      {isShow && options.length > 0 && (
        <SelectOptions onSelect={selectOptionHandler} options={options} />
      )}
    </div>
  );
};
export default SelectBox;
