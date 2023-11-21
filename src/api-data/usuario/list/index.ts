import { Page, Usuario, GetPageOptions } from '../../../types/interfaces';
import apiBackend from '../../api';

export type ListUsuarioResult = Page<Usuario>;
export type ListUsuarioParams = GetPageOptions & {
    q?: string;
};

export const listUsuarios = async (params: ListUsuarioParams): Promise<ListUsuarioResult> => {
    const result = await apiBackend.get('/api/v1/usuarios', { params });
    return result.data;
};
