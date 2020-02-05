export const ALL_ATTACHMENT_TYPES_JSON = "{ \n" +
    "   \"attachment_types\":[ \n" +
    "      { \n" +
    "         \"country\":\"ALL\",\n" +
    "         \"type\":\"general\",\n" +
    "         \"label\":\"mrc.attachments.types.general\",\n" +
    "         \"remark\":\"General\"\n" +
    "      },\n" +
    "      { \n" +
    "         \"country\":\"DE\",\n" +
    "         \"type\":\"contract\",\n" +
    "         \"label\":\"mrc.attachments.types.contract\",\n" +
    "         \"remark\":\"Digital version to improve efficiency\",\n" +
    "         \"fields\":[ \n" +
    "            { \n" +
    "               \"field_label\":\"mrc.attachments.fields.contract.start_date\",\n" +
    "               \"data_type\":\"Date\",\n" +
    "               \"mandatory\":true,\n" +
    "               \"validation_operation\":\"LESS_THAN_AND_EQUALS\",\n" +
    "               \"validation_argument\":\"TODAY\"\n" +
    "            },\n" +
    "            { \n" +
    "               \"field_label\":\"mrc.attachments.fields.contract.expiration_date\",\n" +
    "               \"data_type\":\"Date\",\n" +
    "               \"mandatory\":true,\n" +
    "               \"field_in_db\":\"expiry_date\",\n" +
    "               \"validation_operation\":\"GREATER_THAN_AND_EQUALS\",\n" +
    "               \"validation_argument\":\"TODAY\"\n" +
    "            }\n" +
    "         ]\n" +
    "      },\n" +
    "      { \n" +
    "         \"country\":\"DE\",\n" +
    "         \"type\":\"bank_guarantee\",\n" +
    "         \"label\":\"mrc.attachments.types.bank_guarantee\",\n" +
    "         \"remark\":\"Collaterals\",\n" +
    "         \"is_collateral\":true,\n" +
    "         \"fields\":[ \n" +
    "            { \n" +
    "               \"field_label\":\"mrc.attachments.fields.bank_guarantee.amount\",\n" +
    "               \"data_type\":\"Double\",\n" +
    "               \"mandatory\":true,\n" +
    "               \"field_in_db\":\"amount\"\n" +
    "            },\n" +
    "            { \n" +
    "               \"field_label\":\"mrc.attachments.fields.bank_guarantee.validity_date\",\n" +
    "               \"data_type\":\"Date\",\n" +
    "               \"mandatory\":true,\n" +
    "               \"field_in_db\":\"expiry_date\",\n" +
    "               \"validation_operation\":\"GREATER_THAN_AND_EQUALS\",\n" +
    "               \"validation_argument\":\"TODAY\"\n" +
    "            }\n" +
    "         ]\n" +
    "      },\n" +
    "      { \n" +
    "         \"country\":\"DE\",\n" +
    "         \"type\":\"warenkreditversicherung\",\n" +
    "         \"label\":\"mrc.attachments.types.warenkreditversicherung\",\n" +
    "         \"remark\":\"Collaterals\",\n" +
    "         \"is_collateral\":true,\n" +
    "         \"fields\":[ \n" +
    "            { \n" +
    "               \"field_label\":\"mrc.attachments.fields.warenkreditversicherung.amount\",\n" +
    "               \"data_type\":\"Double\",\n" +
    "               \"mandatory\":true,\n" +
    "               \"field_in_db\":\"amount\"\n" +
    "            },\n" +
    "            { \n" +
    "               \"field_label\":\"mrc.attachments.fields.warenkreditversicherung.validity_date\",\n" +
    "               \"data_type\":\"Date\",\n" +
    "               \"mandatory\":true,\n" +
    "               \"field_in_db\":\"expiry_date\",\n" +
    "               \"validation_operation\":\"GREATER_THAN_AND_EQUALS\",\n" +
    "               \"validation_argument\":\"TODAY\"\n" +
    "            }\n" +
    "         ]\n" +
    "      },\n" +
    "      { \n" +
    "         \"country\":\"DE\",\n" +
    "         \"type\":\"bürgschaft\",\n" +
    "         \"label\":\"mrc.attachments.types.bürgschaft\",\n" +
    "         \"remark\":\"Collaterals\",\n" +
    "         \"is_collateral\":true,\n" +
    "         \"fields\":[ \n" +
    "            { \n" +
    "               \"field_label\":\"mrc.attachments.fields.bürgschaft.amount\",\n" +
    "               \"data_type\":\"Double\",\n" +
    "               \"mandatory\":true,\n" +
    "               \"field_in_db\":\"amount\"\n" +
    "            },\n" +
    "            { \n" +
    "               \"field_label\":\"mrc.attachments.fields.bürgschaft.validity_date\",\n" +
    "               \"data_type\":\"Date\",\n" +
    "               \"mandatory\":true,\n" +
    "               \"field_in_db\":\"expiry_date\",\n" +
    "               \"validation_operation\":\"GREATER_THAN_AND_EQUALS\",\n" +
    "               \"validation_argument\":\"TODAY\"\n" +
    "            }\n" +
    "         ]\n" +
    "      },\n" +
    "      { \n" +
    "         \"country\":\"DE\",\n" +
    "         \"type\":\"delkredere\",\n" +
    "         \"label\":\"mrc.attachments.types.delkredere\",\n" +
    "         \"remark\":\"Collaterals\",\n" +
    "         \"is_collateral\":true,\n" +
    "         \"fields\":[ \n" +
    "            { \n" +
    "               \"field_label\":\"mrc.attachments.fields.delkredere.amount\",\n" +
    "               \"data_type\":\"Double\",\n" +
    "               \"mandatory\":true,\n" +
    "               \"field_in_db\":\"amount\"\n" +
    "            },\n" +
    "            { \n" +
    "               \"field_label\":\"mrc.attachments.fields.delkredere.amount_1\",\n" +
    "               \"data_type\":\"Double\",\n" +
    "               \"mandatory\":false\n" +
    "            },\n" +
    "            { \n" +
    "               \"field_label\":\"mrc.attachments.fields.delkredere.validity_date\",\n" +
    "               \"data_type\":\"Date\",\n" +
    "               \"mandatory\":true,\n" +
    "               \"field_in_db\":\"expiry_date\",\n" +
    "               \"validation_operation\":\"GREATER_THAN_AND_EQUALS\",\n" +
    "               \"validation_argument\":\"TODAY\"\n" +
    "            }\n" +
    "         ]\n" +
    "      },\n" +
    "      { \n" +
    "         \"country\":\"DE\",\n" +
    "         \"type\":\"andere_sicherheiten\",\n" +
    "         \"label\":\"mrc.attachments.types.andere_sicherheiten\",\n" +
    "         \"remark\":\"Collaterals\",\n" +
    "         \"is_collateral\":true,\n" +
    "         \"fields\":[ \n" +
    "            { \n" +
    "               \"field_label\":\"mrc.attachments.fields.andere_sicherheiten.amount\",\n" +
    "               \"data_type\":\"Double\",\n" +
    "               \"mandatory\":true,\n" +
    "               \"field_in_db\":\"amount\"\n" +
    "            },\n" +
    "            { \n" +
    "               \"field_label\":\"mrc.attachments.fields.andere_sicherheiten.validity_date\",\n" +
    "               \"data_type\":\"Date\",\n" +
    "               \"mandatory\":true,\n" +
    "               \"field_in_db\":\"expiry_date\",\n" +
    "               \"validation_operation\":\"GREATER_THAN_AND_EQUALS\",\n" +
    "               \"validation_argument\":\"TODAY\"\n" +
    "            }\n" +
    "         ]\n" +
    "      },\n" +
    "      { \n" +
    "         \"country\":\"DE\",\n" +
    "         \"type\":\"bill_of_exchange\",\n" +
    "         \"label\":\"mrc.attachments.types.bill_of_exchange\",\n" +
    "         \"remark\":\"Bill of exchange\",\n" +
    "         \"fields\":[ \n" +
    "            { \n" +
    "               \"field_label\":\"mrc.attachments.fields.bill_of_exchange.date_of_registration\",\n" +
    "               \"data_type\":\"Date\",\n" +
    "               \"mandatory\":true,\n" +
    "               \"validation_operation\":\"LESS_THAN_AND_EQUALS\",\n" +
    "               \"validation_argument\":\"TODAY\"\n" +
    "            },\n" +
    "            { \n" +
    "               \"field_label\":\"mrc.attachments.fields.bill_of_exchange.validity_date\",\n" +
    "               \"data_type\":\"Date\",\n" +
    "               \"mandatory\":true,\n" +
    "               \"field_in_db\":\"expiry_date\",\n" +
    "               \"validation_operation\":\"GREATER_THAN_AND_EQUALS\",\n" +
    "               \"validation_argument\":\"TODAY\"\n" +
    "            }\n" +
    "         ]\n" +
    "      }\n" +
    "   ]\n" +
    "}";

