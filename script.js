// ==========================================
// ===== ١. منع التلاعب (الحماية) =====
// ==========================================

document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    alert('❌ هذه الميزة غير متاحة');
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i')) ||
        (e.ctrlKey && (e.key === 'U' || e.key === 'u'))) {
        e.preventDefault();
        alert('❌ هذه الميزة غير متاحة');
        return false;
    }
});

document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.key === 'j')) {
        e.preventDefault();
        alert('❌ هذه الميزة غير متاحة');
        return false;
    }
});

document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && (e.key === 'S' || e.key === 's')) {
        e.preventDefault();
        alert('❌ هذه الميزة غير متاحة');
        return false;
    }
});

document.ondragstart = function() {
    return false;
};

document.onselectstart = function() {
    return false;
};

// ==========================================
// ===== ٢. بيانات المدرسين =====
// ==========================================

let teachers = [];

function loadTeachers() {
    const saved = localStorage.getItem('adminTeachers');
    if (saved) {
        teachers = JSON.parse(saved);
    } else {
        teachers = [
            {id: 1, name: "أحمد محمد", subject: "ماث", stages: ["اعدادي", "ثانوي"], phone: "201012345678", description: "شرح ممتاز ومنهجية واضحة", rating: 4.8, totalRatings: 23, video: ""},
            {id: 2, name: "سارة علي", subject: "عربي", stages: ["ابتدائي", "اعدادي", "ثانوي"], phone: "201098765432", description: "أسلوب سلس وجذاب", rating: 4.9, totalRatings: 31, video: ""},
            {id: 3, name: "محمد خالد", subject: "إنجليزي", stages: ["اعدادي", "ثانوي"], phone: "2010555666777", description: "خبرة في التدريس لأكثر من ٥ سنوات", rating: 4.7, totalRatings: 18, video: ""},
            {id: 4, name: "نورا أحمد", subject: "علوم", stages: ["ابتدائي", "اعدادي"], phone: "2010111222333", description: "شرح مبسط وجميل", rating: 4.6, totalRatings: 15, video: ""},
            {id: 5, name: "كريم يوسف", subject: "فيزياء", stages: ["ثانوي"], phone: "2010222333444", description: "مدرس فيزياء محترف", rating: 4.9, totalRatings: 27, video: ""},
            {id: 6, name: "منى إبراهيم", subject: "كيمياء", stages: ["ثانوي"], phone: "2010333444555", description: "شرح كيمياء بطريقة منظمة", rating: 4.5, totalRatings: 12, video: ""},
            {id: 7, name: "عمر حسن", subject: "تاريخ", stages: ["اعدادي", "ثانوي"], phone: "2010444555666", description: "أسلوب قصصي ممتع", rating: 4.3, totalRatings: 9, video: ""},
            {id: 8, name: "ليلى عبدالله", subject: "جغرافيا", stages: ["اعدادي"], phone: "2010555666777", description: "شرح جغرافيا باستخدام الخرائط", rating: 4.4, totalRatings: 11, video: ""},
            {id: 9, name: "مصطفى رجب", subject: "ماث", stages: ["اعدادي"], phone: "2010666777888", description: "مدرس ماث ممتاز للمرحلة الإعدادية", rating: 4.2, totalRatings: 14, video: ""},
            {id: 10, name: "هدى سمير", subject: "إنجليزي", stages: ["ابتدائي", "اعدادي"], phone: "2010777888999", description: "بتعلم الأطفال الإنجليزية بطريقة تفاعلية", rating: 4.7, totalRatings: 22, video: ""},
            {id: 11, name: "ياسر محمود", subject: "اداره اعمال", stages: ["ثانوي"], phone: "2010888999000", description: "خبير في إدارة الأعمال والتسويق", rating: 4.7, totalRatings: 8, video: ""},
            {id: 12, name: "نهى سامي", subject: "محاسبه", stages: ["ثانوي"], phone: "2010999000111", description: "خبرة في المحاسبة المالية والتدقيق", rating: 4.6, totalRatings: 6, video: ""},
            {id: 13, name: "عادل فكري", subject: "فلسفه", stages: ["ثانوي"], phone: "2010100011122", description: "شرح الفلسفة بأسلوب مبسط ومشوق", rating: 4.8, totalRatings: 10, video: ""},
            {id: 14, name: "شيماء أحمد", subject: "برمجه", stages: ["ثانوي"], phone: "2010111122233", description: "مبرمجة محترفة، تدرس Python و JavaScript", rating: 4.9, totalRatings: 15, video: ""}
        ];
        localStorage.setItem('adminTeachers', JSON.stringify(teachers));
    }
    displayTeachers(teachers);
}

