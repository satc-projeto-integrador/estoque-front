import { listInventario } from '.';
import { GetPageOptions, Inventario } from '../../../types/interfaces';
import usePaginator from '../../paginator/hook';

type Params = GetPageOptions & {
    queryKeys?: string[];
};

const useListInventario = ({ page = 1, rpp = 10, queryKeys = [] }: Params) => {
    return usePaginator<Inventario>({
        queryKey: ['inventarios', ...queryKeys],
        fetch: listInventario,
        page,
        rpp,
    });
};

export default useListInventario;
