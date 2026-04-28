# Inventory System

Лабораторная работа №4 по классам и объектам в JavaScript.

---

## Запуск проекта

### Что нужно

- [Node.js](https://nodejs.org/) (версия 14 и выше)

### Шаги

```bash
# 1. Клонировать репозиторий
git clone https://github.com/your-username/inventory-system.git

# 2. Перейти в папку проекта
cd inventory-system

# 3. Запустить скрипт
node inventory.js
```

> Никакие зависимости устанавливать не нужно — проект работает на чистом JavaScript.

---

## Описание лабораторной работы

Цель работы — познакомиться с классами и объектами в JavaScript: создать классы, использовать конструкторы и методы, реализовать наследование, а также переписать классы через функции-конструкторы.

В проекте реализована система инвентаря с двумя сущностями:

| Класс | Описание |
|---|---|
| `Item` | Базовый предмет инвентаря |
| `Weapon` | Оружие, наследует `Item` |

---

## Документация классов

### `Item`

| Поле / Метод | Описание |
|---|---|
| `name` | Название предмета |
| `weight` | Вес (положительное число) |
| `rarity` | Редкость: `common`, `uncommon`, `rare`, `legendary` |
| `getInfo()` | Возвращает строку с информацией о предмете |
| `setWeight(newWeight)` | Изменяет вес предмета |

### `Weapon` (наследует `Item`)

| Поле / Метод | Описание |
|---|---|
| `damage` | Урон (положительное число) |
| `durability` | Прочность от 0 до 100 |
| `use()` | Уменьшает прочность на 10 |
| `repair()` | Восстанавливает прочность до 100 |

---

## Примеры использования

### Создание предмета

```js
const sword = new Item("Steel Sword", 3.5, "rare");
console.log(sword.getInfo());
// → Name: Steel Sword, Weight: 3.5, Rarity: rare

sword.setWeight(4.0);
console.log(sword.getInfo());
// → Name: Steel Sword, Weight: 4, Rarity: rare
```

### Создание оружия и его использование

```js
const bow = new Weapon("Longbow", 2.0, "uncommon", 15, 100);
console.log(bow.getInfo());
// → Name: Longbow, Weight: 2, Rarity: uncommon

bow.use();
console.log(bow.durability); // → 90

bow.repair();
console.log(bow.durability); // → 100
```

### Опциональная цепочка `?.`

```js
const nullItem = null;
console.log(nullItem?.getInfo()); // → undefined, без ошибки
console.log(sword?.getInfo());    // → Name: Steel Sword, Weight: 4, Rarity: rare
```

### Функции-конструкторы (альтернатива классам)

```js
const shield = new ItemConstructor("Wooden Shield", 3.0, "common");
console.log(shield.getInfo());
// → Name: Wooden Shield, Weight: 3, Rarity: common

const dagger = new WeaponConstructor("Dagger", 1.0, "uncommon", 10, 100);
dagger.use();
console.log(dagger.durability); // → 90
```

---

## Ответы на контрольные вопросы

**1. Какое значение имеет `this` в методах класса?**

`this` указывает на конкретный экземпляр класса, из которого вызван метод. То есть у каждого объекта своё `this` — свои поля и значения.

```js
const sword = new Item("Steel Sword", 3.5, "rare");
sword.getInfo(); // this здесь — это sword
```

**2. Как работает модификатор доступа `#` в JavaScript?**

`#` делает поле или метод приватным — к нему нельзя обратиться снаружи класса, только внутри него. Это защищает данные от случайного изменения.

```js
class Item {
  #weight; // приватное поле

  constructor(weight) { this.#weight = weight; }
  getWeight()         { return this.#weight; }
}

const item = new Item(3.5);
item.getWeight(); // → 3.5
item.#weight;     // → Ошибка! Поле приватное
```

**3. В чём разница между классами и функциями-конструкторами?**

| | Класс | Функция-конструктор |
|---|---|---|
| Синтаксис | Современный, читаемый | Старый, более многословный |
| Наследование | `extends` + `super` | `Object.create()` + `.call()` |
| Методы | Внутри тела класса | Через `.prototype` |
| Результат | Одинаковый — оба создают объекты с прототипом |

Классы — это «синтаксический сахар» над функциями-конструкторами. Под капотом они работают одинаково.

---

## Структура проекта

```
inventory-system/
└── inventory.js   # Все классы, конструкторы и тесты
```

---

## Список использованных источников

- [MDN Web Docs — Classes](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Classes)
- [MDN Web Docs — this](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/this)
- [MDN Web Docs — Inheritance and prototype chain](https://developer.mozilla.org/ru/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
- [Node.js официальный сайт](https://nodejs.org/)
