function updateCharity() {
    // Получаем значение введенной цены
    const price = document.getElementById("value").value;

    // Проверяем, является ли введенное значение допустимым числом
    if (!isNaN(price) && price !== "") {
        // Вычисляем 15% от цены
        const charityAmount = (parseFloat(price) * 0.15).toFixed(0);

        // Обновляем поле "charity" вычисленным значением
        document.getElementById("charity").value = charityAmount;
    } else {
        // Если введенное значение не является допустимым числом, очищаем поле "charity"
        document.getElementById("charity").value = "";
    }
}
document.getElementById("value").addEventListener("input", updateCharity);

document.getElementById("charity").addEventListener("input", function() {
    const enteredCharity = parseFloat(this.value);
    const minCharity = parseFloat(document.getElementById("value").value) * 0.15;

    // Проверяем, является ли введенное значение числом и не меньше 15% от цены
    if (isNaN(enteredCharity) || enteredCharity < minCharity) {
        // Устанавливаем минимальное значение в 15% от цены
        this.value = minCharity.toFixed(0);
    }
});