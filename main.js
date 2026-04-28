/** Допустимые значения редкости предмета. */
const RARITIES = ["common", "uncommon", "rare", "legendary"];
// ------------------------------------------
//  Шаг 1–2: Классы Item и Weapon
// ------------------------------------------

/**
 * Предмет инвентаря.
 */
class Item {
  /**
   * @param {string} name - Название предмета.
   * @param {number} weight - Вес (положительное число).
   * @param {string} rarity - Редкость: common | uncommon | rare | legendary.
   */

  constructor(name, weight, rarity) {
    if (weight <= 0)                return console.log("Ошибка: вес должен быть > 0");
    if (!RARITIES.includes(rarity)) return console.log("Ошибка: недопустимая редкость");

    this.name   = name;
    this.weight = weight;
    this.rarity = rarity;
  }

  /**
   * Возвращает строку с информацией о предмете.
   * @returns {string}
   */

  getInfo() {
    return `Name: ${this.name}, Weight: ${this.weight}, Rarity: ${this.rarity}`;
  }

  /**
   * Изменяет вес предмета.
   * @param {number} newWeight - Новый вес (положительное число).
   */

  setWeight(newWeight) {
    if (newWeight <= 0) return console.log("Ошибка: вес должен быть > 0");
    this.weight = newWeight;
  }
}

/**
 * Оружие — расширяет Item.
 */
class Weapon extends Item {
  /**
   * @param {string} name - Название оружия.
   * @param {number} weight - Вес (положительное число).
   * @param {string} rarity - Редкость.
   * @param {number} damage - Урон (положительное число).
   * @param {number} durability - Прочность от 0 до 100.
   */

  constructor(name, weight, rarity, damage, durability) {
    super(name, weight, rarity);
    if (damage <= 0)                        return console.log("Ошибка: урон должен быть > 0");
    if (durability < 0 || durability > 100) return console.log("Ошибка: прочность от 0 до 100");

    this.damage     = damage;
    this.durability = durability;
  }

  /**
   * Уменьшает прочность на 10. Не опускается ниже 0.
   */
  use() {
    this.durability = Math.max(0, this.durability - 10);
  }

  /**
   * Восстанавливает прочность до 100.
   */
  repair() {
    this.durability = 100;
  }
}


// ------------------------------------------
//  Шаг 3: Тестирование классов
// ------------------------------------------

const sword = new Item("Steel Sword", 3.5, "rare");
console.log(sword.getInfo());     // Name: Steel Sword, Weight: 3.5, Rarity: rare
sword.setWeight(4.0);
console.log(sword.getInfo());     // Name: Steel Sword, Weight: 4, Rarity: rare

const bow = new Weapon("Longbow", 2.0, "uncommon", 15, 100);
console.log(bow.getInfo());       // Name: Longbow, Weight: 2, Rarity: uncommon
bow.use();
console.log(bow.durability);      // 90
bow.repair();
console.log(bow.durability);      // 100

const potion = new Item("Health Potion", 0.5, "common");
console.log(potion.getInfo());    // Name: Health Potion, Weight: 0.5, Rarity: common

const axe = new Weapon("Battle Axe", 5.0, "legendary", 40, 100);
console.log(axe.getInfo());       // Name: Battle Axe, Weight: 5, Rarity: legendary
axe.use();
axe.use();
console.log(axe.durability);      // 80


// ------------------------------------------
//  Шаг 4а: Опциональная цепочка (?.)
// ------------------------------------------

// ?. не вызывает ошибку, если объект равен null или undefined
const nullItem = null;
console.log(nullItem?.getInfo()); // undefined — без ошибки
console.log(sword?.getInfo());    // Name: Steel Sword, Weight: 4, Rarity: rare


// ------------------------------------------
//  Шаг 4б: Функции-конструкторы
// ------------------------------------------

/**
 * Функция-конструктор предмета инвентаря.
 * @param {string} name - Название предмета.
 * @param {number} weight - Вес (положительное число).
 * @param {string} rarity - Редкость: common | uncommon | rare | legendary.
 */

function ItemConstructor(name, weight, rarity) {
  if (weight <= 0)                return console.log("Ошибка: вес должен быть > 0");
  if (!RARITIES.includes(rarity)) return console.log("Ошибка: недопустимая редкость");

  this.name   = name;
  this.weight = weight;
  this.rarity = rarity;
}

/**
 * Возвращает строку с информацией о предмете.
 * @returns {string}
 */
ItemConstructor.prototype.getInfo = function () {
  return `Name: ${this.name}, Weight: ${this.weight}, Rarity: ${this.rarity}`;
};

/**
 * Изменяет вес предмета.
 * @param {number} newWeight - Новый вес (положительное число).
 */

ItemConstructor.prototype.setWeight = function (newWeight) {
  if (newWeight <= 0) return console.log("Ошибка: вес должен быть > 0");
  this.weight = newWeight;
};

/**
 * Функция-конструктор оружия. Наследует ItemConstructor.
 * @param {string} name - Название оружия.
 * @param {number} weight - Вес (положительное число).
 * @param {string} rarity - Редкость.
 * @param {number} damage - Урон (положительное число).
 * @param {number} durability - Прочность от 0 до 100.
 */

function WeaponConstructor(name, weight, rarity, damage, durability) {
  ItemConstructor.call(this, name, weight, rarity); // наследуем поля Item
  if (damage <= 0)                        return console.log("Ошибка: урон должен быть > 0");
  if (durability < 0 || durability > 100) return console.log("Ошибка: прочность от 0 до 100");

  this.damage     = damage;
  this.durability = durability;
}

// Настраиваем цепочку прототипов
WeaponConstructor.prototype = Object.create(ItemConstructor.prototype);
WeaponConstructor.prototype.constructor = WeaponConstructor;

/**
 * Уменьшает прочность на 10. Не опускается ниже 0.
 */
WeaponConstructor.prototype.use = function () {
  this.durability = Math.max(0, this.durability - 10);
};

/**
 * Восстанавливает прочность до 100.
 */
WeaponConstructor.prototype.repair = function () {
  this.durability = 100;
};

// --- Тест функций-конструкторов ---

const shield = new ItemConstructor("Wooden Shield", 3.0, "common");
console.log(shield.getInfo());    // Name: Wooden Shield, Weight: 3, Rarity: common
shield.setWeight(3.5);
console.log(shield.getInfo());    // Name: Wooden Shield, Weight: 3.5, Rarity: common

const dagger = new WeaponConstructor("Dagger", 1.0, "uncommon", 10, 100);
console.log(dagger.getInfo());    // Name: Dagger, Weight: 1, Rarity: uncommon
dagger.use();
console.log(dagger.durability);   // 90
dagger.repair();
console.log(dagger.durability);   // 100