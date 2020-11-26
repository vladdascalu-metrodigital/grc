import { STATE_KEY_CUSTOMERS_IN_GROUP } from '../util/Constants';

export const getCustomers = (store) => store[STATE_KEY_CUSTOMERS_IN_GROUP];

export const getConfig = (store) => store.ui.config.data;
