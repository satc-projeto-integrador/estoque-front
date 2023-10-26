import { notification } from 'antd';
import { useMutation, useQueryClient } from 'react-query';
import { removeProduto } from '.';

const useDeleteProduto = (options?: Record<string, unknown>) => {
    const queryClient = useQueryClient();
    const mutation = useMutation(async (id: number) => removeProduto(id), {
        ...options,
        onSuccess: async () => {
            await queryClient.invalidateQueries('produtos');
            notification.success({ message: 'Produto excluído com sucesso' });
        },
        onError: (err: Error) => {
            notification.error({
                message: `Erro ao excluir produto`,
            });
        },
    });
    return (id: number) => mutation.mutateAsync(id);
};

export default useDeleteProduto;
