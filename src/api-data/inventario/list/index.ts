import { GetPageOptions, Inventario, Page } from '../../../types/interfaces';
import apiBackend from '../../api';

export type ListInventarioResult = Page<Inventario>;
export type ListInventarioParams = GetPageOptions & {
    q?: string;
};

export const listInventario = async (params: ListInventarioParams): Promise<ListInventarioResult> => {
    const result = await apiBackend.get('/api/v1/inventarios', { params });
    return result.data;
};
