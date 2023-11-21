import { InventarioProduto } from '../../../../types/interfaces';
import apiBackend from '../../../api';

export type getOneProdutoInventarioParam = {
    inventarioId: number;
    id: number;
};

export const getOneProdutoInventario = async ({
    inventarioId,
    id,
}: getOneProdutoInventarioParam): Promise<InventarioProduto> => {
    const result = await apiBackend.get(`/api/v1/inventarios/${inventarioId}/produtos/${id}`);
    return result.data;
};