// export const ALL_ATTACHMENT_TYPES_JSON = "{ \n" +
//     "   \"attachment_types\":[ \n" +
//     "      { \n" +
//     "         \"country\":\"ALL\",\n" +
//     "         \"type\":\"general\",\n" +
//     "         \"label\":\"mrc.attachments.types.general\",\n" +
//     "         \"remark\":\"General\"\n" +
//     "      },\n" +
//     "      { \n" +
//     "         \"country\":\"DE\",\n" +
//     "         \"type\":\"contract\",\n" +
//     "         \"label\":\"mrc.attachments.types.contract\",\n" +
//     "         \"remark\":\"Digital version to improve efficiency\",\n" +
//     "         \"fields\":[ \n" +
//     "            { \n" +
//     "               \"field_label\":\"mrc.attachments.fields.start_date\",\n" +
//     "               \"data_type\":\"Date\",\n" +
//     "               \"mandatory\":true,\n" +
//     "               \"validation_operation\":\"LESS_THAN_AND_EQUALS\",\n" +
//     "               \"validation_argument\":\"TODAY\"\n" +
//     "            },\n" +
//     "            { \n" +
//     "               \"field_label\":\"mrc.attachments.fields.expiration_date\",\n" +
//     "               \"data_type\":\"Date\",\n" +
//     "               \"mandatory\":true,\n" +
//     "               \"field_in_db\":\"expiry_date\",\n" +
//     "               \"validation_operation\":\"GREATER_THAN_AND_EQUALS\",\n" +
//     "               \"validation_argument\":\"TODAY\"\n" +
//     "            }\n" +
//     "         ]\n" +
//     "      },\n" +
//     "      { \n" +
//     "         \"country\":\"DE\",\n" +
//     "         \"type\":\"bank_guarantee\",\n" +
//     "         \"label\":\"mrc.attachments.types.bank_guarantee\",\n" +
//     "         \"remark\":\"Collaterals\",\n" +
//     "         \"is_collateral\":true,\n" +
//     "         \"fields\":[ \n" +
//     "            { \n" +
//     "               \"field_label\":\"mrc.attachments.fields.amount\",\n" +
//     "               \"data_type\":\"Double\",\n" +
//     "               \"mandatory\":true,\n" +
//     "               \"field_in_db\":\"amount\"\n" +
//     "            },\n" +
//     "            { \n" +
//     "               \"field_label\":\"mrc.attachments.fields.validity_date\",\n" +
//     "               \"data_type\":\"Date\",\n" +
//     "               \"mandatory\":true,\n" +
//     "               \"field_in_db\":\"expiry_date\",\n" +
//     "               \"validation_operation\":\"GREATER_THAN_AND_EQUALS\",\n" +
//     "               \"validation_argument\":\"TODAY\"\n" +
//     "            }\n" +
//     "         ]\n" +
//     "      },\n" +
//     "      { \n" +
//     "         \"country\":\"DE\",\n" +
//     "         \"type\":\"warenkreditversicherung\",\n" +
//     "         \"label\":\"mrc.attachments.types.Warenkreditversicherung\",\n" +
//     "         \"remark\":\"Collaterals\",\n" +
//     "         \"is_collateral\":true,\n" +
//     "         \"fields\":[ \n" +
//     "            { \n" +
//     "               \"field_label\":\"mrc.attachments.fields.amount\",\n" +
//     "               \"data_type\":\"Double\",\n" +
//     "               \"mandatory\":true,\n" +
//     "               \"field_in_db\":\"amount\"\n" +
//     "            },\n" +
//     "            { \n" +
//     "               \"field_label\":\"mrc.attachments.fields.amount_1\",\n" +
//     "               \"data_type\":\"Double\",\n" +
//     "               \"mandatory\":true,\n" +
//     "               \"field_in_db\":\"amount\"\n" +
//     "            },\n" +
//     "            { \n" +
//     "               \"field_label\":\"mrc.attachments.fields.validity_date\",\n" +
//     "               \"data_type\":\"Date\",\n" +
//     "               \"mandatory\":true,\n" +
//     "               \"field_in_db\":\"expiry_date\",\n" +
//     "               \"validation_operation\":\"GREATER_THAN_AND_EQUALS\",\n" +
//     "               \"validation_argument\":\"TODAY\"\n" +
//     "            }\n" +
//     "         ]\n" +
//     "      },\n" +
//     "      { \n" +
//     "         \"country\":\"DE\",\n" +
//     "         \"type\":\"bürgschaft\",\n" +
//     "         \"label\":\"mrc.attachments.types.Bürgschaft\",\n" +
//     "         \"remark\":\"Collaterals\",\n" +
//     "         \"is_collateral\":true,\n" +
//     "         \"fields\":[ \n" +
//     "            { \n" +
//     "               \"field_label\":\"mrc.attachments.fields.amount\",\n" +
//     "               \"data_type\":\"Double\",\n" +
//     "               \"mandatory\":true,\n" +
//     "               \"field_in_db\":\"amount\"\n" +
//     "            },\n" +
//     "            { \n" +
//     "               \"field_label\":\"mrc.attachments.fields.amount_1\",\n" +
//     "               \"data_type\":\"Double\",\n" +
//     "               \"mandatory\":true,\n" +
//     "               \"field_in_db\":\"amount\"\n" +
//     "            },\n" +
//     "            { \n" +
//     "               \"field_label\":\"mrc.attachments.fields.validity_date\",\n" +
//     "               \"data_type\":\"Date\",\n" +
//     "               \"mandatory\":true,\n" +
//     "               \"field_in_db\":\"expiry_date\",\n" +
//     "               \"validation_operation\":\"GREATER_THAN_AND_EQUALS\",\n" +
//     "               \"validation_argument\":\"TODAY\"\n" +
//     "            }\n" +
//     "         ]\n" +
//     "      },\n" +
//     "      { \n" +
//     "         \"country\":\"DE\",\n" +
//     "         \"type\":\"delkredere\",\n" +
//     "         \"label\":\"mrc.attachments.types.Delkredere\",\n" +
//     "         \"remark\":\"Collaterals\",\n" +
//     "         \"is_collateral\":true,\n" +
//     "         \"fields\":[ \n" +
//     "            { \n" +
//     "               \"field_label\":\"mrc.attachments.fields.amount\",\n" +
//     "               \"data_type\":\"Double\",\n" +
//     "               \"mandatory\":true,\n" +
//     "               \"field_in_db\":\"amount\"\n" +
//     "            },\n" +
//     "            { \n" +
//     "               \"field_label\":\"mrc.attachments.fields.validity_date\",\n" +
//     "               \"data_type\":\"Date\",\n" +
//     "               \"mandatory\":true,\n" +
//     "               \"field_in_db\":\"expiry_date\",\n" +
//     "               \"validation_operation\":\"GREATER_THAN_AND_EQUALS\",\n" +
//     "               \"validation_argument\":\"TODAY\"\n" +
//     "            },\n" +
//     "            { \n" +
//     "               \"field_label\":\"mrc.attachments.fields.validity_date_1\",\n" +
//     "               \"data_type\":\"Date\",\n" +
//     "               \"mandatory\":true,\n" +
//     "               \"field_in_db\":\"expiry_date\",\n" +
//     "               \"validation_operation\":\"GREATER_THAN_AND_EQUALS\",\n" +
//     "               \"validation_argument\":\"TODAY\"\n" +
//     "            }\n" +
//     "         ]\n" +
//     "      },\n" +
//     "      { \n" +
//     "         \"country\":\"DE\",\n" +
//     "         \"type\":\"andere_sicherheiten\",\n" +
//     "         \"label\":\"mrc.attachments.types.Andere_Sicherheiten\",\n" +
//     "         \"remark\":\"Collaterals\",\n" +
//     "         \"is_collateral\":true,\n" +
//     "         \"fields\":[ \n" +
//     "            { \n" +
//     "               \"field_label\":\"mrc.attachments.fields.amount\",\n" +
//     "               \"data_type\":\"Double\",\n" +
//     "               \"mandatory\":true,\n" +
//     "               \"field_in_db\":\"amount\"\n" +
//     "            },\n" +
//     "            { \n" +
//     "               \"field_label\":\"mrc.attachments.fields.amount_1\",\n" +
//     "               \"data_type\":\"Double\",\n" +
//     "               \"mandatory\":true,\n" +
//     "               \"field_in_db\":\"amount\"\n" +
//     "            },\n" +
//     "            { \n" +
//     "               \"field_label\":\"mrc.attachments.fields.validity_date\",\n" +
//     "               \"data_type\":\"Date\",\n" +
//     "               \"mandatory\":true,\n" +
//     "               \"field_in_db\":\"expiry_date\",\n" +
//     "               \"validation_operation\":\"GREATER_THAN_AND_EQUALS\",\n" +
//     "               \"validation_argument\":\"TODAY\"\n" +
//     "            },\n" +
//     "            { \n" +
//     "               \"field_label\":\"mrc.attachments.fields.validity_date_1\",\n" +
//     "               \"data_type\":\"Date\",\n" +
//     "               \"mandatory\":true,\n" +
//     "               \"field_in_db\":\"expiry_date\",\n" +
//     "               \"validation_operation\":\"GREATER_THAN_AND_EQUALS\",\n" +
//     "               \"validation_argument\":\"TODAY\"\n" +
//     "            }\n" +
//     "         ]\n" +
//     "      },\n" +
//     "      { \n" +
//     "         \"country\":\"DE\",\n" +
//     "         \"type\":\"bill_of_exchange\",\n" +
//     "         \"label\":\"mrc.attachments.types.bill_of_exchange\",\n" +
//     "         \"remark\":\"Bill of exchange\",\n" +
//     "         \"fields\":[ \n" +
//     "            { \n" +
//     "               \"field_label\":\"mrc.attachments.fields.date_of_registration\",\n" +
//     "               \"data_type\":\"Date\",\n" +
//     "               \"mandatory\":true,\n" +
//     "               \"validation_operation\":\"LESS_THAN_AND_EQUALS\",\n" +
//     "               \"validation_argument\":\"TODAY\"\n" +
//     "            },\n" +
//     "            { \n" +
//     "               \"field_label\":\"mrc.attachments.fields.amount_1\",\n" +
//     "               \"data_type\":\"Double\",\n" +
//     "               \"mandatory\":true,\n" +
//     "               \"field_in_db\":\"amount\"\n" +
//     "            },\n" +
//     "            { \n" +
//     "               \"field_label\":\"mrc.attachments.fields.date_of_registration_1\",\n" +
//     "               \"data_type\":\"Date\",\n" +
//     "               \"mandatory\":true,\n" +
//     "               \"validation_operation\":\"LESS_THAN_AND_EQUALS\",\n" +
//     "               \"validation_argument\":\"TODAY\"\n" +
//     "            },\n" +
//     "            { \n" +
//     "               \"field_label\":\"mrc.attachments.fields.validity_date\",\n" +
//     "               \"data_type\":\"Date\",\n" +
//     "               \"mandatory\":true,\n" +
//     "               \"field_in_db\":\"expiry_date\",\n" +
//     "               \"validation_operation\":\"GREATER_THAN_AND_EQUALS\",\n" +
//     "               \"validation_argument\":\"TODAY\"\n" +
//     "            }\n" +
//     "         ]\n" +
//     "      }\n" +
//     "   ]\n" +
//     "}";
