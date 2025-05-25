 function saveSettings() {
        let username = document.getElementById('username').value;
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;

        console.log('تم حفظ الإعدادات:', {username, email, password});
        alert('تم حفظ الإعدادات بنجاح!');
    };
    $(document).ready(function () {
    $('.nav-link').on('click', function () {
        $('.nav-link').removeClass('active');
        $(this).addClass('active');
        $('.tab-pane').removeClass('show active');
        $($(this).attr('href')).addClass('show active');
    });
});
function addProduct() {
  let form = document.getElementById("product-form");
  form.style.display = form.style.display === "none" ? "block" : "none";
}

function updateProduct(button) {
  let item = button.closest('.meeting-item'); // البحث عن العنصر الأب
  let existingForm = document.querySelector('.product-edit-form'); // البحث عن نموذج موجود مسبقًا
  
  // إزالة أي نموذج تعديل مفتوح مسبقًا
  if (existingForm) {
    existingForm.remove();
  }

  // إنشاء نموذج إدخال جديد داخل العنصر الذي يتم تعديله
  let editForm = document.createElement('div');
  editForm.className = 'product-edit-form';
  editForm.innerHTML = `
    <input type="text" class="edit-title" value="${item.querySelector('h4').innerText}">
    <input type="text" class="edit-price" value="${item.querySelector('.price span').innerText.replace('$', '')}">
    <button onclick="saveEdit(this)">حفظ التعديلات</button>
  `;

  item.appendChild(editForm); // إضافة النموذج داخل العنصر الصحيح
}
function saveEdit(button) {
  let editForm = button.closest('.product-edit-form');
  let item = editForm.closest('.meeting-item');

  let newTitle = editForm.querySelector('.edit-title').value;
  let newPrice = editForm.querySelector('.edit-price').value;

  item.querySelector('h4').innerText = newTitle;
  item.querySelector('.price span').innerText = `$${newPrice}`;

  editForm.remove(); // إزالة النموذج بعد الحفظ
}
document.addEventListener("DOMContentLoaded", function () {
  let userList = document.querySelector(".user-list");

  let fakeUsers = [
    {
      name: "أحمد الخطيب",
      email: "ahmad@example.com",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      role: "admin",
    },
    {
      name: "سارة الجبوري",
      email: "sara@example.com",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      role: "moderator",
    },{
      name: "سارة الجبوري",
      email: "sara@example.com",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      role: "moderator",
    },{
      name: "سارة الجبوري",
      email: "sara@example.com",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      role: "moderator",
    },{
      name: "سارة الجبوري",
      email: "sara@example.com",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      role: "moderator",
    },{
      name: "سارة الجبوري",
      email: "sara@example.com",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      role: "moderator",
    },{
      name: "سارة الجبوري",
      email: "sara@example.com",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      role: "moderator",
    },{
      name: "سارة الجبوري",
      email: "sara@example.com",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      role: "moderator",
    },
  ];

  fakeUsers.forEach((user) => {
    let userItem = document.createElement("div");
    userItem.className = "user-item";
    userItem.innerHTML = `
      <img src="${user.image}" class="user-img" alt="${user.name}">
      <div class="user-details">
        <p><strong>${user.name}</strong> - ${user.email}</p>
        <span class="role-badge ${user.role}">${user.role}</span>
      </div>
      <div class="user-actions">
        <button class="details-btn" onclick="viewUserDetails(this)">عرض التفاصيل</button>
        <button class="delete-btn" onclick="deleteUser(this)">حذف</button>
      </div>
    `;
    userList.appendChild(userItem);
  });
});

function deleteUser(button) {
  button.closest('.user-item').remove();
}
function previewImages() {
    let previewContainer = document.getElementById('image-preview');
    let files = document.getElementById('product-images').files;

    previewContainer.innerHTML = ""; // تنظيف المعاينة السابقة

    if (files.length > 5) {
        alert("يمكنك رفع 5 صور فقط!");
        return;
    }

    for (let i = 0; i < files.length; i++) {
        let imgElement = document.createElement("img");
        imgElement.src = URL.createObjectURL(files[i]);
        previewContainer.appendChild(imgElement);
    }
}