// ==========================================
// ===== ٣. عرض المدرسين =====
// ==========================================

function displayTeachers(teachersList) {
    const sorted = [...teachersList].sort((a, b) => {
        const ratingA = a.rating || 0;
        const ratingB = b.rating || 0;
        return ratingB - ratingA;
    });

    const container = document.getElementById('teachers-container');
    container.innerHTML = '';

    if (!sorted || sorted.length === 0) {
        container.innerHTML = '<div class="no-results">😕 لا يوجد مدرسين حالياً</div>';
        return;
    }

    let ratings = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('rated_')) {
            const teacherId = key.replace('rated_', '');
            try {
                ratings[teacherId] = JSON.parse(localStorage.getItem(key));
            } catch {}
        }
    }

    sorted.forEach(teacher => {
        const teacherRating = ratings[teacher.id];
        const displayRating = teacherRating ? teacherRating.rating : (teacher.rating || 0);
        const displayTotal = teacherRating ? 1 : (teacher.totalRatings || 0);
        const stagesDisplay = teacher.stages ? teacher.stages.join(' - ') : '';

        const videoButton = teacher.video ? `
            <a href="${teacher.video}" target="_blank" class="video-btn">
                🎬 فيديو تعريفي عن المدرس
            </a>
        ` : '';

        const card = `
            <div class="teacher-card">
                <div class="avatar">${teacher.name.charAt(0)}</div>
                <h3>${teacher.name}</h3>
                <div class="subject">📚 ${teacher.subject}</div>
                <div class="stage-badge">📌 ${stagesDisplay}</div>
                <div class="detail">
                    <span>⭐ التقييم</span>
                    <span class="rating">${displayRating} (${displayTotal} تقييم)</span>
                </div>
                <div class="detail" style="border-bottom: none;">
                    <span>📱 واتساب</span>
                    <span class="phone">${teacher.phone}</span>
                </div>
                <p style="font-size:0.9rem;color:#7f8c8d;margin:10px 0;text-align:right;">📝 ${teacher.description || ''}</p>
                
                ${videoButton}
                
                <a href="https://wa.me/${teacher.phone}?text=السلام%20عليكم%20أستاذ%20${encodeURIComponent(teacher.name)}،%20أنا%20جيت%20من%20منصة%20Teachers%20Hub%20وأريد%20الاستفسار%20عن%20الدروس" 
                   class="whatsapp-btn" target="_blank">
                    📱 تواصل مع المدرس
                </a>
                <button class="rate-btn" onclick="rateTeacher(${teacher.id})">
                    ⭐ قيم المدرس
                </button>
                <button class="share-btn" onclick="sharePlatform(${teacher.id})">
                    📢 شارك المنصة مع طلابك وأولياء الأمور
                </button>
            </div>
        `;
        container.innerHTML += card;
    });
}

// ==========================================
// ===== ٤. فلتر البحث =====
// ==========================================

function filterTeachers() {
    const searchText = document.getElementById('searchInput').value.toLowerCase();
    const stageFilter = document.getElementById('stageFilter').value;
    const subjectFilter = document.getElementById('subjectFilter').value;

    const filtered = teachers.filter(teacher => {
        const matchSearch = teacher.name.includes(searchText) || teacher.subject.includes(searchText);
        const matchStage = stageFilter === 'all' || (teacher.stages && teacher.stages.includes(stageFilter));
        const matchSubject = subjectFilter === 'all' || teacher.subject === subjectFilter;

        return matchSearch && matchStage && matchSubject;
    });

    const sorted = [...filtered].sort((a, b) => {
        const ratingA = a.rating || 0;
        const ratingB = b.rating || 0;
        return ratingB - ratingA;
    });

    displayTeachers(sorted);
}

