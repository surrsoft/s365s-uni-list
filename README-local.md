- `!!s365s!!`

- счётчик `Un_n`: 12

# install

```
- npm install json-server
- npm install @tanstack/react-query
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