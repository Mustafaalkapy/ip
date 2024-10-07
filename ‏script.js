let attempts = 2;

function getIpInfo() {
    const ip = document.getElementById('ipInput').value;
    
    if (attempts <= 0) {
        document.getElementById('result').innerText = "لقد نفذت محاولاتك لهذا الأسبوع.";
        return;
    }

    fetch(`http://ip-api.com/json/${ip}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                let phone_number = `07${Math.floor(Math.random() * (999999999 - 100000000) + 100000000)}`;
                document.getElementById('result').innerHTML = `
                    <p>IP: ${data.query}</p>
                    <p>القارة: ${data.continent}</p>
                    <p>الدولة: ${data.country}</p>
                    <p>المنطقة: ${data.regionName}</p>
                    <p>المدينة: ${data.city}</p>
                    <p>مزود الخدمة: ${data.isp}</p>
                    <p>العملة: ${data.currency}</p>
                    <p>التوقيت: ${data.timezone}</p>
                    <p>رقم الهاتف: ${phone_number}</p>
                    <p>المحلة: none</p>
                    <p>الزقاق: none</p>
                    <p>اسم الضحية: none</p>
                    <p>صورة الضحية: none</p>
                `;
            } else {
                document.getElementById('result').innerText = "لم يتم العثور على معلومات للـ IP المدخل.";
            }
        })
        .catch(error => {
            document.getElementById('result').innerText = "حدث خطأ أثناء الاتصال بالخادم.";
        });

    // تقليل عدد المحاولات
    attempts--;
    document.getElementById('attemptsLeft').innerText = attempts;
}

function resetApp() {
    attempts = 2;
    document.getElementById('attemptsLeft').innerText = attempts;
    document.getElementById('result').innerText = "";
    document.getElementById('ipInput').value = "";
}