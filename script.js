// ===== كلمة مرور لوحة التحكم (غيرها للي انت عايزه) =====
const ADMIN_PASSWORD = "anas2026";

// ===== بيانات المدرسين (سنتر أكسلنت - سعر ثابت ١٠٠ ج) =====
const teachers = [{
    id: 1,
    name: "أحمد محمد",
    subject: "رياضيات",
    price: 100,
    location: "سنتر أكسلنت - مجموعة ١",
    available: 3,
    phone: "201012345678",
    rating: 4.8
}, {
    id: 2,
    name: "سارة علي",
    subject: "عربي",
    price: 100,
    location: "سنتر أكسلنت - مجموعة ٣",
    available: 2,
    phone: "201098765432",
    rating: 4.9
}, {
    id: 3,
    name: "محمد خالد",
    subject: "إنجليزي",
    price: 100,
    location: "سنتر أكسلنت - مجموعة ٢",
    available: 4,
    phone: "2010555666777",
    rating: 4.7
}, {
    id: 4,
    name: "نورا أحمد",
    subject: "علوم",
    price: 100,
    location: "سنتر أكسلنت - مجموعة ٤",
    available: 1,
    phone: "2010111222333",
    rating: 4.6
}, {
    id: 5,
    name: "كريم يوسف",
    subject: "فيزياء",
    price: 100,
    location: "سنتر أكسلنت - مجموعة ١",
    available: 2,
    phone: "2010222333444",
    rating: 4.9
}, {
    id: 6,
    name: "منى إبراهيم",
    subject: "كيمياء",
    price: 100,
    location: "سنتر أكسلنت - مجموعة ٣",
    available: 3,
    phone: "2010333444555",
    rating: 4.7
}, {
    id: 7,
    name: "عمر حسن",
    subject: "تاريخ",
    price: 100,
    location: "سنتر أكسلنت - مجموعة ٢",
    available: 0,
    phone: "2010444555666",
    rating: 4.5
}, {
    id: 8,
    name: "ليلى عبدالله",
    subject: "جغرافيا",
    price: 100,
    location: "سنتر أكسلنت - مجموعة ٤",
    available: 2,
    phone: "2010555666777",
    rating: 4.8
}, {
    id: 9,
    name: "مصطفى رجب",
    subject: "رياضيات",
    price: 100,
    location: "سنتر أكسلنت - مجموعة ١",
    available: 1,
    phone: "2010666777888",
    rating: 4.4
}, {
    id: 10,
    name: "هدى سمير",
    subject: "إنجليزي",
    price: 100,
    location: "سنتر أكسلنت - مجموعة ٣",
    available: 3,
    phone: "2010777888999",
    rating: 4.9
}];

// ===== عرض المدرسين =====
function displayTeachers(teachersList) {
    const container = document.getElementById('teachers-container');
    container.innerHTML = '';

    if (teachersList.length === 0) {
        container.innerHTML = '<div class="no-results">😕 لا يوجد مدرسين مطابقين للبحث</div>';
        return;
    }

    teachersList.forEach(teacher => {
        const availabilityClass = teacher.available > 0 ? 'availability' : 'availability full';
        const availabilityText = teacher.available > 0 ? `🟢 ${teacher.available} أماكن فاضية` : '🔴 مكتمل';
        const isDisabled = teacher.available <= 0 ? 'disabled' : '';

        const card = `
                <div class="teacher-card">
                    <div class="avatar">${teacher.name.charAt(0)}</div>
                    <h3>${teacher.name}</h3>
                    <div class="subject">📚 ${teacher.subject}</div>
                    <div class="detail">
                        <span>💰 السعر</span>
                        <span class="price">${teacher.price} ج / ساعة</span>
                    </div>
                    <div class="detail">
                        <span>📍 المكان</span>
                        <span>${teacher.location}</span>
                    </div>
                    <div class="detail">
                        <span>📊 التوفر</span>
                        <span class="${availabilityClass}">${availabilityText}</span>
                    </div>
                    <div class="detail">
                        <span>⭐ التقييم</span>
                        <span>${teacher.rating} / 5</span>
                    </div>
                    <button class="whatsapp-btn" onclick="bookLesson(${teacher.id})" ${isDisabled}>
                        ${teacher.available > 0 ? '📱 احجز الآن' : '🔴 غير متاح'}
                    </button>
                </div>
            `;
        container.innerHTML += card;
    });
}

