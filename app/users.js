const users = [
    {
        id:'1',
        name:'heba',
        email:'heba@gmail.com',
        password:'123',
        token:'frdedasw325fdrewsew76ythhdfgrtrdsf'
    },
    {
        id:'2',
        name:'heba1',
        email:'heba1@gmail.com',
        password:'heba123',
        token:'kjucvfd4328iurfdsw4e3r255mnjioolte'
    }
]
export const checkUsers = (email) => {
    const user = users.find(x => x.email === email)
    return user
}