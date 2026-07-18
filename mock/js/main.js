document.addEventListener('DOMContentLoaded', () => {
    // 状態管理
    const state = {
        fireworks: [], // リレーで保存された花火データ { name, comment, color }
        selectedColor: '#ff4757', // デフォルト選択色（赤）
    };

    // DOM要素の取得
    const inputSection = document.getElementById('input-section');
    const launchSection = document.getElementById('launch-section');
    const messageOverlay = document.getElementById('message-overlay');
    const resetOverlay = document.getElementById('reset-overlay');

    const inputName = document.getElementById('user-name');
    const inputComment = document.getElementById('user-comment');
    const colorSwatches = document.querySelectorAll('.color-swatch');

    const btnNext = document.getElementById('btn-next');
    const btnLaunch = document.getElementById('btn-launch');
    const btnReset = document.getElementById('btn-reset');

    const relayCount = document.getElementById('relay-count');
    const relayList = document.getElementById('relay-list');

    const currentSender = document.getElementById('current-sender');
    const currentText = document.getElementById('current-text');

    /* ==========================================================================
       1. カラーパレットの選択制御
       ========================================================================== */
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', (e) => {
            // すべての swatch から active クラスを削除
            colorSwatches.forEach(s => s.classList.remove('active'));
            
            // クリックされた swatch に active クラスを追加
            const target = e.currentTarget;
            target.classList.add('active');
            
            // 選択された色を状態に保存
            state.selectedColor = target.dataset.color;
        });
    });

    /* ==========================================================================
       2. リレーリストの表示更新
       ========================================================================== */
    const updateRelayDisplay = () => {
        const count = state.fireworks.length;
        relayCount.textContent = count;

        // リストをクリア
        relayList.innerHTML = '';

        if (count === 0) {
            const emptyLi = document.createElement('li');
            emptyLi.className = 'relay-empty-message';
            emptyLi.textContent = '最初のメッセージをセットしてください';
            relayList.appendChild(emptyLi);

            // 打ち上げボタンの無効化
            btnLaunch.disabled = true;
            btnLaunch.classList.add('is-disabled');
        } else {
            // 登録されたデータを逆順で表示（新しいものが上）
            [...state.fireworks].reverse().forEach(data => {
                const li = document.createElement('li');
                li.className = 'relay-item';

                // 色表示用の丸いインジケーター
                const indicator = document.createElement('div');
                indicator.className = 'relay-item-color-indicator';
                indicator.style.backgroundColor = data.color; // 動的なインラインカラー指定は許容（アセット色のため）
                indicator.style.boxShadow = `0 0 8px ${data.color}`;

                const contentDiv = document.createElement('div');
                contentDiv.className = 'relay-item-content';

                const senderSpan = document.createElement('span');
                senderSpan.className = 'relay-item-sender';
                senderSpan.textContent = `${data.name} さん`;

                const textSpan = document.createElement('span');
                textSpan.className = 'relay-item-text';
                textSpan.textContent = data.comment;

                contentDiv.appendChild(senderSpan);
                contentDiv.appendChild(textSpan);
                li.appendChild(indicator);
                li.appendChild(contentDiv);
                relayList.appendChild(li);
            });

            // 打ち上げボタンの有効化
            btnLaunch.disabled = false;
            btnLaunch.classList.remove('is-disabled');
        }
    };

    /* ==========================================================================
       3. 「つなぐ」ボタンの処理
       ========================================================================== */
    btnNext.addEventListener('click', () => {
        const name = inputName.value.trim();
        const comment = inputComment.value.trim();

        // 簡易バリデーション
        if (!name) {
            alert('お名前を入力してください。');
            inputName.focus();
            return;
        }
        if (!comment) {
            alert('メッセージを入力してください。');
            inputComment.focus();
            return;
        }

        // データを追加
        state.fireworks.push({
            name: name,
            comment: comment,
            color: state.selectedColor
        });

        // 表示を更新
        updateRelayDisplay();

        // フォームをクリア（名前は残し、コメントのみクリアすると連続入力しやすい）
        inputComment.value = '';
        inputComment.focus();
    });

    /* ==========================================================================
       4. 「夜空に打ち上げる！」ボタンの処理
       ========================================================================== */
    btnLaunch.addEventListener('click', () => {
        if (state.fireworks.length === 0) return;

        // 入力画面から打ち上げ画面へ切り替え
        inputSection.classList.remove('active');
        launchSection.classList.add('active');

        // 打ち上げ演出の開始
        // firework.js で定義される演出関数を呼び出す
        if (typeof window.startFireworksShow === 'function') {
            window.startFireworksShow(state.fireworks, {
                onMessageShow: (name, comment) => {
                    // メッセージを更新してフェードイン表示
                    currentSender.textContent = name;
                    currentText.textContent = comment;
                    messageOverlay.classList.add('is-visible');
                },
                onMessageHide: () => {
                    // メッセージを非表示
                    messageOverlay.classList.remove('is-visible');
                },
                onComplete: () => {
                    // 全演出終了時にリセット画面を表示
                    resetOverlay.classList.add('is-visible');
                }
            });
        } else {
            console.error('startFireworksShow function is not defined.');
            // エラー時のフォールバックとして即座にリセット画面を表示
            resetOverlay.classList.add('is-visible');
        }
    });

    /* ==========================================================================
       5. 「新しく花火を作る」リセット処理
       ========================================================================== */
    btnReset.addEventListener('click', () => {
        // 状態のリセット
        state.fireworks = [];
        
        // 画面オーバーレイ等の非表示
        resetOverlay.classList.remove('is-visible');
        messageOverlay.classList.remove('is-visible');
        
        // 画面を切り替え
        launchSection.classList.remove('active');
        inputSection.classList.add('active');

        // 表示の更新
        updateRelayDisplay();

        // フォーム全体のクリア
        inputName.value = '';
        inputComment.value = '';
    });

    // 初期化表示
    updateRelayDisplay();
});