// ===== فلتر البحث =====
function filterTeachers() {
    const searchText = document.getElementById('searchInput').value.toLowerCase();
    const subjectFilter = document.getElementById('subjectFilter').value;

    const filtered = teachers.filter(teacher => {
        const matchName = teacher.name.includes(searchText);
        const matchSubject = teacher.subject.includes(searchText);
        const matchFilter = subjectFilter === 'all' || teacher.subject === subjectFilter;

        return (matchName || matchSubject) && matchFilter;
    });

    displayTeachers(filtered);
}

// ===== تحديث العدد في شارة الحجوزات =====
function updateBookingBadge() {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const pending = bookings.filter(b => b.status === 'pending').length;
    const badge = document.getElementById('bookings-badge');
    if (pending > 0) {
        badge.textContent = pending;
        badge.style.display = 'inline';
    } else {
        badge.style.display = 'none';
    }
}

// ===== نظام الحجز =====
function bookLesson(teacherId) {
    const teacher = teachers.find(t => t.id === teacherId);
    if (!teacher) return;

    if (teacher.available <= 0) {
        alert("❌ عذرًا، هذا المدرس ليس لديه أماكن فاضية حاليًا.");
        return;
    }

    const confirmBooking = confirm(
        `📚 تأكيد حجز درس\n\n` +
        `المدرس: ${teacher.name}\n` +
        `المادة: ${teacher.subject}\n` +
        `السعر: ${teacher.price} ج\n\n` +
        `❗ ملاحظة: بعد الدرس، ارجع إلى المنصة وأكد استلام الدرس.\n` +
        `سيتم إرسال رقم واتساب المدرس بعد التأكيد.`
    );

    if (confirmBooking) {
        const studentPhone = prompt("📱 أدخل رقم واتسابك (مثال: 201012345678) للتواصل مع المدرس:");
        if (!studentPhone) {
            alert("❌ رقم واتساب مطلوب لإتمام الحجز.");
            return;
        }

        const booking = {
            id: Date.now(),
            teacherId: teacher.id,
            teacherName: teacher.name,
            subject: teacher.subject,
            price: teacher.price,
            studentPhone: studentPhone,
            date: new Date().toISOString(),
            status: "pending"
        };

        let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        bookings.push(booking);
        localStorage.setItem('bookings', JSON.stringify(bookings));

        teacher.available -= 1;

        alert(
            `✅ تم حجز درس مع الأستاذ ${teacher.name}!\n\n` +
            `📱 رقم واتساب المدرس: ${teacher.phone}\n` +
            `تواصل معه الآن وأخبره أنك جئت من منصة مدرسين أكسلنت.\n\n` +
            `📌 بعد الدرس، ارجع إلى المنصة واضغط "حجوزاتي" ثم "أكدت استلام الدرس".`
        );

        window.open(`https://wa.me/${teacher.phone}?text=أريد%20حجز%20درس`, '_blank');

        displayTeachers(teachers);
        updateBookingBadge();
    }
}

