import loader from './loader';

let _translationsGetter = () => loader.translations;

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


let translate = (key, replacement = {} ) => {
    if (!_translationsGetter || !_translationsGetter() ) return key;

    let trans = _translationsGetter()[key] || key;
    return _replace(trans, replacement);
};

translate.setTranslationsGetter = (fn) => { _translationsGetter = fn; };

Object.defineProperty(translate, 'language', {
  get: () => {
      return loader.language;
  }
});

export default translate;
