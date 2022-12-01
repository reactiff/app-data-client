
export default function parseDirectives(props: any) {
    
    const items = Object.keys(props).map((key: string) => {
        const value = props[key];
        const t = typeof value;
        
        const isSwitch = t === 'boolean';
        const isAttribute = t !== 'boolean';
        const isArray = Array.isArray(value);
        const isFunction = t === 'function';

        let what;
        if (isArray) what = 'array';
        if (isAttribute) what = 'attribute';
        if (isSwitch) what = 'switch';
        if (isFunction) what = 'function';
        
        const typeOfValue = (v: any) => {
            if (!!v && v.$$typeof) {
                return v.$$typeof.toString();
            }
            return typeof v;
        }

        const itemType = isArray
                       ? (value.length>0 ? typeOfValue(value[0]) : null)
                       : typeOfValue(value);

        const asAttributeValue = (v: any) => {
            if (t === 'function') return 'fn()';
            if (t === 'string') return `"${v}"`;
            return `{ ${v} }`;
        }

        const valueDescription = isArray 
                            ? (value.length>0 ? '{ ' + itemType + '[] }'  : 'empty array') 
                            : (t === 'object' ? '{ ' + itemType + ' }' : asAttributeValue(value));

        return {
            key,
            value: value,
            what,
            valueDescription,
            isSwitch,
            isAttribute,
            isArray,
            itemType,
        };
    });
    return items;
}