export class User {
    id: number
    username: string
    email: string
    balance: number

    constructor(id: number, username: string, email: string, balance: number) {
        this.id = id
        this.username = username
        this.email = email
        this.balance = balance
    }

    public static async fetchUser () {
        let response = await fetch('/api/user/profile')
        if (response.status === 200)
            return await response.json()

        return new User(-1, "", "", 0)
    }

}