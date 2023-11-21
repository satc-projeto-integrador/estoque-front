import { listProdutosInventario } from '.';
import { GetPageOptions, InventarioProduto } from '../../../../types/interfaces';
import usePaginator from '../../../paginator/hook';

type Params = GetPageOptions & {
    inventarioId: number;
    queryKeys?: string[];
};

const useListProdutosInventario = ({ inventarioId, page = 1, rpp = 10, queryKeys = [] }: Params) => {
    return usePaginator<InventarioProduto>({
        queryKey: ['inventarios-produtos', ...queryKeys],
        fetch: listProdutosInventario,
        page,
        rpp,
        defaultParams: { inventarioId },
    });
};

export default useListProdutosInventario;
