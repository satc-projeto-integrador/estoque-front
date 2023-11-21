import { notification } from 'antd';
import { useMutation, useQueryClient } from 'react-query';

import { Inventario } from '../../../types/interfaces';
import { UpdateInventarioParams, updateInventario } from '.';

const useUpdateInventario = (options?: Record<string, unknown>) => {
    const queryClient = useQueryClient();
    const mutation = useMutation(async (params: UpdateInventarioParams) => updateInventario(params), {
        ...options,
        onSuccess: async (_, params) => {
            await queryClient.invalidateQueries('inventarios');
            await queryClient.invalidateQueries(['inventario', params.id]);
            notification.success({ message: 'Inventário atualizado com sucesso' });
        },
        onError: () => {
            notification.error({
                message: `Erro ao atualizar Inventário`,
            });
        },
    });
    return (id: number, data: Partial<Inventario>) => mutation.mutateAsync({ id, data });
};

export default useUpdateInventario;
