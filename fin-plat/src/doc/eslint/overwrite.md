## 'no-param-reassign': ['error', { props: false }]

```js
// error
const name = 'ESLint';

const changeType = lang => {
  lang = 'TSLint'; // error=> no-param-reassign
};

changeType(name);

// correct
const obj = {
  name: 'john',
};

const changeObj = obj => {
  obj.name = 'jame'; // correct => 'no-param-reassign': ['error', { props: false }]
};

changeObj(obj);
```
