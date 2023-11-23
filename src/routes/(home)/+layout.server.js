import 'dotenv-expand/config'

export const load = async ({fetch}) => {
    const getUser = async() => {
        const endpoint = `${process.env.HOST_URL}/users/${process.env.USER_ID}/get`;
        const userRes = await fetch(endpoint)
        const userData = await userRes.json()

        return userData.data
    }
    return {
        user: getUser()
    }
}