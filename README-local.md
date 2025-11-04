- `!!s365s!!`

- счётчик `Dp_p`: 4

# install

```
- npm install json-server
```

# генерация файла db.json

```ts
// схема
interface DataItem {
    id: string; // идентификатор
    title?: string; // заголовок
    desc?: string; // описание
    tags?: string[]; // теги
    categoryes?: string[]; // категории
}

```