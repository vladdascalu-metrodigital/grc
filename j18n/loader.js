const sample = {
    DE: {
        'foo': 'bargeld',
        'Customer Data': 'Kundendaten',
        'Credit Data': 'Kreditdaten',
        'Comments': 'Kommentare',
        'Attachments': 'Anhänge',
        'Audit Trail': 'Verlauf'
    },
    EN: {
        'foo': 'bar',
        'Customer Data': 'Customer Data',
        'Credit Data': 'Credit Data',
        'Comments': 'Comments',
        'Attachments': 'Attachments',
        'Audit Trail': 'Audit Trail'
    }
};


export default {
    _data: {
        language: 'EN',
        translations: sample.EN
    },

    // root of react tree to be re-rendered on language change
    reactRoot: null,


    set language(language) {
        console.log('loader#load', language, this);
        setTimeout(() => {
            if(language==='EN') {
                this._data = {
                    language: language,
                    translations: sample.EN
                };
            }
            if(language==='DE') {
                this._data = {
                    language: language,
                    translations: sample.DE
                };
            }

            if( this.reactRoot ) this.reactRoot.forceUpdate();
        }, 2000);
    },

    get language()      { return this._data.language; },
    get translations()  { return this._data.translations; },
    get languages()     { return ['EN','DE']; }
};
