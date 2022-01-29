# @stijnvanhulle/babel-plugin-hooks-devtools

Babel plugin to debug useState and useEffect inside of the redux devtools

## Getting Started

To begin, you'll need to install `@stijnvanhulle/babel-plugin-hooks-devtools`:

```console
$ npm install @stijnvanhulle/babel-plugin-hooks-devtools --save-dev
```

**babel.config.js**

```js
module.exports = {
  plugins: {
    [
      "@stijnvanhulle/babel-plugin-hooks-devtools",
      {
        active: true,
      },
    ]
  },
};
```

And _debug_ comment in front of the useEffect/useState that you want to debug

```js
const [isOpen, setIsOpen] = useState(false);
// debug
useEffect(() => {
  setIsOpen((value) => !value);
}, [isOpen]);
```
