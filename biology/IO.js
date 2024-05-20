const diveLinker = new DiveLinker('dive1');

let currentProject = '30590';
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
        valueFrom30414 = parseInt(diveLinker.getAttr('5f7d12ea2145450eab69b9b79630d03c'));
        return null; // Wait for 30410 to complete
    } else if (currentProject === '30410') {
        valueFrom30410 = parseInt(diveLinker.getAttr('0afc0f39c48a453cb1fd32d5d11ae4da'));
        if (valueFrom30414 > 80 && valueFrom30410 > 80) {
            return '30670';
        } else if (valueFrom30414 > 80 && valueFrom30410 <= 80) {
            return '30595';
        } else if (valueFrom30414 <= 80 && valueFrom30410 > 80) {
            return '30594';
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

function sendMessageToParent(message) {
    console.log("Sending message to parent:", message);
    window.parent.postMessage(message, '*'); // 使用 '*' 確保消息可以被父頁面接收
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
                }

                // 檢查專案30594的完成狀態並更新Firebase狀態
                if (currentProject === '30594') {
                    if (diveLinker.checkComplete()) {
                        sendMessageToParent({
                            type: 'updateFirebaseStatus',
                            status: '已完成哺乳類動物影片觀看',
                            field: 'mammalsvideo'
                        });
                    } else {
                        sendMessageToParent({
                            type: 'updateFirebaseStatus',
                            status: '未完成哺乳類動物影片觀看',
                            field: 'mammalsvideo'
                        });
                    }
                }

                // 檢查專案30595的完成狀態並更新Firebase狀態
                if (currentProject === '30595') {
                    if (diveLinker.checkComplete()) {
                        sendMessageToParent({
                            type: 'updateFirebaseStatus',
                            status: '已完成節肢類動物影片觀看',
                            field: 'arthropodsvideo'
                        });
                    } else {
                        sendMessageToParent({
                            type: 'updateFirebaseStatus',
                            status: '未完成節肢類動物影片觀看',
                            field: 'arthropodsvideo'
                        });
                    }
                }

                // 判斷專案30414和30410的輸出值
                if (currentProject === '30414' || currentProject === '30410') {
                    const value30414 = parseInt(diveLinker.getAttr('5f7d12ea2145450eab69b9b79630d03c'));
                    const value30410 = parseInt(diveLinker.getAttr('0afc0f39c48a453cb1fd32d5d11ae4da'));

                    if (value30414 <= 80 || value30410 <= 80) {
                        sendMessageToParent({
                            type: 'updateFirebaseStatus',
                            status: '未完成哺乳動物、節肢動物測驗',
                            field: 'learning'
                        });
                    } else {
                        const learningStatus = getLearningStatus(value30414, value30410);
                        sendMessageToParent({
                            type: 'updateFirebaseStatus',
                            status: learningStatus,
                            field: 'learning'
                        });
                    }
                }

                // 檢查專案30670的輸出值
                if (currentProject === '30670') {
                    const outputValue30670 = parseInt(diveLinker.getAttr('ea3149c1a213403d91e83a0d83a88a07'));
                    const registerStatus = outputValue30670 === 1 ? '已完成協助分報名表單任務' : '未完成協助分報名表單任務';
                    sendMessageToParent({
                        type: 'updateFirebaseStatus',
                        status: registerStatus,
                        field: 'register'
                    });
                }

                if (currentProject === '30625') {
                    const outputValue30625 = parseInt(diveLinker.getAttr('522a12e421de43f8be907eebba83c00a'));
                    const invitationStatus = outputValue30625 === 1 ? '已完成協助發送邀請函任務' : '未完成協助發送邀請函任務';
                    sendMessageToParent({
                        type: 'updateFirebaseStatus',
                        status: invitationStatus,
                        field: 'invitation'
                    });
                }

                if (currentProject === '30634') {
                    const outputValue30634 = parseInt(diveLinker.getAttr('9c8ab52b37cd40a7ac8cfa477b29c51d'));
                    const natureStatus = outputValue30634 === 1 ? '守護了自然環境！' : '已呼籲守護自然環境的重要！';
                    sendMessageToParent({
                        type: 'updateFirebaseStatus',
                        status: natureStatus,
                        field: 'nature'
                    });
                }
            }, 1000);
        }
    }
}

function getLearningStatus(value30414, value30410) {
    if (value30414 > 80 && value30410 > 80) {
        return '完成哺乳動物、節肢動物測驗';
    } else if (value30414 > 80 && value30410 <= 80) {
        return '僅完成哺乳類動物測驗';
    } else if (value30414 <= 80 && value30410 > 80) {
        return '僅完成節肢動物類測驗';
    } else {
        return '未完成哺乳動物、節肢動物測驗';
    }
}

// 定时检查项目完成状态并处理跳转逻辑
setInterval(() => {
    checkAndSetNextProject();
}, 1000);

setProject('30590'); // 初始化设置第一个项目。
