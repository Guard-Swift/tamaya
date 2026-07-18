/**
 * たまや (tamaya) - Canvas花火アニメーションモジュール
 */

(() => {
    // --------------------------------------------------------------------------
    // Spark クラス (爆発した後の個々の火花)
    // --------------------------------------------------------------------------
    class Spark {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            
            // ランダムな方向と速度で拡散
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 6 + 2;
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;
            
            // 重力と摩擦の影響
            this.gravity = 0.08;
            this.friction = 0.95;
            
            // 半径と寿命（アルファ値）
            this.radius = Math.random() * 2.5 + 1.5;
            this.alpha = 1;
            this.decay = Math.random() * 0.015 + 0.01; // 減衰率
        }

        update() {
            this.vx *= this.friction;
            this.vy *= this.friction;
            this.vy += this.gravity;
            this.x += this.vx;
            this.y += this.vy;
            this.alpha -= this.decay;
        }

        draw(ctx) {
            ctx.save();
            ctx.globalCompositeOperation = 'screen';
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            // 光彩（グロー）効果の追加
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
            ctx.fill();
            ctx.restore();
        }

        isAlive() {
            return this.alpha > 0;
        }
    }

    // --------------------------------------------------------------------------
    // Rocket クラス (上昇するロケット)
    // --------------------------------------------------------------------------
    class Rocket {
        constructor(startX, startY, targetX, targetY, color, onExplode) {
            this.x = startX;
            this.y = startY;
            this.targetX = targetX;
            this.targetY = targetY;
            this.color = color;
            this.onExplode = onExplode;

            // 速度と進行方向の計算
            const dx = targetX - startX;
            const dy = targetY - startY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            this.steps = 45; // 爆発点に達するまでのステップ数
            this.vx = dx / this.steps;
            this.vy = dy / this.steps;
            this.currentStep = 0;
            
            // 上昇時の火の粉の軌跡用
            this.trail = [];
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            // 軌跡の追加
            this.trail.push({ x: this.x, y: this.y, alpha: 1 });
            if (this.trail.length > 10) {
                this.trail.shift();
            }

            // 軌跡のフェード
            this.trail.forEach(t => t.alpha -= 0.1);

            this.currentStep++;
            if (this.currentStep >= this.steps) {
                this.onExplode(this.targetX, this.targetY, this.color);
                return false; // 終了
            }
            return true; // 継続
        }

        draw(ctx) {
            // 軌跡の描画
            ctx.save();
            ctx.globalCompositeOperation = 'screen';
            this.trail.forEach(t => {
                if (t.alpha <= 0) return;
                ctx.globalAlpha = t.alpha * 0.4;
                ctx.beginPath();
                ctx.arc(t.x, t.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = '#ffd700'; // 軌跡は黄金色
                ctx.fill();
            });

            // 本体頭部の描画
            ctx.globalAlpha = 1.0;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#ffffff';
            ctx.fill();
            ctx.restore();
        }
    }

    // --------------------------------------------------------------------------
    // FireworkShow クラス (ショー全体の管理)
    // --------------------------------------------------------------------------
    class FireworkShow {
        constructor(canvas, data, callbacks) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.data = data;
            this.callbacks = callbacks;
            
            this.rockets = [];
            this.sparks = [];
            
            this.currentIndex = 0;
            this.isRunning = false;
            this.animationFrameId = null;

            this.resizeCanvas();
            window.addEventListener('resize', () => this.resizeCanvas());
        }

        resizeCanvas() {
            const dpr = window.devicePixelRatio || 1;
            const rect = this.canvas.getBoundingClientRect();
            this.canvas.width = rect.width * dpr;
            this.canvas.height = rect.height * dpr;
            this.ctx.scale(dpr, dpr);
            this.width = rect.width;
            this.height = rect.height;
        }

        start() {
            this.isRunning = true;
            this.rockets = [];
            this.sparks = [];
            this.currentIndex = 0;
            
            this.loop();
            this.triggerNextFirework();
        }

        stop() {
            this.isRunning = false;
            if (this.animationFrameId) {
                cancelAnimationFrame(this.animationFrameId);
            }
            this.ctx.clearRect(0, 0, this.width, this.height);
        }

        triggerNextFirework() {
            if (this.currentIndex >= this.data.length) {
                // すべて打ち上げ終了後、残った火花が消えるのを待ってから完了コールバック
                const checkFinished = () => {
                    if (this.rockets.length === 0 && this.sparks.length === 0) {
                        this.isRunning = false;
                        if (this.callbacks && typeof this.callbacks.onComplete === 'function') {
                            this.callbacks.onComplete();
                        }
                    } else {
                        setTimeout(checkFinished, 100);
                    }
                };
                setTimeout(checkFinished, 1500);
                return;
            }

            const currentItem = this.data[this.currentIndex];
            
            // 1. メッセージを表示
            if (this.callbacks && typeof this.callbacks.onMessageShow === 'function') {
                this.callbacks.onMessageShow(currentItem.name, currentItem.comment);
            }

            // 2. メッセージ表示から少し遅れてロケット発射
            setTimeout(() => {
                const startX = this.width / 2;
                const startY = this.height;
                // 画面中央付近のランダムな爆発位置
                const targetX = this.width * 0.25 + Math.random() * (this.width * 0.5);
                const targetY = this.height * 0.2 + Math.random() * (this.height * 0.35);

                const rocket = new Rocket(
                    startX, startY, 
                    targetX, targetY, 
                    currentItem.color, 
                    (tx, ty, col) => this.explode(tx, ty, col)
                );
                this.rockets.push(rocket);

                // 3. ロケット発射後にメッセージをフェードアウト
                setTimeout(() => {
                    if (this.callbacks && typeof this.callbacks.onMessageHide === 'function') {
                        this.callbacks.onMessageHide();
                    }
                }, 800);

                // 4. 次の花火のスケジュール
                this.currentIndex++;
                // 爆発後に間隔を空けて次へ
                setTimeout(() => {
                    if (this.isRunning) {
                        this.triggerNextFirework();
                    }
                }, 3000);

            }, 1000);
        }

        explode(x, y, color) {
            // 火花を120個生成して拡散させる
            const particleCount = 120;
            for (let i = 0; i < particleCount; i++) {
                this.sparks.push(new Spark(x, y, color));
            }
        }

        update() {
            // ロケットの更新
            this.rockets = this.rockets.filter(r => r.update());

            // 火花の更新
            this.sparks.forEach(s => s.update());
            this.sparks = this.sparks.filter(s => s.isAlive());
        }

        draw() {
            // 画面を半透明の黒でクリアすることで、花火の残像（テール）を残す
            this.ctx.fillStyle = 'rgba(2, 2, 5, 0.15)';
            this.ctx.fillRect(0, 0, this.width, this.height);

            // ロケットの描画
            this.rockets.forEach(r => r.draw(this.ctx));

            // 火花の描画
            this.sparks.forEach(s => s.draw(this.ctx));
        }

        loop() {
            if (!this.isRunning) return;

            this.update();
            this.draw();

            this.animationFrameId = requestAnimationFrame(() => this.loop());
        }
    }

    // --------------------------------------------------------------------------
    // グローバルAPIの公開
    // --------------------------------------------------------------------------
    let activeShow = null;

    window.startFireworksShow = (fireworksData, callbacks) => {
        const canvas = document.getElementById('firework-canvas');
        if (!canvas) {
            console.error('Canvas element with id "firework-canvas" not found.');
            return;
        }

        // 既存のショーがあれば停止
        if (activeShow) {
            activeShow.stop();
        }

        activeShow = new FireworkShow(canvas, fireworksData, callbacks);
        activeShow.start();
    };

})();
