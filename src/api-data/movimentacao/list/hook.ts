import { listMovimentacao } from '.';
import { GetPageOptions, Movimentacao } from '../../../types/interfaces';
import usePaginator from '../../paginator/hook';

type Params = GetPageOptions & {
    queryKeys?: string[];
};

const useListMovimentacao = ({ page = 1, rpp = 10, queryKeys = [] }: Params) => {
    return usePaginator<Movimentacao>({
        queryKey: ['movimentacao', ...queryKeys],
        fetch: listMovimentacao,
        page,
        rpp,
    });
};

export default useListMovimentacao;
