// 1. Toast funksiyasi
function showToast(message, type) {
    const toast = document.getElementById("toast");
    if (!toast) return;

    toast.innerText = message;
    toast.className = "toast";

    void toast.offsetWidth; // Animatsiyani qayta ishga tushirish

    toast.classList.add(type, "show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3500);
}

// 2. Mobil Menyu
function toggleMenu() {
    const navLinks = document.getElementById("navLinks");
    if (navLinks) {
        navLinks.classList.toggle("active");
    }
}

// 3. Telegram Bot
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('tgForm');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // HTML dagi IDlar bilan bir xil bo'lishi shart!
            const name = document.getElementById('userName').value.trim();
            const phone = document.getElementById('userPhone').value.trim();
            const msg = document.getElementById('userMsg').value.trim();
            const btn = document.getElementById('submitBtn');

            if (!name || !phone || !msg) {
                showToast("Iltimos, barcha maydonlarni to'ldiring! ⚠️", "error");
                return;
            }

            btn.innerText = "Yuborilmoqda...";
            btn.disabled = true;

            // BU YERGA O'ZINGIZNI MA'LUMOTLARINGIZNI QO'YING
            const token = "7547190011:AAHg36oVz6k8L2n1Hsh2p1_mQfT_w-T2z7k";
            const chat_id = "6714083833";

            const text = `🚀 Yangi xabar!\n👤 Ism: ${name}\n📞 Tel: ${phone}\n📝 Xabar: ${msg}`;

            fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${encodeURIComponent(text)}`)
                .then(res => {
                    if (res.ok) {
                        showToast("Xabaringiz yuborildi! ✅", "success");
                        form.reset();
                    } else {
                        showToast("Xatolik! Token yoki ID xato. ❌", "error");
                    }
                })
                .catch(() => showToast("Internet bilan muammo! 🌐", "error"))
                .finally(() => {
                    btn.innerText = "Yuborish";
                    btn.disabled = false;
                });
        });
    }
});