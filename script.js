// ==========================================
// ===== بيانات المدرسين =====
// ==========================================

const teachers = [
    {
        id: 1,
        name: "أحمد محمد",
        subject: "ماث",
        stage: "ثانوي",
        price: 150,
        rating: 4.8,
        totalRatings: 23,
        phone: "01019915833", // رقم أحمد محمد
        description: "شرح ممتاز ومنهجية واضحة، بيساعد الطلاب يفكروا بطريقة منطقية"
    },
    {
        id: 2,
        name: "سارة علي",
        subject: "عربي",
        stage: "اعدادي",
        price: 120,
        rating: 4.9,
        totalRatings: 31,
        phone: "201098765432", // رقم سارة علي
        description: "أسلوب سلس وجذاب، بتحبب الطلاب في اللغة العربية"
    },
    {
        id: 3,
        name: "محمد خالد",
        subject: "إنجليزي",
        stage: "ثانوي",
        price: 180,
        rating: 4.7,
        totalRatings: 18,
        phone: "2010555666777", // رقم محمد خالد
        description: "خبرة في التدريس لأكثر من ٥ سنوات، نطق ممتاز"
    },
    {
        id: 4,
        name: "نورا أحمد",
        subject: "علوم",
        stage: "ابتدائي",
        price: 100,
        rating: 4.6,
        totalRatings: 15,
        phone: "2010111222333", // رقم نورا أحمد
        description: "شرح مبسط وجميل، بتفهم الأطفال بسرعة"
    },
    {
        id: 5,
        name: "كريم يوسف",
        subject: "فيزياء",
        stage: "ثانوي",
        price: 200,
        rating: 4.9,
        totalRatings: 27,
        phone: "2010222333444", // رقم كريم يوسف
        description: "مدرس فيزياء محترف، بيشرح القوانين بطريقة سهلة"
    },
    {
        id: 6,
        name: "منى إبراهيم",
        subject: "كيمياء",
        stage: "ثانوي",
        price: 190,
        rating: 4.5,
        totalRatings: 12,
        phone: "2010333444555", // رقم منى إبراهيم
        description: "شرح كيمياء بطريقة منظمة، بتساعد الطلاب يفهموا المعادلات"
    },
    {
        id: 7,
        name: "عمر حسن",
        subject: "تاريخ",
        stage: "اعدادي",
        price: 110,
        rating: 4.3,
        totalRatings: 9,
        phone: "2010444555666", // رقم عمر حسن
        description: "أسلوب قصصي ممتع، بيساعد الطلاب يحفظوا الأحداث بسهولة"
    },
    {
        id: 8,
        name: "ليلى عبدالله",
        subject: "جغرافيا",
        stage: "اعدادي",
        price: 110,
        rating: 4.4,
        totalRatings: 11,
        phone: "2010555666777", // رقم ليلى عبدالله
        description: "شرح جغرافيا باستخدام الخرائط والصور، بيخلي المادة مسلية"
    },
    {
        id: 9,
        name: "مصطفى رجب",
        subject: "ماث",
        stage: "اعدادي",
        price: 130,
        rating: 4.2,
        totalRatings: 14,
        phone: "2010666777888", // رقم مصطفى رجب
        description: "مدرس ماث ممتاز للمرحلة الإعدادية، بيركز على الأساسيات"
    },
    {
        id: 10,
        name: "هدى سمير",
        subject: "إنجليزي",
        stage: "ابتدائي",
        price: 90,
        rating: 4.7,
        totalRatings: 22,
        phone: "2010777888999", // رقم هدى سمير
        description: "بتعلم الأطفال الإنجليزية بطريقة تفاعلية ولعب، بيحبوها"
    }
];

// ==========================================
// ===== دوال العرض والفلترة =====
// ==========================================

function displayTeachers(teachersList) {
    const container = document.getElementById('teachers-container');
    container.innerHTML = '';

    if (teachersList.length === 0) {
        container.innerHTML = '<div class="no-results">😕 لا يوجد مدرسين مطابقين للبحث</div>';
        return;
    }

    teachersList.forEach(teacher => {
        const card = `
            <div class="teacher-card">
                <div class="avatar">${teacher.name.charAt(0)}</div>
                <h3>${teacher.name}</h3>
                <div class="subject">📚 ${teacher.subject}</div>
                <div class="stage-badge">📌 ${teacher.stage}</div>
                <div class="detail">
                    <span>💰 السعر</span>
                    <span class="price">${teacher.price} ج / ساعة</span>
                </div>
                <div class="detail">
                    <span>⭐ التقييم</span>
                    <span class="rating">${teacher.rating} (${teacher.totalRatings} تقييم)</span>
                </div>
                <div class="detail" style="border-bottom: none;">
                    <span>📱 واتساب</span>
                    <span class="phone">${teacher.phone}</span>
                </div>
                <p style="font-size:0.9rem;color:#7f8c8d;margin:10px 0;text-align:right;">📝 ${teacher.description}</p>
                <a href="https://wa.me/${teacher.phone}?text=السلام%20عليكم%20أستاذ%20${encodeURIComponent(teacher.name)}،%20أنا%20جيت%20من%20منصة%20Teachers%20Hub%20وأريد%20الاستفسار%20عن%20الدروس" 
                   class="whatsapp-btn" target="_blank">
                    📱 تواصل مع المدرس
                </a>
                <button class="rate-btn" onclick="rateTeacher(${teacher.id})">
                    ⭐ قيم المدرس
                </button>
            </div>
        `;
        container.innerHTML += card;
    });
}

function filterTeachers() {
    const searchText = document.getElementById('searchInput').value.toLowerCase();
    const stageFilter = document.getElementById('stageFilter').value;
    const subjectFilter = document.getElementById('subjectFilter').value;

    const filtered = teachers.filter(teacher => {
        const matchSearch = teacher.name.includes(searchText) || teacher.subject.includes(searchText);
        const matchStage = stageFilter === 'all' || teacher.stage === stageFilter;
        const matchSubject = subjectFilter === 'all' || teacher.subject === subjectFilter;

        return matchSearch && matchStage && matchSubject;
    });

    displayTeachers(filtered);
}

// ==========================================
// ===== نظام التقييم =====
// ==========================================

function rateTeacher(teacherId) {
    const teacher = teachers.find(t => t.id === teacherId);
    if (!teacher) return;

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

    alert(`✅ شكراً لتقييمك!\nالتقييم الجديد للمدرس ${teacher.name}: ${teacher.rating} من ٥`);

    displayTeachers(teachers);
}

// ==========================================
// ===== تحميل الصفحة =====
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    displayTeachers(teachers);
});