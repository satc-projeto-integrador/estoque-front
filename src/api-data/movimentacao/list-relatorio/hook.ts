import { listRelatorioMovimentacao } from '.';
import { GetPageOptions, Movimentacao } from '../../../types/interfaces';
import usePaginator from '../../paginator/hook';

type Params = GetPageOptions & {
    queryKeys?: string[];
};

const useListRelatorioMovimentacao = ({ page = 1, rpp = 10, queryKeys = [] }: Params) => {
    return usePaginator<Movimentacao>({
        queryKey: ['relatorio-movimentacao', ...queryKeys],
        fetch: listRelatorioMovimentacao,
        page,
        rpp,
    });
};

export default useListRelatorioMovimentacao;
