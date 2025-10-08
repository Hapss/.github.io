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
    updateSelectOptions('storySelection', lang);
    updateSelectOptions('stageSelection', lang);
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

// Обработчик события для изменения языка
document.getElementById('languageSelect').addEventListener('change', function() {
    const selectedLang = this.value;
    changeLanguage(selectedLang);
    
    // Сохраняем выбор языка в localStorage
    localStorage.setItem('selectedLanguage', selectedLang);
});

// Инициализация языка при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, есть ли сохранённый язык в localStorage
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'ru';
    
    // Устанавливаем выбранный язык в селекторе
    document.getElementById('languageSelect').value = savedLanguage;
    
    // Применяем язык
    changeLanguage(savedLanguage);
});

// Обработчики для изменения выбора сюжета/этапа
document.getElementById('storyType').addEventListener('change', updateContent);
document.getElementById('storySelection').addEventListener('change', updateContent);
document.getElementById('stageSelection').addEventListener('change', updateContent);

function updateContent() {
    const storyType = document.getElementById('storyType').value;
    const story = document.getElementById('storySelection').value;
    const stage = document.getElementById('stageSelection').value;
    const lang = document.getElementById('languageSelect').value;
    
    // В реальном приложении здесь будет загрузка контента
    // Для демонстрации просто показываем выбранные значения
    const contentMap = {
        ru: `Выбран тип сюжета: ${document.getElementById('storyType').options[document.getElementById('storyType').selectedIndex].text}, 
              Сюжет: ${document.getElementById('storySelection').options[document.getElementById('storySelection').selectedIndex].text}, 
              Этап: ${document.getElementById('stageSelection').options[document.getElementById('stageSelection').selectedIndex].text}`,
        en: `Selected story type: ${document.getElementById('storyType').options[document.getElementById('storyType').selectedIndex].text}, 
              Story: ${document.getElementById('storySelection').options[document.getElementById('storySelection').selectedIndex].text}, 
              Stage: ${document.getElementById('stageSelection').options[document.getElementById('stageSelection').selectedIndex].text}`,
        cn: `选择的故事类型: ${document.getElementById('storyType').options[document.getElementById('storyType').selectedIndex].text}, 
              故事: ${document.getElementById('storySelection').options[document.getElementById('storySelection').selectedIndex].text}, 
              阶段: ${document.getElementById('stageSelection').options[document.getElementById('stageSelection').selectedIndex].text}`
    };
    
    document.getElementById('contentText').textContent = contentMap[lang];
}
