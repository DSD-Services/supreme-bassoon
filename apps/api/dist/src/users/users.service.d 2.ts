import { PrismaService } from '../prisma/prisma.service';
import type { CreateUserInput, UpdateUserInput } from '@repo/common/schemas';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserInput: CreateUserInput): Promise<{
        id: number;
        createdAt: Date | null;
        updatedAt: Date | null;
        email: string;
        passwordHash: string;
    }>;
    findAll(): Promise<{
        id: number;
        createdAt: Date | null;
        updatedAt: Date | null;
        email: string;
        passwordHash: string;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        createdAt: Date | null;
        updatedAt: Date | null;
        email: string;
        passwordHash: string;
    }>;
    update(id: number, updateUserInput: UpdateUserInput): Promise<{
        id: number;
        createdAt: Date | null;
        updatedAt: Date | null;
        email: string;
        passwordHash: string;
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date | null;
        updatedAt: Date | null;
        email: string;
        passwordHash: string;
    }>;
}
//# sourceMappingURL=users.service.d.ts.map