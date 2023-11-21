import { Button, Form, Input, Modal, Skeleton } from 'antd';
import { useForm } from 'antd/es/form/Form';
import useGetInventario from '../../../api-data/inventario/get-one/hook';
import useUpdateInventario from '../../../api-data/inventario/update/hook';
import useCreateInventario from '../../../api-data/inventario/create/hook';
import { useParams } from 'react-router-dom';
import { Inventario } from '../../../types/interfaces';
import SelectProduto from '../../produtos/components/select/select-produto';

type Props = {
    open: boolean;
    onClose?: () => void;
    onConfirm?: (inventario: Inventario) => void;
};

export default function CadastroInventario({ open, onClose, onConfirm }: Props) {
    const [form] = useForm();
    const createInventario = useCreateInventario();
    const updateInventario = useUpdateInventario();
    const { id } = useParams<{ id?: string }>();

    const { data: inventario, isLoading } = useGetInventario(Number(id));

    const onSubmit = async (values: any) => {
        values = {
            ...values,
            produtos: values.produtos?.map((id: number) => ({ id })),
        };
        const inventario = id ? await updateInventario(Number(id), values) : await createInventario(values);
        onConfirm?.(inventario);
    };

    return (
        <>
            {isLoading ? (
                <Skeleton />
            ) : (
                <Modal
                    title={`${id ? 'Editar' : 'Criar'} Inventário`}
                    open={open}
                    onCancel={onClose}
                    footer={[
                        <Button key="cancel" onClick={onClose} type="text">
                            Cancelar
                        </Button>,
                        <Button key="submit" form="form" type="primary" htmlType="submit">
                            Cadastrar
                        </Button>,
                    ]}
                >
                    <Form
                        form={form}
                        id="form"
                        name="basic"
                        layout="vertical"
                        initialValues={{
                            ...inventario,
                        }}
                        onFinish={onSubmit}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Descrição"
                            name="descricao"
                            rules={[{ required: true, message: 'Por favor insira a descrição!' }]}
                        >
                            <Input />
                        </Form.Item>
                        {!id && (
                            <Form.Item
                                label="Produtos"
                                name="produtos"
                                tooltip="Deixe em branco para adicionar todos produtos ao inventário"
                            >
                                <SelectProduto mode="multiple" />
                            </Form.Item>
                        )}
                    </Form>
                </Modal>
            )}
        </>
    );
}
