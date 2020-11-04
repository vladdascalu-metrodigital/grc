import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

// import '../Util/imports';

import Attachments from '../Attachments';

const logAddFile = (filetype, file, title, expiryDate, attachmentType) =>
    console.log('adding file of type: ' + filetype + ' and expiry: ' + expiryDate);
const logDeleteFile = () => console.log('deleting file');
const logRestoreFile = () => console.log('restoring file');

storiesOf('New UI Topics/Archive/Attachments', module)
    .add('RS', () => (
        <Attachments
            disabled={false}
            attachments={[
                {
                    status: 'normal',
                    title: 'LVM 203',
                    contentType: 'application/msword',
                    fileType: 'Contract',
                    amount: null,
                    expiryDate: new Date('2020-02-03'),
                    uploaderPrincipalName: 'joe.appleseed@metronom.com',
                    uploadTimestamp: new Date('2020-02-02'),
                    secondaryInteraction: 'delete',
                    metadataJson: '[{"label":"mrc.attachments.fields.contract.start_date","value":"07.05.2020"}]',
                },
            ]}
            fileTypes={['general', 'contract']}
            addAttachment={() => console.log('adding file')}
            country="RS"
        />
    ))
    .add('ES', () => (
        <Attachments
            disabled={false}
            attachments={[
                {
                    status: 'normal',
                    title: 'LVM 203',
                    contentType: 'application/msword',
                    fileType: 'Contract',
                    amount: null,
                    expiryDate: new Date('2020-02-03'),
                    uploaderPrincipalName: 'joe.appleseed@metronom.com',
                    uploadTimestamp: new Date('2020-02-02'),
                    secondaryInteraction: 'delete',
                    metadataJson: '[{"label":"mrc.attachments.fields.contract.start_date","value":"07.05.2020"}]',
                },
            ]}
            fileTypes={['general']}
            addAttachment={() => console.log('adding file')}
            country="ES"
        />
    ))
    .add('RO', () => (
        <Attachments
            disabled={false}
            attachments={[
                {
                    status: 'normal',
                    title:
                        'RO Contract foobar lakasdljasadfasdfghhhh sdsjfj lajsdlfjasdf asldflas jdalfjsdfjasdlfjl adsf',
                    contentType: 'application/msword',
                    fileType: 'Contract',
                    amount: '4000€',
                    expiryDate: new Date('2020-02-02'),
                    uploaderPrincipalName: 'ion.popescu@metrosystems.net',
                    uploadTimestamp: '2020-10-22T16:27:00',
                    secondaryInteraction: 'delete',
                    metadataJson:
                        '[{"label":"mrc.attachments.fields.contract.start_date","value":"22.10.2020","data_type":"Date"},' +
                        '{"label":"mrc.attachments.fields.contract.expiration_date","value":"25.10.2020","data_type":"Date"},' +
                        '{"label":"mrc.attachments.fields.contract.contract_id","value":3110032,"data_type":"Integer"},' +
                        '{"label":"mrc.attachments.fields.contract.type_of_contract","value":"C_and_C_TM","data_type":"Dropdown","optionLabelKey":"mrc.attachments.fields.contract.type.RO.option"}]',
                },
                {
                    status: 'normal',
                    title:
                        'RO Contract foobar lakasdljasadfasdfghhhh sdsjfj lajsdlfjasdf asldflas jdalfjsdfjasdlfjl adsf',
                    contentType: 'application/msword',
                    fileType: 'Contract',
                    amount: '4000€',
                    expiryDate: new Date('2020-02-02'),
                    uploaderPrincipalName: 'ion.popescu@metrosystems.net',
                    uploadTimestamp: '2020-10-22T16:27:00',
                    secondaryInteraction: 'delete',
                    metadataJson:
                        '[{"label":"mrc.attachments.fields.contract.start_date","value":"22.10.2020","data_type":"Date"},' +
                        '{"label":"mrc.attachments.fields.contract.contract_id","value":3110032,"data_type":"Integer"},' +
                        '{"label":"mrc.attachments.fields.contract.type_of_contract","value":"C_and_C_TM","data_type":"Dropdown","optionLabelKey":"mrc.attachments.fields.contract.type.RO.option"}]',
                },
            ]}
            fileTypes={['general', 'contract', 'cec_avalizat_banca', 'scrisoare_garantie_bancara']}
            addAttachment={() => console.log('adding file')}
            country="RO"
        />
    ))
    .add('RO without metadata', () => (
        <Attachments
            disabled={false}
            attachments={[
                {
                    status: 'normal',
                    title:
                        'RO Contract foobar lakasdljasadfasdfghhhh sdsjfj lajsdlfjasdf asldflas jdalfjsdfjasdlfjl adsf',
                    contentType: 'application/msword',
                    fileType: 'Contract',
                    amount: '4000€',
                    expiryDate: new Date('2020-02-02'),
                    uploaderPrincipalName: 'ion.popescu@metrosystems.net',
                    uploadTimestamp: '2020-10-22T16:27:00',
                    secondaryInteraction: 'delete',
                    metadataJson: '[]',
                },
            ]}
            fileTypes={['general', 'contract', 'cec_avalizat_banca', 'scrisoare_garantie_bancara']}
            addAttachment={() => console.log('adding file')}
            country="RO"
        />
    ));
