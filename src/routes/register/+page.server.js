import { redirect } from '@sveltejs/kit';

export const actions = {
    register: async ({ request, locals }) => {

        const formData = Object.fromEntries(await request.formData());
        // get username from email address minus '@domain.com' and add four random characters to make semi-unique
        // not currently used, but required by pocketbase auth
        formData.username = formData.email.split('@')[0] + Math.random().toString(36).slice(2, 6);
        
        let createResult = false;
        
        let registerResponse = {
            error: false,
            email: formData.email,
            firstname: formData.firstname,
            lastname: formData.lastname,
            message: '',
            types: new Array(),
        }
                
        try {
            //create the user
            const result = await locals.pb.collection('users').create(formData);
            if (result) createResult = true;
        } catch (err) {
            console.log('error', err);
            console.log('data', err.data);
            registerResponse.error = true;
            registerResponse.types = Object.keys(err.data.data);
            registerResponse.message = Object.keys(err.data.data).includes("email") ? `The email ${registerResponse.email} is invalid or already in use.` : err.data.message;
        } 

        console.log("create result", createResult)
        
        if (createResult) {
            throw redirect(303, '/login?registered=true');
        } else {
            return registerResponse;
        }
    }
}