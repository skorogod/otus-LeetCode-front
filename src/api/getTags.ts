export const getTags = async () => {
    try {
        const tags = await fetch('tags')
        return await tags.json();
    }
    catch(err) {
        throw new Error(err instanceof Error ? err.message : 'getTags Error')
    }
}
