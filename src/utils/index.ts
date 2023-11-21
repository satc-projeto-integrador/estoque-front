export const displayDate = (date: string | Date | undefined) => {
    if (!date) return '';
    if (typeof date === 'string') date = new Date(date);
    return date.toLocaleDateString();
};

export const displayMoney = (value: string | number) => {
    if (!value) return '';
    if (typeof value === 'string') value = +value;
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};
