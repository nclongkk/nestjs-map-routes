import { SetMetadata } from '@nestjs/common';

export const MARK_ROUTE_KEY = 'mark_route_key';
export const MarkRoute = () => SetMetadata(MARK_ROUTE_KEY, MARK_ROUTE_KEY);
