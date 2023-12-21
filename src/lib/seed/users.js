import bcrypt from 'bcrypt'
const users = [
    {
        name: 'Alejandro',
        email: 'romerito69@gmail.com',
        verified: 1,
        password: bcrypt.hashSync('password', 10)
    },
    {
        name: 'Haziel',
        email: 'yayito4512@gmail.com',
        verified: 1,
        password: bcrypt.hashSync('password', 10)
    },
    {
        name: 'Diego',
        email: 'diego19@gmail.com',
        verified: 1,
        password: bcrypt.hashSync('password', 10)
    },
    {
        name: 'Amauri',
        email: 'amauri@gmail.com',
        verified: 1,
        password: bcrypt.hashSync('12345678', 10)
    },
    {
        name: 'Alex',
        email: 'alex@gmail.com',
        verified: 1,
        password: bcrypt.hashSync('password', 10)
    },
    {
        name: 'Josue',
        email: 'yoseph@gmail.com',
        verified: 1,
        password: bcrypt.hashSync('password', 10)
    },
    {
        name: 'Eduardo',
        email: 'lalo76@gmail.com',
        verified: 1,
        password: bcrypt.hashSync('password', 10)
    },
    {
        name: 'Adrian',
        email: 'adrian@gmail.com',
        verified: 1,
        password: bcrypt.hashSync('password', 10)
    },
    {
        name: 'Saul',
        email: 'saul@gmail.com',
        verified: 1,
        password: bcrypt.hashSync('password', 10)
    },
    {
        name: 'Luis',
        email: 'luisito@gmail.com',
        verified: 1,
        password: bcrypt.hashSync('password', 10)
    }
    
]

export default users