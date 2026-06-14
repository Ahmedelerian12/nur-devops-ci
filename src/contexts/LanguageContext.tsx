import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ar' | 'fr' | 'ur' | 'es';

interface Translations {
  [key: string]: {
    [lang in Language]: string;
  };
}

const translations: Translations = {
  // Navigation
  home: { en: 'Home', ar: 'الرئيسية', fr: 'Accueil', ur: 'ہوم', es: 'Inicio' },
  learn: { en: 'Learn', ar: 'تعلم', fr: 'Apprendre', ur: 'سیکھیں', es: 'Aprender' },
  qa: { en: 'Q&A', ar: 'سؤال وجواب', fr: 'Q&R', ur: 'سوال و جواب', es: 'Preguntas' },
  stories: { en: 'Stories', ar: 'قصص', fr: 'Histoires', ur: 'کہانیاں', es: 'Historias' },
  donate: { en: 'Donate', ar: 'تبرع', fr: 'Faire un don', ur: 'عطیہ کریں', es: 'Donar' },

  // Hero Section
  discoverIslam: { en: 'Discover Islam', ar: 'اكتشف الإسلام', fr: 'Découvrir l\'Islam', ur: 'اسلام دریافت کریں', es: 'Descubre el Islam' },
  heroTitle: { en: 'Discover the Light of Islam', ar: 'اكتشف نور الإسلام', fr: 'Découvrez la lumière de l\'Islam', ur: 'اسلام کا نور دریافت کریں', es: 'Descubre la Luz del Islam' },
  heroSubtitle: { en: 'A global community spreading peace, knowledge, and truth. Join us to learn, connect, and support.', ar: 'مجتمع عالمي ينشر السلام والمعرفة والحقيقة. انضم إلينا للتعلم والتواصل والدعم.', fr: 'Une communauté mondiale diffusant la paix, la connaissance et la vérité. Rejoignez-nous pour apprendre, vous connecter et soutenir.', ur: 'ایک عالمی برادری جو امن، علم اور سچائی کو پھیلا رہی ہے۔ سیکھنے، جڑنے اور حمایت کے لیے ہمارے ساتھ شامل ہوں۔', es: 'Una comunidad global difundiendo paz, conocimiento y verdad. Únete para aprender, conectarte y apoyar.' },
  startLearning: { en: 'Start Learning', ar: 'ابدأ التعلم', fr: 'Commencer', ur: 'سیکھنا شروع کریں', es: 'Empieza a aprender' },
  readStories: { en: 'Read Stories', ar: 'اقرأ القصص', fr: 'Lire des histoires', ur: 'کہانیاں پڑھیں', es: 'Leer historias' },

  // Stats
  statsLanguages: { en: 'Languages', ar: 'لغات', fr: 'Langues', ur: 'زبانیں', es: 'Idiomas' },
  statsTopics: { en: 'Topics', ar: 'مواضيع', fr: 'Sujets', ur: 'موضوعات', es: 'Temas' },
  statsCommunity: { en: 'Community', ar: 'مجتمع', fr: 'Communauté', ur: 'کمیونٹی', es: 'Comunidad' },
  statsSupport: { en: 'Support', ar: 'دعم', fr: 'Soutien', ur: 'سپورٹ', es: 'Soporte' },

  // Home Cards
  forNewMuslims: { en: 'For New Muslims', ar: 'للمسلمين الجدد', fr: 'Pour les nouveaux musulmans', ur: 'نئے مسلمانوں کے لیے', es: 'Para los nuevos musulmanes' },
  essentialGuides: { en: 'Essential guides to begin your journey.', ar: 'أدلة أساسية لبدء رحلتك.', fr: 'Guides essentiels pour commencer votre voyage.', ur: 'آپ کا سفر شروع کرنے کے لیے ضروری رہنما۔', es: 'Guías esenciales para comenzar tu viaje.' },
  viewAll: { en: 'View all', ar: 'عرض الكل', fr: 'Voir tout', ur: 'سب دیکھیں', es: 'Ver todo' },
  howToPray: { en: 'How to Pray (Salah)', ar: 'كيفية الصلاة', fr: 'Comment prier (Salât)', ur: 'نماز کا طریقہ', es: 'Cómo rezar (Salah)' },
  prayGuideDesc: { en: 'A complete step-by-step guide to performing the daily prayers.', ar: 'دليل كامل خطوة بخطوة لأداء الصلوات اليومية.', fr: 'Guide complet étape par étape pour les prières quotidiennes.', ur: 'روزانہ کی نمازیں ادا کرنے کا مکمل مرحلہ وار گائیڈ۔', es: 'Guía completa paso a paso para las oraciones diarias.' },
  readGuide: { en: 'Read Guide', ar: 'اقرأ الدليل', fr: 'Lire le guide', ur: 'گائیڈ پڑھیں', es: 'Leer guía' },
  askScholar: { en: 'Ask a Scholar', ar: 'اسأل عالماً', fr: 'Demander à un érudit', ur: 'عالم سے پوچھیں', es: 'Pregunta a un experto' },
  askScholarDesc: { en: 'Have questions? Get answers from verified Islamic scholars.', ar: 'هل لديك أسئلة؟ احصل على إجابات من علماء إسلاميين معتمدين.', fr: 'Vous avez des questions? Obtenez des réponses d\'érudits vérifiés.', ur: 'کیا آپ کے کوئی سوالات ہیں؟ تصدیق شدہ اسلامی علماء سے جوابات حاصل کریں۔', es: '¿Tienes preguntas? Obtén respuestas de eruditos verificados.' },
  browseQA: { en: 'Browse Q&A', ar: 'تصفح الأسئلة والأجوبة', fr: 'Parcourir les Q&R', ur: 'سوال و جواب براؤز کریں', es: 'Explorar Q&A' },
  storiesCardDesc: { en: 'Read inspiring journeys of people who embraced Islam from around the world.', ar: 'اقرأ رحلات ملهمة لأشخاص اعتنقوا الإسلام من جميع أنحاء العالم.', fr: 'Lisez les parcours inspirants de personnes ayant embrassé l\'Islam.', ur: 'دنیا بھر سے اسلام قبول کرنے والوں کے متاثر کن سفر پڑھیں۔', es: 'Lee los inspiradores viajes de personas que abrazaron el Islam.' },
  donateCardDesc: { en: 'Support our mission to make Islamic knowledge accessible to everyone globally.', ar: 'ادعم مهمتنا لجعل المعرفة الإسلامية في متناول الجميع عالميًا.', fr: 'Soutenez notre mission de rendre le savoir islamique accessible à tous.', ur: 'اسلامی علم کو عالمی سطح پر ہر کسی کے لیے قابل رسائی بنانے کے مشن کی حمایت کریں۔', es: 'Apoya nuestra misión de hacer el conocimiento islámico accesible globalmente.' },
  surahNur: { en: 'Surah An-Nur (24:35)', ar: 'سورة النور (٢٤:٣٥)', fr: 'Sourate An-Nur (24:35)', ur: 'سورۃ النور (۲۴:۳۵)', es: 'Sura An-Nur (24:35)' },

  // Learn Page
  learnDesc: { en: 'Comprehensive resources tailored for those discovering Islam and new Muslims.', ar: 'موارد شاملة مصممة لأولئك الذين يكتشفون الإسلام والمسلمين الجدد.', fr: 'Ressources complètes pour ceux qui découvrent l\'Islam et les nouveaux musulmans.', ur: 'اسلام کو دریافت کرنے والوں اور نئے مسلمانوں کے لیے تیار کردہ جامع وسائل۔', es: 'Recursos completos para quienes descubren el Islam y nuevos musulmanes.' },
  featuredSeries: { en: 'Featured Series', ar: 'سلسلة مميزة', fr: 'Série en vedette', ur: 'نمایاں سیریز', es: 'Serie destacada' },
  introQuran: { en: 'Introduction to Quranic Sciences', ar: 'مقدمة في علوم القرآن', fr: 'Introduction aux sciences coraniques', ur: 'قرآنی علوم کا تعارف', es: 'Introducción a las ciencias coránicas' },
  introQuranDesc: { en: 'A practical guide to approaching and understanding the Quran for beginners.', ar: 'دليل عملي للتعامل مع القرآن وفهمه للمبتدئين.', fr: 'Guide pratique pour aborder et comprendre le Coran pour débutants.', ur: 'ابتدائی افراد کے لیے قرآن سے رجوع کرنے اور اسے سمجھنے کے لیے ایک عملی رہنما۔', es: 'Guía práctica para acercarse y comprender el Corán para principiantes.' },
  theBasics: { en: 'The Basics', ar: 'الأساسيات', fr: 'Les bases', ur: 'بنیادی باتیں', es: 'Lo Básico' },
  pillarsIslam: { en: 'Pillars of Islam', ar: 'أركان الإسلام', fr: 'Piliers de l\'Islam', ur: 'اسلام کے ارکان', es: 'Pilares del Islam' },
  articlesFaith: { en: 'Articles of Faith', ar: 'أركان الإيمان', fr: 'Articles de foi', ur: 'ایمان کے ارکان', es: 'Artículos de Fe' },
  whoIsMuhammad: { en: 'Who is Muhammad ﷺ?', ar: 'من هو محمد ﷺ؟', fr: 'Qui est Muhammad ﷺ ?', ur: 'محمد ﷺ کون ہیں؟', es: '¿Quién es Mahoma ﷺ?' },
  worship: { en: 'Worship', ar: 'العبادة', fr: 'Adoration', ur: 'عبادت', es: 'Adoración' },
  fastingRamadan: { en: 'Fasting Ramadan', ar: 'صيام رمضان', fr: 'Jeûner le Ramadan', ur: 'رمضان کے روزے', es: 'Ayunar en Ramadán' },
  zakatCharity: { en: 'Zakat & Charity', ar: 'الزكاة والصدقة', fr: 'Zakat et Charité', ur: 'زکوٰۃ اور صدقہ', es: 'Zakat y Caridad' },
  dailyLife: { en: 'Daily Life', ar: 'الحياة اليومية', fr: 'Vie quotidienne', ur: 'روزمرہ کی زندگی', es: 'Vida Diaria' },
  halalHaram: { en: 'Halal & Haram', ar: 'الحلال والحرام', fr: 'Halal et Haram', ur: 'حلال اور حرام', es: 'Halal y Haram' },
  islamicManners: { en: 'Islamic Manners', ar: 'الآداب الإسلامية', fr: 'Manières islamiques', ur: 'اسلامی اخلاق', es: 'Modales Islámicos' },
  familyLife: { en: 'Family Life', ar: 'الحياة الأسرية', fr: 'Vie de famille', ur: 'خاندانی زندگی', es: 'Vida Familiar' },

  // Q&A Page
  qaDesc: { en: 'Find answers to common questions or ask a verified Islamic scholar directly.', ar: 'اعثر على إجابات للأسئلة الشائعة أو اسأل عالمًا إسلاميًا معتمدًا مباشرةً.', fr: 'Trouvez des réponses aux questions courantes ou posez-les à un érudit vérifié.', ur: 'عام سوالات کے جوابات تلاش کریں یا براہ راست تصدیق شدہ اسلامی عالم سے پوچھیں۔', es: 'Encuentra respuestas a preguntas comunes o pregúntale a un experto directamente.' },
  searchTopics: { en: 'Search topics...', ar: 'ابحث في المواضيع...', fr: 'Rechercher des sujets...', ur: 'موضوعات تلاش کریں...', es: 'Buscar temas...' },
  allTopics: { en: 'All', ar: 'الكل', fr: 'Tous', ur: 'سب', es: 'Todos' },
  askQuestion: { en: 'Ask a Question', ar: 'اطرح سؤالاً', fr: 'Poser une question', ur: 'ایک سوال پوچھیں', es: 'Haz una pregunta' },
  askModalDesc: { en: 'Your question will be reviewed and answered by a qualified scholar. You will be notified via email.', ar: 'ستتم مراجعة سؤالك والإجابة عليه من قبل عالم مؤهل. سيتم إعلامك عبر البريد الإلكتروني.', fr: 'Votre question sera examinée et répondue par un érudit qualifié. Vous serez averti par e-mail.', ur: 'ایک اہل عالم آپ کے سوال کا جائزہ لیں گے اور جواب دیں گے۔ آپ کو ای میل کے ذریعے مطلع کیا جائے گا۔', es: 'Tu pregunta será revisada y respondida por un erudito calificado.' },
  emailOptional: { en: 'Email (Optional)', ar: 'البريد الإلكتروني (اختياري)', fr: 'Email (Facultatif)', ur: 'ای میل (اختیاری)', es: 'Correo electrónico (Opcional)' },
  forNotification: { en: 'For notification...', ar: 'للإشعار...', fr: 'Pour notification...', ur: 'نوٹیفکیشن کے لیے...', es: 'Para notificación...' },
  topic: { en: 'Topic', ar: 'الموضوع', fr: 'Sujet', ur: 'موضوع', es: 'Tema' },
  generalIslam: { en: 'General Islam', ar: 'الإسلام العام', fr: 'Islam général', ur: 'عام اسلام', es: 'Islam General' },
  prayerWorship: { en: 'Prayer & Worship', ar: 'الصلاة والعبادة', fr: 'Prière et Adoration', ur: 'نماز اور عبادت', es: 'Oración y Adoración' },
  familyRelationships: { en: 'Family & Relationships', ar: 'الأسرة والعلاقات', fr: 'Famille et Relations', ur: 'خاندان اور تعلقات', es: 'Familia y Relaciones' },
  question: { en: 'Question', ar: 'سؤال', fr: 'Question', ur: 'سوال', es: 'Pregunta' },
  typeQuestion: { en: 'Type your detailed question here...', ar: 'اكتب سؤالك المفصل هنا...', fr: 'Tapez votre question détaillée ici...', ur: 'اپنا تفصیلی سوال یہاں ٹائپ کریں...', es: 'Escribe tu pregunta detallada aquí...' },
  submitQuestion: { en: 'Submit Question', ar: 'إرسال السؤال', fr: 'Soumettre la question', ur: 'سوال جمع کرائیں', es: 'Enviar pregunta' },
  submitting: { en: 'Submitting...', ar: 'جاري الإرسال...', fr: 'Envoi en cours...', ur: 'جمع ہو رہا ہے...', es: 'Enviando...' },
  questionRequired: { en: 'Please enter your question before submitting.', ar: 'يرجى إدخال سؤالك قبل الإرسال.', fr: 'Veuillez entrer votre question avant de soumettre.', ur: 'جمع کرنے سے پہلے اپنا سوال درج کریں۔', es: 'Por favor, ingresa tu pregunta antes de enviar.' },
  questionSubmitted: { en: 'Your question has been submitted! A scholar will review and respond soon.', ar: 'تم إرسال سؤالك! سيراجعه عالم ويرد عليه قريبًا.', fr: 'Votre question a été soumise! Un érudit l\'examinera et répondra bientôt.', ur: 'آپ کا سوال جمع ہو گیا ہے! ایک عالم جلد جائزہ لے کر جواب دیں گے۔', es: 'Tu pregunta ha sido enviada. Un erudito la revisará y responderá pronto.' },
  noResults: { en: 'No questions match your search.', ar: 'لا توجد أسئلة تطابق بحثك.', fr: 'Aucune question ne correspond à votre recherche.', ur: 'آپ کی تلاش سے کوئی سوال نہیں ملا۔', es: 'No hay preguntas que coincidan con tu búsqueda.' },
  tryDifferent: { en: 'Try a different search term or ask a scholar directly.', ar: 'جرب مصطلح بحث مختلف أو اسأل عالمًا مباشرةً.', fr: 'Essayez un autre terme ou posez la question à un érudit.', ur: 'مختلف تلاش کی اصطلاح آزمائیں یا عالم سے براہ راست پوچھیں۔', es: 'Prueba otro término de búsqueda o pregunta a un erudito directamente.' },

  // Stories Page
  storiesDesc: { en: 'Read inspiring journeys of people who found their way to Islam, or share your own to inspire others.', ar: 'اقرأ رحلات ملهمة لأشخاص وجدوا طريقهم إلى الإسلام، أو شارك رحلتك لإلهام الآخرين.', fr: 'Lisez les parcours inspirants de personnes qui ont trouvé l\'Islam, ou partagez le vôtre.', ur: 'ان لوگوں کے متاثر کن سفر پڑھیں جنہوں نے اسلام کا راستہ تلاش کیا، یا دوسروں کو متاثر کرنے کے لیے اپنا اشتراک کریں۔', es: 'Lee los inspiradores viajes de personas que encontraron el Islam, o comparte el tuyo.' },
  shareJourney: { en: 'Share Your Journey', ar: 'شارك رحلتك', fr: 'Partagez votre voyage', ur: 'اپنا سفر بانٹیں', es: 'Comparte tu viaje' },
  shareStory: { en: 'Share Your Story', ar: 'شارك قصتك', fr: 'Partagez votre histoire', ur: 'اپنی کہانی بانٹیں', es: 'Comparte tu historia' },
  shareStoryDesc: { en: 'Your story can be the light that guides someone else. You can choose to remain completely anonymous.', ar: 'قصتك يمكن أن تكون النور الذي يرشد شخصًا آخر. يمكنك اختيار البقاء مجهول الهوية.', fr: 'Votre histoire peut être la lumière qui guide quelqu\'un d\'autre. Vous pouvez rester anonyme.', ur: 'آپ کی کہانی وہ روشنی ہو سکتی ہے جو کسی اور کی رہنمائی کرے۔ آپ مکمل طور پر گمنام رہ سکتے ہیں۔', es: 'Tu historia puede ser la luz que guíe a alguien más. Puedes permanecer anónimo.' },
  nameAlias: { en: 'Name / Alias', ar: 'الاسم أو اللقب', fr: 'Nom / Pseudo', ur: 'نام / عرف', es: 'Nombre / Alias' },
  egAnonymous: { en: 'e.g. Anonymous', ar: 'مثال: مجهول', fr: 'ex. Anonyme', ur: 'مثال: گمنام', es: 'ej. Anónimo' },
  country: { en: 'Country', ar: 'البلد', fr: 'Pays', ur: 'ملک', es: 'País' },
  egCountry: { en: 'e.g. United States', ar: 'مثال: الولايات المتحدة', fr: 'ex. France', ur: 'مثال: پاکستان', es: 'ej. España' },
  yourJourney: { en: 'Your Journey', ar: 'رحلتك', fr: 'Votre parcours', ur: 'آپ کا سفر', es: 'Tu Viaje' },
  startWriting: { en: 'Start writing your story here...', ar: 'ابدأ في كتابة قصتك هنا...', fr: 'Commencez à écrire votre histoire ici...', ur: 'اپنی کہانی یہاں لکھنا شروع کریں...', es: 'Empieza a escribir tu historia aquí...' },
  minChars: { en: 'minimum characters', ar: 'الحد الأدنى من الأحرف', fr: 'caractères minimum', ur: 'کم از کم حروف', es: 'caracteres mínimos' },
  submitStory: { en: 'Submit for Review', ar: 'إرسال للمراجعة', fr: 'Soumettre pour examen', ur: 'جائزہ کے لیے جمع کرائیں', es: 'Enviar para revisión' },
  storyRequired: { en: 'Please write your story before submitting.', ar: 'يرجى كتابة قصتك قبل الإرسال.', fr: 'Veuillez écrire votre histoire avant de soumettre.', ur: 'جمع کرنے سے پہلے اپنی کہانی لکھیں۔', es: 'Por favor, escribe tu historia antes de enviar.' },
  storyTooShort: { en: 'Please write a bit more about your journey (at least 50 characters).', ar: 'يرجى كتابة المزيد عن رحلتك (50 حرفًا على الأقل).', fr: 'Veuillez écrire un peu plus sur votre parcours (au moins 50 caractères).', ur: 'اپنے سفر کے بارے میں کچھ اور لکھیں (کم از کم 50 حروف)۔', es: 'Por favor, escribe un poco más sobre tu viaje (al menos 50 caracteres).' },
  storySubmitted: { en: 'JazakAllahu Khairan! Your story has been submitted for review and will be published soon.', ar: 'جزاك الله خيرًا! تم إرسال قصتك للمراجعة وسيتم نشرها قريبًا.', fr: 'JazakAllahu Khairan! Votre histoire a été soumise et sera publiée bientôt.', ur: 'جزاک اللہ خیراً! آپ کی کہانی جائزے کے لیے جمع ہو گئی ہے اور جلد شائع ہوگی۔', es: 'JazakAllahu Khairan! Tu historia ha sido enviada y se publicará pronto.' },
  readMore: { en: 'Read full story →', ar: 'اقرأ القصة كاملة ←', fr: 'Lire l\'histoire complète →', ur: 'پوری کہانی پڑھیں ←', es: 'Leer historia completa →' },
  readLess: { en: 'Read less', ar: 'اقرأ أقل', fr: 'Lire moins', ur: 'کم پڑھیں', es: 'Leer menos' },
  share: { en: 'Share', ar: 'مشاركة', fr: 'Partager', ur: 'شیئر', es: 'Compartir' },
  copiedClipboard: { en: 'Story link copied to clipboard!', ar: 'تم نسخ رابط القصة!', fr: 'Lien de l\'histoire copié!', ur: 'کہانی کا لنک کاپی ہو گیا!', es: '¡Enlace de la historia copiado!' },

  // Donate Page
  donateDesc: { en: 'Support our global Dawah efforts. Your contribution helps us translate resources, host scholars, and maintain the platform.', ar: 'ادعم جهود الدعوة العالمية. تساعدنا مساهمتك في ترجمة الموارد واستضافة العلماء وصيانة المنصة.', fr: 'Soutenez nos efforts de Dawah. Votre contribution nous aide à traduire des ressources et entretenir la plateforme.', ur: 'ہماری عالمی دعوتی کوششوں کی حمایت کریں۔ آپ کا تعاون ہمیں وسائل کا ترجمہ کرنے اور پلیٹ فارم کو برقرار رکھنے میں مدد کرتا ہے۔', es: 'Apoya nuestros esfuerzos de Dawah. Tu contribución nos ayuda a traducir recursos y mantener la plataforma.' },
  selectAmount: { en: 'Select Amount', ar: 'تحديد المبلغ', fr: 'Sélectionner le montant', ur: 'رقم منتخب کریں', es: 'Seleccionar monto' },
  customAmount: { en: 'Custom Amount', ar: 'مبلغ مخصص', fr: 'Montant personnalisé', ur: 'اپنی مرضی کی رقم', es: 'Monto personalizado' },
  enterAmount: { en: 'Enter amount', ar: 'أدخل المبلغ', fr: 'Entrer le montant', ur: 'رقم درج کریں', es: 'Introduce el importe' },
  oneTime: { en: 'One-time', ar: 'مرة واحدة', fr: 'Une fois', ur: 'ایک بار', es: 'Una sola vez' },
  monthly: { en: 'Monthly', ar: 'شهريا', fr: 'Mensuel', ur: 'ماہانہ', es: 'Mensualmente' },
  continuePayment: { en: 'Continue to Payment', ar: 'المتابعة إلى الدفع', fr: 'Continuer vers le paiement', ur: 'ادائیگی کے لیے آگے بڑھیں', es: 'Continuar al pago' },
  securePayment: { en: 'Secure SSL Encrypted Payment', ar: 'دفع مشفر آمن عبر SSL', fr: 'Paiement sécurisé par cryptage SSL', ur: 'محفوظ ایس ایس ایل انکرپٹڈ ادائیگی', es: 'Pago Seguro con Cifrado SSL' },
  processing: { en: 'Processing...', ar: 'جاري المعالجة...', fr: 'Traitement en cours...', ur: 'پروسیسنگ ہو رہی ہے...', es: 'Procesando...' },
  invalidAmount: { en: 'Please enter a valid donation amount.', ar: 'يرجى إدخال مبلغ تبرع صالح.', fr: 'Veuillez entrer un montant de don valide.', ur: 'نیک نیتی سے براہ کرم صحیح رقم درج کریں۔', es: 'Por favor, ingresa un monto de donación válido.' },
  yourImpact: { en: 'Your Impact', ar: 'تأثيرك', fr: 'Votre impact', ur: 'آپ کا اثر', es: 'Tu Impacto' },
  impactTranslate: { en: 'Translates 1 article into a new language', ar: 'ترجمة مقال واحد إلى لغة جديدة', fr: 'Traduit 1 article dans une nouvelle langue', ur: 'ایک مضمون کو نئی زبان میں ترجمہ کرتا ہے', es: 'Traduce 1 artículo a un nuevo idioma' },
  impactNewMuslim: { en: 'Provides a new Muslim welcome pack', ar: 'توفير حزمة ترحيب لمسلم جديد', fr: 'Fournit un kit de bienvenue pour un nouveau musulman', ur: 'ایک نئے مسلمان کو خوش آمدید پیکج فراہم کرتا ہے', es: 'Proporciona un paquete de bienvenida para un nuevo musulmán' },
  impactScholar: { en: 'Funds 1 hour of scholar Q&A time', ar: 'تمويل ساعة واحدة من وقت عالم للأسئلة والأجوبة', fr: 'Finance 1 heure de Q&R avec un érudit', ur: 'ایک گھنٹے کے عالم سوال و جواب سیشن کی مالی معاونت', es: 'Financia 1 hora de Q&A con un erudito' },
  impactPlatform: { en: 'Supports platform hosting for 1 month', ar: 'دعم استضافة المنصة لمدة شهر واحد', fr: 'Soutient l\'hébergement de la plateforme pendant 1 mois', ur: 'ایک ماہ کے لیے پلیٹ فارم ہوسٹنگ کی حمایت', es: 'Soporta el hosting de la plataforma por 1 mes' },

  // 404 Page
  notFoundTitle: { en: 'Page Not Found', ar: 'الصفحة غير موجودة', fr: 'Page non trouvée', ur: 'صفحہ نہیں ملا', es: 'Página no encontrada' },
  notFoundDesc: { en: 'The page you are looking for does not exist. Perhaps the path has changed, or the link was incorrect.', ar: 'الصفحة التي تبحث عنها غير موجودة. ربما تغير المسار أو كان الرابط غير صحيح.', fr: 'La page que vous recherchez n\'existe pas.', ur: 'جو صفحہ آپ تلاش کر رہے ہیں وہ موجود نہیں ہے۔', es: 'La página que buscas no existe.' },
  backHome: { en: 'Back to Home', ar: 'العودة للرئيسية', fr: 'Retour à l\'accueil', ur: 'ہوم پر واپس جائیں', es: 'Volver al inicio' },

  // Footer
  footerAbout: { en: 'A global dawah platform dedicated to spreading the message of Islam with wisdom, compassion, and clarity.', ar: 'منصة دعوة عالمية مكرسة لنشر رسالة الإسلام بالحكمة والرحمة والوضوح.', fr: 'Une plateforme mondiale de dawah dédiée à diffuser le message de l\'Islam avec sagesse.', ur: 'ایک عالمی دعوتی پلیٹ فارم جو حکمت، رحمت اور وضاحت کے ساتھ اسلام کا پیغام پھیلانے کے لیے وقف ہے۔', es: 'Una plataforma global de dawah dedicada a difundir el mensaje del Islam con sabiduría.' },
  footerGlobal: { en: 'Available in 5 languages', ar: 'متوفر بـ 5 لغات', fr: 'Disponible en 5 langues', ur: '5 زبانوں میں دستیاب', es: 'Disponible en 5 idiomas' },
  footerQuickLinks: { en: 'Quick Links', ar: 'روابط سريعة', fr: 'Liens rapides', ur: 'فوری روابط', es: 'Enlaces rápidos' },
  footerResources: { en: 'Resources', ar: 'موارد', fr: 'Ressources', ur: 'وسائل', es: 'Recursos' },
  footerQuran: { en: 'Read the Quran', ar: 'اقرأ القرآن', fr: 'Lire le Coran', ur: 'قرآن پڑھیں', es: 'Lee el Corán' },
  footerHadith: { en: 'Hadith Collections', ar: 'مجموعات الحديث', fr: 'Collections de Hadiths', ur: 'حدیث کے مجموعے', es: 'Colecciones de Hadiz' },
  footerPrayerTimes: { en: 'Prayer Times', ar: 'أوقات الصلاة', fr: 'Heures de prière', ur: 'نماز کے اوقات', es: 'Horarios de oración' },
  footerContact: { en: 'Contact', ar: 'اتصل بنا', fr: 'Contact', ur: 'رابطہ', es: 'Contacto' },
  footerReach: { en: 'For collaborations, content contributions, or questions about the platform.', ar: 'للتعاون أو المساهمات في المحتوى أو الأسئلة حول المنصة.', fr: 'Pour les collaborations, contributions de contenu ou questions.', ur: 'تعاون، مواد کی شراکت، یا پلیٹ فارم کے بارے میں سوالات کے لیے۔', es: 'Para colaboraciones, contribuciones de contenido o preguntas.' },
  footerRights: { en: 'All rights reserved.', ar: 'جميع الحقوق محفوظة.', fr: 'Tous droits réservés.', ur: 'جملہ حقوق محفوظ ہیں۔', es: 'Todos los derechos reservados.' },
  footerMadeWith: { en: 'Made with', ar: 'صنع بـ', fr: 'Fait avec', ur: 'بنایا گیا', es: 'Hecho con' },
  footerForUmmah: { en: 'for the Ummah', ar: 'للأمة', fr: 'pour la Oumma', ur: 'امت کے لیے', es: 'para la Ummah' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, defaultText?: string) => string;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const dir = language === 'ar' || language === 'ur' ? 'rtl' : 'ltr';

  const t = (key: string, defaultText?: string) => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    return defaultText || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      <div dir={dir} className={dir === 'rtl' ? 'font-arabic' : 'font-sans'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
