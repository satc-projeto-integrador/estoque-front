import { listSaldoBaixo } from '.';
import { GetPageOptions, SaldoProduto } from '../../../types/interfaces';
import usePaginator from '../../paginator/hook';

type Params = GetPageOptions & {
    queryKeys?: string[];
};

const useListSaldoBaixo = ({ page = 1, rpp = 10, queryKeys = [] }: Params) => {
    return usePaginator<SaldoProduto>({
        queryKey: ['saldo-baixo', ...queryKeys],
        fetch: listSaldoBaixo,
        page,
        rpp,
    });
};

export default useListSaldoBaixo;
