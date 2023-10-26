import { Produto } from '../../../types/interfaces';
import apiBackend from '../../api';

export const getOneProduto = async (id: number): Promise<Produto> => {
    const result = await apiBackend.get(`/api/v1/produtos/${id}`);
    return result.data;
};
