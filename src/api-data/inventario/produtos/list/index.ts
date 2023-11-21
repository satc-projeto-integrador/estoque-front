import { GetPageOptions, InventarioProduto, Page } from '../../../../types/interfaces';
import apiBackend from '../../../api';

export type ListInventarioResult = Page<InventarioProduto>;
export type ListInventarioParams = GetPageOptions & {
    inventarioId?: number;
    q?: string;
};

export const listProdutosInventario = async ({
    inventarioId,
    ...params
}: ListInventarioParams): Promise<ListInventarioResult> => {
    const result = await apiBackend.get(`/api/v1/inventarios/${inventarioId}/produtos`, { params });
    return result.data;
};
