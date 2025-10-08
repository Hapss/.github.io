// Объект с переводами для всех текстовых элементов
const translations = {
    ru: {
        siteTitle: "Houkai Gakuen 2",
        storyTypeLabel: "Тип сюжета",
        storyLabel: "Сюжет",
        stageLabel: "Этап",
        contentText: "Выберите параметры выше, чтобы отобразить контент."
    },
    en: {
        siteTitle: "Houkai Gakuen 2",
        storyTypeLabel: "Story Type",
        storyLabel: "Story",
        stageLabel: "Stage",
        contentText: "Select options above to display content."
    },
    cn: {
        siteTitle: "崩坏学园2",
        storyTypeLabel: "故事类型",
        storyLabel: "故事",
        stageLabel: "阶段",
        contentText: "选择以上选项以显示内容."
    }
};

// Данные о сюжетах по типам
const storyData = {
    main: [
        { id: "chapter1", ru: "Глава 1: Выброс Хоукая", en: "Chapter 1: Houkai Eruption", cn: "第1章：崩坏爆发" },
        { id: "chapter2", ru: "Глава 2: Киана наносит ответный удар", en: "Chapter 2: Kiana Strikes Back", cn: "第2章：琪亚娜反击" },
        { id: "chapter3", ru: "Глава 3: Зловещая молния", en: "Chapter 3: Ominous Lightning", cn: "第3章：不祥闪电" },
    ],
    extra: [
        { id: "extra1", ru: "Экстра 1: Берегись", en: "Extra 1: Beware", cn: "额外1：当心" },
        { id: "extra2", ru: "Экстра 2: Неутолимое желание", en: "Extra 2: Insatiable Desire", cn: "额外2：无法满足的欲望" },
        { id: "extra3", ru: "Экстра 3: Обида", en: "Extra 3: Resentment", cn: "额外3：怨恨" },
    ],
    bosses: [
        { id: "boss1", ru: "Босс 1:", en: "Boss 1", cn: "首领1" },
        { id: "boss2", ru: "Босс 2", en: "Boss 2", cn: "首领2" },
        { id: "boss3", ru: "Босс 3", en: "Boss 3", cn: "首领3" }
    ],
    visual_novel: [
        { id: "vn1", ru: "ВН1", en: "VN1", cn: "新手" },
        { id: "vn2", ru: "ВН2", en: "VN2", cn: "进阶" },
        { id: "vn3", ru: "ВН3", en: "VN3", cn: "专家" }
    ],
    novel: [
        { id: "novel1", ru: "Том 1", en: "Volume 1", cn: "第1卷" },
        { id: "novel2", ru: "Том 2", en: "Volume 2", cn: "第2卷" },
        { id: "novel3", ru: "Том 3", en: "Volume 3", cn: "第3卷" }
    ]
};

// Данные о этапах для каждого сюжета
const stageData = {
    chapter1: [
        { id: "stage1-1", ru: "Этап 1-1", en: "Stage 1-1", cn: "阶段1-1" },
        { id: "stage1-2", ru: "Этап 1-2", en: "Stage 1-2", cn: "阶段1-2" },
        { id: "stage1-3", ru: "Этап 1-3", en: "Stage 1-3", cn: "阶段1-3" }
    ],
    chapter2: [
        { id: "stage2-1", ru: "Этап 2-1", en: "Stage 2-1", cn: "阶段2-1" },
        { id: "stage2-2", ru: "Этап 2-2", en: "Stage 2-2", cn: "阶段2-2" },
        { id: "stage2-3", ru: "Этап 2-3", en: "Stage 2-3", cn: "阶段2-3" }
    ],
    // Данные для других сюжетов по аналогии
    extra1: [
        { id: "extra1-1", ru: "Этап 1", en: "Stage 1", cn: "阶段1" },
        { id: "extra1-2", ru: "Этап 2", en: "Stage 2", cn: "阶段2" }
    ]
};

// Функция для изменения языка
function changeLanguage(lang) {
    // Обновляем тексты элементов
    document.getElementById('siteTitle').textContent = translations[lang].siteTitle;
    document.getElementById('storyTypeLabel').textContent = translations[lang].storyTypeLabel;
    document.getElementById('storyLabel').textContent = translations[lang].storyLabel;
    document.getElementById('stageLabel').textContent = translations[lang].stageLabel;
    document.getElementById('contentText').textContent = translations[lang].contentText;

    // Обновляем опции в выпадающих списках
    updateSelectOptions('storyType', lang);
    updateStoryOptions(); // Обновляем список сюжетов с новым языком
}

