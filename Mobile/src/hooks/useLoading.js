import { useState } from "react";

export const useIsLoading = () => {
    const [isLoading, setIsLoading] = useState(false);

    const startLoading = () => setIsLoading(true);
    const stopLoading = () => setIsLoading(false);

    return { isLoading, startLoading, stopLoading };
};