export const comment = {
    comment:
        'Dolore quis esse excepteur ut laborum deserunt minim cillum exercitation ullamco. Ipsum adipisicing cupidatat sint enim pariatur duis consequat et nostrud. Sunt quis amet exercitation exercitation quis adipisicing enim nostrud excepteur et. Ut excepteur qui in cupidatat culpa esse incididunt duis. Elit ut ut minim esse eu non eu quis. Pariatur proident aliquip dolore nulla pariatur culpa in pariatur culpa in voluptate dolore duis. Laboris est aute duis esse velit amet reprehenderit culpa laborum veniam quis occaecat Lorem occaecat.',
    uploaderPrincipalName: 'John Doe',
    uploaderPosition: 'HOT',
    uploadTimestamp: '2019-02-02',
};

export const blocked = {
    comment: 'strategy.decision.blocked',
    uploaderPrincipalName: 'John Doe',
    uploaderPosition: 'HOT',
    uploadTimestamp: '2019-02-02',
};

export const comments = [
    {
        comment:
            'Proident incididunt minim ipsum amet. Aute magna qui quis laboris adipisicing dolor nisi esse consequat.',
        uploaderPrincipalName: 'John Doe',
        uploaderPosition: 'HOT',
        uploadTimestamp: '2019-02-02',
    },
    {
        comment:
            'Nisi voluptate eiusmod reprehenderit reprehenderit et id adipisicing est eu qui irure ipsum. Aute tempor quis occaecat incididunt. Eu fugiat eu consequat enim labore proident dolore adipisicing sit irure esse.',
        uploaderPrincipalName: 'John Doe',
        uploaderPosition: 'HOT',
        uploadTimestamp: '2019-02-02',
    },
    {
        comment:
            'Aliqua Lorem labore tempor reprehenderit adipisicing laboris. Deserunt minim proident deserunt proident enim labore laboris nulla velit culpa id velit. Eiusmod aliqua Lorem cupidatat est cillum anim consequat proident Lorem.',
        uploaderPrincipalName: 'Jane Doe',
        uploaderPosition: 'HOT',
        uploadTimestamp: '2019-02-02',
    },
    {
        comment: 'Eiusmod voluptate mollit pariatur quis non anim duis consequat aliqua culpa occaecat aute enim.',
        uploaderPrincipalName: 'John Doe',
        uploaderPosition: 'HOT',
        uploadTimestamp: '2019-02-02',
    },
    {
        comment:
            'Reprehenderit in incididunt adipisicing do ut ad consectetur culpa quis minim exercitation ipsum cupidatat. Velit velit qui esse dolor. Excepteur amet ea id exercitation tempor deserunt nisi occaecat consectetur.',
        uploaderPrincipalName: 'John Doe',
        uploaderPosition: 'HOT',
        uploadTimestamp: '2019-02-02',
    },
];

export const previousRequestsComments = [
    {
        startDate: '2020-04-01',
        finalState: 'FINAL STATE',
        groupLimit: 20400,
        appliedLimit: 14500,
        comments: [comments[2]],
    },
    {
        startDate: '2020-03-21',
        finalState: 'FINAL STATE',
        groupLimit: 19400,
        appliedLimit: null,
        comments: [comments[3], comments[0]],
    },
    {
        startDate: '2020-01-06',
        finalState: 'FINAL STATE',
        groupLimit: 5000,
        appliedLimit: 4500,
        comments: [comments[1], comments[2], comments[4]],
    },
];