function saveProduct() {
    let name = document.getElementById("product-name").value;
    let price = document.getElementById("product-price").value;
    let description = document.getElementById("product-description").value;

    if (!name || !price || !description) {
        alert("يرجى ملء جميع الحقول!");
        return;
    }

    alert("تم حفظ المنتج بنجاح!");
}

function viewUserDetails(button) {
  let item = button.closest('.user-item');
  let name = item.querySelector("strong").innerText;
  let email = item.querySelector(".user-details p").innerText.split(" - ")[1];
  let imageSrc = item.querySelector(".user-img").src;
  let role = item.querySelector(".role-badge").innerText;

  alert(`تفاصيل المستخدم:\n\nالاسم: ${name}\nالبريد الإلكتروني: ${email}\nالرتبة: ${role}\nالصورة: ${imageSrc}`);
}
const imagesList = [
    ["assets/images/meeting-01.jpg", "assets/images/meeting-02.jpg", "assets/images/meeting-03.jpg"],
    ["assets/images/course-04.jpg", "assets/images/course-01.jpg", "assets/images/course-02.jpg"],
    ["assets/images/meeting-04.jpg", "assets/images/course-03.jpg", "assets/images/meeting-02.jpg"]
];

const imageElements = document.querySelectorAll(".product-image");

imageElements.forEach((img, index) => {
    let currentIndex = 0;
    
    function changeImage() {
        currentIndex = (currentIndex + 1) % imagesList[index].length;
        img.src = imagesList[index][currentIndex];
    }

    // تغيير كل صورة على حدة بشكل مستقل
    setInterval(changeImage, 3000);
});
// تغيير الصورة كل 3 ثوانٍ (3000 ميلي ثانية)
setInterval(changeImage, 3000);
function rateProduct(stars) {
    document.getElementById("rating-value").innerText = stars + "/5";
    let starElements = document.querySelectorAll(".star");
    starElements.forEach((star, index) => {
        star.style.color = index < stars ? "gold" : "gray";
    });
}
function openLightbox(imageSrc) {
    document.getElementById("lightbox-img").src = imageSrc;
    document.getElementById("lightbox").style.display = "flex";
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}
let selectedImageId = null;
function updateImage() {
    let fileInput = document.getElementById("upload-image");
    if (fileInput.files.length > 0) {
        let imageUrl = URL.createObjectURL(fileInput.files[0]);
        document.querySelector(".carousel-3d .slide img").src = imageUrl;
    }
}

function saveProductDetails() {
    let name = document.getElementById("product-name").value;
    let price = document.getElementById("product-price").value;
    let description = document.getElementById("product-description").value;

    document.querySelector(".product-name span").innerText = name;
    document.querySelector(".product-price span").innerText = `$${price}`;
    document.querySelector(".product-description").innerText = description;

    alert("تم تحديث تفاصيل المنتج بنجاح!");
}

document.querySelectorAll(".image-gallery img").forEach(img => {
    img.addEventListener("click", function() {
        document.getElementById("upload-image").click();
        selectedImage = this; // حفظ الصورة التي سيتم استبدالها
    });
});

let selectedImage = null;

function selectImage(imageId) {
    selectedImage = document.getElementById(imageId);
    document.getElementById("upload-image").click(); // فتح اختيار الملفات
}

document.getElementById("upload-image").addEventListener("change", function() {
    if (selectedImage && this.files.length > 0) {
        let imageUrl = URL.createObjectURL(this.files[0]);
        selectedImage.src = imageUrl;
    }
});

