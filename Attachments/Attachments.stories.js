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

storiesOf('Service Components/Attachments', module)
    .add('standard', () => (
        <Attachments
            disabled={false}
            noPlaceholder={false}
            contractUrl={'http://example.com'}
            attachments={[
                {
                    status: 'missing',
                    fileType: 'bond',
                    secondaryInteraction: 'delete',
                    handleSecondaryAction: logDeleteFile,
                    disabled: true,
                },
                {
                    status: 'missing',
                    fileType: 'contract',
                    secondaryInteraction: 'add',
                },
                {
                    status: 'missing',
                    fileType: 'delkredere',
                    secondaryInteraction: 'add',
                },
                {
                    status: 'normal',
                    title: 'LVM 203',
                    contentType: 'application/msword',
                    fileType: 'Commercial Credit',
                    amount: '4000€',
                    expiryDate: new Date('2018-09-22'),
                    uploaderPrincipalName: 'joe.appleseed@metronom.com',
                    uploadTimestamp: '22.03.20, 10:56',
                    secondaryInteraction: 'delete',
                    handleSecondaryAction: logDeleteFile,
                },
                {
                    status: 'normal',
                    title: 'awsesome_company_Contract _final_2020.pdf',
                    contentType: 'application/pdf',
                    fileType: 'General',
                    amount: '',
                    expiryDate: '',
                    uploaderPrincipalName: 'joe.appleseed@metronom.com',
                    uploadTimestamp: new Date('2022-02-20'),
                    secondaryInteraction: 'delete',
                    handleSecondaryAction: logDeleteFile,
                },
                {
                    status: 'normal',
                    title: 'awsesome_company_Contract _final_2020.pdf',
                    contentType: 'application/pdf',
                    fileType: 'General',
                    amount: '300',
                    expiryDate: '',
                    uploaderPrincipalName: 'joe.appleseed@metronom.com',
                    uploadTimestamp: new Date('22-02-20'),
                    secondaryInteraction: 'delete',
                    handleSecondaryAction: logDeleteFile,
                },
                {
                    status: 'deleted',
                    title: 'HJK 20',
                    contentType: 'application/doc',
                    fileType: 'Commercial Credit Insurance',
                    amount: '500€',
                    expiryDate: new Date('2023-10-20'),
                    uploaderPrincipalName: 'joe.appleseed@metronom.com',
                    uploadTimestamp: '06.01.20, 16:35',
                    secondaryInteraction: 'restore',
                    handleSecondaryAction: logRestoreFile,
                },
            ]}
            fileTypes={['general', 'delkredere', 'warenkreditversicherung', 'contract']}
            addAttachment={logAddFile}
            savePlaceholder={(fileType) => console.log('saving placeholder of type ' + fileType)}
            country="DE"
        />
    ))
    .add('readonly', () => (
        <Attachments
            readonly={true}
            disabled={true}
            noPlaceholder={false}
            contractUrl={'http://example.com'}
            attachments={[
                {
                    status: 'missing',
                    fileType: 'bond',
                    secondaryInteraction: 'delete',
                    handleSecondaryAction: logDeleteFile,
                    disabled: true,
                },
                {
                    status: 'normal',
                    title: 'LVM 203',
                    contentType: 'application/msword',
                    fileType: 'Commercial Credit',
                    amount: '4000€',
                    expiryDate: '23.10.20',
                    uploaderPrincipalName: 'joe.appleseed@metronom.com',
                    uploadTimestamp: new Date('2023-10-20'),
                    secondaryInteraction: 'delete',
                    handleSecondaryAction: logDeleteFile,
                },
            ]}
            fileTypes={['general', 'delkredere', 'warenkreditversicherung', 'contract']}
            addAttachment={logAddFile}
            savePlaceholder={(fileType) => console.log('saving placeholder of type ' + fileType)}
            country="DE"
        />
    ))
    .add('collateral', () => (
        <Attachments
            readonly={false}
            disabled={false}
            noPlaceholder={false}
            contractUrl={'http://example.com'}
            attachments={[
                {
                    isCollateral: true,
                    status: 'normal',
                    title: 'LVM 203',
                    contentType: 'application/msword',
                    fileType: 'Commercial Credit',
                    amount: '4000€',
                    expiryDate: '23.10.20',
                    uploaderPrincipalName: 'joe.appleseed@metronom.com',
                    uploadTimestamp: new Date('2023-10-20'),
                    secondaryInteraction: null,
                    handleSecondaryAction: logDeleteFile,
                },
            ]}
            fileTypes={['general', 'delkredere', 'warenkreditversicherung', 'contract']}
            addAttachment={logAddFile}
            savePlaceholder={(fileType) => console.log('saving placeholder of type ' + fileType)}
            country="DE"
        />
    ))
    .add('disabled', () => (
        <Attachments
            disabled={true}
            attachments={[
                {
                    status: 'missing',
                    fileType: 'Commercial Credit Insurance missing',
                    secondaryInteraction: 'add',
                },
                {
                    status: 'normal',
                    title: 'LVM 203',
                    contentType: 'application/msword',
                    fileType: 'Commercial Credit Insurance',
                    amount: '4000€',
                    expiryDate: new Date('2020-02-02'),
                    uploaderPrincipalName: 'joe.appleseed@metronom.com',
                    uploadTimestamp: new Date('2020-02-02'),
                    secondaryInteraction: 'delete',
                },
            ]}
            fileTypes={['general', 'delkredere', 'warenkreditversicherung', 'contract']}
            addAttachment={() => console.log('adding file')}
            country="PL"
        />
    ))
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
                    title: 'RO Contract',
                    contentType: 'application/msword',
                    fileType: 'Contract',
                    amount: null,
                    expiryDate: null,
                    uploaderPrincipalName: 'ion.popescu@metrosystems.net',
                    uploadTimestamp: new Date('2020-10-22'),
                    secondaryInteraction: 'delete',
                    metadataJson:
                        '[{"label":"mrc.attachments.fields.contract.start_date","value":"22.10.2020","data_type":"Date"},' +
                        '{"label":"mrc.attachments.fields.contract.expiration_date","value":"25.10.2020","data_type":"Date"},' +
                        '{"label":"mrc.attachments.fields.contract.contract_id","value":3110032,"data_type":"Integer"},' +
                        '{"label":"mrc.attachments.fields.contract.type_of_contract","value":"C_and_C_TM","data_type":"Dropdown","optionLabelKey":"mrc.attachments.fields.contract.type.RO.option"}]',
                },
            ]}
            fileTypes={['general', 'contract', 'cec_avalizat_banca', 'scrisoare_garantie_bancara']}
            addAttachment={() => console.log('adding file')}
            country="RO"
        />
    ))
    .add('provide-info-cc', () => (
        <Attachments
            disabled={false}
            noPlaceholder={false}
            contractUrl={'http://example.com'}
            attachments={[
                {
                    status: 'missing',
                    fileType: 'bond',
                    secondaryInteraction: 'delete',
                    handleSecondaryAction: logDeleteFile,
                    disabled: true,
                },
                {
                    status: 'missing',
                    fileType: 'contract',
                    secondaryInteraction: 'add',
                },
                {
                    status: 'missing',
                    fileType: 'delkredere',
                    secondaryInteraction: 'add',
                },
                {
                    status: 'normal',
                    title: 'LVM 203',
                    contentType: 'application/msword',
                    fileType: 'Commercial Credit',
                    amount: '4000€',
                    expiryDate: '23.10.20',
                    uploaderPrincipalName: 'joe.appleseed@metronom.com',
                    uploadTimestamp: '22.03.20, 10:56',
                    secondaryInteraction: 'delete',
                    handleSecondaryAction: logDeleteFile,
                },
                {
                    status: 'normal',
                    title: 'awsesome_company_Contract _final_2020.pdf',
                    contentType: 'application/pdf',
                    fileType: 'General',
                    amount: '',
                    expiryDate: '',
                    uploaderPrincipalName: 'joe.appleseed@metronom.com',
                    uploadTimestamp: '22.02.20, 14:53',
                    secondaryInteraction: 'delete',
                    handleSecondaryAction: logDeleteFile,
                },
                {
                    status: 'deleted',
                    title: 'HJK 20',
                    contentType: 'application/doc',
                    fileType: 'Commercial Credit Insurance',
                    amount: '500€',
                    expiryDate: '23.10.20',
                    uploaderPrincipalName: 'joe.appleseed@metronom.com',
                    uploadTimestamp: '06.01.20, 16:35',
                    secondaryInteraction: 'restore',
                    handleSecondaryAction: logRestoreFile,
                },
            ]}
            // fileTypes={['general', 'delkredere', 'warenkreditversicherung', 'contract']}
            fileTypes={['general']}
            addAttachment={logAddFile}
            savePlaceholder={(fileType) => console.log('saving placeholder of type ' + fileType)}
            country="DE"
        />
    ));
