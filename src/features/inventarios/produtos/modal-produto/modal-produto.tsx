import { Button, Col, Form, Input, InputNumber, Modal, Row, Skeleton } from 'antd';
import { useForm } from 'antd/es/form/Form';
import useUpdateProdutoInventario from '../../../../api-data/inventario/produtos/update/hook';
import useGetProdutoInventario from '../../../../api-data/inventario/produtos/get-one/hook';
import { useRequiredParams } from '../../../../components/required-params/required-params';
import { InventarioProduto } from '../../../../types/interfaces';

type Props = {
    open: boolean;
    onClose?: () => void;
    onConfirm?: (inventario: InventarioProduto) => void;
};

export default function ModalProduto({ open, onClose, onConfirm }: Props) {
    const [form] = useForm();
    const updateProdutoInventario = useUpdateProdutoInventario();
    const { id, inventarioId } = useRequiredParams(['id', 'inventarioId']);

    const { data: inventarioProduto, isLoading } = useGetProdutoInventario({
        inventarioId: +inventarioId,
        id: +id,
    });

    const onSubmit = async (values: any) => {
        values = {
            id: +id,
            quantidadeEncontrada: +values.quantidadeEncontrada,
        };
        const inventario = await updateProdutoInventario({
            inventarioId: +inventarioId,
            id: +id,
            data: values,
        });
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
                            ...inventarioProduto,
                        }}
                        onFinish={onSubmit}
                        autoComplete="off"
                    >
                        <Row gutter={16}>
                            <Col span={16}>
                                <Form.Item label="Descrição" name={['produto', 'descricao']}>
                                    <Input disabled />
                                </Form.Item>
                            </Col>
                            <Col>
                                <Form.Item label="Qtd Encontrada" name="quantidadeEncontrada">
                                    <InputNumber />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            )}
        </>
    );
}
