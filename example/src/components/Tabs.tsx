import React, { ReactNode } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import clsx from 'clsx';
import {
  PropsDirectives,
  useStyleDirectives,
  useInlineStyle,
} from './directives';
import { Row, Col } from './Layout';
import util from './util';

export type UiTabDef = {
  label: ReactNode;
  content: ReactNode | { (): ReactNode };
};
export function isTabDef(object: any) {
  return !!object && !!object.label && !!object.content;
}
export type UiTab = ReactNode | UiTabDef;
export type UiTabData = { [index: string]: UiTab };
export type UiTabs = {
  items: any[];
  keyForItem?: (item: any) => string;
  elementForItem: (item: any, active: boolean) => ReactNode;
  //
  id?: string; // needed if auto saved state is desired
  onChange?: { (key: string): void };
  activeKey?: string;
  variant?: 'fullWidth' | 'scrollable';
  orientation?: 'vertical';
  centered?: boolean;
};
type ValueType = string | number | boolean | symbol;
type ValueOrElement = ValueType | Element | React.ReactNode;
export type FunctionOrValueOrElement = Function | ValueOrElement;

interface TabPanelProps {
  children?: FunctionOrValueOrElement;
  active: boolean;
  id?: string;
  value: string;
}

function TabPanel(props: TabPanelProps) {
  const {
    children, active, value, id,
  } = props;
  return (
    <div
      role="tabpanel"
      hidden={!active}
      id={`${id}-${value}`}
      aria-labelledby={`${id}-${value}`}
    >
      {children || <div>No content</div>}
    </div>
  );
}

export default (directives: UiTabs & PropsDirectives) => {
  const {
    id,
    onChange,
    activeKey,
    variant,
    orientation,
    centered,
    items,
    keyForItem,
    elementForItem,
    ...d
  } = directives;
  const { root, props } = useStyleDirectives<UiTabs>(d, 'ui-tabs');

  const keys = items.map((item) => {
    if (!keyForItem) {
      switch (typeof item) {
        case 'string':
          return item;
        case 'number':
          return item.toString();
        default:
          throw new Error('Invalid key');
      }
    }
    return keyForItem(item);
  });

  const [selectedKey, setActiveKey] = React.useState(() => activeKey);

  const handleChange = (event: any, key: string) => {
    // TODO resolve this shit
    console.log(typeof event);
    setActiveKey(key);
    if (onChange) onChange(key);
  };

  const internalStyle = useInlineStyle(
    () => ({
      minWidth: 'unset!important',
      minHeight: 'unset!important',
    }),
    [],
  )();

  if (!keys.length) return null;

  const tabStrip = (
    <Tabs
      orientation={directives.orientation}
      value={selectedKey || keys[0]}
      onChange={handleChange}
      aria-label={`tabs with ${keys.length} panels`}
    >
      {keys.map((key: string) => {
        const label = util.string.camelToSentenceCase(key);
        return <Tab key={key} label={label} value={key} />;
      })}
    </Tabs>
  );

  const tabContent = items.map((item: string, index: number) => {
    const key = keys[index];
    const isActiveTab = (typeof selectedKey === 'undefined' && index === 0)
      || selectedKey === key;
    return (
      <TabPanel
        key={key}
        active={isActiveTab}
        value={key}
        id={props.id || 'global'}
      >
        {elementForItem(item, isActiveTab)}
      </TabPanel>
    );
  });

  const verticalLayout = (
    <Row wide>
      {keys.length > 1 && <Col>{tabStrip}</Col>}
      <Col grow>{tabContent}</Col>
    </Row>
  );

  const horizontalLayout = (
    <>
      {keys.length > 1 && tabStrip}
      {tabContent}
    </>
  );

  const isVertical = directives.orientation === 'vertical';

  return (
    <div className={clsx('root', root, internalStyle)}>
      {isVertical && verticalLayout}
      {!isVertical && horizontalLayout}
    </div>
  );
};
