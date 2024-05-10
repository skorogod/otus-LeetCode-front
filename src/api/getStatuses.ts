export const getStatuses = async () => {
    try {
        const statuses = await fetch('')
    }
    catch(err) {
        throw new Error(err instanceof Error ? err.message : 'getStatuses Error')
    }
}