import { PropertyDef } from './property-def';

export interface TemplateDef {
    display: string;
    id: string;
    unit: string;
    properties: {[key: string]: PropertyDef};
}
