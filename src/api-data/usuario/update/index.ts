import { Produto, TipoProduto, Usuario } from '../../../types/interfaces';
import apiBackend from '../../api';

export type UpdateParams = {
    id: number;
    data: Partial<Usuario>;
};

export const updateUsuario = async ({ id, data }: UpdateParams): Promise<Usuario> => {
    const result = await apiBackend.patch(`/api/v1/usuarios/${id}`, data);
    return result.data;
};
