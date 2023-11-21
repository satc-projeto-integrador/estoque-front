import { notification } from 'antd';
import { useMutation, useQueryClient } from 'react-query';
import { UpdateProdutoInventarioParams, updateProdutoInventario } from '.';

const useUpdateProdutoInventario = (options?: Record<string, unknown>) => {
    const queryClient = useQueryClient();
    const mutation = useMutation(async (params: UpdateProdutoInventarioParams) => updateProdutoInventario(params), {
        ...options,
        onSuccess: async (_, params) => {
            await queryClient.invalidateQueries('inventarios-produtos');
            await queryClient.invalidateQueries(['inventarios-produto', params.id]);
            notification.success({ message: 'Produto Inventário atualizado com sucesso' });
        },
    });
    return (params: UpdateProdutoInventarioParams) => mutation.mutateAsync(params);
};

export default useUpdateProdutoInventario;
