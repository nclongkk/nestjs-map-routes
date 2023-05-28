import { DynamicModule } from '@nestjs/common';
export declare class MapRoutesModule {
    static register({ additionalPayload, }: {
        additionalPayload: Record<string, any>;
    }): DynamicModule;
}
