const diveLinker = new DiveLinker('dive1');

let currentProject = '30590';
let userId = null;
let valueFrom30448 = 0;
let valueFrom30603 = 0;
let valueFrom30599 = 0;
let valueFrom30602 = 0;
let valueFrom30601 = 0;
let valueFrom30443 = 0;
let valueFrom30447 = 0;
let valueFrom30414 = 0;
let valueFrom30605 = 0;
let valueFrom30410 = 0;

function setProject(projectId) {
    diveLinker.setProject(projectId);
    currentProject = projectId;
    console.log(`Set project to ${projectId}`);

    // 存储当前项目到 Firebase
    if (userId) {
        firebase.firestore().collection('userProgress').doc(userId).set({
            currentProject: projectId
        }, { merge: true });
    }
}

function getNextStage() {
    if (currentProject === '30590') {
        return '30699';
    } else if (currentProject === '30699') {
        const mammalsOutput = diveLinker.getAttr('acf3f141f237480aa6348f33746694ef');
        const arthropodsOutput = diveLinker.getAttr('3207de6f8b8e47a98aebfaaedd084118');

        if (mammalsOutput === 1) {
            return '30594';
        } else if (arthropodsOutput === 1) {
            return '30595';
        }
    } else if (currentProject === '30594') {
        return '30448';
    } else if (currentProject === '30595') {
        return '30603';
    } else if (currentProject === '30448') {
        valueFrom30448 = parseInt(diveLinker.getAttr('477c82f179d14522b6fac6b8d8a61c79'));
        return '30599';
    } else if (currentProject === '30603') {
        valueFrom30603 = parseInt(diveLinker.getAttr('3c9da4886fa84d07952e02e06f8a3870'));
        return '30602';
    } else if (currentProject === '30599') {
        valueFrom30599 = parseInt(diveLinker.getAttr('d9aa94a1694044989f5783760838ee37'));
        return '30601';
    } else if (currentProject === '30602') {
        valueFrom30602 = parseInt(diveLinker.getAttr('a1b4f57dbc7642b6b2d245c1cb77bb37'));
        return '30443';
    } else if (currentProject === '30601') {
        valueFrom30601 = parseInt(diveLinker.getAttr('a1b4f57dbc7642b6b2d245c1cb77bb37'));
        return '30447';
    } else if (currentProject === '30443') {
        valueFrom30443 = parseInt(diveLinker.getAttr('90899e0eef064729b27f41a1728eaa35'));
        return '30605';
    } else if (currentProject === '30447') {
        valueFrom30447 = parseInt(diveLinker.getAttr('30aa5e91843e468fac7cf6abe71cd10c'));
        return '30414';
    } else if (currentProject === '30605') {
        valueFrom30605 = parseInt(diveLinker.getAttr('23a59353accf442694adb5ff024b3eb3'));
        return '30410';
    } else if (currentProject === '30414') {
        const outputValue30414 = parseInt(diveLinker.getAttr('5f7d12ea2145450eab69b9b79630d03c'));
        valueFrom30414 = outputValue30414 + valueFrom30448 + valueFrom30599 + valueFrom30601 + valueFrom30447;

        if (valueFrom30414 > 80 && valueFrom30410 > 80) {
            return '30670';
        } else if (valueFrom30414 > 80 && valueFrom30410 <= 80) {
            return '30595';
        } else if (valueFrom30414 <= 80 && valueFrom30410 > 80) {
            return '30594';
        } else {
            return Math.random() < 0.5 ? '30594' : '30595';
        }
    } else if (currentProject === '30410') {
        const outputValue30410 = parseInt(diveLinker.getAttr('0afc0f39c48a453cb1fd32d5d11ae4da'));
        valueFrom30410 = outputValue30410 + valueFrom30603 + valueFrom30602 + valueFrom30443 + valueFrom30605;

        if (valueFrom30414 > 80 && valueFrom30410 > 80) {
            return '30670';
        } else if (valueFrom30414 <= 80 && valueFrom30410 > 80) {
            return '30594';
        } else if (valueFrom30414 > 80 && valueFrom30410 <= 80) {
            return '30595';
        } else {
            return Math.random() < 0.5 ? '30594' : '30595';
        }
    } else if (currentProject === '30670') {
        const outputValue30670 = parseInt(diveLinker.getAttr('ea3149c1a213403d91e83a0d83a88a07'));
        if (outputValue30670 === 1) {
            return '30617';
        } else if (outputValue30670 === 0) {
            return '30670';
        }
    } else if (currentProject === '30617') {
        return '30625';
    } else if (currentProject === '30625') {
        const outputValue30625 = parseInt(diveLinker.getAttr('522a12e421de43f8be907eebba83c00a'));
        if (outputValue30625 === 1) {
            return '30634';
        } else if (outputValue30625 === 0) {
            return '30625';
        }
    } else if (currentProject === '30634') {
        const outputValue30634 = parseInt(diveLinker.getAttr('9c8ab52b37cd40a7ac8cfa477b29c51d'));
        if (outputValue30634 === 1) {
            return '30643';
        } else if (outputValue30634 === 0) {
            return '30645';
        }
    }
    return null;
}

