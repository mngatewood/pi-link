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
            message: ''
        }
                
        try {
            //create the user
            const result = await locals.pb.collection('users').create(formData);
            if (result) createResult = true;
        } catch (err) {
            console.log('error', err);
            console.log('data', err.data);
            registerResponse.error = true;
            registerResponse.message = err.message;
        } 
        
        if (createResult) {
            throw redirect(303, '/login?registered=true');
        } else {
            return registerResponse;
        }
    }
}