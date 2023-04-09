import { getToken } from '#auth';
const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
    const token = await getToken({ event });
    if (token && token.access_token) {
        const body = await readBody(event);
        if (checkPassword(body.password, body.passwordConfirm)) {
            return requestUpdate(token.access_token, body);
        }
        throw createError({ statusMessage: 'Passwords do not match!', statusCode: 400 });
    }
    throw createError({ statusMessage: 'Unauthenticated', statusCode: 403 })
})

const checkPassword = (password: string, passwordConfirm: string) => {
    if (password !== passwordConfirm) {
        return false;
    }
    return true;
}

const requestUpdate = async (access_token: string, user: any) => {
    try {
        const response: any = await $fetch(`${config.baseUrl}/users/update`,
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