export const getTags= async () => {
    try {
        const statuses = await fetch('tags')
    }
    catch(err) {
        throw new Error(err instanceof Error ? err.message : 'getTags Error')
    }
}
