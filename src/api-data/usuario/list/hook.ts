import { listUsuarios } from '.';
import { GetPageOptions, Usuario } from '../../../types/interfaces';
import usePaginator from '../../paginator/hook';

type Params = GetPageOptions & {
    queryKeys?: string[];
};

const useListUsuario = ({ page = 1, rpp = 10, queryKeys = [] }: Params) => {
    return usePaginator<Usuario>({
        queryKey: ['usuarios', ...queryKeys],
        fetch: listUsuarios,
        page,
        rpp,
    });
};

export default useListUsuario;
