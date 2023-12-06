function updateCharity() {
    // Получаем значение введенной цены
    const price = document.getElementById("value").value;

    // Получаем выбранный процент благотворительности
    const selectedPercentage = document.getElementById("charityPercentage").value;

    // Проверяем, является ли введенное значение допустимым числом
    if (!isNaN(price) && price !== "" && !isNaN(selectedPercentage) && selectedPercentage !== "") {
        // Вычисляем сумму для благотворительности
        const charityAmount = (parseFloat(price) * (parseFloat(selectedPercentage) / 100)).toFixed(0);

        // Обновляем поле "charity" вычисленным значением
        document.getElementById("price_zsu").value = charityAmount;
    } else {
        // Если введенные значения не являются допустимыми числами, очищаем поле "charity"
        document.getElementById("price_zsu").value = "";
    }
}


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("value").addEventListener("input", updateCharity);
    document.getElementById("charityPercentage").addEventListener("change", updateCharity);

    document.getElementById("price_zsu").addEventListener("input", function () {
        const enteredCharity = parseFloat(this.value);
        const minCharity = parseFloat(document.getElementById("value").value) * (parseFloat(document.getElementById("charityPercentage").value) / 100);

        // Проверяем, является ли введенное значение числом и не меньше указанного процента от цены
        if (isNaN(enteredCharity) || enteredCharity < minCharity) {
            // Устанавливаем минимальное значение в указанном проценте от цены
            this.value = minCharity.toFixed(0);
        }
    });

})