// ==========================================
// ===== ٥. نظام التقييم =====
// ==========================================

function rateTeacher(teacherId) {
    const teacher = teachers.find(t => t.id === teacherId);
    if (!teacher) return;

    const existingRating = localStorage.getItem(`rated_${teacherId}`);
    if (existingRating) {
        try {
            const data = JSON.parse(existingRating);
            const date = new Date(data.date).toLocaleString('ar-EG', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            alert(
                `❌ لقد قيمت الأستاذ ${teacher.name} بالفعل!\n` +
                `📅 التاريخ: ${date}\n` +
                `⭐ التقييم: ${data.rating} من ٥`
            );
        } catch {
            alert(`❌ لقد قيمت الأستاذ ${teacher.name} بالفعل!`);
        }
        return;
    }

    const rating = prompt(
        `⭐ قيم المدرس ${teacher.name}\n` +
        `(١ = سيء جداً، ٢ = سيء، ٣ = متوسط، ٤ = جيد، ٥ = ممتاز)\n` +
        `أدخل رقم من ١ إلى ٥:`
    );

    if (rating === null) return;

    const ratingNum = parseInt(rating);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
        alert('❌ يرجى إدخال رقم صحيح بين ١ و ٥');
        return;
    }

    const newRating = (teacher.rating * teacher.totalRatings + ratingNum) / (teacher.totalRatings + 1);
    teacher.rating = Math.round(newRating * 10) / 10;
    teacher.totalRatings += 1;

    localStorage.setItem(`rated_${teacherId}`, JSON.stringify({
        rating: ratingNum,
        date: new Date().toISOString()
    }));

    const savedTeachers = JSON.parse(localStorage.getItem('adminTeachers') || '[]');
    const index = savedTeachers.findIndex(t => t.id === teacherId);
    if (index !== -1) {
        savedTeachers[index].rating = teacher.rating;
        savedTeachers[index].totalRatings = teacher.totalRatings;
        localStorage.setItem('adminTeachers', JSON.stringify(savedTeachers));
    }

    alert(`✅ شكراً لتقييمك!\nالتقييم الجديد للمدرس ${teacher.name}: ${teacher.rating} من ٥`);

    displayTeachers(teachers);
}

// ==========================================
// ===== ٦. مشاركة المنصة =====
// ==========================================

function sharePlatform(teacherId) {
    const teacher = teachers.find(t => t.id === teacherId);
    if (!teacher) return;

    const url = window.location.href;
    const message = 
        `📚 أنا المدرس ${teacher.name} على منصة Teachers Hub\n` +
        `شوفوا تقييماتي وتواصلوا معي:\n` +
        `${url}\n\n` +
        `👨‍🎓 للطلاب: قيموا مدرسكم وساعدوه يظهر في المنصة\n` +
        `👨‍👩‍👦 لأولياء الأمور: شوفوا التقييمات وتواصلوا مع أفضل المدرسين\n` +
        `👨‍🏫 للمدرسين: سجلوا في المنصة ووصلوا لأكبر عدد من الطلاب`;
    
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
}

// ==========================================
// ===== ٧. لوحة التحكم =====
// ==========================================

function showAdminPanel() {
    const password = prompt("🔐 أدخل كلمة المرور للوصول إلى لوحة التحكم:");
    if (password === null) return;

    if (password === "php123") {
        window.location.href = 'admin.html';
    } else {
        alert('❌ كلمة المرور غير صحيحة!');
    }
}

// ==========================================
// ===== ٨. تحميل الصفحة =====
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    loadTeachers();
});

console.log('🛡️ نظام الحماية مفعل بنجاح');
console.log('📊 عدد المدرسين:', teachers.length);