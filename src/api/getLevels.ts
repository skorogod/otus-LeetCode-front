export const getLevels = async () => {
    try {
        const statuses = await fetch('levels')
    }
    catch(err) {
        throw new Error(err instanceof Error ? err.message : 'getLevels Error')
    }
}