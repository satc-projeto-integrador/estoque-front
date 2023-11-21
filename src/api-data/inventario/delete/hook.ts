import { notification } from 'antd';
import { useMutation, useQueryClient } from 'react-query';
import { removeInventario } from '.';

const useDeleteInventario = (options?: Record<string, unknown>) => {
    const queryClient = useQueryClient();
    const mutation = useMutation(async (id: number) => removeInventario(id), {
        ...options,
        onSuccess: async (_, params) => {
            await queryClient.invalidateQueries('inventarios');
            await queryClient.invalidateQueries(['inventario', params]);
            notification.success({ message: 'Inventário excluído com sucesso' });
        },
        onError: () => {
            notification.error({
                message: `Erro ao excluir Inventário`,
            });
        },
    });
    return (id: number) => mutation.mutateAsync(id);
};

export default useDeleteInventario;
