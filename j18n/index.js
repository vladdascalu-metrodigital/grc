import loader from './loader';

let _dataFn = () => loader.translations;

//
// helper: resolve template values in translation string
//
let _replace = (translation, replacements) => {
    if (typeof translation === 'string') {
        let result = translation;
        Object.keys(replacements).forEach((replacement) => {
            result = result.split(`%{${replacement}}`).join(replacements[replacement]);
        });
        return result;
    }
    if (typeof translation === 'object') {
        const result = {};
        Object.keys(translation).forEach((translationKey) => {
            result[translationKey] = this._replace(translation[translationKey], replacements);
        });
        return result;
    }
    return null;
};


let t = (key, replacement = {} ) => {
    if (!_dataFn || !_dataFn() || !_dataFn()[key]) return key;
    return _replace(_dataFn()[key], replacement);
};

t.setDataFn = (fn) => { _dataFn = fn; };

// Object.defineProperty(t, 'language', {
//   set: (lang) => {
//       console.log('language', lang);
//       loader.language = lang;
//   }
// });

export default t;
