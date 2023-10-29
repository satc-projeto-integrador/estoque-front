import { Button, Col, DatePicker, Divider, Form, Input, InputNumber, Modal, Row, Select, Skeleton, Space } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useParams } from 'react-router-dom';
import { Movimentacao } from '../../../../types/interfaces';
import useCreateMovimentacao from '../../../../api-data/movimentacao/create/hook';
import useUpdateMovimentacao from '../../../../api-data/movimentacao/update/hook';
import useGetMovimentacao from '../../../../api-data/movimentacao/get-one/hook';
import SelectTipoMovimentacao from '../../../tipos-movimentacao/components/select/select-tipos-movimentacao';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import SelectProduto from '../../../produtos/components/select/select-produto';
import FormItem from 'antd/es/form/FormItem';

type Props = {
    title: string;

    open: boolean;
    onClose?: () => void;
    onConfirm?: (produto: Movimentacao) => void;
};

export default function CadastroMovimentacao({ title, open, onClose, onConfirm }: Props) {
    const [form] = useForm();
    const createMovimentacao = useCreateMovimentacao();
    const updateMovimentacao = useUpdateMovimentacao();
    const { id } = useParams<{ id?: string }>();

    const { data: movimentacao, isLoading } = useGetMovimentacao(Number(id));

    const onSubmit = async (values: any) => {
        const tipo = id ? await updateMovimentacao(Number(id), values) : await createMovimentacao(values);
        onConfirm?.(tipo);
    };

    const produtosValidator = (getFieldValue: any) => ({
        validator(rule: any, value: any) {
            if (getFieldValue('movimentacaoProdutos') && getFieldValue('movimentacaoProdutos').length) {
                return Promise.resolve();
            }
            return Promise.reject('Insira ao menos um produto');
        },
    });

    return (
        <>
            {isLoading ? (
                <Skeleton />
            ) : (
                <Modal
                    width={600}
                    title={title}
                    open={open}
                    onCancel={onClose}
                    footer={[
                        <Button key="cancel" onClick={onClose} type="text">
                            Cancelar
                        </Button>,
                        <Button key="submit" form="form-tipo-movimentacao" type="primary" htmlType="submit">
                            Cadastrar
                        </Button>,
                    ]}
                >
                    <Form
                        form={form}
                        id="form-tipo-movimentacao"
                        name="basic"
                        layout="vertical"
                        initialValues={movimentacao}
                        onFinish={onSubmit}
                        autoComplete="off"
                    >
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label="Data da Movimentação"
                                    name="dataMovimentacao"
                                    rules={[{ required: true, message: 'Por favor insira a data!' }]}
                                >
                                    <DatePicker style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Tipo de Movimentação"
                                    name="tipoMovimentacao"
                                    rules={[{ required: true, message: 'Por favor insira o tipo de movimentacao!' }]}
                                >
                                    <SelectTipoMovimentacao />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item label="Observação" name="observacao">
                            <Input.TextArea />
                        </Form.Item>

                        <Divider>Produtos</Divider>

                        <FormItem
                            name="lengtValidator"
                            rules={[({ getFieldValue }) => produtosValidator(getFieldValue)]}
                        >
                            <Form.List name="movimentacaoProdutos">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, ...restField }) => (
                                            <Row
                                                key={key}
                                                style={{ display: 'flex', marginBottom: 8, width: '100%' }}
                                                align="middle"
                                                gutter={16}
                                            >
                                                <Col span={12}>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'produto']}
                                                        rules={[{ required: true, message: 'Selecione o produto' }]}
                                                        label="Produto"
                                                    >
                                                        <SelectProduto />
                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'valor']}
                                                        rules={[{ required: true, message: 'Insira o valor' }]}
                                                        label="Valor"
                                                    >
                                                        <InputNumber />
                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'quantidade']}
                                                        rules={[{ required: true, message: 'Insira a quantidade' }]}
                                                        label="Quantidade"
                                                    >
                                                        <InputNumber />
                                                    </Form.Item>
                                                </Col>
                                                <MinusCircleOutlined onClick={() => remove(name)} />
                                            </Row>
                                        ))}
                                        <Form.Item>
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                Adicionar Produto
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                        </FormItem>
                    </Form>
                </Modal>
            )}
        </>
    );
}
