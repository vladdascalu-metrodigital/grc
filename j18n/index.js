import loader from './loader';

let _dataFn = () => loader.translations;

let t = (key) => {
    if (!_dataFn || !_dataFn() || !_dataFn()[key]) return key;
    return _dataFn()[key];
};

t.setDataFn = (fn) => { _dataFn = fn; };

// Object.defineProperty(t, 'language', {
//   set: (lang) => {
//       console.log('language', lang);
//       loader.language = lang;
//   }
// });

export default t;
