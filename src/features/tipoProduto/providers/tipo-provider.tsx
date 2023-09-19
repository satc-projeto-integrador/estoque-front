import { useState, createContext, useContext } from "react";
import tiposFake from '../tipos.fake.json'

export interface Tipo {
    id: number,
    tipo: string
}

export interface CreateTipo {
    tipo: string
}

interface TipoContextType {
    get: ({ }: GetOptions) => Page<Tipo>,
    getOne: (id: number) => Tipo | undefined,
    remove: (id: number) => void,
    edit: (id: number, tipo: Tipo) => boolean,
    create: (tipo: CreateTipo) => boolean
}

//@ts-ignore 
const TipoContext = createContext<TipoContextType>({});

export function TipoProvider(props: any) {
    const [tipos, setTipos] = useState<Tipo[]>(() => {
        return tiposFake.map(p => ({
            ...p
        }))
    })

    const get = ({ page, pageSize, filter }: GetOptions): Page<Tipo> => {
        const filterLower = (filter || '').toLocaleLowerCase()

        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        const fetchData = tipos
            .filter(e => e.tipo.toLocaleLowerCase().includes(filterLower)) // filtra pelo nome do tipo
            .slice(startIndex, endIndex) // retorna apenas os registros da pagina

        return { data: fetchData, totalCount: tipos.length }
    }

    const getOne = (id: number): Tipo | undefined => {
        return tipos.find(p => p.id === id)
    }

    const remove = (id: number): void => {
        const newTipo = tipos.filter(p => p.id !== id);
        setTipos(newTipo)
    }

    const edit = (id: number, tipo: Tipo): boolean => {
        const index = tipos.findIndex(p => p.id === id);

        if (index > -1) {
            const newTipo = tipos;
            newTipo.splice(index, 1, tipo)
            setTipos(newTipo)
            return true
        }

        return false
    }

    const create = (tipo: CreateTipo) => {
        const id = tipos.reduce(function (prev, current) {
            return (prev.id > current.id) ? prev : current
        }).id + 1

        const newTipo = [...tipos, { id, ...tipo }]
        setTipos(newTipo)
    }

    return <TipoContext.Provider value={{ get, getOne, remove, edit, create }} {...props} />;
}

export function useTipoContext() {
    const context = useContext(TipoContext);
    if (context === undefined) {
        throw new Error(`useTipoContext must be used within a TipoProvider`);
    }
    return context;
}
