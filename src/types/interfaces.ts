export interface GetPageOptions {
    page: number;
    rpp: number;
}

export interface Page<T> {
    list: Array<T>;
    totalCount: number;
    page: number;
    rpp: number;
}

export interface Produto {
    id: number;
    descricao: string;
    valor: number;
    tipoProduto: TipoProduto;
}

export interface TipoProduto {
    id: number;
    descricao: string;
}

export interface TipoMovimentacao {
    id: number;
    descricao: string;
}

export enum TipoMovimentacaoEnum {
    ENTRADA = 'Entrada',
    SAIDA = 'Saída',
}

export interface MovimentacaoProduto {
    valor: number;
    quantidade: number;
    produto: { id: number };
}

export interface Movimentacao {
    id: number;
    observacao: string;
    dataMovimentacao: string | Date;
    tipoMovimentacao: { id: number } & Partial<TipoMovimentacao>;
    movimentacaoProdutos: MovimentacaoProduto[];
}

export interface SaldoProduto {
    id: number;
    produto: Produto;
    quantidade: number;
}
export interface Inventario {
    id: number;
    descricao: string;
    dataInicio: Date;
    dataFim: Date;
    inventarioProdutos: InventarioProduto[];
}

export interface InventarioProduto {
    id: number;
    produto: Produto;
    quantidadeEstoque: number;
    quantidadeEncontrada: number;
    inventario: Inventario;
}
