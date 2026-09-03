<div align="center">
  <img src="public/logo.png" alt="AHKH Study Hub Logo" width="220" />
  
  # AHKH Study Hub
  
  **The Sovereign Editorial Study Sanctuary & Curriculum Reader**  
  *مكتبة ومحراب المذاكرة التحريري — إعادة هندسة المحتوى التعليمي إلى أدب رفيع قابل للقراءة*

  [![Deploy to GitHub Pages](https://github.com/AHKH3/ahkh-study-hub/actions/workflows/deploy.yml/badge.svg)](https://github.com/AHKH3/ahkh-study-hub/actions/workflows/deploy.yml)
  [![Automated Release](https://github.com/AHKH3/ahkh-study-hub/actions/workflows/release.yml/badge.svg)](https://github.com/AHKH3/ahkh-study-hub/actions/workflows/release.yml)
  [![Static Site](https://img.shields.io/badge/Astro-5.x-BC52EE.svg?logo=astro&logoColor=white)](https://astro.build)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
  [![GitHub Pages](https://img.shields.io/badge/Hosted%20On-GitHub%20Pages-222222.svg?logo=github&logoColor=white)](https://ahkh3.github.io/ahkh-study-hub/)

  [**Live Website**](https://ahkh3.github.io/ahkh-study-hub/) · [**Architecture Docs**](docs/ARCHITECTURE.md) · [**Decisions Log**](docs/DECISIONS.md)
</div>

---

## نبذة عن المشروع / Project Philosophy

**AHKH Study Hub** هو منصة ومكتبة مذاكرة ثابتة وشخصية مبنية بنمط تحريري رصين (Editorial Sanctuary) كبديل متكامل لأدوات القراءة المدفوعة مثل *Readwise Reader*. 

فلسفة المشروع تقوم على **إنقاذ الفكر والمعرفة من جفاف النصوص الرتيبة والترانسكربتات المفرغة الميتة**، وإعادة هندستها بصرياً ومعمارياً باستخدام كامل مرونة وقوة وجماليات **HTML و CSS** (بطاقات ذكية، اقتباسات عريضة، كول أوتس، وجداول بيانات) لتتحول المادة العلمية إلى أدب رفيع ممتع ومريح للقراءة والمذاكرة المطولة، مع الالتزام التام بالقواعد التالية:
- **أمانة النص الحرفية (Verbatim Fidelity):** الحفاظ الكامل على ألفاظ وصياغة الكاتب الأصلية دون تلخيص توليدي بالذكاء الاصطناعي أو تشويه للنص.
- **الوقار التحريري ومونوكروم نقي:** خلفية بيضاء ناصعة (`#FFFFFF`) وخطوط سوداء حادة (`#09090B`) وفواصل محايدة (`#E4E4E7`) خالية من أي صبغات اصطناعية أو بهرجة بصرية.
- **حظر تام للإيموجيز:** اعتماد حصري على أيقونات هندسية نظيفة بصيغة SVG.
- **سيادة محلية مطلقة (Local-First):** تخزين التظليلات والملاحظات في ذاكرة المتصفح المحلية (`localStorage`) بدون قواعد بيانات سحابية أو تتبع.
- **تصدير بضغطة زر لريد وايز (Readwise CSV & Markdown):** تصدير كامل مقتطفاتك بصيغة متوافقة 100% مع معايير Readwise الرسمية.

---

## Key Features / الميزات الرئيسية

### 1. The Editorial Monograph Index (المكتبة الرئيسية)
- جدول تحريري أنيق يعرض الكورسات بدون حشو أو أوصاف مصطنعة.
- اسم الكورس، عدد الوحدات، عدد المصادر، المدة المقدرة، وشريط الإنجاز.
- شارات حالة ملونة بدقة:
  - `Active` (نشط): أخضر زمردي
  - `New` (جديد): أزرق
  - `Explored` (مستكشف): بنفسجي
  - `Completed` (تم): وردي

### 2. The Comprehensive Study Reader (القارئ التحريري المتقدم)
- **شريط تقدم ثابت (Permanent Progress Bar):** شريط علوي بارتفاع 3px يوضح نسبة إنجاز قراءة الدرس بلون الكورس المميز.
- **هيدر ذكي (Smart Auto-Hiding Header):** يختفي بسلاسة عند التمرير لأسفل لتركيز الانتباه، ويعود فوراً عند التمرير لأعلى.
- **شريطان جانبيان قابلان للطي (Collapsible Sidebars):**
  - شريط أيسر لفهرس الدرس ومحاوره (Outline).
  - شريط أيمن لعرض الملاحظات والتظليلات الحية.
- **وضع الهدوء الكامل (Zen Mode):** ضغطة واحدة تطوي الشريطين معاً وتمركز المحتوى في منتصف الشاشة بدون أي مشتتات.
- **مزامنة الفيديو والترانسكريبت (Media Player Sync):** دعم تضمين محاضرات الفيديو ومزامنة الطوابع الزمنية مع النص المكتوب تلقائياً.

### 3. Highlighting & Marginalia Engine (محرك التظليل والهوامش)
- **نافذة منبثقة تفاعلية (Floating Popover):** تظهر فور تحديد أي نص وتتيح:
  - التظليل (`Highlight`) أو إلغاؤه (`Remove`).
  - كتابة ملاحظة هامشية (`Add Sidenote`).
  - نسخ الاقتباس مع التوثيق المرجعي الكامل ورابط الدرس (`Copy with Citation`).
- **ملاحظات الهامش (Gutter Marginalia):** الملاحظات تظهر مباشرة في الهامش الأيمن بجوار الفقرة المظللة على الشاشات العريضة.
- **نبض التظليل التفاعلي (Highlight Pulse):** النقر على أي تظليل في القائمة ينقلك فوراً إليه وينبض بلون الكورس للتنبيه.

### 4. The Commonplace Book (دفتر الشواهد وتصدير Readwise)
- مستودع محلي مركزي يجمع كل الاقتباسات والملاحظات عبر جميع الكورسات.
- بحث فوري وسريع باختصار الزر `/`.
- تصدير رسمي بضغطة زر بصيغة **Readwise CSV** (وفق مواصفة RFC 4180) أو **Markdown**.

### 5. Automated CI/CD & Semantic Releases
- **نشر تلقائي على GitHub Pages:** عبر سير العمل `.github/workflows/deploy.yml` عند كل دمج على فرع `main`.
- **إصدارات تلقائية (Automated Releases):** عبر سير العمل `.github/workflows/release.yml` لدعم الإصدارات الدلالية والتحديثات.

---

## Tech Stack / التقنيات المستخدمة

- **Framework:** [Astro 5.x](https://astro.build) (Static Site Generation - SSG)
- **Styling:** [Tailwind CSS 3.x](https://tailwindcss.com) with `@tailwindcss/typography`
- **Typography:** Newsreader (Serif), Inter (Sans-serif), JetBrains Mono (Monospace)
- **Icons:** Pure inline SVG (Zero font dependencies, zero emojis)
- **Storage:** Client-side `localStorage` API
- **Deployment:** GitHub Actions & GitHub Pages

---

## Getting Started / البدء والتطوير المحلي

### المتطلبات المسبقة:
- [Node.js](https://nodejs.org/) الإصدار 20 أو أحدث
- npm الإصدار 10 أو أحدث

### خطوات التثبيت والتشغيل:
```bash
# 1. استنساخ المستودع
git clone https://github.com/AHKH3/ahkh-study-hub.git
cd ahkh-study-hub

# 2. تثبيت الحزم
npm install

# 3. تشغيل خادم التطوير المحلي
npm run dev
```
افتح المتصفح على الرابط المحلي: `http://localhost:4321/ahkh-study-hub/`

### أوامر البناء والاختبار:
```bash
# فحص الأنواع وبناء الموقع الثابت
npm run build

# معاينة الموقع المبني محلياً
npm run preview
```

---

## Automated Releases / إنشاء إصدار جديد

لإنشاء إصدار رسمي جديد وتوليد الملاحظات تلقائياً على GitHub:

### الطريقة الأولى (عبر Git Tag):
```bash
git tag v1.0.0
git push origin v1.0.0
```
سيقوم سير عمل GitHub Actions تلقائياً بإنشاء Release مع سجل التغييرات الكامل.

### الطريقة الثانية (عبر واجهة GitHub Actions):
1. اذهب لتبويب **Actions** في المستودع.
2. اختر سير عمل **Automated Release**.
3. اضغط **Run workflow** وحدد نوع الزيادة (`patch` أو `minor` أو `major`).

---

## Structure / هيكلية المجلدات

```
ahkh-study-hub/
├── .github/workflows/
│   ├── deploy.yml            # نشر تلقائي لـ GitHub Pages
│   └── release.yml           # توليد الإصدارات التلقائية
├── docs/
│   ├── ARCHITECTURE.md       # المخطط المعماري الكامل
│   ├── DECISIONS.md          # سجل القرارات الهندسية (ADR)
│   └── PROJECT.md            # ميثاق ونطاق المشروع
├── public/
│   └── logo.png              # الشعار الشفاف الأصلي
├── src/
│   ├── components/
│   │   └── HubHeader.astro   # الهيدر والتنقل
│   ├── data/
│   │   └── courses.ts        # بيانات المناهج والمحاضرات
│   ├── layouts/
│   │   └── BaseLayout.astro  # القالب الأساسي للموقع
│   ├── pages/
│   │   ├── index.astro       # فهرس المكتبة
│   │   ├── manifesto.astro   # المانيفيستو
│   │   ├── commonplace.astro # بنك التظليلات
│   │   └── courses/          # مسارات وصفحات القارئ
│   ├── styles/
│   │   └── global.css        # التنسيقات والأنميشن
│   └── utils/
│       └── paths.ts          # معالج المسارات لـ GitHub Pages
```

---

## License & Sovereignty / الترخيص

هذا المشروع صُمم للدراسة الشخصية الحرة ومتاح للعموم تحت رخصة الاستخدام الشخصي المفتوح.
