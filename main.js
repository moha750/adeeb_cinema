document.addEventListener('DOMContentLoaded', function() {
    // إنشاء النجوم
    createStars();
    
    // تهيئة العناصر
    const canvas = document.getElementById('ticket-canvas');
    const ctx = canvas.getContext('2d');
    const nameInput = document.getElementById('name');
    const downloadBtn = document.getElementById('download-btn');
    const shareBtn = document.getElementById('share-btn');
    
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
    downloadBtn.addEventListener('click', downloadTicket);
    
    // زر المشاركة
    if (navigator.share) {
        shareBtn.addEventListener('click', shareTicket);
    } else {
        shareBtn.style.display = 'none';
    }
    
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
        const container = document.querySelector('.canvas-container');
        canvas.width = container.offsetWidth;
        canvas.height = (container.offsetWidth * 308) / 766; // نسبة الأبعاد الأصلية
    }
    
    function drawTicket() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(ticketImg, 0, 0, canvas.width, canvas.height);
        
        // إضافة النص
        ctx.font = `${canvas.width / 30}px OurFont`;
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        
        const name = nameInput.value || "أسمك هنا";
        const x = canvas.width * 0.49;
        const y = canvas.height * 0.67;
        
        ctx.fillText(name, x, y);
    }
    
    function downloadTicket() {
        if (!nameInput.value.trim()) {
            showAlert('الرجاء إدخال اسمك أولاً');
            nameInput.focus();
            return;
        }
        
        const link = document.createElement('a');
        link.download = `تذكرة-${nameInput.value}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    }
    
    async function shareTicket() {
        try {
            await navigator.share({
                title: `تذكرتي الإبداعية - ${nameInput.value || 'مبدع'}`,
                text: 'انشئ تذكرتك الإبداعية مع فُلك',
                url: window.location.href
            });
        } catch (err) {
            console.log('مشاركة ملغاة:', err);
            copyToClipboard(window.location.href);
            showAlert('تم نسخ الرابط إلى الحافظة!');
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
    
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text);
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