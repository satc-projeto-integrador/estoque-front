import { UseQueryResult, useQuery } from 'react-query';
import { Movimentacao } from '../../../types/interfaces';
import { getOneMovimentacao } from '.';

const useGetMovimentacao = (id: number | undefined): UseQueryResult<Movimentacao | undefined> => {
    return useQuery({
        queryKey: ['movimentacao', id],
        queryFn: () => (id ? getOneMovimentacao(id) : undefined),
    });
};

export default useGetMovimentacao;