function updateLearningProgress(progress) {
    if (userId) {
        firebase.firestore().collection('userProgress').doc(userId).set({
            learning: progress
        }, { merge: true });
    }
}

function checkAndSetNextProject() {
    if (diveLinker.checkComplete()) {
        const nextStage = getNextStage();
        if (nextStage) {
            setProject(nextStage);
            setTimeout(() => {
                if (currentProject === '30599') {
                    diveLinker.setInput([{ id: '477c82f179d14522b6fac6b8d8a61c79', value: valueFrom30448 }]);
                } else if (currentProject === '30602') {
                    diveLinker.setInput([{ id: '3c9da4886fa84d07952e02e06f8a3870', value: valueFrom30603 }]);
                } else if (currentProject === '30601') {
                    const finalValue30601 = valueFrom30448 + valueFrom30599 + valueFrom30601;
                    diveLinker.setInput([
                        { id: '477c82f179d14522b6fac6b8d8a61c79', value: valueFrom30448 },
                        { id: 'd9aa94a1694044989f5783760838ee37', value: valueFrom30599 },
                        { id: 'a1b4f57dbc7642b6b2d245c1cb77bb37', value: finalValue30601 }
                    ]);
                } else if (currentProject === '30443') {
                    const finalValue30443 = valueFrom30603 + valueFrom30602 + valueFrom30443;
                    diveLinker.setInput([
                        { id: '3c9da4886fa84d07952e02e06f8a3870', value: valueFrom30603 },
                        { id: 'a1b4f57dbc7642b6b2d245c1cb77bb37', value: valueFrom30602 },
                        { id: '90899e0eef064729b27f41a1728eaa35', value: finalValue30443 }
                    ]);
                } else if (currentProject === '30447') {
                    const finalValue30447 = valueFrom30448 + valueFrom30599 + valueFrom30601 + valueFrom30447;
                    diveLinker.setInput([
                        { id: '477c82f179d14522b6fac6b8d8a61c79', value: valueFrom30448 },
                        { id: 'd9aa94a1694044989f5783760838ee37', value: valueFrom30599 },
                        { id: 'a1b4f57dbc7642b6b2d245c1cb77bb37', value: finalValue30447 }
                    ]);
                } else if (currentProject === '30605') {
                    const finalValue30605 = valueFrom30603 + valueFrom30602 + valueFrom30443 + valueFrom30605;
                    diveLinker.setInput([
                        { id: '3c9da4886fa84d07952e02e06f8a3870', value: valueFrom30603 },
                        { id: 'a1b4f57dbc7642b6b2d245c1cb77bb37', value: valueFrom30602 },
                        { id: '90899e0eef064729b27f41a1728eaa35', value: valueFrom30443 },
                        { id: '23a59353accf442694adb5ff024b3eb3', value: finalValue30605 }
                    ]);
                } else if (currentProject === '30414') {
                    if (valueFrom30414 > 80 && valueFrom30410 > 80) {
                        updateLearningProgress('完成哺乳動物、節肢動物學習');
                    } else if (valueFrom30414 > 80) {
                        updateLearningProgress('完成哺乳類動物學習');
                    } else if (valueFrom30410 > 80) {
                        updateLearningProgress('完成節肢動物學習');
                    } else {
                        updateLearningProgress('未完成哺乳動物、節肢動物學習');
                    }
                }
            }, 1000);
        }
    }
}

// 定时检查项目完成状态并处理跳转逻辑
setInterval(() => {
    checkAndSetNextProject();
}, 1000);

setProject('30590'); // 初始化设置第一个项目

// 初始化 Firebase
  // Initialize Firebase
        var firebaseConfig = {
            apiKey: "AIzaSyAifZ76m-W79Ptw3gJVGsolZDnoXu72mDc",
            authDomain: "biologylearning-s11055013.firebaseapp.com",
            projectId: "biologylearning-s11055013",
            storageBucket: "biologylearning-s11055013.appspot.com",
            messagingSenderId: "743496923725",
            appId: "1:743496923725:web:866adef56bd80b02d53a04"
        };
        firebase.initializeApp(firebaseConfig);

        // Handle authentication state changes
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                document.getElementById('user-info').textContent = 'Hello, ' + user.displayName;
                document.getElementById('logout-btn').style.display = 'inline';
                document.getElementById('google-login-btn').style.display = 'none';
            } else {
                document.getElementById('user-info').textContent = '未登录';
                
            }
        });
