export class filterValueConverter {
    toView(items, property, search) {
        if (!property) {
            return items;
        }

        return items.filter((item) => item[property] == search);
    }
}