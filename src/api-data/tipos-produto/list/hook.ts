import { listTipoProduto } from '.';
import { GetPageOptions, TipoProduto } from '../../../types/interfaces';
import usePaginator from '../../paginator/hook';

type Params = GetPageOptions & {
    queryKeys?: string[];
};

const useListTipoProduto = ({ page = 1, rpp = 10, queryKeys = [] }: Params) => {
    return usePaginator<TipoProduto>({
        queryKey: ['tipos-produtos', ...queryKeys],
        fetch: listTipoProduto,
        page,
        rpp,
    });
};

export default useListTipoProduto;
