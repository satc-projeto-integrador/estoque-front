import { GetPageOptions, Movimentacao, SaldoProduto } from '../../../types/interfaces';
import usePaginator from '../../paginator/hook';
import { listRelatorioSaldo } from '.';

type Params = GetPageOptions & {
    queryKeys?: string[];
};

const useListRelatorioSaldo = ({ page = 1, rpp = 10, queryKeys = [] }: Params) => {
    return usePaginator<any>({
        queryKey: ['relatorio-movimentacao', ...queryKeys],
        fetch: listRelatorioSaldo,
        page,
        rpp,
    });
};

export default useListRelatorioSaldo;