import { notification } from 'antd';
import { useMutation, useQueryClient } from 'react-query';
import { CreateInventarioParam, createInventario } from '.';

const useCreateInventario = (options?: Record<string, unknown>) => {
    const queryClient = useQueryClient();
    const mutation = useMutation(async (params: CreateInventarioParam) => createInventario(params), {
        ...options,
        onSuccess: async () => {
            await queryClient.invalidateQueries('inventarios');
            notification.success({ message: 'Inventário cadastrado com sucesso' });
        },
        onError: () => {
            notification.error({
                message: `Erro ao cadastrar Inventário`,
            });
        },
    });
    return (data: CreateInventarioParam) => mutation.mutateAsync(data);
};

export default useCreateInventario;
