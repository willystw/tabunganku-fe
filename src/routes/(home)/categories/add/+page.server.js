import 'dotenv-expand/config'

export const actions = {
    addCategory: async ({request}) => {
        const formData = await request.formData()
        
        const name = formData.get('name')
        const transactionType = formData.get('transaction_type')

        const toSend = {
            category_name: name,
            transaction_type: transactionType
        }
        const res = await fetch(`${process.env.HOST_URL}/users/${process.env.USER_ID}/categories/add`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(toSend)
        })

        const response = await res.json()
        return;
    }
}