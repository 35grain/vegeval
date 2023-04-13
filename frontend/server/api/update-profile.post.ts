import { getToken } from '#auth';
const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
    const token: any = await getToken({ event });
    if (token && token.access_token) {
        let body = await readBody(event);
        body.id = token.id;
        return requestUpdate(token.access_token, body);
    }
    throw createError({ statusMessage: 'Unauthenticated', statusCode: 403 })
});

const requestUpdate = async (access_token: string, user: any) => {
    try {
        const response: any = await $fetch(`${config.public.apiUrl}/users/update`,
        {
            headers: {
                'Authorization': `Bearer ${access_token}`
            },
            method: "POST",
            body: user,
        });
        return { statusMessage: 'Settings updated!', data: response.body };
    } catch (error: any) {
        if (error.response._data.statusCode === 400) {
            throw createError({ statusMessage: error.response._data.message.join(', '), statusCode: 400 });
        }
    }
    throw createError({ statusMessage: 'Unable to update settings. Please try again later!', statusCode: 500 });
}