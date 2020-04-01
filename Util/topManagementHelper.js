import * as _ from 'lodash';
import { lookup } from 'global-react-components/Util/translations';

export const getMccScoreTranslation = mccScore => {
    if (_.some(mccScore)) {
        if (mccScore.score === '1' || mccScore.score === '2') {
            return (lookup('mrc.topmanagement.solvency.verygood'));
        }
        if (mccScore.score === '3') {
            return (lookup('mrc.topmanagement.solvency.good'));
        }
        if (mccScore.score === '4' || mccScore.score === '5')   {
            return (lookup('mrc.topmanagement.solvency.middle'));
        }
        if (mccScore.score === '6') {
            return (lookup('mrc.topmanagement.solvency.bad'));
        }
    }
    return 'N/A';
}

export const getMccScoreColor = mccScore => {
    if (_.some(mccScore)) {
        if (mccScore.score === '1' || mccScore.score === '2' || mccScore.score === '3') {
            return 'green';
        }
        if (mccScore.score === '4' || mccScore.score === '5')   {
            return 'yellow';
        }
        if (mccScore.score === '6') {
            return 'red';
        }
    }
    return '';
}
