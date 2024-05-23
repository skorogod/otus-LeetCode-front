export const getStatuses = async () => {
    try {
        const statuses = await fetch('')
        return await statuses.json();
    }
    catch(err) {
        throw new Error(err instanceof Error ? err.message : 'getStatuses Error')
    }
}