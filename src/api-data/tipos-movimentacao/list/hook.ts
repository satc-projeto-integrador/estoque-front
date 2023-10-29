import { listTipoMovimentacao } from '.';
import { GetPageOptions, TipoProduto } from '../../../types/interfaces';
import usePaginator from '../../paginator/hook';

type Params = GetPageOptions & {
    queryKeys?: string[];
};

const useListTipoMovimentacao = ({ page = 1, rpp = 10, queryKeys = [] }: Params) => {
    return usePaginator<TipoProduto>({
        queryKey: ['tipos-movimentacao', ...queryKeys],
        fetch: listTipoMovimentacao,
        page,
        rpp,
    });
};

export default useListTipoMovimentacao;
