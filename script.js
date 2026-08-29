// ==========================================
// ===== بيانات المدرسين (سهل التعديل) =====
// ==========================================

// 🔥 غير رقم الواتساب هنا لرقمك الخاص (مرة واحدة بس)
const MY_PHONE = "201012345678";

const teachers = [
    {
        id: 1,
        name: "أحمد محمد",
        subject: "ماث",
        stage: "ثانوي",
        school: "مدرسة السلام الثانوية",
        price: 150,
        rating: 4.8,
        totalRatings: 23,
        description: "شرح ممتاز ومنهجية واضحة، بيساعد الطلاب يفكروا بطريقة منطقية"
    },
    {
        id: 2,
        name: "سارة علي",
        subject: "عربي",
        stage: "اعدادي",
        school: "مدرسة النزهة الإعدادية",
        price: 120,
        rating: 4.9,
        totalRatings: 31,
        description: "أسلوب سلس وجذاب، بتحبب الطلاب في اللغة العربية"
    },
    {
        id: 3,
        name: "محمد خالد",
        subject: "إنجليزي",
        stage: "ثانوي",
        school: "مدرسة التفوق الثانوية",
        price: 180,
        rating: 4.7,
        totalRatings: 18,
        description: "خبرة في التدريس لأكثر من ٥ سنوات، نطق ممتاز"
    },
    {
        id: 4,
        name: "نورا أحمد",
        subject: "علوم",
        stage: "ابتدائي",
        school: "مدرسة الشروق الرسمية",
        price: 100,
        rating: 4.6,
        totalRatings: 15,
        description: "شرح مبسط وجميل، بتفهم الأطفال بسرعة"
    },
    {
        id: 5,
        name: "كريم يوسف",
        subject: "فيزياء",
        stage: "ثانوي",
        school: "مدرسة السلام الثانوية",
        price: 200,
        rating: 4.9,
        totalRatings: 27,
        description: "مدرس فيزياء محترف، بيشرح القوانين بطريقة سهلة"
    },
    {
        id: 6,
        name: "منى إبراهيم",
        subject: "كيمياء",
        stage: "ثانوي",
        school: "مدرسة التفوق الثانوية",
        price: 190,
        rating: 4.5,
        totalRatings: 12,
        description: "شرح كيمياء بطريقة منظمة، بتساعد الطلاب يفهموا المعادلات"
    },
    {
        id: 7,
        name: "عمر حسن",
        subject: "تاريخ",
        stage: "اعدادي",
        school: "مدرسة الأمل الرسمية",
        price: 110,
        rating: 4.3,
        totalRatings: 9,
        description: "أسلوب قصصي ممتع، بيساعد الطلاب يحفظوا الأحداث بسهولة"
    },
    {
        id: 8,
        name: "ليلى عبدالله",
        subject: "جغرافيا",
        stage: "اعدادي",
        school: "مدرسة النزهة الإعدادية",
        price: 110,
        rating: 4.4,
        totalRatings: 11,
        description: "شرح جغرافيا باستخدام الخرائط والصور، بيخلي المادة مسلية"
    },
    {
        id: 9,
        name: "مصطفى رجب",
        subject: "ماث",
        stage: "اعدادي",
        school: "مدرسة الأمل الرسمية",
        price: 130,
        rating: 4.2,
        totalRatings: 14,
        description: "مدرس ماث ممتاز للمرحلة الإعدادية، بيركز على الأساسيات"
    },
    {
        id: 10,
        name: "هدى سمير",
        subject: "إنجليزي",
        stage: "ابتدائي",
        school: "مدرسة المستقبل الخاصة",
        price: 90,
        rating: 4.7,
        totalRatings: 22,
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
                    <span>🏫 المدرسة</span>
                    <span class="school">${teacher.school}</span>
                </div>
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
                    <span class="phone">${MY_PHONE}</span>
                </div>
                <p style="font-size:0.9rem;color:#7f8c8d;margin:10px 0;text-align:right;">📝 ${teacher.description}</p>
                <a href="https://wa.me/${MY_PHONE}?text=السلام%20عليكم%20أستاذ%20${encodeURIComponent(teacher.name)}،%20أنا%20جيت%20من%20منصة%20Teachers%20Hub%20وأريد%20الاستفسار%20عن%20الدروس" 
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
    const schoolFilter = document.getElementById('schoolFilter').value;

    const filtered = teachers.filter(teacher => {
        const matchSearch = teacher.name.includes(searchText) || teacher.subject.includes(searchText);
        const matchStage = stageFilter === 'all' || teacher.stage === stageFilter;
        const matchSubject = subjectFilter === 'all' || teacher.subject === subjectFilter;
        const matchSchool = schoolFilter === 'all' || teacher.school === schoolFilter;

        return matchSearch && matchStage && matchSubject && matchSchool;
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