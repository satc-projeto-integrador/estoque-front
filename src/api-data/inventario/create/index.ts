import { Inventario, Produto } from '../../../types/interfaces';
import apiBackend from '../../api';

export type CreateInventarioParam = Inventario & {
    produtos?: Produto[];
};

export const createInventario = async (data: CreateInventarioParam): Promise<Inventario> => {
    const result = await apiBackend.post(`/api/v1/inventarios`, data);
    return result.data;
};
