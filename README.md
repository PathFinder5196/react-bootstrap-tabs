# This is forked from master plugin to achieve some custom functionality

# React Tabs component using Bootstrap 4

This is a react component to render tabs using <a href="http://v4-alpha.getbootstrap.com/">Bootstrap 4</a> classes.
You should have Bootstrap 4 installed already in your app.

## Demo

- [Demo project source](https://github.com/pathfinder5196/react-bootstrap-tabs-styled-demo)


## Usage

1. install the package:
```
npm install react-bootstrap-tabs-styled --save
```

### 2. Import component

With ES2015:
```
import {Tabs, Tab} from 'react-bootstrap-tabs-styled';
```

### 3. Add the component markup to your react component

```html
<Tabs onSelect={(index, label) => console.log(label + ' selected')}>
    <Tab label="Tab1">Tab 1 content</Tab>
    <Tab label="Tab2">Tab 2 content</Tab>
</Tabs>
```
