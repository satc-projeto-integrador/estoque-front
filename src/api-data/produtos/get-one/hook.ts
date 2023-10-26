import { UseQueryResult, useQuery } from 'react-query';
import { getOneProduto } from '.';
import { Produto } from '../../../types/interfaces';

const useGetProduto = (id: number | undefined): UseQueryResult<Produto | undefined> => {
    return useQuery({
        queryKey: ['produtos', id],
        queryFn: () => (id ? getOneProduto(id) : undefined),
    });
};

export default useGetProduto;
