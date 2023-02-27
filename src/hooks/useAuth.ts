import { useEffect, useState } from "react"

// helpers
import { getUser } from "../helpers/storageHandler"

export const useAuth = () => {
    const [user, setUser] = useState<any | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setUser(getUser())
        setLoading(false)
    }, [])

    return { user, loading }
}