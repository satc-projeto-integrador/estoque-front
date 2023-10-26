import { notification } from 'antd';
import { useMutation, useQueryClient } from 'react-query';
import { CreateProdutoParams, createProduto } from '.';

const useCreateProduto = (options?: Record<string, unknown>) => {
    const queryClient = useQueryClient();
    const mutation = useMutation(async (params: CreateProdutoParams) => createProduto(params), {
        ...options,
        onSuccess: async () => {
            await queryClient.invalidateQueries('produtos');
            notification.success({ message: 'Produto cadastrado com sucesso' });
        },
        onError: (err: Error) => {
            notification.error({
                message: `Erro ao cadastrar produto`,
            });
        },
    });
    return (data: CreateProdutoParams) => mutation.mutateAsync(data);
};

export default useCreateProduto;
