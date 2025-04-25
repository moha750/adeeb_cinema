document.addEventListener('DOMContentLoaded', function() {
    // إنشاء النجوم
    createStars();
    
    // تهيئة العناصر
    const canvas = document.getElementById('ticket-canvas');
    const ctx = canvas.getContext('2d');
    const nameInput = document.getElementById('name');
    const downloadBtn = document.getElementById('download-btn');
    const shareBtn = document.getElementById('share-btn');
    const shareModal = document.getElementById('share-modal');
    const closeModal = document.querySelector('.close');
    const siteUrl = 'https://moha750.github.io/adeeb_cinema/';
    
    // تحميل صورة التذكرة
    const ticketImg = new Image();
    ticketImg.src = 'certificate.png';
    
    ticketImg.onload = function() {
        // ضبط أبعاد الكانفاس
        resizeCanvas();
        drawTicket();
    };
    
    // تغيير حجم الكانفاس عند تغيير حجم النافذة
    window.addEventListener('resize', function() {
        resizeCanvas();
        drawTicket();
    });
    
    // تحديث التذكرة عند الكتابة
    nameInput.addEventListener('input', drawTicket);
    
    // زر التحميل
    downloadBtn.addEventListener('click', function() {
        if (!nameInput.value.trim()) {
            showAlert('الرجاء إدخال اسمك أولاً');
            nameInput.focus();
            return;
        }
        
        const link = document.createElement('a');
        link.download = `تذكرة-${nameInput.value}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        // عرض نافذة المشاركة بعد التنزيل
        setTimeout(() => {
            shareModal.style.display = 'block';
        }, 1000);
    });
    
    // زر نسخ الرابط
    shareBtn.addEventListener('click', function() {
        copyToClipboard(siteUrl);
        showAlert('تم نسخ رابط الموقع إلى الحافظة!');
    });
    
    // إعداد أزرار المشاركة
    document.getElementById('twitter-share').addEventListener('click', function(e) {
        e.preventDefault();
        shareOnPlatform('twitter');
    });
    
    document.getElementById('whatsapp-share').addEventListener('click', function(e) {
        e.preventDefault();
        shareOnPlatform('whatsapp');
    });
    
    document.getElementById('telegram-share').addEventListener('click', function(e) {
        e.preventDefault();
        shareOnPlatform('telegram');
    });
    
    document.getElementById('facebook-share').addEventListener('click', function(e) {
        e.preventDefault();
        shareOnPlatform('facebook');
    });
    
    // إغلاق النافذة المنبثقة
    closeModal.addEventListener('click', function() {
        shareModal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === shareModal) {
            shareModal.style.display = 'none';
        }
    });
    
    // تأثير النقر
    document.addEventListener('click', function(e) {
        createClickEffect(e.clientX, e.clientY);
    });
    
    // الدوال المساعدة
    function createStars() {
        const container = document.querySelector('.stars-container');
        const starCount = 100;
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            
            // أحجام عشوائية
            const size = Math.random() * 3;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            
            // مواقع عشوائية
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            
            // توقيتات متغيرة
            star.style.animationDelay = `${Math.random() * 5}s`;
            star.style.animationDuration = `${3 + Math.random() * 7}s`;
            
            container.appendChild(star);
        }
    }
    
	function resizeCanvas() {
		// دائما خله عالي الدقة
		canvas.width = 2000;   // مثلا عرض التذكرة بجودة عالية
		canvas.height = (2000 * 310) / 866;  // حافظ على النسبة الأصلية للصورة
	
		// العرض في الشاشة يخليه بالـ CSS فقط
		canvas.style.width = '100%';
		canvas.style.height = 'auto';
	}
	
    
    function drawTicket() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(ticketImg, 0, 0, canvas.width, canvas.height);
        
        // إضافة النص
        ctx.font = `${canvas.width / 30}px OurFont`;
        ctx.fillStyle = '#652332';
        ctx.textAlign = 'center';
        
        const name = nameInput.value || "أسمك هنا";
        const x = canvas.width * 0.47;
        const y = canvas.height * 0.45;
        
        ctx.fillText(name, x, y);
    }
    
    function shareOnPlatform(platform) {
        const name = nameInput.value.trim() || "مستخدم";
        const text = `تذكرتي الإبداعية - ${name}\nانشئ تذكرتك الإبداعية مع فُلك`;
        
        switch(platform) {
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(siteUrl)}`, '_blank');
                break;
            case 'whatsapp':
                window.open(`https://wa.me/?text=${encodeURIComponent(text + '\n' + siteUrl)}`, '_blank');
                break;
            case 'telegram':
                window.open(`https://t.me/share/url?url=${encodeURIComponent(siteUrl)}&text=${encodeURIComponent(text)}`, '_blank');
                break;
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(siteUrl)}`, '_blank');
                break;
        }
        
        shareModal.style.display = 'none';
    }
    
    async function copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            console.error('Failed to copy: ', err);
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        }
    }
    
    function createClickEffect(x, y) {
        const effect = document.createElement('div');
        effect.className = 'click-effect';
        effect.style.left = `${x}px`;
        effect.style.top = `${y}px`;
        document.body.appendChild(effect);
        
        setTimeout(() => {
            effect.remove();
        }, 1000);
    }
    
    function showAlert(message) {
        const alert = document.createElement('div');
        alert.className = 'custom-alert';
        alert.textContent = message;
        document.body.appendChild(alert);
        
        setTimeout(() => {
            alert.remove();
        }, 3000);
    }
});