import 'dotenv-expand/config'

export const load = async ({fetch}) => {
    const fetchCategories = async() => {
        const categoryRes = await fetch(`${process.env.HOST_URL}/users/${process.env.USER_ID}/categories/list`)
        
        const categoryData = await categoryRes.json()
        return categoryData.category_list      
    }

    return {
        categories: fetchCategories()
    }
}

export const actions = {
    addTransaction: async ({request}) => {
        const formData = await request.formData()

        const amount = formData.get('amount')
        const categoryId = formData.get('category_id')
        const transactionDate = formData.get('transaction_date')
        const notes = formData.get('note')

        const toSend = {
            amount: amount,
            category_id: categoryId,
            transaction_date: transactionDate,
            note: notes ? notes: null
        }

        const addRes = await fetch(`${process.env.HOST_URL}/users/${process.env.USER_ID}/transactions/add`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(toSend)
        })
        const add = await addRes.json()        
    }
}