export interface Category {
    label: string;
    value: string;
    slug: string;
}

export interface Hashtag {
    label: string;
    value: string;
    slug: string;
}

export interface Author {
    username: string;
    title: string;
    profilePicture: string;
    body: string;
    categories: Hashtag[];
}

export interface Blog {
    title: string;
    date: string;
    slug: string;
    description: string;
    body: string;
    hashtags: Hashtag[];
    author: Author;
}

export interface Plan {
    title: string;
    status: string;
    slug: string;
    description: string;
    body: string;
    hashtags: Hashtag[];
    author: Author;
}