// ===== عرض حجوزات الطالب =====
function showMyBookings() {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const list = document.getElementById('bookings-list');
    const modal = document.getElementById('bookingsModal');

    if (bookings.length === 0) {
        list.innerHTML = '<p style="text-align:center;color:#7f8c8d;">📭 ليس لديك حجوزات حالياً</p>';
    } else {
        list.innerHTML = bookings.map((b, index) => {
            const statusClass = b.status === 'pending' ? 'pending' : b.status === 'confirmed' ? 'confirmed' :
            'completed';
            const statusText = b.status === 'pending' ? '⏳ قيد الانتظار' : b.status === 'confirmed' ?
                '📌 تم التأكيد' : '✅ تم الإنجاز';

            let actionButton = '';
            if (b.status === 'pending') {
                actionButton = `
                        <button class="confirm-btn" onclick="confirmLesson(${index})">
                            ✅ أكدت استلام الدرس
                        </button>
                    `;
            } else if (b.status === 'confirmed') {
                actionButton = `<p style="color:#27ae60;font-weight:bold;margin-top:10px;">✅ تم تأكيد الدرس، شكراً لك!</p>`;
            } else if (b.status === 'completed') {
                actionButton = `<p style="color:#2d4373;font-weight:bold;margin-top:10px;">🎉 تم إتمام الدرس، نتمنى لك التوفيق!</p>`;
            }

            return `
                    <div class="booking-item">
                        <div class="header">
                            <strong>${b.teacherName}</strong>
                            <span class="status ${statusClass}">${statusText}</span>
                        </div>
                        <p style="margin:5px 0;">📚 ${b.subject} | 💰 ${b.price} ج</p>
                        <p style="font-size:0.85rem;color:#7f8c8d;">📅 ${new Date(b.date).toLocaleString()}</p>
                        ${actionButton}
                    </div>
                `;
        }).join('');
    }

    modal.style.display = 'block';
    updateBookingBadge();
}

// ===== تأكيد استلام الدرس =====
function confirmLesson(index) {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    if (index >= bookings.length) return;

    const booking = bookings[index];

    const sure = confirm(
        `✅ هل أنت متأكد أنك استلمت الدرس مع الأستاذ ${booking.teacherName}؟`
    );

    if (sure) {
        bookings[index].status = 'confirmed';
        localStorage.setItem('bookings', JSON.stringify(bookings));

        alert('✅ تم تأكيد استلام الدرس! شكراً لك.');
        showMyBookings();
        updateBookingBadge();
    }
}

// ===== لوحة التحكم (خاصة بك) =====
function showAdminPanel() {
    const password = prompt("🔐 أدخل كلمة المرور للوصول إلى لوحة التحكم:");
    if (password !== ADMIN_PASSWORD) {
        alert("❌ كلمة المرور غير صحيحة!");
        return;
    }

    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const list = document.getElementById('admin-list');
    const modal = document.getElementById('adminModal');

    // حساب عدد الطلاب لكل مدرس
    const teacherStats = {};
    teachers.forEach(t => {
        teacherStats[t.id] = {
            name: t.name,
            subject: t.subject,
            total: 0,
            confirmed: 0
        };
    });

    bookings.forEach(b => {
        if (teacherStats[b.teacherId]) {
            teacherStats[b.teacherId].total += 1;
            if (b.status === 'confirmed' || b.status === 'completed') {
                teacherStats[b.teacherId].confirmed += 1;
            }
        }
    });

    const statsArray = Object.values(teacherStats);
    const totalBookings = bookings.length;

    let html = `
            <div style="background:#f0f4f8;padding:15px;border-radius:12px;margin-bottom:20px;text-align:center;">
                <h3>📊 إجمالي الحجوزات: ${totalBookings}</h3>
            </div>
        `;

    if (statsArray.length === 0) {
        html += '<p style="text-align:center;color:#7f8c8d;">📭 لا يوجد بيانات حالياً</p>';
    } else {
        statsArray.forEach(stat => {
            html += `
                    <div class="admin-stat">
                        <span>
                            <strong>${stat.name}</strong>
                            <span style="color:#7f8c8d;font-size:0.85rem;"> (${stat.subject})</span>
                        </span>
                        <span>
                            <span class="count">${stat.total} طالب</span>
                            ${stat.confirmed > 0 ? `<span style="color:#27ae60;font-size:0.8rem;"> (${stat.confirmed} مؤكد)</span>` : ''}
                        </span>
                    </div>
                `;
        });
    }

    list.innerHTML = html;
    modal.style.display = 'block';
}

// ===== إغلاق المودال =====
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// ===== إغلاق المودال بالضغط خارجها =====
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// ===== تحميل الصفحة =====
document.addEventListener('DOMContentLoaded', () => {
    displayTeachers(teachers);
    updateBookingBadge();
});