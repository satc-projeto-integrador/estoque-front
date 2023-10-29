import { UseQueryResult, useQuery } from 'react-query';
import { TipoProduto } from '../../../types/interfaces';
import { getOneTipoProduto } from '.';

const useGetTipoProduto = (id: number | undefined): UseQueryResult<TipoProduto | undefined> => {
    return useQuery({
        queryKey: ['tipos-produtos', id],
        queryFn: () => (id ? getOneTipoProduto(id) : undefined),
    });
};

export default useGetTipoProduto;
