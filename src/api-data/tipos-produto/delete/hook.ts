import { notification } from 'antd';
import { useMutation, useQueryClient } from 'react-query';
import { removeTipoProduto } from '.';

const useDeleteTipoProduto = (options?: Record<string, unknown>) => {
    const queryClient = useQueryClient();
    const mutation = useMutation(async (id: number) => removeTipoProduto(id), {
        ...options,
        onSuccess: async () => {
            await queryClient.invalidateQueries('tipos-produtos');
            notification.success({ message: 'Tipo de Produto excluído com sucesso' });
        },
        onError: (err: Error) => {
            notification.error({
                message: `Erro ao excluir Tipo de Produto`,
            });
        },
    });
    return (id: number) => mutation.mutateAsync(id);
};

export default useDeleteTipoProduto;
