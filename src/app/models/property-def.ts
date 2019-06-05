export interface PropertyDef {
    type: string;
    label: string;
    validators?: {[key: string]: { message: string, arg?: any}};
    // value: string;
    // todo: more properties
}
