import { UseQueryResult, useQuery } from 'react-query';
import { getOneProdutoInventario, getOneProdutoInventarioParam } from '.';
import { InventarioProduto } from '../../../../types/interfaces';

const useGetProdutoInventario = ({
    inventarioId,
    id,
}: getOneProdutoInventarioParam): UseQueryResult<InventarioProduto | undefined> => {
    return useQuery({
        queryKey: ['inventarios-produto', id],
        queryFn: () => (id ? getOneProdutoInventario({ inventarioId, id }) : undefined),
    });
};

export default useGetProdutoInventario;
