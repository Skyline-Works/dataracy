'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function deleteUser(formData: FormData) {
    const id = parseInt(formData.get('id') as string)
    await prisma.user.delete({ where: { id } })
    revalidatePath('/admin')
}
