import { UseQueryResult, useQuery } from 'react-query';
import { TipoMovimentacao } from '../../../types/interfaces';
import { getOneTipoMovimentacao } from '.';

const useGetTipoMovimentacao = (id: number | undefined): UseQueryResult<TipoMovimentacao | undefined> => {
    return useQuery({
        queryKey: ['tipos-movimentacao', id],
        queryFn: () => (id ? getOneTipoMovimentacao(id) : undefined),
    });
};

export default useGetTipoMovimentacao;
