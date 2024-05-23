export const getLevels = async () => {
    try {
        const levels = await fetch('levels')
        return await levels.json();
    }
    catch(err) {
        throw new Error(err instanceof Error ? err.message : 'getLevels Error')
    }
}