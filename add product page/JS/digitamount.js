const textarea = document.getElementById('description');
        const characterCount = document.getElementById('characterCount');

        const maxCharacters = 255;
            
        textarea.addEventListener('input', function() {
        const currentCharacters = textarea.value.length;
        characterCount.textContent = currentCharacters + '/255';

        // Проверяем, не превышено ли максимальное количество символов
        if (currentCharacters > maxCharacters) {
                characterCount.style.color = 'red'; // Изменяем цвет текста, чтобы указать превышение лимита
            textarea.value = textarea.value.slice(0, maxCharacters);
         } else {
                characterCount.style.color = 'black'; // Возвращаем цвет текста к стандартному
        }
        });
