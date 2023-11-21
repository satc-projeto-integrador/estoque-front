import { TipoProduto, Usuario } from '../../../types/interfaces';
import apiBackend from '../../api';

export const getOneUsuario = async (id: number): Promise<Usuario> => {
    const result = await apiBackend.get(`/api/v1/usuarios/${id}`);
    return result.data;
};
