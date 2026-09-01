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

const JSONBIN_BIN_ID = '6a936a6cf5f4af5e295310fe';
const JSONBIN_API_KEY = '$2a$10$vBjRY7byljfCH4ggkOZo5eaJYT4clQVib.OaousKhkjRjjqtITtqu';
const JSONBIN_URL = 'https://api.jsonbin.io/v3/b/' + JSONBIN_BIN_ID;

console.log('✅ JSON Bin connected successfully');

// ==========================================
// ===== ٣. دوال JSON Bin =====
// ==========================================

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

async function saveRatings(ratings) {
    try {
        const res = await fetch(JSONBIN_URL, {
            headers: { 'X-Master-Key': JSONBIN_API_KEY }
        });
        const data = await res.json();
        const currentData = data.record || {};
        currentData.ratings = ratings;

        await fetch(JSONBIN_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': JSONBIN_API_KEY
            },
            body: JSON.stringify(currentData)
        });
        console.log('✅ Ratings saved successfully');
    } catch (error) {
        console.error('Error saving ratings:', error);
    }
}

async function getTeachersFromCloud() {
    try {
        const res = await fetch(JSONBIN_URL, {
            headers: { 'X-Master-Key': JSONBIN_API_KEY }
        });
        const data = await res.json();
        return data.record.teachers || [];
    } catch (error) {
        console.error('Error reading teachers:', error);
        return [];
    }
}

async function saveTeachersToCloud(teachersData) {
    try {
        const res = await fetch(JSONBIN_URL, {
            headers: { 'X-Master-Key': JSONBIN_API_KEY }
        });
        const data = await res.json();
        const currentData = data.record || {};
        currentData.teachers = teachersData;

        await fetch(JSONBIN_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': JSONBIN_API_KEY
            },
            body: JSON.stringify(currentData)
        });
        console.log('✅ Teachers saved successfully');
    } catch (error) {
        console.error('Error saving teachers:', error);
    }
}

// ==========================================
// ===== ٤. بيانات المدرسين =====
// ==========================================

let teachers = [];

async function loadTeachers() {
    try {
        const cloudTeachers = await getTeachersFromCloud();

        if (cloudTeachers && cloudTeachers.length > 0) {
            teachers = cloudTeachers;
            localStorage.setItem('adminTeachers', JSON.stringify(teachers));
        } else {
            const saved = localStorage.getItem('adminTeachers');
            if (saved) {
                teachers = JSON.parse(saved);
                if (teachers.length > 0) {
                    await saveTeachersToCloud(teachers);
                }
            } else {
                teachers = [];
                localStorage.setItem('adminTeachers', JSON.stringify(teachers));
                await saveTeachersToCloud(teachers);
            }
        }

        displayTeachers(teachers);
    } catch (error) {
        console.error('Error loading teachers:', error);
        teachers = [];
        displayTeachers(teachers);
    }
}

function saveTeachers() {
    localStorage.setItem('adminTeachers', JSON.stringify(teachers));
    saveTeachersToCloud(teachers);
}

// ==========================================
// ===== ٥. عرض المدرسين =====
// ==========================================

function displayTeachers(teachersList) {
    var sorted = teachersList.slice().sort(function(a, b) {
        var ratingA = a.rating || 0;
        var ratingB = b.rating || 0;
        return ratingB - ratingA;
    });

    var container = document.getElementById('teachers-container');
    container.innerHTML = '';

    if (!sorted || sorted.length === 0) {
        container.innerHTML = '<div class="no-results">😕 لا يوجد مدرسين حالياً</div>';
        return;
    }

    sorted.forEach(function(teacher) {
        var stagesDisplay = teacher.stages ? teacher.stages.join(' - ') : '';

        var videoButton = teacher.video ? '<a href="' + teacher.video + '" target="_blank" class="video-btn" style="display: inline-block; background: #ff0000; color: white; padding: 8px 15px; border-radius: 30px; text-decoration: none; font-weight: bold; margin-top: 8px; width: 100%; text-align: center; transition: 0.3s; border: none; cursor: pointer; font-size: 0.95rem;">🎬 فيديو تعريفي عن المدرس</a>' : '';

        var card = '<div class="teacher-card">' +
            '<div class="avatar">' + teacher.name.charAt(0) + '</div>' +
            '<h3>' + teacher.name + '</h3>' +
            '<div class="subject">📚 ' + teacher.subject + '</div>' +
            '<div class="stage-badge">📌 ' + stagesDisplay + '</div>' +
            '<div class="detail"><span>⭐ التقييم</span><span class="rating">' + (teacher.rating || 0) + ' (' + (teacher.totalRatings || 0) + ' تقييم)</span></div>' +
            '<div class="detail" style="border-bottom: none;"><span>📱 واتساب</span><span class="phone">' + teacher.phone + '</span></div>' +
            '<p style="font-size:0.9rem;color:#7f8c8d;margin:10px 0;text-align:right;">📝 ' + (teacher.description || '') + '</p>' +
            videoButton +
            '<a href="https://wa.me/' + teacher.phone + '?text=السلام%20عليكم%20أستاذ%20' + encodeURIComponent(teacher.name) + '،%20أنا%20جيت%20من%20منصة%20Teach%20Hub%20وأريد%20الاستفسار%20عن%20الدروس" class="whatsapp-btn" target="_blank">📱 تواصل مع المدرس</a>' +
            '<button class="rate-btn" onclick="rateTeacher(' + teacher.id + ')">⭐ قيم المدرس</button>' +
            '<button class="share-btn" onclick="sharePlatform(' + teacher.id + ')">📢 شارك المنصة مع طلابك وأولياء الأمور</button>' +
            '</div>';

        container.innerHTML += card;
    });
}

