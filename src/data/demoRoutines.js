import i18n from '../i18n.js';

export const getDemoRoutines = () => {
    const t = i18n.t.bind(i18n);
    return [
        {
            id: "demo-routine-1",
            name: t('demo.routine1.name'),
            exercises: [
                {id: "d1-e1", name: t('demo.routine1.e1'), durationSeconds: 30, isSideSwitchRequired: false},
                {id: "d1-e2", name: t('demo.routine1.e2'), durationSeconds: 30, isSideSwitchRequired: true},
                {id: "d1-e3", name: t('demo.routine1.e3'), durationSeconds: 20, isSideSwitchRequired: false},
                {id: "d1-e4", name: t('demo.routine1.e4'), durationSeconds: 30, isSideSwitchRequired: true},
                {id: "d1-e5", name: t('demo.routine1.e5'), durationSeconds: 20, isSideSwitchRequired: false},
            ],
        },
        {
            id: "demo-routine-2",
            name: t('demo.routine2.name'),
            exercises: [
                {id: "d2-e1", name: t('demo.routine2.e1'), durationSeconds: 30, isSideSwitchRequired: true},
                {id: "d2-e2", name: t('demo.routine2.e2'), durationSeconds: 20, isSideSwitchRequired: false},
                {id: "d2-e3", name: t('demo.routine2.e3'), durationSeconds: 30, isSideSwitchRequired: false},
                {id: "d2-e4", name: t('demo.routine2.e4'), durationSeconds: 40, isSideSwitchRequired: true},
                {id: "d2-e5", name: t('demo.routine2.e5'), durationSeconds: 30, isSideSwitchRequired: true},
            ],
        },
    ];
};