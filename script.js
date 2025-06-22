// スムーススクロール機能
document.addEventListener('DOMContentLoaded', function() {
    // すべてのアンカーリンクにスムーススクロールを適用
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // ナビゲーションバーの高さを考慮
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// スクロールアニメーション
function fadeInOnScroll() {
    const elements = document.querySelectorAll('section');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('fade-in');
        }
    });
}

window.addEventListener('scroll', fadeInOnScroll);

// 初期読み込み時にもチェック
fadeInOnScroll();

// CTA ボタンクリック時のイベント処理
document.addEventListener('DOMContentLoaded', function() {
    const ctaButtons = document.querySelectorAll('.btn-primary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // メールリンクでない場合のみ処理
            if (!this.href.startsWith('mailto:')) {
                // Google Analytics等のトラッキング用
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'click', {
                        'event_category': 'CTA',
                        'event_label': this.textContent,
                        'value': 1
                    });
                }
                
                // 興味表明のポップアップ表示（必要に応じて）
                if (this.textContent.includes('参加を表明')) {
                    showInterestModal();
                    e.preventDefault();
                }
            }
        });
    });
});

// 興味表明モーダル（オプション）
function showInterestModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>奈良マラソン2025 参加表明</h3>
                <span class="close">&times;</span>
            </div>
            <div class="modal-body">
                <p>一緒に奈良マラソン2025に挑戦しましょう！</p>
                <p>下記のメールアドレスに「参加希望」とお送りください。</p>
                <div class="email-info">
                    <strong>連絡先：</strong>
                    <a href="mailto:negoro@example.com?subject=奈良マラソン2025参加希望">negoro@example.com</a>
                </div>
                <p class="note">※実際のメールアドレスに変更してください</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // モーダルを表示
    setTimeout(() => {
        modal.style.display = 'flex';
    }, 10);
    
    // 閉じるボタンの処理
    const closeBtn = modal.querySelector('.close');
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.removeChild(modal);
    });
    
    // モーダル外クリックで閉じる
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.removeChild(modal);
        }
    });
}

// カウントダウンタイマー（エントリー締切まで）
function updateCountdown() {
    const deadline = new Date('2025-07-15T23:59:59').getTime();
    const now = new Date().getTime();
    const timeLeft = deadline - now;
    
    if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        
        // カウントダウン表示要素があれば更新
        const countdownElement = document.getElementById('countdown');
        if (countdownElement) {
            countdownElement.innerHTML = `
                <div class="countdown-item">
                    <span class="countdown-number">${days}</span>
                    <span class="countdown-label">日</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${hours}</span>
                    <span class="countdown-label">時間</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${minutes}</span>
                    <span class="countdown-label">分</span>
                </div>
            `;
        }
    }
}

// 1分ごとにカウントダウンを更新
setInterval(updateCountdown, 60000);
updateCountdown(); // 初回実行

// パフォーマンス最適化：画像の遅延読み込み
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    images.forEach(img => {
        if (img.dataset.src) {
            imageObserver.observe(img);
        }
    });
});

// ソーシャルシェア機能（オプション）
function shareToSocial(platform) {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('奈良マラソン2025に一緒に挑戦しませんか？この感動は、一人じゃないから。');
    
    let shareUrl = '';
    
    switch(platform) {
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
        case 'line':
            shareUrl = `https://social-plugins.line.me/lineit/share?url=${url}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

// フォーム送信処理（将来的な拡張用）
function handleFormSubmit(formData) {
    // フォームデータの処理
    console.log('Form submitted:', formData);
    
    // 成功メッセージの表示
    showSuccessMessage('お申し込みありがとうございます！詳細をメールでお送りします。');
}

function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    successDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
        color: white;
        padding: 20px 30px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 1000;
        font-weight: bold;
        text-align: center;
    `;
    
    document.body.appendChild(successDiv);
    
    // 3秒後に自動で消去
    setTimeout(() => {
        successDiv.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(successDiv);
        }, 300);
    }, 3000);
}

// デバッグ用：開発環境でのみ実行
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('奈良マラソンLP - 開発モード');
    console.log('LP構成:', {
        sections: document.querySelectorAll('section').length,
        buttons: document.querySelectorAll('.btn').length,
        images: document.querySelectorAll('img').length
    });
}