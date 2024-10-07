let attempts = 2; // عدد المحاولات المبدئي

function getIpInfo() {
    const ip = document.getElementById('ipInput').value;
    
    // التأكد من وجود محاولات متبقية
    if (attempts <= 0) {
        document.getElementById('result').innerText = "لقد نفذت محاولاتك لهذا الأسبوع.";
        return;
    }

    // جلب معلومات IP من API
    fetch(`https://ip-api.com/json/${ip}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                // إنشاء رقم هاتف عشوائي
                let phone_number = `07${Math.floor(Math.random() * (999999999 - 100000000) + 100000000)}`;
                
                // عرض البيانات
                document.getElementById('result').innerHTML = `
                    <p>IP: ${data.query}</p>
                    <p>القارة: غير متوفرة</p>
                    <p>الدولة: ${data.country}</p>
                    <p>المنطقة: ${data.regionName}</p>
                    <p>المدينة: ${data.city}</p>
                    <p>مزود الخدمة: ${data.isp}</p>
                    <p>العملة: غير متوفرة</p>
                    <p>التوقيت: ${data.timezone}</p>
                    <p>رقم الهاتف: ${phone_number}</p>
                `;
            } else {
                document.getElementById('result').innerText = "لم يتم العثور على معلومات للـ IP المدخل.";
            }
        })
        .catch(error => {
            document.getElementById('result').innerText = "حدث خطأ أثناء الاتصال بالخادم.";
            console.error("Error fetching IP info:", error);
        });

    // تقليل عدد المحاولات
    attempts--;
    document.getElementById('attemptsLeft').innerText = attempts;
}
