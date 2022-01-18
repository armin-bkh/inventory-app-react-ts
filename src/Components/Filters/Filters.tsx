import { useInventoryActions } from '../Provider/InventoryProvider';
import FilterForm from './FilterForm/FilterForm';
import FiltersList from './FiltersList/FiltersList';

const Filters = () => {
    const { removeFilterHandler } = useInventoryActions();
    return (
        <section>
            <FiltersList onDelete={removeFilterHandler} />
            <FilterForm />
        </section>
    )
}

export default Filters;