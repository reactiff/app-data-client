type PathToken = string|number|symbol;

export type FilterParam = { path: string, value: any };
export type CallbackContext = {
    value: any, 
    type: string, 
    contructorName: string, 
    key?: PathToken, 
    path: string, 
    tokens: PathToken[]
};

export type EvaluatorFunction = { (context: CallbackContext): boolean }
export type SelectorFunction = { (context: CallbackContext): any }
export type VoidFunction = { (context: CallbackContext): void }

export type TraverseOptions = { 
    select?: SelectorFunction,      
    find?: EvaluatorFunction,        
    filter?: EvaluatorFunction, 
    visit?: VoidFunction, 
    namespace?: string, 
    expand?: EvaluatorFunction, 
    debug?: boolean,
}

export type RecursiveContext = {

    // extends TraverseOptions
    select?: SelectorFunction; 
    find?: EvaluatorFunction;
    filter?: EvaluatorFunction;
    visit?: VoidFunction;
    namespace?: string;
    expand?: EvaluatorFunction;
    debug?: boolean;

    // additional members
    path: PathToken[];
    depth: number;
    key?: PathToken;
    index?: PathToken;
    
};

export type ObjectOrArray = object|[];
export type Traverse = { (source: ObjectOrArray, options: TraverseOptions): any[] };
