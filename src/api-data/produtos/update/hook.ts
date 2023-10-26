import { notification } from 'antd';
import { useMutation, useQueryClient } from 'react-query';
import { UpdateProdutoParams, updateProduto } from '.';
import { Produto } from '../../../types/interfaces';

const useUpdateProduto = (options?: Record<string, unknown>) => {
    const queryClient = useQueryClient();
    const mutation = useMutation(async (params: UpdateProdutoParams) => updateProduto(params), {
        ...options,
        onSuccess: async () => {
            await queryClient.invalidateQueries('produtos');
            notification.success({ message: 'Produto atualizado com sucesso' });
        },
        onError: (err: Error) => {
            notification.error({
                message: `Erro ao atualizar produto`,
            });
        },
    });
    return (id: number, data: Partial<Produto>) => mutation.mutateAsync({ id, data });
};

export default useUpdateProduto;
