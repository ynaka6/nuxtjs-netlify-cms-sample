export interface Category {
    label: String;
    value: String;
    slug: String;
}

export interface Hashtag {
    label: String;
    value: String;
    slug: String;
}

export interface Product {
    label: String;
    value: String;
    price: Number;
    slug: String;
}

export interface Author {
    username: String;
    title: String;
    profilePicture: String;
    body: String;
    categories: Hashtag[];
    slug: String;
}

export interface Blog {
    title: String;
    date: String;
    slug: String;
    description: String;
    body: String;
    hashtags: Hashtag[];
    author: Author;
}

export interface Plan {
    title: String;
    status: String;
    slug: String;
    description: String;
    body: String;
    product: Product;
    hashtags: Hashtag[];
    author: Author;
}
