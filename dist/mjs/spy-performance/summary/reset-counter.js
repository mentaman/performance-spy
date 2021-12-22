let resetCount = -1;
export const resetCountUpdate = () => {
    resetCount++;
};
export const getCurrentReset = () => {
    return resetCount;
};
