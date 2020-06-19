export const orderRequestFields = requestFieldsList => {
    return requestFieldsList && requestFieldsList != null && requestFieldsList.length > 0
        ? requestFieldsList.sort((a, b) => {
              const aOrder =
                  a && a !== null && a.countryField && a.countryField !== null ? a.countryField.order : undefined;
              const bOrder =
                  b && b !== null && b.countryField && b.countryField !== null ? b.countryField.order : undefined;

              if (aOrder !== null && aOrder !== undefined) {
                  if (bOrder !== null && bOrder !== undefined) {
                      return aOrder === bOrder ? 0 : aOrder > bOrder ? 1 : -1;
                  } else {
                      return 1;
                  }
              } else {
                  if (bOrder !== null && bOrder !== undefined) {
                      return -1;
                  } else {
                      return 0;
                  }
              }
          })
        : [];
};

export const filterAdditionalFieldsList = (requestFieldList, level, section, country, storeNumber, customerNumber) => {
    if (
        level === undefined ||
        level === null ||
        requestFieldList === undefined ||
        requestFieldList === null ||
        requestFieldList.length === 0
    ) {
        return [];
    }
    const filteredByFieldLevel = requestFieldList.filter(
        rf => rf.countryField && rf.countryField.level && rf.countryField.level === level
    );
    const filteredBySection = filteredByFieldLevel.filter(
        rf =>
            section === undefined ||
            section === null ||
            (rf.countryField && rf.countryField.section && rf.countryField.section === section)
    );

    if (level === 'CUSTOMER') {
        return filteredBySection.filter(rf => rf.storeNumber === storeNumber && rf.customerNumber === customerNumber);
    }

    return filteredBySection;
};

export const filterAdditionalFieldsByCode = (requestFieldList, code) => {
    if (
        code === undefined ||
        code === null ||
        requestFieldList === undefined ||
        requestFieldList === null ||
        requestFieldList.length === 0
    ) {
        return [];
    }

    const filteredByCode = requestFieldList.filter(
        rf =>
            rf.countryField &&
            rf.countryField.field &&
            rf.countryField.field.code &&
            rf.countryField.field.code === code
    );

    return filteredByCode;
};

export function getDateFormatString() {
    const formatObj = new Intl.DateTimeFormat().formatToParts(new Date());
    return formatObj
        .map(obj => {
            switch (obj.type) {
                case 'day':
                    return 'dd';
                case 'month':
                    return 'MM';
                case 'year':
                    return 'yyyy';
                default:
                    return obj.value;
            }
        })
        .join('');
}

export const defaultOnChangeField = (props, oldValue, setValueFunct, e) => {
    const newValue = e.target.value;
    if (newValue !== oldValue) {
        setValueFunct(newValue);
        props.onChange(newValue);
    }
};

const additionalFieldsDateSeparator = '-';

export function parseDateForAdditionalField(strValue) {
    if (!strValue || strValue === null || strValue === '') {
        return undefined;
    }
    const splitted = strValue.split(additionalFieldsDateSeparator);
    if (splitted.length < 3) {
        throw Error('Invalid date');
    }
    return new Date(splitted[0], splitted[1] - 1, splitted[2]);
}

export function formatDateForAdditionalField(date) {
    if (
        date === undefined ||
        date === null ||
        typeof date.getMonth !== 'function' ||
        typeof date.getDate !== 'function' ||
        typeof date.getFullYear !== 'function'
    ) {
        return undefined;
    }
    const year = date.getFullYear();
    const month = (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1);
    const day = (date.getDate() < 9 ? '0' : '') + date.getDate();
    return year + additionalFieldsDateSeparator + month + additionalFieldsDateSeparator + day;
}

const additionalFieldsOptionSeparator = '|';

export function getOptionValues(optionsStr) {
    if (optionsStr === undefined || optionsStr === null || optionsStr.trim() === '') {
        return [];
    }

    return optionsStr.split(additionalFieldsOptionSeparator);
}

export function formatOptionValues(optionsListValues) {
    if (optionsListValues === undefined || optionsListValues === null || optionsListValues.length === 0) {
        return null;
    }

    return optionsListValues.join(additionalFieldsOptionSeparator);
}

export function getDateIfExists(dateStr) {
    if (dateStr === undefined || dateStr === null || dateStr.length === 0) {
        return undefined;
    }

    try {
        return new Date(dateStr);
    } catch (err) {
        console.log('the following string cannot be transformed in date' + dateStr);
    }
}

export function setDateAtStartOfDay(date) {
    if (
        date === undefined ||
        date === null ||
        typeof date.getMonth !== 'function' ||
        typeof date.getDate !== 'function' ||
        typeof date.getFullYear !== 'function'
    ) {
        return date;
    }
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
