export default {
    created: Date.now(),
    status: {
        happyPercent: 20,
        hungryPercent: 20,
        hygienePercent: 20,
        updateHappy: Date.now(),
        updateHungry: Date.now(),
        updateHygiene: Date.now(),
    },
    money: 500,
    step: {
        total: 0,
        today: 0,
        history: []
    },
    achievement:
        [
            {
                id: '001',
                name: 'First 1000 steps',
                percent: 0,
                type: 'step',
                done: false
            },
            {
                id: '002',
                name: 'First 2000 steps',
                percent: 0,
                type: 'step',
                done: false
            },
            {
                id: '003',
                name: 'First 5000 steps',
                percent: 0,
                type: 'step',
                done: false
            },
            {
                id: '004',
                name: 'First 10000 steps',
                percent: 0,
                type: 'step',
                done: false
            },
            {
                id: '005',
                name: 'First 20000 steps',
                percent: 0,
                type: 'step',
                done: false
            },
            {
                id: '006',
                name: 'First 50000 steps',
                percent: 0,
                type: 'step',
                done: false
            },
        ],
    tutorial: true,
    voiceLanguage: 'en-US',
    voiceServerIP: '',
    background: 'normal',
    backgroundPink: false
}