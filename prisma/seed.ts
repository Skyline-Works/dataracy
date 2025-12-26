const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const prisma = new PrismaClient()

async function main() {
    const password = await bcrypt.hash('password123', 10)

    const users = [
        { email: 'admin@dataracy.com', name: '관리자', role: 'ADMIN', password },
        { email: 'user1@example.com', name: '김철수', role: 'USER', password },
        { email: 'analyst_lee@data.io', name: '이영희', role: 'USER', password },
        { email: 'dr_park@university.ac.kr', name: '박박사', role: 'USER', password },
    ]

    for (const u of users) {
        const user = await prisma.user.upsert({
            where: { email: u.email },
            update: { password: u.password },
            create: u,
        })
        console.log(`Created user with id: ${user.id}`)
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