function deleteImage(imageId) {
    let img = document.getElementById(imageId);
    img.src = "assets/images/placeholder.jpg"; // صورة بديلة عند الحذف
}
function previewImage(event) {
    const file = event.target.files[0]; // الحصول على الملف المختار
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        // إنشاء عنصر جديد للصورة وإضافته للمعرض
        const gallery = document.getElementById("gallery");
        const wrapper = document.createElement("div");
        wrapper.classList.add("image-wrapper");

        const img = document.createElement("img");
        img.src = e.target.result;
        img.alt = "صورة جديدة";
        
        // زر حذف الصورة
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.onclick = function () {
            wrapper.remove();
        };

        // إضافة العناصر داخل الـ div
        wrapper.appendChild(img);
        wrapper.appendChild(deleteBtn);
        gallery.appendChild(wrapper);
    };

    reader.readAsDataURL(file); // تحويل الملف إلى رابط عرض مباشر
}
document.addEventListener("DOMContentLoaded", function () {
    const complaints = [
        { id: 101, name: "أحمد", description: "تأخير في التسليم", status: "قيد المعالجة" },
        { id: 102, name: "سارة", description: "المنتج غير مطابق", status: "تم الحل" },
        { id: 103, name: "خالد", description: "مشكلة في الدفع", status: "في انتظار الرد" }
    ];

    const complaintList = document.getElementById("complaint-list");

    complaints.forEach(complaint => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${complaint.id}</td>
            <td>${complaint.name}</td>
            <td>${complaint.description}</td>
            <td>${complaint.status}</td>
            <td>
                <button onclick="updateComplaintStatus(${complaint.id}, 'تم الحل')">✔️ حل</button>
                <button onclick="updateComplaintStatus(${complaint.id}, 'مرفوضة')">❌ رفض</button>
            </td>
        `;

        complaintList.appendChild(row);
    });
});
function updateComplaintStatus(complaintId, newStatus) {
    const rows = document.querySelectorAll("#complaint-list tr");

    rows.forEach(row => {
        if (row.children[0].innerText == complaintId) {
            row.children[3].innerText = newStatus;
        }
    });
}
const salesCtx = document.getElementById('salesChart').getContext('2d');
new Chart(salesCtx, {
    type: 'bar',
    data: {
        labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو'],
        datasets: [{
            label: 'الإيرادات بالدولار',
            data: [5000, 7000, 8000, 12000, 15000],
            backgroundColor: '#007bff',
            borderColor: '#0056b3',
            borderWidth: 1
        }]
    }
});

const reviewsCtx = document.getElementById('reviewsChart').getContext('2d');
new Chart(reviewsCtx, {
    type: 'doughnut',
    data: {
        labels: ['⭐ 5 نجوم', '⭐ 4 نجوم', '⭐ 3 نجوم', '⭐ 2 نجوم', '⭐ 1 نجمة'],
        datasets: [{
            data: [60, 25, 10, 3, 2],
            backgroundColor: ['#28a745', '#17a2b8', '#ffc107', '#fd7e14', '#dc3545']
        }]
    }
});

const customersCtx = document.getElementById('customersChart').getContext('2d');
new Chart(customersCtx, {
    type: 'line',
    data: {
        labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو'],
        datasets: [{
            label: 'عدد العملاء الجدد',
            data: [200, 400, 600, 850, 1200],
            borderColor: '#343a40',
            backgroundColor: 'rgba(52, 58, 64, 0.5)',
            fill: true
        }]
    }
});

const ordersCtx = document.getElementById('ordersChart').getContext('2d');
new Chart(ordersCtx, {
    type: 'pie',
    data: {
        labels: ['طلبات مكتملة', 'طلبات معلقة', 'طلبات ملغاة'],
        datasets: [{
            data: [75, 15, 10],
            backgroundColor: ['#28a745', '#ffc107', '#dc3545']
        }]
    }
});

const complaintsCtx = document.getElementById('complaintsChart').getContext('2d');
new Chart(complaintsCtx, {
    type: 'bar',
    data: {
        labels: ['تأخير الشحن', 'مشاكل المنتج', 'خدمة العملاء', 'طلبات غير صحيحة'],
        datasets: [{
            label: 'عدد الشكاوى',
            data: [50, 30, 15, 10],
            backgroundColor: '#dc3545',
            borderColor: '#a71d2a',
            borderWidth: 1
        }]
    }
});
document.addEventListener('DOMContentLoaded', function() {
    saveSettings();
});
document.addEventListener("DOMContentLoaded", function () {
    // مخطط المبيعات
    const salesCtx = document.getElementById('salesChart').getContext('2d');
    new Chart(salesCtx, {
        type: 'bar',
        data: {
            labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو'],
            datasets: [{
                label: 'الإيرادات بالدولار',
                data: [5000, 7000, 8000, 12000, 15000],
                backgroundColor: '#007bff',
                borderColor: '#0056b3',
                borderWidth: 1
            }]
        }
    });

    // مخطط التقييمات
    const reviewsCtx = document.getElementById('reviewsChart').getContext('2d');
    new Chart(reviewsCtx, {
        type: 'doughnut',
        data: {
            labels: ['⭐ 5 نجوم', '⭐ 4 نجوم', '⭐ 3 نجوم', '⭐ 2 نجوم', '⭐ 1 نجمة'],
            datasets: [{
                data: [60, 25, 10, 3, 2],
                backgroundColor: ['#28a745', '#17a2b8', '#ffc107', '#fd7e14', '#dc3545']
            }]
        }
    });

    // مخطط نمو العملاء
    const customersCtx = document.getElementById('customersChart').getContext('2d');
    new Chart(customersCtx, {
        type: 'line',
        data: {
            labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو'],
            datasets: [{
                label: 'عدد العملاء الجدد',
                data: [200, 400, 600, 850, 1200],
                borderColor: '#343a40',
                backgroundColor: 'rgba(52, 58, 64, 0.5)',
                fill: true
            }]
        }
    });

    // مخطط الطلبات
    const ordersCtx = document.getElementById('ordersChart').getContext('2d');
    new Chart(ordersCtx, {
        type: 'pie',
        data: {
            labels: ['طلبات مكتملة', 'طلبات معلقة', 'طلبات ملغاة'],
            datasets: [{
                data: [75, 15, 10],
                backgroundColor: ['#28a745', '#ffc107', '#dc3545']
            }]
        }
    });

    // مخطط الشكاوى
    const complaintsCtx = document.getElementById('complaintsChart').getContext('2d');
    new Chart(complaintsCtx, {
        type: 'bar',
        data: {
            labels: ['تأخير الشحن', 'مشاكل المنتج', 'خدمة العملاء', 'طلبات غير صحيحة'],
            datasets: [{
                label: 'عدد الشكاوى',
                data: [50, 30, 15, 10],
                backgroundColor: '#dc3545',
                borderColor: '#a71d2a',
                borderWidth: 1
            }]
        }
    });
});
 function showInvoice(invoiceNumber, buyer, quantity, items) {
    document.getElementById("invoiceNumber").textContent = invoiceNumber;
    document.getElementById("invoiceBuyer").textContent = buyer;
    document.getElementById("invoiceQuantity").textContent = quantity;
    
    let itemsList = document.getElementById("invoiceItems");
    itemsList.innerHTML = "";
    let total = 0;

    items.forEach(item => {
        let li = document.createElement("li");
        li.textContent = item;
        itemsList.appendChild(li);

        total += parseFloat(item.split("-")[0].trim().replace("$", ""));
    });

    document.getElementById("invoiceTotal").textContent = "$" + total;

    document.getElementById("invoiceModal").style.display = "block";
}

function closeInvoice() {
    document.getElementById("invoiceModal").style.display = "none";
}
    // تفعيل Flatpickr للتقويم
    flatpickr(".datepicker", {
        dateFormat: "Y-m-d",
    });

    flatpickr("#startDate, #endDate", {
        dateFormat: "Y-m-d",
    });

    // إظهار زر الحفظ عند التعديل
    document.querySelectorAll("td[contenteditable='true'], select, .datepicker").forEach(element => {
        element.addEventListener("input", () => {
            element.closest("tr").querySelector(".save-btn").style.display = "inline-block";
        });
    });

    // فلترة الجدول حسب نطاق التاريخ
    function filterByDate() {
        let startDate = document.getElementById("startDate").value;
        let endDate = document.getElementById("endDate").value;

        document.querySelectorAll("tbody tr").forEach(row => {
            let paymentDate = row.querySelector(".datepicker").value;
            if (paymentDate >= startDate && paymentDate <= endDate) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    };
     // تفعيل التقويم
    flatpickr(".datepicker", {
        dateFormat: "Y-m-d",
        locale: "ar",
        allowInput: true
    });

    // وظيفة الفلترة المتقدمة
    function applyFilters() {
        let startDate = document.getElementById("startDate").value;
        let endDate = document.getElementById("endDate").value;
        let minPrice = parseFloat(document.getElementById("minPrice").value) || 0;
        let maxPrice = parseFloat(document.getElementById("maxPrice").value) || Infinity;
        let searchName = document.getElementById("searchName").value.toLowerCase();

        document.querySelectorAll("tbody tr").forEach(row => {
            let paymentDate = row.querySelector(".datepicker").value;
            let price = parseFloat(row.cells[1].innerText.replace("$", ""));
            let buyerName = row.cells[3].innerText.toLowerCase();

            let dateMatch = (!startDate || !endDate) || (paymentDate >= startDate && paymentDate <= endDate);
            let priceMatch = price >= minPrice && price <= maxPrice;
            let nameMatch = buyerName.includes(searchName);

            row.style.display = (dateMatch && priceMatch && nameMatch) ? "" : "none";
        });
    };
    const orders = [
    { id: 101, name: "محمد", date: "2025-05-20", value: "$200", status: "لم يتم الشحن" },
    { id: 102, name: "سارة", date: "2025-05-22", value: "$350", status: "تم الشحن" }
];

function displayOrders() {
    let tableBody = document.getElementById("ordersTable");
    tableBody.innerHTML = "";
    orders.forEach(order => {
        tableBody.innerHTML += `
            <tr>
                <td>${order.id}</td>
                <td>${order.name}</td>
                <td>${order.date}</td>
                <td>${order.value}</td>
                <td>
                    <select onchange="updateStatus(${order.id}, this.value)">
                        <option ${order.status === "تم الشحن" ? "selected" : ""}>تم الشحن</option>
                        <option ${order.status === "لم يتم الشحن" ? "selected" : ""}>لم يتم الشحن</option>
                    </select>
                </td>
                <td><button onclick="editOrder(${order.id})">تعديل</button></td>
            </tr>
        `;
    });
}

function updateStatus(id, newStatus) {
    const order = orders.find(o => o.id === id);
    if (order) order.status = newStatus;
    displayOrders();
}
;
displayOrders();
function filterOrders() {
    const searchName = document.getElementById("searchName").value.toLowerCase();
    const dateFrom = document.getElementById("dateFrom").value;
    const dateTo = document.getElementById("dateTo").value;

    let filteredOrders = orders.filter(order =>
        order.name.toLowerCase().includes(searchName) &&
        (!dateFrom || order.date >= dateFrom) &&
        (!dateTo || order.date <= dateTo)
    );

    let tableBody = document.getElementById("ordersTable");
    tableBody.innerHTML = "";
    filteredOrders.forEach(order => {
        tableBody.innerHTML += `
            <tr>
                <td>${order.id}</td>
                <td>${order.name}</td>
                <td>${order.date}</td>
                <td>${order.value}</td>
                <td>${order.status}</td>
                <td><button onclick="editOrder(${order.id})">تعديل</button></td>
            </tr>
        `;
    });
};
function searchUser() {
  let searchValue = document.getElementById("search-user").value.toLowerCase();
  let users = document.querySelectorAll(".user-list .user-item");

  users.forEach(user => {
    let userName = user.querySelector(".user-name").textContent.toLowerCase();
    if (userName.includes(searchValue)) {
      user.style.display = "block";
    } else {
      user.style.display = "none";
    }
  });
};
function addComment() {
    let commentText = document.getElementById("commentInput").value;
    if (commentText.trim() === "") return;

    let commentsContainer = document.querySelector(".comments-container");

    // إنشاء عنصر جديد للتعليق
    let newComment = document.createElement("div");
    newComment.classList.add("comment");

    newComment.innerHTML = `
        <img src="assets/images/user-placeholder.jpg" alt="صورة المستخدم" class="user-avatar">
        <div class="comment-content">
            <h4>مستخدم جديد</h4>
            <p>${commentText}</p>
        </div>
    `;

    commentsContainer.prepend(newComment);
    document.getElementById("commentInput").value = ""; // مسح الحقل بعد النشر
};
