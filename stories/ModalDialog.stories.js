import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import MainContent from '../MainContent';
import ModalDialog, { ModalDialogSimple } from '../ModalDialog';
import DatePicker from '../DatePicker';
import TextInput from '../TextInput';

storiesOf('Fundamentals/ModalDialog', module)
    .add('ModalDialog', () => {
        let modalContent = (
            <p>
                Voluptate eiusmod est dolore veniam est in ea velit consequat quis. Laboris qui ullamco amet id amet
                reprehenderit aute Lorem officia ex veniam commodo. Deserunt id eiusmod laboris eiusmod exercitation non
                commodo aute elit. Sit deserunt magna consectetur elit anim quis tempor laborum qui adipisicing. Eiusmod
                occaecat consequat sit commodo amet culpa culpa est.
            </p>
        );
        return (
            <MainContent>
                <ModalDialog toggle={() => {}} content={modalContent} title="A Modal Story" />
            </MainContent>
        );
    })
    .add('Simple ModalDialog', () => {
        return (
            <MainContent>
                <ModalDialogSimple
                    onCancel={() => action('onCancel')('onCancel')}
                    title="A Modal Story"
                    onOk={() => action('onOk')('onOk')}
                    cancelText="Cancel"
                    okText="Approve"
                >
                    <p>
                        Voluptate eiusmod est dolore veniam est in ea velit consequat quis. Laboris qui ullamco amet id
                        amet reprehenderit aute Lorem officia ex veniam commodo. Deserunt id eiusmod laboris eiusmod
                        exercitation non commodo aute elit. Sit deserunt magna consectetur elit anim quis tempor laborum
                        qui adipisicing. Eiusmod occaecat consequat sit commodo amet culpa culpa est.
                    </p>
                </ModalDialogSimple>
            </MainContent>
        );
    })
    .add('Too Much Content', () => {
        let modalContent = (
            <div>
                <p>
                    Voluptate eiusmod est dolore veniam est in ea velit consequat quis. Laboris qui ullamco amet id amet
                    reprehenderit aute Lorem officia ex veniam commodo. Deserunt id eiusmod laboris eiusmod exercitation
                    non commodo aute elit. Sit deserunt magna consectetur elit anim quis tempor laborum qui adipisicing.
                    Eiusmod occaecat consequat sit commodo amet culpa culpa est.
                </p>
                <p>
                    Amet laboris eiusmod deserunt ullamco exercitation et labore cillum mollit minim amet veniam ea.
                    Officia et esse dolore proident adipisicing quis excepteur culpa laborum aute sunt aliqua. Sunt
                    ipsum mollit aliqua deserunt reprehenderit qui duis. Irure ea ad laboris culpa reprehenderit amet
                    fugiat esse ad est cupidatat pariatur nostrud enim. Cupidatat sint qui culpa incididunt
                    reprehenderit exercitation nulla ea ut voluptate. Proident aute deserunt anim eu reprehenderit
                    consectetur.
                </p>
                <p>
                    Occaecat sit magna minim esse aute laboris dolor eu nisi sint minim consequat amet. Enim aliquip
                    pariatur ullamco duis minim nisi consectetur id non dolor eu amet. Ullamco tempor ullamco
                    consectetur esse duis. Quis ad qui aliqua nisi deserunt fugiat veniam nulla quis dolor pariatur
                    culpa magna. Ex minim ex elit commodo magna dolor aute consequat. Magna aliqua magna ut occaecat ut
                    enim culpa reprehenderit dolore commodo.
                </p>
                <p>
                    Lorem cillum mollit anim aliqua irure elit fugiat nulla. Esse sit velit fugiat aliquip. Dolor
                    voluptate deserunt aute duis tempor tempor aute ad proident eiusmod ex laborum. Aliquip quis esse
                    velit officia magna pariatur occaecat Lorem esse amet dolor nulla est non. Est velit anim laboris do
                    aliquip esse. Aliqua ad reprehenderit nulla qui nulla pariatur occaecat officia exercitation do
                    nostrud commodo est in.
                </p>
                <p>
                    Consectetur aliquip consectetur minim laborum elit. Nulla mollit cupidatat incididunt laboris.
                    Dolore amet ex dolor aute ex minim in fugiat occaecat esse. Et id cupidatat ex sint magna id commodo
                    deserunt elit. Et ullamco aute consectetur consectetur duis. Nulla reprehenderit adipisicing duis
                    cupidatat sunt enim aute cillum labore cupidatat fugiat et velit mollit. Pariatur culpa cillum
                    excepteur esse minim esse sit minim ad consectetur deserunt.
                </p>
                <p>
                    Reprehenderit commodo in magna sunt aliqua velit eiusmod sunt. Commodo fugiat proident reprehenderit
                    consectetur tempor proident qui est fugiat ex id et incididunt anim. Sunt pariatur sint ea ea enim
                    amet excepteur officia elit tempor quis eu velit consequat. Excepteur commodo consectetur sit minim
                    labore id consectetur minim adipisicing sint occaecat. Ad sunt anim sint sint Lorem consequat nulla
                    ea ut esse sunt non nulla esse. Laboris incididunt est ipsum in culpa nulla quis pariatur anim nisi
                    ea non anim elit.
                </p>
                <p>
                    Ea culpa fugiat cupidatat minim quis sit velit minim. Elit velit sit eu laboris. Excepteur fugiat
                    fugiat officia do laborum nulla occaecat fugiat. Eu velit et fugiat culpa tempor voluptate aliquip
                    quis mollit Lorem sint elit duis commodo. Ad eiusmod aute dolore in sunt labore aute officia aliqua
                    mollit qui mollit. Eiusmod reprehenderit enim ad commodo esse quis et enim nulla.
                </p>
                <p>
                    Eiusmod deserunt velit pariatur ad elit ipsum est consectetur. Aliquip deserunt aute irure laborum
                    officia laborum. Occaecat officia eiusmod nulla officia enim mollit ullamco est reprehenderit. Elit
                    eiusmod enim cillum esse do qui dolor aute. Deserunt fugiat dolore eu dolor in ad occaecat. Deserunt
                    sit in officia ipsum laboris laboris culpa. Ut ullamco occaecat dolor do ullamco pariatur aliqua
                    esse commodo ut sunt.
                </p>
                <p>
                    Do occaecat est consectetur nulla laborum ea. Aliquip eu esse velit minim do do. Ut eiusmod labore
                    incididunt quis qui et nulla. Sit culpa voluptate adipisicing enim velit eu dolor velit cupidatat
                    commodo. Irure labore tempor excepteur ullamco incididunt irure voluptate enim non Lorem. Consequat
                    ad esse dolor occaecat aliquip occaecat proident ea reprehenderit incididunt ullamco adipisicing
                    cillum.
                </p>
                <p>
                    Voluptate dolore irure eu adipisicing consectetur cillum adipisicing nulla eu sit sint cillum mollit
                    ad. Id magna aliquip fugiat culpa amet Lorem eu. Esse do occaecat Lorem magna tempor.
                </p>
            </div>
        );
        return (
            <MainContent>
                <ModalDialog toggle={() => {}} content={modalContent} title="A Modal Story" />
            </MainContent>
        );
    })
    .add('Date Overflow', () => {
        let modalContent = (
            <div style={{ display: 'grid', gridGap: '1rem' }}>
                <TextInput />
                <TextInput />
                <TextInput />
                <TextInput />
                <TextInput />
                <DatePicker />
                <TextInput />
                <TextInput />
                <TextInput />
                <TextInput />
                <TextInput />
            </div>
        );
        return (
            <MainContent>
                <ModalDialog toggle={() => {}} content={modalContent} title="A Date" />
            </MainContent>
        );
    });
