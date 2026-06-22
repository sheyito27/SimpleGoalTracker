// Molde para crear repositorios
export function createRepository<T extends { id: string }>(initialData: T[]) {
    let data = initialData;

    return {
        findAll: () => data,

        findOne: (id: string) => {
            return data.find(item => item.id === id);
        },

        addOne: (newItem: T) => {
            data.push(newItem);
            return newItem;
        },

        updateOne: (id: string, updates: Partial<T>) => {
            const item = data.find(i => i.id === id);
            if (!item) return null;
            Object.assign(item, updates);
            return item;
        },

        deleteOne: (id: string) => {
            const index = data.findIndex(i => i.id === id);
            if (index === -1) return null;
            return data.splice(index, 1)[0];
        }
    };
}