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

## Examples

### Initial load
<img width="706" src="https://user-images.githubusercontent.com/5904681/151671976-07eb785a-e838-4bba-933d-eef56c981fde.png"/>
<img width="793" src="https://user-images.githubusercontent.com/5904681/151671982-5e08e7cd-e93e-447d-8770-b113c6bd8d15.png"/>

### Changes happening in the useEffect hook
<img width="797" src="https://user-images.githubusercontent.com/5904681/151671994-e53176e7-2a4b-4b69-a269-626a7e286380.png"/>
<img width="708" src="https://user-images.githubusercontent.com/5904681/151671990-92f0b9b2-cebf-43cc-b782-6d91c7d4dc2d.png"/>




