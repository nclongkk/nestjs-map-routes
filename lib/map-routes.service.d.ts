import { DiscoveryService } from '@golevelup/nestjs-discovery';
import { OnModuleInit } from '@nestjs/common';
import { RoutesSchema } from './types';
export declare class MapRoutesService implements OnModuleInit {
    private readonly additionalPayload;
    private readonly discover;
    constructor(additionalPayload: Record<string, any>, discover: DiscoveryService);
    private routesSchema;
    onModuleInit(): Promise<void>;
    getRoutesSchema(): RoutesSchema<typeof this.additionalPayload>;
}
