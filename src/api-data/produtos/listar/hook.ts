import { listarProdutos } from '.';
import { GetPageOptions, Produto } from '../../../types/interfaces';
import usePaginator from '../../paginator/hook';

type Params = GetPageOptions & {
    queryKeys?: string[];
};

const useListarProdutos = ({ page = 1, rpp = 10, queryKeys = [] }: Params) => {
    return usePaginator<Produto>({
        queryKey: ['produtos', ...queryKeys],
        fetch: listarProdutos,
        page,
        rpp,
    });
};

export default useListarProdutos;
