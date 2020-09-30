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
    uuid: String;
    title: String;
    status: String;
    slug: String;
    description: String;
    body: String;
    price: Number;
    interval: String;
    hashtags: Hashtag[];
    author: Author;
}

export interface Breadcrumb {
    to?: String;
    name?: String;
    icon?: String[];
    color: String;
}
