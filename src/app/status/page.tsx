"use client"
import cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

export default function State() {

    const getState = async () => {
        const router = useRouter()
        const session_token = cookies.get('session_token')
        console.log(session_token)

        if (session_token === undefined) {
            router.push('/admin')
            return <div>no</div>
        } else {
            try {
                const response = await fetch('/api/auth/getstate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ session_token })
                })
                const data = await response.json()
                console.log(data)
                return <div>{data}</div>
            } catch (error) {
                console.error(error)
            }
        }
    }
}

