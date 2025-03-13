import { UsersService } from './users.service';
import { type CreateUserInput, type UpdateUserInput } from '@repo/common/schemas';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
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
    findOne(id: string): Promise<{
        id: number;
        createdAt: Date | null;
        updatedAt: Date | null;
        email: string;
        passwordHash: string;
    }>;
    update(id: string, updateUserInput: UpdateUserInput): Promise<{
        id: number;
        createdAt: Date | null;
        updatedAt: Date | null;
        email: string;
        passwordHash: string;
    }>;
    remove(id: string): Promise<{
        id: number;
        createdAt: Date | null;
        updatedAt: Date | null;
        email: string;
        passwordHash: string;
    }>;
}
//# sourceMappingURL=users.controller.d.ts.map