export const getTasks = async (query?: string) => {
    try {
        const tasks = await fetch(`tasks${query ? '?' + query : ''}`)
        return await tasks.json();
    }
    catch(err) {
        throw new Error(err instanceof Error ? err.message : 'getTasks Error')
    }
}