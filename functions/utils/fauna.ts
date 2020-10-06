import fetch from 'node-fetch';

export interface Context {
    query: string;
    variables: {
        [k: string]: string | null;
    };
}

const faunaFetch = async (context: Context) => {
    return await fetch('https://graphql.fauna.com/graphql', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.FAUNA_SERVER_KEY}`,
            },
            body: JSON.stringify(context),
        })
        .then((res) => res.json())
        .catch((err) => console.error(JSON.stringify(err, null, 2)))
    ;
};

export default faunaFetch