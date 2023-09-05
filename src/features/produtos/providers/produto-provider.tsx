import { useState, createContext, useContext } from "react";
import produtosFake from '../produtos.fake.json'

export enum TipoProduto {
    RACAO = "Ração",
    REMEDIO = "Remédio",
    PLANTIO = "Plantio"
}

export const tipoProdutoOptions = Object.values(TipoProduto).map((tipo) => ({
    label: tipo,
    value: tipo
}));

export interface Produto {
    id: number,
    descricao: string,
    valor: number,
    tipo: TipoProduto
}

export interface CreateProduto {
    descricao: string,
    valor: number,
    tipo: TipoProduto
}

interface ProdutoContextType {
    get: ({ }: GetOptions) => Page<Produto>,
    getOne: (id: number) => Produto | undefined,
    remove: (id: number) => void,
    edit: (id: number, produto: Produto) => boolean,
    create: (produto: CreateProduto) => boolean
}

//@ts-ignore 
const ProdutoContext = createContext<ProdutoContextType>({});

export function ProdutoProvider(props: any) {
    const [produtos, setProdutos] = useState<Produto[]>(() => {
        return produtosFake.map(p => ({
            ...p,
            tipo: p.tipo as TipoProduto
        }))
    })

    const get = ({ page, pageSize, filter }: GetOptions): Page<Produto> => {
        const filterLower = (filter || '').toLocaleLowerCase()

        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        const fetchData = produtos
            .filter(e => e.descricao.toLocaleLowerCase().includes(filterLower)) // filtra pela descricao
            .slice(startIndex, endIndex) // retorna apenas os registros da pagina

        return { data: fetchData, totalCount: produtos.length }
    }

    const getOne = (id: number): Produto | undefined => {
        return produtos.find(p => p.id === id)
    }

    const remove = (id: number): void => {
        const newProduto = produtos.filter(p => p.id !== id);
        setProdutos(newProduto)
    }

    const edit = (id: number, produto: Produto): boolean => {
        const index = produtos.findIndex(p => p.id === id);

        if (index > -1) {
            const newProduto = produtos;
            newProduto.splice(index, 1, produto)
            setProdutos(newProduto)
            return true
        }

        return false
    }

    const create = (produto: CreateProduto) => {
        const id = produtos.reduce(function (prev, current) {
            return (prev.id > current.id) ? prev : current
        }).id + 1

        const newProduto = [...produtos, { id, ...produto }]
        setProdutos(newProduto)
    }

    return <ProdutoContext.Provider value={{ get, getOne, remove, edit, create }} {...props} />;
}

export function useProdutoContext() {
    const context = useContext(ProdutoContext);
    if (context === undefined) {
        throw new Error(`useProdutoContext must be used within a ProdutoProvider`);
    }
    return context;
}
