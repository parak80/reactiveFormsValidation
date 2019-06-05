export interface ButtonDef {
    label: string;
    iconClass?: string;
    callbackFn?: (data: any) => any;
    visibleFn?: (data: any) => boolean;
    enabledFn?: (data: any) => boolean;
}
