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
    // 省略部分代碼，保持原樣
    // 返回下一個階段的邏輯保持不變
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

                // 檢查是否為專案30594，並更新Firebase狀態
                if (currentProject === '30594') {
                    sendMessageToParent({
                        type: 'updateFirebaseStatus',
                        status: '已完成'
                    });
                }
            }, 1000);
        }
    }
}

// 定时检查项目完成状态并处理跳转逻辑
setInterval(() => {
    checkAndSetNextProject();
}, 1000);

setProject('30590'); // 初始化设置第一个项目。