// Функция для обновления текста опций в выпадающих списках
function updateSelectOptions(selectId, lang) {
    const select = document.getElementById(selectId);
    const options = select.options;
    
    for (let i = 0; i < options.length; i++) {
        const option = options[i];
        const translation = option.getAttribute(`data-${lang}`);
        if (translation) {
            option.textContent = translation;
        }
    }
}

// Функция для обновления списка сюжетов в зависимости от выбранного типа
function updateStoryOptions() {
    const storyType = document.getElementById('storyType').value;
    const lang = document.getElementById('languageSelect').value;
    const storySelect = document.getElementById('storySelection');
    
    // Очищаем текущие опции
    storySelect.innerHTML = '';
    
    // Получаем сюжеты для выбранного типа
    const stories = storyData[storyType] || [];
    
    // Добавляем новые опции
    stories.forEach(story => {
        const option = document.createElement('option');
        option.value = story.id;
        option.textContent = story[lang] || story.ru;
        storySelect.appendChild(option);
    });
    
    // Обновляем список этапов для первого сюжета
    if (stories.length > 0) {
        updateStageOptions(stories[0].id);
    }
}

// Функция для обновления списка этапов в зависимости от выбранного сюжета
function updateStageOptions(storyId) {
    const lang = document.getElementById('languageSelect').value;
    const stageSelect = document.getElementById('stageSelection');
    
    // Очищаем текущие опции
    stageSelect.innerHTML = '';
    
    // Получаем этапы для выбранного сюжета
    const stages = stageData[storyId] || [];
    
    // Если нет этапов для этого сюжета, добавляем заглушку
    if (stages.length === 0) {
        const placeholderOption = document.createElement('option');
        placeholderOption.value = '';
        placeholderOption.textContent = lang === 'ru' ? 'Этапы не найдены' : 
                                      lang === 'en' ? 'Stages not found' : '未找到阶段';
        stageSelect.appendChild(placeholderOption);
        return;
    }
    
    // Добавляем новые опции
    stages.forEach(stage => {
        const option = document.createElement('option');
        option.value = stage.id;
        option.textContent = stage[lang] || stage.ru;
        stageSelect.appendChild(option);
    });
}

// Обработчик события для изменения языка
document.getElementById('languageSelect').addEventListener('change', function() {
    const selectedLang = this.value;
    changeLanguage(selectedLang);
    
    // Сохраняем выбор языка в localStorage
    localStorage.setItem('selectedLanguage', selectedLang);
});

// Обработчик события для изменения типа сюжета
document.getElementById('storyType').addEventListener('change', function() {
    updateStoryOptions();
    updateContent();
});

// Обработчик события для изменения сюжета
document.getElementById('storySelection').addEventListener('change', function() {
    const selectedStory = this.value;
    updateStageOptions(selectedStory);
    updateContent();
});

// Обработчик события для изменения этапа
document.getElementById('stageSelection').addEventListener('change', updateContent);

// Инициализация языка и данных при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, есть ли сохраненный язык в localStorage
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'ru';
    
    // Устанавливаем выбранный язык в селекторе
    document.getElementById('languageSelect').value = savedLanguage;
    
    // Применяем язык
    changeLanguage(savedLanguage);
    
    // Инициализируем список сюжетов
    updateStoryOptions();
});

// Функция для обновления отображаемого контента
function updateContent() {
    const storyType = document.getElementById('storyType');
    const story = document.getElementById('storySelection');
    const stage = document.getElementById('stageSelection');
    const lang = document.getElementById('languageSelect').value;
    
    // Получаем тексты выбранных опций
    const storyTypeText = storyType.options[storyType.selectedIndex].text;
    const storyText = story.options[story.selectedIndex].text;
    const stageText = stage.options[stage.selectedIndex].text;
    
    // Формируем контент на выбранном языке
    const contentMap = {
        ru: `Выбран тип сюжета: ${storyTypeText}\nСюжет: ${storyText}\nЭтап: ${stageText}`,
        en: `Selected story type: ${storyTypeText}\nStory: ${storyText}\nStage: ${stageText}`,
        cn: `选择的故事类型: ${storyTypeText}\n故事: ${storyText}\n阶段: ${stageText}`
    };
    
    document.getElementById('contentText').textContent = contentMap[lang];
}
