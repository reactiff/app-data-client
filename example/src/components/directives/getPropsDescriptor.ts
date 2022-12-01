import parseDirectives from './parseDirectives';
import arr from '../util/array';

// const sortBy = (value: { (item: any): boolean } ) => (a: any, b: any) => value(a) < value(b) ? -1 : 1;

export function getPropsDescriptor(props: any) {

    const items = parseDirectives(props);
          
    const classes = items
        .filter(x => x.isSwitch)
        .sort(arr.sortBy(x => x.key))
        .map(x => x.key);

    const attributes = items
        .filter(x => x.isAttribute && x.key!=='children')
        .sort(arr.sortBy(x => x.key))
        .map(x => x.key + '=' + x.valueDescription);
    
    const children = items
        .find(item => item.key === 'children');

    const classesJsx = classes.length ? ' ' + classes.join(' ') : '';
    const attributesJsx = attributes.length ? ' ' + attributes.join(' ') : '';
    
    return {
        classes,
        attributes,
        children,

        classesJsx,
        attributesJsx,

        tagAttributes: classesJsx + attributesJsx, 

        description: classes.join('.') +
            attributes.join('') + 
            (!!children ? ' > ' + children.valueDescription : ''),
    };

}