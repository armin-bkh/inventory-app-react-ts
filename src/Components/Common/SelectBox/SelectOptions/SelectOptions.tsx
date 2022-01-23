import { filters } from "../../../Provider/InventoryProvider.type";
import styles from '../SelectBox.module.scss';

interface selectOptionsProps {
  options: filters[];
  onSelect: (selectedOption: filters) => void;
}

const SelectOptions = ({ options, onSelect }: selectOptionsProps) => {
  return (
    <div className={styles.selectOptions}>
      {options.length > 0 && (
        <ul>
          {options.map((option) => (
            <li className={styles.selectOptionsItem} key={option.id} onClick={()=> onSelect(option)}>{option.label}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectOptions;
