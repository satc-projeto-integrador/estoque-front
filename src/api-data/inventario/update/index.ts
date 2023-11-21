import { Inventario } from '../../../types/interfaces';
import apiBackend from '../../api';

export type UpdateInventarioParams = {
    id: number;
    data: Partial<Inventario>;
};

export const updateInventario = async ({ id, data }: UpdateInventarioParams): Promise<Inventario> => {
    const result = await apiBackend.patch(`/api/v1/inventarios/${id}`, data);
    return result.data;
};
