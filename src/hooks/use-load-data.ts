import { useEffect, useState } from "react"

interface LoadDataResult<T> {
    data?: T
    loading: boolean
    error?: Error
}

const useLoadData = <T>(action: () => Promise<T>): LoadDataResult<T> => {
    const [data, setData] = useState<T | undefined>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | undefined>();

    useEffect(() => {
        action().then((val) => {
            setLoading(false);
            setData(val)
        }).catch((err) => {
            setLoading(false);
            setError(err)
        })
        setLoading(true);
    }, [action])

    return {
        data,
        loading,
        error
    }
}

export default useLoadData