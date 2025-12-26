'use server'

import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'

export async function login(prevState: any, formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
        return { error: '이메일과 비밀번호를 입력해주세요.' }
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        })

        if (!user || !user.password) {
            return { error: '이메일 또는 비밀번호가 올바르지 않습니다.' }
        }

        const isValid = await bcrypt.compare(password, user.password)

        if (!isValid) {
            return { error: '이메일 또는 비밀번호가 올바르지 않습니다.' }
        }

        // Set cookie
        const cookieStore = await cookies()
        cookieStore.set('userId', user.id.toString(), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
        })

    } catch (error) {
        console.error('Login error:', error)
        return { error: '로그인 중 오류가 발생했습니다.' }
    }

    redirect('/')
}

export async function signup(prevState: any, formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const name = formData.get('name') as string

    if (!email || !password || !name) {
        return { error: '모든 필드를 입력해주세요.' }
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            return { error: '이미 사용 중인 이메일입니다.' }
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role: 'USER'
            }
        })

        // Set cookie
        const cookieStore = await cookies()
        cookieStore.set('userId', user.id.toString(), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
        })

    } catch (error) {
        console.error('Signup error:', error)
        return { error: '가입 중 오류가 발생했습니다.' }
    }

    redirect('/')
}

export async function logout() {
    const cookieStore = await cookies()
    cookieStore.delete('userId')
    redirect('/')
}
