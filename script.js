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
// ===== ٢. تهيئة JSON Bin =====
// ==========================================

const JSONBIN_BIN_ID = '67b3310dacd3cb34a8e66cbf';
const JSONBIN_API_KEY = '$2a$10$vBjRY7byljfCH4ggkOZo5eaJYT4clQVib.OaousKhkjRjjqtITtqu';
const JSONBIN_URL = `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`;

console.log('✅ JSON Bin connected successfully');

// قراءة التقييمات من JSON Bin
async function getRatings() {
    try {
        const res = await fetch(JSONBIN_URL, {
            headers: { 'X-Master-Key': JSONBIN_API_KEY }
        });
        const data = await res.json();
        return data.record.ratings || {};
    } catch (error) {
        console.error('Error reading ratings:', error);
        return {};
    }
}

// كتابة التقييمات في JSON Bin
async function saveRatings(ratings) {
    try {
        await fetch(JSONBIN_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': JSONBIN_API_KEY
            },
            body: JSON.stringify({ ratings })
        });
    } catch (error) {
        console.error('Error saving ratings:', error);
    }
}

// ==========================================
// ===== ٣. بيانات المدرسين =====
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
// ===== ٤. عرض المدرسين =====
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

    sorted.forEach(teacher => {
        const stagesDisplay = teacher.stages ? teacher.stages.join(' - ') : '';

        const videoButton = teacher.video ? `
            <a href="${teacher.video}" target="_blank" class="video-btn" style="
                display: inline-block;
                background: #ff0000;
                color: white;
                padding: 8px 15px;
                border-radius: 30px;
                text-decoration: none;
                font-weight: bold;
                margin-top: 8px;
                width: 100%;
                text-align: center;
                transition: 0.3s;
                border: none;
                cursor: pointer;
                font-size: 0.95rem;
            ">
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
                    <span class="rating">${teacher.rating || 0} (${teacher.totalRatings || 0} تقييم)</span>
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
// ===== ٥. فلتر البحث =====
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
// ===== ٦. نظام التقييم =====
// ==========================================

async function rateTeacher(teacherId) {
    const teacher = teachers.find(t => t.id === teacherId);
    if (!teacher) return;

    let userPhone = localStorage.getItem('userPhone');
    if (!userPhone) {
        userPhone = prompt("📱 أدخل رقم واتسابك (مثال: 201012345678) لتقييم المدرس:");
        if (!userPhone) {
            alert('❌ رقم واتساب مطلوب للتقييم');
            return;
        }
        localStorage.setItem('userPhone', userPhone);
    }

    // جلب التقييمات من JSON Bin
    const ratings = await getRatings();
    
    // التحقق: هل قيم المدرس ده قبل كده؟
    if (ratings[teacherId] && ratings[teacherId][userPhone]) {
        const data = ratings[teacherId][userPhone];
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

    // حفظ التقييم
    if (!ratings[teacherId]) ratings[teacherId] = {};
    ratings[teacherId][userPhone] = {
        rating: ratingNum,
        date: new Date().toISOString()
    };

    await saveRatings(ratings);

    // حساب متوسط التقييم
    const values = Object.values(ratings[teacherId]).map(r => r.rating);
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    const total = values.length;

    const savedTeachers = JSON.parse(localStorage.getItem('adminTeachers') || '[]');
    const index = savedTeachers.findIndex(t => t.id === teacherId);
    if (index !== -1) {
        savedTeachers[index].rating = Math.round(avg * 10) / 10;
        savedTeachers[index].totalRatings = total;
        localStorage.setItem('adminTeachers', JSON.stringify(savedTeachers));
        teachers = savedTeachers;
    }

    alert(`✅ شكراً لتقييمك!`);
    displayTeachers(teachers);
}

// ==========================================
// ===== ٧. مشاركة المنصة =====
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
// ===== ٨. لوحة التحكم =====
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
// ===== ٩. تحميل الصفحة =====
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    loadTeachers();
});

console.log('🛡️ نظام الحماية مفعل بنجاح');
console.log('📊 عدد المدرسين:', teachers.length);