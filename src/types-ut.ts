/* Универсальные типы, см. !s378s! */

/** !ut-nil-num! целое число, 0+ */
export type UtNilNum = number;

/** !ut-num! целое число, 1+ */
export type UtNum = number;

/** !ut-id! строка удовлетворяющая всем следующим условиям: 1) длина 1+ 2) не состоит из одних пробелов */
export type UtId = string;

/** !ut-withid! - тип с идентификатором */
export type UtWithid = {
    id: UtId;
}
