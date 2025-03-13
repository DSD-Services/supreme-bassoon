import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { ZodSchema } from '@repo/common/schemas';
export declare class ZodValidationPipe implements PipeTransform {
    private schema;
    constructor(schema: ZodSchema);
    transform(value: unknown, metadata: ArgumentMetadata): any;
}
//# sourceMappingURL=zod-validation-pipe.d.ts.map