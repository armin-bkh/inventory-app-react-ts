import { useState } from 'react';
import { useInventoryActions } from '../Provider/InventoryProvider';
import { filters } from '../Provider/InventoryProvider.type';
import FilterForm from './FilterForm/FilterForm';
import FiltersList from './FiltersList/FiltersList';

const Filters = () => {
    const [edit, setEdit] = useState<number | null>(null);
    const { removeFilterHandler, editFilterHandler } = useInventoryActions();

    const setEditHandler = (id: number) => {
        setEdit(id);
    }

    const submitEditHandler = (filter: string) => {
        if(edit) editFilterHandler(edit, filter);
        setEdit(null);
    }

    return (
        <section>
            <FiltersList onDelete={removeFilterHandler} onEdit={setEditHandler} />
            <FilterForm id={edit} handleEdit={submitEditHandler} />
        </section>
    )
}

export default Filters;