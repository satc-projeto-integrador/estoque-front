import { listSaldo } from '.';
import { GetPageOptions, SaldoProduto } from '../../../types/interfaces';
import usePaginator from '../../paginator/hook';

type Params = GetPageOptions & {
    queryKeys?: string[];
};

const useListSaldo = ({ page = 1, rpp = 10, queryKeys = [] }: Params) => {
    return usePaginator<SaldoProduto>({
        queryKey: ['saldo', ...queryKeys],
        fetch: listSaldo,
        page,
        rpp,
    });
};

export default useListSaldo;