// ==========================================
// ===== ٦. فلتر البحث =====
// ==========================================
function filterTeachers() {
    var searchText = document.getElementById('searchInput').value.toLowerCase().trim();
    var stageFilter = document.getElementById('stageFilter').value;
    var subjectFilter = document.getElementById('subjectFilter').value;
    var areaFilter = document.getElementById('areaFilter').value; // ← جديد

    var filtered = teachers.filter(function(teacher) {
        var matchSearch = teacher.name.toLowerCase().includes(searchText) || 
                         (teacher.subjects && teacher.subjects.some(function(s) { return s.toLowerCase().includes(searchText); }));
        var matchStage = stageFilter === 'all' || (teacher.stages && teacher.stages.includes(stageFilter));
        var matchSubject = subjectFilter === 'all' || (teacher.subjects && teacher.subjects.includes(subjectFilter));
        var matchArea = areaFilter === 'all' || (teacher.areas && teacher.areas.includes(areaFilter)); // ← جديد

        return matchSearch && matchStage && matchSubject && matchArea;
    });

    var sorted = filtered.slice().sort(function(a, b) {
        var ratingA = a.rating || 0;
        var ratingB = b.rating || 0;
        return ratingB - ratingA;
    });

    displayTeachers(sorted);
}

// ==========================================
// ===== ٧. نظام التقييم =====
// ==========================================

async function rateTeacher(teacherId) {
    var teacher = teachers.find(function(t) { return t.id === teacherId; });
    if (!teacher) return;

    var userPhone = localStorage.getItem('userPhone');
    if (!userPhone) {
        userPhone = prompt("📱 أدخل رقم واتسابك (مثال: 201012345678) لتقييم المدرس:");
        if (!userPhone) {
            alert('❌ رقم واتساب مطلوب للتقييم');
            return;
        }
        localStorage.setItem('userPhone', userPhone);
    }

    var ratings = await getRatings();

    if (ratings[teacherId] && ratings[teacherId][userPhone]) {
        var data = ratings[teacherId][userPhone];
        var date = new Date(data.date).toLocaleString('ar-EG', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        alert('❌ لقد قيمت الأستاذ ' + teacher.name + ' بالفعل!\n📅 التاريخ: ' + date + '\n⭐ التقييم: ' + data.rating + ' من ٥');
        return;
    }

    var rating = prompt('⭐ قيم المدرس ' + teacher.name + '\n(١ = سيء جداً، ٢ = سيء، ٣ = متوسط، ٤ = جيد، ٥ = ممتاز)\nأدخل رقم من ١ إلى ٥:');

    if (rating === null) return;

    var ratingNum = parseInt(rating);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
        alert('❌ يرجى إدخال رقم صحيح بين ١ و ٥');
        return;
    }

    if (!ratings[teacherId]) ratings[teacherId] = {};
    ratings[teacherId][userPhone] = {
        rating: ratingNum,
        date: new Date().toISOString()
    };

    await saveRatings(ratings);

    var values = Object.values(ratings[teacherId]).map(function(r) { return r.rating; });
    var avg = values.reduce(function(a, b) { return a + b; }, 0) / values.length;
    var total = values.length;

    teachers = await getTeachersFromCloud();
    var index = teachers.findIndex(function(t) { return t.id === teacherId; });
    if (index !== -1) {
        teachers[index].rating = Math.round(avg * 10) / 10;
        teachers[index].totalRatings = total;
        localStorage.setItem('adminTeachers', JSON.stringify(teachers));
        await saveTeachersToCloud(teachers);
    }

    alert('✅ شكراً لتقييمكم');
    displayTeachers(teachers);
}

// ==========================================
// ===== ٨. مشاركة المنصة =====
// ==========================================

function sharePlatform(teacherId) {
    var teacher = teachers.find(function(t) { return t.id === teacherId; });
    if (!teacher) return;

    var url = window.location.href;
    var message = '📚 أنا المدرس ' + teacher.name + ' على منصة Teach Hub\nشوفوا تقييماتي وتواصلوا معي:\n' + url + '\n\n👨‍🎓 للطلاب: قيموا مدرسكم وساعدوه يظهر في المنصة\n👨‍👩‍👦 لأولياء الأمور: شوفوا التقييمات وتواصلوا مع أفضل المدرسين\n👨‍🏫 للمدرسين: سجلوا في المنصة ووصلوا لأكبر عدد من الطلاب';

    window.open('https://wa.me/?text=' + encodeURIComponent(message), '_blank');
}

// ==========================================
// ===== ٩. لوحة التحكم =====
// ==========================================

function showAdminPanel() {
    var password = prompt("🔐 أدخل كلمة المرور للوصول إلى لوحة التحكم:");
    if (password === null) return;

    if (password === "php123") {
        window.location.href = 'admin.html';
    } else {
        alert('❌ كلمة المرور غير صحيحة!');
    }
}

// ==========================================
// ===== ١٠. تحميل الصفحة =====
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    loadTeachers();
});
// تحديث البيانات كل 10 ثواني
setInterval(function() {
    refreshData();
}, 10000); // 10000 ملي ثانية = 10 ثواني

console.log('🛡️ نظام الحماية مفعل بنجاح');
console.log('📊 عدد المدرسين:', teachers.length);