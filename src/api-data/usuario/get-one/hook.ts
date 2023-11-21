import { UseQueryResult, useQuery } from 'react-query';
import { TipoProduto, Usuario } from '../../../types/interfaces';
import { getOneUsuario } from '.';

const useGetUsuario = (id: number | undefined): UseQueryResult<Usuario | undefined> => {
    return useQuery({
        queryKey: ['usuarios', id],
        queryFn: () => (id ? getOneUsuario(id) : undefined),
    });
};

export default useGetUsuario;
