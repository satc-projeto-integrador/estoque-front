import { InventarioProduto } from '../../../../types/interfaces';
import apiBackend from '../../../api';

export type UpdateProdutoInventarioParams = {
    inventarioId: number;
    id: number;
    data: Partial<InventarioProduto>;
};

export const updateProdutoInventario = async ({
    inventarioId,
    id,
    data,
}: UpdateProdutoInventarioParams): Promise<InventarioProduto> => {
    const result = await apiBackend.patch(`/api/v1/inventarios/${inventarioId}/produtos/${id}`, data);
    return result.data;
};
