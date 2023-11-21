import { Inventario } from '../../../types/interfaces';
import apiBackend from '../../api';

export const getOneInventario = async (id: number): Promise<Inventario> => {
    const result = await apiBackend.get(`/api/v1/inventarios/${id}`);
    return result.data;
};
