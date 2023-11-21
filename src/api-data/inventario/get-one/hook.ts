import { UseQueryResult, useQuery } from 'react-query';
import { Inventario } from '../../../types/interfaces';
import { getOneInventario } from '.';

const useGetInventario = (id: number | undefined): UseQueryResult<Inventario | undefined> => {
    return useQuery({
        queryKey: ['inventario', id],
        queryFn: () => (id ? getOneInventario(id) : undefined),
    });
};

export default useGetInventario;
